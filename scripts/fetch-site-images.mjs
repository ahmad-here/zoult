// Downloads each listed website's own preview image (og:image / twitter:image), resizes it to
// 1200x630 WebP and stores it in public/images/sites/<slug>.webp so we never hotlink.
// Sites without a usable preview get a branded fallback card with their favicon.
// Usage: npm run site-images            (only missing images)
//        npm run site-images -- --force (re-download all)
//        npm run site-images -- slug1 slug2
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL, fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'public', 'images', 'sites')
fs.mkdirSync(outDir, { recursive: true })
const args = process.argv.slice(2)
const force = args.includes('--force')
const only = args.filter((a) => !a.startsWith('--'))
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36'

async function get(url, ms = 15000) {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), ms)
  try {
    return await fetch(url, { headers: { 'user-agent': UA, accept: '*/*' }, redirect: 'follow', signal: ctrl.signal })
  } finally {
    clearTimeout(t)
  }
}

function findPreview(html, base) {
  const metas = html.match(/<meta[^>]+>/gi) || []
  for (const key of ['og:image:secure_url', 'og:image', 'twitter:image', 'twitter:image:src']) {
    for (const m of metas) {
      const k = m.match(/(?:property|name)\s*=\s*["']([^"']+)["']/i)?.[1]?.toLowerCase()
      const c = m.match(/content\s*=\s*["']([^"']+)["']/i)?.[1]
      if (k === key && c) return new URL(c.replace(/&amp;/g, '&'), base).href
    }
  }
  return null
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

async function fallback(site, out) {
  let icon = null
  try {
    const host = new URL(site.link).hostname
    const r = await get(`https://www.google.com/s2/favicons?domain=${host}&sz=128`)
    if (r.ok) icon = await sharp(Buffer.from(await r.arrayBuffer())).resize(128, 128, { fit: 'contain', background: '#0000' }).png().toBuffer()
  } catch {}
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1a2e05"/><stop offset="1" stop-color="#000"/></linearGradient></defs>
    <rect width="1200" height="630" fill="url(#g)"/>
    <circle cx="600" cy="230" r="120" fill="#B4E300" fill-opacity="0.12"/>
    <text x="600" y="440" text-anchor="middle" font-family="Poppins, 'Segoe UI', 'DejaVu Sans', Arial" font-size="64" font-weight="700" fill="#fff">${esc(site.name)}</text>
    <text x="600" y="500" text-anchor="middle" font-family="Poppins, 'Segoe UI', 'DejaVu Sans', Arial" font-size="28" fill="#B4E300">${esc(new URL(site.link).hostname.replace(/^www\./, ''))}</text>
  </svg>`
  const layers = icon ? [{ input: icon, left: 536, top: 166 }] : []
  await sharp(Buffer.from(svg)).composite(layers).webp({ quality: 80 }).toFile(out)
}

const files = fs.readdirSync(path.join(root, 'data', 'sites')).filter((f) => f.endsWith('.js'))
const report = { preview: [], fallback: [] }
for (const f of files) {
  const { default: sites } = await import(pathToFileURL(path.join(root, 'data', 'sites', f)).href)
  for (const site of sites) {
    if (site.status !== 'ok') continue
    if (only.length && !only.includes(site.slug)) continue
    const out = path.join(outDir, `${site.slug}.webp`)
    if (!force && !only.length && fs.existsSync(out)) continue
    try {
      const page = await get(site.link)
      const img = page.ok ? findPreview(await page.text(), page.url) : null
      if (!img) throw new Error('no preview image')
      const r = await get(img)
      if (!r.ok) throw new Error('image ' + r.status)
      const buf = Buffer.from(await r.arrayBuffer())
      const meta = await sharp(buf).metadata()
      if (!meta.width || meta.width < 300) throw new Error('image too small')
      await sharp(buf).resize(1200, 630, { fit: 'cover', position: 'attention' }).webp({ quality: 75 }).toFile(out)
      report.preview.push(site.slug)
    } catch (e) {
      await fallback(site, out)
      report.fallback.push(`${site.slug} (${e.message})`)
    }
  }
}
console.log(`preview images: ${report.preview.length}\nfallback cards: ${report.fallback.length}\n  ${report.fallback.join('\n  ')}`)

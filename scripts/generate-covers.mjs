// Generates a unique 1200x675 WebP cover for every article in data/articles/*.js
// Output: public/images/blog/<slug>.webp. Existing covers are kept unless --force is passed.
// Runs automatically before `npm run build`, so new articles always get a cover.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, '$1')), '..')
const outDir = path.join(root, 'public', 'images', 'blog')
const force = process.argv.includes('--force')
fs.mkdirSync(outDir, { recursive: true })

// Category → colours + simple line icon (24x24 viewBox paths)
const themes = {
  Blogging: { bg: '#0f172a', accent: '#B4E300', icon: 'M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z' },
  Monetization: { bg: '#052e16', accent: '#facc15', icon: 'M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6' },
  'Web Development': { bg: '#111827', accent: '#38bdf8', icon: 'M16 18l6-6-6-6M8 6l-6 6 6 6' },
  'Content Writing': { bg: '#1e1b4b', accent: '#f9a8d4', icon: 'M4 6h16M4 12h16M4 18h10' },
  SEO: { bg: '#0c0a09', accent: '#B4E300', icon: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35' },
  'Make Money Online': { bg: '#14532d', accent: '#fde047', icon: 'M3 17l6-6 4 4 8-8M14 7h7v7' },
  Careers: { bg: '#172554', accent: '#93c5fd', icon: 'M3 7h18v13H3zM16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2' },
  AI: { bg: '#2e1065', accent: '#c4b5fd', icon: 'M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z' },
  Security: { bg: '#450a0a', accent: '#fca5a5', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
  Productivity: { bg: '#422006', accent: '#fdba74', icon: 'M12 22a10 10 0 100-20 10 10 0 000 20zM12 6v6l4 2' },
  'Social Media': { bg: '#3b0764', accent: '#f0abfc', icon: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z' },
  'E-commerce': { bg: '#083344', accent: '#5eead4', icon: 'M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0' },
  'Personal Finance': { bg: '#1a2e05', accent: '#bef264', icon: 'M3 21h18M5 21V10M10 21V10M14 21V10M19 21V10M12 2l9 6H3z' },
}
const fallback = { bg: '#0b0b0b', accent: '#B4E300', icon: 'M4 4h16v16H4z' }

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function wrap(text, max) {
  const lines = []
  let line = ''
  for (const word of text.split(' ')) {
    if ((line + ' ' + word).trim().length > max && line) {
      lines.push(line)
      line = word
    } else line = (line + ' ' + word).trim()
  }
  if (line) lines.push(line)
  return lines
}

function svg({ title, category }, seed) {
  const t = themes[category] || fallback
  let lines = wrap(title, 24)
  let size = 64
  if (lines.length > 4) { lines = wrap(title, 30); size = 52 }
  const lh = size * 1.18
  const startY = 330 - ((lines.length - 1) * lh) / 2
  const cx = 930 + (seed % 5) * 20
  const cy = 120 + (seed % 3) * 60
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${t.bg}"/><stop offset="1" stop-color="#000"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#g)"/>
  <circle cx="${cx}" cy="${cy}" r="260" fill="none" stroke="${t.accent}" stroke-opacity="0.18" stroke-width="2"/>
  <circle cx="${cx}" cy="${cy}" r="190" fill="none" stroke="${t.accent}" stroke-opacity="0.14" stroke-width="2"/>
  <circle cx="${cx}" cy="${cy}" r="120" fill="${t.accent}" fill-opacity="0.08"/>
  <g transform="translate(${cx - 60} ${cy - 60}) scale(5)" fill="none" stroke="${t.accent}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" opacity="0.9">
    <path d="${t.icon}"/>
  </g>
  <rect x="80" y="${startY - size - 70}" rx="22" height="44" width="${category.length * 15 + 48}" fill="${t.accent}"/>
  <text x="104" y="${startY - size - 40}" font-family="Poppins, 'Segoe UI', 'DejaVu Sans', Arial, sans-serif" font-size="22" font-weight="700" fill="#000">${esc(category.toUpperCase())}</text>
  ${lines.map((l, i) => `<text x="80" y="${startY + i * lh}" font-family="Poppins, 'Segoe UI', 'DejaVu Sans', Arial, sans-serif" font-size="${size}" font-weight="700" fill="#fff">${esc(l)}</text>`).join('\n  ')}
  <rect x="80" y="600" width="60" height="6" fill="${t.accent}"/>
  <text x="160" y="610" font-family="Poppins, 'Segoe UI', 'DejaVu Sans', Arial, sans-serif" font-size="26" font-weight="700" fill="#9ca3af" letter-spacing="4">ZOULT</text>
</svg>`
}

const files = fs.readdirSync(path.join(root, 'data', 'articles')).filter((f) => f.endsWith('.js'))
let made = 0
for (const f of files) {
  const { default: articles } = await import(pathToFileURL(path.join(root, 'data', 'articles', f)).href)
  for (const a of articles) {
    const out = path.join(outDir, `${a.slug}.webp`)
    if (!force && fs.existsSync(out)) continue
    await sharp(Buffer.from(svg(a, a.id))).webp({ quality: 82 }).toFile(out)
    made++
  }
}
console.log(`covers: ${made} generated in public/images/blog`)

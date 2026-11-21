// Saves website screenshots as cards: node scripts/save-screenshots.mjs <json-file>
// JSON format: { "slug": "https://screenshot-url", ... }
// Output: public/images/sites/<slug>.webp (1200x630, top of the page).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const map = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'))
let ok = 0
for (const [slug, url] of Object.entries(map)) {
  try {
    const r = await fetch(url)
    if (!r.ok) throw new Error('HTTP ' + r.status)
    const buf = Buffer.from(await r.arrayBuffer())
    await sharp(buf)
      .resize(1200, 630, { fit: 'cover', position: 'top' })
      .webp({ quality: 75 })
      .toFile(path.join(root, 'public', 'images', 'sites', `${slug}.webp`))
    ok++
    console.log('saved', slug)
  } catch (e) {
    console.log('FAILED', slug, e.message)
  }
}
console.log(`${ok}/${Object.keys(map).length} saved`)

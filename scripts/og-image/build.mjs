/**
 * Renders scripts/og-image/template.html to public/og-image.jpg at 1200x630.
 *
 * Uses the Inter woff2 that next/font already emitted into .next/static/media,
 * inlined as a data URI, so the card is set in the same typeface as the site
 * and the render needs no network access.
 *
 * Usage: npm run build   (once, to emit the font)  then:
 *        node scripts/og-image/build.mjs
 */
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'

// next/font names the Latin subset with a `.p.woff2` suffix.
const mediaDir = path.join(root, '.next/static/media')
const latin = readdirSync(mediaDir).find((f) => f.endsWith('.p.woff2'))
if (!latin) throw Error('No Inter latin subset in .next/static/media - run `npm run build` first')

const fontFace = `@font-face{font-family:Inter;font-style:normal;font-weight:100 900;src:url(data:font/woff2;base64,${readFileSync(path.join(mediaDir, latin)).toString('base64')}) format("woff2");}`

const html = readFileSync(path.join(root, 'scripts/og-image/template.html'), 'utf8').replace(
  '/* __INTER_FONT_FACE__ */',
  fontFace
)

const work = mkdtempSync(path.join(tmpdir(), 'og-'))
writeFileSync(path.join(work, 'og.html'), html)

execFileSync(CHROME, [
  '--headless',
  '--window-position=0,0',
  '--no-sandbox',
  '--disable-gpu',
  '--hide-scrollbars',
  '--force-device-scale-factor=2', // render at 2x, downsample for crisp text
  '--window-size=1200,900', // taller than the card; cropped below
  `--screenshot=${path.join(work, 'og.png')}`,
  `file://${path.join(work, 'og.html')}`,
])

const out = path.join(root, 'public/og-image.jpg')
const raw = await sharp(path.join(work, 'og.png')).metadata()
const scale = raw.width / 1200 // device pixel ratio actually applied
console.log(`captured ${raw.width}x${raw.height} (scale ${scale})`)
// The window is rendered taller than the card so the whole thing is always in
// frame; crop the top 1200x630 of it.
await sharp(path.join(work, 'og.png'))
  .extract({ left: 0, top: 0, width: raw.width, height: Math.round(630 * scale) })
  .resize(1200, 630)
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(out)

const { size } = await sharp(out).metadata().then(async (m) => ({ ...m, size: (await import('node:fs')).statSync(out).size }))
console.log(`public/og-image.jpg  1200x630  ${(size / 1024).toFixed(0)} KB`)

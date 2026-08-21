#!/usr/bin/env node
/**
 * Site scraper / viewer / reviewer.
 *
 *   npm run scrape -- https://rosslawoffice.net
 *
 * Crawls a site with a real browser and writes everything needed to rebuild or
 * review it into ./scrape:
 *
 *   scrape/report.md          what was found, page by page
 *   scrape/palette.json       every colour the site actually paints, ranked by
 *                             how much of the page uses it, plus the fonts
 *   scrape/palette.html       those colours as swatches, openable in a browser
 *   scrape/pages/<slug>.md    title, meta, headings and body copy per page
 *   scrape/images/            every image the site loads, at full resolution
 *   scrape/shots/             desktop + mobile screenshots of each page
 *
 * Requires Chromium. If `npx playwright install chromium` is not an option,
 * point PLAYWRIGHT_CHROMIUM_PATH at an existing binary.
 */
import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'
import { createWriteStream } from 'node:fs'
import { Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import path from 'node:path'

const START = process.argv[2]
const MAX_PAGES = Number(process.env.SCRAPE_MAX_PAGES ?? 25)
const OUT = path.resolve('scrape')

if (!START) {
  console.error('usage: npm run scrape -- <url>   (e.g. https://rosslawoffice.net)')
  process.exit(1)
}

const origin = new URL(START).origin
const slug = (url) => {
  const p = new URL(url).pathname.replace(/^\/|\/$/g, '')
  return (p || 'home').replace(/[^a-z0-9]+/gi, '-').toLowerCase().slice(0, 60)
}

/** Colour and font census: what the page actually paints, weighted by area. */
const census = () => {
  const colours = new Map()
  const fonts = new Map()
  const bump = (map, key, weight) => key && map.set(key, (map.get(key) ?? 0) + weight)

  for (const el of document.querySelectorAll('*')) {
    const rect = el.getBoundingClientRect()
    const area = Math.max(0, rect.width) * Math.max(0, rect.height)
    if (!area) continue
    const cs = getComputedStyle(el)
    const transparent = (c) => !c || c === 'transparent' || c.endsWith(', 0)')

    if (!transparent(cs.backgroundColor)) bump(colours, cs.backgroundColor, area)
    if (!transparent(cs.color)) bump(colours, cs.color, Math.sqrt(area) * 12)
    if (!transparent(cs.borderTopColor) && parseFloat(cs.borderTopWidth) > 0) {
      bump(colours, cs.borderTopColor, Math.sqrt(area))
    }
    for (const m of (cs.backgroundImage || '').matchAll(/rgba?\([^)]+\)|#[0-9a-f]{3,8}/gi)) {
      bump(colours, m[0], area / 3)
    }
    bump(fonts, cs.fontFamily, Math.sqrt(area))
  }

  const rank = (map) =>
    [...map.entries()].sort((a, b) => b[1] - a[1]).map(([value, weight]) => ({ value, weight: Math.round(weight) }))

  return { colours: rank(colours).slice(0, 60), fonts: rank(fonts).slice(0, 12) }
}

/** Everything a rebuild needs from the document itself. */
const harvest = () => {
  const text = (sel) => [...document.querySelectorAll(sel)].map((e) => e.textContent.trim()).filter(Boolean)
  const abs = (u) => {
    try {
      return new URL(u, location.href).href
    } catch {
      return null
    }
  }

  const images = new Set()
  for (const img of document.querySelectorAll('img')) {
    if (img.currentSrc || img.src) images.add(abs(img.currentSrc || img.src))
    for (const part of (img.srcset || '').split(',')) {
      const u = part.trim().split(/\s+/)[0]
      if (u) images.add(abs(u))
    }
  }
  for (const el of document.querySelectorAll('*')) {
    for (const m of (getComputedStyle(el).backgroundImage || '').matchAll(/url\(["']?(.*?)["']?\)/g)) {
      if (!m[1].startsWith('data:')) images.add(abs(m[1]))
    }
  }
  for (const v of document.querySelectorAll('video[poster]')) images.add(abs(v.poster))

  return {
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.content ?? '',
    h1: text('h1'),
    h2: text('h2'),
    h3: text('h3'),
    links: [...document.querySelectorAll('a[href]')].map((a) => abs(a.href)).filter(Boolean),
    tel: [...document.querySelectorAll('a[href^="tel:"]')].map((a) => a.textContent.trim()),
    mailto: [...document.querySelectorAll('a[href^="mailto:"]')].map((a) => a.getAttribute('href').slice(7)),
    images: [...images].filter(Boolean),
    body: (document.body.innerText || '').replace(/\n{3,}/g, '\n\n').trim(),
  }
}

async function download(url, dir) {
  const name = decodeURIComponent(new URL(url).pathname.split('/').pop() || 'asset')
  const safe = name.replace(/[^a-z0-9._-]+/gi, '-').slice(-80) || 'asset'
  const res = await fetch(url)
  if (!res.ok || !res.body) throw new Error(`${res.status}`)
  await pipeline(Readable.fromWeb(res.body), createWriteStream(path.join(dir, safe)))
  return safe
}

const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined,
})
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const mobileCtx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
})

for (const d of ['pages', 'images', 'shots']) await mkdir(path.join(OUT, d), { recursive: true })

const queue = [START]
const seen = new Set()
const pages = []
const allColours = new Map()
const allFonts = new Map()
const allImages = new Set()

while (queue.length && pages.length < MAX_PAGES) {
  const url = queue.shift()
  const key = url.split('#')[0].replace(/\/$/, '')
  if (seen.has(key)) continue
  seen.add(key)

  const page = await ctx.newPage()
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 })
  } catch {
    console.warn('  ! could not load', url)
    await page.close()
    continue
  }
  await page.waitForTimeout(600)

  const data = await page.evaluate(harvest)
  const seenStyles = await page.evaluate(census)
  const name = slug(url)
  console.log(`· ${url}  (${data.images.length} images)`)

  for (const { value, weight } of seenStyles.colours) allColours.set(value, (allColours.get(value) ?? 0) + weight)
  for (const { value, weight } of seenStyles.fonts) allFonts.set(value, (allFonts.get(value) ?? 0) + weight)
  data.images.forEach((i) => allImages.add(i))

  await page.screenshot({ path: path.join(OUT, 'shots', `${name}.png`), fullPage: true })
  const m = await mobileCtx.newPage()
  try {
    await m.goto(url, { waitUntil: 'networkidle', timeout: 45000 })
    await m.waitForTimeout(400)
    await m.screenshot({ path: path.join(OUT, 'shots', `${name}--mobile.png`), fullPage: true })
  } catch {
    /* the desktop shot is enough */
  }
  await m.close()

  await writeFile(
    path.join(OUT, 'pages', `${name}.md`),
    [
      `# ${data.title}`,
      ``,
      `<${url}>`,
      ``,
      data.description && `> ${data.description}`,
      ``,
      data.h1.length ? `## H1\n${data.h1.map((t) => `- ${t}`).join('\n')}` : '',
      data.h2.length ? `## H2\n${data.h2.map((t) => `- ${t}`).join('\n')}` : '',
      data.h3.length ? `## H3\n${data.h3.map((t) => `- ${t}`).join('\n')}` : '',
      data.tel.length ? `## Phone\n${[...new Set(data.tel)].map((t) => `- ${t}`).join('\n')}` : '',
      data.mailto.length ? `## Email\n${[...new Set(data.mailto)].map((t) => `- ${t}`).join('\n')}` : '',
      `## Copy`,
      ``,
      data.body,
    ]
      .filter(Boolean)
      .join('\n'),
  )

  pages.push({ url, name, ...data })
  for (const link of data.links) {
    if (link.startsWith(origin) && !/\.(pdf|jpg|jpeg|png|webp|svg|zip|docx?)$/i.test(link)) queue.push(link)
  }
  await page.close()
}

console.log(`\nDownloading ${allImages.size} images…`)
let saved = 0
for (const url of allImages) {
  try {
    await download(url, path.join(OUT, 'images'))
    saved += 1
  } catch (err) {
    console.warn(`  ! ${url} — ${err.message}`)
  }
}

const rank = (map) => [...map.entries()].sort((a, b) => b[1] - a[1]).map(([value, weight]) => ({ value, weight }))
const colours = rank(allColours).slice(0, 48)
const fonts = rank(allFonts).slice(0, 10)

await writeFile(path.join(OUT, 'palette.json'), JSON.stringify({ origin, colours, fonts }, null, 2))
await writeFile(
  path.join(OUT, 'palette.html'),
  `<!doctype html><meta charset="utf-8"><title>Palette — ${origin}</title>
<style>body{font:14px/1.5 system-ui;margin:40px;background:#111;color:#eee}
h1{font-weight:600}.g{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:14px;margin-top:24px}
.s{border-radius:6px;overflow:hidden;background:#1c1c1c}.c{height:88px}.l{padding:8px 10px;font:12px ui-monospace,monospace}</style>
<h1>${origin}</h1><p>Ranked by how much of the site each colour actually covers.</p>
<div class=g>${colours
    .map((c) => `<div class=s><div class=c style="background:${c.value}"></div><div class=l>${c.value}</div></div>`)
    .join('')}</div>
<h1 style="margin-top:40px">Fonts</h1><ul>${fonts.map((f) => `<li>${f.value}</li>`).join('')}</ul>`,
)

await writeFile(
  path.join(OUT, 'report.md'),
  [
    `# Scrape — ${origin}`,
    ``,
    `${pages.length} page${pages.length === 1 ? '' : 's'}, ${saved}/${allImages.size} images saved.`,
    ``,
    `## Palette (most-used first)`,
    ``,
    ...colours.slice(0, 16).map((c) => `- \`${c.value}\``),
    ``,
    `## Fonts`,
    ``,
    ...fonts.slice(0, 6).map((f) => `- ${f.value}`),
    ``,
    `## Pages`,
    ``,
    ...pages.map((p) => `- [${p.title || p.name}](pages/${p.name}.md) — <${p.url}>`),
  ].join('\n'),
)

await browser.close()
console.log(`\nWrote ${OUT}`)
console.log(`  report.md · palette.html · ${pages.length} pages · ${saved} images · shots/`)

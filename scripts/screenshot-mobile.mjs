#!/usr/bin/env node
// Capture mobile screenshots of the live site for visual audit.
// Captures viewport-sized sections by scrolling, so each image is readable.
// Usage: node scripts/screenshot-mobile.mjs [base-url]

import { chromium, devices } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'

const BASE = process.argv[2] || 'https://riolargo.co.uk'
const OUT = 'audit/mobile'

const PAGES = [
  { slug: 'home',         path: '/' },
  { slug: 'shop',         path: '/shop' },
  { slug: 'product-1l',   path: '/product/rio-largo-evoo-1litre' },
  { slug: 'shipping',     path: '/shipping' },
  { slug: 'admin',        path: '/admin' },
]

await fs.mkdir(OUT, { recursive: true })

const browser = await chromium.launch()
const context  = await browser.newContext({
  ...devices['iPhone 14 Pro'],
})
const page = await context.newPage()

for (const p of PAGES) {
  const url = BASE + p.path
  console.log(`→ ${url}`)
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
    await page.waitForTimeout(800)

    const totalHeight = await page.evaluate(() => document.body.scrollHeight)
    const viewportHeight = await page.evaluate(() => window.innerHeight)
    const sections = Math.ceil(totalHeight / viewportHeight)

    for (let i = 0; i < sections; i++) {
      const y = i * viewportHeight
      await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y)
      await page.waitForTimeout(400)
      const out = path.join(OUT, `${p.slug}-${String(i).padStart(2, '0')}.png`)
      await page.screenshot({ path: out, fullPage: false })
    }
    console.log(`  ✓ ${sections} section${sections === 1 ? '' : 's'}`)
  } catch (err) {
    console.error(`  ✗ ${url}:`, err.message)
  }
}

await browser.close()
console.log('\nDone.')

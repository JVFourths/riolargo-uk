#!/usr/bin/env node
// Optimise raw generated/source images into hero/medium WebP outputs.

import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'

const SRC_DIRS = ['public/images/generated', 'public/images/source']
const OUT_DIR = 'public/images'

const TARGETS = {
  // generated/
  'hero-breede-valley.png': { name: 'hero-breede-valley', widths: [1920, 1280, 768], quality: 82 },
  'southern-advantage.png': { name: 'southern-advantage', widths: [1600, 960], quality: 82 },
  'master-miller.png':      { name: 'master-miller', widths: [960, 640], quality: 84 },
  'nitrogen-tanks.png':     { name: 'nitrogen-tanks', widths: [1280, 768], quality: 82 },
  'hand-picking.png':       { name: 'hand-picking', widths: [960, 640], quality: 82 },
  'harvest-aerial.png':     { name: 'harvest-aerial', widths: [1920, 1280], quality: 82 },
  // source/
  'bottle-500ml.png':       { name: 'bottle-500ml', widths: [800, 480], quality: 88, fit: 'inside' },
  'bottle-1l.png':          { name: 'bottle-1l',    widths: [800, 480], quality: 88, fit: 'inside' },
  'bottle-2l.png':          { name: 'bottle-2l',    widths: [800, 480], quality: 88, fit: 'inside' },
  'logo.png':               { name: 'logo', widths: [500, 250], quality: 90, fit: 'inside' },
  'recipe-salad.jpg':       { name: 'recipe-salad', widths: [960, 640], quality: 80 },
  'recipe-potatoes.jpg':    { name: 'recipe-potatoes', widths: [960, 640], quality: 80 },
  'recipe-feta.jpg':        { name: 'recipe-feta', widths: [960, 640], quality: 80 },
  'olives-on-branch.png':   { name: 'olives-on-branch', widths: [1920, 1280], quality: 82 },
}

await fs.mkdir(OUT_DIR, { recursive: true })

let total = 0
for (const [filename, config] of Object.entries(TARGETS)) {
  let src = null
  for (const dir of SRC_DIRS) {
    const candidate = path.join(dir, filename)
    try { await fs.access(candidate); src = candidate; break } catch {}
  }
  if (!src) { console.log(`SKIP ${filename} (not found)`); continue }

  for (const width of config.widths) {
    const out = path.join(OUT_DIR, `${config.name}-${width}w.webp`)
    await sharp(src)
      .resize({ width, fit: config.fit || 'cover', withoutEnlargement: true })
      .webp({ quality: config.quality })
      .toFile(out)
    const stats = await fs.stat(out)
    console.log(`✓ ${out} (${(stats.size / 1024).toFixed(0)} KB)`)
    total++
  }
}

console.log(`\nGenerated ${total} optimised images.`)

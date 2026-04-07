#!/usr/bin/env node
// Generate image via Google Imagen 4 and save to disk.
// Usage: node scripts/generate-image.mjs <prompt-key> <output-path> [aspect-ratio] [model]

import fs from 'node:fs/promises'
import path from 'node:path'

const API_KEY = process.env.GEMINI_API_KEY
if (!API_KEY) { console.error('GEMINI_API_KEY not set'); process.exit(1) }

const [, , promptKey, outputPath, aspectRatio = '16:9', model = 'imagen-4.0-generate-001'] = process.argv

const PROMPTS = {
  hero: `A wide cinematic landscape photograph of a working olive estate at golden hour in South Africa's Breede River Valley, Western Cape. Rows of mature silver-green olive trees on red-brown earth, dramatic Cape mountain range in the distance, warm late afternoon light raking across the trees. Shot on a Sony A7R V with a 35mm lens at f/4, natural colour grading, deep shadows in the foreground, honey-gold light on the mountains. The palette is earthy and sun-warmed: sage greens, dusty golds, deep ochres. No people. No text. No borders. Editorial photography style, magazine quality, suitable for a premium food brand hero image.`,
  southern: `A single golden-green stream of fresh extra virgin olive oil pouring from a glass bottle into a wide ceramic dish, photographed in front of a window showing a cold grey British winter garden outside (bare trees, soft snow on ground). Warm golden interior light contrasted with cool blue exterior daylight. Shot with shallow depth of field, focus on the oil pour. Editorial food photography, premium magazine quality, natural colour grading.`,
  miller: `Editorial portrait of an experienced olive oil master miller at work, shot from the side and slightly behind so face is in profile and not fully visible. Greying hair, weathered hands, dressed in a simple linen shirt and apron, holding a small glass cup of fresh-pressed olive oil up to natural light filtering through a window of a working olive mill. Stainless steel equipment softly out of focus in the background. Warm natural light, deep shadows, painterly mood. Shot on medium format, 80mm lens, f/2.8. Editorial documentary style, premium food magazine.`,
  tanks: `Editorial industrial photograph of a row of polished stainless steel storage tanks in a modern olive oil cellar, photographed in dramatic side light from a single high window. Architectural composition, the tanks recede into deep shadow. Warm tungsten highlights against cool steel. No people, no text. Sharp linear perspective, premium food magazine quality.`,
  picking: `Documentary editorial close-up photograph of a single olive being plucked from a branch by a worker's gloved hand. Razor-sharp focus on the olive and fingertips, soft sunlit grove blurred behind. The olive is plump, deep purple-green, with morning dew. Natural colour, no filters, premium food magazine quality.`,
  bottle: `Editorial product photograph of a tall premium olive oil bottle (clear glass with a simple label) standing on a warm cream linen background, lit by a single shaft of warm afternoon sun coming from the upper left. Long dramatic shadow extending to the right. The oil inside the bottle glows golden-green in the light. Shot on medium format, 100mm macro, f/8 for sharp detail. Premium spirits magazine style — treat the bottle like rare whisky, not condiment.`,
  harvest: `Aerial drone photograph of an olive estate during harvest in the Breede River Valley, South Africa. Geometric rows of mature olive trees stretching toward distant Cape Fold mountains, warm late-afternoon sun casting long tree shadows across earthy red-brown soil between rows. Natural colours, no oversaturation, no text. Editorial documentary style for a premium food publication.`,
  miller_terroir: `Editorial close-up photograph of a pair of weathered hands cupping a small mound of fresh hand-picked olives with a single fragment of dry red Breede River Valley soil clinging to one fruit. Bright morning daylight, deep shadows, the olives are plump and dewy in shades of purple-green and bronze. The hands are visible only from the wrists down, no face, no other body parts. Cream linen rolled-up shirt cuff just visible at edges. Shot on medium format, 100mm macro, f/4. Painterly editorial documentary style, premium food magazine. No text, no borders.`,
  miller_tasting: `Editorial still-life photograph of a small cobalt-blue glass tasting cup half-filled with golden-green extra virgin olive oil, held in raking afternoon light against a warm limestone wall background. The oil glows luminous in the light. Single hand visible only at the bottom of the frame in profile, holding the cup, wearing a simple white linen sleeve. No face, no other elements. Painterly, contemplative, premium magazine still-life. Shot on medium format, 80mm macro, f/2.8. No text, no borders.`,
  miller_macro: `Extreme macro editorial photograph of a single olive cleanly cut in half with a sharp blade, a perfect bead of fresh oil welling at the cut surface. The olive sits on a textured warm cream linen background. Sharp side light from the upper left casts a long crisp shadow. The flesh is jewel-toned, deep purple-green at the skin fading to amber at the centre, the oil bead catches the light. Razor-sharp focus on the cut surface, shallow depth of field. Editorial scientific aesthetic, premium food magazine. No text, no borders.`,
  decanter: `Editorial product photograph of a tall premium olive oil decanter (bag-in-box style with a small twist tap on the side near the base), photographed at a slight three-quarter angle on a warm cream linen surface. Golden afternoon side-light from the left casts a long crisp shadow to the right. Behind it, a small ceramic dish catches a single golden-green stream of fresh oil being dispensed from the twist tap. Focus on the tap and the oil pour. The decanter itself is premium, minimalist, distinctive. Shot on medium format, 100mm macro, f/5.6. Premium spirits magazine still-life. Limestone cream background, no clutter, no text, no borders.`,
}

const prompt = PROMPTS[promptKey]
if (!prompt) { console.error(`Unknown prompt key: ${promptKey}. Options: ${Object.keys(PROMPTS).join(', ')}`); process.exit(1) }

console.log(`[${promptKey}] requesting ${model} (${aspectRatio})...`)

const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:predict`
const body = {
  instances: [{ prompt }],
  parameters: { sampleCount: 1, aspectRatio, personGeneration: 'allow_adult' },
}

const res = await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'x-goog-api-key': API_KEY },
  body: JSON.stringify(body),
})

const text = await res.text()
let data
try { data = JSON.parse(text) }
catch { console.error(`[${promptKey}] non-JSON response:`, text.slice(0, 800)); process.exit(1) }

if (!res.ok) { console.error(`[${promptKey}] HTTP ${res.status}:`, JSON.stringify(data, null, 2)); process.exit(1) }

const b64 = data.predictions?.[0]?.bytesBase64Encoded
if (!b64) { console.error(`[${promptKey}] no image in response:`, JSON.stringify(data, null, 2).slice(0, 1000)); process.exit(1) }

await fs.mkdir(path.dirname(outputPath), { recursive: true })
await fs.writeFile(outputPath, Buffer.from(b64, 'base64'))
const stats = await fs.stat(outputPath)
console.log(`[${promptKey}] saved ${outputPath} (${(stats.size / 1024).toFixed(0)} KB)`)

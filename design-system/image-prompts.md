# Rio Largo UK — Image Prompts (Gemini / Imagen / Midjourney)

## Asset audit — what we already have

Downloaded from `riolargo.co.za` into `public/images/source/`:

| File | Size | Use |
|---|---|---|
| `brenda-and-nick.jpg` | 134KB | Founder portrait — usable for "Master Miller" section but small. Need higher-res ideally. |
| `hero-slider-1.png`, `hero-slider-3.png` | 1.3-1.6MB | Possible hero candidates — review quality |
| `olives-on-branch.png` | 539KB (1920×700) | Hero option, landscape |
| `oil-poured-pan.png` | 445KB (1920×700) | Lifestyle hero |
| `pro-shot.webp` | 1.2MB | Recent professional shot — review |
| `estate-recent.jpg` | 1MB | Recent estate photo |
| `bottle-500ml.png`, `bottle-1l.png`, `bottle-2l.png` | 450-570KB each | Product shots — usable but need to check transparency/background |
| `logo.png` | 56KB | Rio Largo brand logo |
| `recipe-salad.jpg`, `recipe-potatoes.jpg`, `recipe-feta.jpg` | 1.2-1.6MB | Recipe/lifestyle shots for tasting notes / pairings section |

**Verdict:** Enough to get the site live. Bottles + logo + one founder shot + recipe images = the minimum viable shoot. Heroes are the weakest link — placeholders are okay but a proper landscape would lift the whole site.

## What we still need

For each prompt below, generate 4 variants in Gemini, pick the strongest. Target 16:9 landscape unless specified. Avoid AI giveaways: no extra fingers, no impossible reflections, no over-perfect "rendered" look.

---

## 1. HERO — Breede River Valley landscape (highest priority)

### Prompt A — Golden hour estate
```
A wide cinematic landscape photograph of a working olive estate at golden hour
in South Africa's Breede River Valley, Western Cape. Rows of mature silver-green
olive trees on red-brown earth, dramatic Cape mountain range in the distance,
warm late afternoon light raking across the trees. Shot on a Sony A7R V with a
35mm lens at f/4, natural colour grading, deep shadows in the foreground,
honey-gold light on the mountains. The palette should feel earthy and sun-warmed:
sage greens, dusty golds, deep ochres. No people. No text. No borders.
Editorial photography style, magazine-quality, suitable for a premium food brand
hero image. 16:9 aspect ratio, 4K resolution.
```

### Prompt B — Misty morning grove
```
Atmospheric early morning photograph of an olive grove in the Breede River Valley,
South Africa. Low mist drifting between rows of ancient gnarled olive trees,
soft cool morning light filtering through silver-grey leaves, dewdrops on the
fruit. Distant Cape mountain silhouette barely visible through the mist.
Muted palette of sage, pearl, and warm grey. Shot on a medium format camera,
shallow depth of field. Cinematic, contemplative, expensive. No people, no text.
16:9 aspect, 4K.
```

### Prompt C — Aerial harvest scene
```
Aerial drone photograph of an olive estate during harvest in the Breede River
Valley, South Africa. Geometric rows of olive trees stretching toward distant
mountains, a few workers visible mid-frame in earth tones (no faces visible),
warm late-afternoon sun casting long tree shadows. Earthy red-brown soil between
rows. Natural colours, no oversaturation. Editorial documentary style for a
premium food publication. 16:9, 4K.
```

---

## 2. THE SOUTHERN ADVANTAGE — visual metaphor (priority 2)

### Prompt D — Twin trees, twin seasons (split composition)
```
A split conceptual editorial photograph: left half shows a vibrant healthy
olive tree heavy with fresh green fruit under bright southern sun (March
Southern Hemisphere harvest); right half shows the same tree species in cold
European winter, bare branches against grey sky, dormant. Both halves must feel
like the same tree, photographed in the same style, just opposite seasons.
Editorial, conceptual, slightly painterly but still photographic. Muted natural
colours, no text overlays. 16:9 widescreen.
```

### Prompt E — Single fresh oil pour against winter window
```
A single golden-green stream of fresh extra virgin olive oil pouring from a
bottle into a wide ceramic dish, photographed in front of a window showing a
cold grey British winter garden outside (bare trees, soft snow on ground).
Warm golden interior light contrasted with cool blue exterior. Shot with shallow
depth of field, focus on the oil pour. The juxtaposition of fresh-pressed oil
and winter outside is the entire point. Editorial food photography, premium
magazine quality. 4:5 portrait or 16:9 landscape.
```

---

## 3. THE MASTER MILLER — Nick Wilkinson portrait (priority 2)

> If `brenda-and-nick.jpg` is too small or unsuitable, generate a stand-in.
> **Important:** AI-generated faces should not impersonate the real Nick — make it
> clearly stylised or shot from behind/side.

### Prompt F — Master Miller at the press, from behind
```
Editorial portrait of an experienced olive oil master miller at work, shot from
the side and slightly behind. Greying hair, weathered hands, dressed in a simple
linen shirt and apron, holding a small glass cup of fresh-pressed olive oil up
to natural light filtering through a window of a working olive mill. Stainless
steel equipment softly out of focus in the background. Warm natural light, deep
shadows, painterly mood. Shot on medium format, 80mm lens, f/2.8. The face
should be partially obscured or in profile so identity is implied, not specified.
Editorial documentary style, premium food magazine. 4:5 portrait orientation.
```

### Prompt G — Hands cupping olives at harvest
```
Tight editorial close-up of weathered male hands cradling a small handful of
freshly hand-picked black and green olives, dust and leaf fragments still on
them. Shallow depth of field, rich earth tones, natural side light. Shot on a
medium format camera. Editorial documentary style. 1:1 square or 4:5 portrait.
No face visible, just the hands and olives.
```

---

## 4. THE ESTATE — biodynamic farming detail shots (priority 3)

### Prompt H — Hand-picking moment
```
Documentary editorial photograph of a single olive being plucked from a branch
by a worker's gloved hand. Razor-sharp focus on the olive and fingertips, soft
sunlit grove blurred behind. The olive is plump, deep purple-green, with morning
dew. Natural colour, no filters, premium food magazine quality. 4:5 portrait or
16:9 landscape.
```

### Prompt I — Stainless steel nitrogen tanks
```
Editorial industrial photograph of a row of polished stainless steel storage
tanks in a modern olive oil cellar, photographed in dramatic side light from a
single high window. Architectural composition, the tanks recede into deep
shadow. Warm tungsten highlights against cool steel. No people, no text. Shot
with a tilt-shift or large-format camera for sharp linear perspective. 16:9.
```

### Prompt J — The olive press in motion
```
Cinematic close-up of fresh olive paste flowing through a modern stainless steel
cold-press extractor, fresh green oil emerging in a slow stream. Shallow depth
of field, focus on the oil emerging. Industrial but elegant, the colour is the
star — deep emerald green oil against polished steel. Editorial food magazine
quality. 16:9.
```

---

## 5. PRODUCT HERO — bottle as art object (priority 3)

> We have product photos already, but they're catalog-style. These prompts are
> for an upgraded "art object" treatment if Johan wants to phase one in later.

### Prompt K — Bottle in southern light
```
Editorial product photograph of a tall premium olive oil bottle (clear glass
with a fox-branded label) standing on a simple cream linen background, lit by a
single shaft of warm afternoon sun coming from the upper left. Long dramatic
shadow extending to the right. The oil inside the bottle glows golden-green in
the light. Shot on medium format, 100mm macro, f/8 for sharp detail. Premium
spirits-magazine style — treat the bottle like rare whisky, not condiment.
Cream/limestone background, no props, no clutter. 4:5 portrait orientation.
```

### Prompt L — Three sizes in a row, top-down
```
Top-down editorial photograph of three sizes of premium olive oil bottles
arranged in a row on a textured warm-cream limestone background, evenly spaced
and lit from a single soft window source. Tall, slim, elegant glass bottles
with simple labels visible from above. Deep crisp shadows. The composition
should feel like a Wallpaper Magazine still life. No props, no clutter, no
text. 16:9 widescreen.
```

---

## 6. RECIPE / PAIRING — tasting notes section (priority 4)

> We have `recipe-salad.jpg`, `recipe-potatoes.jpg`, `recipe-feta.jpg` already —
> use them first. Only generate these if the existing ones don't fit the new
> aesthetic.

### Prompt M — Editorial drizzle on burrata
```
Overhead editorial food photograph of fresh burrata cheese on a dark ceramic
plate being drizzled with golden-green extra virgin olive oil from above (oil
visible mid-pour). Cracked black pepper, torn basil leaves, a halved heirloom
tomato. Warm side light, deep shadows. Shot on medium format. Premium food
magazine style — minimal, restrained, painterly. 4:5 portrait or 1:1 square.
```

### Prompt N — Bread, oil, salt
```
Editorial close-up of a torn piece of rustic sourdough bread being dipped into
a small dish of olive oil with flaky sea salt scattered around. Warm natural
side light, dark wooden surface, shallow depth of field. Premium food magazine
quality, restrained composition. 4:5 portrait or 16:9 landscape.
```

---

## Output specs for Gemini

When generating, ask for:
- **Aspect ratio:** 16:9 for hero, 4:5 for portraits, 1:1 for tasting/recipe
- **Resolution:** "highest available" (Gemini will give 1024x576 or similar — request 4K explicitly)
- **Format:** PNG or high-quality JPEG
- **Style:** "editorial photography", "magazine quality", never "render" or "illustration"

After generating, save to `public/images/generated/` with descriptive filenames like:
- `hero-breede-valley-golden.jpg`
- `southern-advantage-split.jpg`
- `master-miller-portrait.jpg`
- etc.

Then we'll integrate them into the rebuild.

---

## Reality check

For launch we can start with:

| Section | Image plan |
|---|---|
| Hero | One of the existing `hero-slider-*.png` OR generate from Prompt A |
| Southern Advantage | Generate Prompt E (winter window) — most distinctive |
| Master Miller | `brenda-and-nick.jpg` cropped + treated, OR Prompt F |
| Estate detail callouts | Existing `olives-on-branch.png`, `oil-poured-pan.png` + generate Prompt I |
| Product hero | Use existing `bottle-500ml.png` etc, treat with new background plate |
| Recipe pairing | Existing `recipe-*.jpg` files |

**Minimum viable image set to ship:** generate Prompt A (hero) and Prompt E (southern advantage). The rest can be the existing parent-site assets, polished in code.

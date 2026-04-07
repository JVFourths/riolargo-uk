# Rio Largo UK — Design System (MASTER)

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

**Project:** Rio Largo UK — premium South African EVOO launching into the UK market
**Last updated:** 2026-04-07
**Category:** Premium food / heritage DTC

---

## Strategic Positioning

**The Southern Advantage** — while every Italian/Spanish/Greek oil on UK shelves is 12-18 months old by midwinter, Rio Largo's southern hemisphere harvest means fresh oil arrives in the UK exactly when northern stocks are stale. This is geography, not marketing.

Every page reinforces one idea: *the only fresh olive oil in your kitchen this winter*.

**Brand story triangle:**
1. **Master Miller, UC Davis** (Nick Wilkinson) — scientific credibility, separates us from "family farm for generations" cliché
2. **Italian cultivars, South African terroir** — the "transplanted heritage" story no competitor has
3. **8-country gold medal sweep** — trust anchor; let the medals close the sale

**Voice:** Confident, specific, restrained. Never reverent or vague. Never rustic-folksy. Talk like a journalist, not a marketer.

---

## Global Style

**Style:** Editorial minimalism with warm naturalism
**Mood keywords:** Editorial, restrained, premium, confident, terroir, southern light
**Reference brands:** Graza, Brightland, Ottolenghi (warmth + restraint), Belazu (catalog clarity)

---

## Color Palette — Breede River Valley

| Token | Hex | Tailwind name | Use |
|---|---|---|---|
| `mountain` | `#1A2317` | `mountain-900` | Dark sections, primary brand black |
| `shadow` | `#0C0F0A` | `mountain-950` | Body text on cream, deepest dark |
| `limestone` | `#F7F3EE` | `limestone-50` | **Default page background** (warm cream, never #FFF) |
| `limestone-200` | `#EDE5D8` | | Card backgrounds, subtle dividers |
| `fynbos` | `#C9A84C` | `fynbos-500` | Primary CTA, accents (South African gold, NOT yellow) |
| `fynbos-600` | `#B5933A` | | CTA hover |
| `river-sage` | `#6B7B5A` | `sage-500` | Secondary, muted text, eyebrow labels |
| `river-sage-700` | `#4D5A40` | `sage-700` | Headings on cream when not mountain |
| `clay` | `#B5683A` | `clay-500` | **Reserved single accent** — only for flagged callouts (max 1 per page) |

**Rules:**
- Default background is `limestone` (cream), not white. Pure white is forbidden.
- Olive green as primary is forbidden. Every EVOO brand defaults to it.
- `clay` appears at most once per page.

---

## Typography

- **Display (headings):** `Playfair Display` — 400, 600, 700
- **Body (everything else):** `Inter` — 300, 400, 500, 600
- **Numerals/awards:** Inter tabular-nums

**Google Fonts import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:wght@400;600;700&display=swap');
```

**Type scale (desktop / mobile):**

| Token | Desktop | Mobile | Font | Weight | Use |
|---|---|---|---|---|---|
| `display` | 72px / 80lh | 44px / 50lh | Playfair | 700 | Hero headlines only |
| `h1` | 56px / 64lh | 36px / 42lh | Playfair | 700 | Page titles |
| `h2` | 40px / 48lh | 28px / 34lh | Playfair | 600 | Section headlines |
| `h3` | 28px / 36lh | 22px / 28lh | Playfair | 600 | Sub-sections |
| `h4` | 20px / 28lh | 18px / 26lh | Inter | 600 | Card titles |
| `body` | 17px / 28lh | 16px / 26lh | Inter | 400 | Long-form copy |
| `body-sm` | 15px / 24lh | 14px / 22lh | Inter | 400 | Captions, meta |
| `eyebrow` | 12px / 16lh | 11px / 16lh | Inter | 500 | UPPERCASE, letter-spacing 0.12em, sage colour |

**Rules:**
- Body line-length max 65ch on long copy
- Headings always tracked tighter (-0.02em on Playfair)
- Eyebrow labels are UPPERCASE with letter-spacing — these replace icons for section orientation
- Never use Playfair below 20px (it loses character)

---

## Spacing Scale

Tailwind defaults plus these section-level tokens:

| Token | Value | Use |
|---|---|---|
| `space-section-y` | 96px desktop / 64px mobile | Vertical padding between full sections |
| `space-section-y-lg` | 144px desktop / 80px mobile | Hero, story sections |
| `space-container-x` | max-width 1200px, gutter clamp(16px, 4vw, 48px) | Page container |

---

## Components

### Buttons

```css
/* Primary — fynbos gold */
.btn-primary {
  background: #C9A84C;
  color: #1A2317;
  font-family: Inter;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.01em;
  padding: 16px 32px;
  border-radius: 2px;  /* sharp, editorial — NOT pills */
  transition: background 200ms ease;
  cursor: pointer;
}
.btn-primary:hover { background: #B5933A; }

/* Secondary — outlined mountain on cream */
.btn-secondary {
  background: transparent;
  color: #1A2317;
  border: 1.5px solid #1A2317;
  /* same metrics as primary */
}
.btn-secondary:hover { background: #1A2317; color: #F7F3EE; }
```

**Rules:**
- Border-radius 2px max. No pills, no soft 12px corners. Editorial = sharp.
- Never two primaries on the same fold.

### Product cards

- Bottle photography centered on `limestone-200` background
- Full bleed bottle, no shadow or border on the image
- Below: tracking-wide eyebrow (e.g. "500ML"), Playfair name, Inter price
- Hover: subtle background shift `limestone-200` → `limestone-300`, NO scale transform
- Click: navigates to product page; no in-card "Add" button (drives to PDP)

### Awards bar

- Single horizontal sweep, NOT a grid of badges
- Format: `[country flag] AWARD NAME · score` separated by hairline `|`
- Inter tabular-nums for scores
- Sits between hero and product section

### Image treatment

- Hero: full-bleed, max-height 80vh, gradient overlay `linear-gradient(180deg, transparent 0%, rgba(26,35,23,0.6) 100%)` for text legibility
- Editorial: 4:5 portrait or 16:9 landscape, never square
- Always include `alt` text describing the scene
- All product photos on `limestone-200` background plate
- No drop shadows on photos. Ever.

### Icons

- **SVG only — Lucide React** (`lucide-react` package)
- Stroke-width 1.5
- Colour matches surrounding text
- Size: 16px inline, 20px standalone, 24px feature
- **Never emoji** — even though current site uses 🫒 🌿 🏆, those go

---

## Motion

| Use | Duration | Easing |
|---|---|---|
| Hover state | 200ms | ease-out |
| Focus state | 150ms | ease-out |
| Scroll reveal | 600ms | cubic-bezier(0.16, 1, 0.3, 1) |
| Page transition | none | (rely on Next.js default) |

**Rules:**
- Scroll reveals: fade + 8px translateY only. No parallax. No big movements.
- `@media (prefers-reduced-motion: reduce) { all transitions instant }`
- No carousels, no auto-playing video on mobile, no marquees

---

## Page Architecture

### Homepage (`/`)

| # | Section | Purpose |
|---|---|---|
| 1 | Hero — full-bleed Breede River landscape, 1 headline, 1 CTA | "Fresh from the southern harvest. On UK tables before the northern oils are bottled." |
| 2 | The Southern Advantage — explainer with seasonal calendar visualisation | Visual proof of the freshness gap |
| 3 | Press/medal sweep — single horizontal bar of 8 country wins | Instant credibility |
| 4 | The Master Miller — Nick's portrait + UC Davis story | Differentiator vs heritage farms |
| 5 | The Oil — three sizes as art objects | Product as hero |
| 6 | From the Estate — biodynamic, hand-picking, nitrogen storage (3 callouts with photography) | Quality proof |
| 7 | Tasting notes — Frantoio · Leccino · Coratina blend | Sensory + culinary depth |
| 8 | Final CTA — single button, generous whitespace | Close |

### Shop (`/shop`)

- Eyebrow + Playfair headline
- 3 products as large editorial cards in 3-col grid (1-col mobile)
- Side-text: "Three sizes. One oil." + tasting notes
- Free UK delivery threshold reminder

### Product page (`/product/[slug]`)

- Two-column above fold: bottle (left) on limestone-200, content (right)
- Right column: eyebrow size, Playfair name, price (Inter, large), short description, highlights as 4 hairline bullets, "Add to basket" primary, awards mini-bar
- Below fold: long description (max-width 65ch), tasting notes block, full award list, recipe pairing suggestions
- No tabs. Long-scroll editorial.

### Order success / Shipping / Admin

- Order success: single column, large Playfair confirmation, summary card, tracking promise
- Shipping: long-form editorial page
- Admin: out of scope for this refresh — leave functional

---

## Anti-Patterns — DO NOT USE

| ❌ | Why |
|---|---|
| Olive green as primary brand colour | Every EVOO brand defaults to it; instant generic |
| Hero carousels / sliders | Dated; signals lack of focus |
| Badge grids of medal icons | Visual noise; replace with horizontal sweep |
| "Family farm for generations" copy | Heritage cliché; we have a better story |
| Rustic / kraft-paper / hand-drawn aesthetic | Farmers market vibe, not premium |
| Stock photography of people eating salads | Always reads as stock |
| Multiple competing CTAs above the fold | Pick one; commit |
| Emoji as icons | Use Lucide SVG only |
| Pure #FFFFFF backgrounds | Use `limestone` cream |
| Pill buttons (border-radius > 4px) | Editorial = sharp |
| Drop shadows on product photos | Reads as cheap stock comp |
| Auto-rotating carousels | Banned outright |
| `font-size < 16px` for body on mobile | Accessibility floor |

---

## Pre-Delivery Checklist

Before any page goes live, verify:

- [ ] Background is `limestone` (#F7F3EE), not white
- [ ] No emoji icons anywhere
- [ ] All icons are Lucide React with stroke-width 1.5
- [ ] Display headings are Playfair, body is Inter
- [ ] Buttons are 2px corner-radius max, no pills
- [ ] One primary CTA per fold
- [ ] No olive green as primary
- [ ] All clickable elements have `cursor-pointer`
- [ ] Hover transitions 200ms ease-out
- [ ] Focus states visible (sage outline 2px offset 2px)
- [ ] Body text contrast ≥ 4.5:1 (test against limestone)
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive at 375 / 768 / 1024 / 1440 px
- [ ] All images have descriptive alt text
- [ ] No horizontal scroll on mobile

# Design System: Rio Largo UK

## 1. Visual theme and atmosphere

The site looks like the product. Rio Largo's tins are wrapped in botanical illustration, the logo is a red fox over a black engraved wordmark, and every real photo we have is shot in daylight: a garden, a kitchen counter, a gingham cloth. So the site is a printed catalogue on warm paper, not a dark luxury page.

Mood: a seed catalogue or a herbarium plate. Calm, daylight, a little old-fashioned, generous with space. Density is low on the homepage and moderate on the shop.

The distinctive move is the **plate**: photographs sit inside a double hairline frame with an arched top (the arch comes from the cartouche on the tin label) and carry a small italic caption underneath, the way a botanical print is captioned. Products are listed as numbered catalogue entries rather than as a grid of cards.

Things this system refuses: dark backgrounds behind the logo (the wordmark is black and disappears), gold gradient text, glow effects, 3D tilt, icon-in-a-box feature cards, animated number counters, an uppercase tracked eyebrow above every heading.

## 2. Colour palette and roles

| Role | Name | Value | Usage |
|---|---|---|---|
| Page background | Paper | `#f6f1e7` | Default background everywhere |
| Raised surface | Paper raised | `#fffdf8` | Form fields, the plate mat, entry panels |
| Sunk surface | Paper sunk | `#ece4d3` | Alternating section band |
| Primary text | Ink | `#1f2a1e` | Headings and body. 13.6:1 on Paper |
| Secondary text | Ink muted | `#566152` | Supporting copy, captions. 5.7:1 on Paper (AA) |
| Hairline | Rule | `#d9cfba` | Dividers, the outer plate frame |
| Strong hairline | Rule strong | `#b9ad93` | Input borders, the inner plate frame |
| Primary action | Fox | `#b5301f` | Buttons, links, prices. 5.5:1 on Paper, white on Fox 6.2:1 (AA) |
| Action pressed | Fox deep | `#8f2416` | Hover and active on Fox |
| Secondary accent | Leaf | `#56693d` | Flavour notes, small markers. 5.3:1 on Paper (AA) |
| Decorative | Oil | `#c79a2e` | The pour line and thin ornaments only. Never text |
| Dark band | Grove | `#26321f` | Footer and the closing call |
| Dark band raised | Grove raised | `#31402a` | Borders and hover inside Grove |
| Text on dark | On grove | `#f6f1e7` | 12.4:1 on Grove |
| Muted on dark | On grove muted | `#b9c2ac` | 7.1:1 on Grove |
| Error | Danger | `#9b1c1c` | Form errors, always with text, never colour alone |

Fox is taken from the logo. It is the only loud colour, and a screen should rarely show more than two Fox elements at once.

## 3. Typography

| Family | Role | Weights | Import |
|---|---|---|---|
| Cormorant Garamond | Display: headings, prices, captions, entry numbers | 500, 600, italic 500 | `next/font/google`, variable `--font-cormorant` |
| Hanken Grotesk | Body, buttons, labels, forms | 400, 500, 600 | `next/font/google`, variable `--font-hanken` |

Cormorant's italic echoes the script on the tin label. Headings mix roman and italic: the italic carries the phrase that matters.

| Token | Size | Line height | Use |
|---|---|---|---|
| `--text-h1` | clamp(2.75rem, 6.4vw, 5.75rem) | 1.02 | Page titles, weight 500, tracking -0.01em |
| `--text-h2` | clamp(2.25rem, 4.2vw, 3.5rem) | 1.08 | Section titles, weight 500 |
| `--text-h3` | 1.75rem | 1.2 | Entry names, weight 600 |
| `--text-lede` | 1.25rem | 1.55 | Intro paragraphs |
| `--text-base` | 1.0625rem | 1.65 | Body |
| `--text-small` | 0.875rem | 1.5 | Supporting copy |
| `--text-label` | 0.75rem | 1.3 | Uppercase labels, tracking 0.16em, weight 600 |

Body copy never runs wider than `--container-measure` (38rem, about 68 characters). Labels are used sparingly: a page gets one or two, not one per section.

## 4. Spacing, layout, radii

- Base unit 4px, Tailwind's default scale. Section padding is `py-24` on mobile and `py-32` from `md`.
- Page container `--container-page` 76rem with a 24px gutter (20px under 640px).
- Layouts are asymmetric 12-column splits (7/5, 5/7), left-aligned. Centred text is reserved for the closing call.
- Breakpoints: Tailwind defaults (640, 768, 1024, 1280). Designed at 390 and 1440.
- Radius: corners are square. The single curve is `--radius-arch` (999px 999px 0 0) on plate frames.
- Elevation: `--shadow-plate` on plates only. Nothing else casts a shadow.

## 5. Component styles

**Button, primary.** Fox background, white text, Hanken 600 at 0.875rem, tracking 0.04em, sentence case, padding 14px 28px, square corners, min-height 48px. Hover and active: Fox deep. Focus-visible: 2px Ink outline offset 3px. Disabled: 50% opacity, `not-allowed`. Loading: label swaps to "Sending…", `wait` cursor.

**Button, secondary.** Transparent, 1px Ink border, Ink text. Hover: Ink background, Paper text. On Grove the border and text are On grove and hover inverts to Paper background with Grove text.

**Text link.** Fox, underlined with a 1px underline offset 4px. Hover: Fox deep. Arrow links end in a right arrow that moves 4px on hover.

**Plate.** Outer 1px Rule frame, 8px Paper raised mat, inner 1px Rule strong frame around the image, arched top, `--shadow-plate`. Caption below in Cormorant italic, Ink muted, prefixed by a plate number in small caps.

**Catalogue entry.** A row between two Rule hairlines: roman numeral in Cormorant (Rule strong colour), name in h3, flavour notes in Leaf label type, description, then price in Cormorant 600 Fox. No card box, no background fill.

**Header.** Paper at 92% opacity with a backdrop blur, 1px Rule bottom border once scrolled. Logo image at 48px tall (it already contains the wordmark, so no duplicate text). Nav links Hanken 500 0.9375rem Ink, Fox on hover, the current page marked with a Fox underline. Mobile drawer is a full-height Paper panel; it locks body scroll, closes on Escape and moves focus to its close button.

**Forms.** Label above the field in Hanken 600 0.875rem Ink. Field: Paper raised, 1px Rule strong, 48px tall, Ink text. Focus: Ink border plus the 2px outline. Errors sit under the field in Danger with an explicit message.

**Ledger list.** Used instead of feature cards: rows split by hairlines, a numeral on the left, a title and one or two sentences on the right. No icons.

## 6. Motion

Dial 4 of 10.

- One orchestrated load on the homepage hero: headline lines rise 24px and fade over 550ms with a 90ms stagger, the plate follows, then the Oil pour line draws downward over 1.2s.
- Sections below reveal once, 16px rise, 550ms, `--ease-settle`. No horizontal slide-ins, no scale-ins, no staggered card cascades.
- State changes (hover, focus, drawer) run at `--duration-state` 180ms.
- Never animated: prices, body text, form fields, anything on a loop. No scroll indicator, no parallax.
- `prefers-reduced-motion`: reveals render in their final state and the pour line appears drawn.

## 7. Voice and copy rules

- Sentence case for headings and buttons. Uppercase only in label type.
- Plain and specific. Say what the estate does (hand harvested, cold extracted on the estate, family owned, Scherpenheuwel Valley near Worcester) and leave out superlatives.
- No statistic, award count, lab figure or quotation unless the owner has supplied a source for it. Testimonials must be real and attributable (ASA CAP Code).
- Be straight about how ordering works: it is a pre-order by email and a person replies.
- British spelling. No long dashes in copy.

## 8. Generation block

```
Rio Largo UK. Light botanical catalogue, daylight, warm paper.
Paper #f6f1e7, raised #fffdf8, sunk #ece4d3, ink #1f2a1e, muted #566152,
rule #d9cfba, rule-strong #b9ad93, fox #b5301f (actions), fox-deep #8f2416,
leaf #56693d, oil #c79a2e (decorative only), grove #26321f (dark band),
grove-raised #31402a, on-grove #f6f1e7, on-grove-muted #b9c2ac, danger #9b1c1c.
Display: Cormorant Garamond 500/600 + italic 500. Body: Hanken Grotesk 400/500/600.
Scale: h1 clamp(2.75rem,6.4vw,5.75rem), h2 clamp(2.25rem,4.2vw,3.5rem), h3 1.75rem,
lede 1.25rem, base 1.0625rem, small 0.875rem, label 0.75rem uppercase 0.16em.
Square corners; arched plate frames (999px 999px 0 0) with double hairline and italic caption.
Shadow (plates only): 0 1px 0 #d9cfba, 0 18px 40px -24px rgb(31 42 30 / 0.35).
Asymmetric left-aligned splits, container 76rem, measure 38rem.
Products as numbered catalogue entries between hairlines, not cards.
Motion: one hero load sequence, single 16px rise reveals, 550ms cubic-bezier(0.22,1,0.36,1); state 180ms.
Sentence case. No unverified numbers or quotes.
```

---

**Provenance.** Generated 2026-09-18 with `design-forge`. Sources read: `public/images/logo-500w.webp`, `bottle-500ml-800w.webp`, `source/pro-shot.webp`, `source/hero-slider-1.png`, `source/estate-recent.jpg` (brand colours and label typography), riolargo.co.za homepage (voice and verifiable claims). Database query: `ui-ux-pro-max` "artisan food olive oil estate ecommerce warm editorial mediterranean sunlit" returned Exaggerated Minimalism with Cinzel / Josefin Sans and a pink accent; kept its oversized type and negative space, replaced fonts and palette with ones drawn from the packaging. Logged in `~/.claude/design-log.md`.

**Changelog.**
- 2026-09-18: first version. Replaces the undocumented dark theme (`#0C0C0C`, gold `#C9A84C`, Playfair Display, DM Sans).

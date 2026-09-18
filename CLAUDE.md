# Rio Largo UK — Claude Code Handover

## What this project is
Static marketing + pre-order site for Rio Largo award-winning South African olive oil,
spun out of the owner's general store at sidwells.net.
Owner is a retired, non-technical father-in-law; site is built so he can take orders
via email confirmations and manage dispatch manually.

## Stack
- Next.js 14 App Router, `output: "export"` (fully static)
- TypeScript strict, Tailwind CSS v4 (via `@theme`), `motion/react` (Framer Motion lazy)
- Live at https://riolargo.co.uk/ (Cloudflare Worker serving the static export)
- No database, no server runtime. All interactivity is client-side.
- No forms and no third-party form service. Contact is a `mailto:` link.

## Design authority
`design/DESIGN.md` is law for any UI change, with tokens in `design/tokens.css`
(imported by `globals.css`). Light botanical catalogue: warm paper, olive ink, fox red
from the logo, Cormorant Garamond + Hanken Grotesk. Never put the logo on a dark
background (the wordmark is black). No unsourced stats, award counts or quotes in copy.

## Repo + infra
- GitHub: https://github.com/JVFourths/riolargo-uk (branch `master`)
- Cloudflare account: johan@jkmv.co.uk — account ID `d5fbd486ce2e2f4c99315afa66198462`
- **Production = Cloudflare Worker `riolargo-uk`** (Workers static assets, `wrangler.jsonc`),
  which owns the custom domains `riolargo.co.uk` and `www.riolargo.co.uk`.
  Deploy: `npx next build && npx wrangler deploy`. A push to GitHub does not deploy.
- Staging copy: Pages project `riolargo-uk` at https://riolargo-uk.pages.dev/
  (`npx wrangler pages deploy out --project-name riolargo-uk --branch master`).
- wrangler must be logged in as johan@jkmv.co.uk (this machine is usually logged in to Gable).
- Build command: `npx next build` → output in `out/`
- Publish directory: `out`

## File structure
```
src/
  app/
    page.tsx                  Homepage (Hero + Products + About + Awards + CTA)
    layout.tsx                Root layout, fonts, MotionProvider, Header, Footer
    globals.css               Tailwind v4 @theme tokens + base + utilities
    shop/
      page.tsx                Server component — exports metadata
      shop-content.tsx        Client UI
    about/{page.tsx,about-content.tsx}
    contact/{page.tsx,contact-content.tsx}
    shipping/{page.tsx,shipping-content.tsx}
  components/
    layout/{header,footer}.tsx
    sections/                 Homepage sections
      hero.tsx
      harvest-section.tsx     Southern-hemisphere harvest pitch + month calendar
      products-grid.tsx       Reads src/lib/products.ts
      about-section.tsx
      awards.tsx
      cta-section.tsx
    ui/
      plate.tsx               Arched double-hairline photo frame with italic caption
      catalogue-entry.tsx     Numbered product row (homepage + shop)
      ledger.tsx              Numbered hairline list (used instead of feature cards)
    motion-config.tsx         MotionProvider, `rise` variant, `Reveal` wrapper
  lib/
    products.ts               Single source of truth for the 3 SKUs + waitlist items
    endpoints.ts              CONTACT_EMAIL (Sidwell's address until a Rio Largo mailbox exists)
    site.ts                   SITE_URL + route list (canonical, sitemap, robots)
    structured-data.ts        schema.org Product/WebSite/Brand, derived from products.ts
    utils.ts                  cn() helper
public/images/                Only the webp images the site uses
assets-src/                   Raw image sources (source/ is gitignored). Never put raw files in public/.
```

## Content / commerce model
- **The range mirrors https://sidwells.net/product-category/olive-oil/.** The owner runs
  Sidwell's (sole UK supplier of Rio Largo, also sells gin, brandy, wine). This site lifts
  the oil onto its own site. **Only show products that are listed on sidwells.net.**
- Currently four: Botanicals, Belle Fiore, Karoo Splendor (500ml, £13.00) and the
  1 Litre (£22.00). Each has its own photo, taken from sidwells.net.
- Images from riolargo.co.za (the SA producer) are cleared for use. Labels sold only in
  SA (Blue Delft, Moroccan Tile, etc.) must not appear.
- **No cart, checkout or order form here.** Each product's button opens its page on
  sidwells.net (`orderUrl` in `src/lib/products.ts`), where the customer pays. Delivery
  charges and returns are Sidwell's: never state delivery prices or "free delivery" here.
- **Contact page** has no form: it offers `mailto:` links to `CONTACT_EMAIL`.

## Before the site takes real traffic
1. (Done differently) No Formspree: contact is a mailto link, ordering is on sidwells.net.
2. Create a favicon and drop it in `src/app/favicon.ico`.
3. (Done) `/privacy`. It states the site sets no cookies, runs no tracking and has no forms:
   update it in the same commit if that ever stops being true.
4. Add `app/sitemap.ts`, `app/robots.ts`, OG image in `src/app/`.
5. (Done) Product JSON-LD on the shop page.
6. Integrate a real-reviews widget (Trustpilot / Judge.me) — testimonials section was
   deleted because the quotes were fabricated.
7. (Done) `riolargo.co.uk` is owned and attached to the production Worker.

## Common tasks
- **Change a product**: edit `src/lib/products.ts`. Both the homepage grid and the
  shop page read from there.
- **Add a new page**: create `src/app/<slug>/page.tsx` (server, `export const metadata`)
  + `<slug>-content.tsx` (client, `"use client"`).
- **Change copy on a shared section**: `src/components/sections/*.tsx`.
- **Tweak colours/fonts**: `design/tokens.css` `@theme` block, and record the change in `design/DESIGN.md`.

## Tracking files (global convention)
- `tasks/todo.md` — current-session plan, reviewed at session start.
- `tasks/changelog.md` — append dated entries at session end.
- `tasks/lessons.md` — project-specific corrections.

# Rio Largo UK — Claude Code Handover

## What this project is
Static marketing + pre-order site for Rio Largo award-winning South African olive oil.
Owner is a retired, non-technical father-in-law; site is built so he can take orders
via email confirmations and manage dispatch manually.

## Stack
- Next.js 14 App Router, `output: "export"` (fully static)
- TypeScript strict, Tailwind CSS v4 (via `@theme`), `motion/react` (Framer Motion lazy)
- Deployed to Cloudflare Pages: https://riolargo-uk.pages.dev/
- No database, no server runtime. All interactivity is client-side.
- Form submissions POST to Formspree — see `src/lib/endpoints.ts`.

## Repo + infra
- GitHub: https://github.com/JVFourths/riolargo-uk (branch `master`)
- Cloudflare account: johan@jkmv.co.uk — account ID `d5fbd486ce2e2f4c99315afa66198462`
- Cloudflare Pages project: `riolargo-uk` (auto-deploys from GitHub push)
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
      products-grid.tsx       Reads src/lib/products.ts
      about-section.tsx
      awards.tsx
      cta-section.tsx
    ui/
      product-card-3d.tsx     Mouse-tracked 3D tilt card
      waitlist-form.tsx       Shared pre-order + notify-me form
    motion-config.tsx         Shared motion variants (fadeUp, staggerContainer, etc.)
  lib/
    products.ts               Single source of truth for the 3 SKUs + waitlist items
    endpoints.ts              Formspree form endpoint (placeholder ID to replace)
    utils.ts                  cn() helper
public/images/                All product + estate imagery as webp
```

## Content / commerce model
- **3 bottles for sale** (all 500ml at £13.00): Botanicals, Belle Fiore, Karoo Splendor.
  They are three **label designs of the same 500ml bottle** — use the same product
  image for all three. Differentiation is in `flavourNotes`, `tagline`, `description`,
  `pairing` in `src/lib/products.ts`.
- **2 waitlist items** (not yet imported to UK): 1L and 2L decanters.
- **No cart/checkout.** The Pre-Order button opens a `<WaitlistForm>` that captures
  an email + product via Formspree. The owner then emails the customer to complete
  payment/shipping manually. This is a deliberate "human-in-the-loop" approach.
- **Contact form** also posts to Formspree.

## Before the site takes real traffic
1. Create a Formspree form and replace `FORMSPREE_FORM_ID` in `src/lib/endpoints.ts`.
2. Create a favicon and drop it in `src/app/favicon.ico`.
3. Add legal pages (privacy / terms / cookies) — not yet in scope.
4. Add `app/sitemap.ts`, `app/robots.ts`, OG image in `src/app/`.
5. Add Product JSON-LD on the shop page.
6. Integrate a real-reviews widget (Trustpilot / Judge.me) — testimonials section was
   deleted because the quotes were fabricated.
7. Buy `riolargo.co.uk` and attach to Cloudflare Pages.

## Common tasks
- **Change a product**: edit `src/lib/products.ts`. Both the homepage grid and the
  shop page read from there.
- **Add a new page**: create `src/app/<slug>/page.tsx` (server, `export const metadata`)
  + `<slug>-content.tsx` (client, `"use client"`).
- **Change copy on a shared section**: `src/components/sections/*.tsx`.
- **Tweak colours/fonts**: `src/app/globals.css` `@theme` block.

## Tracking files (global convention)
- `tasks/todo.md` — current-session plan, reviewed at session start.
- `tasks/changelog.md` — append dated entries at session end.
- `tasks/lessons.md` — project-specific corrections (not yet created).

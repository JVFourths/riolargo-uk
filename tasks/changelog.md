## 2026-04-17 — Credibility pass: honest CTAs, real metadata, logo wired

Review against live site flagged five launch blockers. Fixed all five in one pass.

- **Removed fabricated testimonials.** `sections/testimonials.tsx` deleted and
  dropped from `app/page.tsx`. Quotes ("Sarah M., London" etc.) were invented;
  ASA CAP Code requires testimonials to be genuine and verifiable. Will reintroduce
  via Trustpilot / Judge.me widget when real reviews exist.
- **Fixed product image / SKU mismatch.** Previously the shop used `bottle-500ml`,
  `bottle-1l`, `bottle-2l` images for three SKUs all labelled 500ml. Centralised
  all product data in `src/lib/products.ts` with `SMALL_BOTTLE_IMAGE` reused across
  all three. Differentiation now happens via `flavourNotes`, `tagline`,
  `description`, `pairing` fields.
- **Unified waitlist CTA.** Built `components/ui/waitlist-form.tsx` — reusable
  email-capture with two intents (`preorder`, `notify`). Shop's "Add to Basket"
  dead button replaced with "Pre-Order — We'll Email You" flow that POSTs to
  Formspree (placeholder form ID in `lib/endpoints.ts` — TODO for owner).
  Larger-size decanters keep "Notify Me When Available" via the same component.
- **Wired contact form.** Previously `e.preventDefault()` dead-end — now posts
  to the same Formspree endpoint with proper submitting/success/error states.
- **Added per-page metadata.** Split `shop`, `about`, `contact`, `shipping` into
  server `page.tsx` (exports `metadata`) + client `*-content.tsx` (UI). Each
  page now has its own title, description, and OpenGraph tags.
- **Activated logo in header.** `/images/logo-250w.webp` rendered next to the
  "Rio Largo" text with `alt=""` + link-level `aria-label`. Decorative image +
  accessible text.
- **Rewrote stale CLAUDE.md.** Old handover still described the deleted Stripe/D1/
  Resend stack. Now reflects the v2 static export + Formspree reality.

- Build verified: `npx next build` green, all 8 routes static-prerendered.
- Dev server spot-checked via Playwright MCP at 1440×900: logo, pre-order flow,
  decanter waitlist all render correctly.

- **Open threads:**
  1. Owner must replace `YOUR_FORMSPREE_ID` in `src/lib/endpoints.ts` with a real
     form ID before launch, or no form submissions land anywhere.
  2. No favicon — causes 404 on every page load.
  3. No legal pages (privacy / terms / cookies) — UK/GDPR requirement before
     accepting any email address.
  4. No sitemap.ts, robots.ts, or OG image yet.
  5. No Product JSON-LD schema on shop page.
  6. Mobile drawer still lacks focus trap + body scroll lock.
  7. Fabricated testimonials removed; real-reviews widget not yet added.

## 2026-04-10 — Product images, correct names, waitlist, and deploy

- Replaced AI-generated white-background bottle images with real product photos from sidwells.net
- Corrected product names to match actual variants: Botanicals, Belle Fiore, Karoo Splendor (all 500ml at £13.00)
- Removed mix-blend-multiply hack from product-card-3d.tsx (no longer needed with real photos)
- Added "Larger Sizes" waitlist section with 1L and 2L decanter images from riolargo.co.za
- Waitlist has "Notify Me When Available" button → email capture → confirmation (UI-only, no backend)
- Configured Next.js static export (`output: "export"`) for Cloudflare Pages compatibility
- Created Cloudflare Pages project `riolargo-uk` on johan@jkmv.co.uk account
- Deployed via `wrangler pages deploy out` — live at https://riolargo-uk.pages.dev/
- **Open threads:**
  1. Waitlist email capture is UI-only — needs backend (Resend/Mailchimp) to actually collect emails
  2. Shop "Add to Basket" buttons still UI-only — no cart/checkout
  3. Contact form still UI-only — no backend
  4. No favicon or OG images
  5. No custom domain yet (riolargo.co.uk)
  6. Wrangler logged back in as jv@thefourths.com needed for other projects

## 2026-04-10 — Full site rebuild: animated marketing site

- **Removed** entire Cloudflare Pages e-commerce stack (Stripe, D1, Resend, admin panel, webhooks, wrangler config)
- **Rebuilt** as animated marketing/branding site: Next.js 14, TypeScript, Tailwind CSS v4, motion (Framer Motion)
- **Design system**: Dark editorial — #0C0C0C bg, gold #C9A84C accent, olive green #6B8E3A. Playfair Display + DM Sans fonts
- **Homepage sections**: Hero (staggered word reveal), Products Grid (3D cards), Southern Advantage (animated counters), Awards (bento grid), Testimonials (auto-rotating slider), CTA (parallax)
- **Pages**: /, /shop, /about, /shipping, /contact — all with scroll-triggered animations
- **3D product cards**: Mouse-tracking tilt, cylindrical lighting simulation, mix-blend-multiply to dissolve white photo backgrounds, specular highlight, floor shadow
- **Nav**: Sticky header with transparent→solid scroll transition, backdrop blur, mobile drawer with spring animation
- Build verified passing, dev server confirmed at :3009
- **Open threads:**
  1. No deployment target configured yet (old Cloudflare config removed)
  2. Shop "Add to Basket" buttons are UI-only — no cart/checkout functionality
  3. Contact form is UI-only — no backend
  4. Product images still have baked-in white backgrounds — mix-blend-multiply helps but proper background removal would be better
  5. No favicon or OG images set up

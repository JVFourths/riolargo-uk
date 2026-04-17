# Credibility pass — 2026-04-17

Goal: kill misleading content and dead CTAs, add SEO basics, activate logo.

## Tasks
- [ ] **Product data** — single source in `src/lib/products.ts`. Fix 500ml/1L/2L image mismatch (all current SKUs are 500ml label variants).
- [ ] **Testimonials** — remove fabricated quotes from `page.tsx` until real reviews exist (ASA/CAP Code compliance).
- [ ] **Waitlist pattern** — unify all purchase CTAs to "Notify Me" pre-launch pattern. Wire to Formspree with placeholder form ID and TODO comment.
- [ ] **Metadata** — split each non-home page into server `page.tsx` (metadata export) + client `*-content.tsx` (UI). Shop, About, Contact, Shipping.
- [ ] **Logo** — use `/images/logo-250w.webp` in header instead of text-only.
- [ ] **Docs** — rewrite stale `CLAUDE.md`, append changelog entry.

## Out of scope (next pass)
- Real commerce (Stripe Payment Links or Shopify Buy Button)
- Product JSON-LD schema, sitemap.ts, robots.ts, OG image
- Legal pages (privacy / terms / cookies)
- Real testimonials widget (Trustpilot / Judge.me)
- Mobile drawer focus trap
- Perf: lazy-load below-fold sections

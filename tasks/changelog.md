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

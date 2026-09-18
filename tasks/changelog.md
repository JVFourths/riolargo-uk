## 2026-09-18 — Old database deleted; repo and SEO cleanup

- **Correction:** I had reported D1 `riolargo-db` as having 0 tables, read from the D1 list API, which does not populate `num_tables`. `wrangler d1 info` showed 2. Inspected before deleting: `orders` had 0 rows and no `sqlite_sequence` entry (nothing ever inserted); `inventory` had 3 seed rows (50/40/25 stock, identical timestamps 2026-04-06, including a 2 Litre never sold). No customer data. Deleted with Johan's approval (`wrangler d1 delete riolargo-db`). See lessons.
- Moved raw image sources out of the published folder: `public/images/source` and `public/images/generated` are now `assets-src/source` (gitignored) and `assets-src/generated`. They were being exported and served publicly.
- Removed 42 unused derived images (old bottle shots, waitlist decanters, AI-generated estate scenes, recipe crops, unused size variants). `public/images` now holds the 8 images the site uses plus `logo-500w.webp`.
- Added `src/lib/site.ts` (`SITE_URL = https://riolargo.co.uk`), `metadataBase` and per-page canonical tags on the bare domain, `sitemap.ts`, `robots.ts`, a fox favicon (`icon.png`, `apple-icon.png`) cut from the logo, and an Open Graph image. Root meta description no longer says "cold-pressed, delivered fresh".
- Verified: `tsc` clean, `next build` green (13 static outputs), every `/images/...` path referenced in `src` exists, canonical tags and sitemap checked in `out/`.
- **Open threads:**
  1. Deploy: `npx wrangler deploy` (Johan, classifier blocks it for me), then I verify.
  2. Dashboard: turn on Always Use HTTPS, and add a redirect rule from www to the bare domain.
  3. Still open from April: legal pages (lighter now that the site collects no data), Product JSON-LD, real reviews widget.

## 2026-09-18 — riolargo.co.uk cut over to the new site; old site closed

- Johan ran `npx wrangler deploy`. Worker `riolargo-uk` now serves the static export (version `7fc001ae`), replacing the old OpenNext shop build (`465e5da2`).
- Verified on both `riolargo.co.uk` and `www.riolargo.co.uk`: home, shop, about, shipping, contact all 200 with the new content (hero, harvest section, Sidwell's order links, returns link); unknown paths return the 404 page; old `/admin` now 404; `x-powered-by: Next.js` header gone. No DNS change, no downtime.
- **Open threads:**
  1. `http://riolargo.co.uk` answers 200 instead of redirecting to https. Turn on "Always Use HTTPS" for the zone (SSL/TLS > Edge Certificates). Not possible with wrangler's scopes.
  2. Apex and www serve identical pages. Pick one as canonical (redirect rule, plus `metadataBase` and a canonical tag in `layout.tsx`), then add `sitemap.ts` and `robots.ts` now that the domain is final.
  3. Delete the empty D1 database `riolargo-db` once Johan confirms.
  4. `public/images/source/` is gitignored but still gets exported and published (raw source images, including the new `source/sidwells/` folder). Move it out of `public/`, and delete the unused `bottle-*`, `waitlist-*` and AI-generated images.
  5. Also available at https://riolargo-uk.johan-d5f.workers.dev (workers.dev) and https://riolargo-uk.pages.dev (staging).

## 2026-09-18 — Harvest section live; riolargo.co.uk cutover prepared, one command pending

- Added `sections/harvest-section.tsx` to the homepage (after the hero): "Pressed this year, not last", southern harvest March to July against the northern October to December, with a 12-month calendar. Carried over from the old riolargo.co.uk site at Johan's request. Wording kept to geography; dropped "the only fresh oil" and "stale". Committed, deployed to riolargo-uk.pages.dev, verified live.
- **Domain investigation (via Cloudflare API with wrangler's login):** zone `riolargo.co.uk` is active in the johan@jkmv.co.uk account. Both `riolargo.co.uk` and `www.riolargo.co.uk` are Worker custom domains on a **Worker named `riolargo-uk`** (last deployed 2026-04-08, version `465e5da2`), which is the old OpenNext e-commerce build. Its bindings: static assets plus D1 `riolargo-db`. The database has 0 tables, so it never stored an order. No secrets attached.
- wrangler's OAuth scopes cannot read or write DNS, so moving the domain to the Pages project would have meant downtime until a CNAME was added by hand.
- **Decision:** deploy the static export into the existing `riolargo-uk` Worker using Workers static assets (`wrangler.jsonc`, `assets.directory = ./out`). Domains stay attached, no DNS change, no downtime, old site replaced in the same step. Old versions stay available for `wrangler rollback`.
- `wrangler deploy --dry-run` passes (145 files, no bindings).
- **Blocked:** the real `npx wrangler deploy` was denied by the Claude Code permission classifier as a production deploy. Johan to run it.
- **Open threads:**
  1. Run `npx wrangler deploy`, then verify riolargo.co.uk and www.
  2. After cutover: delete the empty D1 database `riolargo-db`, and decide whether to keep the `riolargo-uk` Pages project (pages.dev) as a staging copy or delete it.
  3. `riolargo.co.uk` has no MX records, so no mailbox exists yet. `CONTACT_EMAIL` stays on Sidwell's.

## 2026-09-18 — riolargo.co.uk already exists and serves a different, older site

- Johan confirmed the domain is owned. Checked: nameservers are Cloudflare (bethany/dan), apex and www both return 200.
- **Finding:** the domain does not serve this repo's build. It serves an older server-rendered Next.js Rio Largo site (`x-powered-by: Next.js`, headline "Pressed this year. Not last.", nav Home / Shop / The Advantage / Our Story / Awards / Shipping, and a live `/admin` route). That matches the Stripe/D1 e-commerce build removed from this repo in April, probably running as a Worker.
- The `riolargo-uk` Pages project has only `riolargo-uk.pages.dev` attached, no custom domain, and no Git provider (confirms direct upload).
- **Not done, needs Johan's go-ahead:** moving riolargo.co.uk to the new site replaces a live site and its admin. wrangler has no command for Pages custom domains, so it is a dashboard job: Workers & Pages > riolargo-uk > Custom domains > add `riolargo.co.uk` and `www.riolargo.co.uk`, after removing the domain/route from whatever currently holds it.
- Note: the old site's "southern hemisphere harvest, fresh when northern oil is stale" angle is a strong selling point that the new site lacks. Worth carrying over once the owner confirms the harvest months.

## 2026-09-18 — Deployed to production; Cloudflare plugin installed

- Johan re-authenticated wrangler as johan@jkmv.co.uk. Built and ran `wrangler pages deploy out --project-name riolargo-uk --branch master`. 126 files uploaded.
- Verified on https://riolargo-uk.pages.dev/: all five pages return 200, new hero copy is served, shop links to all four Sidwell's product pages, delivery page links to Sidwell's returns policy, no "Free UK" or `orders@riolargo` text anywhere.
- Installed the official Cloudflare Claude Code plugin at Johan's request, following https://developers.cloudflare.com/agent-setup/prompt.md: `claude plugin marketplace add cloudflare/skills` then `claude plugin install cloudflare@cloudflare` (user scope, v1.0.0). Adds 14 skills and one MCP server (`https://mcp.cloudflare.com/mcp`).
- Audited the repo first with `skill-security-auditor`. Scanner verdict was FAIL, overridden after manual review: the 3 criticals were documentation lines mentioning secrets, the 6 highs were manifest dotfolders. No hooks, no binaries; scripts only contact api.cloudflare.com, challenges.cloudflare.com and github.com.
- **Open threads:**
  1. Run `/reload-plugins` to activate the plugin; the Cloudflare MCP server will ask for OAuth on first use.
  2. wrangler is now signed in to the personal Cloudflare account. Gable work needs `npx wrangler login` as johan.visser@gable.group again.
  3. Still worth connecting the Pages project to GitHub so pushes deploy by themselves.

## 2026-09-18 — Committed and pushed; live deploy still pending

- Johan reviewed locally and approved. Committed as `75d4e9c` on `design/botanical-refresh`, fast-forwarded `master`, pushed to GitHub.
- **Finding:** the push did not deploy. After 5 minutes https://riolargo-uk.pages.dev/ still served the old build. The Pages project looks like a direct-upload project (first deployed with `wrangler pages deploy out` in April), not one connected to GitHub, so CLAUDE.md's "auto-deploys from GitHub push" was wrong. Corrected.
- **Blocked:** wrangler on this machine is signed in as johan.visser@gable.group, which has no access to the johan@jkmv.co.uk account that owns the project (API auth error 10000). Did not switch logins, since that affects Gable work.
- **To deploy:** `npx wrangler logout`, `npx wrangler login` as johan@jkmv.co.uk, then `npx next build` and `npx wrangler pages deploy out --project-name riolargo-uk --branch master`. Log back in to Gable afterwards. Or connect the Pages project to the GitHub repo in the Cloudflare dashboard so pushes deploy by themselves.

## 2026-09-18 — Contact form replaced with email links

- **Decision (Johan):** drop the contact form rather than set up Formspree. The form posted to a placeholder ID, so messages went nowhere.
- Contact page now has a primary `mailto:` button to `info@sidwells.net`, three topic rows (oils, an order, wholesale) that open an email with the subject filled in, and Sidwell's London address beside the estate's. Removed the "reply within 24 hours" promise, since nobody has confirmed it.
- `endpoints.ts` now only exports `CONTACT_EMAIL`. Formspree is gone from the codebase, which also closes the oldest launch blocker and means the site collects no personal data itself.
- Verified: `tsc` clean, `next build` green.

## 2026-09-18 — Contact email switched to Sidwell's

- Johan confirmed the riolargo.co.uk domain and mailbox do not exist yet. `orders@riolargo.co.uk` was shown in the footer, contact page and form error message, so customer mail would have bounced.
- Replaced with `info@sidwells.net` via one constant, `CONTACT_EMAIL` in `src/lib/endpoints.ts` (renamed from `ORDERS_EMAIL`). The delivery page now imports it too. Change that one line when a Rio Largo address exists.
- Verified: `tsc` clean, `next build` green, no `riolargo.co.uk` left in `src/`.
- **Open thread:** the contact form still posts to the placeholder Formspree ID, so messages go nowhere until a real form ID is set in `endpoints.ts`. Its error message does point people to the working email.

## 2026-09-18 — Ordering now goes to sidwells.net

- **Decision (Johan):** no ordering on this site. Every product button opens that product's page on sidwells.net in a new tab (`orderUrl` in `products.ts`). All four URLs return 200.
- Deleted `ui/waitlist-form.tsx` and all pre-order-by-email copy. Header button now reads "Shop the oils". Formspree is only used by the contact form now.
- **Found:** Sidwell's checkout charges GBP 5.20 regular delivery on a single 500ml (checked with a test basket). This site promised "Free UK delivery" in six places. All removed.
- **Found:** the old shipping page (free Royal Mail Tracked 48, same-day dispatch before 2pm, 14-day guarantee) contradicted Sidwell's actual terms: 7-day returns, unused and in original packaging, return postage paid by the customer, full refund or replacement if the fault is theirs. Rewrote the delivery page from Sidwell's policy and linked to it. No delivery price is hardcoded.
- Verified: `tsc` clean, `next build` green.
- **Open threads:**
  1. Footer and contact page show `orders@riolargo.co.uk`. Sidwell's uses `info@sidwells.net`. Owner to confirm which address customers should see, and whether the riolargo one exists.
  2. Sidwell's returns policy is 7 days and has a `{email address}` placeholder left in it. UK distance-selling rules generally give consumers 14 days to cancel, so the owner may want to review that policy on sidwells.net.
  3. `available` in `products.ts` is no longer read by the UI.

## 2026-09-18 — Range aligned to sidwells.net (the brief, clarified)

- **New context from Johan:** the owner already sells these oils on https://sidwells.net/ alongside gin, brandy and wine (Sidwell's is the sole UK supplier of Rio Largo). This site exists to lift the oil onto its own, better site. Only products listed on sidwells.net may be shown. The oil comes from the estate owner, so images from riolargo.co.za are cleared for use.
- Checked sidwells.net `/product-category/olive-oil/`: four products. Botanicals, Belle Fiore, Karoo Splendor (500ml, GBP 13) and **Rio Largo Extra Virgin Olive Oil 1 Litre at GBP 22, in stock**.
- Fixed: the site listed the 1L as "not yet in the UK" and showed a 2L that Sidwell's does not sell. `products.ts` now holds the four real products; `waitlistProducts` and the "Larger sizes" shop section are gone.
- Fixed: each label has its own photo on sidwells.net. Pulled all four (`label-botanicals`, `label-belle-fiore`, `label-karoo-splendor`, `decanter-1l`), so the same picture is no longer reused. The old CLAUDE.md note saying "use the same image for all three" was wrong.
- Removed the kitchen photo of three decanters added earlier today: those labels (Blue Delft and others) are SA-only, not in the UK range.
- Homepage collection is now four arched plates in a staggered row; the shop is four catalogue rows, each with its own photo, notes, price and pre-order form. 1L copy uses only what sidwells.net states (Italian varieties, cold extracted, gravity strained, store cool and dark).
- Verified: `tsc` clean, `next build` green, screenshots of home and shop at 1440 and shop at 390. Preview server stopped by PID this time.
- **Open threads:**
  1. Belle Fiore shows no price button or stock flag on sidwells.net, so it may be out of stock. Listed as available here; owner to confirm. Setting `available: false` in `products.ts` switches its button to "Tell me when it arrives".
  2. Decide how the two sites relate: link from sidwells.net to here, and whether ordering stays email-only or hands off to the Sidwell's checkout.
  3. Unused images can be deleted once the branch is approved: `bottle-*`, `waitlist-*`, and the AI-generated estate shots.

## 2026-09-18 — Design review and rebuild: dark gold theme replaced with a botanical catalogue

- Reviewed every page against the current design skills (design-build, design-forge, frontend-design, ui-ux-pro-max). Main finding: the dark `#0C0C0C` and gold theme fought the real brand. The decanters are botanical prints shot in daylight, and the logo's black wordmark was close to invisible on the dark header.
- Other findings fixed: gold gradient text, 3D tilt card with glow, 2x2 icon-box feature grid, animated stat counters, an uppercase eyebrow on every section, identical fade-ups everywhere, scroll indicator, the same product photo repeated three times in a card grid.
- Wrote the project's first design authority: `design/DESIGN.md` and `design/tokens.css` (imported by `globals.css`). Paper `#f6f1e7`, ink `#1f2a1e`, fox red `#b5301f` from the logo, Cormorant Garamond and Hanken Grotesk.
- New shared components: `ui/plate.tsx` (arched double-hairline photo frame with caption), `ui/catalogue-entry.tsx` (numbered product row), `ui/ledger.tsx` (numbered hairline list), `Reveal` in `motion-config.tsx`. Deleted `ui/product-card-3d.tsx`.
- Rebuilt header, footer, all five homepage sections, shop, about, shipping, contact and the waitlist form. Form logic and Formspree wiring unchanged.
- Closed old open thread 6: mobile drawer now locks body scroll, closes on Escape, moves focus to the close button and returns it to the opener. Added a skip link, visible focus rings, `aria-current` on nav, form labels, `role=status` and `role=alert`.
- Swapped AI-generated estate imagery for real photos on every page touched. New webp conversions: `trio-kitchen`, `brenda-and-nick`, `oil-poured-pan`. The `generated/` derived files are still in `public/images` but no longer referenced.
- **Decision:** removed claims with no source: "30+ international awards", "15+ years", "3 continents", "pressed within 4 hours", "acidity below 0.3%", the varietal list, nitrogen tanks, and the unattributed "finest in the Southern Hemisphere" quote (same ASA CAP Code problem as the testimonials removed in April). Replacement copy uses only what riolargo.co.za states. Any of these can go back once the owner confirms them.
- **Decision:** the 500ml pack is called a "decanter" in new copy (the producer's own term). `products.ts` field names unchanged.
- Verified: `tsc --noEmit` clean, `next build` green with 8 static routes, screenshots at 1440 and 390 for home and shop, 1440 for about and contact, no horizontal overflow, mobile menu behaviour checked in the browser.
- Work is on branch `design/botanical-refresh`, uncommitted and not pushed, so the live site is unchanged.
- **Mistake:** stopped the local preview server with `taskkill /F /IM node.exe`, which killed every node process on the machine, including the session's MCP servers. See lessons.
- **Open threads:**
  1. Johan to review the branch, then commit and push to deploy.
  2. Owner to confirm the removed claims and whether "decanter" is the right word for the 500ml pack.
  3. Shipping page still promises same-day dispatch before 2pm, which sits oddly with a pre-order-by-email flow. Copy decision for the owner.
  4. Still open from April: Formspree ID, favicon, legal pages, sitemap and robots, OG image, Product JSON-LD, reviews widget.
  5. Delete unused generated images and the stray root-level screenshots once the branch is approved.

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

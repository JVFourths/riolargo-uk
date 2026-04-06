# Rio Largo UK - Claude Code Handover

## What this project is
A Next.js e-commerce website for Rio Largo award-winning South African olive oil,
deployed on Cloudflare Pages for a retired, non-technical father-in-law to manage.

## Current status: BUILD FAILING on Cloudflare Pages
The site code is complete and pushed to GitHub. The Cloudflare Pages build is failing.
Your job is to fix the build and get the site live.

## Repository
GitHub: https://github.com/JVFourths/riolargo-uk
Branch: master
Local copy: C:\Users\Fish\Downloads\riolargo-deploy\riolargo-uk

## Cloudflare account
Account: johan@jkmv.co.uk
Account ID: d5fbd486ce2e2f4c99315afa66198462
Dashboard: https://dash.cloudflare.com/d5fbd486ce2e2f4c99315afa66198462/pages/view/riolargo-uk

## Infrastructure already created (DO NOT recreate)
- Cloudflare Pages project: riolargo-uk (connected to GitHub, auto-deploys on push)
- Cloudflare D1 database: riolargo-db
  - ID: 7306d08a-b14a-45e5-9d6a-0777035345e6
  - Tables: orders, inventory (already created and seeded with 3 products)

## The build error
```
npm error ERESOLVE unable to resolve dependency tree
npm error Found: next@undefined
npm error peer next@">=14.3.0 && <=15.5.2" from @cloudflare/next-on-pages@1.13.16
```

## What has been tried
1. Deleted package-lock.json (commit 94946ee) - but npm ci requires lock file
2. Added .npmrc with legacy-peer-deps=true (commit 5a93d1c)

## Likely remaining issue
Cloudflare Pages uses `npm ci` by default which REQUIRES package-lock.json.
Without it, the build will fail with "Missing package-lock.json".

## How to fix
Option A (recommended): Generate a fresh package-lock.json locally and push it
```bash
cd C:\Users\Fish\Downloads\riolargo-deploy\riolargo-uk
npm install --legacy-peer-deps
git add package-lock.json
git commit -m "fix: add fresh package-lock.json for Cloudflare build"
git push origin master
```

Option B: Change Cloudflare Pages build settings to use npm install instead of npm ci
- Go to Pages project > Settings > Builds & deployments
- Set build command to: npm install --legacy-peer-deps && npx @cloudflare/next-on-pages
- Or set environment variable NPM_FLAGS=--legacy-peer-deps

Option C: Pin next to exact version in package.json that satisfies peer deps
- next must be >=14.3.0 and <=15.5.2
- Change "next": "^14.3.0" to "next": "14.3.0" in package.json

## Tech stack
- Next.js 14 (App Router)
- Cloudflare Pages (edge runtime, NOT Node.js)
- Cloudflare D1 (SQLite database - replaces better-sqlite3)
- Stripe (payments)
- Resend (emails)
- Tailwind CSS v3

## IMPORTANT: This is edge runtime, not Node.js
All API routes have `export const runtime = 'edge'`
All DB calls use Cloudflare D1 binding: `const { env } = getRequestContext(); env.DB`
Do NOT use better-sqlite3 or any Node.js-only packages

## Build command (in Cloudflare Pages settings)
Build command: npx @cloudflare/next-on-pages
Output directory: .vercel/output/static
Node version: 22

## D1 binding required
In Cloudflare Pages Settings > Bindings > D1 Database:
- Variable name: DB
- Database: riolargo-db

## Environment variables needed (not yet set in Cloudflare)
After the build succeeds, add these in Pages > Settings > Environment Variables:
- STRIPE_SECRET_KEY (from stripe.com dashboard)
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (from stripe.com dashboard)
- STRIPE_WEBHOOK_SECRET (from Stripe webhook settings)
- RESEND_API_KEY (from resend.com)
- FROM_EMAIL = orders@riolargo.co.uk
- ADMIN_EMAIL = (father-in-law email address)
- ADMIN_PASSWORD = (choose a strong password for the admin panel)
- NEXT_PUBLIC_SITE_URL = https://riolargo-uk.pages.dev (update when domain bought)

## Admin panel
Once live, the admin panel is at: https://riolargo-uk.pages.dev/admin
Password protected. Father-in-law uses it to:
- View orders (automatically created when Stripe payment completes)
- Mark orders as dispatched (triggers automatic customer email with tracking)
- Update stock levels when new shipment arrives from South Africa

## What the site does automatically
- Customer orders on website
- Stripe processes payment
- Stripe webhook fires -> order created in D1 DB, stock deducted, confirmation email sent
- Father-in-law gets new order notification email
- He packs and posts, enters tracking number in admin panel
- Customer automatically gets dispatch email with Royal Mail tracking link
- Low stock alert sent automatically when stock drops below threshold

## GitHub credentials
GitHub CLI is installed and authenticated as JVFourths
Token: run `gh auth token` to get it

## File structure
app/
  page.js           - Homepage
  shop/page.js      - Shop page
  product/[slug]/page.js  - Product detail + buy button
  order-success/page.js   - Post-payment confirmation
  shipping/page.js  - Shipping policy
  admin/page.js     - Admin dashboard (password protected)
  api/
    create-checkout-session/route.js  - Creates Stripe session
    webhook/route.js                  - Handles Stripe payment confirmation
    order/route.js                    - Order lookup for success page
    admin/
      login/route.js      - Admin auth
      orders/route.js     - List/update orders
      inventory/route.js  - Get/update stock
lib/
  products.js  - Product catalogue (3 SKUs hardcoded)
  db.js        - Cloudflare D1 database functions
  email.js     - Resend email functions
  auth.js      - Admin auth helper

## Products (hardcoded in lib/products.js)
- rl-500ml: Rio Largo 500ml @ £14.00
- rl-1l: Rio Largo 1 Litre @ £21.00
- rl-2l: Rio Largo 2 Litre @ £32.00

## Next steps after build succeeds
1. Add D1 binding (DB = riolargo-db) in Cloudflare Pages settings
2. Add all environment variables
3. Set up Stripe webhook pointing to https://riolargo-uk.pages.dev/api/webhook
4. Test a purchase end to end
5. Buy domain riolargo.co.uk and connect to Pages project
6. Update NEXT_PUBLIC_SITE_URL to the real domain
7. Add product photos (currently using olive emoji placeholders)

# Rio Largo UK — Your Handover Guide

Welcome. This document explains everything you need to know to run the
`riolargo.co.uk` website on your own, from a Mac, using a tool called
**Claude Code**. No previous coding experience is needed — Claude does
the work; you just tell it what you want in plain English.

This guide is long on purpose. Read it once end-to-end, then keep it
open on the side when you sit down to make changes. Every section is
step-by-step and assumes you have not used the Terminal before.

---

## Table of contents

1. [What this is](#1-what-this-is)
2. [Important — Claude Code vs Claude Desktop](#2-important--claude-code-vs-claude-desktop)
3. [Part 1 · One-time setup on your Mac](#3-part-1--one-time-setup-on-your-mac)
4. [Part 2 · Starting Claude Code each time](#4-part-2--starting-claude-code-each-time)
5. [Part 3 · How to talk to Claude Code](#5-part-3--how-to-talk-to-claude-code)
6. [Part 4 · 20 copy-paste prompts for common jobs](#6-part-4--20-copy-paste-prompts-for-common-jobs)
7. [Part 5 · Managing orders (the admin panel)](#7-part-5--managing-orders-the-admin-panel)
8. [Part 6 · Who owns what (infrastructure)](#8-part-6--who-owns-what-infrastructure)
9. [Part 7 · If something breaks](#9-part-7--if-something-breaks)
10. [Part 8 · Monthly checklist](#10-part-8--monthly-checklist)
11. [Emergency contacts](#11-emergency-contacts)

---

## 1. What this is

You are the new owner/manager of **Rio Largo UK** — an e-commerce
website that sells Rio Largo extra virgin olive oil (from the Wilkinsons'
estate in South Africa) to customers in the United Kingdom.

The website lives at **https://riolargo.co.uk**

What it does for you automatically:
- Shows products to customers
- Takes payment via Stripe (credit/debit cards)
- Sends a confirmation email to the customer the moment they pay
- Sends you a notification of a new order
- Lets you mark an order as dispatched (which automatically emails the
  customer their tracking number)
- Keeps track of stock levels and warns you when anything is running low
- Works on phones, tablets, and computers

What **you** do:
- Unpack shipments of new stock and update the stock numbers in the
  admin panel (takes ~30 seconds per product)
- When an order comes in, pack it, take it to the post office, enter
  the tracking number in the admin panel, click "Confirm dispatch"
- Occasionally ask Claude Code to change text, prices, photos, or add
  new features

That is the whole job. The website runs itself.

---

## 2. Important — Claude Code vs Claude Desktop

These are two different products from Anthropic (the company that makes
Claude). **You need Claude Code, not Claude Desktop.**

| | **Claude Desktop** (a chat app) | **Claude Code** (what you need) |
|---|---|---|
| What is it | A chat window, like ChatGPT | A tool that lives inside the Terminal and can actually *do* things |
| Can it read your files | No | Yes |
| Can it edit your website | No | Yes |
| Can it deploy to the internet | No | Yes |
| Does it charge you | Free or subscription | Subscription (included with your Claude Pro plan) |

**You will install Claude Code.** If you search the App Store for
"Claude", you might find *Claude Desktop* first — that's the chat app,
and it can't do what you need. Follow the instructions below exactly.

---

## 3. Part 1 · One-time setup on your Mac

Do these steps **once**, when you first receive the website. After
this, day-to-day use is much simpler (Part 2).

### Step 1.1 · Open the Terminal

1. Press `Cmd` + `Space` on your keyboard. A search bar appears in
   the middle of your screen.
2. Type `Terminal` and press `Enter`.
3. A black-and-white window opens. This is the Terminal. Don't be
   scared of it — you only type a few things in here, and Claude Code
   will do the rest.

### Step 1.2 · Install Homebrew (the Mac app installer)

Homebrew lets us install the other things we need. It's a standard
Mac tool that developers use every day.

1. Open https://brew.sh in Safari.
2. Copy the big long command near the top of the page (it starts with
   `/bin/bash -c "$(curl -fsSL ...)"`).
3. Paste it into the Terminal window and press `Enter`.
4. It will ask for your Mac password. Type it (the cursor won't move
   while you type — that's normal). Press `Enter`.
5. Wait. It takes a few minutes. When the `$` or `%` symbol comes back
   at the end of a new line, it's done.

### Step 1.3 · Install Node.js (the engine the website runs on)

In the same Terminal window, type:

```
brew install node
```

Press `Enter`. Wait a minute or two.

To check it worked, type:

```
node --version
```

You should see something like `v22.x.x`. If you see a version number,
you're good.

### Step 1.4 · Install Claude Code

In the Terminal, type:

```
npm install -g @anthropic-ai/claude-code
```

Press `Enter`. Wait a minute.

To check it worked, type:

```
claude --version
```

You should see a version number.

### Step 1.5 · Sign in to Claude Code

In the Terminal, type:

```
claude
```

Press `Enter`. The first time you run this, it will open a browser
window asking you to sign in to your Anthropic account. Use the
Claude account Johan set up for you. Follow the steps on screen, then
come back to the Terminal.

Once you're signed in, press `Ctrl` + `C` twice to quit Claude for
now. We'll come back to it.

### Step 1.6 · Get the website code onto your Mac

Johan (or whoever handed you this project) has added you as a
**collaborator** on the GitHub repository for the site. That means
you have permission to read and edit the code.

First, install `git` (it may already be on your Mac):

```
brew install git
```

Then, create a folder to hold the project. In the Terminal, type:

```
cd ~
mkdir Websites
cd Websites
```

This creates a folder called `Websites` inside your home folder, and
enters it.

Now download the code from GitHub:

```
git clone https://github.com/JVFourths/riolargo-uk.git
```

It may ask you to sign in to GitHub — use the GitHub account Johan
set up for you. (If you don't have one, make one at github.com first,
then ask Johan to add you as a collaborator on the `riolargo-uk`
repository.)

When it finishes, you'll have a folder called `riolargo-uk` inside
`Websites`. That folder contains everything — the code, the images,
the database schema, everything.

### Step 1.7 · Install the website's own dependencies

Enter the project folder and install its dependencies:

```
cd riolargo-uk
npm install --legacy-peer-deps
```

This downloads all the tools the website itself needs (React, Next.js,
Stripe library, etc.). It takes about 2 minutes.

### Step 1.8 · Save your secret keys

The website needs a few **secret keys** to do its job (to take
payments, send emails, generate images). These are not stored in the
code — they live on your Mac as environment variables.

Ask Johan for these and save them somewhere safe (a password manager
is ideal):

| Key name | What it's for | Who gives it to you |
|---|---|---|
| `CLOUDFLARE_API_TOKEN` | Deploy the website to the internet | Johan |
| `CLOUDFLARE_ACCOUNT_ID` | Identifies your Cloudflare account | Johan (it's `d5fbd486ce2e2f4c99315afa66198462`) |
| `GEMINI_API_KEY` | Generate new images via Google's Imagen 4 | Johan |
| `STRIPE_SECRET_KEY` | Process credit card payments | stripe.com dashboard |
| `STRIPE_WEBHOOK_SECRET` | Secure the Stripe → site connection | stripe.com dashboard |
| `RESEND_API_KEY` | Send confirmation / dispatch emails | resend.com dashboard |
| `ADMIN_PASSWORD` | Your password for the admin panel | You pick it |

You'll save these in a file called `.env.local` inside the project
folder. To do that:

```
cd ~/Websites/riolargo-uk
open -e .env.local
```

That opens a text editor. Paste in this template and fill in the real
values. Save with `Cmd` + `S`, then close the window.

```
STRIPE_SECRET_KEY=sk_live_XXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_XXXXXXXXXXXXXXXXXXXXXX
STRIPE_WEBHOOK_SECRET=whsec_XXXXXXXXXXXXXXXXXXXXXX
RESEND_API_KEY=re_XXXXXXXXXXXXXXXXXXXXXX
FROM_EMAIL=orders@riolargo.co.uk
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=pick-a-strong-password-here
NEXT_PUBLIC_SITE_URL=https://riolargo.co.uk
```

Important: **never share the contents of this file with anyone**, and
**never paste it into a chat, email or message**. These are keys to
your money and email.

### Step 1.9 · Save your deploy and image keys

Two more keys that live outside `.env.local` because they're used
when Claude *deploys* the site, not when the site is running.

Ask Johan for these and save them in your password manager. You'll
type them in manually when Claude needs to deploy (see Part 2).

- `CLOUDFLARE_API_TOKEN` (long string starting with `cfat_`)
- `GEMINI_API_KEY` (long string starting with `AIza`)

**That is the entire one-time setup.** It takes about 15 minutes.
Everything from here is day-to-day use.

---

## 4. Part 2 · Starting Claude Code each time

Every time you want to make a change to the website, do these three
steps:

### Step 2.1 · Open the Terminal

`Cmd` + `Space`, type `Terminal`, press `Enter`.

### Step 2.2 · Enter the project folder

Type:

```
cd ~/Websites/riolargo-uk
```

Press `Enter`. (The `~` means "your home folder".)

### Step 2.3 · Set your two deploy keys, then start Claude

Copy these two lines, paste your real values where it says `YOUR_...`,
and run them:

```
export CLOUDFLARE_API_TOKEN=YOUR_CLOUDFLARE_TOKEN
export GEMINI_API_KEY=YOUR_GEMINI_KEY
```

(Tip: store these as a shortcut in your password manager so you can
paste both at once.)

Then start Claude Code:

```
claude
```

Press `Enter`. You're in. You'll see a prompt asking what you want.

### Step 2.4 · Always pull the latest first

The *very first thing* to say to Claude every session is:

> **Please pull the latest changes from GitHub and let me know what has changed.**

This makes sure you are working with the current version of the
website, especially if anyone else is occasionally touching it.

### Step 2.5 · When you're done

To leave Claude Code, type `/exit` or press `Ctrl` + `C` twice.

To close the Terminal, press `Cmd` + `Q`.

---

## 5. Part 3 · How to talk to Claude Code

Claude understands plain English. You don't need to know code. But
**the more specific you are, the better the result.**

### Good prompts vs less-good prompts

| ❌ Less good | ✅ Better |
|---|---|
| "Change the price" | "Please change the price of the 500ml olive oil to £15.00" |
| "Update the homepage" | "Please change the text in the hero headline from 'Pressed this year. Not last.' to 'Fresh from the harvest.'" |
| "Fix the photo" | "Please replace the 1L bottle photo with the file at `~/Desktop/new-1l.jpg`" |
| "Make it look better" | "Please make the 'Shop the Oil' button bigger and change the colour to a deeper gold" |

Rules of thumb:
- **Say which section** — "in the hero section", "on the shop page",
  "in the footer"
- **Quote the exact text** you want changed
- **Say where new files live** — give the full path like
  `~/Desktop/image.jpg`
- **If you don't know the right words, describe it** — "the big
  picture at the top", "the dark bit with the awards"

### Asking Claude to deploy (make changes go live)

After Claude makes a change, it only changes the code on your Mac.
To actually update `riolargo.co.uk`, say:

> **Please deploy the changes to the live site.**

Claude will build the site and push it to Cloudflare. You'll see
messages like "Uploaded X assets", "Deployed riolargo-uk triggers".
When it's done, refresh `https://riolargo.co.uk` in your browser to
see the changes.

### Asking Claude to commit to GitHub

After deploying (or sometimes before), ask Claude to save the change
to the code history:

> **Please commit and push these changes to GitHub.**

This makes sure the change is safely backed up and that the code on
GitHub matches what's live.

**Rule of thumb: after any session where you made changes, always
ask Claude to deploy AND commit.**

---

## 6. Part 4 · 20 copy-paste prompts for common jobs

Open Claude Code (Part 2), then copy one of these and paste it.
Replace the **bold bits** with your actual values. Every prompt ends
with "then deploy and commit" so you don't have to remember.

### Prices and money

**1. Change a product price**

> Please change the price of the **500ml** olive oil to **£15.50**, then deploy and commit.

**2. Change the free delivery threshold**

> Please change the free delivery threshold from £40 to **£50** (it appears in the footer, the shop page, and the checkout logic), then deploy and commit.

**3. Change the standard shipping cost**

> Please change the standard shipping cost from £4.95 to **£5.50**, then deploy and commit.

### Text and copy

**4. Change the hero headline**

> Please change the hero headline from "Pressed this year. Not last." to "**Your new headline here**", then deploy and commit.

**5. Change the story section**

> Please update the Master Miller story section. Replace the existing text with: "**Your new text here.**" Keep the eyebrow and the heading the same. Then deploy and commit.

**6. Update a product description**

> Please update the description for the **1 Litre** product to: "**Your new description here**" — the file is in `lib/products.js`. Then deploy and commit.

**7. Add a new award**

> Please add a new award to the homepage awards section: Country = "**Germany**", label = "**Gold Medal**", score = "**Berlin 2026**". Then deploy and commit.

### Images and photography

**8. Replace the hero image**

> Please replace the homepage hero image. The new image is at `~/Desktop/new-hero.jpg`. Resize it to 1920 × 1080, save it as a WebP, and swap it in. Then deploy and commit.

**9. Replace a bottle photo**

> Please replace the **2 Litre** bottle photo. The new image is at `~/Desktop/new-2l.png`. Optimise it and swap it in everywhere the old one was used. Then deploy and commit.

**10. Generate a new image with AI**

> Please use Imagen 4 via the `scripts/generate-image.mjs` script to generate a new photograph of **a fresh olive being sliced in half on a cream linen background**. Save it to `public/images/generated/` and then optimise it to WebP. Then deploy and commit.

**11. Update the master miller photo**

> Please replace the Master Miller photograph on the homepage with a new image at `~/Desktop/master-miller-new.jpg`. It should be portrait orientation and go in the slot on the left of the "From a doctor's advice to a Lifetime Achievement" section. Then deploy and commit.

### Products and stock

**12. Add a new product variant**

> Please add a new product to `lib/products.js`: id `rl-5l`, slug `rio-largo-evoo-5litre`, subtitle "5 Litre Catering", price £72.00, stock 10. Use the same description style as the 2L. Then deploy and commit.

**13. Remove a product from sale**

> Please temporarily hide the **2 Litre** product from the shop page. Don't delete it — comment it out so we can bring it back later. Then deploy and commit.

### Promotions and seasonal changes

**14. Add a Christmas banner**

> Please add a small dark banner at the very top of every page that says "**Order by Friday 19 December for delivery before Christmas**". Make it dismissable. Then deploy and commit.

**15. Add a discount code**

> Please add a 10% discount code called "**FIRSTORDER**" to the checkout flow. It should work on any order over £20. Then deploy and commit.

**16. Change seasonal hero image**

> Please generate a Christmas-themed hero photograph (an olive branch decorated with a red ribbon on a dark limestone surface) using Imagen 4, and swap it in as the homepage hero. Keep the old one in `public/images/generated/` so we can switch back later. Then deploy and commit.

### Site health and checks

**17. Take mobile screenshots and look for problems**

> Please run `scripts/screenshot-mobile.mjs` to take iPhone screenshots of the homepage, shop page, product page, shipping page, and admin page. Then look at the results and tell me if anything looks broken.

**18. Check all the live routes are working**

> Please check that every page on the live site is responding correctly: the homepage, /shop, each of the three product pages, /shipping, /admin, and /order-success. Report any errors.

**19. Check for a reported issue**

> A customer has emailed to say the "Add to basket" button isn't working on the 1 Litre product page. Please investigate what's happening and fix it. Then deploy and commit.

### Catching up and tidying

**20. Catch me up after a break**

> I haven't touched the site for a month. Please pull the latest from GitHub, tell me what has changed, take mobile screenshots of the current live site, check all routes are responding, and give me a summary of the site's health.

---

## 7. Part 5 · Managing orders (the admin panel)

This is the part you will use every day when orders come in. It does
NOT require Claude Code — you just open it in a browser.

### How to log in

1. Open https://riolargo.co.uk/admin in any browser.
2. Enter the password (the `ADMIN_PASSWORD` value from your
   `.env.local` file).
3. Click **Sign in**.

You are now on the dashboard.

### What you see

- **Sales tiles** (top of the page) — Today, This Week, This Month,
  All Time revenue.
- **Secondary stats** — Total orders, Awaiting dispatch (highlighted
  in orange if there are any), Low stock items.
- **Orders tab** — A list of every order, newest first. You can
  search by customer name, email, order number, or tracking number.
  You can filter to show only "Awaiting" or only "Dispatched".
- **Stock tab** — Your three products with current stock levels and
  the ability to update them.

### When a new order comes in

1. Go to the admin panel.
2. You'll see the order in the list with a yellow "Paid" dot. Click
   to expand.
3. Pack the bottle(s) at the address shown.
4. Take it to the post office. Get the Royal Mail Tracked tracking
   number.
5. Back on the admin panel, paste the tracking number in the box and
   click **Confirm dispatch**.
6. The site automatically emails the customer with their tracking
   number. You're done.

### When new stock arrives from South Africa

1. Unpack the shipment and count each bottle size.
2. Go to the admin panel → **Stock** tab.
3. For each product, type the new total stock level in the box and
   click **Update**.
4. That's it.

### Internal notes

Every order has a **notes** field you can use to leave yourself
reminders — "customer wanted gift-wrap", "delayed due to weather",
etc. Notes are private; customers never see them.

### Exporting orders

On the Orders tab, click **Export CSV**. This downloads a spreadsheet
of every order (or just the filtered ones, if you've set a filter).
Useful for tax returns and accounting.

---

## 8. Part 6 · Who owns what (infrastructure)

Behind the scenes, the website uses five different services. Here is
who owns what, what the account is, and what to do if each one
breaks.

### Cloudflare (hosting + domain)

- **What it does:** Runs the website (the `.co.uk` address and all
  the pages).
- **Account:** `johan@jkmv.co.uk` (Johan's personal Cloudflare account)
- **Dashboard:** https://dash.cloudflare.com
- **Monthly cost:** Free tier covers it comfortably
- **What to do if it breaks:** Check status at
  https://www.cloudflarestatus.com. If Cloudflare is fine and the
  site isn't loading, open Claude Code and say *"please check the
  Cloudflare Worker status for riolargo-uk and tell me why the site
  is down"*.

### GitHub (code storage)

- **What it does:** Stores the source code and every change you've
  ever made to it. This is your backup.
- **Account:** `JVFourths` (the GitHub account Johan set up)
- **Repo:** https://github.com/JVFourths/riolargo-uk
- **What you need:** to be added as a collaborator on that repo.
  Ask Johan if you aren't already.

### Stripe (payments)

- **What it does:** Takes credit card payments from customers.
- **Dashboard:** https://dashboard.stripe.com
- **What's in it:** Every transaction, every customer, refund
  controls, payout schedule, webhook configuration.
- **Fees:** Stripe takes ~1.5% + 20p per UK card transaction. They
  pay the rest into your connected bank account every 7 days.
- **What to do if a customer says they were charged twice:** Log
  into Stripe, search for their email, find the payment, click
  **Refund**. Easy.

### Resend (email sending)

- **What it does:** Sends confirmation emails, dispatch emails, and
  low-stock alerts.
- **Dashboard:** https://resend.com/overview
- **What you need:** the `riolargo.co.uk` domain verified (a
  one-time DNS setup). If dispatch emails stop arriving, check
  Resend's dashboard for the latest sends and any errors.

### The domain itself (riolargo.co.uk)

- **Bought from:** Cloudflare Registrar (on Johan's account)
- **Expires:** Check in Cloudflare. **Set a calendar reminder to
  renew every year.** If the domain expires, the site goes dark.

---

## 9. Part 7 · If something breaks

Things occasionally go wrong. Here is what to do.

### Something looks wrong on the website

Open Claude Code and say:

> **Please load https://riolargo.co.uk in a browser, take a screenshot, and tell me what looks wrong. I'm worried about [describe the thing].**

Claude can actually look at the site and see what's happening.

### The website is completely offline

Check these three things in order:

1. **Is it just you?** Try https://downforeveryoneorjustme.com and
   enter `riolargo.co.uk`. If it says "it's just you", your
   internet is the problem.
2. **Is Cloudflare down?** Check https://www.cloudflarestatus.com.
3. **Is the code broken?** Open Claude Code and say *"the live
   site is down, please check the Worker deployment status and
   recent logs, and fix whatever is broken"*.

### Claude Code gives an error when deploying

99% of the time this is one of:

- Your `CLOUDFLARE_API_TOKEN` has expired → ask Johan for a new one
- The internet hiccupped → just try again
- Something in the code is broken from a change → say *"the
  deployment failed, please read the error message above, fix the
  cause, and try again"*

### A customer reports something

1. Screenshot their email.
2. Open Claude Code and paste the screenshot.
3. Say *"a customer sent me this email. Please investigate whether
   they are right and fix it if so."*

Claude will look at the code, the live site, and the order database,
and give you a diagnosis.

### You accidentally told Claude to do something wrong

Ask Claude to **undo the last change**:

> **Please undo the last change you made and revert the file back to how it was before. Then deploy and commit.**

GitHub keeps every version forever, so nothing is ever truly lost.

---

## 10. Part 8 · Monthly checklist

Set a calendar reminder for the **1st of every month** to do these
five things. Takes about 15 minutes.

1. **Open Claude Code** and say *"please catch me up on any changes and check that the site is healthy"* (prompt 20 above).
2. **Check the admin panel** for:
   - Any orders stuck on "Paid" that haven't been dispatched
   - Stock levels — reorder any product below 20 units
3. **Check Resend dashboard** — scroll through the email log and
   make sure there are no failed sends.
4. **Check Stripe dashboard** — verify the last payout landed in
   the bank and that there are no unresolved disputes.
5. **Export the month's orders** from the admin panel as CSV and
   save to your accounting folder.

Set another reminder for **once a year** to renew the domain in
Cloudflare. The domain does not auto-renew by default.

---

## 11. Emergency contacts

### The person who built this site
- **Johan Visser** — johan@jkmv.co.uk
- Can help with: anything technical, Cloudflare account questions,
  Stripe/Resend setup, the code itself

### The olive estate (Rio Largo, South Africa)
- **Nick & Brenda Wilkinson** — [contact details from parent site]
- Can help with: stock availability, shipments, product questions,
  new cultivar or blend releases

### Your importer
- **Sidwell's** — [contact]
- Can help with: customs, importing, wholesale pricing, UK
  compliance

### Payment provider
- **Stripe** — https://support.stripe.com
- 24/7 chat support inside the Stripe dashboard

### Email provider
- **Resend** — https://resend.com/help

### Website hosting
- **Cloudflare** — https://dash.cloudflare.com/support

---

## A final note

You do not need to become a developer. You need to be a good
*customer* of Claude Code. The more clearly and specifically you
describe what you want, the better the result. The 20 prompts above
cover 95% of what will come up. For the other 5%, describe what you
want in plain English and Claude will work it out.

When in doubt:
1. Ask Claude to pull the latest code
2. Describe what you want
3. Ask Claude to deploy
4. Ask Claude to commit
5. Check the live site

You've got this. Welcome to the Rio Largo team.

---

*Last updated: 2026-04-08*
*Site version: see the latest commit on https://github.com/JVFourths/riolargo-uk*

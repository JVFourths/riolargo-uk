# Rio Largo UK Website — Setup Guide

A plain English guide to get the website live and taking orders.
No technical experience needed. Follow each step in order.

---

## What you will need (all free to sign up)

| Service      | What it does                          | Cost                          |
|--------------|---------------------------------------|-------------------------------|
| GitHub       | Stores the website code               | Free                          |
| Vercel       | Hosts the website online              | Free                          |
| Stripe       | Takes card payments from customers    | 1.4% + 20p per transaction    |
| Resend       | Sends automated emails                | Free up to 3,000 emails/month |
| Domain name  | Your web address (e.g. riolargo.co.uk)| ~£10/year from Namecheap      |

---

## Step 1 — Buy a domain name

1. Go to **namecheap.com**
2. Search for: `riolargo.co.uk` (or `riolargooil.co.uk` if taken)
3. Add to cart and purchase (~£10/year)
4. Write down your Namecheap login details somewhere safe

**Suggested domain names (in order of preference):**
- riolargo.co.uk
- riolargooil.co.uk
- riolargo-uk.co.uk
- buyriolargo.co.uk

---

## Step 2 — Create a Stripe account (payments)

1. Go to **stripe.com** and click "Start now"
2. Sign up with your email address
3. Complete identity verification (they will ask for your name and bank details so payments go to you)
4. Once inside, go to **Developers > API Keys**
5. Copy these two values and save them somewhere:
   - **Publishable key** (starts with `pk_live_`)
   - **Secret key** (starts with `sk_live_`)

---

## Step 3 — Create a Resend account (automated emails)

1. Go to **resend.com** and sign up
2. Go to **API Keys** and click "Create API Key"
3. Copy the key (starts with `re_`) and save it

---

## Step 4 — Put the website online (Vercel)

1. Go to **github.com** and create a free account
2. Create a new repository called `riolargo-uk`
3. Upload all the website files into it (or ask someone to do this step once)
4. Go to **vercel.com** and sign up with your GitHub account
5. Click "Add New Project" and select your `riolargo-uk` repository
6. Vercel will ask you to add "Environment Variables" — add these one by one:

```
STRIPE_SECRET_KEY              = sk_live_xxxxx (from Step 2)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_live_xxxxx (from Step 2)
STRIPE_WEBHOOK_SECRET          = (see Step 5 below)
RESEND_API_KEY                 = re_xxxxx (from Step 3)
FROM_EMAIL                     = orders@yourdomain.co.uk
ADMIN_EMAIL                    = your personal email address
ADMIN_PASSWORD                 = choose a strong password (this is what you use to log into the admin panel)
NEXT_PUBLIC_SITE_URL           = https://yourdomain.co.uk
```

7. Click "Deploy" — Vercel will build and publish the site automatically

---

## Step 5 — Set up Stripe webhook (so orders are created automatically)

1. In Stripe, go to **Developers > Webhooks**
2. Click "Add endpoint"
3. Enter: `https://yourdomain.co.uk/api/webhook`
4. Under "Events to listen to", select: `checkout.session.completed`
5. Click "Add endpoint"
6. Copy the **Signing secret** (starts with `whsec_`)
7. Go back to Vercel, add this as the environment variable `STRIPE_WEBHOOK_SECRET`
8. Redeploy (Vercel > your project > Deployments > Redeploy)

---

## Step 6 — Connect your domain name

1. In Vercel, go to your project > **Settings > Domains**
2. Add your domain (e.g. `riolargo.co.uk`)
3. Vercel will show you some DNS settings to copy
4. Log into Namecheap, go to your domain > **Advanced DNS**
5. Add the records Vercel shows you (copy and paste exactly)
6. Wait up to 24 hours for the domain to go live

---

## Day-to-day: How to manage your shop

### When you get an order:
1. You will receive an **email notification** with the order details
2. Pack the bottle(s) securely
3. Go to **yourdomain.co.uk/admin** and log in with your password
4. Find the order, enter the Royal Mail tracking number, click "Confirm Dispatch"
5. The customer automatically receives a dispatch email with their tracking number
6. Drop the parcel at the Post Office or book a Royal Mail collection

### When stock arrives from South Africa:
1. Log into **yourdomain.co.uk/admin**
2. Click the **Stock Management** tab
3. Enter the new stock levels for each product and click "Update"
4. The website will show the correct availability automatically

### What happens automatically (you don't need to do anything):
- Order confirmation email sent to customer
- Stock deducted from inventory
- Low stock alert email sent to you when running low
- Customer dispatch email sent when you mark an order as dispatched

---

## Getting paid

Stripe pays out to your bank account automatically. By default, payouts happen every 2 days. You can change this in your Stripe settings under **Settings > Payouts**.

---

## Royal Mail — Click & Drop (recommended)

Sign up at **royalmail.com/business/click-and-drop**

This lets you:
- Print prepaid shipping labels from home
- Book collections so Royal Mail comes to you (no Post Office trip needed)
- Import orders in bulk if volume grows

---

## Need help?

If anything stops working:
- **Payments not working**: Check Stripe dashboard for errors
- **Emails not sending**: Check Resend dashboard
- **Website down**: Check Vercel dashboard — it shows any errors clearly

For technical help, contact the person who set up the site.

---

## Costs summary

| Item                     | Cost                              |
|--------------------------|-----------------------------------|
| Domain name              | ~£10/year                         |
| Website hosting (Vercel) | Free                              |
| Email sending (Resend)   | Free up to 3,000 emails/month     |
| Stripe payments          | 1.4% + 20p per UK card transaction|
| Royal Mail shipping      | ~£3.50-4.50 per parcel (tracked)  |

On a £21 order (1 litre): Stripe takes ~50p. Everything else is yours.

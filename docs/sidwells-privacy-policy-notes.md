# Notes on the Sidwell's privacy policy draft

Draft: `docs/sidwells-privacy-policy.md`, written 18 September 2026 for sidwells.net. It is a plain-English draft built from what the site actually does. It is not legal advice, so Mike may want his accountant or a solicitor to glance over it.

## How to publish it

1. WordPress admin > Pages > Add New, title "Privacy Policy". Paste the text in (the block editor turns the headings and lists into proper blocks).
2. Settings > Privacy > choose that page as the site's privacy policy page. WooCommerce then links it at checkout and on the account sign-up form by itself.
3. Add the page to the footer menu next to "Refund and Returns Policy".
4. The terms page already says "together with our Privacy Policy", so link those words to the new page.

## Where the facts came from

Checked on sidwells.net on 18 September 2026:

- Company details (Sidwell's Holdings Limited, 12802435, Kingston registered address) are from the terms and conditions page.
- Contact address, email and phone are from the site footer.
- Stripe with Apple Pay and Google Pay, WooCommerce accounts, wishlist and reviews, the Mailchimp sign-up form, the age gate: all seen in the page source.
- Google Analytics (G-0EPJT2HKS0), Google Ads (AW-384723662) and the Meta pixel are loaded on the homepage and product pages.
- TikTok and LinkedIn appear only as links to the social profiles, not as tracking, so they are not listed as recipients.

## For Mike to confirm or change

1. **Retention periods.** Six years for orders is the normal HMRC figure. Two years for messages and 14 months for analytics are sensible defaults I chose. Change them if the business does something different.
2. **Delivery companies and hosting company** are described generally, not named. Naming them is optional.
3. **Proof of age on delivery.** The policy says the courier may ask. Remove that line if it never happens.
4. **ICO registration.** Most businesses that handle customer data must pay the ICO's data protection fee (usually £52 a year for a small company). Check at ico.org.uk/fee-checker. I could not tell from outside whether Sidwell's is registered.

## Two things on the site that should match the policy

1. **Cookie banner.** The policy says analytics and advertising cookies are only set after the visitor accepts them. There are traces of the CookieYes plugin in the page source, but I could not confirm from outside that Google Analytics, Google Ads and the Meta pixel are held back until consent. UK law (PECR) requires that. Worth checking in the CookieYes settings, or the policy promises something the site does not do.
2. **Returns policy.** It gives 7 days and still contains a `{email address}` placeholder. For online sales, the Consumer Contracts Regulations generally give customers 14 days to cancel. Worth a review at the same time.

import { CONTACT_EMAIL } from "@/lib/endpoints";

// Keep this page true. If analytics, a form, embedded video or any third-party script is
// ever added to the site, this page has to change in the same commit.
const LAST_UPDATED = "18 September 2026";
const SIDWELLS_TERMS_URL = "https://sidwells.net/terms-and-conditions/";

const sections = [
  {
    title: "What this site collects",
    body: [
      "Nothing about you personally. There are no forms, no accounts, no newsletter sign-up and no checkout here. We set no cookies and run no analytics, advertising or tracking scripts. The fonts and images are served from this site, so your browser is not sent off to anyone else while you read it.",
    ],
  },
  {
    title: "Hosting",
    body: [
      "The site is served by Cloudflare. Like any web host, Cloudflare handles technical details of each visit, such as your IP address and browser type, so that pages can be delivered and the site kept secure. We do not use that information to identify anyone.",
    ],
  },
  {
    title: "Buying the oil",
    body: [
      "The order buttons take you to sidwells.net, the shop run by Sidwell's, the sole UK supplier of Rio Largo. Your name, address, payment and order details are given to Sidwell's there, not to this site, and are handled under Sidwell's own terms.",
    ],
  },
  {
    title: "Emailing us",
    body: [
      "If you email us, the message goes to Sidwell's. It is used to answer you and to deal with your order or enquiry, and for nothing else. We do not add you to a mailing list.",
    ],
  },
  {
    title: "Your rights",
    body: [
      "Under UK data protection law you can ask what information is held about you, ask for it to be corrected or deleted, and object to how it is used. Email us and we will sort it out. If you are unhappy with the answer you can complain to the Information Commissioner's Office at ico.org.uk.",
    ],
  },
];

export default function PrivacyContent() {
  return (
    <div className="pt-32 pb-24 md:pt-44 md:pb-32">
      <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        <header className="lg:col-span-5">
          <h1 className="h1">
            Privacy, <span className="italic text-fox">briefly</span>
          </h1>
          <p className="lede mt-8">
            No cookies, no tracking, no forms. This site tells you about the oil
            and sends you to Sidwell&apos;s to buy it.
          </p>
          <p className="mt-6 text-small text-ink-muted">Last updated {LAST_UPDATED}</p>
        </header>

        <div className="lg:col-span-6 lg:col-start-7">
          <div className="border-b border-rule">
            {sections.map((section) => (
              <section key={section.title} className="border-t border-rule py-8">
                <h2 className="font-display text-2xl font-semibold leading-tight">
                  {section.title}
                </h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="mt-3 max-w-measure text-ink-muted">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <div className="mt-10 space-y-3">
            <p>
              <span className="font-semibold">Who we are:</span>{" "}
              <span className="text-ink-muted">
                Sidwell&apos;s, 124 City Road, London, EC1V 2NX.
              </span>
            </p>
            <p>
              <a className="link" href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Privacy question")}`}>
                {CONTACT_EMAIL}
              </a>
            </p>
            <p>
              <a className="link" href={SIDWELLS_TERMS_URL} target="_blank" rel="noopener">
                Sidwell&apos;s terms and conditions
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

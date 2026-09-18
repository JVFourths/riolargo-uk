import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/endpoints";

const footerLinks = [
  {
    title: "Shop",
    links: [
      { href: "/shop", label: "All olive oils" },
      { href: "/shipping", label: "Delivery and returns" },
    ],
  },
  {
    title: "The estate",
    links: [
      { href: "/about", label: "Our story" },
      { href: "/about#estate", label: "The valley" },
      { href: "/about#process", label: "How we make it" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/contact", label: "Contact us" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-grove text-on-grove">
      <div className="container-page py-20">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" className="font-display text-4xl font-medium">
              Rio Largo <span className="italic">Olive Estate</span>
            </Link>
            <p className="mt-5 max-w-sm text-on-grove-muted">
              Extra virgin olive oil from a family estate on the Breede River,
              Western Cape. Sent to UK kitchens.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-6 inline-block underline decoration-1 underline-offset-4 transition-colors duration-(--duration-state) hover:text-on-grove-muted"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7"
          >
            {footerLinks.map((col) => (
              <div key={col.title}>
                <h2 className="label font-body text-on-grove-muted">{col.title}</h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="underline-offset-4 transition-colors duration-(--duration-state) hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <p className="mt-16 border-t border-grove-raised pt-8 text-small text-on-grove-muted">
          &copy; {new Date().getFullYear()} Rio Largo Olive Estate. Scherpenheuwel
          Valley, Breede River, South Africa.
        </p>
      </div>
    </footer>
  );
}

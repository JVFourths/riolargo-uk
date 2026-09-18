"use client";

import Link from "next/link";
import { m } from "motion/react";
import { Reveal, rise, revealTransition } from "@/components/motion-config";
import { Ledger } from "@/components/ui/ledger";
import { CONTACT_EMAIL } from "@/lib/endpoints";

const SIDWELLS_RETURNS_URL = "https://sidwells.net/refund_returns/";

// Facts here come from sidwells.net (checkout and returns policy). Re-check them if Sidwell's changes its terms.
const keyPoints = [
  {
    title: "Ordered through Sidwell's",
    description:
      "Sidwell's is the sole UK supplier of Rio Largo. The order buttons on this site open the oil on sidwells.net, where you pay securely.",
  },
  {
    title: "Delivered to your door",
    description:
      "Sidwell's delivers across the UK from its own stock. The delivery charge is shown in your basket before you pay.",
  },
  {
    title: "Returns within 7 days",
    description:
      "Unused items in their original packaging can be returned within 7 days, with proof of purchase. Return postage is at your cost unless the fault is theirs.",
  },
  {
    title: "Damaged or wrong item",
    description:
      "If something arrives defective or damaged, Sidwell's will replace it or refund you in full.",
  },
];

export default function ShippingContent() {
  return (
    <div className="pt-32 pb-24 md:pt-44 md:pb-32">
      <div className="container-page">
        <m.header
          initial="hidden"
          animate="visible"
          variants={rise}
          transition={revealTransition}
        >
          <h1 className="h1">
            Delivery <span className="italic text-fox">and returns</span>
          </h1>
          <p className="lede mt-8">
            Orders are taken, delivered and looked after by Sidwell&apos;s, the
            UK home of Rio Largo.
          </p>
        </m.header>

        <div className="mt-16 grid grid-cols-1 gap-16 lg:mt-20 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Ledger items={keyPoints} />
          </Reveal>

          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
            <h2 className="h3">The full policy</h2>
            <p className="mt-4 text-ink-muted">
              The complete refund and returns terms are on the Sidwell&apos;s
              site.
            </p>
            <a
              href={SIDWELLS_RETURNS_URL}
              target="_blank"
              rel="noopener"
              className="link mt-4 inline-block font-semibold"
            >
              Read Sidwell&apos;s returns policy
            </a>

            <div className="mt-12 border-t border-rule pt-10">
              <p className="font-display text-2xl italic">A question about an order?</p>
              <p className="mt-3 text-ink-muted">
                Email{" "}
                <a className="link" href={`mailto:${CONTACT_EMAIL}`}>
                  {CONTACT_EMAIL}
                </a>{" "}
                or send us a message.
              </p>
              <Link href="/contact" className="btn btn-secondary mt-6">
                Contact us
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

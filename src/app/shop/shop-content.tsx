"use client";

import { m } from "motion/react";
import { Reveal, rise, revealTransition } from "@/components/motion-config";
import { CatalogueEntry } from "@/components/ui/catalogue-entry";
import { products } from "@/lib/products";

const assurances = [
  { label: "Sold by Sidwell's", detail: "Sole UK supplier of Rio Largo." },
  { label: "Delivered to your door", detail: "Delivery is priced at their checkout." },
  { label: "Packed on the estate", detail: "Extracted and filled on the farm." },
];

export default function ShopContent() {
  return (
    <div className="pt-32 pb-24 md:pt-44 md:pb-32">
      <div className="container-page">
        <m.header
          initial="hidden"
          animate="visible"
          variants={rise}
          transition={revealTransition}
          className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-10"
        >
          <h1 className="h1 lg:col-span-6">
            The <span className="italic text-fox">catalogue</span>
          </h1>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="lede">
              Extra virgin olive oil, cold extracted on the estate in the Breede
              River Valley and sent to the UK.
            </p>
            <p className="mt-4 text-ink-muted">
              Ordering is handled by Sidwell&apos;s, our UK shop. Each button
              below opens that oil on sidwells.net, where you pay and choose
              delivery.
            </p>
          </div>
        </m.header>

        <div className="mt-16 border-b border-rule lg:mt-24">
          {products.map((product, i) => (
            <Reveal key={product.slug}>
              <CatalogueEntry product={product} index={i} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <dl className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {assurances.map((item) => (
              <div key={item.label} className="border-l border-rule-strong pl-4">
                <dt className="font-semibold">{item.label}</dt>
                <dd className="mt-1 text-small text-ink-muted">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </div>
  );
}

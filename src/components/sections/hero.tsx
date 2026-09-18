"use client";

import { m } from "motion/react";
import Link from "next/link";
import { Plate } from "@/components/ui/plate";
import { rise, revealTransition, settle } from "@/components/motion-config";

const HEADLINE_STAGGER = 0.09;

export function Hero() {
  return (
    <section className="relative pt-32 pb-24 md:pt-44 md:pb-32">
      <div className="container-page grid grid-cols-1 items-end gap-14 lg:grid-cols-12 lg:gap-10">
        <m.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: HEADLINE_STAGGER } } }}
          className="relative lg:col-span-7 lg:pb-10"
        >
          <m.p variants={rise} transition={revealTransition} className="label text-leaf">
            Extra virgin olive oil &middot; Breede River, South Africa
          </m.p>

          <h1 className="h1 mt-6">
            <m.span variants={rise} transition={revealTransition} className="block">
              Cold extracted
            </m.span>
            <m.span variants={rise} transition={revealTransition} className="block">
              in the Cape.
            </m.span>
            <m.span
              variants={rise}
              transition={revealTransition}
              className="block italic text-fox"
            >
              Poured in Britain.
            </m.span>
          </h1>

          <m.p variants={rise} transition={revealTransition} className="lede mt-8">
            Hand harvested and pressed on a family estate in the Scherpenheuwel
            Valley, then sent to UK kitchens in 500ml tap decanters that keep
            the light out.
          </m.p>

          <m.div
            variants={rise}
            transition={revealTransition}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link href="/shop" className="btn btn-primary">
              Shop the oils, from &pound;13
            </Link>
            <Link href="/about" className="btn btn-secondary">
              Meet the estate
            </Link>
          </m.div>

          <m.p
            variants={rise}
            transition={revealTransition}
            className="mt-6 text-small text-ink-muted"
          >
            Sold and delivered in the UK by Sidwell&apos;s, the estate&apos;s sole UK supplier.
          </m.p>
        </m.div>

        <m.div
          initial="hidden"
          animate="visible"
          variants={rise}
          transition={{ ...revealTransition, delay: 0.35 }}
          className="lg:col-span-5"
        >
          <Plate
            src="/images/label-botanicals-800w.webp"
            alt="Rio Largo Botanicals decanter, printed with wildflowers and grasses, on a garden table"
            number="I"
            caption="The Botanicals label, 500ml, with its pouring tap."
            sizes="(max-width: 1024px) 100vw, 40vw"
            priority
            className="mx-auto max-w-md lg:ml-auto lg:mr-0"
          />
        </m.div>
      </div>

      {/* The pour: a thin line of oil that runs on into the next section */}
      <m.span
        aria-hidden
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.9, ease: settle }}
        className="absolute bottom-[-6rem] left-[max(1.25rem,calc((100vw-76rem)/2+1.5rem))] hidden h-44 w-px origin-top bg-oil md:block"
      />
    </section>
  );
}

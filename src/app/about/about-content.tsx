"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "motion/react";
import { Reveal, rise, revealTransition } from "@/components/motion-config";
import { Plate } from "@/components/ui/plate";
import { Ledger } from "@/components/ui/ledger";

const steps = [
  {
    title: "Hand harvest",
    description: "The olives are picked by hand at peak ripeness, so only good fruit reaches the mill.",
  },
  {
    title: "Cold extraction",
    description: "The fruit goes to the estate's own mill and the oil is extracted without heat, which keeps the delicate flavours.",
  },
  {
    title: "Packed on the estate",
    description: "Filling happens on the farm too, so the estate controls every step from the grove to the finished decanter.",
  },
  {
    title: "Sent to the UK",
    description: "Sidwell's, the estate's sole UK supplier, holds stock here and delivers it to your door.",
  },
];

export default function AboutContent() {
  return (
    <div className="pt-32 md:pt-44">
      <section className="container-page grid grid-cols-1 items-end gap-14 lg:grid-cols-12 lg:gap-10">
        <m.div
          initial="hidden"
          animate="visible"
          variants={rise}
          transition={revealTransition}
          className="lg:col-span-7"
        >
          <p className="label text-leaf">The estate</p>
          <h1 className="h1 mt-6">
            A family farm <span className="italic text-fox">on the Breede River</span>
          </h1>
          <p className="lede mt-8">
            Rio Largo Olive Estate is family owned and sits in the Scherpenheuwel
            Valley, near Worcester in South Africa&apos;s Western Cape. It grows,
            presses and packs its own extra virgin olive oil.
          </p>
        </m.div>

        <m.div
          initial="hidden"
          animate="visible"
          variants={rise}
          transition={{ ...revealTransition, delay: 0.25 }}
          className="lg:col-span-5"
        >
          <Plate
            src="/images/brenda-and-nick-768w.webp"
            alt="Brenda and Nick of Rio Largo holding a trophy at the SA Olive awards"
            number="I"
            caption="Brenda and Nick at the SA Olive awards."
            sizes="(max-width: 1024px) 100vw, 40vw"
            aspect="aspect-square"
            priority
            className="mx-auto max-w-md lg:ml-auto lg:mr-0"
          />
        </m.div>
      </section>

      <section id="estate" className="mt-24 bg-paper-sunk py-24 md:mt-32 md:py-32">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <h2 className="h2">
              The valley <span className="italic">and the river</span>
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <p className="max-w-measure text-lede text-ink-muted">
              The groves run along the Breede River where it cuts through the
              mountains of the Western Cape. Warm days, cool nights and a
              Mediterranean climate suit olives well.
            </p>
            <p className="mt-5 max-w-measure text-ink-muted">
              The estate has won numerous South African and international awards
              and is known as one of the country&apos;s leading producers of
              extra virgin olive oil.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-20">
          <div className="relative aspect-[5/2] min-h-64 w-full overflow-hidden border-y border-rule">
            <Image
              src="/images/olives-on-branch-1920w.webp"
              alt="Green and purple olives ripening on the branch at Rio Largo"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </Reveal>
      </section>

      <section id="process" className="py-24 md:py-32">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <h2 className="h2">
              From grove <span className="italic">to decanter</span>
            </h2>
            <Link href="/shop" className="btn btn-primary mt-10">
              See the catalogue
            </Link>
          </Reveal>

          <Reveal className="lg:col-span-8" delay={0.1}>
            <Ledger items={steps} />
          </Reveal>
        </div>
      </section>
    </div>
  );
}

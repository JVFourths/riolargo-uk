"use client";

import { m } from "motion/react";
import Image from "next/image";
import {
  fadeUp,
  fadeLeft,
  fadeRight,
  staggerContainer,
  viewportConfig,
  smoothTransition,
} from "@/components/motion-config";
import { TreePine, Droplets, Sun, Mountain } from "lucide-react";

export default function AboutContent() {
  return (
    <div className="pt-28 pb-32">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 mb-32">
        <m.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={smoothTransition}
          className="max-w-3xl"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-olive-light font-semibold">
            Our Story
          </span>
          <h1 className="mt-4 font-display text-5xl md:text-6xl font-bold leading-tight">
            A Family Estate in the
            <span className="text-accent"> Heart of the Cape</span>
          </h1>
          <p className="mt-8 text-lg text-text-muted leading-relaxed">
            Rio Largo Olive Estate was born from a love of the land and a
            commitment to producing olive oil that rivals the best in the world.
            Nestled in the Breede River Valley of South Africa&apos;s Western Cape,
            our groves benefit from rich alluvial soils, pure mountain water,
            and a Mediterranean climate that olives thrive in.
          </p>
        </m.div>
      </section>

      {/* The Estate */}
      <section id="estate" className="relative py-32 bg-bg-surface">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={fadeLeft}
              transition={smoothTransition}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/hero-breede-valley-1920w.webp"
                  alt="Breede River Valley landscape"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </m.div>
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={fadeRight}
              transition={smoothTransition}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                The Breede River Valley
              </h2>
              <p className="mt-6 text-text-muted leading-relaxed">
                Our estate sits where the Breede River carves through the
                mountains of the Western Cape. The combination of warm days,
                cool nights, and mineral-rich water creates olive oil with a
                complexity and depth of flavour that is uniquely South African.
              </p>
              <p className="mt-4 text-text-muted leading-relaxed">
                We grow Frantoio, Leccino, and Coratina varietals &mdash; Italian
                cultivars that have found a second home in African soil. Each
                brings its own character to our blends and single cultivars.
              </p>
            </m.div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-32">
        <div className="mx-auto max-w-7xl px-6">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={fadeUp}
            transition={smoothTransition}
            className="text-center mb-20"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">
              How We Make It
            </span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold">
              From Grove to Bottle
            </h2>
          </m.div>

          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: TreePine,
                step: "01",
                title: "Hand Harvest",
                desc: "Olives picked by hand at peak ripeness, ensuring only the best fruit reaches the mill.",
              },
              {
                icon: Droplets,
                step: "02",
                title: "Cold Press",
                desc: "Pressed within 4 hours at our on-site mill. Low temperature preserves delicate flavours.",
              },
              {
                icon: Sun,
                step: "03",
                title: "Natural Settle",
                desc: "The oil rests in stainless steel tanks under nitrogen, developing its rich character.",
              },
              {
                icon: Mountain,
                step: "04",
                title: "Estate Bottled",
                desc: "Bottled on-site for complete quality control. Every bottle is traceable to our estate.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <m.div
                  key={item.step}
                  variants={fadeUp}
                  transition={smoothTransition}
                  className="group bg-bg-surface border border-border p-8 hover:border-accent/30 transition-colors duration-500"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-3xl font-display font-bold text-accent/20">
                      {item.step}
                    </span>
                    <Icon size={22} strokeWidth={1.5} className="text-accent" />
                  </div>
                  <h3 className="font-display text-lg font-bold mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </m.div>
              );
            })}
          </m.div>
        </div>
      </section>

      {/* Full-width image */}
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={fadeUp}
        transition={smoothTransition}
        className="relative aspect-[21/9] overflow-hidden"
      >
        <Image
          src="/images/master-miller-960w.webp"
          alt="Master miller at Rio Largo"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
      </m.div>
    </div>
  );
}

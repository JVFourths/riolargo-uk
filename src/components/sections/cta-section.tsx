"use client";

import { m } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { fadeUp, viewportConfig, smoothTransition } from "@/components/motion-config";

export function CtaSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Parallax background */}
      <div className="absolute inset-0">
        <Image
          src="/images/southern-advantage-1600w.webp"
          alt="Rio Largo olive estate landscape"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-bg/85" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeUp}
          transition={smoothTransition}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-olive-light font-semibold">
            Ready to Taste the Difference?
          </span>
          <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Bring South Africa&apos;s Finest
            <span className="gradient-gold block mt-2">To Your Kitchen</span>
          </h2>
          <p className="mt-8 text-lg text-text-muted max-w-xl mx-auto leading-relaxed">
            Free delivery across the UK on all orders.
            From our estate to your table in just a few days.
          </p>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ ...smoothTransition, delay: 0.3 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/shop"
            className="px-10 py-4 bg-accent text-bg font-semibold text-sm tracking-wide uppercase hover:bg-accent-hover transition-colors duration-200 cursor-pointer hover:scale-[1.02] transform"
          >
            Shop the Collection
          </Link>
          <Link
            href="/contact"
            className="px-10 py-4 border border-text/20 text-text font-semibold text-sm tracking-wide uppercase hover:border-accent hover:text-accent transition-all duration-300 cursor-pointer"
          >
            Get in Touch
          </Link>
        </m.div>
      </div>
    </section>
  );
}

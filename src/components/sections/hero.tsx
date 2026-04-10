"use client";

import { m } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { smoothTransition } from "@/components/motion-config";

const headlineWords = ["Award-Winning", "South African", "Olive Oil"];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-twilight-1920w.webp"
          alt="Rio Largo olive groves at twilight"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/95 via-bg/70 to-bg/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
      </div>

      {/* Subtle animated gradient overlay */}
      <div className="absolute inset-0 gradient-mesh opacity-60" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 md:py-40">
        <div className="max-w-3xl">
          {/* Staggered headline */}
          <m.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
            }}
          >
            {headlineWords.map((word, i) => (
              <m.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 40, rotateX: -15 },
                  visible: { opacity: 1, y: 0, rotateX: 0 },
                }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="block font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight"
              >
                {i === 0 ? (
                  <span className="gradient-gold">{word}</span>
                ) : (
                  word
                )}
              </m.span>
            ))}
          </m.div>

          {/* Subtitle */}
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, ...smoothTransition }}
            className="mt-8 text-lg md:text-xl text-text-muted max-w-xl leading-relaxed"
          >
            Cold-pressed extra virgin olive oil from the Breede River Valley.
            Crafted by hand, celebrated worldwide, delivered fresh to the UK.
          </m.p>

          {/* CTAs */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, ...smoothTransition }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="/shop"
              className="group relative px-8 py-4 bg-accent text-bg font-semibold text-sm tracking-wide uppercase overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
            >
              <span className="relative z-10">Shop Now</span>
              <m.div
                className="absolute inset-0 bg-accent-hover"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 border border-border text-text font-semibold text-sm tracking-wide uppercase hover:border-accent hover:text-accent transition-all duration-300 cursor-pointer"
            >
              Our Story
            </Link>
          </m.div>

          {/* Trust markers */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="mt-16 flex flex-wrap items-center gap-8 text-xs uppercase tracking-[0.2em] text-text-muted"
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Multiple Gold Awards
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-olive" />
              Estate Grown
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Free UK Delivery
            </span>
          </m.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-text-muted">
          Scroll
        </span>
        <m.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-accent to-transparent"
        />
      </m.div>
    </section>
  );
}

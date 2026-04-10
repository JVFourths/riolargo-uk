"use client";

import { m, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import {
  fadeLeft,
  fadeRight,
  viewportConfig,
  smoothTransition,
} from "@/components/motion-config";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * target);
      setCount(start);
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 15, suffix: "+", label: "Years of Excellence" },
  { value: 30, suffix: "+", label: "International Awards" },
  { value: 3, suffix: "", label: "Continents Served" },
];

export function AboutSection() {
  return (
    <section className="relative py-32 overflow-hidden noise-overlay">
      <div className="absolute inset-0 gradient-mesh" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text */}
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={fadeLeft}
            transition={smoothTransition}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-olive-light font-semibold">
              The Southern Advantage
            </span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold leading-tight">
              From the Breede River Valley
              <span className="text-accent"> to Your Table</span>
            </h2>
            <p className="mt-8 text-text-muted text-lg leading-relaxed">
              Rio Largo sits in the heart of South Africa&apos;s Western Cape, where
              Mediterranean-like conditions and pristine mountain water create
              the perfect environment for growing olives.
            </p>
            <p className="mt-4 text-text-muted leading-relaxed">
              Our olives are hand-harvested and cold-pressed within hours at
              our on-site mill. This speed from tree to press preserves the
              delicate flavours and antioxidants that make our oil exceptional
              &mdash; a peppery finish, grassy notes, and a golden richness you
              can taste in every drop.
            </p>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-3xl md:text-4xl font-bold text-accent">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-text-muted">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </m.div>

          {/* Image */}
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={fadeRight}
            transition={smoothTransition}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/harvest-aerial-1920w.webp"
                alt="Aerial view of Rio Largo olive groves"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent" />
            </div>
            {/* Floating accent card */}
            <div className="absolute -bottom-6 -left-6 bg-bg-surface border border-border p-6 max-w-[240px]">
              <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
                Cold Pressed
              </div>
              <p className="mt-2 text-sm text-text-muted leading-relaxed">
                Pressed within 4 hours of harvest for maximum freshness and flavour.
              </p>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}

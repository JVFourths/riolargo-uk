"use client";

import { m } from "motion/react";
import Image from "next/image";
import {
  fadeUp,
  scaleIn,
  staggerContainer,
  viewportConfig,
  smoothTransition,
} from "@/components/motion-config";
import { Award, Star, Leaf, Droplets } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "30+ International Awards",
    description:
      "Recognised at NYIOOC, SA Olive Awards, and Flos Olei. Consistently rated among the world's finest.",
  },
  {
    icon: Droplets,
    title: "Cold-Pressed Excellence",
    description:
      "Processed within hours of harvest at our on-site mill. No heat, no chemicals, pure flavour.",
  },
  {
    icon: Leaf,
    title: "Estate Grown",
    description:
      "Single-origin from our own groves in the Breede River Valley. Full traceability, zero blending.",
  },
  {
    icon: Star,
    title: "Extra Virgin Standard",
    description:
      "Acidity consistently below 0.3%. Well under the 0.8% threshold for extra virgin classification.",
  },
];

export function Awards() {
  return (
    <section className="relative py-32 bg-bg-surface">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeUp}
          transition={smoothTransition}
          className="text-center mb-20"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">
            Why Rio Largo
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold">
            Quality You Can Taste
          </h2>
        </m.div>

        {/* Bento grid */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <m.div
                key={feature.title}
                variants={scaleIn}
                transition={smoothTransition}
                className="group relative bg-bg border border-border p-8 md:p-10 overflow-hidden hover:border-accent/30 transition-colors duration-500 cursor-default"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-12 h-12 flex items-center justify-center border border-accent/20 text-accent mb-6">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </m.div>
            );
          })}
        </m.div>

        {/* Full-width image band */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeUp}
          transition={{ ...smoothTransition, delay: 0.2 }}
          className="mt-12 relative aspect-[21/9] overflow-hidden"
        >
          <Image
            src="/images/olives-on-branch-1920w.webp"
            alt="Ripe olives on the branch at Rio Largo"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bg/60 via-transparent to-bg/60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-display text-2xl md:text-4xl font-bold text-center px-6 drop-shadow-lg">
              &ldquo;Among the finest olive oils in the Southern Hemisphere&rdquo;
            </p>
          </div>
        </m.div>
      </div>
    </section>
  );
}

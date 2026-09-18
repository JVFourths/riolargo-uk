"use client";

import { LazyMotion, MotionConfig, domAnimation, m } from "motion/react";
import type { ReactNode } from "react";

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

export const settle = [0.22, 1, 0.36, 1] as [number, number, number, number];

export const revealTransition = { duration: 0.55, ease: settle };

export const rise = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export const viewportConfig = { once: true, amount: 0.2 } as const;

/** The one scroll reveal the design system allows: a single 16px rise, once. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={rise}
      transition={{ ...revealTransition, delay }}
      className={className}
    >
      {children}
    </m.div>
  );
}

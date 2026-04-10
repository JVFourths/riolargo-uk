"use client";

import { m, AnimatePresence } from "motion/react";
import { useState, useEffect, useCallback } from "react";
import { fadeUp, viewportConfig, smoothTransition } from "@/components/motion-config";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "The difference is night and day. Once you try Rio Largo, supermarket olive oil simply won't do. The peppery finish is extraordinary.",
    name: "Sarah M.",
    location: "London",
  },
  {
    quote:
      "I buy the 2 litre bottle every few months. It's become a staple in our kitchen — for salads, cooking, even just dipping with fresh bread.",
    name: "James T.",
    location: "Edinburgh",
  },
  {
    quote:
      "We discovered Rio Largo on holiday in South Africa and were thrilled to find they ship to the UK. Best olive oil we've ever had.",
    name: "Emma & David K.",
    location: "Bath",
  },
  {
    quote:
      "As a chef, I'm particular about my ingredients. Rio Largo is the only olive oil I use for finishing dishes. The quality is consistent every time.",
    name: "Marco R.",
    location: "Manchester",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const advance = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const retreat = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(advance, 6000);
    return () => clearInterval(timer);
  }, [advance]);

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-40" />

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeUp}
          transition={smoothTransition}
          className="text-center"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">
            Testimonials
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold">
            What Our Customers Say
          </h2>
        </m.div>

        {/* Slider */}
        <div className="mt-16 relative min-h-[220px] flex items-center">
          <AnimatePresence mode="wait" custom={direction}>
            <m.blockquote
              key={current}
              variants={{
                enter: { opacity: 0, x: direction * 60 },
                center: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: direction * -60 },
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="text-center"
            >
              <p className="font-display text-2xl md:text-3xl leading-relaxed text-text italic">
                &ldquo;{testimonials[current].quote}&rdquo;
              </p>
              <footer className="mt-8">
                <div className="text-accent font-semibold">
                  {testimonials[current].name}
                </div>
                <div className="text-sm text-text-muted">
                  {testimonials[current].location}
                </div>
              </footer>
            </m.blockquote>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            onClick={retreat}
            className="p-2 border border-border text-text-muted hover:border-accent hover:text-accent transition-colors duration-200 cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === current
                    ? "bg-accent w-6"
                    : "bg-border hover:bg-text-muted"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={advance}
            className="p-2 border border-border text-text-muted hover:border-accent hover:text-accent transition-colors duration-200 cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

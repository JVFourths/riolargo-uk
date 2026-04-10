"use client";

import { m } from "motion/react";
import Link from "next/link";
import {
  fadeUp,
  staggerContainer,
  viewportConfig,
  smoothTransition,
} from "@/components/motion-config";
import { Truck, Clock, ShieldCheck, RotateCcw } from "lucide-react";

export default function ShippingPage() {
  return (
    <div className="pt-28 pb-32">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <m.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={smoothTransition}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">
            Delivery
          </span>
          <h1 className="mt-4 font-display text-5xl md:text-6xl font-bold">
            Shipping & Returns
          </h1>
          <p className="mt-6 text-lg text-text-muted max-w-xl">
            We ship directly from our UK stock, ensuring your olive oil arrives
            fresh and well-protected.
          </p>
        </m.div>

        {/* Key info cards */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {[
            {
              icon: Truck,
              title: "Free UK Delivery",
              desc: "All orders ship free via Royal Mail tracked service. No minimum order required.",
            },
            {
              icon: Clock,
              title: "2-4 Business Days",
              desc: "Orders placed before 2pm are dispatched same day. Most deliveries arrive within 2-4 days.",
            },
            {
              icon: ShieldCheck,
              title: "Secure Packaging",
              desc: "Each bottle is carefully wrapped and packed in protective packaging to prevent breakage in transit.",
            },
            {
              icon: RotateCcw,
              title: "Satisfaction Guaranteed",
              desc: "Not happy with your order? Contact us within 14 days and we'll make it right.",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <m.div
                key={item.title}
                variants={fadeUp}
                transition={smoothTransition}
                className="bg-bg-surface border border-border p-8"
              >
                <Icon size={22} strokeWidth={1.5} className="text-accent mb-4" />
                <h2 className="font-display text-lg font-bold mb-2">{item.title}</h2>
                <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
              </m.div>
            );
          })}
        </m.div>

        {/* FAQ-style content */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeUp}
          transition={smoothTransition}
          className="mt-20 space-y-12"
        >
          <div>
            <h2 className="font-display text-2xl font-bold mb-4">
              Delivery Details
            </h2>
            <div className="text-text-muted leading-relaxed space-y-4">
              <p>
                We ship all orders via Royal Mail Tracked 48. You&apos;ll receive
                a tracking number by email once your order has been dispatched.
              </p>
              <p>
                Orders placed Monday to Friday before 2pm GMT are dispatched the
                same day. Orders placed after 2pm or on weekends are dispatched
                the next business day.
              </p>
            </div>
          </div>

          <div className="border-t border-border pt-12">
            <h2 className="font-display text-2xl font-bold mb-4">
              Returns & Refunds
            </h2>
            <div className="text-text-muted leading-relaxed space-y-4">
              <p>
                If your order arrives damaged, please contact us immediately with
                photos and we will arrange a replacement or full refund.
              </p>
              <p>
                For any other issues, please get in touch within 14 days of
                receiving your order. We&apos;re committed to your satisfaction.
              </p>
            </div>
          </div>

          <div className="border-t border-border pt-12 text-center">
            <p className="text-text-muted mb-6">Still have questions?</p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-accent text-bg font-semibold text-sm tracking-wide uppercase hover:bg-accent-hover transition-colors duration-200 cursor-pointer"
            >
              Contact Us
            </Link>
          </div>
        </m.div>
      </div>
    </div>
  );
}

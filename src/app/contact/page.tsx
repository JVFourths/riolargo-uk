"use client";

import { m } from "motion/react";
import {
  fadeUp,
  fadeLeft,
  fadeRight,
  staggerContainer,
  viewportConfig,
  smoothTransition,
} from "@/components/motion-config";
import { Mail, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="pt-28 pb-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <m.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={smoothTransition}
          className="max-w-2xl mb-20"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">
            Get in Touch
          </span>
          <h1 className="mt-4 font-display text-5xl md:text-6xl font-bold">
            We&apos;d Love to
            <span className="text-accent"> Hear From You</span>
          </h1>
          <p className="mt-6 text-lg text-text-muted">
            Whether you have a question about our oils, need help with an order,
            or want to discuss wholesale — drop us a line.
          </p>
        </m.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Contact form */}
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={fadeLeft}
            transition={smoothTransition}
            className="lg:col-span-3"
          >
            <m.form
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={staggerContainer}
              className="space-y-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <m.div variants={fadeUp} transition={smoothTransition}>
                <label
                  htmlFor="name"
                  className="block text-xs uppercase tracking-wider text-text-muted mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full bg-bg-surface border border-border px-4 py-3 text-text placeholder:text-text-muted/50 focus:outline-none focus:border-accent transition-colors duration-200"
                  placeholder="Your name"
                />
              </m.div>

              <m.div variants={fadeUp} transition={smoothTransition}>
                <label
                  htmlFor="email"
                  className="block text-xs uppercase tracking-wider text-text-muted mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full bg-bg-surface border border-border px-4 py-3 text-text placeholder:text-text-muted/50 focus:outline-none focus:border-accent transition-colors duration-200"
                  placeholder="your@email.com"
                />
              </m.div>

              <m.div variants={fadeUp} transition={smoothTransition}>
                <label
                  htmlFor="message"
                  className="block text-xs uppercase tracking-wider text-text-muted mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full bg-bg-surface border border-border px-4 py-3 text-text placeholder:text-text-muted/50 focus:outline-none focus:border-accent transition-colors duration-200 resize-none"
                  placeholder="How can we help?"
                />
              </m.div>

              <m.div variants={fadeUp} transition={smoothTransition}>
                <button
                  type="submit"
                  className="px-10 py-4 bg-accent text-bg font-semibold text-sm tracking-wide uppercase hover:bg-accent-hover transition-colors duration-200 cursor-pointer"
                >
                  Send Message
                </button>
              </m.div>
            </m.form>
          </m.div>

          {/* Contact info */}
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={fadeRight}
            transition={smoothTransition}
            className="lg:col-span-2 space-y-10"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Mail size={18} className="text-accent" />
                <h3 className="font-display text-lg font-bold">Email</h3>
              </div>
              <p className="text-text-muted">orders@riolargo.co.uk</p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <MapPin size={18} className="text-accent" />
                <h3 className="font-display text-lg font-bold">Estate</h3>
              </div>
              <p className="text-text-muted leading-relaxed">
                Rio Largo Olive Estate
                <br />
                Breede River Valley
                <br />
                Western Cape, South Africa
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <Clock size={18} className="text-accent" />
                <h3 className="font-display text-lg font-bold">Response Time</h3>
              </div>
              <p className="text-text-muted">
                We aim to respond within 24 hours, Monday to Friday.
              </p>
            </div>

            <div className="pt-8 border-t border-border">
              <h3 className="font-display text-lg font-bold mb-3">Wholesale</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Interested in stocking Rio Largo in your shop, restaurant, or
                deli? We&apos;d love to talk. Please include your business details
                in your message.
              </p>
            </div>
          </m.div>
        </div>
      </div>
    </div>
  );
}

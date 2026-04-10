"use client";

import Link from "next/link";
import { m } from "motion/react";
import { fadeUp, viewportConfig, smoothTransition } from "@/components/motion-config";
import { Mail, MapPin } from "lucide-react";

const footerLinks = [
  {
    title: "Shop",
    links: [
      { href: "/shop", label: "All Olive Oils" },
      { href: "/shipping", label: "Shipping & Returns" },
    ],
  },
  {
    title: "About",
    links: [
      { href: "/about", label: "Our Story" },
      { href: "/about#estate", label: "The Estate" },
      { href: "/about#process", label: "How We Make It" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/contact", label: "Contact Us" },
      { href: "/shipping", label: "Delivery Info" },
    ],
  },
];

export function Footer() {
  return (
    <m.footer
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={fadeUp}
      transition={smoothTransition}
      className="border-t border-border bg-bg-surface"
    >
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="font-display text-2xl font-bold text-text">
              Rio Largo
            </Link>
            <p className="mt-4 text-sm text-text-muted leading-relaxed">
              Award-winning extra virgin olive oil from the Breede River Valley,
              South Africa. Delivered fresh to your door in the UK.
            </p>
            <div className="mt-6 flex flex-col gap-3 text-sm text-text-muted">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-accent shrink-0" />
                <span>Breede River Valley, Western Cape</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-accent shrink-0" />
                <span>orders@riolargo.co.uk</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-muted hover:text-accent transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Rio Largo Olive Estate. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            Premium South African olive oil, crafted with care.
          </p>
        </div>
      </div>
    </m.footer>
  );
}

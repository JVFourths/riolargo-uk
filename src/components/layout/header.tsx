"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { m, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "Our Story" },
  { href: "/shipping", label: "Shipping" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (v) => setScrolled(v > 50));
    return unsubscribe;
  }, [scrollY]);

  return (
    <>
      <m.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
          scrolled ? "border-b border-border" : ""
        )}
        style={{
          backgroundColor: useTransform(
            bgOpacity,
            (v) => `rgba(12, 12, 12, ${v * 0.95})`
          ),
          backdropFilter: useTransform(
            bgOpacity,
            (v) => `blur(${v * 12}px)`
          ),
        }}
      >
        <nav className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="font-display text-2xl font-bold tracking-tight text-text group-hover:text-accent transition-colors duration-200">
              Rio Largo
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-text-muted hover:text-accent transition-colors duration-200 tracking-wide uppercase"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/shop"
              className="ml-2 px-5 py-2 bg-accent text-bg text-sm font-semibold rounded-none hover:bg-accent-hover transition-colors duration-200 cursor-pointer tracking-wide"
            >
              Order Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 text-text-muted hover:text-accent transition-colors cursor-pointer"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </nav>
      </m.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <m.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-80 bg-bg-surface border-l border-border p-8 flex flex-col"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="self-end p-2 text-text-muted hover:text-accent transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
              <div className="mt-12 flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <m.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-xl font-display text-text hover:text-accent transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </m.div>
                ))}
              </div>
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-auto"
              >
                <Link
                  href="/shop"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center px-6 py-3 bg-accent text-bg font-semibold hover:bg-accent-hover transition-colors cursor-pointer"
                >
                  Order Now
                </Link>
              </m.div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

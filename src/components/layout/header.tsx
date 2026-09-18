"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { m, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "The estate" },
  { href: "/shipping", label: "Delivery" },
  { href: "/contact", label: "Contact" },
];

const SCROLL_THRESHOLD = 24;

function isCurrent(pathname: string, href: string) {
  return pathname === href || pathname === `${href}/`;
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const opener = openRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b bg-paper/92 backdrop-blur-md transition-colors duration-(--duration-state)",
          scrolled ? "border-rule" : "border-transparent"
        )}
      >
        <nav
          aria-label="Main"
          className="container-page flex items-center justify-between py-3"
        >
          <Link href="/" aria-label="Rio Largo Olive Estate, home" className="block">
            <Image
              src="/images/logo-250w.webp"
              alt=""
              width={250}
              height={173}
              priority
              className="h-12 w-auto md:h-14"
            />
          </Link>

          <div className="hidden items-center gap-9 md:flex">
            {navLinks.map((link) => {
              const current = isCurrent(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    "border-b py-1 text-[0.9375rem] font-medium transition-colors duration-(--duration-state) hover:text-fox",
                    current ? "border-fox text-fox" : "border-transparent"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link href="/shop" className="btn btn-primary">
              Shop the oils
            </Link>
          </div>

          <button
            ref={openRef}
            onClick={() => setMobileOpen(true)}
            className="-mr-2 flex h-12 w-12 cursor-pointer items-center justify-center md:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <Menu size={26} strokeWidth={1.5} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-50 bg-ink/40"
              onClick={() => setMobileOpen(false)}
            />
            <m.div
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 z-50 flex w-[min(22rem,88vw)] flex-col border-l border-rule bg-paper p-6"
            >
              <button
                ref={closeRef}
                onClick={() => setMobileOpen(false)}
                className="-mr-2 flex h-12 w-12 cursor-pointer items-center justify-center self-end"
                aria-label="Close menu"
              >
                <X size={26} strokeWidth={1.5} />
              </button>
              <ul className="mt-8 border-t border-rule">
                {[{ href: "/", label: "Home" }, ...navLinks].map((link) => (
                  <li key={link.href} className="border-b border-rule">
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      aria-current={isCurrent(pathname, link.href) ? "page" : undefined}
                      className="block py-4 font-display text-3xl font-medium aria-[current=page]:italic aria-[current=page]:text-fox"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/shop"
                onClick={() => setMobileOpen(false)}
                className="btn btn-primary mt-auto w-full"
              >
                Shop the oils
              </Link>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

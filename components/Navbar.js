'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { href: '/shop',           label: 'Shop' },
  { href: '/#advantage',     label: 'The Advantage' },
  { href: '/#story',         label: 'Our Story' },
  { href: '/#awards',        label: 'Awards' },
  { href: '/shipping',       label: 'Shipping' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ease-out ${
        scrolled
          ? 'bg-limestone-50/95 backdrop-blur border-b border-limestone-300'
          : 'bg-limestone-50 border-b border-transparent'
      }`}
    >
      <div className="container-x flex items-center justify-between h-20">
        {/* Wordmark */}
        <Link href="/" className="group flex items-baseline gap-2 cursor-pointer" aria-label="Rio Largo home">
          <span className="font-display text-2xl font-bold text-mountain-900 tracking-tight">
            Rio Largo
          </span>
          <span className="hidden sm:inline text-eyebrow uppercase text-sage-600 group-hover:text-fynbos-600 transition-colors duration-200">
            UK
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-10 text-sm font-medium text-mountain-900">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-fynbos-600 transition-colors duration-200 cursor-pointer"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/shop" className="btn-primary !py-3 !px-6 text-sm">
            Shop the Oil
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 -mr-2 text-mountain-900 cursor-pointer"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden border-t border-limestone-300 bg-limestone-50">
          <nav className="container-x py-6 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 text-mountain-900 font-medium hover:text-fynbos-600 transition-colors cursor-pointer"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/shop"
              onClick={() => setOpen(false)}
              className="btn-primary mt-4 w-full"
            >
              Shop the Oil
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="bg-olive-800 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-olive-900 font-bold text-sm">RL</div>
          <span className="font-semibold tracking-wide text-lg">RIO LARGO</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <Link href="/shop" className="hover:text-gold transition-colors">Shop</Link>
          <Link href="/#story" className="hover:text-gold transition-colors">Our Story</Link>
          <Link href="/#awards" className="hover:text-gold transition-colors">Awards</Link>
          <Link href="/shop" className="bg-gold text-olive-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
            Buy Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2">
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-white transition-all ${open ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-all ${open ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-olive-900 px-4 pb-4 space-y-3 text-sm font-medium">
          <Link href="/" className="block py-2 hover:text-gold" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/shop" className="block py-2 hover:text-gold" onClick={() => setOpen(false)}>Shop</Link>
          <Link href="/#story" className="block py-2 hover:text-gold" onClick={() => setOpen(false)}>Our Story</Link>
          <Link href="/#awards" className="block py-2 hover:text-gold" onClick={() => setOpen(false)}>Awards</Link>
          <Link href="/shop" className="block bg-gold text-olive-900 px-4 py-2 rounded-lg font-semibold text-center mt-2" onClick={() => setOpen(false)}>Buy Now</Link>
        </div>
      )}
    </nav>
  )
}

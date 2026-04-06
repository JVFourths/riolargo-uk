import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-olive-900 text-olive-200 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 bg-gold rounded-full flex items-center justify-center text-olive-900 font-bold text-xs">RL</div>
            <span className="font-semibold text-white">RIO LARGO</span>
          </div>
          <p className="text-sm leading-relaxed text-olive-300">
            Award-winning extra virgin olive oil from the Breede River Valley, South Africa. Imported exclusively for the UK by Sidwell's.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/shop" className="hover:text-gold transition-colors">Shop</Link></li>
            <li><Link href="/#story" className="hover:text-gold transition-colors">Our Story</Link></li>
            <li><Link href="/#awards" className="hover:text-gold transition-colors">Awards</Link></li>
            <li><Link href="/shipping" className="hover:text-gold transition-colors">Shipping & Returns</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <ul className="space-y-2 text-sm text-olive-300">
            <li>orders@riolargo.co.uk</li>
            <li className="pt-2">
              <span className="text-olive-400 text-xs">Free UK delivery on orders over £40</span>
            </li>
            <li className="pt-1">
              <span className="text-olive-400 text-xs">Dispatched within 1-2 working days</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-olive-700 py-4 text-center text-xs text-olive-500">
        <p>© {new Date().getFullYear()} Rio Largo UK. Imported by Sidwell's. All rights reserved.</p>
      </div>
    </footer>
  )
}

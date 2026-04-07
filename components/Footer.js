import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-32 bg-mountain-900 text-limestone-50">
      <div className="container-x py-20 grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Brand */}
        <div className="md:col-span-5">
          <p className="eyebrow !text-fynbos-500 mb-4">Rio Largo · UK</p>
          <h2 className="font-display text-3xl md:text-4xl text-limestone-50 leading-tight max-w-md mb-6">
            Award-winning olive oil from South Africa&rsquo;s Breede River Valley.
          </h2>
          <p className="text-limestone-50/70 max-w-prose text-base leading-relaxed">
            Hand-picked. Cold-pressed within hours. Internationally recognised in New York,
            Japan, Amsterdam, Italy and Dubai. Imported exclusively for the UK by Sidwell&rsquo;s.
          </p>
        </div>

        {/* Links */}
        <div className="md:col-span-3 md:col-start-7">
          <p className="eyebrow !text-fynbos-500 mb-5">Explore</p>
          <ul className="space-y-3 text-limestone-50/85">
            <li><Link href="/shop" className="hover:text-fynbos-500 transition-colors duration-200 cursor-pointer">Shop</Link></li>
            <li><Link href="/#advantage" className="hover:text-fynbos-500 transition-colors duration-200 cursor-pointer">The Southern Advantage</Link></li>
            <li><Link href="/#story" className="hover:text-fynbos-500 transition-colors duration-200 cursor-pointer">Our Story</Link></li>
            <li><Link href="/#awards" className="hover:text-fynbos-500 transition-colors duration-200 cursor-pointer">Awards</Link></li>
            <li><Link href="/shipping" className="hover:text-fynbos-500 transition-colors duration-200 cursor-pointer">Shipping &amp; Returns</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="md:col-span-3">
          <p className="eyebrow !text-fynbos-500 mb-5">Contact</p>
          <ul className="space-y-3 text-limestone-50/85">
            <li>
              <a href="mailto:orders@riolargo.co.uk" className="hover:text-fynbos-500 transition-colors duration-200 cursor-pointer">
                orders@riolargo.co.uk
              </a>
            </li>
            <li className="text-sm text-limestone-50/60 pt-2">
              Free UK delivery over &pound;40
            </li>
            <li className="text-sm text-limestone-50/60">
              Dispatched in 1&ndash;2 working days
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-limestone-50/10">
        <div className="container-x py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-limestone-50/50">
          <p>&copy; {new Date().getFullYear()} Rio Largo UK &middot; Imported by Sidwell&rsquo;s</p>
          <p>Hand-picked. Cold-pressed. Southern hemisphere harvest.</p>
        </div>
      </div>
    </footer>
  )
}

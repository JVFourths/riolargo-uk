import Link from 'next/link'

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-olive-100 overflow-hidden hover:shadow-md transition-shadow group">
      {/* Image placeholder */}
      <div
        className="h-56 flex items-center justify-center text-white text-6xl"
        style={{ background: `linear-gradient(135deg, ${product.imagePlaceholder}cc, ${product.imagePlaceholder})` }}
      >
        🫒
      </div>

      <div className="p-6">
        <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-1">Award-Winning EVOO</p>
        <h3 className="font-bold text-olive-900 text-lg leading-tight">{product.name}</h3>
        <p className="text-olive-500 text-sm mb-4">{product.subtitle}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="award-badge">🏅 NY Gold</span>
          <span className="award-badge">🏅 Japan Gold</span>
          <span className="award-badge">98/100 Flos Olei</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-olive-800">{product.priceDisplay}</span>
          <Link
            href={`/product/${product.slug}`}
            className="bg-olive-700 hover:bg-olive-800 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
          >
            View & Buy
          </Link>
        </div>
      </div>
    </div>
  )
}

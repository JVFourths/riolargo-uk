import Link from 'next/link'
import { products } from '../../lib/products'
import ProductCard from '../../components/ProductCard'

export const metadata = {
  title: 'Shop | Rio Largo Award-Winning Olive Oil UK',
  description: 'Buy Rio Largo extra virgin olive oil online. Available in 500ml, 1 litre and 2 litre. Free UK delivery on orders over £40.',
}

export default function ShopPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">Award-Winning EVOO</p>
        <h1 className="text-4xl font-bold text-olive-900 mb-4">Shop Rio Largo</h1>
        <p className="text-olive-600 text-lg max-w-xl mx-auto">
          One exceptional oil. Three sizes. Cold-pressed in South Africa's Breede River Valley.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 bg-olive-50 border border-olive-200 rounded-full px-4 py-2 text-sm text-olive-700">
          🚚 Free UK delivery on orders over £40 · Dispatched within 1-2 working days
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>

      <div className="mt-16 bg-olive-50 border border-olive-200 rounded-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div>
          <div className="text-2xl mb-2">📦</div>
          <div className="font-semibold text-olive-900">Free Delivery</div>
          <div className="text-olive-500 text-sm">On orders over £40</div>
        </div>
        <div>
          <div className="text-2xl mb-2">⚡</div>
          <div className="font-semibold text-olive-900">Fast Dispatch</div>
          <div className="text-olive-500 text-sm">1-2 working days</div>
        </div>
        <div>
          <div className="text-2xl mb-2">🔒</div>
          <div className="font-semibold text-olive-900">Secure Checkout</div>
          <div className="text-olive-500 text-sm">Powered by Stripe</div>
        </div>
      </div>
    </div>
  )
}

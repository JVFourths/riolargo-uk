'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { products } from '../../../lib/products'

export default function ProductPage({ params }) {
  const product = products.find(p => p.slug === params.slug)
  const [qty, setQty] = useState(1)
  const [loading, setLoading] = useState(false)

  if (!product) return <div className="p-8 text-center">Product not found. <Link href="/shop" className="text-olive-700 underline">Back to shop</Link></div>

  async function handleBuy() {
    setLoading(true)
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: [{ id: product.id, qty }] }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch (e) {
      alert('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  const otherProducts = products.filter(p => p.id !== product.id)

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Link href="/shop" className="text-olive-600 hover:text-olive-800 text-sm mb-8 inline-flex items-center gap-1">
        ← Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-6">
        {/* Image */}
        <div
          className="rounded-2xl h-80 md:h-auto flex items-center justify-center text-8xl"
          style={{ background: `linear-gradient(135deg, ${product.imagePlaceholder}cc, ${product.imagePlaceholder})` }}
        >
          🫒
        </div>

        {/* Details */}
        <div>
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-2">Rio Largo Olive Estate · South Africa</p>
          <h1 className="text-3xl font-bold text-olive-900">{product.name}</h1>
          <p className="text-olive-500 text-lg mb-4">{product.subtitle}</p>

          <div className="text-3xl font-bold text-olive-800 mb-6">{product.priceDisplay}</div>

          {/* Award badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {product.awards.slice(0, 3).map(a => (
              <span key={a} className="award-badge text-xs">🏅 {a.split('—')[0].trim()}</span>
            ))}
          </div>

          <p className="text-olive-600 leading-relaxed mb-6">{product.description}</p>

          {/* Highlights */}
          <ul className="space-y-2 mb-8">
            {product.highlights.map(h => (
              <li key={h} className="flex items-start gap-2 text-sm text-olive-700">
                <span className="text-green-500 mt-0.5">✓</span> {h}
              </li>
            ))}
          </ul>

          {/* Quantity + Buy */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center border border-olive-200 rounded-lg overflow-hidden">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 hover:bg-olive-50 text-olive-700 font-bold">−</button>
              <span className="px-4 py-3 font-semibold text-olive-900 min-w-[40px] text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-4 py-3 hover:bg-olive-50 text-olive-700 font-bold">+</button>
            </div>
            <button
              onClick={handleBuy}
              disabled={loading}
              className="flex-1 bg-olive-700 hover:bg-olive-800 disabled:bg-olive-400 text-white font-bold py-3 rounded-lg transition-colors text-center"
            >
              {loading ? 'Redirecting...' : `Buy Now — £${(product.price * qty / 100).toFixed(2)}`}
            </button>
          </div>

          <p className="text-xs text-olive-400 text-center">🔒 Secure checkout via Stripe · Free delivery on orders over £40</p>
        </div>
      </div>

      {/* Full awards */}
      <div className="mt-16 bg-olive-50 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-olive-900 mb-6">Award Record</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {product.awards.map(a => (
            <div key={a} className="flex items-start gap-2 text-sm">
              <span className="text-gold text-base">🏅</span>
              <span className="text-olive-700">{a}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Other products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-olive-900 mb-6">Other Sizes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {otherProducts.map(p => (
            <Link key={p.id} href={`/product/${p.slug}`} className="bg-white border border-olive-100 rounded-xl p-5 flex gap-4 items-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl" style={{ background: p.imagePlaceholder }}>🫒</div>
              <div>
                <div className="font-semibold text-olive-900">{p.subtitle}</div>
                <div className="text-olive-500 text-sm">{p.priceDisplay}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

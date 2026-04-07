'use client'
import { useState } from 'react'
import { Minus, Plus, ShoppingBag, Lock } from 'lucide-react'

export default function BuyForm({ product }) {
  const [qty, setQty] = useState(1)
  const [loading, setLoading] = useState(false)

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
      else throw new Error(data.error || 'Checkout failed')
    } catch (e) {
      alert('Sorry, checkout could not start. Please try again or email orders@riolargo.co.uk')
      setLoading(false)
    }
  }

  const total = `£${(product.price * qty / 100).toFixed(2)}`

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center border border-mountain-900 rounded-sharp">
          <button
            type="button"
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="p-3 hover:bg-mountain-900 hover:text-limestone-50 transition-colors cursor-pointer"
            aria-label="Decrease quantity"
          >
            <Minus size={16} strokeWidth={1.5} />
          </button>
          <span className="px-5 font-medium text-mountain-900 tabular-nums min-w-[50px] text-center">{qty}</span>
          <button
            type="button"
            onClick={() => setQty(qty + 1)}
            className="p-3 hover:bg-mountain-900 hover:text-limestone-50 transition-colors cursor-pointer"
            aria-label="Increase quantity"
          >
            <Plus size={16} strokeWidth={1.5} />
          </button>
        </div>
        <button
          type="button"
          onClick={handleBuy}
          disabled={loading}
          className="btn-primary flex-1 disabled:opacity-60 disabled:cursor-wait"
        >
          {loading ? (
            'Redirecting…'
          ) : (
            <>
              <ShoppingBag size={18} strokeWidth={1.5} className="mr-2" />
              Buy now &middot; {total}
            </>
          )}
        </button>
      </div>
      <p className="flex items-center gap-2 text-xs text-mountain-900/60">
        <Lock size={12} strokeWidth={1.5} /> Secure checkout via Stripe &middot; Free UK delivery over &pound;40
      </p>
    </div>
  )
}

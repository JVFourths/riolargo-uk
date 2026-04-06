'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

function OrderSuccessContent() {
  const params     = useSearchParams()
  const sessionId  = params.get('session_id')
  const [order, setOrder]   = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!sessionId) { setLoading(false); return }
    fetch(`/api/order?session_id=${sessionId}`)
      .then(r => r.json())
      .then(data => { setOrder(data.order); setLoading(false) })
      .catch(() => setLoading(false))
  }, [sessionId])

  if (loading) {
    return (
      <div className="text-center py-24">
        <div className="text-4xl mb-4 animate-pulse">🫒</div>
        <p className="text-olive-600">Confirming your order...</p>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center">
      <div className="text-6xl mb-6">🎉</div>
      <h1 className="text-3xl font-bold text-olive-900 mb-4">Order Confirmed!</h1>
      <p className="text-olive-600 text-lg mb-6">
        Thank you{order?.customer_name ? `, ${order.customer_name.split(' ')[0]}` : ''}. Your Rio Largo is on its way to you.
      </p>

      <div className="bg-olive-50 border border-olive-200 rounded-2xl p-6 text-left mb-8">
        <h2 className="font-bold text-olive-900 mb-4">What happens next?</h2>
        <div className="space-y-3">
          {[
            { icon: '📧', text: 'A confirmation email has been sent to your inbox' },
            { icon: '📦', text: 'We will pack your order within 1-2 working days' },
            { icon: '🚚', text: 'You will receive a dispatch email with your tracking number' },
            { icon: '🏠', text: 'Royal Mail will deliver to your address' },
          ].map(s => (
            <div key={s.text} className="flex items-start gap-3 text-sm text-olive-700">
              <span className="text-base">{s.icon}</span>
              <span>{s.text}</span>
            </div>
          ))}
        </div>
      </div>

      {order && (
        <div className="bg-white border border-olive-100 rounded-xl p-5 text-left mb-8 text-sm">
          <div className="text-olive-500 mb-2">Order #{order.id}</div>
          <div className="font-semibold text-olive-900">
            Total: £{(order.total / 100).toFixed(2)}
          </div>
          <div className="text-olive-500 mt-1 text-xs whitespace-pre-line">{order.shipping_address}</div>
        </div>
      )}

      <Link href="/shop" className="btn-primary">
        Shop Again
      </Link>
    </div>
  )
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="text-center py-24 text-olive-600">Loading...</div>}>
      <OrderSuccessContent />
    </Suspense>
  )
}

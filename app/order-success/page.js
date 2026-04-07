'use client'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Mail, Package, Truck, Home, Check, ArrowRight } from 'lucide-react'

const STEPS = [
  { icon: Mail,    text: 'A confirmation email is on its way to your inbox.' },
  { icon: Package, text: 'We will hand-pack your order within 1–2 working days.' },
  { icon: Truck,   text: 'A dispatch email with your tracking number will follow.' },
  { icon: Home,    text: 'Royal Mail Tracked will deliver to your address.' },
]

function OrderSuccessContent() {
  const params = useSearchParams()
  const sessionId = params.get('session_id')
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!sessionId) { setLoading(false); return }
    fetch(`/api/order?session_id=${sessionId}`)
      .then((r) => r.json())
      .then((data) => { setOrder(data.order); setLoading(false) })
      .catch(() => setLoading(false))
  }, [sessionId])

  return (
    <section className="bg-limestone-50 py-24 md:py-32 min-h-[70vh]">
      <div className="container-x max-w-3xl">
        {loading ? (
          <p className="text-mountain-900/60 text-center">Confirming your order…</p>
        ) : (
          <>
            <Check size={48} strokeWidth={1.25} className="text-fynbos-600 mb-8" />
            <p className="eyebrow mb-5">Order received</p>
            <h1 className="font-display text-h1 text-mountain-900 leading-tight text-balance mb-6">
              Thank you{order?.customer_name ? `, ${order.customer_name.split(' ')[0]}` : ''}.<br/>
              Your Rio Largo is on its way.
            </h1>
            <p className="text-mountain-900/75 max-w-prose mb-12">
              We&rsquo;ll hand-pack your bottle{order?.id ? ` (order #${order.id})` : ''} and post
              it via Royal Mail Tracked. You&rsquo;ll get a dispatch email with the tracking
              number as soon as it&rsquo;s on its way.
            </p>

            <ul className="space-y-5 mb-12 max-w-prose">
              {STEPS.map((step) => {
                const Icon = step.icon
                return (
                  <li key={step.text} className="flex items-start gap-4 text-mountain-900/85">
                    <Icon size={20} strokeWidth={1.5} className="text-fynbos-600 flex-shrink-0 mt-0.5" />
                    <span>{step.text}</span>
                  </li>
                )
              })}
            </ul>

            {order && (
              <div className="border border-mountain-900/15 p-6 mb-12 max-w-prose">
                <p className="eyebrow mb-3">Order summary</p>
                <p className="font-display text-2xl text-mountain-900 mb-1 tabular-nums">
                  £{(order.total / 100).toFixed(2)}
                </p>
                {order.shipping_address && (
                  <p className="text-sm text-mountain-900/65 mt-3 whitespace-pre-line">{order.shipping_address}</p>
                )}
              </div>
            )}

            <Link href="/shop" className="btn-primary">
              Shop again <ArrowRight size={18} strokeWidth={1.5} className="ml-2" />
            </Link>
          </>
        )}
      </div>
    </section>
  )
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="container-x py-32 text-mountain-900/60">Loading…</div>}>
      <OrderSuccessContent />
    </Suspense>
  )
}

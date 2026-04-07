import { Truck, RotateCcw, Mail } from 'lucide-react'

export const metadata = {
  title: 'Shipping & Returns | Rio Largo',
  description: 'How we ship Rio Largo extra virgin olive oil across the UK, and how returns work.',
}

const DELIVERY_POINTS = [
  'Orders dispatched within 1–2 working days of payment',
  'Royal Mail Tracked across the UK',
  'Typical delivery 2–3 working days after dispatch',
  'Free delivery on all orders over £40',
  'Standard shipping £4.95 on orders under £40',
  'Tracking number emailed as soon as we hand it over',
]

const RETURNS_POINTS = [
  'Contact us within 14 days of receiving your order',
  'Unopened bottles can be returned for a full refund',
  'If anything arrives damaged, email a photo and we will replace it immediately',
]

export default function ShippingPage() {
  return (
    <section className="bg-limestone-50 py-24 md:py-32">
      <div className="container-x max-w-4xl">
        <p className="eyebrow mb-5">Shipping &amp; Returns</p>
        <h1 className="font-display text-h1 text-mountain-900 leading-tight text-balance mb-16">
          Hand-packed, tracked, and on its way within two days.
        </h1>

        <div className="space-y-16">
          <section>
            <div className="flex items-center gap-4 mb-8">
              <Truck size={28} strokeWidth={1.5} className="text-fynbos-600" />
              <h2 className="font-display text-h2 text-mountain-900">Delivery</h2>
            </div>
            <ul className="space-y-4 max-w-prose">
              {DELIVERY_POINTS.map((p) => (
                <li key={p} className="flex items-start gap-4 text-mountain-900/85 border-b border-mountain-900/10 pb-4">
                  <span className="text-fynbos-600 mt-0.5">&bull;</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-8">
              <RotateCcw size={28} strokeWidth={1.5} className="text-fynbos-600" />
              <h2 className="font-display text-h2 text-mountain-900">Returns</h2>
            </div>
            <p className="text-mountain-900/75 max-w-prose mb-6">
              We want you to love your Rio Largo. If for any reason you&rsquo;re not satisfied:
            </p>
            <ul className="space-y-4 max-w-prose">
              {RETURNS_POINTS.map((p) => (
                <li key={p} className="flex items-start gap-4 text-mountain-900/85 border-b border-mountain-900/10 pb-4">
                  <span className="text-fynbos-600 mt-0.5">&bull;</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-8">
              <Mail size={28} strokeWidth={1.5} className="text-fynbos-600" />
              <h2 className="font-display text-h2 text-mountain-900">Get in touch</h2>
            </div>
            <p className="text-mountain-900/75 max-w-prose">
              For any questions about your order, email{' '}
              <a href="mailto:orders@riolargo.co.uk" className="text-fynbos-600 hover:text-fynbos-700 underline underline-offset-4 cursor-pointer">
                orders@riolargo.co.uk
              </a>
              {' '}and we&rsquo;ll get back to you within one working day.
            </p>
          </section>
        </div>
      </div>
    </section>
  )
}

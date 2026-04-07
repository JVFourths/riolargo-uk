import Image from 'next/image'
import { products } from '../../lib/products'
import ProductCard from '../../components/ProductCard'
import { Truck, Clock, Lock } from 'lucide-react'

export const metadata = {
  title: 'Shop | Rio Largo Award-winning Olive Oil',
  description:
    'Buy Rio Largo extra virgin olive oil. 500ml, 1 litre and 2 litre. Hand-picked, cold-pressed in South Africa\'s Breede River Valley. Free UK delivery over £40.',
}

const ASSURANCES = [
  { icon: Truck, title: 'Free UK delivery',   body: 'On all orders over £40' },
  { icon: Clock, title: 'Fast dispatch',      body: '1–2 working days' },
  { icon: Lock,  title: 'Secure checkout',    body: 'Stripe payments' },
]

export default function ShopPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-limestone-50 pt-24 md:pt-32 pb-16">
        <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5">Shop &middot; Rio Largo UK</p>
            <h1 className="font-display text-h1 text-mountain-900 leading-tight text-balance">
              Three sizes.<br/>One exceptional oil.
            </h1>
          </div>
          <div className="lg:col-span-5">
            <p className="text-mountain-900/75 max-w-prose">
              A blend of hand-picked Frantoio, Leccino and Coratina &mdash; Italian cultivars
              grown in South Africa&rsquo;s Breede River Valley. Cold-pressed within hours of
              picking, nitrogen-sealed for freshness, and on UK tables before the northern
              oils are bottled.
            </p>
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section className="bg-limestone-100 pb-24 md:pb-32">
        <div className="container-x">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-mountain-900/10">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Assurances strip */}
      <section className="bg-limestone-50 py-20">
        <div className="container-x">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {ASSURANCES.map((a) => {
              const Icon = a.icon
              return (
                <div key={a.title} className="flex items-start gap-5">
                  <Icon size={28} strokeWidth={1.5} className="text-fynbos-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-display text-xl text-mountain-900 mb-1">{a.title}</p>
                    <p className="text-mountain-900/65 text-sm">{a.body}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

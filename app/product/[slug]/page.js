import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeft, Check, Award, Droplet, ShieldCheck } from 'lucide-react'
import { products } from '../../../lib/products'
import BuyForm from './BuyForm'

const BOTTLE_BY_ID = {
  'rl-500ml': '/images/bottle-500ml-800w.webp',
  'rl-1l':    '/images/bottle-1l-800w.webp',
  'rl-2l':    '/images/bottle-2l-800w.webp',
}

const TASTING_NOTES = [
  { cultivar: 'Frantoio',  note: 'Green apple, fresh-cut grass, almond skin' },
  { cultivar: 'Leccino',   note: 'Soft pepper, ripe stone fruit, balance' },
  { cultivar: 'Coratina',  note: 'Bitter herbs, artichoke, peppery finish' },
]

const OPENING_STEPS = [
  'Remove the bottom tab',
  'Open the top round tab toward you',
  'Extract the tap',
  'Slide it into the sides of the hole',
  'Close the flap inside the tap',
  'Twist to enjoy',
]

const PAIRINGS = [
  { image: '/images/recipe-feta-960w.webp',     title: 'Whipped feta',      body: 'Drizzle generously over warm whipped feta with cracked pepper.' },
  { image: '/images/recipe-potatoes-640w.webp', title: 'Crushed new potatoes', body: 'Toss with sea salt and rosemary; finish with a slow pour.' },
  { image: '/images/recipe-salad-960w.webp',    title: 'Tomato salad',      body: 'A few drops over heirloom tomatoes is enough. Trust the oil.' },
]

export async function generateMetadata({ params }) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)
  if (!product) return { title: 'Not found' }
  return {
    title: `${product.subtitle} | Rio Largo Extra Virgin Olive Oil`,
    description: product.description,
    openGraph: {
      title: `Rio Largo ${product.subtitle}`,
      description: product.description,
      type: 'website',
      images: [BOTTLE_BY_ID[product.id] || '/images/hero-breede-valley-1280w.webp'],
    },
  }
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export default async function ProductPage({ params }) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)
  if (!product) notFound()

  const bottle = BOTTLE_BY_ID[product.id]
  const otherProducts = products.filter((p) => p.id !== product.id)

  return (
    <>
      {/* ============ ABOVE FOLD ============ */}
      <section className="bg-limestone-50 pt-12 md:pt-16 pb-24 md:pb-32">
        <div className="container-x">
          <Link href="/shop" className="btn-ghost text-sm mb-12">
            <ArrowLeft size={16} strokeWidth={1.5} /> Back to shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Bottle */}
            <div className="lg:col-span-6">
              <div className="bg-limestone-200 aspect-[4/5] flex items-center justify-center">
                {bottle && (
                  <Image
                    src={bottle}
                    alt={`Rio Largo ${product.subtitle}`}
                    width={800}
                    height={1000}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                    className="w-auto h-full max-h-[560px] object-contain"
                  />
                )}
              </div>
            </div>

            {/* Details */}
            <div className="lg:col-span-6">
              <p className="eyebrow mb-4">Rio Largo Olive Estate &middot; South Africa</p>
              <p className="text-sage-700 font-medium mb-2">{product.subtitle}</p>
              <h1 className="font-display text-h1 text-mountain-900 leading-tight mb-6">
                Extra Virgin Olive Oil
              </h1>

              <p className="font-display text-3xl text-mountain-900 tabular-nums mb-8">
                {product.priceDisplay}
              </p>

              <p className="text-mountain-900/80 leading-relaxed mb-8 max-w-prose">
                {product.description}
              </p>

              <ul className="space-y-3 mb-10 max-w-prose">
                {product.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-sm text-mountain-900/85">
                    <Check size={16} strokeWidth={1.5} className="text-fynbos-600 flex-shrink-0 mt-1" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <BuyForm product={product} />

              {/* Mini medal sweep */}
              <div className="mt-12 pt-8 border-t border-mountain-900/10">
                <p className="eyebrow mb-4">Awarded internationally</p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                  {product.awards.slice(0, 4).map((a) => (
                    <div key={a} className="flex items-start gap-2 text-mountain-900/80">
                      <Award size={14} strokeWidth={1.5} className="text-fynbos-600 flex-shrink-0 mt-0.5" />
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TASTING NOTES ============ */}
      <section className="bg-mountain-900 text-limestone-50 py-24 md:py-28">
        <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="eyebrow !text-fynbos-400 mb-5">Tasting Notes</p>
            <h2 className="font-display text-h2 text-limestone-50 leading-tight text-balance">
              Italian heritage. Southern terroir.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <ul className="divide-y divide-limestone-50/15 border-y border-limestone-50/15">
              {TASTING_NOTES.map((t) => (
                <li key={t.cultivar} className="py-6 grid grid-cols-12 gap-6 items-baseline">
                  <p className="col-span-4 font-display text-2xl text-fynbos-400">{t.cultivar}</p>
                  <p className="col-span-8 text-limestone-50/85">{t.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============ THE DECANTER ============ */}
      <section className="bg-limestone-50 py-24 md:py-28">
        <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-5">The Decanter</p>
            <h2 className="font-display text-h2 text-mountain-900 leading-tight text-balance mb-6">
              Bag-in-box. Twist tap. Fresh till the last drop.
            </h2>
            <p className="text-mountain-900/80 leading-relaxed mb-6 max-w-prose">
              Inside the decanter is a specially-engineered sealed bag that protects the oil
              from its three enemies: <strong>heat, light, and oxygen</strong>. The precision
              twist tap dispenses without ever letting air back in &mdash; so the very last
              pour tastes the same as the first.
            </p>
            <p className="text-mountain-900/65 text-sm">
              Awarded <span className="text-fynbos-700 font-medium">Best Packaging</span> at
              the Dubai Olive Oil Competition 2022.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3 max-w-sm">
              {[
                { icon: ShieldCheck, label: 'No oxidation' },
                { icon: Droplet,     label: 'Precise pour' },
                { icon: Award,       label: 'Award-winning' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="border border-mountain-900/15 p-3 text-center">
                  <Icon size={18} strokeWidth={1.5} className="text-fynbos-600 mx-auto mb-1.5" />
                  <p className="text-xs text-mountain-900/75">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="eyebrow mb-6">Opening it &mdash; six little steps</p>
            <ol className="border-t border-mountain-900/10">
              {OPENING_STEPS.map((step, i) => (
                <li
                  key={step}
                  className="flex items-baseline gap-6 py-5 border-b border-mountain-900/10"
                >
                  <span className="font-display text-3xl text-fynbos-600 tabular-nums leading-none w-10 flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-mountain-900 text-lg">{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-mountain-900/55">
              The oil is best stored upright, away from direct sunlight, at room temperature.
              Use within twelve months of opening for peak freshness.
            </p>
          </div>
        </div>
      </section>

      {/* ============ FULL AWARD RECORD ============ */}
      <section className="bg-limestone-50 py-24 md:py-28">
        <div className="container-x">
          <div className="max-w-2xl mb-12">
            <p className="eyebrow mb-5">Full Award Record</p>
            <h2 className="font-display text-h2 text-mountain-900 leading-tight text-balance">
              Eight country&rsquo;s gold medals.
              Awarded since the very first harvest.
            </h2>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5 max-w-4xl">
            {product.awards.map((a) => (
              <li key={a} className="flex items-start gap-3 text-mountain-900/85 border-b border-mountain-900/10 pb-4">
                <Award size={18} strokeWidth={1.5} className="text-fynbos-600 flex-shrink-0 mt-0.5" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ PAIRINGS ============ */}
      <section className="bg-limestone-100 py-24 md:py-28">
        <div className="container-x">
          <div className="max-w-2xl mb-16">
            <p className="eyebrow mb-5">In the Kitchen</p>
            <h2 className="font-display text-h2 text-mountain-900 leading-tight text-balance">
              Pairings worth the bottle.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {PAIRINGS.map((p) => (
              <article key={p.title}>
                <div className="aspect-[4/5] mb-6 overflow-hidden bg-limestone-200">
                  <Image
                    src={p.image}
                    alt={p.title}
                    width={960}
                    height={1200}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-display text-2xl text-mountain-900 mb-3">{p.title}</h3>
                <p className="text-mountain-900/70 text-sm leading-relaxed">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ OTHER SIZES ============ */}
      <section className="bg-limestone-50 py-24 md:py-28">
        <div className="container-x">
          <p className="eyebrow mb-5">Other sizes</p>
          <h2 className="font-display text-h2 text-mountain-900 mb-12 leading-tight">
            Same oil, different bottle.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-mountain-900/10 max-w-3xl">
            {otherProducts.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.slug}`}
                className="group bg-limestone-50 p-8 flex items-center gap-6 cursor-pointer hover:bg-limestone-100 transition-colors duration-200"
              >
                <div className="bg-limestone-200 w-24 h-24 flex items-center justify-center flex-shrink-0">
                  <Image
                    src={BOTTLE_BY_ID[p.id]}
                    alt={`Rio Largo ${p.subtitle}`}
                    width={200}
                    height={200}
                    className="w-auto h-full max-h-[80px] object-contain"
                  />
                </div>
                <div className="flex-1">
                  <p className="eyebrow mb-1">{p.subtitle}</p>
                  <p className="font-display text-xl text-mountain-900">{p.priceDisplay}</p>
                </div>
                <ArrowLeft size={18} strokeWidth={1.5} className="rotate-180 text-mountain-900/40 group-hover:text-fynbos-600 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

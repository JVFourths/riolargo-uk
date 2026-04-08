import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChevronRight, Sprout, Microscope, Wind, Award, Droplet, ShieldCheck } from 'lucide-react'
import { products } from '../lib/products'

const AWARDS = [
  { country: 'New York',  label: 'Gold Medal',           score: 'NYIOOC' },
  { country: 'Japan',     label: 'Gold Medal',           score: 'OO Japan' },
  { country: 'Amsterdam', label: 'Gold Medal',           score: 'AOOC' },
  { country: 'Italy',     label: '98 / 100',             score: 'Flos Olei 2023' },
  { country: 'Dubai',     label: 'Best Medium Blend',    score: 'DOOC 2022' },
  { country: 'Aurora',    label: 'Trophy · Best Oil',    score: 'Aurora ITC' },
  { country: 'South Africa', label: 'ABSA Top 10',        score: 'National' },
  { country: 'SA Olive',  label: 'Lifetime Achiever',    score: 'Nick Wilkinson' },
]

const ESTATE_FACTS = [
  {
    icon: Sprout,
    title: 'Hand-picked',
    body: 'Every olive harvested by hand, crate by crate, never machine-stripped. The fruit reaches the press unbruised.',
  },
  {
    icon: Microscope,
    title: 'Cold-pressed within hours',
    body: 'From grove to mill in less than three hours. Cold extraction below 27&deg;C preserves polyphenols and aroma.',
  },
  {
    icon: Wind,
    title: 'Nitrogen-sealed',
    body: 'Stored in stainless steel tanks under nitrogen, oxygen-free, until bottling. Freshness preserved for months.',
  },
]

const TASTING_NOTES = [
  { cultivar: 'Frantoio',  note: 'Green apple, cut grass, almond skin' },
  { cultivar: 'Leccino',   note: 'Soft pepper, ripe stone fruit, balance' },
  { cultivar: 'Coratina',  note: 'Bitter herbs, artichoke, peppery finish' },
]

export default function Home() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative isolate min-h-[88vh] flex items-end overflow-hidden">
        <Image
          src="/images/hero-twilight-1920w.webp"
          alt="Olive grove in South Africa's Breede River Valley at twilight, silhouetted against a dusk sky over the Cape mountains"
          fill
          priority
          sizes="100vw"
          className="object-cover -z-10"
        />
        {/* Strong overlay — guarantees white text legibility */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              'linear-gradient(180deg, rgba(12,15,10,0.45) 0%, rgba(12,15,10,0.30) 30%, rgba(12,15,10,0.80) 75%, rgba(12,15,10,0.95) 100%)',
          }}
          aria-hidden="true"
        />

        <div className="container-x relative pb-20 md:pb-28 pt-32 w-full text-limestone-50">
          <p className="eyebrow !text-limestone-50 mb-6">
            From the Breede River Valley &middot; est. 2010
          </p>
          <h1 className="font-display font-bold leading-[0.98] tracking-tight max-w-3xl mb-8 text-limestone-50 text-[clamp(40px,7vw,84px)] text-balance">
            Pressed this year.{' '}
            <em className="italic font-normal text-limestone-50">Not last.</em>
          </h1>
          <p className="text-lg md:text-xl text-limestone-50 max-w-xl leading-relaxed mb-10">
            Northern olive oils on UK shelves are six to twelve months old by midwinter.
            Rio Largo&rsquo;s southern hemisphere harvest means fresh-pressed oil arrives
            exactly when theirs is stale.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/shop" className="btn-primary">
              Shop the Oil
              <ArrowRight size={18} strokeWidth={1.5} className="ml-2" />
            </Link>
            <Link
              href="#advantage"
              className="btn-secondary !border-limestone-50/50 !text-limestone-50 hover:!bg-limestone-50 hover:!text-mountain-900"
            >
              Why Fresher
            </Link>
          </div>
        </div>
      </section>

      {/* ============ SOUTHERN ADVANTAGE ============ */}
      <section id="advantage" className="bg-limestone-50 py-24 md:py-32">
        <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-6">
            <Image
              src="/images/southern-advantage-1600w.webp"
              alt="A stream of fresh golden-green olive oil pouring into a ceramic dish, with a cold winter window in the background"
              width={1600}
              height={900}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="w-full h-auto"
            />
          </div>
          <div className="lg:col-span-6">
            <p className="eyebrow mb-5">The Southern Advantage</p>
            <h2 className="font-display text-h1 text-mountain-900 text-balance mb-8 leading-tight">
              The only fresh olive oil in your kitchen this winter.
            </h2>
            <div className="space-y-5 text-mountain-900/85 max-w-prose">
              <p>
                Italian, Spanish and Greek olives are picked between October and December.
                By the time they reach UK shelves, they&rsquo;re six to twelve months old.
                By midwinter, they&rsquo;re older still.
              </p>
              <p>
                Rio Largo&rsquo;s harvest runs March to July &mdash; the southern hemisphere season.
                Fresh oil arrives in the UK exactly when northern stocks are stale.
                It&rsquo;s not marketing. It&rsquo;s geography.
              </p>
            </div>

            {/* Seasonal calendar */}
            <div className="mt-10 border-t border-mountain-900/15 pt-8">
              <p className="eyebrow mb-4">Harvest calendar</p>
              <div className="grid grid-cols-12 gap-1 text-[10px] uppercase tracking-wider">
                {['J','F','M','A','M','J','J','A','S','O','N','D'].map((m, i) => {
                  const isSouth = i >= 2 && i <= 6  // Mar-Jul
                  const isNorth = i >= 9 && i <= 11 // Oct-Dec
                  return (
                    <div key={`${m}-${i}`} className="flex flex-col items-center gap-2">
                      <div className={`w-full h-8 ${isSouth ? 'bg-fynbos-500' : isNorth ? 'bg-sage-700/40' : 'bg-mountain-900/5'}`}></div>
                      <span className="text-mountain-900/60">{m}</span>
                    </div>
                  )
                })}
              </div>
              <div className="flex gap-6 mt-4 text-xs text-mountain-900/70">
                <span className="flex items-center gap-2"><span className="w-3 h-3 bg-fynbos-500 inline-block"></span>Rio Largo (Southern)</span>
                <span className="flex items-center gap-2"><span className="w-3 h-3 bg-sage-700/40 inline-block"></span>Northern hemisphere</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MEDAL SWEEP ============ */}
      <section id="awards" className="bg-mountain-900 text-limestone-50 py-20 md:py-24">
        <div className="container-x">
          <div className="max-w-3xl mb-12">
            <p className="eyebrow !text-fynbos-400 mb-4">Recognised in eight countries</p>
            <h2 className="font-display text-h2 text-limestone-50 leading-tight text-balance">
              Judged blind by the world&rsquo;s most respected olive oil panels.
              Awarded since the very first harvest.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-limestone-50/10">
            {AWARDS.map((award) => (
              <div key={award.country} className="bg-mountain-900 p-6 md:p-8">
                <p className="text-eyebrow uppercase tracking-eyebrow text-fynbos-400 mb-3">
                  {award.country}
                </p>
                <p className="font-display text-xl md:text-2xl text-limestone-50 leading-tight mb-2">
                  {award.label}
                </p>
                <p className="text-xs text-limestone-50/55 tabular-nums">{award.score}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ MASTER MILLER ============ */}
      <section id="story" className="bg-limestone-50 py-24 md:py-32">
        <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <Image
              src="/images/master-miller-960w.webp"
              alt="The master miller holding a glass of fresh-pressed olive oil to natural light in a working olive mill"
              width={960}
              height={1280}
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="w-full h-auto"
            />
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2">
            <p className="eyebrow mb-5">The Master Miller</p>
            <h2 className="font-display text-h1 text-mountain-900 text-balance leading-tight mb-8">
              From a doctor&rsquo;s advice to a Lifetime Achievement.
            </h2>
            <div className="space-y-5 text-mountain-900/85 max-w-prose">
              <p>
                In 2010, Nick Wilkinson&rsquo;s doctor recommended adding more olive oil to his diet.
                Fascinated by what he discovered, Nick and his wife Brenda bought Rio Largo Olive
                Estate in South Africa&rsquo;s Breede River Valley.
              </p>
              <p>
                Nick trained as a Master Miller at <strong>UC Davis</strong> in California &mdash; the
                world&rsquo;s leading olive oil research institution. In their first year, he crafted
                a blend that won South Africa&rsquo;s first&ndash;ever Double Gold. They have not
                stopped winning since.
              </p>
              <p>
                In 2024, the South African olive industry awarded Nick its highest honour:
                Lifetime Achiever for Master Milling.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 text-sm">
              <div>
                <p className="eyebrow mb-1">Trained at</p>
                <p className="text-mountain-900 font-medium">UC Davis, California</p>
              </div>
              <div>
                <p className="eyebrow mb-1">Estate established</p>
                <p className="text-mountain-900 font-medium">2010</p>
              </div>
              <div>
                <p className="eyebrow mb-1">Cultivars</p>
                <p className="text-mountain-900 font-medium">Frantoio · Leccino · Coratina</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ THE OIL — products ============ */}
      <section id="shop" className="bg-limestone-100 py-24 md:py-32">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-6">
              <p className="eyebrow mb-5">The Oil</p>
              <h2 className="font-display text-h1 text-mountain-900 text-balance leading-tight">
                Three sizes. One exceptional oil.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 self-end">
              <p className="text-mountain-900/75 max-w-prose">
                A blend of hand-picked Frantoio, Leccino and Coratina &mdash; Italian cultivars,
                South African terroir. Rich, complex, vibrant. Notes of green apple,
                fresh-cut grass, and a clean peppery finish.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-mountain-900/10">
            {products.map((p, i) => {
              const bottles = ['/images/bottle-500ml-800w.webp', '/images/bottle-1l-800w.webp', '/images/bottle-2l-800w.webp']
              return (
                <Link key={p.id} href={`/product/${p.slug}`} className="group bg-limestone-50 p-8 md:p-10 flex flex-col items-center text-center cursor-pointer transition-colors duration-200 hover:bg-limestone-100">
                  <div className="bg-limestone-200 w-full aspect-square flex items-center justify-center mb-8">
                    <Image
                      src={bottles[i]}
                      alt={`Rio Largo ${p.subtitle}`}
                      width={800}
                      height={800}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="w-auto h-full max-h-[280px] object-contain"
                    />
                  </div>
                  <p className="eyebrow mb-3">{p.subtitle}</p>
                  <h3 className="font-display text-2xl text-mountain-900 mb-3 leading-tight">
                    Extra Virgin Olive Oil
                  </h3>
                  <p className="text-mountain-900 font-medium tabular-nums text-lg mb-6">{p.priceDisplay}</p>
                  <span className="btn-ghost text-sm">
                    View bottle <ChevronRight size={16} strokeWidth={1.5} />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============ THE DECANTER ============ */}
      <section id="decanter" className="bg-mountain-900 text-limestone-50 py-24 md:py-32 overflow-hidden">
        <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <p className="eyebrow !text-fynbos-400 mb-5">The Decanter</p>
            <h2 className="font-display text-h1 text-limestone-50 leading-tight text-balance mb-8">
              Fresh till the last drop.
            </h2>
            <div className="space-y-5 text-limestone-50/85 max-w-prose">
              <p>
                Rio Largo was one of the first estates in South Africa to share extra virgin
                olive oil in <strong className="text-limestone-50">bag-in-box</strong>.
                It looks like a decanter; underneath, it&rsquo;s a sealed bag and a precision twist tap.
              </p>
              <p>
                The bag is engineered to defend against the three enemies of olive oil
                &mdash; <em>heat, light, and oxygen</em>. The twist tap dispenses without
                ever letting air back in. Open it on day one or month three;
                what comes out is the same fresh oil.
              </p>
              <p className="text-limestone-50/70 text-sm">
                Voted <span className="text-fynbos-400 font-medium">Best Packaging</span> at
                the Dubai Olive Oil Competition 2022.
              </p>
            </div>

            {/* Three benefit chips */}
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              {[
                { icon: ShieldCheck, label: 'No oxidation' },
                { icon: Droplet,     label: 'Precise pour' },
                { icon: Award,       label: 'Award-winning' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="border border-limestone-50/15 p-4 text-center">
                  <Icon size={20} strokeWidth={1.5} className="text-fynbos-400 mx-auto mb-2" />
                  <p className="text-xs text-limestone-50/80">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="bg-limestone-100/5 border border-limestone-50/10 aspect-square flex items-center justify-center p-12">
              <Image
                src="/images/bottle-2l-800w.webp"
                alt="The Rio Largo 2 litre bag-in-box decanter with twist tap"
                width={800}
                height={800}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-auto h-full max-h-[420px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ FROM THE ESTATE ============ */}
      <section className="bg-limestone-50 py-24 md:py-32">
        <div className="container-x">
          <div className="max-w-3xl mb-16">
            <p className="eyebrow mb-5">From the Estate</p>
            <h2 className="font-display text-h1 text-mountain-900 leading-tight text-balance">
              The shortcuts most premium oils take.
              The shortcuts we don&rsquo;t.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {ESTATE_FACTS.map((fact) => {
              const Icon = fact.icon
              return (
                <div key={fact.title}>
                  <Icon size={28} strokeWidth={1.5} className="text-fynbos-600 mb-6" />
                  <h3 className="font-display text-2xl text-mountain-900 mb-4">{fact.title}</h3>
                  <p className="text-mountain-900/75 leading-relaxed" dangerouslySetInnerHTML={{ __html: fact.body }} />
                </div>
              )
            })}
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-1">
            <Image
              src="/images/nitrogen-tanks-1280w.webp"
              alt="Polished stainless steel olive oil storage tanks in a modern cellar"
              width={1280}
              height={720}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-full object-cover"
            />
            <Image
              src="/images/hand-picking-960w.webp"
              alt="A worker's gloved hand plucking a fresh olive from a branch"
              width={960}
              height={1280}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ============ TASTING NOTES ============ */}
      <section className="bg-mountain-900 text-limestone-50 py-24 md:py-32">
        <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="eyebrow !text-fynbos-400 mb-5">Tasting Notes</p>
            <h2 className="font-display text-h1 text-limestone-50 leading-tight text-balance mb-6">
              Italian heritage. Southern terroir.
            </h2>
            <p className="text-limestone-50/75 leading-relaxed max-w-prose">
              Three Italian cultivars, one Breede River Valley. Each contributes its own
              character; together they balance into an oil that is bright, structured and
              long.
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-7">
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

      {/* ============ FINAL CTA ============ */}
      <section className="bg-limestone-100 py-24 md:py-32">
        <div className="container-x text-center">
          <p className="eyebrow mb-5">Now in the UK</p>
          <h2 className="font-display text-h1 text-mountain-900 text-balance leading-tight max-w-3xl mx-auto mb-10">
            Taste the only fresh olive oil in your kitchen this winter.
          </h2>
          <Link href="/shop" className="btn-primary">
            Shop the Oil
            <ArrowRight size={18} strokeWidth={1.5} className="ml-2" />
          </Link>
          <p className="mt-8 text-sm text-mountain-900/60">
            Free UK delivery on orders over &pound;40 &middot; Dispatched within 1&ndash;2 working days
          </p>
        </div>
      </section>
    </>
  )
}

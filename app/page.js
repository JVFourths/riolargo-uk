import Link from 'next/link'
import { products } from '../lib/products'
import ProductCard from '../components/ProductCard'

const awards = [
  { competition: 'New York International Olive Oil Competition', result: 'Gold Medal' },
  { competition: 'Olive Oil Japan', result: 'Gold Medal' },
  { competition: 'Amsterdam Olive Oil Competition', result: 'Gold Medal' },
  { competition: 'Aurora International Taste Challenge', result: 'Trophy — Best Olive Oil' },
  { competition: 'Flos Olei Italy 2023', result: '98 / 100' },
  { competition: 'Dubai Olive Oil Competition 2022', result: 'Best Medium Blend + Best Packaging' },
  { competition: 'SA Olive Awards', result: 'Multiple Gold — Every year since 2010' },
  { competition: 'ABSA Top 10 Olive Oils', result: 'National Top 10' },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-olive-900 via-olive-800 to-olive-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-gold blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-olive-400 blur-3xl"></div>
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-36 text-center">
          <div className="inline-flex items-center gap-2 bg-olive-700 bg-opacity-60 border border-olive-500 rounded-full px-4 py-2 text-sm text-olive-200 mb-6">
            <span className="text-gold">★</span> Gold Medal Winner — New York, Japan, Amsterdam &amp; more
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            The World's Finest<br/>
            <span className="text-gold">South African</span> Olive Oil<br/>
            Now in the UK
          </h1>
          <p className="text-lg md:text-xl text-olive-200 max-w-2xl mx-auto mb-10 leading-relaxed">
            Hand-picked from South Africa's Breede River Valley. Cold-pressed within hours. 
            Internationally recognised. Rarely seen in Britain — until now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="bg-gold text-olive-900 font-bold px-8 py-4 rounded-lg text-lg hover:bg-yellow-400 transition-colors">
              Shop Now
            </Link>
            <Link href="#story" className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-white hover:text-olive-900 transition-colors">
              Our Story
            </Link>
          </div>
          <p className="mt-6 text-olive-300 text-sm">Free UK delivery on orders over £40 · Dispatched within 1-2 working days</p>
        </div>
      </section>

      {/* Awards strip */}
      <section id="awards" className="bg-cream border-y border-olive-100">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <p className="text-center text-sm font-semibold text-olive-500 uppercase tracking-widest mb-8">Recognised by the world's most respected competitions</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { place: 'New York', award: 'Gold Medal' },
              { place: 'Japan', award: 'Gold Medal' },
              { place: 'Amsterdam', award: 'Gold Medal' },
              { place: 'Flos Olei Italy', award: '98/100' },
            ].map(a => (
              <div key={a.place} className="text-center bg-white rounded-xl p-5 shadow-sm border border-olive-100">
                <div className="text-3xl mb-2">🏅</div>
                <div className="font-bold text-olive-800 text-sm">{a.award}</div>
                <div className="text-olive-500 text-xs mt-1">{a.place}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-olive-900 mb-4">Shop Rio Largo</h2>
          <p className="text-olive-600 text-lg max-w-xl mx-auto">Three sizes, one exceptional oil. Choose what suits your kitchen — or grab all three.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Story */}
      <section id="story" className="bg-olive-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">The Story</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">From a Doctor's Advice to International Gold Medals</h2>
            <p className="text-olive-200 mb-4 leading-relaxed">
              In 2010, Nick Wilkinson's doctor recommended adding more olive oil to his diet. Fascinated by its health properties, Nick and his wife Brenda purchased Rio Largo Olive Estate in South Africa's stunning Breede River Valley.
            </p>
            <p className="text-olive-200 mb-4 leading-relaxed">
              Nick trained as a Master Miller at UC Davis, California. In their very first year, he crafted a blend that won South Africa's first-ever Double Gold award. They haven't stopped winning since.
            </p>
            <p className="text-olive-200 mb-6 leading-relaxed">
              Every olive is hand-picked by their dedicated team, cold-pressed within hours of harvest, and stored under nitrogen to lock in freshness. No shortcuts. No compromises.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="award-badge bg-olive-700 border-olive-600 text-olive-200">Hand-picked</span>
              <span className="award-badge bg-olive-700 border-olive-600 text-olive-200">Cold-pressed</span>
              <span className="award-badge bg-olive-700 border-olive-600 text-olive-200">Nitrogen-sealed</span>
              <span className="award-badge bg-olive-700 border-olive-600 text-olive-200">Biodynamic farming</span>
            </div>
          </div>
          <div className="bg-olive-800 rounded-2xl p-8">
            <h3 className="text-gold font-bold mb-6">Full Award Record</h3>
            <div className="space-y-4">
              {awards.map(a => (
                <div key={a.competition} className="border-b border-olive-700 pb-4 last:border-0 last:pb-0">
                  <div className="text-sm text-olive-300">{a.competition}</div>
                  <div className="font-semibold text-white">{a.result}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why South Africa */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-olive-900 mb-4">Why South African Olive Oil?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '🌍', title: 'Unique Origin', body: 'South African EVOO is virtually unknown in the UK — this is a genuine first. A completely different terroir producing world-class oil.' },
            { icon: '🌿', title: 'Southern Hemisphere Freshness', body: 'Harvest runs March–July in the southern hemisphere, meaning fresher oil reaches UK shelves when European stocks are months old.' },
            { icon: '🏆', title: 'Proven Quality', body: 'Award-winning since day one. Rio Largo competes — and wins — against the world\'s best oils in New York, Japan, Italy and beyond.' },
          ].map(f => (
            <div key={f.title} className="bg-white rounded-xl p-6 shadow-sm border border-olive-100 text-center">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-olive-900 text-lg mb-3">{f.title}</h3>
              <p className="text-olive-600 text-sm leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-olive-700 to-olive-800 text-white text-center py-16 mx-4 md:mx-8 rounded-2xl mb-16">
        <h2 className="text-3xl font-bold mb-4">Taste the difference</h2>
        <p className="text-olive-200 mb-8 text-lg">Free UK delivery on orders over £40. Dispatched within 1-2 working days.</p>
        <Link href="/shop" className="bg-gold text-olive-900 font-bold px-10 py-4 rounded-lg text-lg hover:bg-yellow-400 transition-colors inline-block">
          Shop Now
        </Link>
      </section>
    </>
  )
}

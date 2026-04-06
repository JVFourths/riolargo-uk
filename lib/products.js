export const products = [
  {
    id: 'rl-500ml',
    slug: 'rio-largo-evoo-500ml',
    name: 'Rio Largo Extra Virgin Olive Oil',
    subtitle: '500ml Premium',
    price: 1400, // pence
    priceDisplay: '£14.00',
    image: '/images/500ml.jpg',
    imagePlaceholder: '#7d9239',
    stock: 50,
    description: `A gold-medal winning extra virgin olive oil from the Breede River Valley, South Africa. Hand-picked Frantoio, Leccino and Coratina olives, cold-pressed within hours of harvest and stored in nitrogen-sealed tanks to lock in freshness. Rich, complex and vibrant — with notes of fresh-cut grass, green apple and a clean peppery finish.`,
    highlights: [
      'Cold-pressed within hours of picking',
      'Hand-harvested Frantoio, Leccino & Coratina blend',
      'Nitrogen-sealed easy-twist decanter',
      '100% natural, no additives, halal-friendly',
      'Sustainably farmed, Breede River Valley',
    ],
    awards: [
      'Gold — New York International Olive Oil Competition',
      'Gold — Olive Oil Japan',
      'Gold — Amsterdam Olive Oil Competition',
      'Trophy — Aurora International Taste Challenge',
      '98/100 — Flos Olei Italy 2023',
      'Best Medium Blend — Dubai Olive Oil Competition 2022',
    ],
    weight: 600, // grams for shipping
  },
  {
    id: 'rl-1l',
    slug: 'rio-largo-evoo-1litre',
    name: 'Rio Largo Extra Virgin Olive Oil',
    subtitle: '1 Litre Premium',
    price: 2100,
    priceDisplay: '£21.00',
    image: '/images/1litre.jpg',
    imagePlaceholder: '#4c5a23',
    stock: 40,
    description: `Our most popular size. The same multiple award-winning extra virgin olive oil in a generous 1 litre easy-twist decanter — designed to keep the oil fresher for longer. Ideal for daily cooking, dressing and dipping. A kitchen essential for those who refuse to compromise on quality.`,
    highlights: [
      'Cold-pressed within hours of picking',
      'Hand-harvested Frantoio, Leccino & Coratina blend',
      'Easy-twist decanter preserves freshness',
      '100% natural, no additives, halal-friendly',
      'Sustainably farmed, Breede River Valley',
    ],
    awards: [
      'Gold — New York International Olive Oil Competition',
      'Gold — Olive Oil Japan',
      'Gold — Amsterdam Olive Oil Competition',
      'Trophy — Aurora International Taste Challenge',
      '98/100 — Flos Olei Italy 2023',
      'Best Medium Blend — Dubai Olive Oil Competition 2022',
    ],
    weight: 1100,
  },
  {
    id: 'rl-2l',
    slug: 'rio-largo-evoo-2litre',
    name: 'Rio Largo Extra Virgin Olive Oil',
    subtitle: '2 Litre Decanter',
    price: 3200,
    priceDisplay: '£32.00',
    image: '/images/2litre.jpg',
    imagePlaceholder: '#3d481e',
    stock: 25,
    description: `The 2 litre easy-twist decanter — Rio Largo's signature format. Perfect for households that cook with quality oil every day, or as a standout gift for food lovers. The innovative easy-twist tap prolongs freshness and delivers precise pours every time. Distinctive, practical and award-winning.`,
    highlights: [
      'Signature easy-twist tap format',
      'Cold-pressed within hours of picking',
      'Hand-harvested Frantoio, Leccino & Coratina blend',
      'Ideal for gifting — distinctive and premium',
      '100% natural, no additives, halal-friendly',
    ],
    awards: [
      'Gold — New York International Olive Oil Competition',
      'Best Packaging — Dubai Olive Oil Competition 2022',
      'Gold — Amsterdam Olive Oil Competition',
      'Trophy — Aurora International Taste Challenge',
      '98/100 — Flos Olei Italy 2023',
      'ABSA Top 10 Olive Oils — South Africa',
    ],
    weight: 2200,
  },
]

export function getProduct(slug) {
  return products.find(p => p.slug === slug) || null
}

export function getProductById(id) {
  return products.find(p => p.id === id) || null
}

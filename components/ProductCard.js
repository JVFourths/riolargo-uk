import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'

const BOTTLE_BY_ID = {
  'rl-500ml': '/images/bottle-500ml-800w.webp',
  'rl-1l':    '/images/bottle-1l-800w.webp',
  'rl-2l':    '/images/bottle-2l-800w.webp',
}

export default function ProductCard({ product }) {
  const bottle = BOTTLE_BY_ID[product.id]
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group bg-limestone-50 p-8 md:p-10 flex flex-col items-center text-center cursor-pointer transition-colors duration-200 hover:bg-limestone-100"
    >
      <div className="bg-limestone-200 w-full aspect-square flex items-center justify-center mb-8">
        {bottle ? (
          <Image
            src={bottle}
            alt={`Rio Largo ${product.subtitle}`}
            width={800}
            height={800}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="w-auto h-full max-h-[280px] object-contain"
          />
        ) : null}
      </div>
      <p className="eyebrow mb-3">{product.subtitle}</p>
      <h3 className="font-display text-2xl text-mountain-900 leading-tight mb-3">
        Extra Virgin Olive Oil
      </h3>
      <p className="text-mountain-900 font-medium tabular-nums text-lg mb-6">
        {product.priceDisplay}
      </p>
      <span className="btn-ghost text-sm">
        View bottle <ChevronRight size={16} strokeWidth={1.5} />
      </span>
    </Link>
  )
}

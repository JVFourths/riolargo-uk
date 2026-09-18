import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/products";

export const NUMERALS = ["I", "II", "III", "IV", "V", "VI"];

interface CatalogueEntryProps {
  product: Product;
  index: number;
}

/** One product as a numbered catalogue row between hairlines: arched photo, notes, price. */
export function CatalogueEntry({ product, index }: CatalogueEntryProps) {
  return (
    <article
      id={product.slug}
      className="grid grid-cols-1 gap-8 border-t border-rule py-12 sm:grid-cols-[13rem_1fr] sm:gap-10 lg:grid-cols-[17rem_1fr] lg:gap-16"
    >
      <div className="mx-auto w-full max-w-64 rounded-arch border border-rule bg-paper-raised p-2 shadow-plate sm:mx-0">
        <div className="relative aspect-[4/5] overflow-hidden rounded-arch border border-rule-strong">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            priority={index === 0}
            sizes="(max-width: 640px) 256px, 272px"
            className={product.imageFit === "contain" ? "object-contain p-5 pt-10" : "object-cover"}
          />
        </div>
      </div>

      <div>
        <p className="label text-ink-muted">
          No. {NUMERALS[index]} &middot; {product.size}
        </p>
        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h2 className="font-display text-4xl font-medium leading-tight">
            {product.shortName}
          </h2>
          <p className="font-display text-4xl font-semibold text-fox">
            &pound;{product.price}
          </p>
        </div>

        <p className="label mt-3 text-leaf">{product.flavourNotes}</p>

        <p className="mt-5 max-w-measure text-ink-muted">{product.description}</p>

        <p className="mt-3 max-w-measure font-display text-xl italic">
          Good with {product.pairing.charAt(0).toLowerCase() + product.pairing.slice(1)}.
        </p>

        <a
          href={product.orderUrl}
          target="_blank"
          rel="noopener"
          className="btn btn-primary mt-7 gap-2"
        >
          Order on Sidwell&apos;s
          <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden />
          <span className="sr-only">(opens sidwells.net in a new tab)</span>
        </a>
      </div>
    </article>
  );
}

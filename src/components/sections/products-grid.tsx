import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion-config";
import { NUMERALS } from "@/components/ui/catalogue-entry";
import { cn } from "@/lib/utils";
import { products } from "@/lib/products";

export function ProductsGrid() {
  return (
    <section className="bg-paper-sunk py-24 md:py-32">
      <div className="container-page">
        <Reveal className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <h2 className="h2 lg:col-span-6">
            Three labels <span className="italic">and a litre</span>
          </h2>
          <p className="lede lg:col-span-5 lg:col-start-8">
            The same estate oil in four decanters. Three 500ml label designs,
            each with its own character, and a one litre for the kitchens that
            get through it.
          </p>
        </Reveal>

        <Reveal className="mt-16" delay={0.1}>
          <ul className="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4 lg:gap-x-8">
            {products.map((product, i) => (
              <li key={product.slug} className={cn(i % 2 === 1 && "lg:mt-16")}>
                <Link href={`/shop#${product.slug}`} className="group block">
                  <div className="rounded-arch border border-rule bg-paper-raised p-2 shadow-plate">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-arch border border-rule-strong">
                      <Image
                        src={product.image}
                        alt={product.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 45vw, 22vw"
                        className={cn(
                          product.imageFit === "contain" ? "object-contain p-5 pt-10" : "object-cover",
                          "transition-transform duration-500 ease-settle group-hover:scale-[1.03]"
                        )}
                      />
                    </div>
                  </div>
                  <p className="label mt-5 text-ink-muted">
                    No. {NUMERALS[i]} &middot; {product.size}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-semibold leading-tight transition-colors duration-(--duration-state) group-hover:text-fox sm:text-3xl">
                    {product.shortName}
                  </h3>
                  <p className="mt-1 font-display text-xl italic text-ink-muted">
                    {product.flavourNotes.split(" · ").join(", ").toLowerCase()}
                  </p>
                  <p className="mt-2 font-display text-2xl font-semibold text-fox">
                    &pound;{product.price}
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/shop"
            className="link group mt-14 inline-flex items-center gap-2 font-semibold"
          >
            Read the tasting notes and order
            <ArrowRight
              size={18}
              strokeWidth={1.5}
              className="transition-transform duration-(--duration-state) group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

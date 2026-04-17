"use client";

import { m } from "motion/react";
import Link from "next/link";
import {
  fadeUp,
  staggerContainer,
  viewportConfig,
  smoothTransition,
} from "@/components/motion-config";
import { ProductCard3D } from "@/components/ui/product-card-3d";
import { products } from "@/lib/products";

export function ProductsGrid() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeUp}
          transition={smoothTransition}
          className="text-center mb-20"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">
            The Collection
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold">
            Three Labels, One Standard
          </h2>
          <p className="mt-6 text-text-muted max-w-xl mx-auto text-lg">
            Each 500ml bottle is cold-extracted from hand-harvested olives within
            hours of picking. Choose the character that matches your kitchen.
          </p>
        </m.div>

        {/* Product cards */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {products.map((product) => (
            <m.div
              key={product.slug}
              variants={fadeUp}
              transition={smoothTransition}
            >
              <Link href="/shop" className="group block cursor-pointer">
                <div className="relative border border-border/50 overflow-visible transition-all duration-500 group-hover:border-accent/30 group-hover:shadow-[0_0_60px_rgba(201,168,76,0.06)]">
                  {/* 3D bottle */}
                  <ProductCard3D image={product.image} alt={product.name} />

                  {/* Size badge */}
                  <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-accent/10 border border-accent/20 text-accent text-xs font-semibold tracking-wider uppercase backdrop-blur-sm">
                    {product.size}
                  </div>

                  {/* Content */}
                  <div className="p-6 bg-bg-surface/80 backdrop-blur-sm border-t border-border/50">
                    <h3 className="font-display text-xl font-bold group-hover:text-accent transition-colors duration-200">
                      {product.shortName}
                    </h3>
                    <p className="mt-1 text-xs uppercase tracking-wider text-olive-light">
                      {product.flavourNotes}
                    </p>
                    <p className="mt-3 text-sm text-text-muted leading-relaxed">
                      {product.tagline}
                    </p>
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-2xl font-display font-bold text-accent">
                        &pound;{product.price}
                      </span>
                      <span className="text-xs uppercase tracking-widest text-text-muted group-hover:text-accent transition-colors duration-200">
                        View &amp; Order &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}

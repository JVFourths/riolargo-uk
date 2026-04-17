"use client";

import { m } from "motion/react";
import Image from "next/image";
import {
  fadeUp,
  staggerContainer,
  viewportConfig,
  smoothTransition,
} from "@/components/motion-config";
import { ProductCard3D } from "@/components/ui/product-card-3d";
import { WaitlistForm } from "@/components/ui/waitlist-form";
import { products, waitlistProducts } from "@/lib/products";

export default function ShopContent() {
  return (
    <div className="pt-28 pb-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Page header */}
        <m.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={smoothTransition}
          className="mb-20"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">
            The Collection
          </span>
          <h1 className="mt-4 font-display text-5xl md:text-6xl font-bold">
            Shop Olive Oil
          </h1>
          <p className="mt-6 text-text-muted text-lg max-w-xl">
            Award-winning extra virgin olive oil, cold-pressed on our estate in
            the Breede River Valley and shipped fresh to the UK.
          </p>
          <p className="mt-4 text-sm text-text-muted max-w-xl">
            We&apos;re currently taking pre-orders direct by email &mdash; enter
            your address below and we&apos;ll confirm your order within 24 hours.
          </p>
        </m.div>

        {/* Products */}
        <m.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-3 gap-10"
        >
          {products.map((product) => (
            <m.article
              key={product.slug}
              variants={fadeUp}
              transition={smoothTransition}
              className="group"
            >
              <div className="border border-border/50 overflow-visible hover:border-accent/30 transition-all duration-500 hover:shadow-[0_0_60px_rgba(201,168,76,0.06)]">
                <div className="relative">
                  <ProductCard3D
                    image={product.image}
                    alt={product.name}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-accent/10 border border-accent/20 text-accent text-xs font-semibold tracking-wider uppercase backdrop-blur-sm">
                    {product.size}
                  </div>
                </div>

                <div className="p-8 bg-bg-surface/80 backdrop-blur-sm border-t border-border/50">
                  <h2 className="font-display text-2xl font-bold group-hover:text-accent transition-colors duration-200">
                    {product.shortName}
                  </h2>
                  <p className="mt-1 text-xs uppercase tracking-wider text-olive-light">
                    {product.flavourNotes}
                  </p>
                  <p className="mt-4 text-text-muted leading-relaxed">
                    {product.description}
                  </p>
                  <p className="mt-3 text-sm text-text-muted">
                    <span className="text-accent font-semibold">Pairs with:</span>{" "}
                    {product.pairing}
                  </p>
                  <div className="mt-8 flex items-center justify-between">
                    <span className="text-3xl font-display font-bold text-accent">
                      &pound;{product.price}
                    </span>
                    <span className="text-xs text-text-muted">Free UK delivery</span>
                  </div>
                  <WaitlistForm
                    productSlug={product.slug}
                    productName={product.name}
                    intent="preorder"
                  />
                </div>
              </div>
            </m.article>
          ))}
        </m.div>

        {/* Waitlist — larger sizes */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeUp}
          transition={smoothTransition}
          className="mt-32"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-text-muted font-semibold">
            Coming Soon
          </span>
          <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold">
            Larger Sizes
          </h2>
          <p className="mt-4 text-text-muted max-w-xl">
            We make these in South Africa but don&apos;t yet import them to the UK.
            Interested? Let us know and we&apos;ll bring them over.
          </p>
        </m.div>

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10"
        >
          {waitlistProducts.map((item) => (
            <m.article
              key={item.slug}
              variants={fadeUp}
              transition={smoothTransition}
            >
              <div className="border border-border/50 overflow-hidden relative">
                <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-bg/80 border border-border text-text-muted text-xs font-semibold tracking-wider uppercase backdrop-blur-sm">
                  Not Yet in the UK
                </div>
                <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-accent/10 border border-accent/20 text-accent text-xs font-semibold tracking-wider uppercase backdrop-blur-sm">
                  {item.size}
                </div>

                <div className="flex flex-col md:flex-row">
                  <div className="relative w-full md:w-64 aspect-square md:aspect-auto shrink-0 grayscale opacity-70">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-6"
                      sizes="(max-width: 768px) 100vw, 256px"
                    />
                  </div>

                  <div className="p-8 flex flex-col justify-center">
                    <h3 className="font-display text-2xl font-bold">{item.name}</h3>
                    <p className="mt-3 text-text-muted leading-relaxed">
                      {item.description}
                    </p>
                    <WaitlistForm
                      productSlug={item.slug}
                      productName={item.name}
                      intent="notify"
                    />
                  </div>
                </div>
              </div>
            </m.article>
          ))}
        </m.div>

        {/* Trust bar */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeUp}
          transition={smoothTransition}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          {[
            { label: "Free UK Delivery", detail: "On all orders, no minimum" },
            { label: "Freshness Guaranteed", detail: "Pressed & shipped within weeks" },
            { label: "30+ Awards", detail: "Internationally recognised quality" },
          ].map((item) => (
            <div key={item.label} className="py-6 border border-border">
              <div className="text-accent font-semibold text-sm uppercase tracking-wider">
                {item.label}
              </div>
              <div className="mt-1 text-xs text-text-muted">{item.detail}</div>
            </div>
          ))}
        </m.div>
      </div>
    </div>
  );
}

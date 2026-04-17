import { Hero } from "@/components/sections/hero";
import { ProductsGrid } from "@/components/sections/products-grid";
import { AboutSection } from "@/components/sections/about-section";
import { Awards } from "@/components/sections/awards";
import { CtaSection } from "@/components/sections/cta-section";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductsGrid />
      <AboutSection />
      <Awards />
      <CtaSection />
    </>
  );
}

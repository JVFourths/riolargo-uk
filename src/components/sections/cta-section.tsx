import Link from "next/link";
import { Reveal } from "@/components/motion-config";

export function CtaSection() {
  return (
    <section className="border-b border-grove-raised bg-grove py-24 text-on-grove md:py-32">
      <Reveal className="container-page text-center">
        <h2 className="h2 mx-auto max-w-3xl">
          A decanter on the counter, <span className="italic">a tap at the base</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lede text-on-grove-muted">
          Pick a label, order it through Sidwell&apos;s, and it comes to your
          door. Questions first? We are happy to help.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/shop" className="btn btn-primary">
            Choose your oil
          </Link>
          <Link href="/contact" className="btn btn-on-grove">
            Ask us a question
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

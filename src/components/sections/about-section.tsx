import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion-config";
import { Plate } from "@/components/ui/plate";

export function AboutSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-6 lg:col-start-1">
          <h2 className="h2">
            From the Breede River <span className="italic">to your table</span>
          </h2>
          <p className="lede mt-8">
            Rio Largo is a family-owned estate in the Scherpenheuwel Valley, near
            Worcester in South Africa&apos;s Western Cape. The groves run along
            the Breede River.
          </p>
          <p className="mt-5 max-w-measure text-ink-muted">
            The olives are picked by hand when they are ripe, cold extracted on
            the estate and packed there too. Keeping every step on the farm is
            how the oil stays fresh, with a peppery finish and grassy notes you
            can taste.
          </p>
          <Link
            href="/about"
            className="link group mt-8 inline-flex items-center gap-2 font-semibold"
          >
            Read the estate&apos;s story
            <ArrowRight
              size={18}
              strokeWidth={1.5}
              className="transition-transform duration-(--duration-state) group-hover:translate-x-1"
            />
          </Link>
        </Reveal>

        <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
          <Plate
            src="/images/brenda-and-nick-768w.webp"
            alt="Brenda and Nick of Rio Largo holding a trophy at the SA Olive awards"
            number="II"
            caption="Brenda and Nick at the SA Olive awards."
            sizes="(max-width: 1024px) 100vw, 40vw"
            aspect="aspect-square"
            className="mx-auto max-w-md"
          />
        </Reveal>
      </div>

      {/* Full-bleed band of fruit on the branch */}
      <Reveal className="mt-24 md:mt-32">
        <div className="relative aspect-[5/2] min-h-64 w-full overflow-hidden border-y border-rule">
          <Image
            src="/images/olives-on-branch-1920w.webp"
            alt="Green and purple olives ripening on the branch at Rio Largo"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </Reveal>
    </section>
  );
}

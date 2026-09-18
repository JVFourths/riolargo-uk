import { Reveal } from "@/components/motion-config";
import { Plate } from "@/components/ui/plate";
import { Ledger } from "@/components/ui/ledger";

const reasons = [
  {
    title: "Grown on the estate",
    description:
      "Every olive comes from Rio Largo's own groves along the Breede River, so each decanter traces back to one farm.",
  },
  {
    title: "Picked by hand",
    description:
      "The fruit is hand harvested at peak ripeness, so only sound olives reach the mill.",
  },
  {
    title: "Cold extracted on site",
    description:
      "The mill is on the farm. The oil is extracted without heat, then packed on the estate.",
  },
  {
    title: "Recognised at home and abroad",
    description:
      "Rio Largo has won numerous South African and international awards for its extra virgin olive oil.",
  },
];

export function Awards() {
  return (
    <section className="bg-paper-sunk py-24 md:py-32">
      <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <h2 className="h2">
            Why it tastes <span className="italic">the way it does</span>
          </h2>
        </Reveal>

        <Reveal className="lg:col-span-8" delay={0.1}>
          <Ledger items={reasons} />

          <Plate
            src="/images/oil-poured-pan-1280w.webp"
            alt="Olive oil being poured from a floral Rio Largo decanter into a pan"
            number="III"
            caption="Straight from the tap into the pan."
            sizes="(max-width: 1024px) 100vw, 60vw"
            aspect="aspect-[16/6]"
            arched={false}
            className="mt-14"
          />
        </Reveal>
      </div>
    </section>
  );
}

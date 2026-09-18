import { Reveal } from "@/components/motion-config";
import { cn } from "@/lib/utils";

const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

// Month indexes, January = 0.
const harvests = [
  {
    label: "Rio Largo, South Africa",
    detail: "March to July",
    months: [2, 3, 4, 5, 6],
    cell: "bg-fox",
  },
  {
    label: "Italy, Spain, Greece",
    detail: "October to December",
    months: [9, 10, 11],
    cell: "bg-ink-muted",
  },
];

export function HarvestSection() {
  return (
    <section className="border-t border-rule py-24 md:py-32">
      <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-5">
          <p className="label text-leaf">The southern advantage</p>
          <h2 className="h2 mt-5">
            Pressed this year, <span className="italic text-fox">not last</span>
          </h2>
          <p className="lede mt-8">
            Olives in Italy, Spain and Greece are picked between October and
            December. Rio Largo&apos;s harvest runs from March to July, the
            southern hemisphere season.
          </p>
          <p className="mt-5 max-w-measure text-ink-muted">
            So the estate&apos;s new oil reaches the UK half a year out of step
            with Europe&apos;s, fresh in the very months when northern oil is at
            its oldest. It isn&apos;t marketing. It&apos;s geography.
          </p>
        </Reveal>

        <Reveal className="lg:col-span-6 lg:col-start-7 lg:pt-12" delay={0.1}>
          <figure>
            <div
              role="img"
              aria-label="Harvest calendar. Rio Largo in South Africa harvests from March to July. Italy, Spain and Greece harvest from October to December."
              className="border border-rule bg-paper-raised p-5 shadow-plate sm:p-8"
            >
              <div className="grid grid-cols-12 gap-1 sm:gap-1.5">
                {MONTHS.map((month, i) => (
                  <span key={i} className="label text-center text-ink-muted">
                    {month}
                  </span>
                ))}
              </div>

              {harvests.map((harvest) => (
                <div key={harvest.label} className="mt-5">
                  <div className="grid grid-cols-12 gap-1 sm:gap-1.5">
                    {MONTHS.map((_, i) => (
                      <span
                        key={i}
                        className={cn(
                          "h-9 border border-rule sm:h-11",
                          harvest.months.includes(i) ? harvest.cell : "bg-paper"
                        )}
                      />
                    ))}
                  </div>
                  <p className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4">
                    <span className="font-display text-xl font-semibold">
                      {harvest.label}
                    </span>
                    <span className="text-small text-ink-muted">{harvest.detail}</span>
                  </p>
                </div>
              ))}
            </div>
            <figcaption className="mt-4 font-display text-lg italic text-ink-muted">
              Two harvests, six months apart.
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

interface LedgerItem {
  title: string;
  description: string;
}

/** Numbered rows split by hairlines. Used where feature cards would otherwise go. */
export function Ledger({ items }: { items: LedgerItem[] }) {
  return (
    <ol className="border-b border-rule">
      {items.map((item, i) => (
        <li
          key={item.title}
          className="grid grid-cols-[2.75rem_1fr] gap-x-4 border-t border-rule py-7 sm:grid-cols-[4.5rem_1fr_1.4fr] sm:gap-x-6"
        >
          <span
            aria-hidden
            className="font-display text-3xl leading-none text-rule-strong"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="font-display text-2xl font-semibold leading-tight">
            {item.title}
          </h3>
          <p className="col-start-2 mt-2 text-ink-muted sm:col-start-3 sm:mt-0">
            {item.description}
          </p>
        </li>
      ))}
    </ol>
  );
}

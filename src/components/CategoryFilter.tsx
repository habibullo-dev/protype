import { CATEGORIES } from "../lib/categories";
import type { Category } from "../types";

interface Props {
  selected: Category | "all";
  onSelect: (key: Category | "all") => void;
  counts: Record<Category | "all", number>;
}

export function CategoryFilter({ selected, onSelect, counts }: Props) {
  return (
    <div
      role="tablist"
      aria-label="Filter stories by category"
      className="no-scrollbar -mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
    >
      <Pill
        active={selected === "all"}
        label="All stories"
        count={counts.all}
        onClick={() => onSelect("all")}
      />
      {CATEGORIES.map((c) => (
        <Pill
          key={c.key}
          active={selected === c.key}
          label={c.short}
          count={counts[c.key] ?? 0}
          onClick={() => onSelect(c.key)}
        />
      ))}
    </div>
  );
}

function Pill({
  active,
  label,
  count,
  onClick,
}: {
  active: boolean;
  label: string;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={[
        "snap-start whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm transition-all duration-200",
        active
          ? "border-matcha-deep bg-matcha text-paper shadow-paper"
          : "border-border-soft bg-paper text-ink-soft hover:-translate-y-0.5 hover:border-matcha/50 hover:text-ink",
      ].join(" ")}
    >
      <span className="font-body font-medium">{label}</span>
      <span
        className={[
          "ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 font-mono text-[0.6875rem] font-semibold tabular-nums",
          active ? "bg-paper/25 text-paper" : "bg-cream text-mute",
        ].join(" ")}
      >
        {count}
      </span>
    </button>
  );
}

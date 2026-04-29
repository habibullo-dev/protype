import type { SectionKey } from "../types";

interface NavItem {
  key: SectionKey;
  label: string;
}

const ITEMS: NavItem[] = [
  { key: "home", label: "Home" },
  { key: "share", label: "Share" },
  { key: "read", label: "Read" },
  { key: "recovery", label: "Recovery" },
  { key: "about", label: "About" },
];

interface Props {
  active: SectionKey;
  onSelect: (section: SectionKey) => void;
}

export function Header({ active, onSelect }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-border-soft/60 bg-cream/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <button
          type="button"
          onClick={() => onSelect("home")}
          className="group flex items-center gap-2.5"
          aria-label="괜찮아 Box — go to home"
        >
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-ink/85 bg-paper">
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
              <rect
                x="2"
                y="2"
                width="18"
                height="18"
                rx="3.5"
                fill="#FFF7EF"
                stroke="#2F2F2F"
                strokeWidth="1.4"
              />
              <rect
                x="4.5"
                y="4.5"
                width="13"
                height="7"
                rx="1.5"
                fill="#FFFFFF"
                stroke="#2F2F2F"
                strokeWidth="1"
              />
              <circle cx="7" cy="8" r="1.4" fill="#E85D75" />
              <circle cx="11" cy="8" r="1.4" fill="#E85D75" />
              <circle cx="15" cy="8" r="1.4" fill="#E85D75" />
              <rect
                x="4.5"
                y="13"
                width="13"
                height="4.5"
                rx="1.5"
                fill="#7BAE7F"
                stroke="#2F2F2F"
                strokeWidth="1"
              />
            </svg>
            <span
              className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-blush ring-2 ring-cream transition-transform group-hover:scale-110"
              aria-hidden="true"
            />
          </span>
          <span className="flex flex-col items-start leading-none">
            <span
              className="font-display text-lg text-ink"
              style={{
                fontVariationSettings: '"SOFT" 100, "opsz" 96, "wght" 600',
              }}
            >
              괜찮아 Box
            </span>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-mute">
              Gwaenchana Box
            </span>
          </span>
        </button>

        <nav
          aria-label="Main sections"
          className="hidden items-center gap-1 lg:flex"
        >
          {ITEMS.map((item) => (
            <NavButton
              key={item.key}
              label={item.label}
              active={active === item.key}
              onClick={() => onSelect(item.key)}
            />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onSelect("share")}
            className="rounded-full bg-matcha px-4 py-2 font-body text-sm font-semibold text-paper shadow-paper transition-all hover:-translate-y-0.5 hover:bg-matcha-deep hover:shadow-paper-hover"
          >
            Share a story
          </button>
        </div>
      </div>
    </header>
  );
}

function NavButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={[
        "relative rounded-full px-3.5 py-1.5 font-body text-sm transition-colors",
        active ? "text-ink" : "text-mute hover:text-ink",
      ].join(" ")}
    >
      {label}
      {active && (
        <span
          aria-hidden="true"
          className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-blush"
        />
      )}
    </button>
  );
}

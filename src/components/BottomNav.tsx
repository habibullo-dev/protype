import type { SectionKey } from "../types";

interface NavItem {
  key: SectionKey;
  label: string;
  icon: "home" | "share" | "read" | "recovery" | "about";
}

const ITEMS: NavItem[] = [
  { key: "home", label: "Home", icon: "home" },
  { key: "share", label: "Share", icon: "share" },
  { key: "read", label: "Read", icon: "read" },
  { key: "recovery", label: "Recovery", icon: "recovery" },
  { key: "about", label: "About", icon: "about" },
];

interface Props {
  active: SectionKey;
  onSelect: (section: SectionKey) => void;
}

export function BottomNav({ active, onSelect }: Props) {
  return (
    <nav
      aria-label="Sections"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border-soft bg-cream/95 backdrop-blur lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-around px-2 py-1.5">
        {ITEMS.map((item) => {
          const isActive = active === item.key;
          return (
            <li key={item.key} className="flex-1">
              <button
                type="button"
                onClick={() => onSelect(item.key)}
                aria-current={isActive ? "page" : undefined}
                className="group flex w-full flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-2 transition-colors"
              >
                <span
                  className={[
                    "inline-flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-ink text-paper"
                      : "text-mute group-hover:bg-paper group-hover:text-ink",
                  ].join(" ")}
                >
                  <Icon name={item.icon} />
                </span>
                <span
                  className={[
                    "font-mono text-[0.625rem] uppercase tracking-[0.12em]",
                    isActive ? "text-ink" : "text-mute",
                  ].join(" ")}
                >
                  {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function Icon({ name }: { name: NavItem["icon"] }) {
  const stroke = "currentColor";
  const sw = 1.5;
  switch (name) {
    case "home":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M2.5 7.5L8 2.5l5.5 5v6h-4v-3.5h-3V13.5h-4v-6z"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinejoin="round"
          />
        </svg>
      );
    case "share":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect
            x="3.5"
            y="2.5"
            width="9"
            height="11"
            rx="1.5"
            stroke={stroke}
            strokeWidth={sw}
          />
          <path
            d="M5.5 5.5h5M5.5 8h5M5.5 10.5h3"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinecap="round"
          />
        </svg>
      );
    case "read":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M2 3h4.5c.8 0 1.5.7 1.5 1.5V13c0-.6-.5-1-1-1H2V3z"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinejoin="round"
          />
          <path
            d="M14 3H9.5c-.8 0-1.5.7-1.5 1.5V13c0-.6.5-1 1-1H14V3z"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinejoin="round"
          />
        </svg>
      );
    case "recovery":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M2 11s2-6 6-6 6 6 6 6"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="8" cy="11" r="1.5" fill={stroke} />
        </svg>
      );
    case "about":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="5.75" stroke={stroke} strokeWidth={sw} />
          <path
            d="M8 7.5v3.5M8 5v.1"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

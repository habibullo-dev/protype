import { useState } from "react";
import type { ReactionCounts, ReactionKey } from "../types";

interface ButtonDef {
  key: ReactionKey;
  label: string;
  glyph: string;
}

const BUTTONS: ButtonDef[] = [
  { key: "relate", label: "I relate", glyph: "◜◝" },
  { key: "notAlone", label: "You're not alone", glyph: "◯◯" },
  { key: "thankYou", label: "Thank you for sharing", glyph: "✿" },
  { key: "helped", label: "This helped me", glyph: "✓" },
];

interface Props {
  counts: ReactionCounts;
  onReact: (key: ReactionKey) => void;
}

export function SupportReactionButtons({ counts, onReact }: Props) {
  const [pingKey, setPingKey] = useState<ReactionKey | null>(null);
  const [pingNonce, setPingNonce] = useState(0);

  function handleClick(key: ReactionKey) {
    onReact(key);
    setPingKey(key);
    setPingNonce((n) => n + 1);
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {BUTTONS.map((b) => {
        const count = counts[b.key];
        const isActive = pingKey === b.key;
        return (
          <button
            key={b.key}
            type="button"
            onClick={() => handleClick(b.key)}
            className="group relative inline-flex items-center gap-2 rounded-full border border-border-soft bg-cream px-3 py-1.5 text-xs font-medium text-ink-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-matcha/60 hover:bg-matcha-tint hover:text-ink hover:shadow-sm focus-visible:bg-matcha-tint"
          >
            <span
              aria-hidden="true"
              className="font-mono text-[0.65rem] tracking-tight text-mute group-hover:text-matcha-deep"
            >
              {b.glyph}
            </span>
            <span className="font-body">{b.label}</span>
            {count > 0 && (
              <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-paper px-1.5 font-mono text-[0.65rem] font-semibold text-ink-soft tabular-nums">
                {count}
              </span>
            )}
            {isActive && (
              <span
                key={pingNonce}
                aria-hidden="true"
                className="anim-ping-up pointer-events-none absolute -top-2 right-2 font-mono text-[0.7rem] font-semibold text-matcha-deep"
              >
                +1
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

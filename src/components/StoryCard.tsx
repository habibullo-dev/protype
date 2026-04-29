import { getCategoryMeta } from "../lib/categories";
import type { ReactionKey, Story } from "../types";
import { SupportReactionButtons } from "./SupportReactionButtons";

interface Props {
  story: Story;
  number: number;
  variant?: "default" | "recovery";
  onReact: (storyId: string, key: ReactionKey) => void;
  onReport: () => void;
}

function formatNumber(n: number): string {
  return n.toString().padStart(3, "0");
}

export function StoryCard({
  story,
  number,
  variant = "default",
  onReact,
  onReport,
}: Props) {
  const meta = getCategoryMeta(story.category);
  const isRecovery = variant === "recovery";
  const hasRecovery = story.recovery.trim().length > 0;

  return (
    <article
      className={[
        "paper-card relative flex flex-col overflow-hidden p-6 transition-all duration-300",
        "hover:-translate-y-0.5 hover:shadow-paper-hover",
        isRecovery ? "border-recovery-deep/70" : "",
      ].join(" ")}
    >
      {/* tape decorations */}
      <span className="tape -left-3 top-3 -rotate-12" aria-hidden="true" />
      {isRecovery && (
        <span
          className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-recovery px-2.5 py-1 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-matcha-deep"
          aria-label="Recovery story"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
            <path
              d="M2 5l2 2 4-4"
              stroke="currentColor"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Recovery
        </span>
      )}

      <header className="mb-4 flex flex-wrap items-baseline justify-between gap-2 pr-20">
        <div className="stamp">Failure Story #{formatNumber(number)}</div>
        <div className="chip" aria-label={`Category: ${meta.label}`}>
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-blush"
          />
          {meta.short}
        </div>
      </header>

      <Section label="What happened">
        <p
          className="font-display text-[1.0625rem] leading-snug text-ink"
          style={{ fontVariationSettings: '"SOFT" 80, "opsz" 24' }}
        >
          {story.event}
        </p>
      </Section>

      <Section label="How it felt" className="mt-4">
        <p className="font-body text-[0.9375rem] leading-relaxed text-ink-soft">
          {story.feeling}
        </p>
      </Section>

      {hasRecovery && (
        <Section
          label="What helped"
          className="mt-4 rounded-xl bg-recovery/60 px-4 py-3.5"
        >
          <p className="font-body text-[0.9375rem] leading-relaxed text-ink-soft">
            {story.recovery}
          </p>
        </Section>
      )}

      <footer className="mt-5 flex flex-col gap-3 border-t border-border-soft/70 pt-4">
        <SupportReactionButtons
          counts={story.reactions}
          onReact={(k) => onReact(story.id, k)}
        />
        <div className="flex items-center justify-between">
          <span className="stamp opacity-70">Anonymous · {meta.label}</span>
          <button
            type="button"
            onClick={onReport}
            className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-mute transition-colors hover:text-blush focus-visible:text-blush"
          >
            Report
          </button>
        </div>
      </footer>
    </article>
  );
}

function Section({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="stamp mb-1.5">{label}</p>
      {children}
    </div>
  );
}

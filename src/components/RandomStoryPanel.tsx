import { useEffect, useState } from "react";
import { getCategoryMeta } from "../lib/categories";
import type { ReactionKey, Story } from "../types";
import { SupportReactionButtons } from "./SupportReactionButtons";

interface Props {
  pool: Story[];
  numberFor: (story: Story) => number;
  onReact: (storyId: string, key: ReactionKey) => void;
  onReport: () => void;
  buttonLabel?: string;
  emptyLabel?: string;
  autoOpen?: boolean;
  excludeId?: string;
}

export function RandomStoryPanel({
  pool,
  numberFor,
  onReact,
  onReport,
  buttonLabel = "Receive a Random Story",
  emptyLabel = "No stories yet — be the first.",
  autoOpen = false,
  excludeId,
}: Props) {
  const [story, setStory] = useState<Story | null>(null);
  const [nonce, setNonce] = useState(0);
  const [isPulling, setIsPulling] = useState(false);

  function pick() {
    const candidates = excludeId
      ? pool.filter((s) => s.id !== excludeId)
      : pool;
    if (candidates.length === 0) return null;
    const next = candidates[Math.floor(Math.random() * candidates.length)];
    if (!next) return null;
    if (story && candidates.length > 1 && next.id === story.id) {
      return (
        candidates[(candidates.indexOf(next) + 1) % candidates.length] ?? next
      );
    }
    return next;
  }

  function handleReceive() {
    if (pool.length === 0) return;
    setIsPulling(true);
    window.setTimeout(() => {
      const next = pick();
      if (next) {
        setStory(next);
        setNonce((n) => n + 1);
      }
      setIsPulling(false);
    }, 280);
  }

  useEffect(() => {
    if (autoOpen && !story) handleReceive();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoOpen]);

  const isEmpty = pool.length === 0;

  return (
    <div className="paper-card relative overflow-hidden p-6 sm:p-7">
      {/* machine top label */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span
            className="inline-flex h-2.5 w-2.5 animate-pulse rounded-full bg-blush"
            aria-hidden="true"
          />
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-ink">
            Vending window
          </span>
        </div>
        <span className="stamp">Press to receive</span>
      </div>

      {/* the machine window */}
      <div
        className="relative rounded-2xl border-2 border-ink/85 bg-gradient-to-b from-paper to-cream-deep/70 p-4 sm:p-5"
        style={{ boxShadow: "var(--shadow-machine)" }}
      >
        {/* glass reflections */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-3 top-1.5 h-1 rounded-full bg-paper/70 blur-[1px]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-3 h-12 w-1 rounded-full bg-paper/40 blur-[1px]"
        />

        {/* contents */}
        <div
          className="min-h-[220px] sm:min-h-[260px]"
          aria-live="polite"
          aria-atomic="true"
        >
          {isEmpty && (
            <div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-2 text-center">
              <span className="text-3xl text-mute">∅</span>
              <p className="font-body text-sm text-mute">{emptyLabel}</p>
            </div>
          )}

          {!isEmpty && !story && (
            <div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-3 text-center">
              <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <span
                    key={i}
                    className="anim-pulse-soft inline-block h-5 w-5 rounded-full bg-blush/85"
                    style={{ animationDelay: `${i * 120}ms` }}
                  />
                ))}
              </div>
              <p className="mt-2 font-body text-sm text-ink-soft">
                Press the button. A story will drop in.
              </p>
            </div>
          )}

          {!isEmpty && story && (
            <article
              key={nonce}
              className={`anim-drop-in rounded-xl border border-border-soft bg-paper p-5 ${
                isPulling ? "opacity-40" : ""
              }`}
            >
              <header className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                <span className="stamp">
                  Failure Story #{numberFor(story).toString().padStart(3, "0")}
                </span>
                <span className="chip">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-blush"
                  />
                  {getCategoryMeta(story.category).short}
                </span>
              </header>

              <p
                className="font-display text-base leading-snug text-ink"
                style={{ fontVariationSettings: '"SOFT" 80, "opsz" 24' }}
              >
                {story.event}
              </p>
              <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft">
                <span className="stamp mr-1.5">Felt:</span>
                {story.feeling}
              </p>
              {story.recovery && (
                <div className="mt-3 rounded-lg bg-recovery/60 p-3">
                  <p className="font-body text-sm leading-relaxed text-ink-soft">
                    <span className="stamp mr-1.5">What helped:</span>
                    {story.recovery}
                  </p>
                </div>
              )}

              <div className="mt-4 flex items-center justify-between gap-2 border-t border-border-soft/70 pt-3">
                <SupportReactionButtons
                  counts={story.reactions}
                  onReact={(k) => onReact(story.id, k)}
                />
                <button
                  type="button"
                  onClick={onReport}
                  className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-mute hover:text-blush"
                >
                  Report
                </button>
              </div>
            </article>
          )}
        </div>
      </div>

      {/* receive button */}
      <div className="mt-5 flex flex-col-reverse items-stretch justify-between gap-3 sm:flex-row sm:items-center">
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-mute">
          Share a failure. Receive a little courage.
        </p>
        <button
          type="button"
          disabled={isEmpty}
          onClick={handleReceive}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-blush px-5 py-3 font-body text-base font-semibold text-paper shadow-paper transition-all hover:-translate-y-0.5 hover:bg-blush-deep hover:shadow-paper-hover disabled:cursor-not-allowed disabled:bg-mute"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M7 2.5v8M3.5 7l3.5 3.5L10.5 7"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{story ? "Receive another" : buttonLabel}</span>
        </button>
      </div>
    </div>
  );
}

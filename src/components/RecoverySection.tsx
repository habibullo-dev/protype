import { useMemo } from "react";
import type { ReactionKey, Story } from "../types";
import { StoryCard } from "./StoryCard";

interface Props {
  stories: Story[];
  numberFor: (story: Story) => number;
  onReact: (storyId: string, key: ReactionKey) => void;
  onReport: () => void;
}

export function RecoverySection({
  stories,
  numberFor,
  onReact,
  onReport,
}: Props) {
  const recovery = useMemo(
    () =>
      stories.filter((s) => s.isRecoveryStory || s.recovery.trim().length > 0),
    [stories],
  );

  const sorted = useMemo(
    () => [...recovery].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
    [recovery],
  );

  return (
    <section className="px-4 pt-8 sm:px-6 sm:pt-12">
      <div className="mx-auto max-w-6xl">
        <header className="anim-rise relative mb-8 overflow-hidden rounded-3xl border border-recovery-deep/60 bg-recovery/55 px-6 py-8 sm:px-10 sm:py-10">
          {/* decorative leaves */}
          <span
            aria-hidden="true"
            className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-matcha/20 blur-3xl"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-recovery-deep/40 blur-3xl"
          />

          <div className="relative">
            <p className="stamp text-matcha-deep">A hopeful shelf</p>
            <h2
              className="mt-2 font-display text-4xl leading-tight text-ink sm:text-5xl"
              style={{ fontVariationSettings: '"SOFT" 100, "opsz" 96' }}
            >
              Recovery{" "}
              <em
                className="not-italic text-matcha-deep"
                style={{ fontStyle: "italic" }}
              >
                Shelf
              </em>
            </h2>
            <p className="mt-3 max-w-xl font-display text-lg italic text-ink-soft">
              Stories from students who found a way forward.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-matcha/40 bg-paper/80 px-4 py-2 font-body text-sm text-ink">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 rounded-full bg-matcha"
              />
              Recovery does not mean perfect. It means continuing.
            </div>
          </div>
        </header>

        {sorted.length === 0 ? (
          <div className="paper-card anim-rise flex flex-col items-center gap-2 p-10 text-center">
            <p className="stamp">Empty shelf</p>
            <p className="font-display text-xl text-ink">
              No recovery stories yet.
            </p>
            <p className="font-body text-sm text-mute">
              When students share what helped them, those stories will land
              here.
            </p>
          </div>
        ) : (
          <div className="anim-rise grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
                number={numberFor(story)}
                variant="recovery"
                onReact={onReact}
                onReport={onReport}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

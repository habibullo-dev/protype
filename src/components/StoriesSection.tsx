import { useMemo, useState } from "react";
import { CATEGORIES } from "../lib/categories";
import type { Category, ReactionKey, Story } from "../types";
import { CategoryFilter } from "./CategoryFilter";
import { RandomStoryPanel } from "./RandomStoryPanel";
import { StoryCard } from "./StoryCard";

interface Props {
  stories: Story[];
  numberFor: (story: Story) => number;
  onReact: (storyId: string, key: ReactionKey) => void;
  onReport: () => void;
}

export function StoriesSection({
  stories,
  numberFor,
  onReact,
  onReport,
}: Props) {
  const [filter, setFilter] = useState<Category | "all">("all");

  const counts = useMemo(() => {
    const base: Record<Category | "all", number> = {
      all: stories.length,
      study: 0,
      career: 0,
      friendship: 0,
      family: 0,
      "social-media": 0,
      confidence: 0,
      time: 0,
      other: 0,
    };
    for (const s of stories) base[s.category] += 1;
    return base;
  }, [stories]);

  const filtered = useMemo(() => {
    if (filter === "all") return stories;
    return stories.filter((s) => s.category === filter);
  }, [stories, filter]);

  // newest first within filtered
  const sorted = useMemo(
    () => [...filtered].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
    [filtered],
  );

  return (
    <section className="px-4 pt-8 sm:px-6 sm:pt-12">
      <div className="mx-auto max-w-6xl">
        <header className="anim-rise mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="stamp">Step two</p>
            <h2
              className="mt-2 font-display text-4xl leading-tight text-ink sm:text-5xl"
              style={{ fontVariationSettings: '"SOFT" 100, "opsz" 96' }}
            >
              Read other students&rsquo; stories.
            </h2>
            <p className="mt-3 max-w-xl font-display text-lg italic text-ink-soft">
              No names. No judgment. Just real stories.
            </p>
          </div>
          <div className="font-mono text-xs uppercase tracking-[0.16em] text-mute">
            {sorted.length} of {stories.length} stories
          </div>
        </header>

        <div className="anim-rise grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="order-2 lg:order-1">
            <CategoryFilter
              selected={filter}
              onSelect={setFilter}
              counts={counts}
            />

            <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-2">
              {sorted.length === 0 && (
                <div className="paper-card sm:col-span-2 flex flex-col items-center gap-2 p-10 text-center">
                  <p className="stamp">Quiet shelf</p>
                  <p className="font-display text-xl text-ink">
                    No stories in this category yet.
                  </p>
                  <p className="font-body text-sm text-mute">
                    Try another category, or be the first to share.
                  </p>
                </div>
              )}
              {sorted.map((story) => (
                <StoryCard
                  key={story.id}
                  story={story}
                  number={numberFor(story)}
                  onReact={onReact}
                  onReport={onReport}
                />
              ))}
            </div>
          </div>

          {/* right column — sticky random panel on desktop */}
          <aside className="order-1 lg:order-2 lg:sticky lg:top-24 lg:self-start">
            <RandomStoryPanel
              pool={filter === "all" ? stories : filtered}
              numberFor={numberFor}
              onReact={onReact}
              onReport={onReport}
              buttonLabel="Receive a Random Story"
              emptyLabel="Nothing to receive in this category yet."
            />
            <p className="mt-3 px-2 text-center font-body text-xs text-mute lg:text-left">
              The random window pulls from the{" "}
              {filter === "all"
                ? "full collection"
                : `“${CATEGORIES.find((c) => c.key === filter)?.short}” shelf`}
              .
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

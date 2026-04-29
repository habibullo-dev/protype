import { useState } from "react";
import type { ReactionKey, SectionKey, Story } from "../types";
import { RandomStoryPanel } from "./RandomStoryPanel";
import { StoryForm } from "./StoryForm";

interface Props {
  pool: Story[];
  numberFor: (story: Story) => number;
  onCreateStory: (
    input: Omit<Story, "id" | "createdAt" | "reactions" | "source">,
  ) => Story;
  onReact: (storyId: string, key: ReactionKey) => void;
  onReport: () => void;
  onNavigate: (section: SectionKey) => void;
}

export function ShareStorySection({
  pool,
  numberFor,
  onCreateStory,
  onReact,
  onReport,
  onNavigate,
}: Props) {
  const [submitted, setSubmitted] = useState<Story | null>(null);

  function handleSubmit(
    input: Omit<Story, "id" | "createdAt" | "reactions" | "source">,
  ) {
    const story = onCreateStory(input);
    setSubmitted(story);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <section className="overflow-x-hidden px-4 pt-8 sm:px-6 sm:pt-12">
      <div className="mx-auto min-w-0 max-w-3xl">
        <header className="anim-rise mb-8 min-w-0">
          <p className="stamp">Step one</p>
          <h2
            className="mt-2 text-wrap font-display text-3xl leading-tight text-ink sm:text-5xl"
            style={{ fontVariationSettings: '"SOFT" 100, "opsz" 96' }}
          >
            {submitted ? "Thank you." : "Share a story, anonymously."}
          </h2>
          <p className="mt-3 max-w-full text-wrap font-display text-lg italic text-ink-soft sm:max-w-xl">
            {submitted
              ? "Your story may help another student feel less alone."
              : "Someone else has felt this too. Your honesty might be the thing they needed."}
          </p>
        </header>

        {!submitted && <StoryForm onSubmit={handleSubmit} />}

        {submitted && (
          <div className="space-y-6">
            {/* success card */}
            <div className="paper-card anim-rise relative overflow-hidden border-matcha/35 bg-matcha-tint/50 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-matcha text-paper shadow-paper"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M5 10.5l3 3 7-7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div className="flex-1">
                  <p className="stamp text-matcha-deep">Submitted</p>
                  <p
                    className="mt-1 font-display text-xl leading-snug text-ink"
                    style={{ fontVariationSettings: '"SOFT" 80, "opsz" 24' }}
                  >
                    Your story was added as #
                    {numberFor(submitted).toString().padStart(3, "0")}.
                  </p>
                  <p className="mt-1 font-body text-sm text-ink-soft">
                    It now sits anonymously alongside everyone else&rsquo;s.
                    Now, it&rsquo;s your turn to take one.
                  </p>
                </div>
              </div>
            </div>

            <RandomStoryPanel
              pool={pool}
              numberFor={numberFor}
              onReact={onReact}
              onReport={onReport}
              buttonLabel="Receive a Story"
              autoOpen
              excludeId={submitted.id}
            />

            <div className="flex flex-wrap justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSubmitted(null)}
                className="font-body text-sm text-matcha-deep underline-offset-4 hover:underline"
              >
                Share another story
              </button>
              <button
                type="button"
                onClick={() => onNavigate("read")}
                className="font-body text-sm text-ink-soft underline-offset-4 hover:underline"
              >
                Or read more stories →
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

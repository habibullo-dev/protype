import type { SectionKey } from "../types";
import { SafetyNotice } from "./SafetyNotice";

interface Props {
  onNavigate: (section: SectionKey) => void;
}

export function AboutSection({ onNavigate }: Props) {
  return (
    <section className="px-4 pt-8 sm:px-6 sm:pt-12">
      <div className="mx-auto max-w-4xl space-y-12">
        <header className="anim-rise">
          <p className="stamp">About the project</p>
          <h2
            className="mt-2 font-display text-4xl leading-tight text-ink sm:text-5xl"
            style={{ fontVariationSettings: '"SOFT" 100, "opsz" 96' }}
          >
            Why a box for failure?
          </h2>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.24em] text-mute">
            괜찮아 Box · Gwaenchana Box · It’s Okay Box
          </p>
          <p className="mt-4 max-w-2xl font-display text-lg italic text-ink-soft">
            Failure is not a profile picture.
          </p>
        </header>

        <div className="anim-rise grid gap-6 lg:grid-cols-[1fr_1fr]">
          <article className="paper-card relative p-6 sm:p-7">
            <p className="stamp mb-3">The problem</p>
            <p className="font-body text-base leading-relaxed text-ink-soft">
              Our project focuses on{" "}
              <strong className="text-ink">social comparison</strong> among
              university students. Interviewees said they often feel that
              everyone else is doing better — academically, socially, or online.
              This creates hidden stress because students rarely share their
              failures publicly.
            </p>
            <p className="mt-4 font-body text-base leading-relaxed text-ink-soft">
              <strong className="text-ink">괜찮아 Box</strong> helps students
              anonymously exchange failure and recovery stories so they can
              realize they are not alone.
            </p>
          </article>

          <article className="paper-card relative border-blush/30 bg-pink-soft/30 p-6 sm:p-7">
            <p className="stamp mb-3 text-blush-deep">The story</p>
            <p className="font-body text-base leading-relaxed text-ink-soft">
              괜찮아 Box started as a physical{" "}
              <strong className="text-ink">vending-machine-style prototype</strong>.
              Instead of snacks or drinks, students exchange anonymous failure
              and recovery stories.
            </p>
            <p className="mt-4 font-body text-base leading-relaxed text-ink-soft">
              By scanning the QR code, students can submit a story, receive
              another student&rsquo;s story, and leave small supportive
              reactions. The goal is to reduce social comparison stress by
              making hidden struggles visible in a safe and anonymous way.
            </p>
          </article>
        </div>

        {/* how it works */}
        <div className="anim-rise">
          <p className="stamp mb-4">How it works</p>
          <ol className="grid gap-4 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="paper-card relative flex flex-col gap-3 p-5"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink font-mono text-xs font-semibold tracking-widest text-cream">
                  0{i + 1}
                </span>
                <h3
                  className="font-display text-xl text-ink"
                  style={{ fontVariationSettings: '"SOFT" 80, "opsz" 24' }}
                >
                  {step.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-ink-soft">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <SafetyNotice />

        {/* CTA */}
        <div className="anim-rise grid gap-4 rounded-3xl border border-border-soft bg-paper p-7 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="stamp">Ready when you are</p>
            <p
              className="mt-1 font-display text-2xl leading-snug text-ink"
              style={{ fontVariationSettings: '"SOFT" 100, "opsz" 96' }}
            >
              Share a failure. Receive a little courage.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onNavigate("share")}
              className="rounded-full bg-matcha px-4 py-2.5 font-body text-sm font-semibold text-paper hover:bg-matcha-deep"
            >
              Share my story
            </button>
            <button
              type="button"
              onClick={() => onNavigate("read")}
              className="rounded-full border border-ink/85 bg-paper px-4 py-2.5 font-body text-sm font-semibold text-ink hover:border-ink"
            >
              Read stories
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  {
    title: "Drop your story.",
    body: "Write what happened, how it felt, and what helped if anything did. Anonymously.",
  },
  {
    title: "Take one back.",
    body: "괜찮아 Box returns one story from another student. You may recognize yourself in it.",
  },
  {
    title: "Send a small support.",
    body: "A reaction like “you’re not alone” reaches a stranger. No counters, no rankings.",
  },
];

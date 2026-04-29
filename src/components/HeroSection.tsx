import type { SectionKey } from "../types";
import { VendingIllustration } from "./VendingIllustration";

interface Props {
  onNavigate: (section: SectionKey) => void;
  storyCount: number;
}

export function HeroSection({ onNavigate, storyCount }: Props) {
  return (
    <section className="relative overflow-hidden px-4 pt-8 sm:px-6 sm:pt-14">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        {/* left: copy */}
        <div className="anim-rise" style={{ animationDelay: "0ms" }}>
          {/* top stamp row */}
          <div className="flex flex-wrap items-center gap-3 text-mute">
            <span className="chip">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-blush"
              />
              No names · No judgment
            </span>
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.2em]">
              Project · DT · 2026
            </span>
          </div>

          <h1
            className="mt-6 font-display text-[2.75rem] leading-[1.05] tracking-tight text-ink sm:text-[3.75rem] lg:text-[4.5rem]"
            style={{
              fontVariationSettings: '"SOFT" 100, "opsz" 144, "wght" 500',
            }}
          >
            괜찮아
            <span className="block">
              <em
                className="not-italic text-blush"
                style={{
                  fontStyle: "italic",
                  fontVariationSettings: '"SOFT" 100, "opsz" 144, "wght" 400',
                }}
              >
                Box
              </em>
              <span
                aria-hidden="true"
                className="ml-3 inline-block h-3 w-3 -translate-y-2 rounded-full bg-blush align-middle"
              />
            </span>
          </h1>

          <p className="mt-4 font-mono text-xs uppercase tracking-[0.24em] text-mute">
            Gwaenchana Box · It’s Okay Box
          </p>

          <p
            className="mt-5 max-w-xl font-display text-xl italic text-ink-soft sm:text-2xl"
            style={{ fontVariationSettings: '"SOFT" 100, "opsz" 24' }}
          >
            Share a failure. Receive a little courage.
          </p>

          <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-ink-soft sm:text-lg">
            괜찮아 Box is an anonymous story-sharing space for students who feel
            pressure from comparison. Students can share a failure story, read
            others&rsquo; hidden struggles, and receive recovery stories from
            people who kept going.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={() => onNavigate("share")}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-matcha px-5 py-3 font-body text-base font-semibold text-paper shadow-paper transition-all hover:-translate-y-0.5 hover:bg-matcha-deep hover:shadow-paper-hover"
            >
              <span>Share my story</span>
              <Arrow />
            </button>
            <button
              type="button"
              onClick={() => onNavigate("read")}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/85 bg-paper px-5 py-3 font-body text-base font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-ink hover:shadow-paper"
            >
              <span>Read stories</span>
              <Arrow />
            </button>
            <button
              type="button"
              onClick={() => onNavigate("recovery")}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border-soft bg-cream px-5 py-3 font-body text-base text-ink-soft transition-all hover:-translate-y-0.5 hover:border-matcha hover:bg-matcha-tint"
            >
              <span>Recovery stories</span>
              <Arrow />
            </button>
          </div>

          {/* count strip */}
          <div className="mt-9 flex items-center gap-3 text-mute">
            <span className="font-mono text-xs tabular-nums uppercase tracking-[0.2em] text-ink-soft">
              {storyCount.toString().padStart(3, "0")}
            </span>
            <span className="h-px flex-1 max-w-24 bg-border-soft" />
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em]">
              Stories shared
            </span>
          </div>
        </div>

        {/* right: vending machine illustration */}
        <div
          className="anim-rise relative flex items-center justify-center lg:justify-end"
          style={{ animationDelay: "120ms" }}
        >
          {/* background blob */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 rounded-[3rem] bg-matcha-tint/50 blur-2xl"
          />
          <VendingIllustration className="" />
        </div>
      </div>

      {/* bottom strip — interview insight */}
      <div
        className="anim-rise mx-auto mt-16 max-w-5xl"
        style={{ animationDelay: "240ms" }}
      >
        <div className="mb-6">
          <p className="stamp">From our interviews</p>
          <p
            className="mt-2 font-display text-xl leading-snug text-ink sm:text-2xl"
            style={{ fontVariationSettings: '"SOFT" 100, "opsz" 48' }}
          >
            Our interviewees said they often compare themselves with classmates
            and feel like they are the only ones struggling. Therefore, we
            designed{" "}
            <span className="text-matcha-deep">괜찮아 Box</span> to show that
            failure is common, shared, and recoverable.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <InsightCard
            stamp="What we heard"
            quote="I always feel like everyone else is one step ahead."
            note="From our interviews with university students."
          />
          <InsightCard
            stamp="Why it matters"
            quote="Students rarely share failure. So everyone thinks they are alone."
            note="Hidden struggle = more pressure."
            tone="blush"
          />
          <InsightCard
            stamp="Our answer"
            quote="A box for stories — drop one in, take one out."
            note="Inspired by our vending-machine-style prototype."
            tone="matcha"
          />
        </div>
      </div>
    </section>
  );
}

function InsightCard({
  stamp,
  quote,
  note,
  tone = "paper",
}: {
  stamp: string;
  quote: string;
  note: string;
  tone?: "paper" | "blush" | "matcha";
}) {
  const toneClass =
    tone === "matcha"
      ? "bg-matcha-tint/70 border-matcha/40"
      : tone === "blush"
        ? "bg-pink-soft/45 border-blush/30"
        : "bg-paper border-border-soft";

  return (
    <div className={`paper-card ${toneClass} relative p-5`}>
      <p className="stamp">{stamp}</p>
      <p
        className="mt-2.5 font-display text-lg leading-snug text-ink"
        style={{ fontVariationSettings: '"SOFT" 100, "opsz" 24' }}
      >
        &ldquo;{quote}&rdquo;
      </p>
      <p className="mt-3 font-body text-xs text-mute">{note}</p>
    </div>
  );
}

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 7h8M7 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

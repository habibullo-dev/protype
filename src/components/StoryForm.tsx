import { useState } from "react";
import { CATEGORIES } from "../lib/categories";
import type { Category, Story } from "../types";

interface Props {
  onSubmit: (
    story: Omit<Story, "id" | "createdAt" | "reactions" | "source">,
  ) => void;
}

interface Errors {
  event?: string;
  feeling?: string;
}

const MIN_LEN = 10;

export function StoryForm({ onSubmit }: Props) {
  const [event, setEvent] = useState("");
  const [feeling, setFeeling] = useState("");
  const [recovery, setRecovery] = useState("");
  const [category, setCategory] = useState<Category>("study");
  const [isRecoveryStory, setIsRecoveryStory] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  function validate(): Errors {
    const next: Errors = {};
    if (event.trim().length < MIN_LEN) {
      next.event = `Please share at least ${MIN_LEN} characters about what happened.`;
    }
    if (feeling.trim().length < MIN_LEN) {
      next.feeling = `Please share at least ${MIN_LEN} characters about how it felt.`;
    }
    return next;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const firstKey = Object.keys(next)[0] as keyof Errors;
      const el = document.querySelector<HTMLElement>(
        `[data-field="${firstKey}"]`,
      );
      el?.focus();
      return;
    }
    onSubmit({
      category,
      event: event.trim(),
      feeling: feeling.trim(),
      recovery: recovery.trim(),
      isRecoveryStory,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="paper-card relative space-y-6 p-6 sm:p-8"
      noValidate
    >
      {/* privacy note */}
      <div
        id="privacy-note"
        role="note"
        className="flex items-start gap-3 rounded-2xl border border-border-soft bg-cream/60 px-4 py-3"
      >
        <span
          aria-hidden="true"
          className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-paper text-mute"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect
              x="2.5"
              y="6"
              width="9"
              height="6"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <path
              d="M4.5 6V4.5a2.5 2.5 0 015 0V6"
              stroke="currentColor"
              strokeWidth="1.3"
            />
          </svg>
        </span>
        <div className="flex-1 space-y-0.5">
          <p className="stamp">Privacy note</p>
          <p className="font-body text-sm leading-relaxed text-ink-soft">
            Please do not include real names, phone numbers, student IDs, or
            private information. This space is anonymous and supportive.
          </p>
        </div>
      </div>

      <Field
        id="story-event"
        field="event"
        label="What happened?"
        helper="Tell us briefly. One paragraph is enough."
        error={errors.event}
      >
        <textarea
          id="story-event"
          data-field="event"
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          aria-invalid={!!errors.event}
          aria-describedby={
            errors.event ? "story-event-error privacy-note" : "privacy-note"
          }
          rows={3}
          placeholder="Example: I failed an exam even though I studied hard."
          className="textarea-paper"
        />
      </Field>

      <Field
        id="story-feeling"
        field="feeling"
        label="How did it make you feel?"
        helper="It is okay if it is messy. Honest is enough."
        error={errors.feeling}
      >
        <textarea
          id="story-feeling"
          data-field="feeling"
          value={feeling}
          onChange={(e) => setFeeling(e.target.value)}
          aria-invalid={!!errors.feeling}
          aria-describedby={errors.feeling ? "story-feeling-error" : undefined}
          rows={3}
          placeholder="Example: I felt behind compared to my friends."
          className="textarea-paper"
        />
      </Field>

      <Field
        id="story-recovery"
        field="recovery"
        label="What helped you recover, or what do you wish someone told you?"
        helper="Optional. Even one sentence can help someone else."
      >
        <textarea
          id="story-recovery"
          data-field="recovery"
          value={recovery}
          onChange={(e) => setRecovery(e.target.value)}
          rows={3}
          placeholder="Example: I wish someone told me one failure does not define me."
          className="textarea-paper"
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="story-category" className="stamp mb-2 block">
            Category
          </label>
          <div className="relative">
            <select
              id="story-category"
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full appearance-none rounded-2xl border border-border-soft bg-paper px-4 py-3 pr-10 font-body text-base text-ink focus:border-matcha-deep focus:outline-none"
            >
              {CATEGORIES.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </select>
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-mute"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M3 5l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="flex items-end">
          <label className="group flex cursor-pointer items-start gap-3 rounded-2xl border border-border-soft bg-paper px-4 py-3 transition-colors hover:border-matcha/60 has-[:checked]:border-matcha has-[:checked]:bg-matcha-tint/60">
            <span className="relative mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-border-soft bg-cream group-has-[:checked]:border-matcha-deep group-has-[:checked]:bg-matcha">
              <input
                type="checkbox"
                checked={isRecoveryStory}
                onChange={(e) => setIsRecoveryStory(e.target.checked)}
                className="absolute inset-0 cursor-pointer opacity-0"
              />
              <svg
                aria-hidden="true"
                className="hidden h-3 w-3 text-paper group-has-[:checked]:block"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M3 6.5l2 2 4-4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div className="flex-1">
              <p className="font-body text-sm font-semibold text-ink">
                Show this as a recovery story too
              </p>
              <p className="mt-0.5 font-body text-xs text-mute">
                It will appear on the Recovery Shelf to help others.
              </p>
            </div>
          </label>
        </div>
      </div>

      <div className="flex flex-col items-stretch justify-between gap-3 border-t border-border-soft pt-5 sm:flex-row sm:items-center">
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-mute">
          You can leave anytime. Nothing leaves your phone except your story.
        </p>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 font-body text-base font-semibold text-cream shadow-paper transition-all hover:-translate-y-0.5 hover:bg-blush hover:shadow-paper-hover"
        >
          <span>Drop my story into the Box</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M7 2v8M3.5 7.5L7 11l3.5-3.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}

function Field({
  id,
  field,
  label,
  helper,
  error,
  children,
}: {
  id: string;
  field: "event" | "feeling" | "recovery";
  label: string;
  helper: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="font-display text-lg text-ink">
          {label}
        </label>
        {field !== "recovery" && (
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-blush">
            required
          </span>
        )}
      </div>
      <p className="mb-2 font-body text-xs text-mute">{helper}</p>
      <div className={error ? "rounded-2xl ring-2 ring-blush/40" : ""}>
        {children}
      </div>
      {error && (
        <p
          id={`${id}-error`}
          className="mt-2 font-body text-xs text-blush-deep"
          role="alert"
        >
          {error}
        </p>
      )}
      <style>{`
        .textarea-paper {
          width: 100%;
          padding: 0.875rem 1rem;
          border: 1px solid var(--color-border-soft);
          background: var(--color-paper);
          border-radius: 1rem;
          font-family: var(--font-body);
          font-size: 1rem;
          color: var(--color-ink);
          line-height: 1.55;
          resize: vertical;
        }
        .textarea-paper::placeholder {
          color: var(--color-mute);
        }
        .textarea-paper:focus {
          outline: none;
          border-color: var(--color-matcha-deep);
          box-shadow: 0 0 0 3px rgba(123,174,127,0.18);
        }
      `}</style>
    </div>
  );
}

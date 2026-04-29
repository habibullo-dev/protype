export function SafetyNotice() {
  return (
    <aside
      className="paper-card relative mx-auto flex max-w-2xl flex-col gap-1.5 border-blush/30 bg-pink-soft/35 p-5 sm:flex-row sm:items-start sm:gap-4"
      aria-label="Safety information"
    >
      <span
        aria-hidden="true"
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper text-blush"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M9 1.5l7 4v3.6c0 4.05-3 7.4-7 7.9-4-.5-7-3.85-7-7.9V5.5l7-4z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M9 6v3.5M9 12.2v.1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <div className="flex-1 space-y-1">
        <p className="stamp">A small note</p>
        <p className="font-body text-sm leading-relaxed text-ink-soft">
          This is a student prototype for emotional support and reflection. It
          is not professional counseling. If you feel unsafe or in crisis,
          please reach out to a trusted person, your campus counseling center,
          or local emergency support.
        </p>
      </div>
    </aside>
  );
}

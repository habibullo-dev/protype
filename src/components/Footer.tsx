interface Props {
  onNavigate?: (section: "about") => void;
}

export function Footer({ onNavigate }: Props) {
  return (
    <footer className="mt-20 border-t border-border-soft/70 px-4 pb-32 pt-10 sm:pb-12">
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p
            className="font-display text-2xl text-ink"
            style={{ fontVariationSettings: '"SOFT" 100, "opsz" 96' }}
          >
            괜찮아 Box
          </p>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-mute">
            Gwaenchana Box · It’s Okay Box
          </p>
          <p className="mt-2 font-body text-sm italic text-mute">
            Share a failure. Receive a little courage.
          </p>
        </div>

        <div className="flex flex-col gap-1.5 text-sm sm:items-end">
          <p className="stamp">Project · Design Thinking · 2026</p>
          <p className="font-body text-mute">
            A student prototype — vending-machine-style story exchange.
          </p>
          {onNavigate && (
            <button
              type="button"
              onClick={() => onNavigate("about")}
              className="font-body text-sm text-matcha-deep underline-offset-4 hover:underline"
            >
              About the project →
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}

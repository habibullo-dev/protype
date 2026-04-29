import { useEffect } from "react";

const WORD = "괜찮아";
const PRELOADER_DURATION_MS = 2700;
const REDUCED_MOTION_DURATION_MS = 250;

interface Props {
  onDone: () => void;
}

export function Preloader({ onDone }: Props) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const timeout = window.setTimeout(
      onDone,
      prefersReducedMotion ? REDUCED_MOTION_DURATION_MS : PRELOADER_DURATION_MS,
    );

    return () => window.clearTimeout(timeout);
  }, [onDone]);

  return (
    <div className="preloader" role="status" aria-label="Loading 괜찮아 Box">
      <div className="preloader__liquid" aria-hidden="true">
        <span className="preloader__blob preloader__blob--one" />
        <span className="preloader__blob preloader__blob--two" />
        <span className="preloader__blob preloader__blob--three" />
      </div>

      <div className="preloader__mark" aria-hidden="true">
        <div className="preloader__word">
          {Array.from(WORD).map((letter, index) => (
            <span
              key={letter}
              className="preloader__letter"
              style={{ animationDelay: `${220 + index * 180}ms` }}
            >
              {letter}
            </span>
          ))}
        </div>
        <div className="preloader__box">Box</div>
      </div>

      <span className="sr-only">Loading 괜찮아 Box</span>
    </div>
  );
}

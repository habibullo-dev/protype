interface Props {
  className?: string;
}

export function VendingIllustration({ className = "" }: Props) {
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      {/* floating red balls */}
      <span
        className="anim-ball-float absolute -left-2 top-6 h-4 w-4 rounded-full bg-blush opacity-80 shadow-[inset_-2px_-2px_0_rgba(0,0,0,0.12)]"
        style={{ animationDelay: "0s" }}
      />
      <span
        className="anim-ball-float absolute -right-3 top-16 h-6 w-6 rounded-full bg-blush opacity-90 shadow-[inset_-3px_-3px_0_rgba(0,0,0,0.12)]"
        style={{ animationDelay: "1.4s" }}
      />
      <span
        className="anim-ball-float absolute -left-6 bottom-12 h-3 w-3 rounded-full bg-blush opacity-70"
        style={{ animationDelay: "2.6s" }}
      />

      <svg
        viewBox="0 0 220 320"
        className="h-auto w-full max-w-[260px] drop-shadow-[0_24px_40px_rgba(47,47,47,0.12)]"
      >
        <defs>
          <linearGradient id="cabinet" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFF7EF" />
            <stop offset="100%" stopColor="#F6EAD9" />
          </linearGradient>
          <linearGradient id="window" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F6EAD9" />
          </linearGradient>
        </defs>

        {/* shadow */}
        <ellipse cx="110" cy="306" rx="84" ry="6" fill="rgba(47,47,47,0.10)" />

        {/* cabinet body */}
        <rect
          x="18"
          y="14"
          width="184"
          height="288"
          rx="20"
          fill="url(#cabinet)"
          stroke="#2F2F2F"
          strokeWidth="2.5"
        />

        {/* top stripe */}
        <rect x="28" y="22" width="164" height="14" rx="6" fill="#7BAE7F" />
        <text
          x="110"
          y="32.5"
          textAnchor="middle"
          fill="#FFF7EF"
          fontSize="8"
          fontFamily="'JetBrains Mono', monospace"
          letterSpacing="2.4"
        >
          GWAENCHANA · BOX
        </text>

        {/* window frame */}
        <rect
          x="30"
          y="46"
          width="160"
          height="120"
          rx="10"
          fill="url(#window)"
          stroke="#2F2F2F"
          strokeWidth="2"
        />

        {/* shelves */}
        <line
          x1="30"
          y1="86"
          x2="190"
          y2="86"
          stroke="#EADFD4"
          strokeWidth="1.5"
        />
        <line
          x1="30"
          y1="126"
          x2="190"
          y2="126"
          stroke="#EADFD4"
          strokeWidth="1.5"
        />

        {/* red balls in window */}
        {[
          [55, 70],
          [90, 70],
          [125, 70],
          [160, 70],
          [55, 110],
          [90, 110],
          [125, 110],
          [160, 110],
          [55, 150],
          [90, 150],
          [125, 150],
          [160, 150],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="9" fill="#E85D75" />
            <circle
              cx={(x as number) - 2.5}
              cy={(y as number) - 2.5}
              r="2.5"
              fill="rgba(255,255,255,0.45)"
            />
          </g>
        ))}

        {/* keypad / receive button */}
        <rect
          x="30"
          y="178"
          width="100"
          height="64"
          rx="8"
          fill="#FFFFFF"
          stroke="#2F2F2F"
          strokeWidth="2"
        />
        <text
          x="80"
          y="196"
          textAnchor="middle"
          fill="#7A7A7A"
          fontSize="7"
          fontFamily="'JetBrains Mono', monospace"
          letterSpacing="2"
        >
          SELECT
        </text>
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <circle
              key={`${row}-${col}`}
              cx={44 + col * 22}
              cy={210 + row * 12}
              r="4"
              fill="#FFF7EF"
              stroke="#EADFD4"
              strokeWidth="1"
            />
          )),
        )}

        {/* coin slot */}
        <rect
          x="142"
          y="180"
          width="46"
          height="12"
          rx="6"
          fill="#FFFFFF"
          stroke="#2F2F2F"
          strokeWidth="2"
        />
        <rect x="156" y="184" width="18" height="4" rx="2" fill="#2F2F2F" />

        {/* receive area */}
        <rect
          x="142"
          y="200"
          width="46"
          height="42"
          rx="8"
          fill="#FFFFFF"
          stroke="#2F2F2F"
          strokeWidth="2"
        />
        <text
          x="165"
          y="218"
          textAnchor="middle"
          fill="#67996C"
          fontSize="7"
          fontFamily="'JetBrains Mono', monospace"
          letterSpacing="1.6"
          fontWeight="700"
        >
          RECEIVE
        </text>
        <rect x="150" y="225" width="30" height="10" rx="2" fill="#7BAE7F" />

        {/* slot */}
        <rect
          x="30"
          y="256"
          width="160"
          height="36"
          rx="8"
          fill="#FFFFFF"
          stroke="#2F2F2F"
          strokeWidth="2"
        />
        <rect x="50" y="266" width="120" height="16" rx="2" fill="#2F2F2F" />
        <text
          x="110"
          y="278.5"
          textAnchor="middle"
          fill="#FFF7EF"
          fontSize="7"
          fontFamily="'JetBrains Mono', monospace"
          letterSpacing="2"
        >
          PUSH FOR A STORY
        </text>
      </svg>
    </div>
  );
}

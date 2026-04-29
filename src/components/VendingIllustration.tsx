interface Props {
  className?: string;
}

/**
 * 괜찮아 Box — a friendly paper-box illustration.
 * Replaces the old "red balls in a grid" look with anonymous story cards
 * (slightly tilted note slips) sitting on warm cream shelves. Feels like a
 * cardboard prototype, not a real industrial vending machine.
 */
export function VendingIllustration({ className = "" }: Props) {
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      {/* floating accents */}
      <span
        className="anim-ball-float absolute -left-2 top-8 h-3.5 w-3.5 rounded-full bg-blush opacity-80"
        style={{ animationDelay: "0s" }}
      />
      <span
        className="anim-ball-float absolute -right-3 top-20 h-5 w-5 rounded-full bg-matcha/70 opacity-90"
        style={{ animationDelay: "1.2s" }}
      />
      <span
        className="anim-ball-float absolute -left-5 bottom-16 h-2.5 w-2.5 rounded-full bg-blush opacity-70"
        style={{ animationDelay: "2.4s" }}
      />
      <span
        className="anim-ball-float absolute -right-1 bottom-24 h-3 w-3 rounded-full bg-blush/70 opacity-80"
        style={{ animationDelay: "0.8s" }}
      />

      <svg
        viewBox="0 0 240 372"
        className="h-auto w-full max-w-[280px] drop-shadow-[0_24px_40px_rgba(47,47,47,0.12)]"
      >
        <defs>
          <linearGradient id="cabinet" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFF7EF" />
            <stop offset="100%" stopColor="#F1E3CE" />
          </linearGradient>
          <linearGradient id="window" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFDF8" />
            <stop offset="100%" stopColor="#F8EFDD" />
          </linearGradient>
          <linearGradient id="cardA" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFF6EE" />
          </linearGradient>
          <linearGradient id="cardB" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFF1F2" />
            <stop offset="100%" stopColor="#FBE2E5" />
          </linearGradient>
          <linearGradient id="cardC" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F1F6EE" />
            <stop offset="100%" stopColor="#DCEAD8" />
          </linearGradient>
        </defs>

        {/* ground shadow */}
        <ellipse cx="120" cy="364" rx="86" ry="4" fill="rgba(47,47,47,0.10)" />

        {/* cabinet body — soft rounded box */}
        <rect
          x="22"
          y="14"
          width="196"
          height="304"
          rx="22"
          fill="url(#cabinet)"
          stroke="#2F2F2F"
          strokeWidth="2.5"
        />

        {/* tape strip top-left, like a cardboard box */}
        <rect
          x="34"
          y="8"
          width="46"
          height="14"
          rx="2"
          fill="#F2D9B6"
          opacity="0.7"
          stroke="#D9BE94"
          strokeWidth="0.8"
          transform="rotate(-6 57 15)"
        />

        {/* header band */}
        <rect x="34" y="26" width="172" height="32" rx="10" fill="#7BAE7F" />
        {/* Korean name (display) — visually dominant */}
        <text
          x="120"
          y="46"
          textAnchor="middle"
          fill="#FFF7EF"
          fontFamily="'Fraunces', 'Noto Sans KR', serif"
          fontWeight="600"
        >
          <tspan fontSize="18" letterSpacing="0.6">괜찮아</tspan>
          <tspan fontSize="14" letterSpacing="0.6" dx="4" fontStyle="italic" fontWeight="500">Box</tspan>
        </text>
        <text
          x="120"
          y="55"
          textAnchor="middle"
          fill="#E8F1E5"
          fontSize="5"
          fontFamily="'JetBrains Mono', monospace"
          letterSpacing="2.6"
        >
          GWAENCHANA BOX
        </text>

        {/* tagline — under the green band */}
        <text
          x="120"
          y="66"
          textAnchor="middle"
          fill="#7A7A7A"
          fontSize="5.6"
          fontFamily="'Fraunces', serif"
          fontStyle="italic"
        >
          Share a failure. Receive a little courage.
        </text>

        {/* window frame */}
        <rect
          x="34"
          y="74"
          width="172"
          height="132"
          rx="12"
          fill="url(#window)"
          stroke="#2F2F2F"
          strokeWidth="2"
        />
        {/* glass highlight */}
        <rect
          x="40"
          y="79"
          width="40"
          height="6"
          rx="3"
          fill="#FFFFFF"
          opacity="0.7"
        />

        {/* shelves */}
        <line x1="38" y1="116" x2="202" y2="116" stroke="#E2D2B8" strokeWidth="1.5" />
        <line x1="38" y1="160" x2="202" y2="160" stroke="#E2D2B8" strokeWidth="1.5" />

        {/* === story cards on shelves === */}
        {/* shelf 1 */}
        <StoryCardSvg x={48} y={80} rotate={-4} fill="url(#cardA)" stamp="#E85D75" />
        <StoryCardSvg x={96} y={82} rotate={2} fill="url(#cardB)" stamp="#7BAE7F" />
        <StoryCardSvg x={144} y={80} rotate={-2} fill="url(#cardC)" stamp="#E85D75" />

        {/* shelf 2 */}
        <StoryCardSvg x={50} y={124} rotate={3} fill="url(#cardB)" stamp="#7BAE7F" />
        <StoryCardSvg x={98} y={122} rotate={-3} fill="url(#cardA)" stamp="#E85D75" />
        <StoryCardSvg x={146} y={124} rotate={4} fill="url(#cardA)" stamp="#7BAE7F" />

        {/* shelf 3 — one falling/highlighted */}
        <StoryCardSvg x={52} y={168} rotate={-2} fill="url(#cardA)" stamp="#E85D75" />
        <StoryCardSvg x={100} y={170} rotate={5} fill="url(#cardC)" stamp="#7BAE7F" />
        <StoryCardSvg
          x={150}
          y={166}
          rotate={-6}
          fill="url(#cardB)"
          stamp="#E85D75"
          highlight
        />

        {/* === lower controls === */}
        {/* keypad / select */}
        <rect
          x="34"
          y="218"
          width="110"
          height="64"
          rx="10"
          fill="#FFFDF8"
          stroke="#2F2F2F"
          strokeWidth="2"
        />
        <text
          x="89"
          y="234"
          textAnchor="middle"
          fill="#7A7A7A"
          fontSize="7"
          fontFamily="'Fraunces', serif"
          fontStyle="italic"
          letterSpacing="0.6"
        >
          Pick a Story
        </text>
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => {
            const isCenter = row === 1 && col === 1;
            return (
              <g key={`${row}-${col}`}>
                <circle
                  cx={52 + col * 24}
                  cy={250 + row * 12}
                  r="4.5"
                  fill={isCenter ? "#E85D75" : "#FFF7EF"}
                  stroke={isCenter ? "#C94A60" : "#E2D2B8"}
                  strokeWidth="1"
                />
                {isCenter && (
                  <circle
                    cx={50.5 + col * 24}
                    cy={248.5 + row * 12}
                    r="1.4"
                    fill="rgba(255,255,255,0.6)"
                  />
                )}
              </g>
            );
          }),
        )}

        {/* coin slot */}
        <rect
          x="156"
          y="218"
          width="50"
          height="14"
          rx="7"
          fill="#FFFDF8"
          stroke="#2F2F2F"
          strokeWidth="2"
        />
        <rect x="170" y="222" width="22" height="6" rx="3" fill="#2F2F2F" />

        {/* receive button */}
        <rect
          x="156"
          y="238"
          width="50"
          height="44"
          rx="10"
          fill="#FFFDF8"
          stroke="#2F2F2F"
          strokeWidth="2"
        />
        <text
          x="181"
          y="254"
          textAnchor="middle"
          fill="#4F7E54"
          fontSize="6.2"
          fontFamily="'Fraunces', serif"
          fontStyle="italic"
          fontWeight="700"
        >
          Receive Story
        </text>
        <rect
          x="164"
          y="261"
          width="34"
          height="14"
          rx="4"
          fill="#7BAE7F"
          stroke="#5A8A5F"
          strokeWidth="1"
        />
        {/* tiny shine on receive button */}
        <rect x="167" y="263" width="10" height="2" rx="1" fill="rgba(255,255,255,0.55)" />

        {/* drop slot label */}
        <text
          x="80"
          y="290"
          textAnchor="middle"
          fill="#7A7A7A"
          fontSize="6.4"
          fontFamily="'Fraunces', serif"
          fontStyle="italic"
        >
          Drop Your Story ↓
        </text>

        {/* receive slot at bottom */}
        <rect x="34" y="294" width="172" height="14" rx="4" fill="#2F2F2F" />
        <rect x="40" y="298" width="160" height="6" rx="2" fill="#1A1A1A" />
        {/* a story card peeking out of the slot */}
        <g transform="translate(150 290) rotate(8)">
          <rect
            x="0"
            y="0"
            width="36"
            height="14"
            rx="2"
            fill="#FFFFFF"
            stroke="#2F2F2F"
            strokeWidth="1.2"
          />
          <line x1="4" y1="5" x2="28" y2="5" stroke="#E2D2B8" strokeWidth="1" />
          <line x1="4" y1="9" x2="22" y2="9" stroke="#E2D2B8" strokeWidth="1" />
          <circle cx="32" cy="3" r="1.6" fill="#E85D75" />
        </g>

        {/* QR sticker — tilted, taped to lower-left of cabinet */}
        <g transform="translate(36 320) rotate(-6)">
          {/* tape */}
          <rect
            x="14"
            y="-4"
            width="20"
            height="6"
            rx="1"
            fill="#F2D9B6"
            opacity="0.75"
            stroke="#D9BE94"
            strokeWidth="0.6"
          />
          {/* sticker card */}
          <rect
            x="0"
            y="0"
            width="78"
            height="32"
            rx="4"
            fill="#FFFDF8"
            stroke="#2F2F2F"
            strokeWidth="1.2"
          />
          {/* mini QR */}
          <rect x="5" y="5" width="22" height="22" rx="1.5" fill="#FFFFFF" stroke="#2F2F2F" strokeWidth="0.8" />
          {/* corner finder squares */}
          <rect x="6.5" y="6.5" width="6" height="6" fill="#2F2F2F" />
          <rect x="8" y="8" width="3" height="3" fill="#FFFFFF" />
          <rect x="19.5" y="6.5" width="6" height="6" fill="#2F2F2F" />
          <rect x="21" y="8" width="3" height="3" fill="#FFFFFF" />
          <rect x="6.5" y="19.5" width="6" height="6" fill="#2F2F2F" />
          <rect x="8" y="21" width="3" height="3" fill="#FFFFFF" />
          {/* speckled dots inside */}
          <rect x="14" y="7" width="1.6" height="1.6" fill="#2F2F2F" />
          <rect x="16" y="9" width="1.6" height="1.6" fill="#2F2F2F" />
          <rect x="14" y="11" width="1.6" height="1.6" fill="#2F2F2F" />
          <rect x="17" y="13" width="1.6" height="1.6" fill="#2F2F2F" />
          <rect x="14" y="15" width="1.6" height="1.6" fill="#2F2F2F" />
          <rect x="17" y="17" width="1.6" height="1.6" fill="#2F2F2F" />
          <rect x="14" y="20" width="1.6" height="1.6" fill="#2F2F2F" />
          <rect x="20" y="20" width="1.6" height="1.6" fill="#2F2F2F" />
          <rect x="22" y="22" width="1.6" height="1.6" fill="#2F2F2F" />
          <rect x="19" y="15" width="1.6" height="1.6" fill="#2F2F2F" />
          <rect x="22" y="14" width="1.6" height="1.6" fill="#2F2F2F" />
          {/* label text */}
          <text
            x="32"
            y="13"
            fill="#4F7E54"
            fontSize="5"
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="1.2"
            fontWeight="700"
          >
            SCAN ME
          </text>
          <text
            x="32"
            y="21"
            fill="#7A7A7A"
            fontSize="4.4"
            fontFamily="'Fraunces', serif"
            fontStyle="italic"
          >
            Share
          </text>
          <text
            x="32"
            y="27"
            fill="#7A7A7A"
            fontSize="4.4"
            fontFamily="'Fraunces', serif"
            fontStyle="italic"
          >
            anonymously
          </text>
        </g>
      </svg>
    </div>
  );
}

interface StoryCardSvgProps {
  x: number;
  y: number;
  rotate?: number;
  fill: string;
  stamp: string;
  highlight?: boolean;
}

/** A small tilted "story note" card sitting on a shelf. */
function StoryCardSvg({
  x,
  y,
  rotate = 0,
  fill,
  stamp,
  highlight = false,
}: StoryCardSvgProps) {
  const w = 36;
  const h = 30;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate} ${w / 2} ${h / 2})`}>
      {/* drop shadow */}
      <rect
        x="1.5"
        y="2.5"
        width={w}
        height={h}
        rx="3"
        fill="rgba(47,47,47,0.10)"
      />
      {/* card */}
      <rect
        x="0"
        y="0"
        width={w}
        height={h}
        rx="3"
        fill={fill}
        stroke={highlight ? "#E85D75" : "#2F2F2F"}
        strokeWidth={highlight ? 1.6 : 1.1}
      />
      {/* corner stamp dot */}
      <circle cx={w - 4} cy={4} r="1.8" fill={stamp} />
      {/* writing lines */}
      <line x1="4" y1="10" x2={w - 8} y2="10" stroke="#C9B698" strokeWidth="0.9" />
      <line x1="4" y1="15" x2={w - 4} y2="15" stroke="#D9C8AE" strokeWidth="0.9" />
      <line x1="4" y1="20" x2={w - 12} y2="20" stroke="#D9C8AE" strokeWidth="0.9" />
      <line x1="4" y1="25" x2={w - 6} y2="25" stroke="#D9C8AE" strokeWidth="0.9" />
    </g>
  );
}

const INK = "var(--color-ink)";
const SURFACE = "var(--color-surface)";
const LINE = "var(--color-line)";
const PAPER = "var(--color-paper)";
const ACCENT = "var(--color-accent)";
const FONT = "var(--font-display), sans-serif";

/** 0: Fieldnote Coffee. A cup seen from above, coffee rings, and a delivery calendar. */
function Coffee() {
  return (
    <>
      <circle
        cx="330"
        cy="290"
        r="200"
        fill="none"
        stroke={LINE}
        strokeWidth="2"
      />
      <circle
        cx="345"
        cy="300"
        r="185"
        fill="none"
        stroke={LINE}
        strokeWidth="2"
        strokeDasharray="6 10"
      />
      <circle cx="400" cy="290" r="165" fill={PAPER} />
      <circle cx="400" cy="290" r="132" fill={INK} />
      <circle cx="400" cy="290" r="110" fill={ACCENT} />
      <path
        d="M400 180 A110 110 0 0 1 510 290"
        fill="none"
        stroke={INK}
        strokeWidth="6"
        opacity=".25"
      />
      <rect x="560" y="268" width="120" height="44" rx="22" fill={PAPER} />
      {/* 12 delivery days, one highlighted */}
      {Array.from({ length: 12 }, (_, n) => (
        <rect
          key={n}
          x={100 + n * 52}
          y={n === 8 ? 504 : 516}
          width="8"
          height={n === 8 ? 52 : 40}
          fill={n === 8 ? ACCENT : PAPER}
          opacity={n === 8 ? 1 : 0.55}
        />
      ))}
    </>
  );
}

/** 1: Altura Fitness. Cost per signup falling bar by bar, from $38 to $14. */
function Falling() {
  const costs = [38, 33, 27, 22, 18, 14];
  return (
    <>
      <line x1="90" y1="500" x2="710" y2="500" stroke={PAPER} strokeWidth="2" />
      {costs.map((c, n) => {
        const h = c * 9.5;
        const last = n === costs.length - 1;
        return (
          <rect
            key={c}
            x={110 + n * 100}
            y={500 - h}
            width="70"
            height={h}
            fill={last ? ACCENT : LINE}
          />
        );
      })}
      <path
        d="M145 140 L645 300"
        fill="none"
        stroke={PAPER}
        strokeWidth="2"
        strokeDasharray="4 10"
      />
      <circle cx="145" cy="140" r="9" fill={PAPER} />
      <circle cx="645" cy="300" r="14" fill={ACCENT} />
      <text
        x="120"
        y="110"
        fill={PAPER}
        fontFamily={FONT}
        fontSize="40"
        fontWeight="800"
      >
        $38
      </text>
      <text
        x="600"
        y="262"
        fill={ACCENT}
        fontFamily={FONT}
        fontSize="56"
        fontWeight="800"
      >
        $14
      </text>
    </>
  );
}

/** 2: Halcyon Bank. A calm, three-step account opening card. */
function Flow() {
  return (
    <>
      <circle
        cx="400"
        cy="300"
        r="250"
        fill="none"
        stroke={LINE}
        strokeWidth="2"
      />
      <rect x="220" y="90" width="360" height="420" fill={PAPER} />
      <line x1="270" y1="140" x2="530" y2="140" stroke={LINE} strokeWidth="3" />
      <line
        x1="270"
        y1="140"
        x2="400"
        y2="140"
        stroke={ACCENT}
        strokeWidth="3"
      />
      {[270, 400, 530].map((x, n) => (
        <circle
          key={x}
          cx={x}
          cy="140"
          r="11"
          fill={n < 2 ? ACCENT : PAPER}
          stroke={n < 2 ? ACCENT : INK}
          strokeWidth="2"
        />
      ))}
      <rect x="270" y="196" width="140" height="18" fill={INK} />
      {[250, 322, 394].map((y) => (
        <rect
          key={y}
          x="270"
          y={y}
          width="260"
          height="48"
          fill="none"
          stroke={INK}
          strokeWidth="2"
          opacity=".35"
        />
      ))}
      <rect x="270" y="296" width="150" height="14" fill={INK} opacity=".35" />
      <rect x="270" y="440" width="260" height="46" fill={INK} />
      <path
        d="M390 464 l12 12 l24 -24"
        fill="none"
        stroke={ACCENT}
        strokeWidth="5"
      />
    </>
  );
}

/** 3: Tidewater Travel. Rising tide layers with a traffic line climbing to 120k. */
function Tide() {
  const wave = (y: number) =>
    `M0 ${y} Q100 ${y - 50} 200 ${y} T400 ${y} T600 ${y} T800 ${y} V600 H0Z`;
  return (
    <>
      <path d={wave(430)} fill={LINE} opacity=".6" />
      <path d={wave(470)} fill={PAPER} opacity=".9" />
      <path d={wave(520)} fill={ACCENT} />
      <polyline
        points="90,400 230,360 360,330 480,230 600,170 700,110"
        fill="none"
        stroke={PAPER}
        strokeWidth="3"
      />
      {[
        [90, 400],
        [230, 360],
        [360, 330],
        [480, 230],
        [600, 170],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="6" fill={PAPER} />
      ))}
      <circle cx="700" cy="110" r="14" fill={ACCENT} />
      <text
        x="90"
        y="480"
        fill={INK}
        fontFamily={FONT}
        fontSize="30"
        fontWeight="800"
      >
        8k
      </text>
      <text
        x="610"
        y="115"
        fill={PAPER}
        fontFamily={FONT}
        fontSize="56"
        fontWeight="800"
        textAnchor="middle"
      >
        120k
      </text>
    </>
  );
}

const scenes = [Coffee, Falling, Flow, Tide];

export default function ProjectArt({ i, label }: { i: number; label: string }) {
  const Scene = scenes[i % scenes.length];
  const grid = `art-grid-${i}`;
  return (
    <svg
      role="img"
      aria-label={`${label} artwork`}
      viewBox="0 0 800 600"
      className="size-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <pattern id={grid} width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M40 0H0V40"
            fill="none"
            stroke={LINE}
            strokeWidth="1"
            opacity=".5"
          />
        </pattern>
      </defs>
      <rect x="-800" y="-600" width="2400" height="1800" fill={SURFACE} />
      <rect
        x="-800"
        y="-600"
        width="2400"
        height="1800"
        fill={`url(#${grid})`}
      />
      <g
        aria-hidden
        transform="translate(400 300) scale(0.86) translate(-400 -300)"
      >
        <Scene />
      </g>
    </svg>
  );
}

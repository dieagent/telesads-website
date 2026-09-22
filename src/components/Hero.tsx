import { links } from "@/lib/content";

const ticker = [
  "Telegram Advertising",
  "Audience Acquisition",
  "Meta & Instagram",
  "Google Ads",
  "Creative Production",
  "Growth Consulting",
  "Bot Development",
  "Automation & AI",
];

/* Deterministic pseudo-random so server and client render identically. */
function prng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

/** Convergence field: scattered nodes on the left resolve into an aligned
 *  column on the right. Drawn, not photographed. */
function Convergence() {
  const rand = prng(7);
  const dots: { x: number; y: number; r: number; o: number }[] = [];

  for (let i = 0; i < 190; i++) {
    const t = i / 189;
    const x = 4 + Math.pow(t, 0.72) * 92;
    const spread = (1 - t) ** 1.7 * 46;
    const y = 50 + (rand() - 0.5) * 2 * spread;
    dots.push({
      x: x + (rand() - 0.5) * 5,
      y,
      r: 0.18 + rand() * 0.42 + t * 0.34,
      o: 0.14 + t * 0.78 - (rand() * 0.18),
    });
  }

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="beam" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#ff5c00" stopOpacity="0" />
          <stop offset="62%" stopColor="#ff5c00" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ffb07a" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="hair" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#ff5c00" stopOpacity="0" />
          <stop offset="100%" stopColor="#ff5c00" stopOpacity="0.32" />
        </linearGradient>
      </defs>

      {/* guide hairlines collapsing toward the axis */}
      {Array.from({ length: 9 }, (_, i) => {
        const off = (i - 4) * 9.5;
        return (
          <path
            key={i}
            d={`M2 ${50 + off} C 42 ${50 + off * 0.82}, 68 ${50 + off * 0.16}, 99 50`}
            fill="none"
            stroke="url(#hair)"
            strokeWidth="0.16"
            vectorEffect="non-scaling-stroke"
          />
        );
      })}

      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#ff5c00" opacity={Math.max(0, d.o)} />
      ))}

      <rect x="60" y="49.78" width="40" height="0.44" fill="url(#beam)" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* engineered backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(245,245,243,0.05) 1px, transparent 1px)",
            backgroundSize: "calc(100% / 6) 100%",
          }}
        />
        <div className="absolute inset-y-0 right-0 hidden w-[46%] opacity-90 lg:block">
          <Convergence />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 8% 40%, #080808 34%, rgba(8,8,8,0.86) 58%, rgba(8,8,8,0.4) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-6 pb-24 pt-32 lg:px-10">
        <p className="label mb-9 flex items-center gap-3">
          <span className="inline-block h-px w-10 bg-accent" aria-hidden="true" />
          Telegram Advertising &amp; Digital Growth
        </p>

        <h1 className="display text-[clamp(2.9rem,9.6vw,9rem)]">
          <span className="block">Your gateway</span>
          <span className="block">
            to <span className="serif text-accent">Telegram</span> growth
          </span>
        </h1>

        <div className="mt-14 grid gap-10 border-t border-line pt-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
          <p className="max-w-[44ch] text-[15.5px] leading-[1.65] text-muted">
            We build targeted advertising and automation for the businesses that live on Telegram —
            trading, crypto, Web3, creator, SaaS and online-commerce communities. Real audience
            research, disciplined creative testing, honest reporting.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#brief"
              className="rounded-full bg-paper px-7 py-3.5 text-[14px] font-medium text-bg transition-transform duration-150 active:scale-[0.97]"
              style={{ transitionTimingFunction: "var(--ease-out)" }}
            >
              Start a Campaign
            </a>
            <a
              href={links.channel}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-line px-7 py-3.5 text-[14px] font-medium transition-colors duration-200 hover:border-ink/30 hover:bg-white/[0.04]"
            >
              View Channel
            </a>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden border-t border-line py-3.5">
        <div className="flex" aria-hidden="true">
          <div className="drift flex shrink-0">
            {[...ticker, ...ticker].map((t, i) => (
              <span key={i} className="label flex items-center whitespace-nowrap px-6">
                {t}
                <span className="ml-6 text-accent">/</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

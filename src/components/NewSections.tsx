"use client";

import Link from "next/link";
import { Globe, type GlobeMarker, type GlobeArc } from "./ui/cobe-globe";
import { Reveal } from "./Reveal";
import { TiltCard, Parallax, SplitText, PinnedTrack } from "./Depth";
import { Stat } from "./Visuals";
import { services, audiences } from "@/lib/content";

/* ==================================================== GLOBAL REACH (3D) */

/* Module-level so the references stay stable across renders and the
   globe's WebGL context is never torn down and rebuilt. */
const REACH_MARKERS: GlobeMarker[] = [
  { id: "mumbai", location: [19.076, 72.8777], label: "Mumbai" },
  { id: "surat", location: [21.1702, 72.8311], label: "Surat" },
  { id: "delhi", location: [28.6139, 77.209], label: "Delhi" },
  { id: "dubai", location: [25.2048, 55.2708], label: "Dubai" },
  { id: "abudhabi", location: [24.4539, 54.3773], label: "Abu Dhabi" },
  { id: "london", location: [51.5074, -0.1278], label: "London" },
  { id: "newyork", location: [40.7128, -74.006], label: "New York" },
  { id: "singapore", location: [1.3521, 103.8198], label: "Singapore" },
  { id: "istanbul", location: [41.0082, 28.9784], label: "Istanbul" },
  { id: "kyiv", location: [50.4501, 30.5234], label: "Kyiv" },
  { id: "saopaulo", location: [-23.5505, -46.6333], label: "S\u00e3o Paulo" },
  { id: "lagos", location: [6.5244, 3.3792], label: "Lagos" },
];

const REACH_ARCS: GlobeArc[] = [
  {
    id: "mumbai-dubai",
    from: [19.076, 72.8777],
    to: [25.2048, 55.2708],
    label: "India \u2192 UAE",
  },
  { id: "dubai-london", from: [25.2048, 55.2708], to: [51.5074, -0.1278] },
  { id: "dubai-singapore", from: [25.2048, 55.2708], to: [1.3521, 103.8198] },
  { id: "london-newyork", from: [51.5074, -0.1278], to: [40.7128, -74.006] },
  { id: "mumbai-istanbul", from: [19.076, 72.8777], to: [41.0082, 28.9784] },
];

export function Reach() {
  return (
    <section className="relative overflow-hidden px-6 py-28 lg:px-10 lg:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.09] blur-[160px]"
        style={{ background: "var(--accent)" }}
      />
      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
          <div>
            <Reveal>
              <p className="label">
                <span className="text-accent">04</span> &nbsp;/&nbsp; Reach
              </p>
            </Reveal>
            <h2 className="display mt-7 text-[clamp(2.2rem,5.4vw,4.2rem)]">
              <SplitText text="Audiences" />
              <br />
              <span className="serif text-accent">
                <SplitText text="without borders" delay={180} />
              </span>
            </h2>
            <Reveal delay={120}>
              <p className="mt-7 max-w-[42ch] text-[15px] leading-[1.65] text-muted">
                India and UAE representation, international client focus. Telegram is a borderless
                network &mdash; campaigns are planned around where your audience actually is, not
                where the agency happens to sit.
              </p>
              <p className="label mt-8 flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                Drag to spin &nbsp;&middot;&nbsp; markers label on approach
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-line pt-8">
              <Stat to={24} suffix="/7" label="Automation runs continuously" />
              <Stat to={9} label="Sectors served" />
              <Stat to={7} label="Disciplines" />
            </div>
          </div>

          <div className="relative w-full">
            <Globe markers={REACH_MARKERS} arcs={REACH_ARCS} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ======================================= HORIZONTAL PINNED SERVICE TRACK */

export function ServiceTrack() {
  return (
    <section className="relative border-y border-line">
      <div className="pointer-events-none absolute left-0 top-0 z-10 px-6 pt-14 lg:px-10">
        <p className="label">
          <span className="text-accent">03</span> &nbsp;/&nbsp; Services &nbsp;—&nbsp; scroll
        </p>
      </div>

      <PinnedTrack>
        {services.map((s, i) => (
          <TiltCard key={s.id} className="track-card">
            <Link href={`/services#${s.id}`} className="block h-full">
              <div className="tilt-inner flex h-[440px] flex-col rounded-2xl border border-line bg-[#0c0c0d] p-8 transition-colors duration-300 hover:border-accent/30">
                <div className="flex items-baseline justify-between">
                  <span className="label tnum">{String(i + 1).padStart(2, "0")}</span>
                  <span
                    className="stroke-txt text-[56px] font-medium leading-none"
                    aria-hidden="true"
                  >
                    {s.label}
                  </span>
                </div>
                <h3 className="mt-6 text-[26px] font-medium leading-[1.06] tracking-[-0.03em]">
                  {s.title}
                </h3>
                <p className="mt-4 text-[14px] leading-[1.6] text-muted">{s.summary}</p>
                <ul className="mt-auto space-y-1.5 border-t border-line pt-5">
                  {s.points.slice(0, 4).map((p) => (
                    <li key={p} className="flex gap-2.5 text-[12.5px] text-dim">
                      <span className="text-accent" aria-hidden="true">·</span>
                      <span className="min-w-0">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          </TiltCard>
        ))}

        <div className="track-card flex h-[440px] items-center">
          <Link
            href="/services"
            className="group flex size-full flex-col justify-between rounded-2xl border border-accent/30 bg-accent/[0.06] p-8"
          >
            <span className="label text-accent">All seven</span>
            <div>
              <p className="display text-[34px] leading-[1.05]">
                See every
                <br />
                discipline
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-[14px] font-medium">
                Open services
                <span className="idx-arrow text-accent" aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        </div>
      </PinnedTrack>
    </section>
  );
}

/* ================================================== SECTOR TILT MOSAIC */

export function SectorMosaic() {
  return (
    <section className="relative overflow-hidden px-6 py-28 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <Reveal>
            <p className="label">
              <span className="text-accent">05</span> &nbsp;/&nbsp; Sectors
            </p>
            <h2 className="display mt-7 text-[clamp(2.2rem,5.4vw,4.2rem)]">
              Niches most
              <br />
              agencies <span className="serif text-accent">decline</span>.
            </h2>
          </Reveal>
          <Reveal delay={90}>
            <p className="max-w-[44ch] text-[15px] leading-[1.65] text-muted lg:pb-3">
              Trading, crypto, arbitrage and speculative communities are hard to advertise well and
              easy to advertise badly. We take them on — only where the offer is lawful and
              compliant with platform rules and local advertising policy.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((a, i) => (
            <Reveal key={a.title} delay={(i % 3) * 70}>
              <TiltCard strength={7}>
                <article className="tilt-inner h-full rounded-2xl border border-line bg-[#0c0c0d] p-7 transition-colors duration-300 hover:border-accent/25">
                  <div className="flex items-baseline gap-3">
                    <span className="label tnum text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[17px] font-medium tracking-[-0.015em]">{a.title}</h3>
                  </div>
                  <p className="mt-3.5 text-[13.5px] leading-[1.6] text-muted">
                    {a.items.join(" · ")}
                  </p>
                  {"note" in a && a.note ? (
                    <p className="mt-4 flex gap-2 border-t border-line pt-3 text-[12px] leading-[1.55] text-dim">
                      <span className="text-accent" aria-hidden="true">⚑</span>
                      {a.note}
                    </p>
                  ) : null}
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ======================================================= PARALLAX QUOTE */

export function BigQuote() {
  return (
    <section className="relative overflow-hidden py-32 lg:py-44">
      <Parallax speed={0.14}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center"
        >
          <p className="display stroke-txt whitespace-nowrap text-[clamp(6rem,22vw,20rem)] leading-none opacity-40">
            NO GUESSWORK
          </p>
        </div>
      </Parallax>

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal>
          <blockquote className="mx-auto max-w-[24ch] text-center">
            <p className="serif grad-ink text-[clamp(1.6rem,4.4vw,3.4rem)] leading-[1.24]">
              Reach without relevance is waste. Placement is decided by research.
            </p>
            <footer className="label mt-8">TELES ADS — Operating Value</footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}

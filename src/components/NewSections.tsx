"use client";

import Link from "next/link";
import Globe from "./Globe";
import { Reveal } from "./Reveal";
import { TiltCard, Parallax, SplitText } from "./Depth";
import { ArrowUpRight } from "lucide-react";
import { MagicCard, NumberTicker } from "./ui/effects";
import { services, audiences } from "@/lib/content";

/* ==================================================== GLOBAL REACH (3D) */

export function Reach() {
  return (
    <section className="relative overflow-hidden px-6 py-28 lg:px-10 lg:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.11] blur-[150px]"
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
                network — campaigns are planned around where your audience actually is, not where
                the agency happens to sit.
              </p>
              <p className="label mt-8 flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                Drag the globe to spin it
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-line pt-8">
              {[
                { v: 24, s: "/7", l: "Automation runs continuously" },
                { v: 9, s: "", l: "Sectors served" },
                { v: 7, s: "", l: "Disciplines" },
              ].map((x) => (
                <div key={x.l}>
                  <p className="text-[clamp(1.9rem,3.4vw,2.8rem)] font-medium leading-none tracking-[-0.04em]">
                    <NumberTicker value={x.v} suffix={x.s} />
                  </p>
                  <p className="mt-2.5 max-w-[18ch] text-[12.5px] leading-[1.45] text-muted">{x.l}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-square w-full cursor-grab active:cursor-grabbing">
            <Globe />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================= SERVICE LIST (magic cards) */

export function ServiceList() {
  return (
    <section className="relative px-6 py-28 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <Reveal>
            <p className="label">
              <span className="text-accent">03</span> &nbsp;/&nbsp; Services
            </p>
            <h2 className="display mt-7 text-[clamp(2.2rem,5.4vw,4.2rem)]">
              Seven disciplines,
              <br />
              one <span className="serif text-accent">objective</span>.
            </h2>
          </Reveal>
          <Reveal delay={90}>
            <p className="max-w-[44ch] text-[15px] leading-[1.65] text-muted lg:pb-3">
              Telegram advertising is the specialization. Everything else feeds it — the creative
              that earns the click, the traffic that fills the funnel, the automation that holds
              the community once it arrives.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 60}>
              <MagicCard className="bento-cell h-full">
                <Link href={`/services#${s.id}`} className="flex h-full flex-col p-7">
                  <div className="flex items-baseline justify-between">
                    <span className="label tnum">{String(i + 1).padStart(2, "0")}</span>
                    <span className="stroke-txt text-[42px] font-medium leading-none" aria-hidden="true">
                      {s.label}
                    </span>
                  </div>
                  <h3 className="mt-5 text-[20px] font-medium leading-[1.1] tracking-[-0.025em]">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-[1.6] text-muted">{s.summary}</p>
                  <ul className="mt-auto space-y-1.5 border-t border-line pt-5">
                    {s.points.slice(0, 3).map((p) => (
                      <li key={p} className="flex gap-2.5 text-[12.5px] text-dim">
                        <span className="text-accent" aria-hidden="true">·</span>
                        <span className="min-w-0">{p}</span>
                      </li>
                    ))}
                  </ul>
                </Link>
              </MagicCard>
            </Reveal>
          ))}

          <Reveal delay={120}>
            <Link
              href="/services"
              className="flex h-full min-h-[240px] flex-col justify-between rounded-[20px] border border-accent/30 bg-accent/[0.06] p-7 transition-colors duration-300 hover:bg-accent/[0.1]"
            >
              <span className="label text-accent">All seven</span>
              <div>
                <p className="display text-[28px] leading-[1.06]">
                  See every
                  <br />
                  discipline
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-[14px] font-medium">
                  Open services
                  <ArrowUpRight className="size-4 text-accent" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
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

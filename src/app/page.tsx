import Link from "next/link";
import Hero from "@/components/Hero";
import { Statement } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";
import { NextStep } from "@/components/Page";
import { portfolio } from "@/lib/content";
import { GrowthChart, FunnelViz, Stat, ScrollSkew } from "@/components/Visuals";
import { Reach, ServiceTrack, SectorMosaic, BigQuote } from "@/components/NewSections";
import AgentChat from "@/components/AgentChat";

/** Scroll-driven oversized marquee. */
function SkewBand() {
  return (
    <section className="overflow-hidden border-y border-line py-10 lg:py-16">
      <ScrollSkew>
        <p
          className="display whitespace-nowrap text-[clamp(3rem,11vw,10rem)] leading-none"
          aria-hidden="true"
        >
          <span className="stroke-txt">Targeted</span>{" "}
          <span className="text-accent">·</span>{" "}
          Measured{" "}
          <span className="text-accent">·</span>{" "}
          <span className="stroke-txt">Optimized</span>{" "}
          <span className="text-accent">·</span>{" "}
          Reported
        </p>
      </ScrollSkew>
      <p className="sr-only">Targeted, measured, optimized, reported.</p>
    </section>
  );
}

/** Instrumentation: what we actually measure, drawn as live graphics. */
function Instrumentation() {
  return (
    <section className="relative overflow-hidden px-6 py-28 lg:px-10 lg:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-[10%] size-[520px] rounded-full opacity-[0.10] blur-[130px]"
        style={{ background: "var(--accent)" }}
      />
      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <Reveal>
            <p className="label">
              <span className="text-accent">02</span> &nbsp;/&nbsp; Instrumentation
            </p>
            <h2 className="display mt-7 text-[clamp(2.2rem,5.6vw,4.4rem)]">
              Every campaign
              <br />
              is <span className="serif text-accent">measured</span>.
            </h2>
          </Reveal>
          <Reveal delay={90}>
            <p className="max-w-[44ch] text-[15px] leading-[1.65] text-muted lg:pb-3">
              We instrument the full path — impression to join — and report only what is verifiable.
              Where attribution breaks, we say so rather than filling the gap with a guess.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px border border-line bg-line lg:grid-cols-2">
          <div className="bg-bg p-7 lg:p-10">
            <p className="label">Audience growth curve</p>
            <p className="mt-2 text-[13px] text-dim">Structure of a sustained campaign</p>
            <div className="mt-8">
              <GrowthChart />
            </div>
          </div>
          <div className="bg-bg p-7 lg:p-10">
            <p className="label">Funnel stages instrumented</p>
            <p className="mt-2 text-[13px] text-dim">Where we place measurement</p>
            <div className="mt-8">
              <FunnelViz />
            </div>
          </div>
        </div>

        <div className="mt-px grid gap-px border-x border-b border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {[
            { to: 7, suffix: "", label: "Service disciplines under one roof" },
            { to: 9, suffix: "", label: "Client sectors we actively serve" },
            { to: 14, suffix: "", label: "Reporting metrics available" },
            { to: 8, suffix: "", label: "Stages from discovery to closure" },
          ].map((s, i) => (
            <div key={s.label} className="bg-bg p-7 lg:p-9">
              <Reveal delay={i * 60}>
                <Stat to={s.to} suffix={s.suffix} label={s.label} />
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkTeaser() {
  return (
    <section className="px-6 py-28 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-24">
          <Reveal>
            <p className="label">
              <span className="text-accent">05</span> &nbsp;/&nbsp; Work
            </p>
            <h2 className="display mt-7 text-[clamp(2rem,4.6vw,3.6rem)]">
              Built and
              <br />
              <span className="serif text-accent">shipped</span>.
            </h2>
            <p className="mt-7 max-w-[38ch] text-[15px] leading-[1.65] text-muted">
              Verified project references from our records. We publish only work we have completed
              and are approved to show — no invented clients or case studies.
            </p>
            <Link href="/work" className="sweep mt-8 inline-flex items-center gap-2.5 text-[14px] font-medium">
              View all work <span className="text-accent" aria-hidden="true">→</span>
            </Link>
          </Reveal>

          <ul>
            {portfolio.map((p, i) => (
              <li key={p.handle} className="rule">
                <Reveal delay={i * 50}>
                  <div className="flex min-w-0 items-baseline justify-between gap-4 py-6">
                    <span className="truncate font-mono text-[clamp(0.95rem,1.7vw,1.25rem)]" translate="no">
                      {p.handle}
                    </span>
                    <span className="label shrink-0">{p.kind}</span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <Instrumentation />
      <SkewBand />
      <ServiceTrack />
      <AgentChat />
      <Reach />
      <BigQuote />
      <SectorMosaic />
      <WorkTeaser />
      <NextStep
        label="Start here"
        title="Tell us what you're growing."
        href="/contact"
        cta="Send a brief"
      />
    </>
  );
}

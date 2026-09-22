"use client";

import Link from "next/link";
import { ArrowUpRight, Bot, Globe2, LineChart, Megaphone, Sparkles, Target } from "lucide-react";
import { BorderBeam, MagicCard, Meteors, NumberTicker, BlurFade } from "./ui/effects";
import { GrowthChart, FunnelViz } from "./Visuals";

/**
 * Bento capability grid (Magic UI bento pattern, brand-tuned).
 * Mixed cell sizes so the section reads as designed rather than a card dump.
 */
export default function Bento() {
  return (
    <section className="relative px-6 py-28 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-[1400px]">
        <BlurFade>
          <p className="label">
            <span className="text-accent">02</span> &nbsp;/&nbsp; Capability
          </p>
          <h2 className="display mt-7 max-w-[18ch] text-[clamp(2.2rem,5.4vw,4.2rem)]">
            One team across the whole <span className="serif text-accent">funnel</span>.
          </h2>
        </BlurFade>

        <div className="mt-16 grid auto-rows-[minmax(190px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* ── hero cell: Telegram advertising ── */}
          <BlurFade className="sm:col-span-2 lg:col-span-2 lg:row-span-2" delay={0.05}>
            <MagicCard className="bento-cell h-full">
              <Meteors number={10} />
              <div className="relative flex h-full flex-col p-8">
                <div className="flex items-center gap-2.5">
                  <Megaphone className="size-4 text-accent" aria-hidden="true" />
                  <span className="label">Core discipline</span>
                </div>
                <h3 className="mt-5 text-[clamp(1.5rem,2.6vw,2.1rem)] font-medium leading-[1.08] tracking-[-0.03em]">
                  Telegram advertising,
                  <br />
                  researched not guessed
                </h3>
                <p className="mt-4 max-w-[38ch] text-[14px] leading-[1.62] text-muted">
                  Channel discovery, audience and competitor research decide every placement. We
                  plan, monitor, test creative and optimize across the run.
                </p>
                <div className="mt-auto pt-8">
                  <GrowthChart />
                </div>
              </div>
              <BorderBeam duration={10} />
            </MagicCard>
          </BlurFade>

          {/* ── funnel instrumentation ── */}
          <BlurFade className="sm:col-span-2 lg:row-span-2" delay={0.1}>
            <MagicCard className="bento-cell h-full">
              <div className="flex h-full flex-col p-8">
                <div className="flex items-center gap-2.5">
                  <Target className="size-4 text-accent" aria-hidden="true" />
                  <span className="label">Instrumented</span>
                </div>
                <h3 className="mt-5 text-[19px] font-medium tracking-[-0.02em]">
                  Every stage measured
                </h3>
                <p className="mt-3 text-[13.5px] leading-[1.6] text-muted">
                  We place measurement across the full path and report only what is verifiable.
                </p>
                <div className="mt-auto pt-8">
                  <FunnelViz />
                </div>
              </div>
            </MagicCard>
          </BlurFade>

          {/* ── stat: disciplines ── */}
          <BlurFade delay={0.15}>
            <div className="bento-cell flex h-full flex-col justify-between p-7">
              <Sparkles className="size-4 text-accent" aria-hidden="true" />
              <div>
                <p className="text-[clamp(2.4rem,4vw,3.4rem)] font-medium leading-none tracking-[-0.045em]">
                  <NumberTicker value={7} />
                </p>
                <p className="mt-2.5 text-[13px] leading-[1.45] text-muted">
                  Disciplines under one roof
                </p>
              </div>
            </div>
          </BlurFade>

          {/* ── stat: sectors ── */}
          <BlurFade delay={0.2}>
            <div className="bento-cell flex h-full flex-col justify-between p-7">
              <Globe2 className="size-4 text-accent" aria-hidden="true" />
              <div>
                <p className="text-[clamp(2.4rem,4vw,3.4rem)] font-medium leading-none tracking-[-0.045em]">
                  <NumberTicker value={9} />
                </p>
                <p className="mt-2.5 text-[13px] leading-[1.45] text-muted">
                  Client sectors served
                </p>
              </div>
            </div>
          </BlurFade>

          {/* ── TELES Agent ── */}
          <BlurFade className="sm:col-span-2" delay={0.25}>
            <MagicCard className="bento-cell h-full">
              <Link href="/agent" className="flex h-full flex-col p-7">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <Bot className="size-4 text-accent" aria-hidden="true" />
                    <span className="label">Product</span>
                  </div>
                  <ArrowUpRight className="size-4 text-accent" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-[19px] font-medium tracking-[-0.02em]">TELES Agent</h3>
                <p className="mt-3 max-w-[44ch] text-[13.5px] leading-[1.6] text-muted">
                  An AI assistant and automation layer for campaign workflows, onboarding,
                  qualification and support — so the operational work stops being manual.
                </p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
                  {["Onboarding", "Qualification", "Support", "Reporting"].map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line px-2.5 py-1 text-[11.5px] text-dim"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
              <BorderBeam duration={13} delay={3} />
            </MagicCard>
          </BlurFade>

          {/* ── stat: metrics ── */}
          <BlurFade delay={0.3}>
            <div className="bento-cell flex h-full flex-col justify-between p-7">
              <LineChart className="size-4 text-accent" aria-hidden="true" />
              <div>
                <p className="text-[clamp(2.4rem,4vw,3.4rem)] font-medium leading-none tracking-[-0.045em]">
                  <NumberTicker value={14} />
                </p>
                <p className="mt-2.5 text-[13px] leading-[1.45] text-muted">
                  Reporting metrics available
                </p>
              </div>
            </div>
          </BlurFade>

          {/* ── stat: stages ── */}
          <BlurFade delay={0.35}>
            <Link href="/work" className="block h-full">
              <div className="bento-cell flex h-full flex-col justify-between p-7">
                <div className="flex items-start justify-between">
                  <span className="label">Method</span>
                  <ArrowUpRight className="size-4 text-accent" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[clamp(2.4rem,4vw,3.4rem)] font-medium leading-none tracking-[-0.045em]">
                    <NumberTicker value={8} />
                  </p>
                  <p className="mt-2.5 text-[13px] leading-[1.45] text-muted">
                    Stages, discovery to closure
                  </p>
                </div>
              </div>
            </Link>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}

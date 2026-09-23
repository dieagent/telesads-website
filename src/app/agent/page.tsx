import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { PageHead, NextStep } from "@/components/Page";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/Depth";
import { agentCapabilities, links } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/agent" },
  title: "TELES Agent",
  description:
    "An AI-powered assistant and automation layer for advertising workflows, campaign assistance, Telegram growth and marketing operations.",
};

const thread = [
  ["in", "I run a forex signals channel. Can you grow it?"],
  ["out", "Yes — that's a core niche for us. Before I recommend an approach I need four things: your destination link, target countries, campaign objective and budget range."],
  ["in", "Members. India and UAE. Around $800."],
  ["out", "Understood. I'll route this to channel-placement research and pass current pricing from an admin — I don't quote unverified numbers."],
  ["in", "Can you guarantee 10,000 members?"],
  ["out", "No. Performance depends on niche, offer, creative, audience and platform conditions. I can share the strategy and what we'll measure, but not a guaranteed count."],
] as const;

export default function AgentPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "TELES Agent", path: "/agent" }]} />
      <PageHead
        index="03"
        kicker="Product"
        title={<>TELES <span className="serif text-accent">Agent</span></>}
        lede="An AI-powered assistant and automation layer for advertising workflows, campaign assistance, Telegram growth and marketing operations — built so the operational work of running campaigns stops being manual."
        meta={[
          ["Surface", "Telegram"],
          ["Status", "In development"],
          ["Positioning", "Automate · Advertise · Achieve"],
        ]}
      />

      <section className="px-6 lg:px-10">
        <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          {/* conversation artifact */}
          <Reveal>
            <TiltCard strength={5}>
            <div className="tilt-inner relative overflow-hidden rounded-3xl border border-line bg-[#0b0b0c] p-6 lg:p-9">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-50"
                style={{
                  backgroundImage: "radial-gradient(rgba(245,245,243,0.1) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-24 -top-24 size-64 rounded-full opacity-[0.14] blur-[90px]"
                style={{ background: "var(--accent)" }}
              />
              <div className="relative">
                <div className="flex items-center gap-2.5 border-b border-line pb-4">
                  <span className="grid size-7 place-items-center rounded-full bg-accent text-[11px] font-semibold text-bg">T</span>
                  <span className="text-[13px] font-medium" translate="no">TELES Agent</span>
                  <span className="label ml-auto flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                    Online
                  </span>
                </div>
                <div className="mt-6 space-y-3.5">
                  {thread.map(([dir, msg], i) => (
                    <p
                      key={i}
                      className={
                        dir === "in"
                          ? "max-w-[86%] rounded-2xl rounded-tl-sm border border-line bg-white/[0.035] px-4 py-3 text-[13.5px] leading-[1.55] text-muted"
                          : "ml-auto max-w-[94%] rounded-2xl rounded-tr-sm border border-accent/25 bg-accent/[0.07] px-4 py-3 text-[13.5px] leading-[1.55] text-ink"
                      }
                    >
                      {msg}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            </TiltCard>
            <p className="mt-4 text-[12.5px] leading-[1.6] text-dim">
              Illustrative exchange showing operating policy: the agent qualifies first, refuses to
              quote unverified pricing, and never guarantees outcomes.
            </p>
          </Reveal>

          {/* capabilities */}
          <div>
            <Reveal>
              <p className="label">Capabilities</p>
              <h2 className="display mt-6 text-[clamp(1.8rem,3.8vw,2.9rem)]">
                What it&rsquo;s being
                <br />
                built to <span className="serif text-accent">handle</span>
              </h2>
            </Reveal>
            <Reveal delay={70}>
              <ul className="mt-9">
                {agentCapabilities.map((c, i) => (
                  <li key={c} className="flex items-baseline gap-5 border-t border-line py-3.5">
                    <span className="label tnum text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[15px] text-muted">{c}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={130}>
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href={links.agentBot}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full px-6 py-3 text-[14px] font-medium text-bg transition-transform duration-150 active:scale-[0.97]"
                  style={{ background: "var(--accent)", transitionTimingFunction: "var(--ease-out)" }}
                >
                  Open TELES Agent
                </a>
                <a
                  href={links.feedback}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-line px-6 py-3 text-[14px] font-medium transition-colors duration-200 hover:border-ink/30"
                >
                  Feedback
                </a>
              </div>
              <p className="mt-6 max-w-[48ch] text-[12.5px] leading-[1.6] text-dim">
                Capabilities describe product direction. Availability of any individual feature is
                confirmed with our team before you rely on it.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <NextStep label="Next" title="What we've already shipped." href="/work" cta="View work" />
    </>
  );
}

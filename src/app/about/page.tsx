import type { Metadata } from "next";
import { PageHead, NextStep } from "@/components/Page";
import { Reveal } from "@/components/Reveal";
import { brand } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: brand.description,
};

const values = [
  ["Clear communication", "You hear what is happening, in plain language, on an agreed schedule."],
  ["Transparency", "Scope, deliverables and what is not guaranteed are written down before anything runs."],
  ["Responsible advertising", "We read platform and local rules before we write the ad, not after it's rejected."],
  ["Audience relevance", "Reach without relevance is waste. Placement is decided by research."],
  ["Measurable objectives", "Every campaign has a defined objective and a metric attached to it."],
  ["Continuous optimization", "Creative and placement are tested and adjusted across the campaign, not set once."],
  ["Practical automation", "Automation that removes real operational work — not novelty for its own sake."],
];

const personality = ["Professional", "Modern", "Direct", "Premium", "Strategic", "Performance-focused", "Technology-driven"];

export default function AboutPage() {
  return (
    <>
      <PageHead
        index="05"
        kicker="About"
        title={<>A Telegram<br /><span className="serif text-accent">specialist</span></>}
        lede={brand.description}
        meta={[
          ["Presence", "India & UAE"],
          ["Clients", "International"],
          ["Focus", "Telegram-led growth"],
        ]}
      />

      <section className="noise relative bg-paper px-6 py-24 text-bg lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <p className="label" style={{ color: "rgba(8,8,8,0.42)" }}>Positioning</p>
            <h2 className="display mt-8 max-w-[18ch] text-[clamp(1.9rem,5vw,4.2rem)]">
              A specialized Telegram growth partner — not a generic social media agency.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-x-12 gap-y-10 border-t pt-10 sm:grid-cols-2 lg:grid-cols-4" style={{ borderColor: "rgba(8,8,8,0.13)" }}>
            {[
              ["Core promise", "Help online businesses and communities acquire relevant audiences, improve visibility and scale through strategic advertising and automation."],
              ["Where we operate", "India and UAE representation, with an international client focus across Telegram-native markets."],
              ["What we don't do", "Guaranteed member counts, profit claims, fabricated results, or campaigns that require evading platform policy."],
              ["How we price", "Against niche, audience, duration, platforms and creative need — confirmed in writing before launch."],
            ].map(([h, b], i) => (
              <Reveal key={h} delay={i * 60}>
                <h3 className="text-[15px] font-medium">{h}</h3>
                <p className="mt-2.5 text-[14px] leading-[1.62]" style={{ color: "rgba(8,8,8,0.58)" }}>{b}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-28 lg:px-10 lg:py-36">
        <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="label">Values</p>
              <h2 className="display mt-7 text-[clamp(2rem,4.4vw,3.4rem)]">
                How we
                <br />
                <span className="serif text-accent">operate</span>
              </h2>
              <ul className="mt-10 flex flex-wrap gap-2">
                {personality.map((p) => (
                  <li key={p} className="rounded-full border border-line px-3.5 py-1.5 text-[12.5px] text-muted">
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <ol>
            {values.map(([h, b], i) => (
              <li key={h} className="rule">
                <Reveal delay={i * 35}>
                  <div className="grid gap-4 py-7 sm:grid-cols-[64px_minmax(0,1fr)]">
                    <span className="label tnum pt-1 text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <div className="min-w-0">
                      <h3 className="text-[18px] font-medium tracking-[-0.02em]">{h}</h3>
                      <p className="mt-2 max-w-[54ch] text-[14px] leading-[1.65] text-muted">{b}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <NextStep label="Next" title="Start a campaign with us." href="/contact" cta="Send a brief" />
    </>
  );
}

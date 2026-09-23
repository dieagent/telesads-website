import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { PageHead, NextStep } from "@/components/Page";
import { Reveal } from "@/components/Reveal";
import { Parallax } from "@/components/Depth";
import { portfolio, reportingMetrics, process, brand } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/work" },
  title: "Work",
  description:
    "Verified Telegram bot and automation project references, our eight-stage method, and the metrics we report.",
};

export default function WorkPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Work", path: "/work" }]} />
      <PageHead
        index="04"
        kicker="Work & Method"
        title={<>Built and<br /><span className="serif text-accent">shipped</span></>}
        lede="Verified project references from agency records. We publish only work we have completed and are approved to show — no invented clients, results, testimonials or case studies."
        meta={[
          ["References", "4"],
          ["Type", "Bots & automation"],
          ["Method", "8 stages"],
        ]}
      />

      <section className="px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <ul className="border-t border-line">
            {portfolio.map((p, i) => (
              <li key={p.handle} className="rule">
                <Reveal delay={i * 45}>
                  <div className="idx-row grid items-baseline gap-3 py-8 lg:grid-cols-[88px_minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-8 lg:py-10">
                    <span className="label tnum">{String(i + 1).padStart(2, "0")}</span>
                    <h2
                      className="truncate font-mono text-[clamp(1.1rem,2.6vw,1.9rem)] tracking-[-0.02em]"
                      translate="no"
                    >
                      {p.handle}
                    </h2>
                    <span className="label">{p.kind}</span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-[62ch] text-[13px] leading-[1.65] text-dim">
            Described only according to verified work completed and approved portfolio details.
            Further references are available on request, subject to client confidentiality.
          </p>
        </div>
      </section>

      {/* method */}
      <section className="mt-28 px-6 lg:mt-36 lg:px-10">
        <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="label">Method</p>
              <h2 className="display mt-7 text-[clamp(2rem,4.6vw,3.6rem)]">
                Eight stages.
                <br />
                No <span className="serif text-accent">surprises</span>.
              </h2>
              <p className="mt-7 max-w-[38ch] text-[15px] leading-[1.65] text-muted">
                Every engagement runs the same path. You always know which stage you&rsquo;re in,
                what was agreed, and what happens next.
              </p>
            </Reveal>
          </div>
          <ol>
            {process.map((p, i) => (
              <li key={p.n} className="rule">
                <Reveal delay={i * 35}>
                  <div className="grid gap-4 py-7 sm:grid-cols-[64px_minmax(0,1fr)]">
                    <span className="label tnum pt-1 text-accent">{p.n}</span>
                    <div className="min-w-0">
                      <h3 className="text-[18px] font-medium tracking-[-0.02em]">{p.title}</h3>
                      <p className="mt-2 max-w-[54ch] text-[14px] leading-[1.65] text-muted">{p.body}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* reporting */}
      <section className="relative mt-28 overflow-hidden px-6 lg:mt-36 lg:px-10">
        <Parallax speed={0.1}>
          <p
            aria-hidden="true"
            className="display stroke-txt pointer-events-none absolute -right-8 top-0 whitespace-nowrap text-[clamp(5rem,16vw,14rem)] leading-none opacity-30"
          >
            MEASURE
          </p>
        </Parallax>
        <div className="relative mx-auto max-w-[1400px]">
          <Reveal>
            <p className="label">Reporting</p>
            <h2 className="display mt-7 max-w-[16ch] text-[clamp(2rem,4.6vw,3.6rem)]">
              Only metrics we can <span className="serif text-accent">verify</span>
            </h2>
          </Reveal>
          <Reveal delay={70}>
            <ul className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {reportingMetrics.map((m, i) => (
                <li
                  key={m}
                  className="flex items-baseline gap-3 bg-bg px-5 py-5 transition-colors duration-300 hover:bg-white/[0.03]"
                >
                  <span className="label tnum">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[14px] text-muted">{m}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <blockquote className="mt-14 border-l-2 pl-6 lg:pl-8" style={{ borderColor: "var(--accent)" }}>
              <p className="serif max-w-[40ch] text-[clamp(1.3rem,2.6vw,2rem)] leading-[1.38]">
                Campaign performance depends on the niche, offer, creative quality, audience, budget
                and platform conditions. We provide strategy and optimization — no responsible
                agency can guarantee a specific result in every campaign.
              </p>
              <footer className="label mt-6">{brand.name} — Operating Policy</footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      <NextStep label="Next" title="Who you'd be working with." href="/about" cta="About the agency" />
    </>
  );
}

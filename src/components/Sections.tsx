import { Reveal, MaskLines } from "./Reveal";
import {
  agentCapabilities,
  audiences,
  brand,
  links,
  portfolio,
  process,
  reportingMetrics,
  services,
} from "@/lib/content";

/* ============================================ STATEMENT (paper inversion) */

export function Statement() {
  return (
    <section className="noise relative bg-paper px-6 py-28 text-bg lg:px-10 lg:py-40">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p
            className="label"
            style={{ color: "rgba(8,8,8,0.42)" }}
          >
            What we do
          </p>
        </Reveal>
        <MaskLines
          className="display mt-10 max-w-[19ch] text-[clamp(2.2rem,6.4vw,5.6rem)]"
          lines={[
            <>We don&rsquo;t buy</>,
            <>attention. We buy</>,
            <>
              the <span className="serif">right</span> attention.
            </>,
          ]}
        />
        <div className="mt-16 grid gap-10 border-t pt-10 sm:grid-cols-2 lg:grid-cols-4" style={{ borderColor: "rgba(8,8,8,0.12)" }}>
          {[
            ["Specialists, not generalists", "Telegram is the core discipline — not a line item bolted onto a social media retainer."],
            ["Research before spend", "Channel discovery, audience and competitor research decide placement. Nothing runs on a guess."],
            ["Compliance is the filter", "We work in regulated niches, which means we read the rules before we write the ad."],
            ["Honest measurement", "We report what is verifiable and name the attribution gaps out loud."],
          ].map(([h, b], i) => (
            <Reveal key={h} delay={i * 70}>
              <h3 className="text-[15px] font-medium tracking-[-0.01em]">{h}</h3>
              <p className="mt-2.5 text-[14px] leading-[1.6]" style={{ color: "rgba(8,8,8,0.55)" }}>
                {b}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====================================================== SERVICES (rows) */

export function Services() {
  return (
    <section id="services" className="scroll-mt-20 px-6 py-28 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <Reveal>
            <p className="label">
              <span className="text-accent">01</span> &nbsp;/&nbsp; Services
            </p>
            <h2 className="display mt-7 text-[clamp(2.2rem,5.6vw,4.4rem)]">
              Seven disciplines,
              <br />
              one <span className="serif text-accent">objective</span>.
            </h2>
          </Reveal>
          <Reveal delay={90}>
            <p className="max-w-[44ch] text-[15px] leading-[1.65] text-muted lg:pb-3">
              Telegram advertising is the specialization. Everything else exists to feed it — the
              creative that earns the click, the traffic that fills the funnel, the automation that
              holds the community once it arrives.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 lg:mt-24">
          {services.map((s, i) => (
            <li key={s.id} className="srow rule group">
              <Reveal>
                <div className="row-hover grid gap-5 py-9 lg:grid-cols-[88px_minmax(0,2.1fr)_minmax(0,2.4fr)] lg:gap-8 lg:py-11">
                  <span className="label row-index tnum pt-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="row-title text-[clamp(1.5rem,3.1vw,2.35rem)] font-medium tracking-[-0.03em] leading-[1.06]">
                    {s.title}
                  </h3>
                  <div className="min-w-0">
                    <p className="max-w-[52ch] text-[14.5px] leading-[1.65] text-muted">
                      {s.summary}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-2">
                      {s.points.map((p) => (
                        <li
                          key={p}
                          className="rounded-full border border-line px-3 py-1 text-[12px] text-dim transition-colors duration-200 group-hover:border-ink/15 group-hover:text-muted"
                        >
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ================================================= SECTORS (drift field) */

export function Sectors() {
  const half = Math.ceil(audiences.length / 2);
  const rows = [audiences.slice(0, half), audiences.slice(half)];

  return (
    <section id="sectors" className="scroll-mt-20 overflow-hidden py-28 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <Reveal>
            <p className="label">
              <span className="text-accent">02</span> &nbsp;/&nbsp; Sectors
            </p>
            <h2 className="display mt-7 text-[clamp(2.2rem,5.6vw,4.4rem)]">
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
      </div>

      {/* two drifting rows of sector cards */}
      <div className="mt-16 space-y-4 lg:mt-24">
        {rows.map((row, ri) => (
          <div key={ri} className="flex overflow-hidden" aria-hidden={ri === 1 ? "true" : undefined}>
            <div className={`${ri === 0 ? "drift" : "drift-rev"} flex shrink-0 gap-4 pr-4`}>
              {[...row, ...row].map((a, i) => (
                <article
                  key={`${a.title}-${i}`}
                  className="w-[330px] shrink-0 rounded-2xl border border-line bg-white/[0.015] p-6 transition-colors duration-300 hover:border-ink/20 hover:bg-white/[0.04]"
                >
                  <h3 className="text-[16px] font-medium tracking-[-0.01em]">{a.title}</h3>
                  <p className="mt-2.5 text-[13.5px] leading-[1.6] text-muted">
                    {a.items.join(" · ")}
                  </p>
                  {"note" in a && a.note ? (
                    <p className="mt-4 flex gap-2 border-t border-line pt-3 text-[12px] leading-[1.55] text-dim">
                      <span className="text-accent" aria-hidden="true">
                        ⚑
                      </span>
                      {a.note}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-[1400px] px-6 lg:px-10">
        <p className="text-[13px] text-dim">
          Sector list is illustrative of past and current engagements — not a guarantee of
          acceptance. Every prospect passes qualification first.
        </p>
      </div>
    </section>
  );
}

/* ============================================== AGENT (split + texture) */

export function Agent() {
  return (
    <section id="agent" className="scroll-mt-20 px-6 py-28 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="overflow-hidden rounded-3xl border border-line">
          <div className="grid lg:grid-cols-2">
            {/* product artifact — a real TELES Agent exchange, drawn in markup */}
            <div className="relative flex flex-col justify-between overflow-hidden border-b border-line bg-[#0b0b0c] p-7 lg:border-b-0 lg:border-r lg:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.55]"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(245,245,243,0.11) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-24 -top-24 size-64 rounded-full opacity-[0.16] blur-[90px]"
                style={{ background: "var(--accent)" }}
              />

              <div className="relative">
                <div className="flex items-center gap-2.5 border-b border-line pb-4">
                  <span className="grid size-7 place-items-center rounded-full bg-accent text-[11px] font-semibold text-bg">
                    T
                  </span>
                  <span className="text-[13px] font-medium" translate="no">
                    TELES Agent
                  </span>
                  <span className="label ml-auto flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                    Online
                  </span>
                </div>

                <div className="mt-6 space-y-3.5">
                  <p className="max-w-[86%] rounded-2xl rounded-tl-sm border border-line bg-white/[0.035] px-4 py-3 text-[13.5px] leading-[1.55] text-muted">
                    I run a forex signals channel. Can you grow it?
                  </p>
                  <p className="ml-auto max-w-[92%] rounded-2xl rounded-tr-sm border border-accent/25 bg-accent/[0.07] px-4 py-3 text-[13.5px] leading-[1.55] text-ink">
                    Yes — that&rsquo;s a core niche for us. Before I recommend an approach I need
                    four things: your destination link, target countries, campaign objective and
                    budget range.
                  </p>
                  <p className="max-w-[86%] rounded-2xl rounded-tl-sm border border-line bg-white/[0.035] px-4 py-3 text-[13.5px] leading-[1.55] text-muted">
                    Members. India and UAE. Around $800.
                  </p>
                  <p className="ml-auto max-w-[94%] rounded-2xl rounded-tr-sm border border-accent/25 bg-accent/[0.07] px-4 py-3 text-[13.5px] leading-[1.55] text-ink">
                    Understood. I&rsquo;ll route this to channel-placement research and pass current
                    pricing from an admin — I don&rsquo;t quote unverified numbers.
                  </p>
                </div>
              </div>

              <p className="serif relative mt-10 text-[clamp(1.35rem,2.3vw,1.9rem)] leading-[1.2] text-ink/90">
                Automate · Advertise · Achieve
              </p>
            </div>

            {/* content panel */}
            <div className="flex flex-col justify-center p-8 lg:p-14">
              <Reveal>
                <p className="label">
                  <span className="text-accent">03</span> &nbsp;/&nbsp; Product
                </p>
                <h2 className="display mt-6 text-[clamp(2rem,4.2vw,3.4rem)]">
                  TELES <span className="text-accent">Agent</span>
                </h2>
                <p className="mt-6 max-w-[46ch] text-[15px] leading-[1.68] text-muted">
                  An AI-powered assistant and automation layer for advertising workflows, campaign
                  assistance, Telegram growth and marketing operations — built so the operational
                  work of running campaigns stops being manual.
                </p>
              </Reveal>

              <Reveal delay={80}>
                <ul className="mt-9 grid gap-x-8 gap-y-0 sm:grid-cols-2">
                  {agentCapabilities.map((c) => (
                    <li
                      key={c}
                      className="rule flex items-center gap-2.5 py-2.5 text-[13.5px] text-muted"
                    >
                      <span className="text-accent" aria-hidden="true">
                        ·
                      </span>
                      {c}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={140}>
                <div className="mt-9 flex flex-wrap gap-3">
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
        </div>
      </div>
    </section>
  );
}

/* ================================================== METHOD (sticky rail) */

export function Method() {
  return (
    <section id="method" className="scroll-mt-20 px-6 py-28 lg:px-10 lg:py-36">
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="label">
              <span className="text-accent">04</span> &nbsp;/&nbsp; Method
            </p>
            <h2 className="display mt-7 text-[clamp(2.2rem,5.2vw,4.2rem)]">
              Eight stages.
              <br />
              No <span className="serif text-accent">surprises</span>.
            </h2>
            <p className="mt-7 max-w-[40ch] text-[15px] leading-[1.65] text-muted">
              Every engagement runs the same path. You always know which stage you&rsquo;re in, what
              was agreed, and what happens next.
            </p>
            <a
              href="#brief"
              className="mt-9 inline-flex items-center gap-2 text-[14px] font-medium text-ink transition-colors duration-200 hover:text-accent"
            >
              Begin at stage one
              <span aria-hidden="true">→</span>
            </a>
          </Reveal>
        </div>

        <ol>
          {process.map((p, i) => (
            <li key={p.n} className="rule">
              <Reveal delay={i * 40}>
                <div className="grid gap-4 py-7 sm:grid-cols-[64px_minmax(0,1fr)] lg:py-8">
                  <span className="label tnum text-accent pt-1">{p.n}</span>
                  <div className="min-w-0">
                    <h3 className="text-[19px] font-medium tracking-[-0.02em]">{p.title}</h3>
                    <p className="mt-2 max-w-[54ch] text-[14px] leading-[1.65] text-muted">
                      {p.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ============================================= WORK + REPORTING (band) */

export function Work() {
  return (
    <section id="work" className="scroll-mt-20 px-6 py-28 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="label">
            <span className="text-accent">05</span> &nbsp;/&nbsp; Work &amp; Reporting
          </p>
        </Reveal>

        <div className="mt-14 grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <Reveal>
              <h2 className="display text-[clamp(1.9rem,4vw,3.1rem)]">
                Telegram bots &amp;<br />automation
              </h2>
              <p className="mt-6 max-w-[44ch] text-[15px] leading-[1.65] text-muted">
                Verified project references from our records. We publish only work we have completed
                and are approved to show — no invented clients, screenshots or case studies.
              </p>
            </Reveal>

            <ul className="mt-10">
              {portfolio.map((p, i) => (
                <li key={p.handle} className="rule">
                  <Reveal delay={i * 50}>
                    <div className="flex min-w-0 items-baseline justify-between gap-4 py-5">
                      <span
                        className="truncate font-mono text-[15px] text-ink"
                        translate="no"
                      >
                        {p.handle}
                      </span>
                      <span className="label shrink-0">{p.kind}</span>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Reveal>
              <h2 className="display text-[clamp(1.9rem,4vw,3.1rem)]">
                Only metrics we<br />can <span className="serif text-accent">verify</span>
              </h2>
              <p className="mt-6 max-w-[44ch] text-[15px] leading-[1.65] text-muted">
                Depending on platform and campaign, reporting can include the following. We report
                what is measurable and name the attribution gaps.
              </p>
            </Reveal>

            <Reveal delay={80}>
              <ul className="mt-10 flex flex-wrap gap-2">
                {reportingMetrics.map((m) => (
                  <li
                    key={m}
                    className="rounded-full border border-line px-3.5 py-1.5 text-[12.5px] text-muted transition-colors duration-200 hover:border-accent/50 hover:text-ink"
                  >
                    {m}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={140}>
              <blockquote className="mt-12 border-l-2 pl-6" style={{ borderColor: "var(--accent)" }}>
                <p className="serif text-[clamp(1.15rem,1.9vw,1.5rem)] leading-[1.45] text-ink">
                  Campaign performance depends on the niche, offer, creative quality, audience,
                  budget and platform conditions. We provide strategy and optimization — no
                  responsible agency can guarantee a specific result in every campaign.
                </p>
                <footer className="label mt-5">{brand.name} — Operating Policy</footer>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

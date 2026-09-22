import Reveal from "./Reveal";
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

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[12px] uppercase tracking-[0.22em] text-muted/70">{children}</p>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
      {children}
    </h2>
  );
}

/* ---------------------------------------------------------------- Services */

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 border-b border-line py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <Eyebrow>Core Services</Eyebrow>
          <Heading>Seven Ways We Move the Number</Heading>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted">
            Telegram advertising is the specialization. Everything else exists to support the
            campaign around it — the creative, the traffic, the funnel and the automation.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal as="li" key={s.id} delay={i * 45}>
              <article className="group flex h-full min-w-0 flex-col bg-bg-elev p-7 transition-colors duration-200 hover:bg-white/[0.035]">
                <span
                  className="font-mono text-[12px] tracking-widest text-accent"
                  aria-hidden="true"
                >
                  {s.label}
                </span>
                <h3 className="mt-3 text-[19px] font-semibold tracking-[-0.01em]">{s.title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">{s.summary}</p>
                <ul className="mt-5 space-y-1.5 border-t border-line pt-5">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-[13.5px] text-muted">
                      <span aria-hidden="true" className="mt-[7px] size-1 shrink-0 rounded-full bg-accent" />
                      <span className="min-w-0">{p}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ Who We Serve */

export function WhoWeServe() {
  return (
    <section id="who-we-serve" className="scroll-mt-24 border-b border-line py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <Eyebrow>Who We Serve</Eyebrow>
          <Heading>Built for Community-Driven Businesses</Heading>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted">
            We work with niches most agencies avoid — carefully, and only where the offer is
            lawful and compliant with platform and local advertising rules.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((a, i) => (
            <Reveal as="li" key={a.title} delay={i * 35}>
              <div className="h-full rounded-xl border border-line bg-bg-elev p-6 transition-colors duration-200 hover:border-white/20">
                <h3 className="text-[16px] font-semibold">{a.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
                  {a.items.join(" · ")}
                </p>
                {"note" in a && a.note ? (
                  <p className="mt-3 border-t border-line pt-3 text-[12.5px] leading-relaxed text-muted/70">
                    {a.note}
                  </p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- TELES Agent */

export function Agent() {
  return (
    <section id="teles-agent" className="scroll-mt-24 border-b border-line py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <Reveal>
          <Eyebrow>TELES Agent</Eyebrow>
          <Heading>An Automation Layer for Advertising Operations</Heading>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted">
            TELES AGENT is our AI-powered assistant and automation product for advertising
            workflows, campaign assistance, Telegram growth and marketing operations.
          </p>
          <p className="mt-4 max-w-xl text-[15px] font-medium" translate="no">
            {brand.promise}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={links.agentBot}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-5 py-2.5 text-[14.5px] font-semibold text-bg transition-[transform,opacity] duration-150 hover:opacity-90 active:scale-[0.98]"
              style={{ background: "var(--accent)", transitionTimingFunction: "var(--ease-out)" }}
            >
              Open TELES Agent
            </a>
            <a
              href={links.feedback}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-line px-5 py-2.5 text-[14.5px] font-semibold transition-colors duration-150 hover:border-white/25"
            >
              Leave Feedback
            </a>
          </div>
          <p className="mt-5 max-w-md text-[12.5px] leading-relaxed text-muted/70">
            Capabilities below describe the product direction. Availability of any individual
            feature is confirmed with our team before it is relied on.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {agentCapabilities.map((c) => (
              <li
                key={c}
                className="bg-bg-elev px-5 py-4 text-[14px] text-muted transition-colors duration-200 hover:bg-white/[0.035] hover:text-fg"
              >
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- Process */

export function Process() {
  return (
    <section id="process" className="scroll-mt-24 border-b border-line py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <Eyebrow>Client Onboarding</Eyebrow>
          <Heading>Eight Stages, No Surprises</Heading>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted">
            Every engagement runs the same path — from discovery to final report. You always know
            which stage you are in and what happens next.
          </p>
        </Reveal>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <Reveal as="li" key={p.n} delay={i * 35}>
              <div className="h-full bg-bg-elev p-6 transition-colors duration-200 hover:bg-white/[0.035]">
                <span className="tnum font-mono text-[12px] text-accent">{p.n}</span>
                <h3 className="mt-2.5 text-[16px] font-semibold">{p.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -------------------------------------------------------- Work & Reporting */

export function Work() {
  return (
    <section id="work" className="scroll-mt-24 border-b border-line py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2">
        <Reveal>
          <Eyebrow>Selected Work</Eyebrow>
          <Heading>Telegram Bots &amp; Automation</Heading>
          <p className="mt-4 text-[16px] leading-relaxed text-muted">
            Verified project references from our records. We publish only work we have completed
            and are approved to show — no invented clients, screenshots or case studies.
          </p>
          <ul className="mt-8 divide-y divide-line overflow-hidden rounded-xl border border-line">
            {portfolio.map((p) => (
              <li
                key={p.handle}
                className="flex min-w-0 items-center justify-between gap-4 bg-bg-elev px-5 py-4 transition-colors duration-200 hover:bg-white/[0.035]"
              >
                <span className="truncate font-mono text-[14px]" translate="no">
                  {p.handle}
                </span>
                <span className="shrink-0 text-[12.5px] text-muted">{p.kind}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={90}>
          <Eyebrow>Reporting</Eyebrow>
          <Heading>Only Metrics We Can Actually Verify</Heading>
          <p className="mt-4 text-[16px] leading-relaxed text-muted">
            Depending on the platform and campaign, reporting can include the following. We report
            what is measurable and state attribution gaps honestly.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {reportingMetrics.map((m) => (
              <li
                key={m}
                className="rounded-full border border-line bg-bg-elev px-3.5 py-1.5 text-[13px] text-muted transition-colors duration-150 hover:border-white/25 hover:text-fg"
              >
                {m}
              </li>
            ))}
          </ul>
          <p className="mt-6 rounded-xl border border-line bg-white/[0.02] p-5 text-[13px] leading-relaxed text-muted">
            Campaign performance depends on the niche, offer, creative quality, audience, budget and
            platform conditions. We provide strategy and optimization — no responsible agency can
            guarantee a specific result in every campaign.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

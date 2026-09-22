import Link from "next/link";
import Hero from "@/components/Hero";
import { Statement, Sectors } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";
import { NextStep } from "@/components/Page";
import { services, portfolio, links } from "@/lib/content";

/** Home = index of the site, not a dump of everything. */
function ServiceIndex() {
  return (
    <section className="px-6 py-28 lg:px-10 lg:py-36">
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
              Telegram advertising is the specialization. Everything else feeds it — the creative
              that earns the click, the traffic that fills the funnel, the automation that holds the
              community once it arrives.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 lg:mt-20">
          {services.map((s, i) => (
            <li key={s.id} className="rule">
              <Reveal>
                <Link
                  href={`/services#${s.id}`}
                  className="idx-row group grid items-baseline gap-3 py-7 lg:grid-cols-[88px_minmax(0,1.5fr)_minmax(0,1.6fr)_40px] lg:gap-8 lg:py-9"
                >
                  <span className="label tnum">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-[clamp(1.4rem,3vw,2.2rem)] font-medium leading-[1.06] tracking-[-0.03em]">
                    {s.title}
                  </h3>
                  <p className="max-w-[52ch] text-[14px] leading-[1.6] text-muted">{s.summary}</p>
                  <span className="idx-arrow hidden justify-self-end text-accent lg:block" aria-hidden="true">
                    →
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <Link href="/services" className="sweep mt-12 inline-flex items-center gap-2.5 text-[14px] font-medium">
            All services in detail <span className="text-accent" aria-hidden="true">→</span>
          </Link>
        </Reveal>
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
              <span className="text-accent">03</span> &nbsp;/&nbsp; Work
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
      <ServiceIndex />
      <Sectors />
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

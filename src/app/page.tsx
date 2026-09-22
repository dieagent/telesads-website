import Link from "next/link";
import Hero from "@/components/Hero";
import { Statement } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";
import { NextStep } from "@/components/Page";
import { portfolio } from "@/lib/content";
import { Reach, ServiceList, SectorMosaic } from "@/components/NewSections";
import Bento from "@/components/Bento";
import Faq from "@/components/Faq";

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
      <Bento />
      <ServiceList />
      <Reach />
      <SectorMosaic />
      <WorkTeaser />
      <Faq />
      <NextStep
        label="Start here"
        title="Tell us what you're growing."
        href="/contact"
        cta="Send a brief"
      />
    </>
  );
}

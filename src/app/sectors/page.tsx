import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { PageHead, NextStep } from "@/components/Page";
import { Reveal } from "@/components/Reveal";
import { audiences, briefQuestions } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/sectors" },
  title: "Sectors",
  description:
    "Forex, crypto and Web3, binary, gambling, arbitrage, meme coin, SaaS, creators and e-commerce — where lawful and compliant.",
};

export default function SectorsPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Sectors", path: "/sectors" }]} />
      <PageHead
        index="02"
        kicker="Sectors"
        title={<>Niches most<br />agencies <span className="serif text-accent">decline</span></>}
        lede="Trading, crypto, arbitrage and speculative communities are hard to advertise well and easy to advertise badly. We take them on — only where the offer is lawful and compliant with platform rules and local advertising policy."
        meta={[
          ["Categories", "9"],
          ["Filter", "Qualification first"],
          ["Policy", "Compliance-led"],
        ]}
      />

      <section className="px-6 lg:px-10">
        <div className="mx-auto grid max-w-[1400px] gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((a, i) => (
            <Reveal key={a.title} delay={(i % 3) * 60}>
              <article className="flex h-full flex-col bg-bg p-7 transition-colors duration-300 hover:bg-white/[0.028] lg:p-9">
                <span className="label tnum">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="mt-4 text-[19px] font-medium tracking-[-0.02em]">{a.title}</h2>
                <ul className="mt-4 space-y-1.5">
                  {a.items.map((it) => (
                    <li key={it} className="text-[13.5px] leading-[1.5] text-muted">{it}</li>
                  ))}
                </ul>
                {"note" in a && a.note ? (
                  <p className="mt-auto flex gap-2 pt-6 text-[12px] leading-[1.55] text-dim">
                    <span className="text-accent" aria-hidden="true">⚑</span>
                    {a.note}
                  </p>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="band noise mt-28 px-6 py-24 lg:mt-36 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-24">
          <Reveal>
            <p className="label" >Qualification</p>
            <h2 className="display mt-7 text-[clamp(2rem,4.8vw,3.8rem)]">
              Eight questions
              <br />
              before a <span className="serif text-accent">quote</span>.
            </h2>
            <p className="mt-7 max-w-[40ch] text-[15px] leading-[1.68]" style={{ color: "var(--muted)" }}>
              We don&rsquo;t price a campaign we don&rsquo;t understand. Every prospect answers
              these before we recommend scope, platform or budget.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <ol>
              {briefQuestions.map((q, i) => (
                <li
                  key={q}
                  className="flex items-baseline gap-5 border-t py-4"
                  style={{ borderColor: "var(--line)" }}
                >
                  <span className="label tnum text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] leading-[1.5]">{q}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <NextStep label="Next" title="The automation layer behind it." href="/agent" cta="Meet TELES Agent" />
    </>
  );
}

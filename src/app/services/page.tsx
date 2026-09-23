import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { PageHead, NextStep } from "@/components/Page";
import { Reveal } from "@/components/Reveal";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/services" },
  title: "Services",
  description:
    "Telegram advertising, Meta & Instagram ads, Google Ads, creative production, growth consulting, bot development and automation.",
};

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Services", path: "/services" }]} />
      <PageHead
        index="01"
        kicker="Services"
        title={<>What we<br />actually <span className="serif text-accent">do</span></>}
        lede="Telegram advertising is the specialization. The other six disciplines exist to support the campaign around it — the creative, the traffic, the funnel and the automation that holds the community once it arrives."
        meta={[
          ["Disciplines", "7"],
          ["Core focus", "Telegram"],
          ["Engagement", "Project or retainer"],
        ]}
      />

      <div className="px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          {services.map((s, i) => (
            <section key={s.id} id={s.id} className="rule scroll-mt-24 py-14 lg:py-20">
              <div className="grid gap-8 lg:grid-cols-[120px_minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-12">
                <Reveal>
                  <span className="label tnum block">{String(i + 1).padStart(2, "0")}</span>
                  <span
                    className="stroke-txt mt-3 hidden text-[62px] font-medium leading-none lg:block"
                    aria-hidden="true"
                  >
                    {s.label}
                  </span>
                </Reveal>

                <Reveal delay={60}>
                  <h2 className="text-[clamp(1.6rem,3.4vw,2.6rem)] font-medium leading-[1.04] tracking-[-0.035em]">
                    {s.title}
                  </h2>
                  <p className="mt-5 max-w-[42ch] text-[15px] leading-[1.68] text-muted">
                    {s.summary}
                  </p>
                </Reveal>

                <Reveal delay={120}>
                  <p className="label">Included</p>
                  <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
                    {s.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-baseline gap-2.5 border-t border-line py-2.5 text-[13.5px] text-muted"
                      >
                        <span className="text-accent" aria-hidden="true">·</span>
                        <span className="min-w-0">{p}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </section>
          ))}
        </div>
      </div>

      <NextStep label="Next" title="Which sectors we take on." href="/sectors" cta="View sectors" />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHead, NextStep } from "@/components/Page";
import { Reveal } from "@/components/Reveal";
import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { landingBySlug, landingSlugs, landings } from "@/lib/landing";
import { links } from "@/lib/content";

export function generateStaticParams() {
  return landingSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const l = landingBySlug.get(slug);
  if (!l) return {};
  return {
    title: l.title,
    description: l.description,
    alternates: { canonical: `/${l.slug}` },
    openGraph: {
      type: "article",
      url: `${links.site}/${l.slug}`,
      title: l.title,
      description: l.description,
    },
    twitter: {
      card: "summary_large_image",
      title: l.title,
      description: l.description,
    },
  };
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const l = landingBySlug.get(slug);
  if (!l) notFound();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: l.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const related = l.related
    .map((s) => landings.find((x) => x.slug === s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <>
      <BreadcrumbSchema items={[{ name: l.kicker, path: `/${l.slug}` }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHead
        index=""
        kicker={l.kicker}
        title={l.h1}
        lede={l.intro}
        meta={l.meta}
        size="compact"
      />

      <div className="px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          {/* second intro paragraph */}
          <Reveal>
            <p className="max-w-[68ch] text-[17px] leading-[1.7] text-muted">{l.intro2}</p>
          </Reveal>

          {/* body sections */}
          {l.sections.map((s) => (
            <section key={s.h2} className="rule mt-14 py-12 lg:py-16">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
                <Reveal>
                  <h2 className="text-[clamp(1.5rem,3vw,2.3rem)] font-medium leading-[1.12] tracking-[-0.025em]">
                    {s.h2}
                  </h2>
                </Reveal>
                <Reveal delay={90}>
                  <p className="max-w-[62ch] text-[15.5px] leading-[1.72] text-muted">
                    {s.body}
                  </p>
                  {s.bullets && (
                    <ul className="mt-7 space-y-3.5">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex gap-3.5 text-[15px] leading-[1.65] text-muted">
                          <span
                            className="mt-[9px] size-1.5 shrink-0 rounded-full bg-accent"
                            aria-hidden="true"
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </Reveal>
              </div>
            </section>
          ))}

          {/* FAQ */}
          <section className="rule mt-14 py-12 lg:py-16">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
              <Reveal>
                <h2 className="text-[clamp(1.5rem,3vw,2.3rem)] font-medium leading-[1.12] tracking-[-0.025em]">
                  Common questions
                </h2>
              </Reveal>
              <div className="space-y-px overflow-hidden rounded-xl border border-line bg-line">
                {l.faqs.map((f) => (
                  <details key={f.q} className="group bg-[#0c0c0d] p-6 open:bg-[#101012]">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[15.5px] font-medium leading-[1.45] [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <span
                        className="mt-0.5 shrink-0 text-dim transition-transform duration-300 group-open:rotate-45"
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-4 max-w-[62ch] text-[14.5px] leading-[1.7] text-muted">
                      {f.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* related pages — topical internal linking */}
          {related.length > 0 && (
            <section className="rule mt-14 py-12 lg:py-16">
              <Reveal>
                <p className="label">Related</p>
              </Reveal>
              <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/${r.slug}`}
                    className="group flex items-start justify-between gap-6 bg-[#0c0c0d] p-6 transition-colors duration-200 hover:bg-[#101012]"
                  >
                    <span>
                      <span className="block text-[15px] font-semibold">{r.kicker}</span>
                      <span className="mt-1.5 block max-w-[46ch] text-[13px] leading-[1.6] text-dim">
                        {r.description}
                      </span>
                    </span>
                    <span
                      className="shrink-0 text-dim transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <NextStep
        label="Next"
        title="Tell us what you are promoting and where it needs to reach."
        href="/contact"
        cta="Start a campaign brief"
      />
    </>
  );
}

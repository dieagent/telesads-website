import type { Metadata } from "next";
import Link from "next/link";
import { PageHead, NextStep } from "@/components/Page";
import { Reveal } from "@/components/Reveal";
import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { posts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Practical guides on Telegram advertising, channel promotion, media buying and compliant campaigns for trading and crypto communities.",
  alternates: { canonical: "/blog" },
};

const fmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export default function BlogIndex() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Insights", path: "/blog" }]} />
      <PageHead
        index="07"
        kicker="Insights"
        title={<>Field <span className="serif text-accent">notes</span></>}
        lede="How we actually run Telegram campaigns — media buying, vetting, compliance and retention. No gated PDFs, no recycled listicles."
        meta={[["Articles", String(posts.length)], ["Focus", "Practice"], ["Paywall", "None"]]}
      />

      <div className="px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line">
            {sorted.map((p) => (
              <Reveal key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group flex flex-col gap-4 bg-[#0c0c0d] p-7 transition-colors duration-200 hover:bg-[#101012] lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:p-9"
                >
                  <div className="max-w-[62ch]">
                    <p className="label flex items-center gap-3">
                      <span className="text-accent">{p.tag}</span>
                      <span className="inline-block h-px w-6 bg-line" aria-hidden="true" />
                      <time dateTime={p.date}>{fmt.format(new Date(p.date))}</time>
                      <span aria-hidden="true">·</span>
                      <span>{p.readMinutes} min</span>
                    </p>
                    <h2 className="mt-4 text-[clamp(1.25rem,2.4vw,1.85rem)] font-medium leading-[1.2] tracking-[-0.02em]">
                      {p.title}
                    </h2>
                    <p className="mt-3 text-[14.5px] leading-[1.65] text-muted">{p.description}</p>
                  </div>
                  <span
                    className="shrink-0 text-dim transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <NextStep
        label="Next"
        title="Have a campaign in mind rather than a question?"
        href="/contact"
        cta="Start a campaign brief"
      />
    </>
  );
}

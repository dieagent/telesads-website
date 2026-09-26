import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NextStep } from "@/components/Page";
import { postBySlug, postSlugs, posts } from "@/lib/blog";
import { landings } from "@/lib/landing";
import { links, brand } from "@/lib/content";

export function generateStaticParams() {
  return postSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = postBySlug.get(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: {
      type: "article",
      url: `${links.site}/blog/${p.slug}`,
      title: p.title,
      description: p.description,
      publishedTime: p.date,
    },
    twitter: {
      card: "summary_large_image",
      title: p.title,
      description: p.description,
    },
  };
}

const fmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = postBySlug.get(slug);
  if (!p) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    description: p.description,
    datePublished: p.date,
    dateModified: p.date,
    author: { "@type": "Organization", name: brand.name, url: links.site },
    publisher: {
      "@type": "Organization",
      name: brand.name,
      logo: {
        "@type": "ImageObject",
        url: `${links.site}/logo-512.png`,
      },
    },
    mainEntityOfPage: `${links.site}/blog/${p.slug}`,
    inLanguage: "en",
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: links.site },
      { "@type": "ListItem", position: 2, name: "Insights", item: `${links.site}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: p.title,
        item: `${links.site}/blog/${p.slug}`,
      },
    ],
  };

  const related = p.related
    .map((s) => landings.find((x) => x.slug === s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  const more = posts.filter((x) => x.slug !== p.slug).slice(0, 2);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <article className="px-6 pb-8 pt-36 lg:px-10 lg:pt-44">
        <div className="mx-auto max-w-[760px]">
          <p className="label flex flex-wrap items-center gap-3">
            <Link href="/blog" className="transition-colors hover:text-ink">
              Insights
            </Link>
            <span className="inline-block h-px w-6 bg-line" aria-hidden="true" />
            <span className="text-accent">{p.tag}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={p.date}>{fmt.format(new Date(p.date))}</time>
            <span aria-hidden="true">·</span>
            <span>{p.readMinutes} min read</span>
          </p>

          <h1
            className="mt-7 text-[clamp(2.1rem,5.2vw,3.6rem)] font-medium leading-[1.06] tracking-[-0.032em]"
            style={{ textWrap: "balance" }}
          >
            {p.h1}
          </h1>

          <p className="mt-7 border-l-2 border-accent/50 pl-5 text-[17px] leading-[1.7] text-muted">
            {p.description}
          </p>

          <div className="mt-14 space-y-7">
            {p.blocks.map((b, i) => {
              if (b.type === "h2") {
                return (
                  <h2
                    key={i}
                    className="pt-5 text-[clamp(1.35rem,2.6vw,1.75rem)] font-medium leading-[1.2] tracking-[-0.022em]"
                  >
                    {b.text}
                  </h2>
                );
              }
              if (b.type === "ul") {
                return (
                  <ul key={i} className="space-y-3.5">
                    {b.items.map((it) => (
                      <li
                        key={it}
                        className="flex gap-3.5 text-[16px] leading-[1.7] text-muted"
                      >
                        <span
                          className="mt-[10px] size-1.5 shrink-0 rounded-full bg-accent"
                          aria-hidden="true"
                        />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              if (b.type === "quote") {
                return (
                  <blockquote
                    key={i}
                    className="serif my-10 border-y border-line py-8 text-[clamp(1.15rem,2.4vw,1.5rem)] leading-[1.45] text-ink"
                  >
                    {b.text}
                  </blockquote>
                );
              }
              return (
                <p key={i} className="text-[16px] leading-[1.75] text-muted">
                  {b.text}
                </p>
              );
            })}
          </div>

          {/* supporting commercial links */}
          {related.length > 0 && (
            <div className="mt-16 rounded-xl border border-line bg-[#0c0c0d] p-7">
              <p className="label">Related services</p>
              <ul className="mt-5 space-y-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/${r.slug}`}
                      className="group flex items-center justify-between gap-5 text-[15px] transition-colors hover:text-accent"
                    >
                      {r.kicker}
                      <span
                        className="text-dim transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* next reads */}
          <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
            {more.map((m) => (
              <Link
                key={m.slug}
                href={`/blog/${m.slug}`}
                className="group bg-[#0c0c0d] p-6 transition-colors duration-200 hover:bg-[#101012]"
              >
                <p className="label text-accent">{m.tag}</p>
                <p className="mt-3 text-[15px] font-medium leading-[1.35]">{m.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </article>

      <NextStep
        label="Next"
        title="Want this run for you instead of by you?"
        href="/contact"
        cta="Start a campaign brief"
      />
    </>
  );
}

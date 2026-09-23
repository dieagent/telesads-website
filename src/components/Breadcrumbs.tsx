import { links } from "@/lib/content";

/**
 * BreadcrumbList structured data.
 *
 * Emitted as JSON-LD only — the visual page hierarchy is already carried by
 * the numbered PageHead (01 / Services etc.), so a second visible trail would
 * be redundant. Google uses this to render the breadcrumb path in results
 * instead of the bare URL.
 */
export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  const json = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: links.site,
      },
      ...items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: it.name,
        item: `${links.site}${it.path}`,
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

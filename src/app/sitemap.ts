import type { MetadataRoute } from "next";
import { links } from "@/lib/content";
import { landings } from "@/lib/landing";
import { posts } from "@/lib/blog";

const CORE: { path: string; priority: number; freq: "weekly" | "monthly" }[] = [
  { path: "", priority: 1.0, freq: "weekly" },
  { path: "/services", priority: 0.8, freq: "monthly" },
  { path: "/sectors", priority: 0.7, freq: "monthly" },
  { path: "/agent", priority: 0.7, freq: "monthly" },
  { path: "/work", priority: 0.6, freq: "monthly" },
  { path: "/about", priority: 0.5, freq: "monthly" },
  { path: "/contact", priority: 0.9, freq: "monthly" },
  { path: "/blog", priority: 0.8, freq: "weekly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core = CORE.map(({ path, priority, freq }) => ({
    url: `${links.site}${path}`,
    lastModified: now,
    changeFrequency: freq,
    priority,
  }));

  // Commercial landing pages carry the highest crawl priority after the home
  // page: these are the pages intended to rank and convert.
  const landing = landings.map((l) => ({
    url: `${links.site}/${l.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const blog = posts.map((p) => ({
    url: `${links.site}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...core, ...landing, ...blog];
}

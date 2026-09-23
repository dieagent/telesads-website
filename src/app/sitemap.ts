import type { MetadataRoute } from "next";
import { links } from "@/lib/content";

const ROUTES: { path: string; priority: number; freq: "weekly" | "monthly" }[] = [
  { path: "", priority: 1.0, freq: "weekly" },
  { path: "/services", priority: 0.9, freq: "monthly" },
  { path: "/sectors", priority: 0.8, freq: "monthly" },
  { path: "/agent", priority: 0.8, freq: "monthly" },
  { path: "/work", priority: 0.7, freq: "monthly" },
  { path: "/about", priority: 0.6, freq: "monthly" },
  { path: "/contact", priority: 0.9, freq: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map(({ path, priority, freq }) => ({
    url: `${links.site}${path}`,
    lastModified: now,
    changeFrequency: freq,
    priority,
  }));
}

import type { MetadataRoute } from "next";
import { links } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${links.site}/sitemap.xml`,
    host: links.site,
  };
}

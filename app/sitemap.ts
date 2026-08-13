import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/* Generated at build time into out/sitemap.xml. */
export const dynamic = "force-static";

/**
 * One page, so one entry. Anchors (#tests, #visit) are deliberately absent:
 * a sitemap lists documents, and fragments are not separate documents —
 * listing them tends to get the whole file treated as low quality.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

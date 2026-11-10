import type { MetadataRoute } from "next";

const SITE = "https://filizkarabulut.com";

/**
 * Public URLs advertised to crawlers: the homepage and the two project case
 * studies (SpIQ, Ask VALIANT) that have their own routes.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE, lastModified: now, changeFrequency: "monthly", priority: 1 },
    {
      url: `${SITE}/projects/spiq`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${SITE}/projects/ask-valiant`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}

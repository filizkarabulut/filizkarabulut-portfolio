import type { MetadataRoute } from "next";

const SITE = "https://filizkarabulut.com";

/**
 * Allow indexing only on the production deployment. Vercel preview/development
 * deployments (VERCEL_ENV !== "production") are disallowed so draft URLs don't
 * get indexed. Local `next start` has no VERCEL_ENV and is treated as non-prod.
 */
export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV === "production";

  if (!isProduction) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}

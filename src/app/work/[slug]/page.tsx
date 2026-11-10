import { permanentRedirect } from "next/navigation";
import { projectCards } from "@/data/portfolio";

export const dynamicParams = false;

export function generateStaticParams() {
  return projectCards
    .map((p) => p.caseStudySlug)
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => ({ slug }));
}

/** Old case-study URL — permanently moved to /projects/[slug]. */
export default async function LegacyWorkRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  permanentRedirect(`/projects/${slug}`);
}

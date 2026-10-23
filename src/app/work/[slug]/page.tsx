import { permanentRedirect } from "next/navigation";
import { caseStudies } from "@/data/portfolio";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
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

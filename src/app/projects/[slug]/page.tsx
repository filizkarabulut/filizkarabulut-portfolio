import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortfolioHome } from "@/components/PortfolioHome";
import { ProjectModal } from "@/components/ProjectModal";
import { projectCardBySlug, projectCards, siteName } from "@/data/portfolio";

export const dynamicParams = false;

export function generateStaticParams() {
  return projectCards
    .map((p) => p.caseStudySlug)
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const card = projectCardBySlug(slug);
  if (!card) return {};
  const { name, description } = card;
  const url = `/projects/${slug}`;
  return {
    title: `${name} — ${siteName}`,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${name} — ${siteName}`, description, url, type: "article", siteName },
    twitter: { card: "summary_large_image", title: `${name} — ${siteName}`, description },
  };
}

/**
 * The project page shown on a direct visit / refresh of /projects/[slug] (the
 * modal's own URL). It renders the portfolio homepage with the project modal
 * open over it — so a shared link lands on the case study over the real
 * (blurred) portfolio, matching the soft-navigation experience.
 */
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const card = projectCardBySlug(slug);
  if (!card) notFound();

  return (
    <>
      <PortfolioHome />
      <ProjectModal project={card} />
    </>
  );
}

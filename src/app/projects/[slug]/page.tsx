import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudyArticle } from "@/components/CaseStudyArticle";
import { CommandPalette } from "@/components/CommandPalette";
import { ConsoleGreeting } from "@/components/ConsoleGreeting";
import { PaletteButton } from "@/components/PaletteButton";
import { PortfolioHome } from "@/components/PortfolioHome";
import { ProjectModal } from "@/components/ProjectModal";
import { SiteFooter } from "@/components/SiteFooter";
import {
  caseStudies,
  caseStudyBySlug,
  projectCardBySlug,
  siteName,
} from "@/data/portfolio";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const card = projectCardBySlug(slug);
  const cs = caseStudyBySlug(slug);
  const name = card?.name ?? cs?.title;
  if (!name) return {};
  const description = card?.description ?? cs?.summary;
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
 * modal's own URL). For the featured projects it renders the portfolio homepage
 * with the project modal open over it — so a shared link lands on the case study
 * over the real (blurred) portfolio, matching the soft-navigation experience.
 * Other (legacy) case studies fall back to the standalone article page.
 */
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const card = projectCardBySlug(slug);
  if (card) {
    return (
      <>
        <PortfolioHome />
        <ProjectModal project={card} />
      </>
    );
  }

  const cs = caseStudyBySlug(slug);
  if (!cs) notFound();

  return (
    <main className="page cs-page">
      <div className="cs-topbar">
        <Link href="/#projects" className="cs-back">
          <span aria-hidden="true">←</span> {siteName}
        </Link>
        <PaletteButton />
      </div>

      <article className="cs">
        <CaseStudyArticle study={cs} reveal />

        <Link href="/#projects" className="read-link cs-return">
          <span aria-hidden="true">←</span> Back to projects
        </Link>
      </article>

      <SiteFooter />
      <CommandPalette />
      <ConsoleGreeting />
    </main>
  );
}

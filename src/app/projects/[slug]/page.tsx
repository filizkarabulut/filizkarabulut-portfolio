import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudyArticle } from "@/components/CaseStudyArticle";
import { CommandPalette } from "@/components/CommandPalette";
import { ConsoleGreeting } from "@/components/ConsoleGreeting";
import { PaletteButton } from "@/components/PaletteButton";
import { SiteFooter } from "@/components/SiteFooter";
import { caseStudies, caseStudyBySlug, siteName } from "@/data/portfolio";

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
  const cs = caseStudyBySlug(slug);
  if (!cs) return {};
  const title = `${cs.title} — ${siteName}`;
  const description = cs.summary;
  const url = `/projects/${cs.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article", siteName },
    twitter: { card: "summary_large_image", title, description },
  };
}

/** Full case study — shown on a direct visit or refresh of /projects/[slug]. */
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
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

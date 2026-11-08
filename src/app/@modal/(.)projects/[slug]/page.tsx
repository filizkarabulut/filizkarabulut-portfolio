import { notFound } from "next/navigation";
import { ProjectModal } from "@/components/ProjectModal";
import { projectCardBySlug } from "@/data/portfolio";

/**
 * Intercepts a soft navigation to /projects/[slug] (e.g. clicking a project on
 * the homepage) and renders the short card as a popup over the current page.
 * A direct visit or refresh skips this and renders the full page instead.
 */
export default async function ProjectModalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectCardBySlug(slug);
  if (!project) notFound();
  return <ProjectModal project={project} intercepted />;
}

import type { ProjectCard } from "@/data/portfolio";
import { ProjectCardBody } from "./ProjectCardBody";

/** One project in the home Projects list — the shared card body in a list item. */
export function ProjectEntry({ project }: { project: ProjectCard }) {
  return (
    <li className="pj">
      <ProjectCardBody project={project} context="list" />
    </li>
  );
}

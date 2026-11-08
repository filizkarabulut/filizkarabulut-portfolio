import Image from "next/image";
import Link from "next/link";
import type { ProjectCard } from "@/data/portfolio";
import { CardVideo } from "./CardVideo";
import { Chip, TagRow } from "./primitives";
import { StatText } from "./StatText";

/**
 * The shared body of a project card. The text content (title with its code
 * link, role·team subtitle, description, highlights, tags) reads the same on the
 * Projects list and inside the popup / full page. The list adds a right-hand
 * column — a thumbnail with a "Learn more →" link beneath it — that fills the
 * empty band next to the short description; the detail views already ARE the
 * case study, so they render the text column alone.
 */
export function ProjectCardBody({
  project: p,
  context = "list",
}: {
  project: ProjectCard;
  context?: "list" | "detail";
}) {
  const isList = context === "list";
  const hasHighlights = (p.awards?.length ?? 0) > 0 || Boolean(p.event);

  const main = (
    <div className="pj-main">
      <div className="pj-head">
        <div className="pj-title">
          <h3 className="pj-name">{p.name}</h3>
          {p.links?.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="pj-codelink"
            >
              {l.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
        <span className="pj-dates mono">{p.dates}</span>
      </div>

      {p.subtitle && (
        <p className="pj-subtitle">
          <StatText text={p.subtitle} emphasize={p.subtitleEmphasis} />
        </p>
      )}

      <p className="pj-desc">{p.description}</p>

      {hasHighlights && (
        <p className="pj-highlights">
          {p.awards?.map((a) => (
            <Chip key={a}>{a}</Chip>
          ))}
          {p.event && <span className="pj-event">{p.event}</span>}
        </p>
      )}

      <TagRow tags={p.tags} />
    </div>
  );

  // Detail views render the text column on its own (they are the case study).
  if (!isList) return main;

  return (
    <div className="pj-grid">
      {main}
      <aside className="pj-aside">
        <div className="pj-thumb">
          {p.thumbnailVideo && p.thumbnail ? (
            <CardVideo
              src={p.thumbnailVideo}
              poster={p.thumbnail}
              alt={p.thumbnailAlt ?? `${p.name} demo preview`}
            />
          ) : p.thumbnail ? (
            <Image
              src={p.thumbnail}
              alt={p.thumbnailAlt ?? `${p.name} preview`}
              fill
              sizes="220px"
              className="pj-thumb__img"
            />
          ) : (
            <span className="pj-thumb__ph">
              <span aria-hidden="true">▶</span> Preview
            </span>
          )}
        </div>
        {p.caseStudySlug && (
          <Link
            href={`/projects/${p.caseStudySlug}`}
            className="pj-learn"
            scroll={false}
          >
            Learn more <span aria-hidden="true">→</span>
          </Link>
        )}
      </aside>
    </div>
  );
}

/** The résumé "Overview" bullets, shown in the popup / full page only. */
export function ProjectOverview({ overview }: { overview?: string[] }) {
  if (!overview || overview.length === 0) return null;
  return (
    <section className="pj-overview">
      <h2 className="section-head">
        <span className="section-head__mark" aria-hidden="true">
          #
        </span>
        Overview
      </h2>
      <ul className="bullets">
        {overview.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </section>
  );
}

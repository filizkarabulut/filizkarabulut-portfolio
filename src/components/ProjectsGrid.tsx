import Link from "next/link";
import type { CaseStudy } from "@/data/portfolio";

/**
 * The Projects list. Each "Read case study" links to /projects/[slug]. A plain
 * click is intercepted and opens the project as a popup card over the homepage
 * (and updates the URL); opening or refreshing that URL shows the full page.
 */
export function ProjectsGrid({ studies }: { studies: CaseStudy[] }) {
  return (
    <ul className="work-list">
      {studies.map((c) => (
        <li key={c.slug} className="work-card">
          <div className="work-card__head">
            <h3 className="work-card__title">{c.title}</h3>
            <span className="work-card__time mono">{c.timeline}</span>
          </div>
          <p className="work-card__summary">{c.summary}</p>
          <dl className="kv">
            <div>
              <dt className="mono">Role</dt>
              <dd>{c.role}</dd>
            </div>
            {c.team && (
              <div>
                <dt className="mono">Team</dt>
                <dd>{c.team}</dd>
              </div>
            )}
          </dl>
          <ul className="tag-row" aria-label="Stack">
            {c.stack.map((t) => (
              <li key={t} className="tag mono">
                {t}
              </li>
            ))}
          </ul>
          <Link href={`/projects/${c.slug}`} className="read-link" scroll={false}>
            Read case study <span aria-hidden="true">→</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

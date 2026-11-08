import type { ReactNode } from "react";
import type { ProjectCard, ProjectCaseStudyData } from "@/data/portfolio";
import { ArchitectureExplorer } from "./ArchitectureExplorer";
import type { NodeDetail } from "./architectureNodes";
import { StatText } from "./StatText";

/** A numbered column heading: "01 / Demo". */
function ColHead({ num, title }: { num: string; title: string }) {
  return (
    <h2 className="av-head av2-colhead">
      <span className="av-head__num mono" aria-hidden="true">
        {num}
      </span>
      <span className="av-head__sep mono" aria-hidden="true">
        /
      </span>
      {title}
    </h2>
  );
}

/**
 * The compact project showcase shown in the macOS modal: a tight header (title
 * with an inline Code ↗ link, meta, one-line description, tags) over a two-column
 * layout that puts the demo video and an interactive architecture diagram side by
 * side on desktop and stacks them on narrow screens. Shared by SpIQ and Ask
 * VALIANT; each supplies its own diagram renderer and node details.
 */
export function ProjectShowcase({
  card,
  data,
  details,
  hint,
  renderDiagram,
}: {
  card: ProjectCard;
  data: ProjectCaseStudyData;
  details: Record<string, NodeDetail>;
  hint: string;
  renderDiagram: (
    selected: string | null,
    onSelect: (id: string) => void,
  ) => ReactNode;
}) {
  const demo = data.demo;
  const points = data.howItWorks.points ?? [];

  return (
    <div className="av2">
      {/* ---- Header ---- */}
      <header className="av2-header">
        <div className="av2-titlerow">
          <h1 className="av2-title">{card.name}</h1>
          {card.links?.map((l) => (
            <a
              key={l.href}
              className="av2-codelink"
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {l.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
        {card.subtitle && (
          <p className="av2-meta">
            <StatText text={card.subtitle} emphasize={card.subtitleEmphasis} />
            <span className="av2-dates mono">{card.dates}</span>
          </p>
        )}
        <p className="av2-desc">{card.description}</p>
        <ul className="tag-row av2-tags" aria-label="Stack">
          {card.tags.map((t) => (
            <li key={t} className="tag mono">
              {t}
            </li>
          ))}
        </ul>
      </header>

      {/* ---- Two columns: Demo | How It Works ---- */}
      <div className="av2-grid">
        <section className="av2-col av2-col--demo">
          <ColHead num="01" title="Demo" />
          <figure className="av-media av2-media">
            <div className="av-video">
              {demo.src ? (
                <video
                  className="av-video__el"
                  controls
                  playsInline
                  preload="metadata"
                  poster={demo.poster}
                >
                  <source src={demo.src} type="video/mp4" />
                  {demo.captions && (
                    <track
                      kind="captions"
                      src={demo.captions}
                      srcLang="en"
                      label="English"
                      default
                    />
                  )}
                </video>
              ) : (
                <div className="av-ph av-ph--video">
                  <span className="av-play" aria-hidden="true" />
                  <p className="ph-title">Demo video coming soon</p>
                  {demo.placeholderHint && (
                    <p className="ph-hint mono">{demo.placeholderHint}</p>
                  )}
                </div>
              )}
            </div>
            <figcaption className="av-caption">{demo.caption}</figcaption>
          </figure>
        </section>

        <section className="av2-col av2-col--how">
          <ColHead num="02" title="How It Works" />
          <ArchitectureExplorer
            points={points}
            details={details}
            hint={hint}
            renderDiagram={renderDiagram}
          />
        </section>
      </div>
    </div>
  );
}

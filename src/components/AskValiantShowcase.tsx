import type { ProjectCard, ProjectCaseStudyData } from "@/data/portfolio";
import { AskValiantHowItWorks } from "./AskValiantHowItWorks";

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
 * The compact Ask VALIANT modal body: a tight header (title with an inline
 * Code ↗ link, meta, one-line description, tags) over a two-column layout that
 * puts the demo video and the architecture diagram side by side on desktop and
 * stacks them on narrow screens. No long prose — the essentials only.
 */
export function AskValiantShowcase({
  card,
  data,
}: {
  card: ProjectCard;
  data: ProjectCaseStudyData;
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
            {card.subtitle}
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
            </div>
            <figcaption className="av-caption">{demo.caption}</figcaption>
          </figure>
        </section>

        <section className="av2-col av2-col--how">
          <ColHead num="02" title="How It Works" />
          <AskValiantHowItWorks points={points} />
        </section>
      </div>
    </div>
  );
}

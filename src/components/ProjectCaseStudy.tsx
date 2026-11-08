import type { ReactNode } from "react";
import type {
  CaseStudyMedia,
  ProjectCard,
  ProjectCaseStudyData,
} from "@/data/portfolio";
import { CodeBlock } from "./CodeBlock";
import { Diagram } from "./Diagram";
import { StatText } from "./StatText";
import { ZoomableFigure } from "./ZoomableFigure";

/** A paragraph that still begins with "TODO" renders muted, as a visible
 *  placeholder prompt rather than real copy. */
const isTodo = (s: string) => /^\s*todo\b/i.test(s);

function Paras({ items }: { items?: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <>
      {items.map((p, i) =>
        isTodo(p) ? (
          <p key={i} className="av-todo mono">
            {p}
          </p>
        ) : (
          <p key={i} className="av-prose">
            {p}
          </p>
        ),
      )}
    </>
  );
}

/** A numbered section: "01 / Demo". */
function Section({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="av-section">
      <h2 className="av-head">
        <span className="av-head__num mono" aria-hidden="true">
          {num}
        </span>
        <span className="av-head__sep mono" aria-hidden="true">
          /
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

/** Map a video file extension to its MIME type (helps every browser pick the
 *  source without probing). Falls back to no type for unknown extensions. */
const VIDEO_MIME: Record<string, string> = {
  mp4: "video/mp4",
  webm: "video/webm",
  ogv: "video/ogg",
  mov: "video/quicktime",
};
function videoType(src: string): string | undefined {
  const ext = src.split("?")[0].split(".").pop()?.toLowerCase();
  return ext ? VIDEO_MIME[ext] : undefined;
}

/** 01 — Demo video (server-rendered <video>; labelled placeholder until added). */
function Demo({ media }: { media: CaseStudyMedia }) {
  return (
    <figure className="av-media">
      <div className="av-video">
        {media.src ? (
          <video
            className="av-video__el"
            controls
            playsInline
            preload="metadata"
            poster={media.poster}
          >
            <source src={media.src} type={videoType(media.src)} />
            {media.captions && (
              <track
                kind="captions"
                src={media.captions}
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
            {media.placeholderHint && (
              <p className="ph-hint mono">{media.placeholderHint}</p>
            )}
          </div>
        )}
      </div>
      <figcaption className="av-caption">{media.caption}</figcaption>
    </figure>
  );
}

/**
 * The body of a project case study, rendered inside the macOS-style modal: a
 * header (name, role/awards, dates, description, tags, GitHub link) followed by
 * the five numbered sections. Built from the site's existing tokens. Section
 * content differs per project; the "How It Works" agent grid only renders for
 * projects that define agents (e.g. Ask VALIANT's multi-agent system).
 */
export function ProjectCaseStudy({
  card,
  data,
}: {
  card: ProjectCard;
  data: ProjectCaseStudyData;
}) {
  const { howItWorks: how } = data;

  return (
    <div className="av">
      {/* ---- Header ---- */}
      <header className="av-header">
        <h1 className="av-title">{card.name}</h1>
        {card.subtitle && (
          <p className="av-subtitle">
            <StatText text={card.subtitle} emphasize={card.subtitleEmphasis} />
          </p>
        )}
        <p className="av-dates mono">{card.dates}</p>
        <p className="av-lead">{card.description}</p>

        <ul className="tag-row av-tags" aria-label="Stack">
          {card.tags.map((t) => (
            <li key={t} className="tag mono">
              {t}
            </li>
          ))}
        </ul>

        {card.links && card.links.length > 0 && (
          <div className="av-links">
            {card.links.map((l) => (
              <a
                key={l.href}
                className="av-btn"
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {l.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ---- 01 / Demo ---- */}
      <Section num="01" title="Demo">
        <Demo media={data.demo} />
      </Section>

      {/* ---- 02 / The Problem ---- */}
      <Section num="02" title="The Problem">
        <Paras items={data.problem} />
      </Section>

      {/* ---- 03 / How It Works ---- */}
      <Section num="03" title="How It Works">
        <Paras items={how.overview} />
        {how.diagramData ? (
          <Diagram data={how.diagramData} />
        ) : how.diagram ? (
          <ZoomableFigure media={how.diagram} />
        ) : null}

        {how.agents && how.agents.length > 0 && (
          <div className="av-agents">
            {how.agents.map((a) => (
              <div key={a.name} className="av-agent">
                <h3 className="av-agent__name">{a.name}</h3>
                <p className="av-agent__role">{a.role}</p>
                {isTodo(a.detail) ? (
                  <p className="av-todo mono">{a.detail}</p>
                ) : (
                  <p className="av-agent__detail">{a.detail}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {how.collaboration && how.collaboration.length > 0 && (
          <>
            <h3 className="av-subhead">Working together</h3>
            <Paras items={how.collaboration} />
          </>
        )}
      </Section>

      {/* ---- 04 / Engineering Highlights ---- */}
      <Section num="04" title="Engineering Highlights">
        <div className="av-highlights">
          {data.engineering.map((h) => (
            <div key={h.title} className="av-highlight">
              <h3 className="av-subhead">{h.title}</h3>
              <Paras items={h.body} />
              {h.points && h.points.length > 0 && (
                <ul className="bullets">
                  {h.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              )}
              {h.code && <CodeBlock code={h.code} />}
            </div>
          ))}
        </div>
      </Section>

      {/* ---- 05 / Results & Impact ---- */}
      <Section num="05" title="Results & Impact">
        {data.results.stats && data.results.stats.length > 0 && (
          <dl className="av-stats">
            {data.results.stats.map((s) => (
              <div key={s.label} className="av-stat">
                <dt className="av-stat__value">{s.value}</dt>
                <dd className="av-stat__label mono">{s.label}</dd>
              </div>
            ))}
          </dl>
        )}
        <ul className="bullets av-results">
          {data.results.points.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
        {data.results.note && (
          <p className="av-todo mono">{data.results.note}</p>
        )}
      </Section>
    </div>
  );
}

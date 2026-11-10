import type { ExperienceEntry as Entry } from "@/data/portfolio";
import { Chip, TagRow } from "./primitives";
import { StatText } from "./StatText";

/**
 * One timeline entry — shared by the Experience and Leadership sections. Header
 * (role · org, dates), an optional context line with headline-number chips,
 * then a bulleted item list where each item may carry its own title,
 * description, and tags. Missing fields render nothing (no empty gaps).
 */
export function ExperienceEntry({ entry: e }: { entry: Entry }) {
  const hasContext = Boolean(e.context) || (e.chips?.length ?? 0) > 0;

  return (
    <li className="xp">
      <div className="xp-head">
        <p className="xp-roleline">
          <span className="xp-role">{e.role}</span>
          <span className="xp-org">
            {" · "}
            {e.orgHref ? (
              <a
                href={e.orgHref}
                target="_blank"
                rel="noopener noreferrer"
                className="xp-org__link"
              >
                {e.org}
                <span aria-hidden="true"> ↗</span>
              </a>
            ) : (
              e.org
            )}
          </span>
        </p>
        <span className="xp-dates mono">{e.dates}</span>
      </div>

      {e.note && <p className="xp-note">{e.note}</p>}

      {hasContext && (
        <p className="xp-context">
          {e.context && <span className="xp-context__text">{e.context}</span>}
          {e.chips?.map((c) => (
            <Chip key={c}>{c}</Chip>
          ))}
        </p>
      )}

      {/* Entry-level tag fallback (only when tags can't be attributed per item). */}
      {!hasContext && e.contextTags && <TagRow tags={e.contextTags} />}
      {hasContext && e.contextTags && (
        <div className="xp-context-tags">
          <TagRow tags={e.contextTags} />
        </div>
      )}

      <ul className="xp-items">
        {e.items.map((it, i) => (
          <li key={i} className="xp-item">
            {it.title && (
              <h3 className="xp-item__title">
                {it.title}
                {it.inProgress && (
                  <span className="xp-item__status">In&nbsp;Progress</span>
                )}
              </h3>
            )}
            {it.description && (
              <p className="xp-item__desc">
                <StatText text={it.description} />
              </p>
            )}
            <TagRow tags={it.tags} />
          </li>
        ))}
      </ul>
    </li>
  );
}

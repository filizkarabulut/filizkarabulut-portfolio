import type { CaseStudy } from "@/data/portfolio";

/** Is a link real (has a usable href and isn't a TODO placeholder)? */
function realLinks(cs: CaseStudy) {
  return (cs.links ?? []).filter(
    (l) => !l.todo && l.href && l.href !== "#" && !/\(todo\)/i.test(l.label),
  );
}

/**
 * The short, always-shown head of a case study: title, one-line summary, an
 * optional screenshot, the role/timeline/team meta, stack tags, and the repo /
 * demo link buttons (rendered only when a link exists). Shared by the popup card
 * and the full page.
 */
export function CaseStudyHeader({ study: cs }: { study: CaseStudy }) {
  const links = realLinks(cs);
  return (
    <header className="cs-header">
      <h1 className="cs-title">{cs.title}</h1>
      <p className="cs-summary">{cs.summary}</p>

      {cs.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="cs-shot"
          src={cs.image}
          alt={cs.imageAlt ?? `${cs.title} screenshot`}
          loading="lazy"
        />
      )}

      <dl className="kv cs-kv">
        <div>
          <dt className="mono">Role</dt>
          <dd>{cs.role}</dd>
        </div>
        <div>
          <dt className="mono">Timeline</dt>
          <dd className="mono">{cs.timeline}</dd>
        </div>
        {cs.team && (
          <div>
            <dt className="mono">Team</dt>
            <dd>{cs.team}</dd>
          </div>
        )}
      </dl>

      <ul className="tag-row" aria-label="Stack">
        {cs.stack.map((t) => (
          <li key={t} className="tag mono">
            {t}
          </li>
        ))}
      </ul>

      {links.length > 0 && (
        <div className="cs-btns">
          {links.map((l) => (
            <a
              key={l.label}
              className="cs-btn"
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
  );
}

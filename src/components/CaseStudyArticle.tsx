import type { ReactNode } from "react";
import type { CaseStudy } from "@/data/portfolio";
import { CaseStudyHeader } from "./CaseStudyHeader";
import { Diagram } from "./Diagram";
import { Reveal } from "./Reveal";

/** A placeholder line left to fill in — hidden until it has real content. */
const isTodo = (s?: string) =>
  !s || /^\s*todo\b/i.test(s.trim()) || /\(todo\)/i.test(s);
const real = (arr?: string[]) => (arr ?? []).filter((s) => !isTodo(s));

function Block({
  title,
  reveal,
  children,
}: {
  title: string;
  reveal: boolean;
  children: ReactNode;
}) {
  return (
    <section className="cs-block">
      <h2 className="section-head">
        <span className="section-head__mark" aria-hidden="true">
          #
        </span>
        {title}
      </h2>
      {reveal ? <Reveal>{children}</Reveal> : children}
    </section>
  );
}

/**
 * The full case study: the shared header plus the long sections. Every section
 * is rendered only when it has real (non-TODO) content, so unfinished parts just
 * stay hidden until a field is filled in.
 */
export function CaseStudyArticle({
  study: cs,
  reveal = false,
}: {
  study: CaseStudy;
  reveal?: boolean;
}) {
  const problem = real(cs.problem);
  const explanation = real(cs.architecture.explanation);
  const hasArchitecture = Boolean(cs.architecture.diagram) || explanation.length > 0;
  const decisions = cs.decisions.filter((d) => !isTodo(d.choice));
  const challenges = real(cs.challenges);
  const results = real(cs.results);

  return (
    <>
      <CaseStudyHeader study={cs} />

      {problem.length > 0 && (
        <Block title="Problem" reveal={reveal}>
          {problem.map((p, i) => (
            <p key={i} className="prose">
              {p}
            </p>
          ))}
        </Block>
      )}

      {hasArchitecture && (
        <Block title="Architecture" reveal={reveal}>
          {cs.architecture.diagram && <Diagram data={cs.architecture.diagram} />}
          {explanation.map((p, i) => (
            <p key={i} className="prose">
              {p}
            </p>
          ))}
        </Block>
      )}

      {decisions.length > 0 && (
        <Block title="Key decisions" reveal={reveal}>
          <ul className="decisions">
            {decisions.map((d, i) => (
              <li key={i} className="decision">
                <p className="decision__choice">{d.choice}</p>
                {(!isTodo(d.why) || !isTodo(d.cost)) && (
                  <dl className="decision__detail">
                    {!isTodo(d.why) && (
                      <div>
                        <dt className="mono">Why</dt>
                        <dd>{d.why}</dd>
                      </div>
                    )}
                    {!isTodo(d.cost) && (
                      <div>
                        <dt className="mono">Cost</dt>
                        <dd>{d.cost}</dd>
                      </div>
                    )}
                  </dl>
                )}
              </li>
            ))}
          </ul>
        </Block>
      )}

      {challenges.length > 0 && (
        <Block title="Challenges" reveal={reveal}>
          <ul className="bullets">
            {challenges.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </Block>
      )}

      {results.length > 0 && (
        <Block title="Results" reveal={reveal}>
          <ul className="bullets">
            {results.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </Block>
      )}
    </>
  );
}

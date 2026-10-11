import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Diagram } from "@/components/Diagram";
import { Reveal } from "@/components/Reveal";
import { CommandPalette } from "@/components/CommandPalette";
import { ConsoleGreeting } from "@/components/ConsoleGreeting";
import { PaletteButton } from "@/components/PaletteButton";
import { SiteFooter } from "@/components/SiteFooter";
import {
  caseStudies,
  caseStudyBySlug,
  siteName,
} from "@/data/portfolio";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudyBySlug(slug);
  if (!cs) return {};
  const title = `${cs.title} — ${siteName}`;
  const description = cs.summary;
  const url = `/work/${cs.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="cs-block">
      <h2 className="section-head">
        <span className="section-head__mark" aria-hidden="true">
          #
        </span>
        {title}
      </h2>
      <Reveal>{children}</Reveal>
    </section>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = caseStudyBySlug(slug);
  if (!cs) notFound();

  return (
    <main className="page cs-page">
      <div className="cs-topbar">
        <Link href="/#work" className="cs-back">
          <span aria-hidden="true">←</span> {siteName}
        </Link>
        <PaletteButton />
      </div>

      <article className="cs">
        <header className="cs-header">
          <h1 className="cs-title">{cs.title}</h1>
          <p className="cs-summary">{cs.summary}</p>

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

          {cs.links && cs.links.length > 0 && (
            <ul className="cs-links">
              {cs.links.map((l) => (
                <li key={l.label}>
                  {l.todo ? (
                    <span className="cs-link is-todo">{l.label} (TODO)</span>
                  ) : (
                    <a
                      className="cs-link"
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {l.label} <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          )}
        </header>

        <Block title="Problem">
          {cs.problem.map((p, i) => (
            <p key={i} className="prose">
              {p}
            </p>
          ))}
        </Block>

        <Block title="Architecture">
          {cs.architecture.diagram ? (
            <Diagram data={cs.architecture.diagram} />
          ) : (
            <p className="prose todo-note">TODO: add an architecture diagram.</p>
          )}
          {cs.architecture.explanation.map((p, i) => (
            <p key={i} className="prose">
              {p}
            </p>
          ))}
        </Block>

        <Block title="Key decisions">
          <ul className="decisions">
            {cs.decisions.map((d, i) => (
              <li key={i} className="decision">
                <p className="decision__choice">{d.choice}</p>
                <dl className="decision__detail">
                  <div>
                    <dt className="mono">Why</dt>
                    <dd>{d.why}</dd>
                  </div>
                  <div>
                    <dt className="mono">Cost</dt>
                    <dd>{d.cost}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Challenges">
          <ul className="bullets">
            {cs.challenges.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </Block>

        <Block title="Results">
          <ul className="bullets">
            {cs.results.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </Block>

        <Link href="/#work" className="read-link cs-return">
          <span aria-hidden="true">←</span> Back to selected work
        </Link>
      </article>

      <SiteFooter />
      <CommandPalette />
      <ConsoleGreeting />
    </main>
  );
}

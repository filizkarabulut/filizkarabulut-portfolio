import Link from "next/link";
import type { ReactNode } from "react";
import { Shell } from "@/components/Shell";
import { Reveal } from "@/components/Reveal";
import { CopyEmail } from "@/components/CopyEmail";
import { CommandPalette } from "@/components/CommandPalette";
import { ConsoleGreeting } from "@/components/ConsoleGreeting";
import { SiteFooter } from "@/components/SiteFooter";
import { stickerImages } from "@/lib/stickerImages";
import {
  about,
  education,
  experience,
  leadership,
  projects,
  githubUrl,
  linkedinUrl,
  offTheClock,
  resumeUrl,
} from "@/data/portfolio";

/** A top-level page section: focusable (for scroll-to) with a mono eyebrow. */
function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} tabIndex={-1} className="section" aria-labelledby={`${id}-h`}>
      <div className="section-inner">
        <h2 id={`${id}-h`} className="section-head">
          <span className="section-head__mark" aria-hidden="true">
            #
          </span>
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

export default function Home() {
  const projectList = projects();

  return (
    <main className="page">
      <Shell stickerSrc={stickerImages}>
        <Section id="about" title="About">
        <Reveal>
          <p className="prose">{about.lead}</p>
          <p className="currently">
            <span className="currently__k mono">Currently</span>
            {about.currently}
          </p>
        </Reveal>
      </Section>

      <Section id="experience" title="Experience">
        <Reveal>
          <ol className="timeline">
            {experience.map((e, i) => (
              <li key={i} className="timeline-item">
                <div className="timeline-head">
                  <p className="timeline-roleline">
                    <span className="timeline-role">{e.role}</span>
                    <span className="timeline-org"> · {e.org}</span>
                  </p>
                  <span className="timeline-dates mono">{e.dates}</span>
                </div>
                {e.lines.map((l, j) => (
                  <p key={j} className="timeline-line">
                    {l}
                  </p>
                ))}
              </li>
            ))}
          </ol>
        </Reveal>
      </Section>

      <Section id="projects" title="Projects">
        <Reveal>
          <ul className="work-list">
            {projectList.map((c) => (
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
                <Link href={`/work/${c.slug}`} className="read-link">
                  Read case study <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section id="leadership" title="Leadership">
        <Reveal>
          <ol className="timeline">
            {leadership.map((e, i) => (
              <li key={i} className="timeline-item">
                <div className="timeline-head">
                  <p className="timeline-roleline">
                    <span className="timeline-role">{e.role}</span>
                    <span className="timeline-org"> · {e.org}</span>
                  </p>
                  <span className="timeline-dates mono">{e.dates}</span>
                </div>
                {e.lines.map((l, j) => (
                  <p key={j} className="timeline-line">
                    {l}
                  </p>
                ))}
              </li>
            ))}
          </ol>
        </Reveal>
      </Section>

      <Section id="education" title="Education">
        <Reveal>
          <div className="edu">
            <div className="timeline-head">
              <p className="timeline-roleline">
                <span className="timeline-role">{education.school}</span>
              </p>
              <span className="timeline-dates mono">{education.dates}</span>
            </div>
            <p className="timeline-line">{education.degree}</p>
            <p className="timeline-line">{education.minor}</p>
            <ul className="tag-row" aria-label="Honors">
              {education.honors.map((h) => (
                <li key={h} className="tag mono">
                  {h}
                </li>
              ))}
            </ul>
            {education.note && <p className="edu-note">{education.note}</p>}
          </div>
        </Reveal>
      </Section>

      <Section id="play" title="Off the clock">
        <Reveal>
          <p className="prose">{offTheClock}</p>
        </Reveal>
      </Section>

      <Section id="contact" title="Contact">
        <Reveal>
          <div className="contact">
            <CopyEmail />
            <ul className="contact-links">
              <li>
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  GitHub <span aria-hidden="true">↗</span>
                </a>
              </li>
              <li>
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                  LinkedIn <span aria-hidden="true">↗</span>
                </a>
              </li>
              <li>
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                  Résumé <span aria-hidden="true">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </Reveal>
        </Section>

        <SiteFooter />
      </Shell>

      <CommandPalette />
      <ConsoleGreeting />
    </main>
  );
}

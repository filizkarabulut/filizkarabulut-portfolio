import type { ReactNode } from "react";
import { Shell } from "@/components/Shell";
import { Reveal } from "@/components/Reveal";
import { CopyEmail } from "@/components/CopyEmail";
import { CommandPalette } from "@/components/CommandPalette";
import { ConsoleGreeting } from "@/components/ConsoleGreeting";
import { ExperienceEntry } from "@/components/ExperienceEntry";
import { Intro } from "@/components/Intro";
import { ProjectEntry } from "@/components/ProjectEntry";
import { Chip, Tag } from "@/components/primitives";
import { SiteFooter } from "@/components/SiteFooter";
import { StatText } from "@/components/StatText";
import { stickerImages } from "@/lib/stickerImages";
import {
  about,
  education,
  experience,
  leadership,
  projectCards,
  githubUrl,
  letterboxdUrl,
  linkedinUrl,
  offTheClock,
  resumeUrl,
} from "@/data/portfolio";

/** Split the Off-the-clock line so only the word "films" becomes a link. */
const [offTheClockBefore, offTheClockAfter] = offTheClock.split("films");

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

/**
 * The full portfolio homepage. Rendered on "/" and also behind the project
 * modal on a direct visit to /projects/[slug], so a shared link shows the case
 * study over the real (blurred, dimmed) portfolio rather than a blank backdrop.
 */
export function PortfolioHome() {
  return (
    <main className="page">
      <Intro />
      <Shell stickerSrc={stickerImages}>
        <Section id="about" title="About">
          <Reveal>
            <p className="prose">
              <StatText
                text={about.lead}
                emphasize={["AI Research Intern", "VandyHacks"]}
              />
            </p>
          </Reveal>
        </Section>

        <Section id="experience" title="Experience">
          <Reveal>
            <ol className="timeline">
              {experience.map((e, i) => (
                <ExperienceEntry key={i} entry={e} />
              ))}
            </ol>
          </Reveal>
        </Section>

        <Section id="projects" title="Projects">
          <Reveal>
            <ul className="pj-list">
              {projectCards.map((p) => (
                <ProjectEntry key={p.name} project={p} />
              ))}
            </ul>
          </Reveal>
        </Section>

        <Section id="leadership" title="Leadership">
          <Reveal>
            <ol className="timeline">
              {leadership.map((e, i) => (
                <ExperienceEntry key={i} entry={e} />
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
              <p className="timeline-line edu-minor">{education.minor}</p>
              {education.chips.length > 0 && (
                <ul className="edu-chips" aria-label="Achievements">
                  {education.chips.map((c) => (
                    <li key={c}>
                      <Chip>{c}</Chip>
                    </li>
                  ))}
                </ul>
              )}
              {education.coursework.length > 0 && (
                <div className="edu-coursework">
                  <span className="edu-coursework__label mono">Coursework</span>
                  <ul className="tag2-row" aria-label="Coursework">
                    {education.coursework.map((c) => (
                      <Tag key={c}>{c}</Tag>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Reveal>
        </Section>

        <Section id="play" title="Off the clock">
          <Reveal>
            <p className="prose">
              {offTheClockBefore}
              <a
                href={letterboxdUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-link"
              >
                films
              </a>
              {offTheClockAfter}
            </p>
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
                    Resume <span aria-hidden="true">↗</span>
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

"use client";

import { useCallback, type ReactNode } from "react";
import { Laptop } from "./Laptop";
import { Sticker } from "./Sticker";
import { useActiveSection } from "@/hooks/useActiveSection";
import { goToSection } from "@/lib/nav";
import type { StickerImage } from "@/lib/stickerImages";
import {
  githubUrl,
  intro,
  linkedinUrl,
  location,
  navSections,
  resumeUrl,
  siteName,
  stickers,
  tagline,
  type Sticker as StickerData,
} from "@/data/portfolio";

/** GitHub mark. */
function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

/** LinkedIn mark. */
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M13.63 0H2.37A2.37 2.37 0 0 0 0 2.37v11.26A2.37 2.37 0 0 0 2.37 16h11.26A2.37 2.37 0 0 0 16 13.63V2.37A2.37 2.37 0 0 0 13.63 0ZM4.94 13.19H2.72V6.03h2.22v7.16ZM3.83 5.05a1.29 1.29 0 1 1 0-2.58 1.29 1.29 0 0 1 0 2.58Zm9.36 8.14h-2.22V9.71c0-.83-.01-1.9-1.16-1.9-1.16 0-1.34.91-1.34 1.84v3.54H6.25V6.03h2.13v.98h.03c.3-.56 1.02-1.16 2.1-1.16 2.25 0 2.67 1.48 2.67 3.41v3.93Z" />
    </svg>
  );
}

/** Stable section-id list for the observer (derived once, module scope). */
const SECTION_IDS = navSections.map((s) => s.id);

/** The nav stickers (those that scroll to a section) — used for the mobile bar. */
const NAV_STICKERS = stickers.filter((s) => s.opens);

/**
 * The page shell: a sticky left column (identity, sticker laptop, actions) and
 * a scrolling right column that renders `children` (the sections). The sticker
 * laptop is the only navigation. Below 1024px the left column sits at the top
 * at full width and a slim sticky bar of mini stickers takes over.
 *
 * A single active-section state (from one IntersectionObserver) drives the
 * stickers on both the laptop and the mobile bar.
 */
export function Shell({
  children,
  stickerSrc,
}: {
  children: ReactNode;
  /** Resolved sticker art (id → path + size), from the server-side folder scan. */
  stickerSrc: Record<string, StickerImage>;
}) {
  const [active, setActive] = useActiveSection(SECTION_IDS);

  const go = useCallback(
    (id: string) => {
      setActive(id); // optimistic — the observer confirms once scrolling settles
      goToSection(id);
    },
    [setActive],
  );

  const onSticker = useCallback(
    (s: StickerData) => {
      if (s.opens) go(s.opens);
    },
    [go],
  );

  return (
    <div className="layout">
      <div className="layout__left">
        <div className="sidebar">
          <header className="sidebar-id">
            <h1 className="sidebar-name">{siteName}</h1>
            <p className="sidebar-tagline">{tagline}</p>
          </header>

          <p className="sidebar-intro">{intro}</p>

          <div className="sidebar-lid">
            <Laptop
              activeSection={active}
              onOpen={onSticker}
              stickerSrc={stickerSrc}
            />
          </div>

          <div className="sidebar-actions">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="sidebar-action"
            >
              Résumé <span aria-hidden="true">↗</span>
            </a>
            <a
              href="#contact"
              className="sidebar-action"
              onClick={(e) => {
                e.preventDefault();
                go("contact");
              }}
            >
              Contact
            </a>
            <span className="sidebar-social">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="sidebar-icon"
                aria-label="GitHub"
              >
                <GitHubIcon />
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="sidebar-icon"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
            </span>
          </div>

          <p className="sidebar-status">
            <span className="sidebar-status__dot" aria-hidden="true" />
            {location}
          </p>
        </div>
      </div>

      {/* Mobile only: a slim sticky bar of mini stickers that takes over once the
          laptop scrolls off the top. Hidden ≥1024px. */}
      <nav className="topnav" aria-label="Sections">
        <ul className="topnav__list">
          {NAV_STICKERS.map((s) => (
            <li key={s.id}>
              <Sticker
                sticker={s}
                mini
                image={stickerSrc[s.id]}
                active={s.opens === active}
                onOpen={onSticker}
              />
            </li>
          ))}
        </ul>
      </nav>

      <div className="layout__right">{children}</div>
    </div>
  );
}

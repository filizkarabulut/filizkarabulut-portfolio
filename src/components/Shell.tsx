"use client";

import { useCallback, type ReactNode } from "react";
import { Laptop } from "./Laptop";
import { Sticker } from "./Sticker";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useActiveSection } from "@/hooks/useActiveSection";
import { goToSection } from "@/lib/nav";
import {
  navSections,
  resumeUrl,
  siteName,
  stickers,
  tagline,
  type Sticker as StickerData,
} from "@/data/portfolio";

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
export function Shell({ children }: { children: ReactNode }) {
  const isMobile = useMediaQuery("(max-width: 1023px)");
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

          <div className="sidebar-stage">
            <div
              className="sidebar-lid"
              style={
                { "--ratio": isMobile ? "0.75" : "1.4" } as React.CSSProperties
              }
            >
              <Laptop
                isMobile={isMobile}
                activeSection={active}
                onOpen={onSticker}
              />
            </div>
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
          </div>
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
                index={0}
                mini
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

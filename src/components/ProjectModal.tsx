"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import type { ProjectCard } from "@/data/portfolio";
import { caseStudyContentBySlug } from "@/data/portfolio";
import { AskValiantShowcase } from "./AskValiantShowcase";
import { ProjectCardBody, ProjectOverview } from "./ProjectCardBody";
import { ProjectCaseStudy } from "./ProjectCaseStudy";

const FOCUSABLE =
  'a[href],button:not([disabled]),input,textarea,select,video,[tabindex]:not([tabindex="-1"])';

/**
 * A project case study shown in a macOS-style window over the (blurred, dimmed)
 * portfolio. The URL is /projects/[slug] — reached either by intercepting a soft
 * navigation from the homepage, or by a direct visit (where the project page
 * renders the portfolio behind this modal). Closes with the red traffic-light
 * dot, Esc, or an outside click.
 *
 * Projects with long-form case-study content (SpIQ, Ask VALIANT) render the full
 * 01–05 structure; any other project falls back to the short card + overview.
 * The title bar stays fixed while the body scrolls; background scroll is locked,
 * focus is trapped, and the body scroll position resets to the top per project.
 */
export function ProjectModal({
  project,
  intercepted = false,
}: {
  project: ProjectCard;
  /** True when rendered by the intercepting route (a soft navigation from the
   *  homepage). False on a direct/shared-link visit, where this modal is part
   *  of the page itself. */
  intercepted?: boolean;
}) {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const slug = project.caseStudySlug;
  const content = slug ? caseStudyContentBySlug(slug) : undefined;
  // Ask VALIANT uses a larger, two-column (demo + architecture) compact layout.
  const isShowcase = slug === "ask-valiant" && Boolean(content);

  const close = () => {
    if (intercepted) {
      // The modal lives in the intercepted @modal slot. A soft push does NOT
      // reset a parallel slot, so going back is what actually closes it — and it
      // restores the homepage at its previous scroll (the Projects section the
      // visitor came from).
      router.back();
    } else {
      // Direct/shared-link visit: this modal is part of the page, so navigate to
      // the homepage's Projects section to close it. (back() could leave the site.)
      router.push("/#projects");
    }
  };

  useEffect(() => {
    openerRef.current = document.activeElement as HTMLElement | null;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === "Tab") {
        const nodes = cardRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
        if (!nodes || nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Focus the scroll region so keyboard scrolling (arrows / space / PageDown)
    // works immediately; it's tabindex=-1, so it isn't a tab stop.
    requestAnimationFrame(() => bodyRef.current?.focus());

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      openerRef.current?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset scroll to the top whenever a different project opens in the modal.
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 });
  }, [slug]);

  return (
    <div
      className={`finder-overlay${isShowcase ? " finder-overlay--flush" : ""}`}
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        ref={cardRef}
        className={`finder ${isShowcase ? "finder--wide" : "finder--study"}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="finder-title"
      >
        <div className="finder-titlebar">
          <div className="finder-lights">
            <button
              type="button"
              className="finder-light finder-light--close"
              aria-label="Close project"
              onClick={close}
            />
            <span className="finder-light finder-light--min" aria-hidden="true" />
            <span className="finder-light finder-light--max" aria-hidden="true" />
          </div>
          <span id="finder-title" className="finder-title mono">
            {slug}
          </span>
        </div>
        <div className="finder-body" ref={bodyRef} tabIndex={-1}>
          {isShowcase && content ? (
            <AskValiantShowcase card={project} data={content} />
          ) : content ? (
            <ProjectCaseStudy card={project} data={content} />
          ) : (
            <article className="cs cs--card">
              <div className="pj pj--detail">
                <ProjectCardBody project={project} context="detail" />
              </div>
              <ProjectOverview overview={project.overview} />
            </article>
          )}
        </div>
      </div>
    </div>
  );
}

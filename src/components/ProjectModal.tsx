"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import type { CaseStudy } from "@/data/portfolio";
import { CaseStudyHeader } from "./CaseStudyHeader";

const FOCUSABLE =
  'a[href],button:not([disabled]),input,textarea,select,[tabindex]:not([tabindex="-1"])';

/**
 * The short project card, shown in a Finder-style window over the homepage (via
 * an intercepting route, so the URL becomes /projects/[slug]). Closes with the
 * red dot, Esc, or an outside click — each does router.back(), which drops the
 * URL back to "/" and returns to the homepage at its previous scroll position.
 * Locks background scroll, traps focus, and restores focus to the opener.
 */
export function ProjectModal({ study }: { study: CaseStudy }) {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const close = () => router.back();

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
    requestAnimationFrame(() => closeRef.current?.focus());

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      openerRef.current?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="finder-overlay"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        ref={cardRef}
        className="finder finder--card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="finder-title"
      >
        <div className="finder-titlebar">
          <div className="finder-lights">
            <button
              ref={closeRef}
              type="button"
              className="finder-light finder-light--close"
              aria-label="Close project"
              onClick={close}
            />
            <span className="finder-light finder-light--min" aria-hidden="true" />
            <span className="finder-light finder-light--max" aria-hidden="true" />
          </div>
          <span id="finder-title" className="finder-title mono">
            {study.slug}
          </span>
        </div>
        <div className="finder-body">
          <article className="cs cs--card">
            <CaseStudyHeader study={study} />
            <Link href={`/projects/${study.slug}`} className="read-link cs-open">
              Open full case study <span aria-hidden="true">→</span>
            </Link>
          </article>
        </div>
      </div>
    </div>
  );
}

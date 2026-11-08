"use client";

import { useEffect, useRef, useState } from "react";
import type { CaseStudyMedia } from "@/data/portfolio";

/**
 * The architecture diagram slot. With no `src` it shows a labelled placeholder;
 * once an image is added it renders inline and can be enlarged to a full-screen
 * lightbox (click, Enter/Space, or the ⤢ button) that closes on Esc, an outside
 * click, or the close button. Background scroll is locked while open.
 */
export function ZoomableFigure({ media }: { media: CaseStudyMedia }) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    openerRef.current = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      openerRef.current?.focus?.();
    };
  }, [open]);

  if (!media.src) {
    return (
      <figure className="av-media">
        <div className="av-ph av-ph--diagram">
          <span className="ph-tag mono">PLACEHOLDER</span>
          <p className="ph-title">Architecture diagram coming soon</p>
          {media.placeholderHint && (
            <p className="ph-hint mono">{media.placeholderHint}</p>
          )}
        </div>
        <figcaption className="av-caption">{media.caption}</figcaption>
      </figure>
    );
  }

  return (
    <figure className="av-media">
      <button
        type="button"
        className="av-diagram-btn"
        onClick={() => setOpen(true)}
        aria-label="Enlarge architecture diagram"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="av-diagram-img" src={media.src} alt={media.caption} />
        <span className="av-enlarge mono" aria-hidden="true">
          <span className="av-enlarge__icon">⤢</span> Enlarge
        </span>
      </button>
      <figcaption className="av-caption">{media.caption}</figcaption>

      {open && (
        <div
          className="av-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Architecture diagram"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <button
            ref={closeRef}
            type="button"
            className="av-lightbox__close mono"
            onClick={() => setOpen(false)}
          >
            Close ✕
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="av-lightbox__img"
            src={media.src}
            alt={media.caption}
          />
        </div>
      )}
    </figure>
  );
}

"use client";

import { useEffect, useId, type ReactNode } from "react";

interface CardProps {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  /** "side" = docked beside the lid; "sheet" = bottom sheet on narrow screens. */
  variant: "side" | "sheet";
  /** Changing this re-mounts the body so its content cross-fades on a swap. */
  contentKey: string;
  onClose: () => void;
  children: ReactNode;
}

/**
 * A macOS-style card that shows a section's content. It is a plain panel (no
 * backdrop, no dragging); its wrapper decides where it sits. The content region
 * is the only scrollable area — the page itself never scrolls.
 */
export function Card({
  title,
  eyebrow,
  subtitle,
  variant,
  contentKey,
  onClose,
  children,
}: CardProps) {
  const titleId = useId();

  // Close on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-labelledby={titleId}
      className={`deck-card deck-card--${variant} chrome-font`}
    >
      {/* Title bar — red close button only. */}
      <div className="deck-card__bar">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="deck-close"
        >
          <span aria-hidden="true">✕</span>
        </button>
        <p id={titleId} className="deck-card__title">
          {title}
        </p>
        {/* Balances the close button so the title stays centered. */}
        <span className="deck-card__spacer" aria-hidden="true" />
      </div>

      {/* The only scrollable region on the page. */}
      <div className="deck-card__scroll window-scroll px-5 py-5 sm:px-6 sm:py-6">
        <div key={contentKey} className="deck-card__body">
          {(eyebrow || subtitle) && (
            <header className="mb-4">
              {eyebrow && (
                <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-wide text-blue-600/80 uppercase">
                  {eyebrow}
                </p>
              )}
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[color:var(--color-ink)]">
                {title}
              </h2>
              {subtitle && (
                <p className="mt-0.5 text-sm text-black/60">{subtitle}</p>
              )}
            </header>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

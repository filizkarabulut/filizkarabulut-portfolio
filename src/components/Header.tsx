"use client";

import { resumeUrl, siteName, tagline } from "@/data/portfolio";

interface HeaderProps {
  onOpenContact: (trigger: HTMLButtonElement) => void;
}

export function Header({ onOpenContact }: HeaderProps) {
  return (
    <header className="flex shrink-0 flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-2.5 sm:px-6 sm:py-3">
      {/* Left: name + tagline (name larger, tagline smaller under/next to it) */}
      <div className="flex min-w-0 flex-col sm:flex-row sm:items-baseline sm:gap-3">
        <h1 className="font-[family-name:var(--font-display)] text-lg leading-tight font-bold tracking-tight text-white sm:text-xl">
          {siteName}
        </h1>
        <p className="font-[family-name:var(--font-mono)] text-[11px] leading-snug text-white/70 sm:text-xs">
          {tagline}
        </p>
      </div>

      {/* Right: Résumé + Contact */}
      <div className="flex shrink-0 items-center gap-3 text-sm">
        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:rounded focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:outline-none"
        >
          Résumé
          <span aria-hidden="true" className="text-xs">
            ↗
          </span>
        </a>
        <span aria-hidden="true" className="text-white/25">
          ·
        </span>
        <button
          type="button"
          onClick={(e) => onOpenContact(e.currentTarget)}
          className="text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:rounded focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:outline-none"
        >
          Contact
        </button>
      </div>
    </header>
  );
}

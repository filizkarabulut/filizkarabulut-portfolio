"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

/* A tiny external store over the <html data-theme> attribute. Using
   useSyncExternalStore keeps the button in sync with the pre-paint script
   without a setState-in-effect and without hydration mismatches. */
const listeners = new Set<() => void>();
function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}
/** Server + first client render fall back to the default (dark). */
function getServerSnapshot(): Theme {
  return "dark";
}

function setTheme(next: Theme) {
  const root = document.documentElement;
  if (next === "light") root.setAttribute("data-theme", "light");
  else root.removeAttribute("data-theme");
  try {
    localStorage.setItem("theme", next);
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

/** Sun icon (shown in dark mode — click to go light). */
function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 2.5v2.4M12 19.1v2.4M4.5 4.5l1.7 1.7M17.8 17.8l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.5 19.5l1.7-1.7M17.8 6.2l1.7-1.7" />
      </g>
    </svg>
  );
}

/** Moon icon (shown in light mode — click to go dark). */
function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <path
        d="M20 14.2A8 8 0 0 1 9.8 4a7 7 0 1 0 10.2 10.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Light/dark theme toggle. The real theme is applied pre-paint by the inline
 * script in layout.tsx (localStorage, else OS preference); this reflects and
 * flips `data-theme` on <html> and persists the choice.
 */
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const goDark = theme === "light";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setTheme(goDark ? "dark" : "light")}
      aria-label={goDark ? "Switch to dark mode" : "Switch to light mode"}
      title={goDark ? "Switch to dark mode" : "Switch to light mode"}
    >
      {goDark ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

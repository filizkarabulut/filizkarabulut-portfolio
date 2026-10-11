/** Shared smooth-scroll-to-section helper (used by the stickers, the nav, and
 * the command palette). Updates the URL hash without a jump so the location is
 * shareable, then moves focus for keyboard users. */
export function goToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
  el.focus({ preventScroll: true });
}

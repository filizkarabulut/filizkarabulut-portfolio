"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in the reading position, using a SINGLE
 * IntersectionObserver so the stickers and the text nav always agree on the
 * active section. A thin horizontal band across the middle of the viewport is
 * the trigger: whichever observed section crosses it (topmost, in `ids` order)
 * becomes active.
 *
 * `ids` must be referentially stable (e.g. derived once at module scope); the
 * observer is torn down and rebuilt when it changes.
 */
export function useActiveSection(ids: string[]): [string, (id: string) => void] {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // Topmost section (in `ids` order) that is crossing the band wins.
        const next = ids.find((id) => visible.has(id));
        if (next) setActive(next);
      },
      // A thin band in the upper third of the viewport: a section is active
      // once its top scrolls up into the reading position.
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return [active, setActive];
}

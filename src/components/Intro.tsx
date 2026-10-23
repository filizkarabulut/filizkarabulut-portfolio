"use client";

import { useEffect, useRef } from "react";

/** Total intro length (ms) — long enough for the last text animation (footer,
 *  3.8s + 0.5s) to finish before cleanup. Keep in sync with globals.css. */
const INTRO_MS = 4400;

/**
 * Drives the one-time intro animation. The pre-paint script in `layout.tsx` has
 * already added `intro-play` to <html> when the intro should run (so the page
 * starts black with no flash). This component:
 *   1. measures the laptop's final position/size and stores the offset to the
 *      viewport centre as CSS vars (so we animate only transform — no layout shift),
 *   2. adds `intro-run` to kick off the CSS timeline,
 *   3. cleans everything up when it finishes, on a click/keypress (skip), or if
 *      reduced-motion is on — leaving the page in its exact final state.
 *
 * It intentionally does NOT tear down from the effect's cleanup: React StrictMode
 * (dev) double-invokes effects, and tearing down there would kill the intro
 * before it starts. A ref makes the orchestration run exactly once; the timer
 * and the skip handler own all teardown.
 */
export function Intro() {
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    const html = document.documentElement;
    if (!html.classList.contains("intro-play")) return;

    const lid = document.querySelector<HTMLElement>(".sidebar-lid");
    if (!lid || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      html.classList.remove("intro-play", "intro-run");
      return;
    }

    // Final (untransformed) laptop box → translate needed to centre it on screen.
    const r = lid.getBoundingClientRect();
    const dx = window.innerWidth / 2 - (r.left + r.width / 2);
    const dy = window.innerHeight / 2 - (r.top + r.height / 2);
    lid.style.setProperty("--idx", `${dx}px`);
    lid.style.setProperty("--idy", `${dy}px`);

    html.classList.add("intro-run");

    let done = false;
    const cleanup = () => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      window.removeEventListener("pointerdown", cleanup, true);
      window.removeEventListener("keydown", cleanup, true);
      html.classList.remove("intro-play", "intro-run");
      lid.style.removeProperty("--idx");
      lid.style.removeProperty("--idy");
    };

    // Skip straight to the final state on any click or key press.
    window.addEventListener("pointerdown", cleanup, true);
    window.addEventListener("keydown", cleanup, true);
    const timer = window.setTimeout(cleanup, INTRO_MS);
  }, []);

  return null;
}

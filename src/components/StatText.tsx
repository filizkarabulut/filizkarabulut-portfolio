import { Fragment, type ReactNode } from "react";

/* Emphasise key figures (10,000+, 40+, 50+, 150+, 400+, 6K+, 15-person …)
   without touching the wording. The capturing split keeps the matches inline. */
const STAT_SRC = String.raw`\d[\d,]*K?\+|\d+-(?:person|member)`;
const IS_STAT = new RegExp(`^(?:${STAT_SRC})$`);

/** Escape a phrase so it can be dropped into a RegExp literally. */
function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Renders a string with its key numbers wrapped in `<strong class="stat">`, and
 * any `emphasize` phrases wrapped in `<strong class="emph">` for subtle
 * role/name emphasis (no colour badge). Phrases win over numbers on overlap.
 */
export function StatText({
  text,
  emphasize,
}: {
  text: string;
  emphasize?: string[];
}): ReactNode {
  const phrases = emphasize ?? [];
  const phraseSet = new Set(phrases);
  // Phrases first so they take precedence over a number inside them.
  const split = new RegExp(
    `(${[...phrases.map(escapeRe), STAT_SRC].join("|")})`,
    "g",
  );

  return text.split(split).map((part, i) => {
    if (phraseSet.has(part)) {
      return (
        <strong key={i} className="emph">
          {part}
        </strong>
      );
    }
    if (IS_STAT.test(part)) {
      return (
        <strong key={i} className="stat">
          {part}
        </strong>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

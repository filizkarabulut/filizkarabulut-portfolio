import { Fragment, type ReactNode } from "react";

/* Emphasise key figures (10,000+, 40+, 50+, 150+, 400+, 6K+, 15-person …)
   without touching the wording. The capturing split keeps the matches inline. */
const STAT_SPLIT = /(\d[\d,]*K?\+|\d+-(?:person|member))/g;
const IS_STAT = /^(?:\d[\d,]*K?\+|\d+-(?:person|member))$/;

/** Renders a string with its key numbers wrapped in `<strong class="stat">`. */
export function StatText({ text }: { text: string }): ReactNode {
  return text.split(STAT_SPLIT).map((part, i) =>
    IS_STAT.test(part) ? (
      <strong key={i} className="stat">
        {part}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

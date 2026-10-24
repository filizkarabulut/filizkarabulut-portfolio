import type { ReactNode } from "react";

/**
 * Shared building blocks for the Experience and Projects sections, so both read
 * as one system. All colours/sizes come from theme tokens in globals.css.
 */

/** Accent-tinted pill for headline numbers / awards. Plain text, not a control. */
export function Chip({ children }: { children: ReactNode }) {
  return <span className="chip">{children}</span>;
}

/** Quiet monospace pill for a tech tag. */
export function Tag({ children }: { children: ReactNode }) {
  return <li className="tag2 mono">{children}</li>;
}

/** A row of tags (semantic list). Renders nothing when there are none. */
export function TagRow({ tags, label = "Tags" }: { tags?: string[]; label?: string }) {
  if (!tags || tags.length === 0) return null;
  return (
    <ul className="tag2-row" aria-label={label}>
      {tags.map((t) => (
        <Tag key={t}>{t}</Tag>
      ))}
    </ul>
  );
}

/** Hairline divider in the existing border token. */
export function Divider({ className = "" }: { className?: string }) {
  return <hr className={`hr ${className}`.trim()} aria-hidden="true" />;
}

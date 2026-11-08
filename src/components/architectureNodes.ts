import type { CodeExcerpt } from "@/data/portfolio";

/**
 * Shared shape for a clickable architecture node's explanation, used by the
 * interactive diagrams (Ask VALIANT, SpIQ). `summary` is the 1–2 sentence blurb
 * shown immediately; `details` + `code` sit behind a "View technical details"
 * toggle for interested visitors.
 */
export interface NodeDetail {
  title: string;
  /** 1–2 sentence technical purpose, shown immediately on select. */
  summary: string;
  /** Deeper explanation, revealed by the "View technical details" toggle. */
  details?: string[];
  /** Optional code excerpt shown with the details. */
  code?: CodeExcerpt;
}

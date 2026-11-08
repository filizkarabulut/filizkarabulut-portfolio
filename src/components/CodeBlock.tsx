"use client";

import { useState } from "react";
import type { CodeExcerpt } from "@/data/portfolio";

/**
 * A copyable code excerpt in a small terminal-style frame. When the excerpt has
 * no `snippet` yet it renders a clearly-labelled placeholder (no copy button),
 * so the slot reads as "code goes here" until the real excerpt is added.
 */
export function CodeBlock({ code }: { code: CodeExcerpt }) {
  const [copied, setCopied] = useState(false);
  const snippet = code.snippet?.trimEnd();

  const copy = async () => {
    if (!snippet) return;
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — no-op */
    }
  };

  return (
    <figure className="code">
      <div className="code-head">
        <span className="code-file mono">
          {code.filename ?? code.language ?? "code"}
        </span>
        {snippet ? (
          <button
            type="button"
            className="code-copy mono"
            onClick={copy}
            aria-label={copied ? "Copied" : "Copy code"}
          >
            {copied ? "Copied ✓" : "Copy"}
          </button>
        ) : (
          <span className="code-lang mono" aria-hidden="true">
            {code.language}
          </span>
        )}
      </div>

      {snippet ? (
        <pre className="code-body">
          <code>{snippet}</code>
        </pre>
      ) : (
        <div className="code-ph">
          <span className="ph-tag mono">PLACEHOLDER</span>
          <p className="ph-text mono">
            # Code excerpt coming soon
            {code.filename ? ` — ${code.filename}` : ""}
          </p>
        </div>
      )}
    </figure>
  );
}

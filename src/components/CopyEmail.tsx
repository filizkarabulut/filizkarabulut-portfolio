"use client";

import { useState } from "react";
import { contactEmail } from "@/data/portfolio";

export function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — the mailto link below still works */
    }
  };

  return (
    <span className="copy-email">
      <a className="copy-email__addr" href={`mailto:${contactEmail}`}>
        {contactEmail}
      </a>
      <button
        type="button"
        className="copy-email__btn"
        onClick={copy}
        aria-label={copied ? "Email copied" : "Copy email address"}
      >
        {copied ? "Copied ✓" : "Copy"}
      </button>
    </span>
  );
}

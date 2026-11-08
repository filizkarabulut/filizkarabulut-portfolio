"use client";

import { ArchBox as Node } from "./ArchBox";

/**
 * Ask VALIANT's real multi-agent architecture, drawn as a compact vertical flow
 * so it fits in a column beside the demo video. Same pipeline as the horizontal
 * diagram — a user query is classified by the router, handled by one of three
 * assistants, with research questions running 3-tier faculty matching and a live
 * PubMed lookup, then a response is generated and logged.
 *
 * The router, the three assistants, and faculty matching are clickable (they open
 * a detail panel); the remaining boxes are static. Sizing is em-relative off the
 * `.arch` font-size, so an enlarged view would just scale that up.
 */
export function AskValiantArchitecture({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  const nodeProps = { selected, onSelect };
  return (
    <div className="arch">
      <div className="arch-row arch-row--1">
        <span className="arch-box">User query</span>
      </div>
      <span className="arch-arrow" aria-hidden="true">
        ↓
      </span>
      <div className="arch-row arch-row--1">
        <Node id="router" label="Router" sub="classify intent" accent {...nodeProps} />
      </div>
      <span className="arch-arrow" aria-hidden="true">
        ↓
      </span>
      <div className="arch-row arch-row--3">
        <Node id="main" label="Main" sub="info & FAQs" {...nodeProps} />
        <Node id="research" label="Research" sub="matching" accent {...nodeProps} />
        <Node id="followup" label="Follow-up" sub="context" {...nodeProps} />
      </div>
      <span className="arch-arrow" aria-hidden="true">
        ↓
      </span>
      <div className="arch-row arch-row--2">
        <Node id="matching" label="Faculty matching" sub="3-tier cascade" {...nodeProps} />
        <span className="arch-box">
          PubMed
          <small>live papers</small>
        </span>
      </div>
      <span className="arch-arrow" aria-hidden="true">
        ↓
      </span>
      <div className="arch-row arch-row--1">
        <span className="arch-box arch-box--resp">Response generation</span>
      </div>
      <span className="arch-arrow" aria-hidden="true">
        ↓
      </span>
      <div className="arch-row arch-row--2">
        <span className="arch-box arch-box--muted">
          Database
          <small>history &amp; analytics</small>
        </span>
        <span className="arch-box arch-box--muted">
          Admin
          <small>analytics &amp; errors</small>
        </span>
      </div>
    </div>
  );
}

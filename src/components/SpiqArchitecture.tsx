"use client";

import { ArchBox as Node } from "./ArchBox";

/**
 * SpIQ's model architecture, drawn as a compact vertical flow to sit beside the
 * demo video. Mirrors the deck's architecture slide: a single recording feeds
 * three parallel analysis models (visual, vocal, verbal); a fusion layer aligns
 * the channels into one score, breakdown, and coaching feedback.
 *
 * The three models and the fusion layer are clickable (they open a detail panel);
 * the input and output boxes are static.
 */
export function SpiqArchitecture({
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
        <span className="arch-box">
          Input
          <small>video · audio · context</small>
        </span>
      </div>
      <span className="arch-arrow" aria-hidden="true">
        ↓
      </span>
      <div className="arch-row arch-row--3">
        <Node id="visual" label="Visual" sub="expressions · gaze" accent {...nodeProps} />
        <Node id="vocal" label="Vocal" sub="pitch · pace · tone" {...nodeProps} />
        <Node id="verbal" label="Verbal" sub="words · clarity" {...nodeProps} />
      </div>
      <span className="arch-arrow" aria-hidden="true">
        ↓
      </span>
      <div className="arch-row arch-row--1">
        <Node
          id="fusion"
          label="Fusion layer"
          sub="cross-channel alignment"
          accent
          {...nodeProps}
        />
      </div>
      <span className="arch-arrow" aria-hidden="true">
        ↓
      </span>
      <div className="arch-row arch-row--1">
        <span className="arch-box arch-box--resp">
          Output
          <small>score · breakdown · feedback</small>
        </span>
      </div>
    </div>
  );
}

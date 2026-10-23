"use client";

import {
  navSections,
  stickers,
  type Sticker as StickerData,
} from "@/data/portfolio";
import type { StickerImage } from "@/lib/stickerImages";
import { Sticker } from "./Sticker";

interface LaptopProps {
  /** The section currently in view — the matching sticker(s) light up. */
  activeSection: string;
  onOpen: (sticker: StickerData) => void;
  /** Resolved sticker art (id → path + size), from the server-side folder scan. */
  stickerSrc: Record<string, StickerImage>;
}

/** section id -> human label, for the per-sticker tooltip. */
const SECTION_LABEL = new Map(navSections.map((s) => [s.id, s.label]));

/** Short "where it leads" hint shown on hover/focus. */
function tipFor(sticker: StickerData): string | undefined {
  if (sticker.opens) {
    const label = SECTION_LABEL.get(sticker.opens);
    return label ? `${label} →` : undefined;
  }
  if (sticker.href) return `${sticker.label} ↗`;
  return undefined;
}

const BY_ID = new Map(stickers.map((s) => [s.id, s]));

/**
 * The laptop lid — a no-overlap, jigsaw-style grid of three flex columns. Each
 * sticker gets its own slot (width is a % of its column, height auto), so slots
 * never overlap. Stickers are the site's only navigation.
 */
export function Laptop({ activeSection, onOpen, stickerSrc }: LaptopProps) {
  const slot = (
    id: string,
    width: string,
    rot: number,
    extra?: { dx?: string; dy?: string; gs?: number; z?: number; ii?: number },
  ) => {
    const sticker = BY_ID.get(id);
    if (!sticker) return null;
    return (
      <Sticker
        sticker={sticker}
        width={width}
        rot={rot}
        dx={extra?.dx}
        dy={extra?.dy}
        gs={extra?.gs}
        z={extra?.z}
        ii={extra?.ii}
        image={stickerSrc[id]}
        active={sticker.opens === activeSection}
        tip={tipFor(sticker)}
        onOpen={onOpen}
      />
    );
  };

  return (
    <div className="lid">
      <div className="lid-grid">
        {/* Left column */}
        <div className="lid-col lid-col--left">
          {slot("amplify", "100%", -6, { ii: 1 })}
          {slot("valiant", "75%", 6, { ii: 4 })}
          {/* Violin + hiker + film strip form one tight overlapping row, scaled
              up ~15% as a group and shifted left; violin in front, then hiker,
              then film. Translates keep them in flow so no column re-flows. */}
          <div className="lid-pair">
            {slot("violin", "44%", 0, { dx: "5.73cqw", gs: 1.15, z: 5, ii: 8 })}
            {slot("hiking", "48%", 2, { dx: "0cqw", gs: 1.15, z: 4, ii: 9 })}
          </div>
        </div>

        {/* Center column */}
        <div className="lid-col lid-col--center">
          {/* FK pops in first (ii: 0). */}
          <div className="lid-center-fk">{slot("fk", "100%", -3, { ii: 0 })}</div>
          <div className="lid-bottom-row">
            {slot("film", "35%", -6, { dx: "-4.22cqw", gs: 1.15, z: 3, ii: 7 })}
            {slot("git-commit", "60%", 2, { dy: "-10.5cqh", ii: 6 })}
          </div>
        </div>

        {/* Right column */}
        <div className="lid-col lid-col--right">
          {slot("vandyhacks", "100%", 3, { ii: 2 })}
          {slot("spiq", "100%", 0, { ii: 3 })}
          {slot("vanderbilt", "80%", 3, { ii: 5 })}
        </div>
      </div>
    </div>
  );
}

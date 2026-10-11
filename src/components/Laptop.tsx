"use client";

import {
  lidLayout,
  navSections,
  stickers,
  type Sticker as StickerData,
} from "@/data/portfolio";
import { Sticker } from "./Sticker";

interface LaptopProps {
  isMobile: boolean;
  /** The section currently in view — the matching sticker(s) light up. */
  activeSection: string;
  onOpen: (sticker: StickerData) => void;
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

/**
 * The laptop lid — a sticker collage that fills its wrapper and is the site's
 * only navigation. Each sticker is a shortcut to a section; the sticker(s) for
 * the active section light up while the rest dim.
 */
export function Laptop({ isMobile, activeSection, onOpen }: LaptopProps) {
  const layout = isMobile ? lidLayout.mobile : lidLayout.desktop;

  return (
    <div
      className="lid"
      style={{
        gridTemplateColumns: `repeat(${layout.cols}, 1fr)`,
        gridTemplateRows: `repeat(${layout.rows}, 1fr)`,
        gridTemplateAreas: layout.areas.map((row) => `"${row}"`).join(" "),
      }}
    >
      {stickers.map((sticker, i) => (
        <Sticker
          key={sticker.id}
          sticker={sticker}
          index={i}
          active={sticker.opens === activeSection}
          tip={tipFor(sticker)}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}

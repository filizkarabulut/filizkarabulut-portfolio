"use client";

import { lidLayout, stickers, type Sticker as StickerData } from "@/data/portfolio";
import { Sticker } from "./Sticker";

interface LaptopProps {
  isMobile: boolean;
  /** Section id of the currently open card, so its sticker can be highlighted. */
  activeId: string | null;
  onOpen: (sticker: StickerData, trigger: HTMLButtonElement) => void;
}

/**
 * The laptop lid — a sticker collage that fills its wrapper (sized by the
 * `.desk-row` around it). Aspect ratio and position are owned by the layout.
 */
export function Laptop({ isMobile, activeId, onOpen }: LaptopProps) {
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
          active={Boolean(sticker.opens) && sticker.opens === activeId}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}

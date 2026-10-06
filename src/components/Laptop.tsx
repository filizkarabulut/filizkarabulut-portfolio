"use client";

import { lidLayout, stickers, type Sticker as StickerData } from "@/data/portfolio";
import { Sticker } from "./Sticker";

interface LaptopProps {
  isMobile: boolean;
  onOpen: (sticker: StickerData, trigger: HTMLButtonElement) => void;
}

/** Lid aspect ratios (width / height) — close to a real MacBook footprint. */
const DESKTOP_RATIO = 7 / 5;
const MOBILE_RATIO = 3 / 4;

export function Laptop({ isMobile, onOpen }: LaptopProps) {
  const ratio = isMobile ? MOBILE_RATIO : DESKTOP_RATIO;
  const layout = isMobile ? lidLayout.mobile : lidLayout.desktop;

  return (
    // The laptop (lid + hinge) sized to fit the available area by BOTH width
    // and height: width = min(available width, available height × aspect).
    // 100cqw / 100cqh read the size-container (<main class="laptop-area">).
    <div
      className="laptop-group"
      style={{ "--lid-ratio": String(ratio) } as React.CSSProperties}
    >
      <div
        className="lid"
        style={{
          aspectRatio: isMobile ? "3 / 4" : "7 / 5",
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
            onOpen={onOpen}
          />
        ))}
      </div>

      {/* Hinge where the lid meets the base */}
      <div className="hinge-strip" />
    </div>
  );
}

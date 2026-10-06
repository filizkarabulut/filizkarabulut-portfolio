"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import type { Sticker as StickerData } from "@/data/portfolio";

interface StickerProps {
  sticker: StickerData;
  /** Stagger index for the slap-on animation. */
  index: number;
  onOpen: (sticker: StickerData, trigger: HTMLButtonElement) => void;
}

export function Sticker({ sticker, index, onOpen }: StickerProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const hasImage = Boolean(sticker.image);

  // Placement comes from the lid's grid-template-areas (keyed by id).
  const style = {
    gridArea: sticker.id,
    "--delay": `${120 + index * 45}ms`,
    "--fill": sticker.color,
  } as React.CSSProperties;

  const className = `sticker shape-${sticker.shape}`;

  // The placeholder fills the cell and stays until a real image has actually
  // loaded — so a missing/slow image never flashes a broken graphic.
  const inner: ReactNode = (
    <>
      {(!hasImage || imgFailed || !imgLoaded) && (
        <span
          className={`sticker-placeholder shape-${sticker.shape}`}
          aria-hidden="true"
        >
          <span className="placeholder-label">{sticker.label}</span>
        </span>
      )}
      {hasImage && !imgFailed && (
        <Image
          src={sticker.image as string}
          alt={sticker.ariaLabel}
          width={400}
          height={400}
          className="sticker-img"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgFailed(true)}
          priority={sticker.size === "XL"}
          style={
            imgLoaded
              ? undefined
              : {
                  position: "absolute",
                  inset: 0,
                  opacity: 0,
                  pointerEvents: "none",
                }
          }
        />
      )}
    </>
  );

  // Link stickers (GitHub, LinkedIn) open an external profile in a new tab.
  if (sticker.href) {
    return (
      <a
        href={sticker.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={sticker.ariaLabel}
        className={className}
        style={style}
      >
        {inner}
        <span className="sticker-ext" aria-hidden="true">
          ↗
        </span>
      </a>
    );
  }

  return (
    <button
      type="button"
      aria-label={sticker.ariaLabel}
      onClick={(e) => onOpen(sticker, e.currentTarget)}
      className={className}
      style={style}
    >
      {inner}
    </button>
  );
}

"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import type { Sticker as StickerData } from "@/data/portfolio";

interface StickerProps {
  sticker: StickerData;
  /** Stagger index for the slap-on animation (lid only). */
  index: number;
  /** True when this sticker maps to the section currently in view. */
  active: boolean;
  onOpen: (sticker: StickerData) => void;
  /** Where this sticker leads, shown as a tooltip on hover/focus (lid only). */
  tip?: string;
  /** Compact chip variant used in the mobile sticky nav bar. */
  mini?: boolean;
}

export function Sticker({
  sticker,
  index,
  active,
  onOpen,
  tip,
  mini = false,
}: StickerProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const hasImage = Boolean(sticker.image);

  // In the lid, placement comes from grid-template-areas (keyed by id). Mini
  // chips flow in the nav bar instead, so they get no grid area or stagger.
  const style = mini
    ? ({ "--fill": sticker.color } as React.CSSProperties)
    : ({
        gridArea: sticker.id,
        "--delay": `${120 + index * 45}ms`,
        "--fill": sticker.color,
      } as React.CSSProperties);

  // Link stickers (GitHub/LinkedIn) never become active; everything else dims
  // when another section is the active one.
  const className = [
    mini ? "sticker-mini" : "sticker",
    `shape-${sticker.shape}`,
    active ? "is-active" : "is-dimmed",
  ].join(" ");

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
          priority={!mini && sticker.size === "XL"}
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
      {tip && !mini && (
        <span className="sticker-tip" aria-hidden="true">
          {tip}
        </span>
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
        {!mini && (
          <span className="sticker-ext" aria-hidden="true">
            ↗
          </span>
        )}
      </a>
    );
  }

  return (
    <button
      type="button"
      aria-label={sticker.ariaLabel}
      aria-current={active ? "true" : undefined}
      onClick={() => onOpen(sticker)}
      className={className}
      style={style}
    >
      {inner}
    </button>
  );
}

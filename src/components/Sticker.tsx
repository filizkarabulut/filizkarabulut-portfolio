"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import type { Sticker as StickerData } from "@/data/portfolio";
import type { StickerImage } from "@/lib/stickerImages";

interface StickerProps {
  sticker: StickerData;
  /** True when this sticker maps to the section currently in view. */
  active: boolean;
  onOpen: (sticker: StickerData) => void;
  /** Where this sticker leads, shown as a tooltip on hover/focus (lid only). */
  tip?: string;
  /** Width of this sticker's slot (CSS value, e.g. "100%", "75%"). Lid only. */
  width?: string;
  /** Tilt in degrees. Lid only. */
  rot?: number;
  /** Optional visual nudge from the slot (CSS lengths, e.g. "7cqw" / "-4cqh").
   *  The sticker stays in flow — its column layout is undisturbed — and only the
   *  painted art shifts, so a few stickers can overlap without re-flowing the grid. */
  dx?: string;
  dy?: string;
  /** Extra visual scale on top of the slot size (1 = none). Used to grow the
   *  interests cluster as a group without changing the flex layout. */
  gs?: number;
  /** Stacking order among overlapping stickers. Lid only. */
  z?: number;
  /** Stagger index for the intro pop-in (FK = 0). Lid only. */
  ii?: number;
  /** Interaction-group key (lid only). Stickers sharing a group light up
   *  together on hover/focus of any one of them (see the `.sticker--group-*`
   *  rules in globals.css). Used for the "Off the Clock" cluster. */
  group?: string;
  /** Resolved art (path + intrinsic size) from the server-side scan of
   *  /public/stickers. Undefined → show the colored label placeholder. */
  image?: StickerImage;
  /** Compact chip variant used in the mobile sticky nav bar. */
  mini?: boolean;
}

export function Sticker({
  sticker,
  active,
  onOpen,
  tip,
  width,
  rot = 0,
  dx,
  dy,
  gs,
  z,
  ii,
  group,
  image,
  mini = false,
}: StickerProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const hasImage = Boolean(image) && !imgFailed;

  // Lid stickers are flex items in their column: --w is the slot width (a % of
  // the column) and --rot the tilt; --dx/--dy optionally nudge the painted art
  // out of its slot (for the overlapping interests cluster). CSS sizes the image
  // with height:auto. Mini chips flow in the nav bar with a fixed size.
  const style = mini
    ? ({ "--fill": sticker.color } as React.CSSProperties)
    : ({
        "--w": width ?? "100%",
        "--rot": `${rot}deg`,
        "--dx": dx ?? "0",
        "--dy": dy ?? "0",
        ...(gs !== undefined ? { "--gs": gs } : {}),
        ...(z !== undefined ? { "--z": z } : {}),
        ...(ii !== undefined ? { "--ii": ii } : {}),
        "--fill": sticker.color,
      } as React.CSSProperties);

  // Link stickers (GitHub/LinkedIn) never become active; everything else dims
  // when another section is the active one.
  const className = [
    mini ? "sticker-mini" : "sticker",
    `shape-${sticker.shape}`,
    active ? "is-active" : "is-dimmed",
    !hasImage && !mini ? "sticker--no-image" : "",
    group && !mini ? `sticker--group-${group}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  // The image sits in flow so its `height: auto` drives the box at the art's own
  // aspect ratio. The label placeholder shows only when there's no usable image
  // (missing file or load error) — not gated on an onLoad event, which can be
  // missed when a cached image finishes before React attaches the handler.
  const inner: ReactNode = (
    <>
      {hasImage && (
        <Image
          src={image!.src}
          alt={sticker.ariaLabel}
          width={image!.width}
          height={image!.height}
          className="sticker-img"
          onError={() => setImgFailed(true)}
          priority={!mini && sticker.size === "XL"}
        />
      )}
      {!hasImage && (
        <span
          className={`sticker-placeholder shape-${sticker.shape}`}
          aria-hidden="true"
        >
          <span className="placeholder-label">{sticker.label}</span>
        </span>
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

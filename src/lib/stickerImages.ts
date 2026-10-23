import fs from "node:fs";
import path from "node:path";

/** A resolved sticker image: public path + intrinsic pixel dimensions. */
export interface StickerImage {
  src: string;
  width: number;
  height: number;
}

/**
 * Server-only: scan `/public/stickers`, match each file to a sticker `id`
 * (whatever its extension), and read its intrinsic dimensions. The dimensions
 * let each sticker render with `height: auto` at its true aspect ratio with no
 * layout shift. Add or replace a logo by dropping a file in — no code change.
 *
 * Runs at build time for the statically-rendered home page, so re-run the build
 * (or restart the dev server) after adding files.
 */
const STICKERS_DIR = path.join(process.cwd(), "public", "stickers");
const EXT_PREFERENCE = ["svg", "png", "webp", "avif", "jpg", "jpeg", "gif"];
const EXT_RE = /\.(svg|png|webp|avif|jpg|jpeg|gif)$/i;

/** Square fallback — with object-fit this only costs a little whitespace, never distortion. */
const FALLBACK = { width: 1, height: 1 };

function jpegSize(buf: Buffer): { width: number; height: number } | null {
  if (buf.length < 4 || buf.readUInt16BE(0) !== 0xffd8) return null;
  let o = 2;
  while (o + 9 < buf.length) {
    if (buf[o] !== 0xff) {
      o++;
      continue;
    }
    const marker = buf[o + 1];
    // Start-Of-Frame markers carry the dimensions (skip DHT/DAC/RSTn/etc).
    if (
      marker >= 0xc0 &&
      marker <= 0xcf &&
      marker !== 0xc4 &&
      marker !== 0xc8 &&
      marker !== 0xcc
    ) {
      return { height: buf.readUInt16BE(o + 5), width: buf.readUInt16BE(o + 7) };
    }
    o += 2 + buf.readUInt16BE(o + 2);
  }
  return null;
}

function webpSize(buf: Buffer): { width: number; height: number } | null {
  if (
    buf.length < 30 ||
    buf.toString("ascii", 0, 4) !== "RIFF" ||
    buf.toString("ascii", 8, 12) !== "WEBP"
  ) {
    return null;
  }
  const fmt = buf.toString("ascii", 12, 16);
  if (fmt === "VP8 ") {
    return {
      width: buf.readUInt16LE(26) & 0x3fff,
      height: buf.readUInt16LE(28) & 0x3fff,
    };
  }
  if (fmt === "VP8L") {
    const b = buf.readUInt32LE(21);
    return { width: (b & 0x3fff) + 1, height: ((b >> 14) & 0x3fff) + 1 };
  }
  if (fmt === "VP8X") {
    return {
      width: buf.readUIntLE(24, 3) + 1,
      height: buf.readUIntLE(27, 3) + 1,
    };
  }
  return null;
}

function svgSize(text: string): { width: number; height: number } | null {
  const vb = text.match(
    /viewBox\s*=\s*["']\s*[-\d.]+[\s,]+[-\d.]+[\s,]+([\d.]+)[\s,]+([\d.]+)/i,
  );
  if (vb) return { width: parseFloat(vb[1]), height: parseFloat(vb[2]) };
  const w = text.match(/\bwidth\s*=\s*["']?\s*([\d.]+)/i);
  const h = text.match(/\bheight\s*=\s*["']?\s*([\d.]+)/i);
  if (w && h) return { width: parseFloat(w[1]), height: parseFloat(h[1]) };
  return null;
}

function readDimensions(file: string, ext: string): { width: number; height: number } {
  let buf: Buffer;
  try {
    buf = fs.readFileSync(file);
  } catch {
    return FALLBACK;
  }
  try {
    if (ext === "png" && buf.length >= 24) {
      return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
    }
    if (ext === "gif" && buf.length >= 10) {
      return { width: buf.readUInt16LE(6), height: buf.readUInt16LE(8) };
    }
    if (ext === "jpg" || ext === "jpeg") return jpegSize(buf) ?? FALLBACK;
    if (ext === "webp") return webpSize(buf) ?? FALLBACK;
    if (ext === "svg") return svgSize(buf.toString("utf8")) ?? FALLBACK;
  } catch {
    /* corrupt/truncated header → fall back */
  }
  return FALLBACK;
}

export function resolveStickerImages(): Record<string, StickerImage> {
  let files: string[];
  try {
    files = fs.readdirSync(STICKERS_DIR);
  } catch {
    return {}; // no folder yet → every sticker falls back to its placeholder
  }

  const map: Record<string, StickerImage> = {};
  const chosenExt: Record<string, string> = {};
  for (const file of files) {
    const match = file.match(EXT_RE);
    if (!match) continue; // skip README.md and non-images
    const id = file.slice(0, match.index);
    const ext = match[1].toLowerCase();

    // On duplicate ids keep the more-preferred format (svg > png > webp > …).
    if (
      chosenExt[id] &&
      EXT_PREFERENCE.indexOf(ext) >= EXT_PREFERENCE.indexOf(chosenExt[id])
    ) {
      continue;
    }
    const full = path.join(STICKERS_DIR, file);
    const dims = readDimensions(full, ext);
    // Version the URL by the file's modified time so replacing an image busts the
    // Next image-optimizer and browser caches (the path alone never changes).
    let version = "";
    try {
      version = `?v=${Math.round(fs.statSync(full).mtimeMs)}`;
    } catch {
      /* ignore — unversioned URL still works */
    }
    map[id] = {
      src: `/stickers/${file}${version}`,
      width: dims.width,
      height: dims.height,
    };
    chosenExt[id] = ext;
  }
  return map;
}

/** The resolved id → image map, computed once on the server. */
export const stickerImages = resolveStickerImages();

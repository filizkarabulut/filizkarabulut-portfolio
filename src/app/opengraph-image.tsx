import { ImageResponse } from "next/og";

/**
 * Social-sharing card (Open Graph + Twitter). Rebuilds the "FK" monogram
 * favicon (src/app/icon.svg) at poster scale on the site's dark background,
 * with the name and subtitle in the site's display face (Space Grotesk).
 *
 * The matching `twitter-image` route re-exports this module, so iMessage,
 * WhatsApp, LinkedIn, X, etc. all resolve to the same image.
 */
export const alt =
  "Filiz Karabulut — Computer Science @ Vanderbilt University";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Site theme tokens (dark), mirrored from globals.css so the card matches the page.
const BG = "#0c0c0e"; // --bg
const FG = "#e8e8ea"; // --fg
const MUTED = "#8a8a93"; // --muted
const TILE = "#1f2937"; // favicon tile
const TILE_FG = "#f4f4f5"; // favicon "FK"

/**
 * Fetch a Google Font as raw TTF so Satori can embed it. Requesting the css2
 * endpoint without a browser user-agent yields truetype URLs (Satori can't use
 * woff2). Returns null on failure so image generation still renders with the
 * built-in font rather than failing the build.
 */
async function loadGoogleFont(
  family: string,
  weight: number,
  text: string,
): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
      family,
    )}:wght@${weight}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url)).text();
    const src = css.match(
      /src: url\((.+?)\) format\('(?:opentype|truetype)'\)/,
    );
    if (!src) return null;
    const res = await fetch(src[1]);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function Image() {
  const name = "Filiz Karabulut";
  const subtitle = "Computer Science @ Vanderbilt University";
  // Glyph set kept tight so the Google Fonts `&text=` subset stays small/fast.
  const glyphs = `FK${name}${subtitle}`;

  const [bold, regular] = await Promise.all([
    loadGoogleFont("Space Grotesk", 700, glyphs),
    loadGoogleFont("Space Grotesk", 400, glyphs),
  ]);

  const fonts = [
    bold && { name: "Space Grotesk", data: bold, weight: 700 as const, style: "normal" as const },
    regular && { name: "Space Grotesk", data: regular, weight: 400 as const, style: "normal" as const },
  ].filter(Boolean) as {
    name: string;
    data: ArrayBuffer;
    weight: 400 | 700;
    style: "normal";
  }[];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: BG,
          fontFamily: "Space Grotesk",
          // Subtle radial lift behind the monogram, matching the page's muted dark.
          backgroundImage:
            "radial-gradient(1000px 520px at 50% 38%, #141620 0%, #0c0c0e 70%)",
        }}
      >
        {/* FK monogram tile — the favicon rebuilt at poster scale. */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 220,
            height: 220,
            borderRadius: 48,
            background: TILE,
            color: TILE_FG,
            fontSize: 112,
            fontWeight: 700,
            letterSpacing: -4,
            boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
          }}
        >
          FK
        </div>

        <div
          style={{
            marginTop: 64,
            color: FG,
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: -2,
          }}
        >
          {name}
        </div>

        <div
          style={{
            marginTop: 20,
            color: MUTED,
            fontSize: 32,
            fontWeight: 400,
            letterSpacing: 0.2,
          }}
        >
          {subtitle}
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}

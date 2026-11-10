import { ImageResponse } from "next/og";

/** Apple touch icon (home-screen bookmark). Generated to match the FK monogram
 *  favicon so an added-to-home-screen shortcut shows the same brand mark. */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1f2937",
          color: "#f4f4f5",
          fontSize: 88,
          fontWeight: 700,
          letterSpacing: -3,
        }}
      >
        FK
      </div>
    ),
    { ...size },
  );
}

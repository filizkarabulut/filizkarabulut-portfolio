import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project (a stray lockfile lives one dir up).
  turbopack: {
    root: __dirname,
  },
  images: {
    // Sticker art is SVG/PNG line art served from /public/stickers.
    // Allow SVGs through the image optimizer (our own trusted assets only).
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;

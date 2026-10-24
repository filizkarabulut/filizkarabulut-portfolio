import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the Next.js dev indicator overlay during local development.
  devIndicators: false,
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
    // Allow the cache-busting `?v=<mtime>` query on sticker URLs through the
    // optimizer (local images with a query are rejected by default).
    localPatterns: [
      { pathname: "/stickers/**", search: "" },
      { pathname: "/stickers/**" },
      // Project card thumbnails (screenshots / demo stills).
      { pathname: "/projects/**", search: "" },
      { pathname: "/projects/**" },
    ],
  },
};

export default nextConfig;

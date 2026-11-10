import type { NextConfig } from "next";

/** Baseline security headers applied to every response. */
const securityHeaders = [
  // Don't let browsers MIME-sniff responses away from the declared type.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Send only the origin (not the full path) on cross-origin navigations.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disallow this site being framed by others (clickjacking).
  { key: "X-Frame-Options", value: "DENY" },
  // Opt out of powerful features this static site never uses.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  // Hide the Next.js dev indicator overlay during local development.
  devIndicators: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
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

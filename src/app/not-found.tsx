import type { Metadata } from "next";
import Link from "next/link";
import { siteName } from "@/data/portfolio";

export const metadata: Metadata = {
  title: `Page not found — ${siteName}`,
  robots: { index: false, follow: true },
};

/** Branded 404 shown for any unknown URL. */
export default function NotFound() {
  return (
    <main
      className="page"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100svh",
        gap: "0.75rem",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <p className="mono" style={{ color: "var(--accent)", margin: 0 }}>
        404
      </p>
      <h1 style={{ color: "var(--text-primary)", margin: 0 }}>
        This page doesn&rsquo;t exist
      </h1>
      <p style={{ color: "var(--text-meta)", maxWidth: "32ch", margin: 0 }}>
        The page you&rsquo;re looking for may have moved or never existed.
      </p>
      <Link href="/" className="read-link" style={{ marginTop: "0.5rem" }}>
        <span aria-hidden="true">←</span> Back to {siteName}
      </Link>
    </main>
  );
}

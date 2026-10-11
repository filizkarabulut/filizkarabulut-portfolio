import { repoUrl } from "@/data/portfolio";

/**
 * Small monospace footer. Commit hash + deploy date come from Vercel's build
 * env (evaluated at build time); both fall back gracefully for local dev.
 */
export function SiteFooter() {
  const sha = process.env.VERCEL_GIT_COMMIT_SHA;
  const commit = sha ? sha.slice(0, 7) : "dev";
  const deployed = new Date().toISOString().slice(0, 10); // build date (YYYY-MM-DD)

  return (
    <footer className="site-footer">
      <p>
        © 2026 Filiz Karabulut · Built with Next.js · last deployed {deployed} ·{" "}
        <span className="site-footer__commit">{commit}</span>
      </p>
      <a
        href={repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="site-footer__source"
      >
        view source ↗
      </a>
    </footer>
  );
}

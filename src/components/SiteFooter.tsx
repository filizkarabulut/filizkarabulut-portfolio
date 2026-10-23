import { repoUrl } from "@/data/portfolio";

/** Small monospace footer. */
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>© 2026 Filiz Karabulut</p>
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

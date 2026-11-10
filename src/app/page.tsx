import { PortfolioHome } from "@/components/PortfolioHome";
import { githubUrl, linkedinUrl, siteName } from "@/data/portfolio";

/** Person structured data — only facts already shown on the site. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteName,
  url: "https://filizkarabulut.com",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Vanderbilt University",
  },
  sameAs: [githubUrl, linkedinUrl],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <PortfolioHome />
    </>
  );
}

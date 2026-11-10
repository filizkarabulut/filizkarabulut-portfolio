import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  // Matches the site's dark/light left-column backgrounds so the browser UI
  // (mobile address bar) blends with the page in each theme.
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0c0c0e" },
    { media: "(prefers-color-scheme: light)", color: "#f6f6f8" },
  ],
};

/** Characterful display face for headings. */
const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

/** Clean body face. */
const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

/** Monospace for labels and metadata. */
const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteDescription =
  "Filiz Karabulut — CS & Applied Math student at Vanderbilt, AI Research Intern, and VandyHacks Co-President. A sticker-covered laptop you can click through.";

export const metadata: Metadata = {
  metadataBase: new URL("https://filizkarabulut.com"),
  title: {
    default: "Filiz Karabulut",
    template: "%s",
  },
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Filiz Karabulut",
    description: siteDescription,
    url: "/",
    type: "website",
    siteName: "Filiz Karabulut",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filiz Karabulut",
    description: siteDescription,
  },
};

export default function RootLayout({ children, modal }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable} antialiased`}
    >
      <body>
        {/* Runs before first paint. Marks that JS is on (so scroll-reveal never
            flashes) and decides whether the intro animation should play — adding
            `intro-play` pre-paint means the page starts black with no flash of
            the real content. Intro plays once per tab (sessionStorage), never
            with a URL hash or reduced-motion, and `?intro=1` forces a replay. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js');
try{
  var h=document.documentElement;
  // Theme: default is dark; only switch to light if the user chose it.
  if(localStorage.getItem('theme')==='light')h.setAttribute('data-theme','light');
}catch(e){}
try{
  var h=document.documentElement;
  // The intro animates the home-page laptop/sidebar and is cleaned up by the
  // Intro component, which only mounts on "/". Gating it to the home route keeps
  // other routes (e.g. the case-study pages) from being stuck scroll-locked on a
  // cold/direct visit, where nothing would ever remove the intro-play class.
  var home=location.pathname==='/';
  var force=new URLSearchParams(location.search).get('intro')==='1';
  var reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasHash=location.hash.length>1;
  var seen=sessionStorage.getItem('introSeen');
  if(home&&!reduced&&(force||(!hasHash&&!seen)))h.classList.add('intro-play');
  sessionStorage.setItem('introSeen','1');
}catch(e){}`,
          }}
        />
        {children}
        {modal}
      </body>
    </html>
  );
}

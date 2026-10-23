import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
  "Filiz Karabulut — CS & Applied Math student at Vanderbilt, AI engineer, and VandyHacks President. A sticker-covered laptop you can click through.";

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
  // Theme: stored choice wins, else follow the OS preference; default dark.
  var t=localStorage.getItem('theme');
  if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}
  if(t==='light')h.setAttribute('data-theme','light');
}catch(e){}
try{
  var h=document.documentElement;
  var force=new URLSearchParams(location.search).get('intro')==='1';
  var reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasHash=location.hash.length>1;
  var seen=sessionStorage.getItem('introSeen');
  if(!reduced&&(force||(!hasHash&&!seen)))h.classList.add('intro-play');
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

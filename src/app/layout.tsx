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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable} antialiased`}
    >
      <body>
        {/* Mark that JS is on, before paint, so scroll-reveal never flashes. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        {children}
      </body>
    </html>
  );
}

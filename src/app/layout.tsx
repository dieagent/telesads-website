import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { brand, links } from "@/lib/content";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ScrollProgress } from "@/components/Visuals";

const sans = Inter({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"], display: "swap" });
const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(links.site),
  title: {
    default: "TELES ADS — Telegram Advertising & Digital Growth Agency",
    template: "%s · TELES ADS",
  },
  description: brand.shortBio,
  keywords: [
    "Telegram advertising",
    "Telegram growth agency",
    "Telegram channel promotion",
    "Meta Ads agency",
    "Telegram bot development",
    "marketing automation",
    "crypto marketing",
    "forex channel growth",
  ],
  openGraph: {
    type: "website",
    url: links.site,
    siteName: brand.name,
    title: "TELES ADS — Your Gateway to Telegram Growth",
    description: brand.shortBio,
  },
  twitter: {
    card: "summary_large_image",
    title: "TELES ADS — Your Gateway to Telegram Growth",
    description: brand.shortBio,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: brand.name,
  description: brand.description,
  url: links.site,
  email: links.email,
  sameAs: [links.channel, links.agentBot],
  areaServed: "Worldwide",
  serviceType: [
    "Telegram Advertising",
    "Meta & Instagram Advertising",
    "Google Advertising",
    "Creative Services",
    "Telegram Growth Consulting",
    "Telegram Bot Development",
    "Automation & AI",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${sans.variable} ${mono.variable} ${serif.variable} antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[100] focus:rounded-full focus:bg-paper focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-bg"
        >
          Skip to Content
        </a>
        <ScrollProgress />
        <Nav />
        <main id="main" className="page-in">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

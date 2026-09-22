import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { brand, links } from "@/lib/content";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

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
    images: [{ url: "/brand/og-hero.png", width: 1200, height: 630, alt: "TELES ADS" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TELES ADS — Your Gateway to Telegram Growth",
    description: brand.shortBio,
    images: ["/brand/og-hero.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}

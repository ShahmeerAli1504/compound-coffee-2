import type { Metadata, Viewport } from "next";
import { Anton, Permanent_Marker, Rubik_Wet_Paint, Space_Grotesk } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { JsonLd } from "@/components/JsonLd";
import { businessSchema, rootOgImage, websiteSchema } from "@/lib/seo";
import { site } from "@/lib/site";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const marker = Permanent_Marker({ weight: "400", subsets: ["latin"], variable: "--font-permanent-marker", display: "swap" });
const wetPaint = Rubik_Wet_Paint({ weight: "400", subsets: ["latin"], variable: "--font-wet-paint", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The Compound Coffee | Mobile Coffee Truck in Reno, NV",
    template: "%s | The Compound Coffee",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  category: "food & drink",
  keywords: [
    "Reno coffee truck",
    "coffee truck Reno NV",
    "mobile coffee Reno",
    "coffee catering Reno",
    "Sparks coffee truck",
    "specialty coffee Reno",
    "event coffee truck Reno",
    "The Compound Coffee",
    "Bagman",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: true, email: true, address: false },
  openGraph: {
    title: "The Compound Coffee — Mobile Coffee Truck in Reno, NV",
    description: "Specialty coffee with a street-art soul. Find the truck, see the menu, book us for your event.",
    url: "/",
    type: "website",
    siteName: site.name,
    locale: "en_US",
    images: [rootOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Compound Coffee — Mobile Coffee Truck in Reno, NV",
    description: "Specialty coffee with a street-art soul. Find the truck, see the menu, book us for your event.",
    images: [rootOgImage.url],
  },
  other: {
    "geo.region": "US-NV",
    "geo.placename": "Reno",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0a1c",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${marker.variable} ${wetPaint.variable} ${grotesk.variable}`}>
      <body>
        <JsonLd data={[businessSchema, websiteSchema]} />
        <noscript>
          <style>{`.rv{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1000] focus:bg-mustard focus:px-4 focus:py-2 focus:font-bold focus:text-ink">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

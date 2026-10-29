import type { Metadata, Viewport } from "next";
import { Anton, Permanent_Marker, Rubik_Wet_Paint, Space_Grotesk } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { openingHoursSchema } from "@/lib/hours";
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
  keywords: ["Reno coffee truck", "mobile coffee Reno", "coffee catering Reno", "The Compound Coffee", "specialty coffee Reno NV", "event coffee truck"],
  openGraph: {
    title: "The Compound Coffee — Reno, NV",
    description: "Specialty coffee with a street-art soul. Find the truck, see the menu, book us for your event.",
    type: "website",
    siteName: site.name,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0b0a1c",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: site.name,
  description: "Mobile specialty coffee truck in Reno, Nevada.",
  url: siteUrl,
  telephone: "+1-775-710-1960",
  email: site.email,
  image: `${siteUrl}/opengraph-image.jpg`,
  address: { "@type": "PostalAddress", addressLocality: "Reno", addressRegion: "NV", addressCountry: "US" },
  areaServed: "Reno, NV",
  openingHours: openingHoursSchema,
  founder: site.founder,
  servesCuisine: "Coffee",
  priceRange: "$",
  sameAs: [site.socials.instagram, site.socials.tiktok, site.socials.yelp],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${marker.variable} ${wetPaint.variable} ${grotesk.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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

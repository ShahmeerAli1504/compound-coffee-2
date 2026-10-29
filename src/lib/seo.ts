import type { Metadata } from "next";
import { food, playlist, setlist, SPECIALTY_PRICE } from "./menu";
import { site } from "./site";
import { siteUrl } from "./site-url";

/* ------------------------------------------------------------------
   SEO helpers: per-page metadata (canonical, Open Graph, Twitter)
   and schema.org JSON-LD for Google rich results.
   ------------------------------------------------------------------ */

const OG_IMAGE = { url: "/opengraph-image.jpg", width: 1296, height: 860, alt: "The Compound Coffee truck at night in downtown Reno" };

export function pageMeta({ title, description, path, keywords = [] }: { title: string; description: string; path: string; keywords?: string[] }): Metadata {
  const fullTitle = `${title} | ${site.name}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: site.name,
      locale: "en_US",
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [OG_IMAGE.url] },
  };
}

export const rootOgImage = OG_IMAGE;

const abs = (path: string) => `${siteUrl}${path}`;

export const businessId = `${siteUrl}/#business`;

export const businessSchema = {
  "@context": "https://schema.org",
  "@type": ["CafeOrCoffeeShop", "FoodEstablishment"],
  "@id": businessId,
  name: site.name,
  alternateName: ["The Compound", "Compound Coffee"],
  slogan: "Where coffee is subjective.",
  description: "Mobile specialty coffee truck in Reno, Nevada — signature drinks, breakfast sandwiches, workplace catering, private events and pop-ups.",
  url: siteUrl,
  telephone: "+1-775-710-1960",
  email: site.email,
  image: abs("/opengraph-image.jpg"),
  logo: abs("/icon.png"),
  priceRange: "$",
  servesCuisine: ["Coffee", "Espresso", "Matcha", "Breakfast"],
  currenciesAccepted: "USD",
  address: { "@type": "PostalAddress", addressLocality: "Reno", addressRegion: "NV", addressCountry: "US" },
  areaServed: [
    { "@type": "City", name: "Reno" },
    { "@type": "City", name: "Sparks" },
  ],
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "13:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday", "Sunday"], opens: "09:00", closes: "12:00" },
  ],
  hasMenu: abs("/menu"),
  acceptsReservations: true,
  founder: { "@type": "Person", name: site.founder },
  sameAs: [site.socials.instagram, site.socials.tiktok, site.socials.yelp, site.socials.vintage],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: site.name,
  url: siteUrl,
  inLanguage: "en-US",
  publisher: { "@id": businessId },
};

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path === "/" ? "" : it.path),
    })),
  };
}

const price = (p: string) => p.replace(/[^0-9./]/g, "").split("/")[0];

export const menuSchema = {
  "@context": "https://schema.org",
  "@type": "Menu",
  name: "The Compound Coffee Menu",
  url: abs("/menu"),
  inLanguage: "en-US",
  hasMenuSection: [
    {
      "@type": "MenuSection",
      name: "The Playlist — Specialty Drinks",
      description: "Signature drinks topped with cold foam. Medium $7 / Large $8.",
      hasMenuItem: playlist.map((t) => ({
        "@type": "MenuItem",
        name: t.name,
        description: t.feat,
        offers: { "@type": "Offer", price: price(SPECIALTY_PRICE), priceCurrency: "USD" },
      })),
    },
    ...[...setlist, food].map((s) => ({
      "@type": "MenuSection",
      name: s.title,
      ...(s.note ? { description: s.note } : {}),
      hasMenuItem: [...s.items, ...(s.extra ?? [])].map((i) => ({
        "@type": "MenuItem",
        name: i.name,
        ...(i.note ? { description: i.note } : {}),
        offers: { "@type": "Offer", price: price(i.price), priceCurrency: "USD" },
      })),
    })),
  ],
};

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

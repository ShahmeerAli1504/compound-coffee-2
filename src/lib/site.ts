export const site = {
  name: "The Compound Coffee",
  tagline: "Where coffee is subjective.",
  description:
    "The Compound Coffee — Reno's street-art coffee truck. Specialty drinks, breakfast sandwiches, workplace catering, private events and pop-ups. Where coffee is subjective.",
  phone: "(775) 710-1960",
  phoneHref: "tel:+17757101960",
  email: "thecompound.inc24@gmail.com",
  city: "Reno, Nevada",
  bookingCalendar: "https://koalendar.com/e/the-compound-coffee",
  socials: {
    instagram: "https://www.instagram.com/_thecompoundcoffee/",
    instagramHandle: "@_thecompoundcoffee",
    tiktok: "https://www.tiktok.com/@_thecompoundcoffee",
    vintage: "https://www.instagram.com/thecompound_vintage/",
    vintageHandle: "@thecompound_vintage",
    yelp: "https://yelp.to/ho7HlKEtgn",
    yelpReview: "https://yelp.to/ho7HlKEtgn",
  },
} as const;

export const nav = [
  { href: "/about", label: "Story" },
  { href: "/menu", label: "Menu" },
  { href: "/find-us", label: "Find Us" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

export const mapsLink = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address + ", Reno, NV")}`;

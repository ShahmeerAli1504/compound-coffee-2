/* Server-side only: canonical URL for metadata, sitemap and robots.
   Defaults to the live domain; NEXT_PUBLIC_SITE_URL can override it. */
export const SITE_DOMAIN = "https://www.thecompoundcoffee.net";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || SITE_DOMAIN).replace(/\/$/, "");

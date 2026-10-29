import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

/* Served at /sitemap.xml */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/menu", priority: 0.9, changeFrequency: "monthly" },
    { path: "/find-us", priority: 0.9, changeFrequency: "daily" },
    { path: "/book", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" },
    { path: "/gallery", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  ];
  return routes.map((r) => ({
    url: `${siteUrl}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
    ...(r.path === "" ? { images: [`${siteUrl}/opengraph-image.jpg`] } : {}),
  }));
}

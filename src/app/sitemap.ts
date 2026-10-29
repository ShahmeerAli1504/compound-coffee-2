import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: [string, number][] = [
    ["", 1],
    ["/menu", 0.9],
    ["/find-us", 0.9],
    ["/book", 0.8],
    ["/about", 0.6],
    ["/gallery", 0.6],
    ["/contact", 0.6],
  ];
  return routes.map(([path, priority]) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/find-us" ? "daily" : "monthly",
    priority,
  }));
}

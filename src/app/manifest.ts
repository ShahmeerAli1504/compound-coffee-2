import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "The Compound",
    description: "Reno's street-art coffee truck. Where coffee is subjective.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0a1c",
    theme_color: "#0b0a1c",
    icons: [{ src: "/icon.png", sizes: "180x180", type: "image/png" }],
  };
}

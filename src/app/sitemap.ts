import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Pflicht bei output: "export" (Next 16): Route beim Build statisch erzeugen.
export const dynamic = "force-static";

/**
 * Statischer Export: wird beim Build nach out/sitemap.xml geschrieben.
 * Nur echte Routen mit trailing slash (next.config.ts). Ankerziele (/#wagen)
 * gehören nicht in eine Sitemap.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/agb/`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/impressum/`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/datenschutz/`, changeFrequency: "yearly", priority: 0.3 },
  ];
}

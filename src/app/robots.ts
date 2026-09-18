import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Pflicht bei output: "export" (Next 16): Route beim Build statisch erzeugen.
export const dynamic = "force-static";

/** Statischer Export: wird beim Build nach out/robots.txt geschrieben. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}

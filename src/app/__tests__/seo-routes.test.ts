import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { site } from "@/lib/site";

describe("robots.txt und sitemap.xml (statischer Export)", () => {
  it("erlaubt alle Crawler und verweist auf die Sitemap", () => {
    expect(robots()).toEqual({
      rules: { userAgent: "*", allow: "/" },
      sitemap: `${site.url}/sitemap.xml`,
    });
  });

  it("listet nur echte Routen mit trailing slash, Startseite zuerst", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls[0]).toBe(`${site.url}/`);
    expect(urls).toEqual(
      expect.arrayContaining([`${site.url}/agb/`, `${site.url}/impressum/`, `${site.url}/datenschutz/`]),
    );
    expect(urls.every((url) => url.endsWith("/"))).toBe(true);
    expect(urls.some((url) => url.includes("#"))).toBe(false);
  });
});

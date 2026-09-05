import path from "node:path";
import { render, screen } from "@testing-library/react";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import PrivacyPage, {
  metadata as privacyMetadata,
} from "@/app/datenschutz/page";
import Home from "@/app/page";
import ImprintPage, {
  metadata as imprintMetadata,
} from "@/app/impressum/page";
import { Footer } from "@/components/Footer";
import { siteMetadata as rootMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

describe("Rechtsseiten und Metadaten", () => {
  it("zeigt im Impressum ausschließlich bestätigte Unternehmensdaten", () => {
    render(<ImprintPage />);

    expect(screen.getByRole("heading", { level: 1, name: "Impressum" })).toBeInTheDocument();
    expect(screen.getAllByText(site.legalName).length).toBeGreaterThan(0);
    const provider = screen.getByRole("heading", { name: /Angaben nach § 5 DDG/i }).closest("section");
    expect(provider).toHaveTextContent(site.address.street);
    expect(provider).toHaveTextContent(site.address.city);
    expect(screen.getByText(site.commercialRegisterNumber)).toBeInTheDocument();
    expect(screen.getByText(site.vatId)).toBeInTheDocument();
    expect(screen.queryByText(/Montabaur|zu bestätigen|Platzhalter/i)).not.toBeInTheDocument();
  });

  it("beschreibt im Datenschutz den tatsächlich gebauten Drittanbieter- und Speicherstand", () => {
    render(<PrivacyPage />);

    expect(screen.getByRole("heading", { level: 1, name: "Datenschutz" })).toBeInTheDocument();
    expect(screen.getByText(/statische Website auf Webhosting-Infrastruktur/i)).toBeInTheDocument();
    expect(screen.getByText(/keine Analyse- oder Marketing-Cookies/i)).toBeInTheDocument();
    expect(screen.getByText(/erst geladen, wenn Sie aktiv zustimmen/i)).toBeInTheDocument();
    expect(screen.getByText(/ausschließlich lokal in Ihrem Browser/i)).toBeInTheDocument();
    expect(screen.getByText(/weder an uns übertragen noch serverseitig gespeichert/i)).toBeInTheDocument();
    expect(screen.getByText(/keine Verbindung zu einem externen Schriftenanbieter/i)).toBeInTheDocument();
    expect(screen.getByText(/kein Bewertungs-Widget von Google/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Karteneinstellung im Bereich Region" }),
    ).toHaveAttribute("href", "/#region");
  });

  it("hält Footer, Canonicals und Social-Metadaten konsistent", () => {
    render(<Footer />);

    expect(screen.getAllByText(site.legalName).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: "Impressum" })).toHaveAttribute(
      "href",
      expect.stringContaining("/impressum"),
    );
    expect(screen.getByRole("link", { name: "Datenschutz" })).toHaveAttribute(
      "href",
      expect.stringContaining("/datenschutz"),
    );
    expect(rootMetadata.alternates?.canonical).toBe("/");
    expect(imprintMetadata.alternates?.canonical).toBe("/impressum/");
    expect(privacyMetadata.alternates?.canonical).toBe("/datenschutz/");
    expect(rootMetadata.description).toMatch(/Toilettenwagen.*mieten/i);
    expect(rootMetadata.openGraph).toMatchObject({
      url: "/",
      images: [
        expect.objectContaining({
          url: "/social/toilettenwagen-westerwald-og.png",
          width: 1200,
          height: 630,
        }),
        expect.objectContaining({
          url: "/social/toilettenwagen-westerwald-square.png",
          width: 1080,
          height: 1080,
        }),
      ],
    });
  });

  it("liefert strukturierte Unternehmensdaten nur aus bestätigter Stammdatenquelle", () => {
    const { container } = render(<Home />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();

    const json = JSON.parse(script?.textContent ?? "{}") as Record<string, unknown>;
    expect(json).toMatchObject({
      "@type": "LocalBusiness",
      name: site.legalName,
      url: site.url,
      telephone: site.phone,
      email: site.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        postalCode: site.address.postalCode,
        addressLocality: site.address.locality,
        addressCountry: "DE",
      },
    });
    expect(JSON.stringify(json)).not.toMatch(/Montabaur|MStV/i);
  });

  it("erzeugt das Social Preview im vorgesehenen Format", async () => {
    const preview = path.join(
      process.cwd(),
      "public",
      "social",
      "toilettenwagen-westerwald-og.png",
    );
    const image = await sharp(preview).metadata();

    expect(image.width).toBe(1200);
    expect(image.height).toBe(630);
    expect(image.format).toBe("png");

    const squarePreview = path.join(
      process.cwd(),
      "public",
      "social",
      "toilettenwagen-westerwald-square.png",
    );
    const square = await sharp(squarePreview).metadata();
    expect(square.width).toBe(1080);
    expect(square.height).toBe(1080);
    expect(square.format).toBe("png");
  });
});

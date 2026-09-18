import path from "node:path";
import { render, screen } from "@testing-library/react";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import PrivacyPage, {
  metadata as privacyMetadata,
} from "@/app/datenschutz/page";
import Home from "@/app/page";
import TermsPage, { metadata as termsMetadata } from "@/app/agb/page";
import ImprintPage, {
  metadata as imprintMetadata,
} from "@/app/impressum/page";
import { Footer } from "@/components/Footer";
import { siteMetadata as rootMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

describe("Rechtsseiten und Metadaten", () => {
  it("zeigt die übernommenen AGB mit bestätigter Reinigung und Abwasserempfehlung", () => {
    render(<TermsPage />);
    expect(screen.getByRole("heading", { level: 1, name: "AGB" })).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(12);
    expect(screen.getByText(/Alle Preise verstehen/)).toHaveTextContent("Endreinigung inklusive Desinfektion wird immer eine Pauschale von 50 € zusätzlich zur Miete berechnet");
    expect(screen.getByText(/Abstand von höchstens 5 Metern/)).toHaveTextContent("empfohlen");
    expect(screen.queryByText(/maximal 3 Meter/)).not.toBeInTheDocument();
    expect(termsMetadata.alternates?.canonical).toBe("/agb/");
  });
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
    expect(screen.getByRole("heading", { name: "Google-Bewertungen und Profilbilder" })).toBeInTheDocument();
    expect(screen.getByText(/Eine Live-Abfrage über eine Google-API/)).toHaveTextContent("nicht statt");
    expect(screen.getByRole("heading", { name: "Adresssuche mit Geoapify" })).toBeInTheDocument();
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
    expect(screen.getByRole("link", { name: "AGB" })).toHaveAttribute("href", expect.stringMatching(/^\/agb\/?$/));
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

  it("ergänzt Öffnungszeiten, Einsatzgebiet und die drei Wagen als Angebote im JSON-LD", () => {
    const { container } = render(<Home />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const json = JSON.parse(script?.textContent ?? "{}") as {
      openingHoursSpecification: Array<{ dayOfWeek: string[]; opens: string; closes: string }>;
      areaServed: Array<{ name: string }>;
      hasOfferCatalog: { itemListElement: Array<{ itemOffered: { name: string }; priceSpecification: { price: string; valueAddedTaxIncluded: boolean } }> };
      image: string;
    };

    // site.hours: Mo-Fr zweigeteilt + Sa -> drei Zeitfenster, Werte 1:1 aus der Stammdatenquelle.
    expect(json.openingHoursSpecification).toHaveLength(3);
    expect(json.openingHoursSpecification[0]).toMatchObject({ dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "13:00" });
    expect(json.openingHoursSpecification[2]).toMatchObject({ dayOfWeek: ["Saturday"], opens: "10:00", closes: "16:00" });

    // Einsatzgebiet nur mit Orten, die auch in der FAQ genannt werden.
    expect(json.areaServed.map((place) => place.name)).toEqual(expect.arrayContaining(["Westerwald", "Daaden", "Siegen", "Betzdorf"]));

    // Ein Angebot je Modell mit Nettopreis pro Miettag aus models.ts (17.500 Cent -> "175.00").
    expect(json.hasOfferCatalog.itemListElement.map((offer) => offer.itemOffered.name)).toEqual(["Toilettenwagen S", "Toilettenwagen M", "Toilettenwagen L"]);
    expect(json.hasOfferCatalog.itemListElement[0].priceSpecification).toMatchObject({ price: "175.00", valueAddedTaxIncluded: false });
    expect(json.image).toBe(`${site.url}/social/toilettenwagen-westerwald-og.png`);
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

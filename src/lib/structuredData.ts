import { socialPreview } from "@/lib/metadata";
import { trailerModels } from "@/lib/models";
import { site } from "@/lib/site";

/** Orte aus der FAQ-Antwort „In welche Orte liefern Sie?“ – keine erfundenen Angaben. */
export const serviceAreaPlaces = [
  "Westerwald",
  "Daaden",
  "Herdorf",
  "Neunkirchen",
  "Niederfischbach",
  "Dillenburg",
  "Haiger",
  "Siegen",
  "Netphen",
  "Rennerod",
  "Betzdorf",
] as const;

/** site.hours: „Mo-Fr 08:00-13:00 & 15:00-19:00“, „Sa 10:00-16:00“ → OpeningHoursSpecification. */
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;
const dayRanges: Record<string, readonly string[]> = {
  "Mo-Fr": weekdays,
  Sa: ["Saturday"],
};

export const openingHoursSpecification = site.hours.flatMap(({ days, time }) =>
  time.split("&").map((range) => {
    const [opens, closes] = range.trim().split("-");
    return {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: dayRanges[days] ?? [],
      opens,
      closes,
    };
  }),
);

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${site.url}/#unternehmen`,
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  logo: `${site.url}/logo.png`,
  image: `${site.url}${socialPreview.url}`,
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    postalCode: site.address.postalCode,
    addressLocality: site.address.locality,
    addressCountry: "DE",
  },
  openingHoursSpecification,
  areaServed: serviceAreaPlaces.map((name) => ({ "@type": "Place", name })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Toilettenwagen zur Miete",
    itemListElement: trailerModels.map((model) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        serviceType: "Toilettenwagen-Vermietung",
        name: `Toilettenwagen ${model.name}`,
        description: `${model.suitability} ${model.womensCabins} Damen-WCs, ${model.mensCabins} Herren-WC${model.mensCabins > 1 ? "s" : ""}, ${model.urinals} Urinale, für bis zu ${model.capacity} Personen. Maße ${model.dimensions}.`,
        areaServed: serviceAreaPlaces.map((name) => ({ "@type": "Place", name })),
        provider: { "@id": `${site.url}/#unternehmen` },
      },
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: (model.priceNetCents / 100).toFixed(2),
        priceCurrency: "EUR",
        valueAddedTaxIncluded: false,
        unitText: "Miettag",
      },
      availability: "https://schema.org/InStock",
      url: `${site.url}/#modellvergleich`,
    })),
  },
};

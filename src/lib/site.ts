/**
 * Zentrale, faktische Stammdaten der Website.
 * Quelle: docs/DISCOVERY.md / PRODUCT.md. Keine erfundenen Angaben.
 */

export const site = {
  name: "Mobile Sanitäranlagen HS",
  legalName: "Mobile Sanitäranlagen Herrmann und Smécz UG (haftungsbeschränkt)",
  domain: "www.mobile-sanitaeranlagen-hs.de",
  url: "https://www.mobile-sanitaeranlagen-hs.de",
  phone: "+49 160 2743001",
  phoneHref: "tel:+491602743001",
  email: "kontakt@mobile-sanitaeranlagen-hs.de",
  whatsappUrl:
    "https://api.whatsapp.com/message/7YQT7HKQHZBMH1?autoload=1&app_absent=0",
  address: {
    street: "Im Reuschewäldchen 12",
    postalCode: "57567",
    locality: "Daaden",
    city: "57567 Daaden",
    country: "Deutschland",
  },
  managingDirectors: ["Phillip Smécz", "Christian Herrmann"],
  commercialRegisterNumber: "HRB 30803",
  vatId: "DE458238707",
  hours: [
    { days: "Mo-Fr", time: "08:00-13:00 & 15:00-19:00" },
    { days: "Sa", time: "10:00-16:00" },
  ],
  serviceRadiusKm: 125,
  travelPricePerKm: "1,10 €",
} as const;

/** Sticky-Ankernavigation: Reihenfolge = Sektionen der Startseite.
 *  Absolute `/#anker`, damit die Links auch von /impressum & /datenschutz funktionieren. */
export const navLinks = [
  { href: "/#wagen", label: "Wagen" },
  { href: "/#service", label: "Service" },
  { href: "/#ablauf", label: "Ablauf" },
  { href: "/#region", label: "Region" },
  { href: "/#kontakt", label: "Kontakt" },
] as const;

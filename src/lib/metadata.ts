import type { Metadata } from "next";
import { site } from "@/lib/site";

export const socialPreview = {
  url: "/social/toilettenwagen-westerwald-og.png",
  width: 1200,
  height: 630,
  alt: "Freigestellter Toilettenwagen von Mobile Sanitäranlagen Herrmann und Smécz",
} as const;

export const squareSocialPreview = {
  url: "/social/toilettenwagen-westerwald-square.png",
  width: 1080,
  height: 1080,
  alt: "Toilettenwagen mieten rund um Niederdreisbach",
} as const;

export const siteMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Toilettenwagen mieten - Westerwald & Umkreis | Mobile Sanitäranlagen HS",
    template: "%s | Mobile Sanitäranlagen HS",
  },
  description:
    "Gepflegte, beheizte Toilettenwagen rund um Niederdreisbach mieten. Liefer- und Abholtage zählen nicht als Miettage. Persönlich anfragen per WhatsApp.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: site.name,
    url: "/",
    title: "Toilettenwagen mieten - Westerwald & Umkreis",
    description:
      "Gepflegte, beheizte Toilettenwagen rund um Niederdreisbach mieten. Drei Größen für private, gewerbliche und öffentliche Anlässe.",
    images: [socialPreview, squareSocialPreview],
  },
  twitter: {
    card: "summary_large_image",
    title: "Toilettenwagen mieten - Westerwald & Umkreis",
    description:
      "Gepflegte, beheizte Toilettenwagen rund um Niederdreisbach für Feiern, Veranstaltungen und Einsätze.",
    images: [socialPreview.url],
  },
};

export function createLegalMetadata(
  title: string,
  description: string,
  canonical: `/${string}/`,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "de_DE",
      siteName: site.name,
      url: canonical,
      title,
      description,
      images: [socialPreview, squareSocialPreview],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialPreview.url],
    },
  };
}

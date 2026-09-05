import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Warm-humanistischer Grotesk, von next/font zur Build-Zeit self-hosted
// (kein Google-CDN zur Laufzeit -> datenschutzfreundlich, ADR/Direction Contract).
const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: "Toilettenwagen mieten – Westerwald & Umkreis | Mobile Sanitäranlagen HS",
    template: "%s | Mobile Sanitäranlagen HS",
  },
  description:
    "Gepflegte, beheizte Toilettenwagen mieten in Daaden, Westerwald und Umkreis (125 km). Faire Preise, Liefer- und Abholtag kostenfrei, Angebot meist in unter 2 Stunden.",
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: site.name,
    title: "Toilettenwagen mieten – Westerwald & Umkreis",
    description:
      "Gepflegte, beheizte Toilettenwagen mieten. Faire Preise, Liefer- und Abholtag kostenfrei, schnelles Angebot.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" className={`${hanken.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <Header />
        <main id="top" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteMetadata } from "@/lib/metadata";

// Warm-humanistischer Grotesk, von next/font zur Build-Zeit self-hosted
// (kein Google-CDN zur Laufzeit -> datenschutzfreundlich, ADR/Direction Contract).
const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = siteMetadata;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" data-scroll-behavior="smooth" className={`${hanken.variable} ${bricolage.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <a href="#top" className="skip-link">
          Zum Inhalt springen
        </a>
        <Header />
        <main id="top" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

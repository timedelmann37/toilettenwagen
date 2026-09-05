import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ADR-0001: Auslieferung als statischer Export auf Hetzner Webhosting L.
  // Kein Node/SSR verfügbar -> reine HTML/CSS/JS-Dateien in `out/`.
  output: "export",
  // Statischer Export kann next/image nicht zur Laufzeit optimieren:
  // Bilder werden vorab (Build/Asset-Pipeline) optimiert und unverändert ausgeliefert.
  images: { unoptimized: true },
  // Trailing Slash -> saubere Verzeichnis-URLs (z.B. /impressum/) auf Apache-Webhosting.
  trailingSlash: true,
  // Projektwurzel fixieren (verhindert Fehl-Inferenz durch package-lock.json außerhalb des Repos).
  turbopack: { root: import.meta.dirname },
};

export default nextConfig;

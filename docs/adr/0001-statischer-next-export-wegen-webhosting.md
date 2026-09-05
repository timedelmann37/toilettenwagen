# Statischer Next.js-Export wegen Hetzner Webhosting L

Die Seite wird auf Hetzner **Webhosting L** (Shared Hosting, bereits gekauft) betrieben, das kein zuverlässiges Node/SSR ausführt. Wir bauen Next.js daher als **statischen Export** (`output: 'export'`) und deployen reine HTML/CSS/JS-Dateien per **SSH/rsync**.

## Considered Options

- **Statischer Export auf Webhosting L** (gewählt): läuft garantiert, kein Server-Betrieb, tägliche Backups + SSL inklusive, minimale Wartung. Kosten trägt der Auftraggeber, Paket ist vorhanden.
- **Hetzner Cloud-Server (VPS) mit Node-SSR**: volle Next.js-Fähigkeiten, aber laufende Server-Administration (Updates, Prozess-Management, Reverse-Proxy) – für eine Marketing-Seite nicht gerechtfertigt.
- **Shared-Node auf Webhosting L**: technisch vorhanden, aber Next-16-SSR auf Shared-Node ist fummelig und fragil.

## Consequences

- **Keine API-Routen / kein SSR.** Serverlogik (Anfrageformular) muss außerhalb von Next.js liegen → siehe ADR-0002.
- **`next/image`-Laufzeitoptimierung entfällt.** Fotos werden vorab zu WebP optimiert und mit festen Formaten ausgeliefert (`images.unoptimized`).
- Node.js ist auf Webhosting L als Zukunfts-Option vorhanden, wird aber bewusst nicht für den Betrieb vorausgesetzt.

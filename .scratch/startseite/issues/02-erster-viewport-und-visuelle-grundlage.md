# 02: Erster Viewport und visuelle Grundlage

**What to build:** Die Produktionsroute `/` beweist im Browser die bestätigte Richtung „Die Modellfamilie als roter Faden“. Dieser Slice ersetzt den alten Platzhalter-Hero durch eine warme, eigenständige Produktbühne mit drei Wagen, klarer regionaler Einordnung und zwei Anfragewegen.

**Blocked by:** 01

**Status:** done

## Verbindliche Quellen

- `.scratch/startseite/spec.md`, besonders 6.1, 6.2, 7, 8, 10 bis 12
- `docs/design/direction-contract-home.md`
- `docs/design/asset-plan-home.md`, besonders `VEH-S-HERO-V0`
- `PRODUCT.md`, `CONTEXT.md` und ADR-0001
- Vor jeder Next.js-Änderung die passenden lokalen Guides in `node_modules/next/dist/docs/` lesen.

## Lieferumfang

- Die bestehende App-Shell wird auf den neuen Direction Contract ausgerichtet, ohne die Prototyp-Route als Produktionsvorlage zu kopieren.
- Eine zentrale typisierte Modelldatenquelle enthält bereits alle bestätigten S/M/L-Fakten und ist die einzige Quelle für sichtbare Hero-Labels.
- Drei Instanzen des transparenten S-Prototyps bilden eine lebendige S/M/L-Familie. Jede Instanz wird korrekt bezeichnet; die Darstellung behauptet nicht, bereits maßhaltige M-/L-Freisteller zu zeigen.
- Claim, regionale Einordnung, **Per WhatsApp anfragen** und **Anfrage vorbereiten** sind im ersten Viewport verständlich und sichtbar.
- Archivo, Bricolage Grotesque und Familjen Grotesk werden im echten Hero mit Hanken Grotesk als Fließtext verglichen. Der User bestätigt eine Fassung; nur diese verbleibt in der Produktionsroute.

## Akzeptanzkriterien

- [x] Warme Porzellan-Grundfläche, warmes Navy/Graphit und kontrolliertes Hygiene-Blau sind als klare Tokens umgesetzt; kein Reinweiß, kein kaltes SaaS-Grau und keine dunkle Gesamtseite. WhatsApp-Grün bleibt die bestätigte funktionale Kanalfarbe.
- [x] Der Hero ist keine Split-Card und keine sterile Dreierreihe. Die Wagen stehen getrennt, überlappen weder wichtige Logos noch CTAs und wirken als Familie.
- [x] Hinter den Wagen liegt weder Foto, AI-Textur, Nebel, Glasfläche noch künstliche Studioarchitektur.
- [x] Mindestens Logo, Angebot, Niederdreisbach/Region, ein deutlicher Produktbeweis und der WhatsApp-CTA sind bei 1440 × 900 sowie 390 × 844 ohne Scrollen erfassbar.
- [x] H1 bleibt höchstens zweizeilig; Begleittext ist knapp. Technische Tabelle, WC-Aufteilung und lange Ausstattung fehlen bewusst im Hero.
- [x] Navigation enthält **Wagen · Service · Ablauf · Region · Kontakt**, funktioniert zu bestehenden oder vorläufigen Ankern und besitzt einen sichtbaren WhatsApp-Weg.
- [x] Mobile Navigation ist per Tastatur bedienbar, schließt mit Escape und gibt den Fokus an den Auslöser zurück.
- [x] WhatsApp nutzt ausschließlich den bestätigten Deeplink und überträgt keine Formular- oder Personendaten.
- [x] Der Wagen hat feste Abmessungen gegen Layout Shift, einen sinnvollen Alt-Text nur an der informativen Instanz und eine responsive, budgetgerechte Quelle. Dekorative Wiederholungen sind für Assistenztechnik ausgeblendet.
- [x] Die drei Fontvarianten wurden im echten Hero verglichen; der User bestätigte B. Die finale B-Fassung wurde anschließend in Desktop und Mobile geprüft und im Asset-Plan dokumentiert.
- [x] Keine sichtbare Copy erfindet Verfügbarkeit, Preisvorteile, Zertifikate oder Qualitätsrankings.

## Prüfung

- [x] Route-naher Renderingtest findet H1, S/M/L, Region, WhatsApp und den Formularsprung.
- [x] Navigationstest deckt Öffnen, Escape und Fokusrückgabe mobil ab.
- [x] Typecheck, Lint, fokussierte Tests und statischer Build sind grün.
- [x] Browserbelege für 1440 × 900 und 390 × 844 liegen vor; offensichtliche Überläufe und abgeschnittene Wagen sind behoben.

## Nicht in diesem Ticket

- Keine Scrollfahrt, Größenmorphologie oder Pinning-Mechanik.
- Keine finale M-/L-Erzeugung.
- Keine Preislogik, Auswahlhilfe oder Formularimplementierung.

## Comments

- 2026-09-05: Ersetzt nach User-Freigabe das veraltete Split-Hero-Ticket. Der First Viewport muss die neue Richtung beweisen.
- 2026-09-05: User bestätigt Kandidat B. Bricolage Grotesque bleibt als einzige Display-Schrift in der Produktionsroute; Hanken Grotesk bleibt Fließtext.
- 2026-09-05: Browserabnahme bei 1440 × 900 und 390 × 844. Mobile H1 = exakt zwei Zeilen; alle Figuren enden vor 844 px; kein horizontaler Überlauf. Typecheck, Lint, 5 Tests, statischer Build und Impeccable-Detector sind grün.

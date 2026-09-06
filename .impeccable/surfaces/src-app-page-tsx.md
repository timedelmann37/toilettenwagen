---
version: 2
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets:
  - "src/app/impressum/page.tsx"
  - "src/app/datenschutz/page.tsx"
---

# Surface Brief — Startseite `/`

- **Scope:** vollständiger One-Pager `/` plus `/impressum` und `/datenschutz`; nicht nur Hero/Modellprototyp.
- **Mode:** Persuade; Greenfield.
- **Audience:** Privatfeiern/Hochzeiten, Veranstalter/Kirmes, Firmen/Bau und Kommunen gleichwertig.
- **Primary action:** WhatsApp-Anfrage. **Secondary:** vollständiges Anfrageformular.
- **Proof:** reale Wagen und Daten S/M/L, faire Miettage, inkludiertes Zubehör, schwierige Aufstellungen, Region, Reaktionszeit und fünf echte Bewertungen.
- **Dials:** DESIGN_VARIANCE 7 / MOTION_INTENSITY 7 als späteres Ziel / VISUAL_DENSITY 4.

## Direction contract

**THESIS:** Die Modellfamilie ist der rote Faden. Drei freigestellte Wagen eröffnen die Seite; der S-Wagen löst sich aus der Familie und führt auf einer rechten Achse zu drei exakt eingerasteten Stationen. S, M und L liegen in einem kompakten gleichmäßigen Takt und ein Gestus führt genau eine Station weiter. Zwischen den Stopps morphen die echten Assets über eine kurze komplementäre Materialmaske ineinander; S wird nicht zu den größeren Modellen gestreckt. L parkt kurz und läuft danach mit dem Sticky-Ende nach oben aus dem Bild. Oberhalb von S und unterhalb von L bleibt der normale Dokumentfluss frei. Danach übernimmt die reale Servicestory bis zur Anfrage.

**OWN-WORLD:** Warmes Porzellan statt Reinweiß; warmes Navy/Graphit; Hygiene-Blau mit kontrollierten Verläufen; mineralische Grautöne und ein kleiner warmer Gegenakzent. Bricolage Grotesque als Display-Schrift plus Hanken Grotesk für Fließtext, beide über `next/font`. Freigestellte originalgetreue 2,5D-Wagen ohne künstliche Hintergründe. Große Produktbühnen wechseln mit streng gerasterten Datenzonen; wenige Karten, wenig Schatten, keine AI-Texturen.

**STORY:** Ruhige Anchor-Nav → „Die Familie“ mit S/M/L und WhatsApp im First Viewport → statisch vollständige S/M/L-Modellgeschichte, später als durchgehende rechte Fahrspur animiert → kompakter Modellwechsler mit Privat-brutto/Gewerbe-netto → „Der Wagen parkt. Der Service übernimmt“ mit fairen Miettagen und Inklusivzubehör → Voraussetzungen vor Ort → reale Zeitlinie von Anfrage bis Abholung → Region ab Niederdreisbach, consent-geschützte Karte und echte Bewertungen → WhatsApp plus vollständiges Anfrageformular → Recht/Fußzeile.

**FIRST VIEWPORT:** Drei getrennte, aber zusammengehörige Wagen ohne Hintergrundkulisse auf einer gemeinsamen glaubwürdigen Bodenlinie. S, M und L nutzen seit Ticket 11 eigenständige, aus realen Produktquellen abgeleitete Freisteller mit korrekten Labels und Daten. Kurzer Claim, regionale Einordnung, primärer WhatsApp-CTA und sekundärer Formularsprung sichtbar. Technik und Tabellen erst auf den zweiten Blick.

**FORM:** Eigenständige produktgeführte Erzählung, kein generisches Hero→Featurekarten→Testimonials→Kontakt-Skelett. Modellwechsler aktualisiert Bild, Kapazität, Maße, Aufteilung, Ausstattung und Preis; leichte Empfehlungshilfe darf das Formular vorbefüllen. Formularfelder: Name, E-Mail oder Telefon, Ort/PLZ, Datum/Zeitraum, Modell/weiß nicht, Anlass, Nachricht, Datenschutz; Honeypot sowie klare Fehler-, Lade-, Erfolgs- und Fallback-Zustände. Maps nur nach Consent. Mobile und Reduced Motion zeigen alle Informationen ohne lange gepinnte Scrollspur.

**FINISH:** unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

Finale User-Abnahme des kurzen Morph-Timings, der Snap-Abstände, des L-Ausstiegs und des L-Dreiviertelwinkels; offene Pflichtangaben für Impressum/Datenschutz; produktiver PHP-Mailer; finales `og:image`.

## Full contract

`docs/design/direction-contract-home.md` ist die verbindliche Langfassung und enthält Modelldaten, Claims, Motion-, Formular-, Accessibility-, Performance- und Rechtsverträge.

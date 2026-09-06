# 09: Recht, Datenschutz und Social-Vorschau

**What to build:** Impressum, Datenschutz, Metadaten und Social-Vorschau stimmen mit der tatsächlich gebauten Website überein. Fehlende Betreiberangaben werden nicht erfunden, sondern als echte Go-live-Blocker ausgewiesen.

**Blocked by:** 07, 08

**Status:** done

## Verbindliche Quellen

- `.scratch/startseite/spec.md`, besonders 6.12, 12, 13 und 17
- `docs/IMPRESSUM.md`
- `docs/TODO-DATENSCHUTZ.md`
- `docs/design/asset-plan-home.md`
- tatsächliche Implementierung aus Ticket 07 und 08

## Lieferumfang

- Nutzbare statische Routen `/impressum` und `/datenschutz`.
- Konsistente Footer-, Kontakt-, Canonical-, Favicon- und Open-Graph-Metadaten.
- Ein Social-Preview-Asset aus dem freigegebenen echten Hero.
- Nachprüfbare Go-live-Liste für noch fehlende Angaben.

## Akzeptanzkriterien

- [x] Footer und Impressum verwenden vollständigen bestätigten Firmennamen, Anschrift, Telefon und E-Mail konsistent.
- [x] Rechtsform, Vertretung, HRB/Registergericht, USt-ID und ein gegebenenfalls erforderlicher MStV-Verantwortlicher werden nur eingetragen, wenn sie bestätigt sind.
- [x] Offene Pflichtangaben bleiben in Dokumentation und Workflow als klare Auslieferungsblocker sichtbar; es erscheinen keine erfundenen Platzhalter auf der öffentlichen Seite.
- [x] Datenschutz beschreibt exakt das eigene Hosting, Formular/PHP-Mailer, Consent-Speicherung und Google Maps. Nicht eingesetztes Tracking wird nicht hineinformuliert.
- [x] Consent lässt sich von der Datenschutzseite oder einem klaren globalen Einstieg erneut öffnen und ändern.
- [x] Deutscher Titel und Description enthalten „Toilettenwagen mieten“ mit glaubwürdigem regionalem Bezug; Canonical, Favicons und Rechtslinks funktionieren im statischen Export.
- [x] Strukturierte Unternehmensdaten enthalten ausschließlich bestätigte Fakten.
- [x] `og:image` wird aus dem freigegebenen Hero mit realem S-Wagen und finaler Typografie erzeugt, in mehreren Social-Crops geprüft und nicht aus einem verworfenen Konzeptboard abgeleitet.
- [x] Rechtsseiten besitzen dieselbe visuelle Sprache, bleiben aber ruhig, textorientiert und ohne Marketingchoreografie.

## Prüfung

- [x] Statischer Routentest findet beide Rechtsseiten, Footerlinks und zentrale Kontaktdaten.
- [x] Exportprüfung bestätigt funktionierende Pfade, Canonical und Social-Metadaten.
- [x] Datenschutzinhalt wird gegen die tatsächlich geladenen Drittressourcen geprüft.
- [x] Social-Preview wird visuell bei mindestens 1200 × 630 geprüft.
- [x] Typecheck, Lint, Tests und statischer Build sind grün.

## Nicht in diesem Ticket

- Keine Rechtsberatung und keine Erfindung fehlender Unternehmensdaten.
- Kein Tracking oder Marketingpixel.
- Keine Scrollanimation.

## Comments

- 2026-09-05: Ersetzt das alte allgemeine Responsive-Ticket. Der statische Gesamtcheck folgt in Ticket 10.
- 2026-09-05: Abgeschlossen mit statischen Rechtsrouten, technikgenauem Datenschutz, bestätigten Stammdaten, Canonicals, strukturierten Daten sowie 1200 × 630 und 1080 × 1080 Social-Preview aus dem realen S-Wagen. Fehlendes Registergericht und die MStV-Prüfung bleiben dokumentierte Go-live-Blocker.

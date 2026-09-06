# Go-live-Checkliste

Status: **blockiert**, bis alle als Blocker markierten Punkte bestätigt sind.

## Recht und Datenschutz

- [ ] **Blocker · Betreiber/Rechtsberatung:** Registergericht der HRB 30803 bestätigen und in `/impressum/` ergänzen.
- [ ] **Blocker · Betreiber/Rechtsberatung:** Erforderlichkeit und gegebenenfalls Person nach § 18 Abs. 2 MStV bestätigen.
- [ ] **Blocker · Betreiber/Rechtsberatung:** Impressum und Datenschutzerklärung abschließend rechtlich prüfen.
- [ ] **Blocker · Betreiber/Hetzner:** Auftragsverarbeitungsvereinbarung, Server-Log-Konfiguration und Löschfristen bestätigen.
- [x] Öffentliche Seiten enthalten keine unbestätigten Betreiberdaten oder sichtbaren Platzhalter.
- [x] Google Maps lädt erst nach Einwilligung; die Entscheidung lässt sich erneut öffnen.
- [x] Laufzeitverhalten von Formular, Speicher, WhatsApp, Fonts und Bewertungen ist im Datenschutztext beschrieben.

## Anfrageformular

- [x] Ohne konfigurierten Endpunkt werden keine Formulardaten übertragen.
- [ ] **Blocker vor Mailer-Aktivierung · Projekt + Betreiber:** PHP-Endpunkt, Missbrauchsschutz, Empfänger, Speicherdauer, Staging-Erfolg/-Fehler und Datenschutztext gemeinsam abnehmen.
- [ ] **Blocker vor Mailer-Aktivierung · Betreiber:** `NEXT_PUBLIC_INQUIRY_ENDPOINT` erst nach dieser Abnahme beim Produktionsbuild setzen.

## Domain und Social Preview

- [x] Canonical-Basis ist `https://www.mobile-sanitaeranlagen-hs.de`.
- [x] Favicon ist vorhanden und in den Metadaten referenziert.
- [x] Social Preview nutzt den freigegebenen realen S-Wagen, das schwarze transparente Firmenlogo und Bricolage Grotesque.
- [x] Open-Graph-Bild ist 1200 × 630 Pixel groß.
- [x] Eine eigenständig komponierte 1080 × 1080 Variante vermeidet abgeschnittene Inhalte in quadratischen Social-Crops.
- [ ] **Blocker · Betreiber/Hetzner:** Produktionsdomain, HTTPS, Weiterleitung von/non-www und statische Rechtsrouten auf dem Zielhosting prüfen.

## Produktasset

- [ ] **Blocker · User:** finalen L-Dreiviertelwinkel feinabnehmen oder Austausch anfordern.

## Design-Finish

- [ ] **Blocker · Projekt + User:** Für eine formale Impeccable-`ship`-Freigabe eine neue nachvollziehbare Seed-/Quality-Bar-Runde durchführen und den Finish-Review wiederholen. Aktuelle Reviewer-Disposition: `fix`; historische Freigaben werden nicht rückwirkend konstruiert.

## Abschlussprüfung

- [x] Ticket 10: vollständige statische Desktop-/Mobile-Prüfung.
- [x] Ticket 11: Motion und Reduced-Motion nach statischer Freigabe.
- [x] Ticket 12: finaler Review und technischer Auslieferungsstand. Der Review ist vollständig, die formale Impeccable-`ship`-Freigabe bleibt als eigener Blocker offen. Evidenz: `docs/design/final-qa-2026-09-06.md`.

# Go-live-Checkliste

Status: **blockiert**, bis alle als Blocker markierten Punkte bestätigt sind.

## Recht und Datenschutz

- [ ] **Blocker:** Registergericht der HRB 30803 bestätigen und in `/impressum/` ergänzen.
- [ ] **Blocker:** Erforderlichkeit und gegebenenfalls Person nach § 18 Abs. 2 MStV bestätigen.
- [ ] **Blocker:** Impressum und Datenschutzerklärung abschließend rechtlich prüfen.
- [ ] **Blocker:** Hetzner-Auftragsverarbeitungsvereinbarung, Server-Log-Konfiguration und Löschfristen bestätigen.
- [x] Öffentliche Seiten enthalten keine unbestätigten Betreiberdaten oder sichtbaren Platzhalter.
- [x] Google Maps lädt erst nach Einwilligung; die Entscheidung lässt sich erneut öffnen.
- [x] Laufzeitverhalten von Formular, Speicher, WhatsApp, Fonts und Bewertungen ist im Datenschutztext beschrieben.

## Anfrageformular

- [x] Ohne konfigurierten Endpunkt werden keine Formulardaten übertragen.
- [ ] **Blocker vor Mailer-Aktivierung:** PHP-Endpunkt, Missbrauchsschutz, Empfänger, Speicherdauer, Fehlerfälle und Datenschutztext gemeinsam abnehmen.
- [ ] **Blocker vor Mailer-Aktivierung:** `NEXT_PUBLIC_INQUIRY_ENDPOINT` erst nach dieser Abnahme setzen.

## Domain und Social Preview

- [x] Canonical-Basis ist `https://www.mobile-sanitaeranlagen-hs.de`.
- [x] Favicon ist vorhanden und in den Metadaten referenziert.
- [x] Social Preview nutzt den freigegebenen realen S-Wagen, das schwarze transparente Firmenlogo und Bricolage Grotesque.
- [x] Open-Graph-Bild ist 1200 × 630 Pixel groß.
- [x] Eine eigenständig komponierte 1080 × 1080 Variante vermeidet abgeschnittene Inhalte in quadratischen Social-Crops.
- [ ] **Blocker:** Produktionsdomain, HTTPS, Weiterleitung von/non-www und statische Rechtsrouten auf dem Zielhosting prüfen.

## Abschlussprüfung

- [ ] Ticket 10: vollständige statische Desktop-/Mobile-Prüfung.
- [ ] Ticket 11: Motion und Reduced-Motion nach statischer Freigabe.
- [ ] Ticket 12: finaler Review und Auslieferung.

# Go-live-Checkliste

Status: **blockiert**, bis alle als Blocker markierten Punkte bestätigt sind.

## Recht und Datenschutz

- [ ] **Blocker · Betreiber/Rechtsberatung:** Neue AGB-Seite vor Veröffentlichung prüfen, insbesondere Schriftform, Haftung, Stornostaffel, Verbraucherpreise und gegebenenfalls Widerruf. Bestätigte 5-m-Abwasserempfehlung, vorab einzuholende Genehmigungen und immer zusätzlich berechnete Endreinigung inklusive Desinfektion wurden korrigiert; keine Wirksamkeitsfreigabe. Steuerdarstellung der Reinigungspauschale noch eindeutig bestätigen.
- [ ] Geoapify-Schlüssel vor Veröffentlichung rotieren, auf Produktionsdomains begrenzen und als NEXT_PUBLIC_GEOAPIFY_API_KEY in Portainer/Build-Umgebung setzen. Vertrags-/Datenschutzprüfung des Adressdiensts abschließen. Kein Schlüssel im Repository.
- [ ] **Blocker · Betreiber:** Rechtsgrundlage für Weiterveröffentlichung der Google-Rezensionen und besonders der Profilbilder dokumentieren; Art.-14-Information, Rechte, Interessenabwägung/Einwilligung und konkrete Überprüfungs-/Löschkriterien klären. Der neue Datenschutzabschnitt beschreibt zunächst den tatsächlichen technischen Stand, keine ungeklärte Einwilligung oder Rechtsgrundlage wird behauptet.
- [ ] **Blocker · Betreiber:** Für die neue Veröffentlichung Hetzner als tatsächlichen Hoster bestätigen (Altwebsite nennt IONOS); Logfristen, AV-Vertrag, Drittlandgarantien von Maps und WhatsApp sowie Erforderlichkeit der Browser-Speicherung abschließend prüfen.

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

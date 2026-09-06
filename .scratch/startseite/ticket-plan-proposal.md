# Vorschlag: vertikale Tickets für die Startseite

Status: `approved`  
Basis: `spec.md`, `../../docs/design/direction-contract-home.md`, `../../docs/design/asset-plan-home.md`  
Stand: 2026-09-05

Freigabe: User bestätigte den Zuschnitt am 2026-09-05. Ticket 01 bleibt als erledigte technische Historie erhalten. Die veralteten Tickets 02 bis 10 wurden mit der bestätigten Richtung neu geschrieben; Ticket 11 und 12 wurden ergänzt.

## Zuschnitt

| Ticket | Vertikaler Slice | Sichtbares Ergebnis | Blockiert durch |
| --- | --- | --- | --- |
| 02 | Erster Viewport und visuelle Grundlage | Die Produktionsroute `/` beweist die Richtung: warmer heller Markenmodus, finale Fontentscheidung, Navigation und drei freigestellte S-Wagen als beschriftete S/M/L-Familie. Der Hero ist statisch, responsiv und besitzt sichtbare Anfragewege. | 01 |
| 03 | Statische Modellreise | Vom Hero führt eine zusammenhängende, noch unbewegte Komposition durch die Stationen S, M und L. Echte Maße, Kapazitäten, Ausstattung und ein Detail auf den zweiten Blick sind vollständig lesbar. Der S-Wagen bleibt als austauschbarer Platzhalter für alle drei Modelle. | 02 |
| 04 | Modell wählen und Preise verstehen | Ein regulärer Modellwechsler fasst S/M/L zusammen. Privat-Brutto und Gewerbe-Netto wechseln korrekt; Anfahrt und Miettag-Regel sind verständlich. Eine kurze Auswahlhilfe empfiehlt anhand der Personenzahl ein Modell, ohne Verfügbarkeit zu versprechen. Verhaltenstests decken die Regeln ab. | 03 |
| 05 | Der Wagen parkt, der Service übernimmt | Der Übergang von Produkt zu Dienstleistung ist als eigener Moment sichtbar. Leistungen, Anschlüsse und bauseitige Voraussetzungen werden mit ausgewählten echten Detailfotos statt einer Kartenwand erklärt. | 03 |
| 06 | Von der Anfrage bis zur Abholung | Der reale Ablauf, Vorlaufzeiten und Verantwortlichkeiten bilden eine leicht scannbare Servicegeschichte. Jede Zielgruppe erkennt den Prozess, ohne dass getrennte Landingpages entstehen. | 05 |
| 07 | Region und Vertrauen | 125-km-Einsatzgebiet, weitere Strecken auf Anfrage, Google Maps erst nach Einwilligung sowie fünf echte Kundenstimmen bilden einen glaubwürdigen regionalen Vertrauensabschnitt mit allen Consent-Zuständen. | 05 |
| 08 | Anfrage vollständig abschließen | WhatsApp bleibt primäre Conversion. Das Anfrageformular übernimmt eine Modellauswahl, validiert alle vereinbarten Felder und zeigt Lade-, Erfolgs-, Fehler- und Fallbackzustand. PHP-Mailer, Honeypot und Datenschutzfreigabe funktionieren im statischen Hostingmodell. | 04, 06, 07 |
| 09 | Rechtsseiten, Datenschutz und Social-Vorschau | Impressum und Datenschutz enthalten die verfügbaren finalen Angaben, Maps- und Formularhinweise sind konsistent, Metadaten stimmen und ein `og:image` wird aus dem freigegebenen echten Hero abgeleitet. Noch fehlende Betreiberangaben werden klar als Go-live-Blocker geführt. | 07, 08 |
| 10 | Statische Gesamtseite freigeben | Die vollständige Seite besteht den Desktop- und Mobile-Browserreview. Responsive Layout, Tastaturbedienung, Fokus, Kontrast, Semantik, Bildbudgets, LCP und statischer Export sind nachweislich in Ordnung. Materielle visuelle Mängel werden in diesem Slice behoben. | 04, 05, 06, 07, 08, 09 |
| 11 | Leitwagen-Motion und Reduced Motion | Erst nach statischer Freigabe bricht derselbe sichtbare S-Wagen aus der Hero-Familie aus, wechselt auf die rechte Spur, fährt nur nach unten, rastet bei S/M/L ein, wächst kontrolliert und parkt bei L. Mobile und `prefers-reduced-motion` erhalten gleichwertige, ruhigere Fassungen. | 10 |
| 12 | Finaler Review und Auslieferungsstand | Spec- und Standardsreview, vollständiger Testlauf, Exportprüfung, Dokumentation und Workflow-Abschluss sind erledigt. Offene Go-live-Angaben sind entweder geschlossen oder als echte externe Blocker benannt. | 11 |

## Warum dieser Zuschnitt

- Ticket 02 beweist sofort die neue Welt und produziert keinen unsichtbaren Komponentenbaukasten.
- Ticket 03 und 04 trennen Erzählung und Entscheidungshilfe. So kann die Modellreise visuell stimmen, bevor Logik hinzukommt.
- Ticket 05 bis 07 wechseln bewusst die Layoutfamilie: redaktioneller Bildbeweis, Prozessrhythmus und regionaler Vertrauensraum.
- Ticket 08 führt alle zuvor getroffenen Entscheidungen in eine echte Conversion durch.
- Ticket 10 ist das statische Freigabegate. Erst danach ist Ticket 11 zulässig.
- Die Frontier enthält nach Veröffentlichung nur Ticket 02, weil Ticket 01 bereits abgeschlossen ist.

## Veröffentlichung nach Freigabe

1. Tickets 02 bis 10 mit diesem Zuschnitt überschreiben und ihren Status auf `ready-for-agent` setzen.
2. Tickets 11 und 12 neu anlegen.
3. In jedem Ticket Akzeptanzkriterien, reale Asset-IDs, Testseams und konkrete Blocker ausformulieren.
4. `docs/WORKFLOW_STATE.md` auf Phase 6 und Ticket 02 als einzige nächste Aktion setzen.

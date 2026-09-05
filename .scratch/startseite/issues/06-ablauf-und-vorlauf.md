# 06: Ablauf und Vorlauf

**What to build:** Eine reale, leicht scannbare Servicegeschichte zeigt den Weg von der ersten Anfrage bis zur Schlussrechnung. Sie beantwortet Verantwortlichkeit und Timing, ohne wie eine generische Icon-Timeline auszusehen.

**Blocked by:** 05

**Status:** done

## Verbindliche Quellen

- `.scratch/startseite/spec.md`, besonders 4, 5 und 6.9
- `PRODUCT.md`, `CONTEXT.md` und `docs/DISCOVERY.md`

## Lieferumfang

- Sechs Schritte von der Anfrage bis zur Bewertung.
- Sichtbare Hinweise zur üblichen Angebotsreaktion, Anzahlung, Lieferung, Abholung und Vorlaufzeit.
- Eine gemeinsame Erzählung für Privat, Veranstaltung, Gewerbe und Kommune.

## Akzeptanzkriterien

- [ ] Reihenfolge ist exakt: Anfrage; persönliches Angebot; Auftragsbestätigung und fallweise 30 % Anzahlung; Lieferung/Aufbau meist einen Tag vorher; Abholung/Abbau meist einen Tag danach; Reinigung, Schlussrechnung und Bitte um Google-Bewertung.
- [ ] **Üblicherweise in unter zwei Stunden innerhalb der Erreichbarkeit** wird nicht als jederzeitige Garantie formuliert.
- [ ] August-Hochzeiten werden idealerweise etwa ein Jahr vorher angefragt; sonst werden meist drei bis sechs Monate Vorlauf genannt.
- [ ] Der Ablauf benutzt eine redaktionelle Zeitachse oder räumliche Sequenz, keine sechs identischen Iconkarten.
- [ ] Die vier Zielgruppen sind in Beispielen oder Mikrocopy wiedererkennbar, ohne vier getrennte Landingpages oder wiederholte Nutzenlisten.
- [ ] Jede Stufe ist auf kleinen Bildschirmen in normaler Lesereihenfolge verständlich.
- [ ] Der Abschluss führt natürlich zu Region und Anfrage, ohne falsches Buchungs- oder Reservierungsversprechen.

## Prüfung

- [ ] Renderingtest bestätigt alle sechs Schritte und beide Vorlaufhinweise.
- [ ] Browserreview auf Desktop und Mobile prüft Rhythmus, Leserichtung und nicht-generische Darstellung.
- [ ] Typecheck, Lint, fokussierte Tests und statischer Build sind grün.

## Nicht in diesem Ticket

- Keine echte Verfügbarkeitsabfrage.
- Kein Bewertungs-Slider und keine Karte.
- Keine Wagen-Scrollmotion.

## Comments

- 2026-09-05: Ersetzt das frühere isolierte Kundenstimmen-Ticket; Bewertungen werden mit Region in Ticket 07 aufgebaut.
- 2026-09-05: Als redaktionelle Zeitstrecke umgesetzt: drei ruhige Anfrage-/Angebots-/Bestätigungsstufen, ein gemeinsames Vorher-/Nachher-Fenster rund um den Anlass und ein klarer Abschluss bis zur Google-Bewertung. Die Vorlaufhinweise für August-Hochzeiten und andere Anlässe bleiben sichtbar und werden nicht als Verfügbarkeitszusage formuliert. Desktop und 390 × 844 mobil visuell geprüft; kein horizontaler Überlauf. Typecheck, Lint, 27 Tests, statischer Build und Impeccable-Detector sind grün.
- 2026-09-05: Nach Nutzerfeedback die unverbundenen Textzeilen und den separaten 04/05-Block durch eine einzige durchgehende Zeitachse ersetzt. Alle sechs Schritte sind kürzer, Zeitangaben sitzen direkt an ihren Stationen und Lieferung/Abholung bilden innerhalb der Achse ein zusammenhängendes blaues Ereignisfenster. Die Achse besitzt einen einzelnen Progress-Seam für die spätere Phase-8-Animation und wird unter 1100 px vertikal gelesen.

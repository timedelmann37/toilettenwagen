# 05: Serviceübergang und Voraussetzungen

**What to build:** Nach der Produktentscheidung parkt die visuelle Wagenreise. Ein eigenständiger Übergang erklärt, was Herrmann & Smécz übernimmt und was am Aufstellort gemeinsam geklärt werden muss.

**Blocked by:** 03

**Status:** done

## Verbindliche Quellen

- `.scratch/startseite/spec.md`, besonders 6.7 und 6.8
- `docs/design/direction-contract-home.md`
- `docs/design/asset-plan-home.md`, redaktionelle Bildauswahl
- `PRODUCT.md` und `CONTEXT.md`

## Lieferumfang

- Sichtbarer Kapitelwechsel **Der Wagen parkt. Der Service übernimmt.**
- Wenige große, inhaltlich verschiedene Servicebeweise mit echten Bildern.
- Verständliche Aufstellungsplanung mit allen bestätigten Anschlüssen und Voraussetzungen.

## Akzeptanzkriterien

- [ ] Der Übergang fühlt sich wie ein neuer Akt an, bleibt aber visuell Teil derselben Seite. Er ist keine Sammlung gleich großer USP-Karten.
- [ ] Sichtbar erklärt werden: Liefer- und Abholtag zählen nicht als Miettage; Abwasserrohre, Frischwasserschläuche und maßgefertigte Holzabdeckungen sind dabei; alle Wagen sind beheizt und ganzjährig einsetzbar; gemeinsame Sanitär- und Lichtausstattung; schwierige Aufstellungen werden lösungsorientiert geplant.
- [ ] Die Seite formuliert eindeutig, dass Lieferung und Abholung separat berechnet werden, obwohl diese Tage nicht als Miettage zählen.
- [ ] Voraussetzungen stehen zusammenhängend: 230 V, Wasseranschluss, fester ebener Untergrund, Abwasseranschluss und erforderliche Genehmigung.
- [ ] Voraussetzungen klingen nach gemeinsamer Vorbereitung, nicht nach verstecktem Haftungsausschluss.
- [ ] `interieur-2.webp`, `foto-03.webp`, `foto-08.webp` sowie eine Ansicht des Türmotivs werden nur dort eingesetzt, wo sie eine konkrete Aussage belegen.
- [ ] Warmes/kaltes Wasser und Sensorarmaturen erscheinen ausschließlich beim S-Modell. Das Palmen-/Strandmotiv bleibt bis zur bestätigten Modellzuordnung eine neutrale Innenansicht.
- [ ] Die blaue Nachtaufnahme ist höchstens ein einmaliger breiter Kontrastmoment; die Seite bleibt insgesamt warm und hell.
- [ ] Fotos sind sinnvoll zugeschnitten, haben feste Dimensionen, beschreibende Alt-Texte und liegen innerhalb der Assetbudgets.

## Prüfung

- [ ] Route-naher Test findet sämtliche Voraussetzungen und die korrekte Miettag-/Lieferkostenaussage.
- [ ] Desktop- und Mobile-Browserreview prüft Bildqualität, unterschiedliche Layoutfamilien und verständliche Lesereihenfolge.
- [ ] Typecheck, Lint, fokussierte Tests und statischer Build sind grün.

## Nicht in diesem Ticket

- Kein Ablauf, keine Karte, keine Bewertungen.
- Keine nachträgliche Erfindung weiterer Inklusivleistungen.
- Keine Wagen-Scrollmotion.

## Comments

- 2026-09-05: Ersetzt das alte Einsatzgebietsticket; Region folgt im neuen Ticket 07.
- 2026-09-05: Umgesetzt mit einmaliger Nachtzäsur, vier budgetierten echten Detailableitungen, fairer Berechnungslogik und zusammenhängender Aufstellungsplanung. Desktop und Mobile visuell geprüft; Typecheck, Lint, 26 Tests, statischer Build und Impeccable-Detector grün.
- 2026-09-05: Alle fünf Servicebilder anschließend als nicht-destruktive `retouched-v1`-Ableitungen licht- und tonwertkorrigiert. Originale und erste Produktionsableitungen bleiben erhalten; finale Dateien liegen zwischen 41.800 und 140.828 Byte. Erneute Browserprüfung, Typecheck, Lint, 26 Tests, statischer Build und Detector sind grün.
- 2026-09-05: Die vier Innenmotive zusätzlich als `retouched-v2` aus natürlicher Steh- und Eintrittsperspektive aufbereitet. Die Nachtaufnahme bleibt wegen ihres bereits glaubwürdigen Außenwinkels auf v1. Alle früheren Fassungen bleiben erhalten. Desktop und Mobil erneut visuell geprüft; Typecheck, Lint, 26 Tests, Build und Detector grün.
- 2026-09-05: Nach Nutzerfeedback die vier weit auseinandergezogenen Fotokapitel zu einer kompakten Ausstattungskomposition verdichtet. Das Palmen-/Strandmotiv ist kein hervorgehobener S-Sonderbeweis mehr und wird bis zur geklärten Modellzuordnung neutral beschriftet.

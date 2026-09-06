# 04: Modellwahl, Preise und Auswahlhilfe

**What to build:** Nach der Modellreise können Besucher S/M/L in Ruhe vergleichen, zwischen Privat-Brutto und Gewerbe-Netto wechseln und anhand der Personenzahl eine unverbindliche Größenorientierung erhalten.

**Blocked by:** 03

**Status:** done

## Verbindliche Quellen

- `.scratch/startseite/spec.md`, besonders 6.4 bis 6.6, 7, 11, 12 und 14
- ADR-0004
- zentrale Modelldatenquelle aus Ticket 02

## Lieferumfang

- Ein zusammenhängender, nicht automatisch laufender Modellwechsler für S/M/L.
- Eine verständliche Preisansicht mit Privat-Brutto als Default und Gewerbe-Netto als Alternative.
- Eine kleine Auswahlhilfe mit Personenzahl und optionalem Anlass.
- Eine stabile Übergabe des gewählten oder empfohlenen Modells an das spätere Anfrageformular.

## Akzeptanzkriterien

- [x] Die Modellwahl aktualisiert gemeinsam Wagenbild, Kapazität, Maße, Damen-/Herrenaufteilung, Urinale, Ausstattung und Ab-Preis.
- [x] Aktives Modell ist visuell und programmatisch erkennbar; Auswahl funktioniert per Klick und Tastatur. Es gibt weder Autoplay noch erzwungenes Wischen.
- [x] Default ist **Privat · brutto inkl. MwSt.** mit 208,25 €, 226,10 € und 249,90 €. Gewerbe zeigt 175,00 €, 190,00 € und 210,00 € netto.
- [x] Alle Preise heißen **ab** und **pro Miettag**; Brutto wird aus der Nettoquelle mit 19 % MwSt. berechnet und kaufmännisch auf Cent gerundet.
- [x] Direkt bei den Preisen stehen Anfahrt 1,10 €/km, separate Lieferung/Abholung, kostenlose Zählung der Liefer- und Abholtage als Miettage sowie der Hinweis auf das individuelle Angebot. Die Formulierung darf nicht behaupten, Lieferung oder Abholung selbst seien kostenfrei.
- [x] Die Preisansicht bleibt für den laufenden Seitenbesuch erhalten, ohne Nutzerprofil oder externe Speicherung.
- [x] Auswahlhilfe: bis 200 S, 201 bis 400 M, 401 bis 600 L; ungültig, leer oder über 600 führt zu persönlicher Beratung.
- [x] Jede Empfehlung ist sichtbar als unverbindliche Orientierung bezeichnet. Anlass, Zeitraum, Anschlüsse und Verfügbarkeit können die persönliche Empfehlung verändern.
- [x] Anlass und Modell können später in das Formular übernommen werden; es wird kein Preisangebot und keine Verfügbarkeit erzeugt.
- [x] Der Block wirkt wie ein Produktvergleich, nicht wie ein Dashboard oder eine Reihe austauschbarer Preiskarten.

## Prüfung

- [x] Verhaltenstests decken Defaultmodell, vollständigen Datenwechsel, Tastaturwahl und Formular-Vorauswahl-Seam ab.
- [x] Preistests decken Default, Umschaltung, Bruttoberechnung und dauerhaft sichtbare Kostenhinweise ab.
- [x] Auswahlhilfetests decken 200/201/400/401/600, leer, ungültig und über 600 ab.
- [x] Desktop- und Mobile-Browserreview bestätigt verständliche Zustände ohne abgeschnittene Tabellen oder horizontale Präzisionsgesten.
- [x] Typecheck, Lint, Tests und statischer Build sind grün.

## Nicht in diesem Ticket

- Kein Formularversand.
- Keine Buchung, Live-Verfügbarkeit oder verbindliche Kalkulation.
- Keine Scrollanimation.

## Comments

- 2026-09-05: Ersetzt die frühere reine Wagen-/Preis-Sektion und ergänzt die bestätigte kompakte Auswahlhilfe.
- 2026-09-05: Abgeschlossen mit einer zusammenhängenden S/M/L-Produktansicht, session-lokaler Preiswahl, 19-%-Bruttoberechnung und einem Formular-Draft-Seam für Modell und Anlass. Live bei 1440 × 900, 900 × 1024 und 390 × 844 geprüft; keine horizontale Überbreite, alle sichtbaren Mobilziele mindestens 44 px. Typecheck, Lint, 25 Tests, statischer Build und Impeccable-Detector sind grün.

# Anschlussgrafiken — 2026-09-13

## Freigabe und Referenzen

User: GEKA-Hintergrund entfernen; Gardena männlich/weiblich im gleichen Skizzenstil ergänzen. Die zuerst generierten Gardena-Formen wurden verworfen. Verbindliche Formreferenz ist das nachgereichte Foto `codex-clipboard-c3ba25aa-bbc4-4640-853e-4fc19b9947ef.png`: langes Schlauchstück mit glatter Entriegelungshülse, fein gerippter Verschraubung und zylindrischem Ende; separates geripptes Steckteil.

- Stilreferenz: bestehende GEKA-Illustration, monochromer technischer Zeichenstil.
- Platzierung: kompakte Bild-/Textzeilen innerhalb der Wasseranschluss-Erklärung; Typografie und Seitenfarben unverändert (bestehende Refero-/Impeccable-Richtung).
- Kein Logo, keine Übernahme der Fotoanordnung, keine Größen- oder Kompatibilitätszusage. Referenz zeigt eine Pro-System-Ausführung; Abbildungen deshalb ausdrücklich Beispiele, genaue Anschlussausführung vorab abstimmen.
- Begriffe ergänzend geprüft bei [GARDENA Hahnverbinder](https://www.gardena.com/de/produkte/bewaesserung/ogs/hahnverbinder/970522301.html). Männlich/weiblich beschreibt die Steckverbindung, nicht das Schraubgewinde.

## Produktion / Prompt-Spezifikationen

Integrierte ImageGen-Bildbearbeitung, kein API-/CLI-Generierungsfallback. Erste Transparenzversuche lieferten RGB mit eingezeichnetem Raster und wurden nicht übernommen. Finale Generierung auf schwarzer Matte; reproduzierbare Außenhintergrund-Extraktion mit `scripts/prepare-connection-illustrations.mjs`. Dunkle Materialflächen im Inneren bleiben erhalten.

1. GEKA: bestehende Geometrie, Klauen, Dichtung und Perspektive erhalten; monochrome feine Graphitzeichnung; Papier und Hilfslinien durch reines Schwarz ersetzen; keine Schatten, Texte oder neuen Teile.
2. Gardena weiblich: ausschließlich das lange Schlauchstück aus der User-Referenz als Formquelle; glatte Hülse mit Daumenmulde, offene Aufnahme mit Verriegelung, fein gerippte mittlere Mutter, schlankes zylindrisches Ende. GEKA nur als Zeichenstil. Einzelobjekt, Dreiviertelansicht, monochrom, keine Logos oder Wiederholungen, reine schwarze Matte.
3. Gardena männlich: ausschließlich das kleine separate Teil unten links als Formquelle; Innengewinde, fein gerippte Kappe und abgestufter hervorstehender Steckzapfen. GEKA nur als Zeichenstil. Einzelobjekt, eigene Dreiviertelansicht, monochrom, keine Logos, reine schwarze Matte.

Schwarz-Master unter `assets/reserve/fotos/*-reference-v2-black.png`. Nicht akzeptierte Entwürfe werden nicht von der Seite geladen. Alte GEKA-Dateien bleiben unverändert erhalten.

## Website-Dateien

- `public/fotos/geka-transparent-v2.webp`
- `public/fotos/gardena-male-transparent-v2.webp`
- `public/fotos/gardena-female-transparent-v2.webp`

Je 640 × 640 px; echter Alphakanal mit vollständig transparenten und vollständig deckenden Pixeln maschinell bestätigt. Beschriftungen als HTML, kein CSS-Hintergrundblend und kein beschnittener Bildrahmen.

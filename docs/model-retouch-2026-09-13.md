# Modellretusche – Zwischenstand 2026-09-13

## Einheitliche Innenbeleuchtung S/M/L (v5)

Aktuell sind alle drei Modelle als `wagen-{s,m,l}-light-v5-{1600,960}.webp` eingebunden. `scripts/match-vehicle-lighting.mjs` kalibriert jedes der sechs Türfelder an seiner oberen Wandzone auf dieselbe Helligkeitsreferenz und denselben warmweißen RGB-Farbton. Schatten und Texturen bleiben erhalten; keine Behauptung einer physikalischen Kelvin-/Lux-Messung. Alle Außenpixel und der komplette Alphakanal nach verlustfreier Speicherung gegen v3 geprüft und unverändert. Direkter Vergleich: `assets/reserve/fotos/lighting-v5-comparison.png`. 19 Modellvergleichstests grün.

## L-Innenbeleuchtung

Auf Nutzerwunsch ist beim L jetzt `wagen-l-lit-v4-{1600,960}.webp` aktiv. `scripts/light-l-interior.mjs` ergänzt ausschließlich in den zwei vorhandenen Innenraummasken warmes, nach unten abfallendes Licht. Keine neu erfundene Leuchtengeometrie. Außenpixel und vollständiger Alphakanal sind gegenüber v3 unverändert (nach Speicherung geprüft). Im Browser angesehen; 19 Modellvergleichstests grün. S/M bleiben v3.

## Korrektur nach Nutzerreklamation

Die v2-Freistellung wurde wegen hässlicher zusätzlicher Außenränder verworfen. Die damalige visuelle Freigabe war nicht ausreichend. Aktiv ist jetzt v3 aus `scripts/compose-vehicle-interiors.mjs`: Originaldateien als RGBA-Basis, ausschließlich Innenräume aus den Retuschen eingesetzt sowie S-Treppenlücken gezielt transparent gesetzt. Kein globaler Schwellwert, keine Erosion der Außenkontur. Alle sechs verlustfrei gespeicherten WebPs wurden gegen die alten Dateien geprüft: **0 geänderte sichtbare Farb-/Alphapixel außerhalb der expliziten Bearbeitungsmasken**. Originalabmessungen wiederhergestellt. S/M/L im Browser und alter/neuer Stand auf dunklem Hintergrund geprüft. 19 Modellvergleichstests bestanden. Vergleich: `assets/reserve/fotos/vehicle-v3-comparison.png` (links alt, rechts v3). Die nachstehenden v2-Angaben sind historisch, nicht die aktuelle Freigabe.

Nutzerauftrag: In beiden Eingängen nur seitliches Waschbecken sichtbar, keine Toiletten/Pissoirs. Beim S zusätzlich weiße Kästen zwischen/unter den Treppen entfernen. Bestehende Außenform und Perspektive erhalten.

Status: Nach ausdrücklicher Nutzerfreigabe für nicht-generative Nachbearbeitung lokal eingebaut. `scripts/prepare-retouched-vehicles.mjs` entfernt die schwarze Matte, isoliert den Wagen, bereinigt Randpixel und schneidet verbliebene Treppen-/Dachreste aus. Alle drei Modelle verwenden echte Alpha-WebPs: `public/fotos/wagen-{s,m,l}-sink-v2-{1600,960}.webp`. Die alten Assets bleiben zur Wiederherstellung erhalten.

QA: S/M/L im Desktop-Modellvergleich bei 1440 × 900 visuell geprüft; mobile Ansicht bei 390 × 844 geprüft. Alle zehn gerenderten Wagenbilder laden die neuen Desktop-/Mobilquellen, kein horizontaler Überlauf. 19 Modellvergleichstests bestanden. Keine Veröffentlichung durchgeführt. Dies sind retuschierte Visualisierungen, keine neuen Grundrissbelege.

Erzeugung: eingebautes Imagegen, nicht OpenArt. Entwürfe in assets/reserve/fotos/wagen-{s,m,l}-sink-retouch-draft-2026-09-13.png. Keine neuen Innenraumfotos oder realen Grundrissbelege.

## Ursprungsprompts

### S

Use case: precise-object-edit. Input image is the edit target: existing model S mobile restroom trailer product cutout for a website. Retouch ONLY what is visible INSIDE both open doorways: remove every toilet bowl, toilet seat, cistern and urinal, including objects deeper inside. Each entrance should reveal only a small washbasin mounted at the SIDE, neutral interior wall and unobstructed floor. No toilet or urinal visible anywhere. Also remove the erroneous white solid boxes/panels between and underneath the two metal staircases: spaces between treads should be genuinely open/transparent, keeping every metal tread and metal stair support. Preserve exactly the existing trailer exterior, proportions, axle count, wheels, hitch, perspective, metal texture, open doors and black door symbols, stairs, supports, lighting and framing. This is precise retouching, not a new trailer design. Genuine transparent alpha background; no white backdrop, no checkerboard baked in. Keep the whole trailer within frame, same scale and aspect ratio as input.

### M

Use case: precise-object-edit. Input image is the edit target: existing model M mobile restroom trailer product cutout for a website. Retouch ONLY what is visible INSIDE both open doorways: remove every toilet bowl, toilet seat, cistern and urinal, including objects deeper inside. Each entrance should reveal only a small washbasin mounted at the SIDE, neutral interior wall and unobstructed floor. No toilet or urinal visible anywhere.  Preserve exactly the existing trailer exterior, proportions, axle count, wheels, hitch, perspective, metal texture, open doors and black door symbols, stairs, supports, lighting and framing. This is precise retouching, not a new trailer design. Genuine transparent alpha background; no white backdrop, no checkerboard baked in. Keep the whole trailer within frame, same scale and aspect ratio as input.

### L

Use case: precise-object-edit. Input image is the edit target: existing model L mobile restroom trailer product cutout for a website. Retouch ONLY what is visible INSIDE both open doorways: remove every toilet bowl, toilet seat, cistern and urinal, including objects deeper inside. Each entrance should reveal only a small washbasin mounted at the SIDE, neutral interior wall and unobstructed floor. No toilet or urinal visible anywhere.  Preserve exactly the existing trailer exterior, proportions, axle count, wheels, hitch, perspective, metal texture, open doors and black door symbols, stairs, supports, lighting and framing. This is precise retouching, not a new trailer design. Genuine transparent alpha background; no white backdrop, no checkerboard baked in. Keep the whole trailer within frame, same scale and aspect ratio as input.

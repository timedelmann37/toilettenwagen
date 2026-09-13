# Asset-Plan Startseite

Status: `approved`  
Surface: `/`  
Direction: „Die Modellfamilie als roter Faden“  
Stand: 2026-09-06

Freigabe: User bestätigte am 2026-09-05 den Asset- und Ticketplan in der laufenden Session.
Typografie-Freigabe: User bestätigte am 2026-09-05 Kandidat B, Bricolage Grotesque mit Hanken Grotesk.

## 1. Leitplanken

- Die Bildwelt basiert auf den echten Wagen und echten Innenräumen. Keine Stockmotive, keine erfundenen Eventkulissen und keine generierten Produktdetails.
- Der Hero zeigt drei eigenständige freigestellte Wagen ohne fotografischen Hintergrund. Seit Ticket 11 sind reale S- und M-Produktaufnahmen sowie ein aus dem realen L-Foto abgeleitetes Dreiviertel-Rendering produktiv eingesetzt.
- Logos, Türen, Achsen, Ausstattung und technische Proportionen dürfen bei der späteren Aufbereitung nicht frei interpretiert werden.
- Korrekturen dienen nur der Freistellung, Perspektive, Farbe, Belichtung, Kantenqualität und behutsamen Retusche. Die Handybilder dürfen hochwertiger wirken, aber nicht künstlich glatt.
- Jedes Motiv bekommt eine eindeutige Aufgabe. Ähnliche Innenraumfotos werden nicht als wiederholte Kartenserie ausgespielt.
- Blaue Nachtaufnahmen sind ein gezielter Kontrastmoment. Die gesamte Seite wird dadurch nicht kalt oder dunkel.
- Originale und vorhandene WebP-Dateien bleiben unangetastet im nicht ausgelieferten Pool `assets/reserve/fotos/`. Nur freigegebene Produktionsableitungen liegen unter `public/fotos/`.

## 2. Primäre Fahrzeug-Assets

| ID | Quelle | Verbindliche Rolle | Status | Nächste Bearbeitung |
| --- | --- | --- | --- | --- |
| `VEH-S-MASTER` | `assets/reserve/fotos/wagen-s-freigestellt.webp` | reale Referenz für Form, Logo und Ausstattung des S-Wagens | Quelle vorhanden | Weißfläche sauber entfernen, Kanten und Zugdeichsel prüfen, neutral ausrichten |
| `VEH-S-HERO` | `public/fotos/wagen-s-hero-1600.webp` | S-Wagen im Hero und Ausgangspunkt des Leitwagens | produktiv eingesetzt | Form unverändert lassen; mobile Ableitung synchron halten |
| `VEH-M-MASTER` | User-Quelle `m-wagen ohne schatten.jpg` | maßgebliche M-Produktaufnahme in Dreiviertelansicht | bestätigt und produktiv abgeleitet | rechte Türgrafik gezielt von Frau zu Mann korrigiert; übrige Modelllogik erhalten |
| `VEH-M-HERO` | `public/fotos/wagen-m-model-1600.webp`, `wagen-m-model-960.webp` | M-Wagen im Hero, in der statischen Familie und im Vergleich | produktiv eingesetzt | enger transparenter Freisteller; 1283 × 903 / 960 × 676 px |
| `VEH-M-OPEN` | `assets/reserve/fotos/wagen-m-aussen-offen.webp` | ältere M-Referenz mit offenen Türen | Reserve | nur noch zur Produktkontrolle verwenden |
| `VEH-M-PROFILE` | `assets/reserve/fotos/wagen-m-aussen.webp` | Kontrollbild für M-Länge und geschlossene Kontur | Referenz | nicht als Hero-Motiv einplanen; zur Geometrieprüfung verwenden |
| `VEH-L-MASTER` | `assets/reserve/fotos/wagen-l-angle-color-master-v8.png`, über den alten produktiven L-Freisteller abgeleitet; M ausschließlich als Winkel-, Licht- und Farbreferenz | transparenter L-Master mit der ursprünglichen langen Karosserie, zwei offenen Eingängen und Doppelachse | bestätigt und produktiv abgeleitet | alte L-Identität, Länge, Türabstände, Ausstattung und Leinwandfüllung festhalten; nur Perspektive, Licht und Silberton wurden angeglichen |
| `VEH-L-HERO` | `public/fotos/wagen-l-model-1600.webp`, `wagen-l-model-960.webp` | L-Wagen im Hero, in der statischen Familie, auf der animierten Leitspur und im Vergleich | produktiv eingesetzt | alte L-Größe mit auf M abgestimmter Dreiviertelansicht; 1360 × 798 / 960 × 563 px, echte Transparenz |
| `VEH-L-OPEN` | `assets/reserve/fotos/wagen-l-aussen.webp` | ältere L-Referenz mit offener Tür und Doppelachse | Reserve | nur noch zur Produktkontrolle verwenden |
| `VEH-L-ALT` | `assets/reserve/fotos/foto-05.webp`, `assets/reserve/fotos/foto-11.webp` | zusätzliche Kontrolle für L-Proportion und Türzustand | Referenz | nur heranziehen, wenn Konturen oder Details im Hauptfoto unklar sind |

### Abnahmeregel für finale S/M/L-Freisteller

Die drei finalen Dateien müssen auf derselben Grundlinie, mit vergleichbarer Kamerahöhe, konsistenter Farbbalance und glaubwürdiger relativer Länge funktionieren. Nach dem verworfenen ersten Einbau wurden M und L neu aufbereitet, eng auf echte Transparenz beschnitten und im Hero auf eine gemeinsame Bodenlinie gesetzt. Die eigenständigen S/M/L-Produktassets werden im Hero, im statischen Fallback, in der animierten Desktop-Leitspur und im Vergleich gezeigt. An den Stationen ist immer genau ein Raster sichtbar. Nur im kurzen Übergangsfenster liegen Ausgangs- und Zielasset deckungsgleich übereinander und werden über komplementäre weiche Masken getrennt; eine Vollflächen-Alphaüberblendung bleibt ausgeschlossen. So bleiben reale Geometrie und saubere Kanten erhalten, ohne S künstlich zu M oder L zu strecken.

### Produktionsableitungen für Ticket 11

Der eingebaute ImageGen-Modus wurde für beide User-Quellen als hochfidele Asset-Aufbereitung genutzt. Beim M-Wagen korrigierte ein gezielter Edit ausschließlich die falsche rechte Frauen-Silhouette zu einem männlichen Türsymbol und hielt die erhöhte Dreiviertelansicht, Doppelachse, offenen Eingänge, Stufen und Aufbauten als Produktvorgabe fest. Für die L-Korrektur vom 2026-09-06 bleibt der alte produktive L-Freisteller `wagen-l-model-before-three-quarter-2026-09-06-1600.webp` die Autorität für Länge, Maßstab, Türabstand und Ausstattung; `wagen-l-aussen.webp` bleibt die reale Produktkontrolle. M definiert ausschließlich Kamerawinkel, Kamerahöhe, Perspektivflucht, neutralen Silberton und weiches Licht. Ein erster kumulativer Zwischenrender wurde verworfen, nachdem der User die abweichende Identität und zu kleine Scroll-Darstellung beanstandet hatte. Die Größenabweichung entstand zusätzlich durch einen 1600/1360-Widerspruch zwischen intrinsischem Bildmaß und festem L-Layer; der finale Stand stellt den ursprünglichen 1360 × 798-Vertrag wieder her.

Nach weiterem Userfeedback wurde der old-based L-Stand erneut als unveränderlicher Edit-Target verwendet: Die projizierte linke Stirnseite wurde um etwa 10–15 % verbreitert, wodurch der Wagen etwas weiter in die M-Dreiviertelansicht dreht, ohne Außenmaß, Höhe oder L-spezifische Geometrie zu ändern. Anschließend wurde die Farbkorrektur nicht nur visuell, sondern über korrespondierende Karosserieflächen kalibriert. Die mittlere Seitenfläche liegt nun bei M bei RGB 153/151/156 und bei L bei 153/152/158; die Dachflächen liegen bei 182/183/194 beziehungsweise 182/182/194. Ein Chroma-Zwischenschritt ermöglichte die deterministische Alphamaske und Kantenentmattung. Verworfene Zwischenstände wurden entfernt; die alten produktiven L-Dateien bleiben unter `assets/reserve/fotos/wagen-l-model-before-three-quarter-2026-09-06-*.webp` rückholbar.

Normalisiertes Prompt-Set:

- **M:** Präziser Produktfoto-Edit der User-Aufnahme; nur die rechte Türgrafik wird zum männlichen Piktogramm nach realer S/L-Referenz. Proportionen, Perspektive, offene Türen, Stufen, Dachaufbauten, Doppelachse, Beschriftungen, Ausstattung und neutraler Weißraum bleiben festgeschrieben.
- **L – Perspektive/Farbe:** Vom old-based L-Freisteller ausgehen. Dessen extra lange Karosserie, großer leerer Mittelbereich, weit getrennte Eingänge, Leinwandfüllung und Darstellungsgröße sind unveränderlich. M definiert ausschließlich Kamerawinkel, Kamerahöhe, Perspektivflucht, neutralen Silberton und Belichtung. Die kurze linke Stirnfläche wird in der Projektion etwa 10–15 % breiter und erhält dieselbe Dachkantenflucht wie M, die Deichsel bleibt rechts; nicht spiegeln. Zwei Achsen, Fahrgestell, Stützen, zwei Treppen, Öffnungen, Frau-/Mann-Grafiken, Dachhauben, Leuchten, Lüfter, Griffe, Zierleisten und Herstellerkennzeichnung bleiben L-spezifisch. Kein Zoom-out und keine M-Karosserie. Die abschließende Tonkurve gleicht korrespondierende Seiten-, Dach- und Stirnflächen numerisch an M an.
- **L – Alphamaske:** Nur den wechselnden Hintergrund auf ein durchgehend einfarbiges `#FF00FF` setzen und den freigegebenen L-Wagen pixelgetreu bewahren; anschließend die Farbe deterministisch in echte Transparenz überführen.

Ausgaben:

| Modell | Desktop | Mobile | Gewicht |
| --- | --- | --- | --- |
| M | `wagen-m-model-1600.webp` (1283 × 903) | `wagen-m-model-960.webp` (960 × 676) | 75.298 / 70.600 Byte |
| L | `wagen-l-model-1600.webp` (1360 × 798) | `wagen-l-model-960.webp` (960 × 563) | 106.578 / 68.116 Byte |

## 3. Redaktionelle Bildauswahl

| Bildrolle | Primärquelle | Platzierung | Zweck | Behandlung |
| --- | --- | --- | --- | --- |
| Beleuchtung bei Nacht | `assets/reserve/fotos/aussenbeleuchtung.webp` | breite Zäsur zwischen Modellwelt und Serviceakt | reales Qualitätsdetail, kontrollierter Hygiene-Blau-Moment | Kontrast und Horizont prüfen; nur einmal groß einsetzen |
| Waschplatz und Ausstattung | `assets/reserve/fotos/interieur-2.webp` | asymmetrischer Servicebeweis | Waschbecken, Spiegel, Spender und Sensorik auf einen Blick | gerade richten, Lichter beruhigen, enger redaktioneller Crop |
| Kabine | `assets/reserve/fotos/foto-03.webp` | Detailansicht im Modell- oder Ausstattungsabschnitt | reale Innenraumqualität | vertikalen Ausschnitt beibehalten; Weißabgleich wärmer und neutraler |
| Urinalkapazität | `assets/reserve/fotos/foto-08.webp` | zweite Detailansicht, nicht direkt neben der Kabine | Kapazität und Sauberkeit belegen | Perspektive korrigieren, Zuschnitt straffen |
| Innenraum-Türmotiv | `assets/reserve/fotos/kabinen-aussen.webp` oder `assets/reserve/fotos/einstieg-herren.webp` | kompakte allgemeine Ausstattungsgalerie | Innenraumvielfalt zeigen, ohne unbestätigte Modellzuordnung | im Build beide Crops testen, nur den stärkeren veröffentlichen |
| beleuchteter Wagen | `assets/reserve/fotos/wagen-m-aussen-beleuchtet.webp` | Reserve für mobile oder alternative Nachtkomposition | Außenwirkung am Abend | nur nutzen, wenn das breite Primärmotiv responsiv nicht funktioniert |

### Ausgewählte Produktionsableitungen für Ticket 05

Die fünf Servicebilder wurden am 2026-09-05 mit dem eingebauten ImageGen-Werkzeug als `lighting-weather`-Edits aufbereitet. Jede Originaldatei war alleinige Bildreferenz. Der gemeinsame Prompt erlaubte ausschließlich Belichtung, Weißabgleich, Spitzlicht-Rückgewinnung, Schattenzeichnung, lokale Tonwerte und leichte Rauschreduzierung. Geometrie, Perspektive, Ausschnitt, Ausstattung, Beschriftungen, Türmotive und alle Gegenstände mussten unverändert bleiben. CGI-Wirkung, neue Details, starke Glättung, HDR-Halos und Übersättigung waren ausgeschlossen.

| Quelle | Produktionsdatei | Gezielte Korrektur | Ausgabe |
| --- | --- | --- | --- |
| `aussenbeleuchtung.webp` | `aussenbeleuchtung-service-retouched-v1-1600.webp` | Zeichnung im Blaukanal und kontrollierte LED-Spitzlichter | 1600 × 572 px, 68.920 Byte |
| `interieur-2.webp` | `interieur-2-service-retouched-v1-1200.webp` | warm-neutraler Weißabgleich und ruhigere Spiegelbeleuchtung | 900 × 1200 px, 48.880 Byte |
| `foto-03.webp` | `foto-03-kabine-retouched-v1-1200.webp` | hellere Kabine mit besser getrennten Weiß- und Grautönen | 900 × 1200 px, 41.800 Byte |
| `foto-08.webp` | `foto-08-urinale-retouched-v1-1200.webp` | gleichmäßigere Deckenlichter und klarere Bodentextur | 900 × 1200 px, 94.290 Byte |
| `kabinen-aussen.webp` | `kabinen-aussen-s-retouched-v1-1200.webp` | weniger Glanzüberstrahlung und klareres Palmen-/Strandmotiv | 900 × 1200 px, 140.828 Byte |

Die vorherigen WebP-Ableitungen bleiben als nicht ausgewählte Rückfallversionen erhalten. Die `retouched-v1`-Dateien bilden die Ausgangsbasis für die anschließende Perspektivfassung.

### Perspektivfassung v2

Nach der Lichtkorrektur wurden die vier Innenmotive als `precise-object-edit` erneut aus den v1-Dateien abgeleitet. Ziel ist ein glaubwürdiger Blick aus normaler Steh- und Eintrittshöhe mit zurückhaltender 28- bis 35-mm-Anmutung. Unnatürlich bodennahe Handywinkel, übermäßige leere Wand- und Bodenflächen sowie perfekte Katalogsymmetrie waren ausgeschlossen. Anzahl, Art und Anordnung aller sichtbaren Einbauten blieben verbindlich. Beim S-Motiv wurde ein im ersten Perspektivlauf neu entstandenes Deckenlicht in einem gezielten Korrekturlauf wieder entfernt.

| v1-Quelle | Gewählte Produktionsdatei | Perspektivziel | Ausgabe |
| --- | --- | --- | --- |
| `interieur-2-service-retouched-v1-1200.webp` | `interieur-2-service-retouched-v2-1200.webp` | natürlicher Eintrittsblick, Waschplatz im Vordergrund | 900 × 1200 px, 71.196 Byte |
| `foto-03-kabine-retouched-v1-1200.webp` | `foto-03-kabine-retouched-v2-1200.webp` | normale Stehhöhe mit leichtem Blick in die kompakte Kabine | 900 × 1200 px, 41.692 Byte |
| `foto-08-urinale-retouched-v1-1200.webp` | `foto-08-urinale-retouched-v2-1200.webp` | zurückhaltender Eintrittswinkel mit weniger leerer Fläche | 900 × 1200 px, 77.176 Byte |
| `kabinen-aussen-s-retouched-v1-1200.webp` | `kabinen-aussen-s-retouched-v2-1200.webp` | Augenhöhe an der Einstiegskante statt Bodenperspektive | 900 × 1200 px, 111.518 Byte |

Die Nachtaufnahme bleibt in der lichtkorrigierten v1-Fassung, da ihr Außenwinkel bereits natürlich und aussagekräftig ist. Die Startseite verwendet für die vier Innenmotive die v2-Dateien.

### Reservepool (`assets/reserve/fotos/`)

- `foto-01.webp`, `wagen-l-kabinen.webp`: zusätzliche Kabinenansichten.
- `urinale.webp`, `wagen-l-urinale.webp`: alternative Urinalansichten.
- `interieur.webp`, `foto-02.webp`, `foto-04.webp`, `foto-06.webp`, `foto-07.webp`, `foto-09.webp`, `foto-10.webp`, `kabinen-innen.webp`: ergänzende Details, falls ein geplanter Crop nicht trägt.
- Reservebilder werden erst aktiviert, wenn sie eine neue Information liefern. Sie füllen keine symmetrische Galerie auf.

Die genaue Modellzuordnung der neutralen Innenraumfotos gilt bis zur Bestätigung als ungesichert. Deshalb dürfen sie Ausstattung belegen, aber keine falsche S-, M- oder L-Zuordnung behaupten.

## 4. Identität und funktionale Medien

| Asset | Quelle | Rolle | Vorgabe |
| --- | --- | --- | --- |
| Logo | `public/logo.png` | Navigation, Footer, spätere Social-Vorschau | Symbole und Inhalt unverändert; Navigation zeigt die transparente schwarze Kontrastfassung ohne Hintergrundplatte |
| Karte | Google-Maps-Einbettung nach Einwilligung | Einsatzgebiet | vor Einwilligung keine fingierte Kartenillustration; stattdessen ruhiges Textpanel mit 125-km-Angabe und Aktivierungsaktion |
| Social-Vorschau | `public/og/startseite.png`, `public/og/startseite-quadrat.png` | `og:image` | aus finalem Hero, echtem S-Freisteller, schwarzem Logo und finaler Typografie abgeleitet |
| Icons | code-native, einheitlicher Strichsatz | sparsame Orientierung bei Anschlüssen und Leistungen | keine Emoji, keine wechselnden Icon-Stile, keine dekorativen Mini-Illustrationen |

## 5. Typografie-Test

Die finale Kombination wird im ersten Produktionsslice direkt im echten Hero geprüft, nicht auf einem isolierten Font-Board.

| Kandidat | Display | Fließtext | Erwartete Wirkung | Entscheidungskriterium |
| --- | --- | --- | --- | --- |
| A | Archivo | Hanken Grotesk | präzise, produktbezogen, regional unaufgeregt | verworfen: Claim wurde im echten Hero dreizeilig |
| B | Bricolage Grotesque | Hanken Grotesk | charaktervoller und mutiger | **bestätigt** |
| C | Familjen Grotesk | Hanken Grotesk | technisch-freundlich mit eigener Silhouette | verworfen: ruhiger, aber weniger eigenständig als B |

Alle Kandidaten müssen lokal oder über `next/font` reproduzierbar und für Webnutzung lizenzierbar sein. Der bestätigte helle Markenmodus mit warmem Porzellanweiß bleibt verbindlich; ein zusätzlicher Dark Mode ist nicht Teil der Startseite.

Kandidat B ist nach dem Vergleich im echten Hero bestätigt. Die Produktionsroute lädt nur Bricolage Grotesque und Hanken Grotesk; der temporäre URL-Schalter und die beiden ungenutzten Display-Fonts wurden entfernt.

## 6. Ableitungen und Budgets

### Dateinamen

`<motiv>-<rolle>-<breite>.<format>`, zum Beispiel `wagen-s-hero-1600.avif`.

### Zielgrößen

| Typ | Desktop-Quelle | Mobile-Quelle | Zielgewicht |
| --- | --- | --- | --- |
| Hero-Freisteller | 1600 bis 1800 px Breite, transparent | 800 bis 1000 px Breite, transparent | maximal ca. 300 KB je tatsächlich geladener Quelle |
| breite Fotografie | 1600 px Breite | 900 px Breite | maximal ca. 220 KB |
| redaktioneller Detail-Crop | 1000 bis 1200 px längste Kante | 720 bis 900 px | maximal ca. 160 KB |
| kleine Vergleichsansicht | 640 bis 800 px Breite | identisch, wenn Budget hält | maximal ca. 100 KB |

AVIF ist bevorzugt, WebP bleibt Fallback. Transparenz, sichtbare Kanten und tatsächliche Browserqualität entscheiden vor einer rein rechnerischen Dateigröße. Oberhalb des ersten Viewports werden Bilder verzögert geladen. Der Hero erhält feste Maße, damit nichts springt.

Für den aktuellen S-Freisteller liefert `wagen-s-hero-1600.webp` die Desktop-Quelle und die reproduzierbar erzeugte Ableitung `wagen-s-hero-960.webp` die mobile Quelle. Das `<picture>`-Element wählt bis 767 px die kleinere Datei; `scripts/prepare-hero-images.mjs` dokumentiert die Ableitung.

## 7. Nicht veröffentlichen

- `docs/design/concepts/hero-a-curved-stage.png`
- `docs/design/concepts/hero-b-sculptural-plinths.png`
- `docs/design/concepts/hero-c-glass-panorama.png`
- alle `docs/design/concepts/cutout-draft-*`
- alle `docs/design/concepts/*geometry-study*`

Diese Dateien dokumentieren verworfene oder ungenaue Versuche. Sie sind weder Produktbeweis noch Produktionsasset.

## 8. Produktionsreihenfolge

1. S-Freisteller als transparente, saubere Produktionsableitung validieren.
2. Den ersten Viewport mit S dreifach, finaler Typografie und echten Größenlabels bauen.
3. Nur die fünf geplanten redaktionellen Bildrollen aufbereiten und im jeweiligen Layout beurteilen.
4. Finale M- und L-Freisteller separat produzieren, sobald die statische Seite trägt. **Erledigt in Ticket 11:** Austausch erfolgte über die gemeinsame `VehicleImage`-Schnittstelle ohne Inhaltsumbau.
5. `og:image` erst nach visueller Freigabe des finalen Hero erzeugen.

## 9. Offene Asset-Entscheidungen

- Genaue Modellzuordnung des Palmen-/Strandmotivs bestätigen; bis dahin bleibt die veröffentlichte Beschriftung neutral.
- Ob `aussenbeleuchtung.webp` auf kleinen Geräten ausreichend trägt oder dort durch `wagen-m-aussen-beleuchtet.webp` ersetzt wird.
- Feinabnahme des neuen L-Dreiviertelwinkels durch den User; der produktive Austausch ist reversibel und verändert keine Modell- oder Preisangaben.

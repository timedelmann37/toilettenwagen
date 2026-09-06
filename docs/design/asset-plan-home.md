# Asset-Plan Startseite

Status: `approved`  
Surface: `/`  
Direction: „Die Modellfamilie als roter Faden“  
Stand: 2026-09-05

Freigabe: User bestätigte am 2026-09-05 den Asset- und Ticketplan in der laufenden Session.
Typografie-Freigabe: User bestätigte am 2026-09-05 Kandidat B, Bricolage Grotesque mit Hanken Grotesk.

## 1. Leitplanken

- Die Bildwelt basiert auf den echten Wagen und echten Innenräumen. Keine Stockmotive, keine erfundenen Eventkulissen und keine generierten Produktdetails.
- Der Hero zeigt drei freigestellte Wagen ohne fotografischen Hintergrund. Bis maßhaltige M- und L-Freisteller vorliegen, wird derselbe S-Wagen dreimal verwendet. Bezeichnungen und Daten bleiben trotzdem S, M und L.
- Logos, Türen, Achsen, Ausstattung und technische Proportionen dürfen bei der späteren Aufbereitung nicht frei interpretiert werden.
- Korrekturen dienen nur der Freistellung, Perspektive, Farbe, Belichtung, Kantenqualität und behutsamen Retusche. Die Handybilder dürfen hochwertiger wirken, aber nicht künstlich glatt.
- Jedes Motiv bekommt eine eindeutige Aufgabe. Ähnliche Innenraumfotos werden nicht als wiederholte Kartenserie ausgespielt.
- Blaue Nachtaufnahmen sind ein gezielter Kontrastmoment. Die gesamte Seite wird dadurch nicht kalt oder dunkel.
- Originale und vorhandene WebP-Dateien bleiben unangetastet. Optimierte Ableitungen erhalten eigene Dateinamen.

## 2. Primäre Fahrzeug-Assets

| ID | Quelle | Verbindliche Rolle | Status | Nächste Bearbeitung |
| --- | --- | --- | --- | --- |
| `VEH-S-MASTER` | `public/fotos/wagen-s-freigestellt.webp` | reale Referenz für Form, Logo und Ausstattung des S-Wagens | Quelle vorhanden | Weißfläche sauber entfernen, Kanten und Zugdeichsel prüfen, neutral ausrichten |
| `VEH-S-HERO` | `public/fotos/wagen-s-hero-1600.webp` | Hero-Wagen, dreifach als Familie und später als Leitwagen | produktiv eingesetzt | Form unverändert lassen; mobile Ableitung synchron halten |
| `VEH-M-OPEN` | `public/fotos/wagen-m-aussen-offen.webp` | maßgebliche M-Referenz mit offenen Türen | Quelle vorhanden | perspektivisch ausrichten, freistellen, Farbwelt an S angleichen |
| `VEH-M-PROFILE` | `public/fotos/wagen-m-aussen.webp` | Kontrollbild für M-Länge und geschlossene Kontur | Referenz | nicht als Hero-Motiv einplanen; zur Geometrieprüfung verwenden |
| `VEH-L-OPEN` | `public/fotos/wagen-l-aussen.webp` | maßgebliche L-Referenz mit offener Tür und Doppelachse | Quelle vorhanden | freistellen, Perspektive und Helligkeit angleichen, Logo unverändert lassen |
| `VEH-L-ALT` | `public/fotos/foto-05.webp`, `public/fotos/foto-11.webp` | zusätzliche Kontrolle für L-Proportion und Türzustand | Referenz | nur heranziehen, wenn Konturen oder Details im Hauptfoto unklar sind |

### Abnahmeregel für finale S/M/L-Freisteller

Die drei finalen Dateien müssen auf derselben Grundlinie, mit vergleichbarer Kamerahöhe, identischer Farbbalance und glaubwürdiger relativer Länge funktionieren. Vor dem Austausch im Hero werden sie als transparente Einzelansicht und als Dreierfamilie geprüft. Der aktuelle S-Dreifachaufbau bleibt so lange die verlässlichere Produktionslösung.

## 3. Redaktionelle Bildauswahl

| Bildrolle | Primärquelle | Platzierung | Zweck | Behandlung |
| --- | --- | --- | --- | --- |
| Beleuchtung bei Nacht | `public/fotos/aussenbeleuchtung.webp` | breite Zäsur zwischen Modellwelt und Serviceakt | reales Qualitätsdetail, kontrollierter Hygiene-Blau-Moment | Kontrast und Horizont prüfen; nur einmal groß einsetzen |
| Waschplatz und Ausstattung | `public/fotos/interieur-2.webp` | asymmetrischer Servicebeweis | Waschbecken, Spiegel, Spender und Sensorik auf einen Blick | gerade richten, Lichter beruhigen, enger redaktioneller Crop |
| Kabine | `public/fotos/foto-03.webp` | Detailansicht im Modell- oder Ausstattungsabschnitt | reale Innenraumqualität | vertikalen Ausschnitt beibehalten; Weißabgleich wärmer und neutraler |
| Urinalkapazität | `public/fotos/foto-08.webp` | zweite Detailansicht, nicht direkt neben der Kabine | Kapazität und Sauberkeit belegen | Perspektive korrigieren, Zuschnitt straffen |
| Innenraum-Türmotiv | `public/fotos/kabinen-aussen.webp` oder `public/fotos/einstieg-herren.webp` | kompakte allgemeine Ausstattungsgalerie | Innenraumvielfalt zeigen, ohne unbestätigte Modellzuordnung | im Build beide Crops testen, nur den stärkeren veröffentlichen |
| beleuchteter Wagen | `public/fotos/wagen-m-aussen-beleuchtet.webp` | Reserve für mobile oder alternative Nachtkomposition | Außenwirkung am Abend | nur nutzen, wenn das breite Primärmotiv responsiv nicht funktioniert |

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

### Reservepool

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
| Social-Vorschau | noch offen | `og:image` | erst aus dem finalen Hero mit echtem S-Freisteller und finaler Typografie ableiten |
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
4. Finale M- und L-Freisteller separat produzieren, sobald die statische Seite trägt. Austausch ohne Änderung an Inhalt oder Layout ermöglichen.
5. `og:image` erst nach visueller Freigabe des finalen Hero erzeugen.

## 9. Offene Asset-Entscheidungen

- Genaue Modellzuordnung des Palmen-/Strandmotivs bestätigen; bis dahin bleibt die veröffentlichte Beschriftung neutral.
- Ob `aussenbeleuchtung.webp` auf kleinen Geräten ausreichend trägt oder dort durch `wagen-m-aussen-beleuchtet.webp` ersetzt wird.
- Finale maßhaltige M- und L-Freisteller. Sie blockieren den statischen Erstaufbau ausdrücklich nicht.

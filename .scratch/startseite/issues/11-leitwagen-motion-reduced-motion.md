# 11: Leitwagen-Motion und Reduced Motion

**What to build:** Nach der statischen Freigabe wird die bestätigte Leitwagen-Choreografie präzise und performant ergänzt. Motion erklärt die drei Modellgrößen und verbindet Hero, Stationen und Vergleich; sie ersetzt keinen Inhalt.

**Blocked by:** 10

**Status:** done

## Verbindliche Quellen

- `.scratch/startseite/spec.md`, besonders 6.3, 8, 10 bis 12 und 14
- `docs/design/direction-contract-home.md`, besonders Motion Contract
- die im Direction Contract dokumentierte Leitwagen-Mechanik als konzeptionelle Referenz
- statisch freigegebene Produktionsseite aus Ticket 10
- `C:\Users\timed\Desktop\website-bib` nur gezielt als Technikreferenz, nicht als zu kopierendes Design

## Lieferumfang

- Kongruenter Übergang des sichtbaren S-Wagens aus der Hero-Familie auf eine rechte vertikale Spur.
- Abwärtsfahrt mit den drei eigenständigen realen S-/M-/L-Modellassets. Zwischen den Stationen morphen die Modelle über eine kurze komplementäre Materialmaske ineinander; kein gestreckter S-Ersatz und kein harter Bildsprung.
- Freies natives Scrollen steuert die kontinuierliche und reversible Choreografie. Kurze Ruheabschnitte richten Wagen und Modelltext an S/M/L aus; keine Wheel-Sperre, keine Scroll-Sprünge und kein CSS-Snapping.
- Kurzer Parkmoment bei L; anschließend wird der Wagen mit der auslaufenden Sticky-Sektion nach oben aus dem Bild geführt, bevor der reguläre Modellvergleich übernimmt.
- Gleichwertige Mobile- und Reduced-Motion-Fassungen.

## Akzeptanzkriterien

- [x] Kein neuer Wagen erscheint aus dem Nichts. Der Leitwagen ist visuell derselbe S-Freisteller, der sich aus der Hero-Familie löst.
- [x] Bewegung führt auf Desktop zuerst deutlich nach rechts und anschließend auf einer festen rechten Achse nach unten. Der Wagen springt nicht wechselnd zwischen den Seiten.
- [x] An S, M und L gibt es kurze Ruheabschnitte in einem kompakten Takt. Fortlaufende Eingabe und sofortiger Richtungswechsel bleiben frei; die frühere Ein-Gestus-pro-Station-Vorgabe ist durch Userfreigabe aufgehoben.
- [x] An der S-Station ist der echte S-Freisteller sichtbar, an M der echte M-Freisteller und an L der echte L-Freisteller. Kein Modell wird aus dem S-Wagen durch ungleichmäßiges Strecken simuliert.
- [x] Zwischen den Stationen sind ausschließlich während des kurzen Morphfensters Ausgangs- und Zielasset sichtbar. Komplementäre Masken mit gemeinsamer weicher Schnittzone vermeiden Vollflächen-Doppelkonturen und sichtbare Bildmatten; Position und Größenverlauf bleiben kontinuierlich.
- [x] Die Choreografie beginnt deutlich früher als im ersten Prototyp. Jede Scrollstrecke besitzt eine sichtbare inhaltliche Veränderung. Der normale Dokumentfluss bleibt auf der gesamten Strecke einschließlich Hero-Einstieg und L-Ausstieg frei.
- [x] Bei L parkt der Wagen kurz. Danach läuft er mit der endenden Sticky-Sektion nach oben aus dem Viewport, ohne im sichtbaren Bereich per Opacity zu verschwinden; der Modellwechsler übernimmt nahtlos.
- [x] Animation nutzt einen gedrosselten `requestAnimationFrame`-Controller, ausschließlich compositor-freundliche Transformationen am Leitwagen und keine kontinuierlichen Scrollwerte im React-State.
- [x] Die Mechanik wurde gegen die lokalen Next-16-Dokumente geprüft und ohne neue Motion-Abhängigkeit umgesetzt.
- [x] `prefers-reduced-motion: reduce` entfernt Scrubbing, Pinning und lange Übergänge vollständig. Alle Informationen bleiben in statischer Reihenfolge erhalten.
- [x] Mobile erzwingt keine lange rechte Fahrspur und zeigt die kompakte statische S/M/L-Abfolge vollständig.
- [x] Fokus, Ankersprünge, Browser-Zurück und Touchscroll bleiben normal nutzbar.

## Prüfung

- [x] Browserreview prüft mehrere Scrollpositionen, Zurückscrollen, Resize, Reload in der Mitte und Ende der Choreografie.
- [x] Mobile- und statische Zwischenbreiten-Reviews beweisen vollständigen Inhalt ohne störende Übergänge; dieselbe statische Fassung wird durch `prefers-reduced-motion` aktiviert.
- [x] Der Controller misst nur bei Aktivierung/Resize, bündelt Scrollupdates über `requestAnimationFrame` und setzt `will-change` ausschließlich während Fahrt oder Modellwechsel.
- [x] Typecheck, Lint, voller Testlauf und statischer Build sind grün.
- [x] User bestätigt Timing und Bewegungsgefühl im Live-Browser.

## Nicht in diesem Ticket

- Kein Redesign der bereits statisch freigegebenen restlichen Seite.
- Keine zusätzlichen Parallax-, Cursor- oder Dekoanimationen ohne Informationsfunktion.
- Keine Erzeugung ungesicherter Fahrzeugdetails.

## Comments

- 2026-09-05: Motion folgt ausdrücklich erst nach Ticket 10. A4 ist Mechanikbeweis, nicht Produktionscode.
- 2026-09-06: Produktionsmotion ohne Zusatzbibliothek umgesetzt. Der sichtbare S-Wagen löst sich aus der Hero-Familie, erreicht früh die rechte Spur, hält bei S/M/L und parkt vor dem Vergleich. S/M/L werden über drei eigenständige Modellassets geführt; der Materialwechsel nutzt eine gerichtete, weich maskierte Überführung statt einer geisterhaften Vollflächen-Kreuzblende.
- 2026-09-06: Browserreview bei 1440 × 900, 1180 × 780, 1000 × 900 und 390 × 844; Vorwärts-/Rückwärtslauf, Resize und Reload mitten bei M geprüft. Mobile und `prefers-reduced-motion` verwenden die statische Familie. Impeccable Animate/Polish und der einmalige Detector-Lauf sind ohne offene Befunde abgeschlossen. Finale Freigabe bleibt beim User.
- 2026-09-06: Userreview hat die Freigabe ausdrücklich zurückgezogen: Hero-Familie ohne gemeinsame Bodenlinie, fehlerhaftes M-Türsymbol, inkonsistente Freisteller/Matten, sichtbarer Maskenschnitt, zu langer L-Auslauf und veraltetes Vergleichsbild. Ticket zur gezielten Korrektur wieder auf `in-progress` gesetzt.
- 2026-09-06: Korrekturfassung abgeschlossen. Hero und statischer Fallback nutzen eine gemeinsame Bodenlinie; M zeigt Frau links/Mann rechts; M/L wurden neu in gleicher Studio-Lichtwelt aufbereitet, entmattet und transparent beschnitten. Die gerichtete Überführung nutzt nur noch eine schmale weiche Materialkante. L wird höhenbegrenzt vollständig gezeigt, bleibt von 1740 bis 1925 px stationär und verschwindet ohne Fade exakt beim Eintritt des Vergleichs. Vorwärts-/Rückwärtslauf und Reload an L sind stabil. Der Modellwechsler lädt nach Auswahl nachweislich `wagen-m-model-1600.webp` beziehungsweise `wagen-l-model-1600.webp`. Lint, Typecheck, 45 Tests und statischer Build sind grün.
- 2026-09-06: Erneutes Userreview: Die weich maskierte Überführung ist trotz enger Kante nicht akzeptiert. Bei 1280 × 720 reproduzieren die Scrollpositionen zwischen S/M und M/L versetzte Dach-, Tür- und Radkonturen sowie den Eindruck sichtbarer Asset-Hintergründe. Ursache sind nicht deckungsgleiche Bildachsen und transparente Rasterflächen. Ticket wieder auf `in-progress`; der Wechsel wird ohne Alpha-Überblendung auf eine gemeinsame Fahrzeughöhe und Frontachse umgestellt.
- 2026-09-06: Die zunächst geprüfte deckende Wischkante beseitigte Alpha-Geister, erzeugte wegen der nicht deckungsgleichen Silhouetten aber neue sichtbare Leerstreifen und wurde verworfen. Die finale Korrektur verwendet in der Desktop-Leitspur deshalb genau einen durchgehend sichtbaren S-Freisteller. Seine X-/Y-Skalierung läuft mit einer stetigen Smootherstep-Kurve monoton durch S/M/L; reale M-/L-Assets bleiben unverändert im Hero, statischen Fallback und Vergleich. Der 1280 × 720 Browseraudit zeigt an beiden früher problematischen Mittelpunkten keine Bildkante, Matte oder Doppelkontur. Die kompakte 688 × 838 Ansicht wurde zugleich um den leeren Hero-Auslauf gekürzt.
- 2026-09-06: Userreview lehnt den gestreckten S-Ersatz und das frei auslaufende Scroll-Scrubbing ab. Verbindliche Korrektur: echte S-/M-/L-Assets auch auf der Leitspur, geometrisch gemessene Ausrichtung auf die drei Schienenebenen und browsernatives Scroll-Snapping an allen Modellstationen. Ticket erneut `in-progress`.
- 2026-09-06: Korrektur umgesetzt und im 1280 × 720 Browser geprüft. Die Leitspur lädt drei eigenständige Raster; sichtbar ist immer nur S, M oder L. Native `scroll-snap-align`-Ziele (Start/Mitte/Ende) landeten bei 1108/1336/1564 px. Die Markerzentren stimmen an allen drei Stopps bis auf Rundungsbruchteile mit den gemessenen Schienenebenen überein; ein versetzter Scrollstart wurde bei M und L zuverlässig auf den Zielwert korrigiert, ebenso der Rücklauf zu M. L bleibt bis 1810 px unverändert geparkt und die Leitspur ist beim Vergleichseintritt um 1940 px bereits ausgeblendet. Lint, Typecheck, 45 Tests und statischer Build sind grün. Finale Bewegungsfreigabe bleibt beim User.
- 2026-09-06: Userreview reproduziert einen fundamentalen Taktfehler: Ein normaler Scrollgestus sprang von S direkt zu L; die Wagen wirkten dadurch unkontrolliert fliegend. Der Browser-Repro bestätigte bei 1280 × 720 einen einzelnen 760-px-Impuls von S/1108 direkt auf 1828, während die alten Zielabstände nur 228 px betrugen. Selbst `scroll-snap-type: mandatory` landete direkt auf L und wurde als alleinige Lösung verworfen.
- 2026-09-06: Grundkorrektur umgesetzt. Die Zielabstände betragen nun genau 720 px (S 1108, M 1828, L 2548). Zusätzlich bindet ein kleiner, getesteter Gesten-Controller Folgeereignisse desselben Wheel-Gestus für 600 ms und gibt an S nach oben sowie L nach unten den normalen Seitenfluss frei. Der ursprüngliche 760-px-Repro und zwei unmittelbar aufeinanderfolgende 760-px-Ereignisse landen beide stabil auf M; ein erst nach dem Einrasten ausgelöster weiterer Gestus landet auf L. `PageUp` führt von L zurück zu M. Der neue Resolver ist mit fünf Regressionstests abgedeckt; Lint, Typecheck, alle 50 Tests und statischer Build sind grün. Finale Bewegungsfreigabe bleibt beim User.
- 2026-09-06: Userreview bestätigt das zuverlässigere Einrasten, fordert aber statt des harten Assetwechsels ein sichtbares Ineinandermorphen, kürzere Wege zwischen S/M/L und einen natürlichen L-Ausstieg wie beim Modellvergleich. Der L-Wagen soll nach kurzem Mitlaufen nicht ausgeblendet werden, sondern mit der Seite nach oben verschwinden.
- 2026-09-06: Korrektur im 1280 × 720 Browser geprüft. S/M/L liegen nun jeweils 420 px auseinander (S 1108, M 1528, L 1948). S→M und M→L nutzen die echten Assets in einem kurzen Morphfenster von 22–72 % des jeweiligen Wegs; eine rechts nach links laufende, 28 % weiche komplementäre Maske und maximal 0,8 px Blur vermeiden den harten Bildsprung ohne Vollflächen-Kreuzblende. L bleibt nach dem Einrasten weitere 260 px geparkt und wird ab 2209 px synchron mit dem Sticky-Ende nach oben geführt; bei 2668 px ist es noch sichtbar angeschnitten, erst eine Viewportlänge später wird die bereits außerhalb liegende Ebene deaktiviert. Lint, Typecheck über den Next-Build, alle 50 Tests, statischer Export und `git diff --check` sind grün. Finale Bewegungsfreigabe bleibt beim User.
- 2026-09-06: Erneuter Userreview meldet Scrollblockaden, lange Kategorieabstände und unnatürliche Bewegung. Desktop-Diagnose reproduziert Stillstand bei L/1948 px während fortlaufender Eingabe; der 600-ms-Lock wird mit jedem Ereignis verlängert. Parallel aktives CSS-Snapping und 192 px Grid-Gaps verschärfen das Bewegungsgefühl. Bericht: `docs/design/motion-diagnosis-2026-09-06.md`. Produktionscode unverändert; Ticket wieder offen.
- 2026-09-06: User beauftragt die vorgeschlagene kontinuierliche Scroll-Choreografie. Wheel-Lock, programmgesteuerte Scroll-Sprünge und CSS-Snapping entfernt; kompakte Lesepositionen mit Ruheabschnitten und echten Modellassets umgesetzt. Desktopintro aus der Wagenbahn genommen; serverseitig stabile Layoutgeometrie verhindert Scrollverschiebungen beim Reload. Tall-Viewport-Hero und L-Ausstieg korrigiert. Browsernachweis und beide geschlossenen Reviewachsen: `docs/design/motion-diagnosis-2026-09-06.md`. 49 Tests, Lint, TypeScript und statischer Build grün; bereit für User-Bewegungsreview.
- 2026-09-06: User bestätigt Timing und Bewegungsgefühl mit „motion ist ok“. Ticket 11 ist abgeschlossen; Ticket 12 ist der nächste zulässige Abschlussslice.

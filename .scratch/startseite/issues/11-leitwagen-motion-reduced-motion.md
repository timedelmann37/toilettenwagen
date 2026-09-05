# 11: Leitwagen-Motion und Reduced Motion

**What to build:** Nach der statischen Freigabe wird die bestätigte Leitwagen-Choreografie präzise und performant ergänzt. Motion erklärt die drei Modellgrößen und verbindet Hero, Stationen und Vergleich; sie ersetzt keinen Inhalt.

**Blocked by:** 10

**Status:** ready-for-agent

## Verbindliche Quellen

- `.scratch/startseite/spec.md`, besonders 6.3, 8, 10 bis 12 und 14
- `docs/design/direction-contract-home.md`, besonders Motion Contract
- A4 unter `/prototype/family-unfold/?variant=a4` nur als Mechanikbeweis
- statisch freigegebene Produktionsseite aus Ticket 10
- `C:\Users\timed\Desktop\website-bib` nur gezielt als Technikreferenz, nicht als zu kopierendes Design

## Lieferumfang

- Kongruenter Übergang desselben sichtbaren S-Wagens aus der Hero-Familie auf eine rechte vertikale Spur.
- Abwärtsfahrt mit Stillstand an S, M und L, Größenentwicklung ausschließlich zwischen Stationen und zweiter Achse bei L.
- Parkmoment vor dem regulären Modellvergleich.
- Gleichwertige Mobile- und Reduced-Motion-Fassungen.

## Akzeptanzkriterien

- [ ] Kein neuer Wagen erscheint aus dem Nichts. Der Leitwagen ist visuell derselbe, der sich aus der Hero-Familie löst.
- [ ] Bewegung führt auf Desktop nach rechts und anschließend nur nach unten. Der Wagen springt nicht wechselnd zwischen den Seiten.
- [ ] An S, M und L gibt es spürbare, aber nicht zähe Haltepunkte. Daten werden während des jeweiligen Stillstands lesbar.
- [ ] Wagenlänge verändert sich nur zwischen Stationen; bei L entsteht die zweite Achse. Proportionen wirken glaubwürdig, ohne endgültige M-/L-Produktwahrheit vorzutäuschen.
- [ ] Die Choreografie beginnt deutlich früher als im ersten Prototyp. Jede Scrollstrecke besitzt eine sichtbare inhaltliche Veränderung; es gibt keinen Leerlauf und kein Scroll-Hijacking.
- [ ] Bei L parkt der Wagen; normaler Dokumentfluss und Modellwechsler übernehmen nahtlos.
- [ ] Animation nutzt compositor-freundliche Eigenschaften und keine kontinuierlichen Scrollwerte im React-State.
- [ ] Motion-Bibliothek und Mechanik werden erst nach Prüfung der aktuellen Next-/React-Kompatibilität gewählt; unnötige Abhängigkeiten werden vermieden.
- [ ] `prefers-reduced-motion: reduce` entfernt Scrubbing, Pinning und lange Übergänge vollständig. Alle Informationen bleiben in statischer Reihenfolge erhalten.
- [ ] Mobile erzwingt keine lange rechte Fahrspur. Eine kürzere kontrollierte Progression oder die freigegebene statische Abfolge ist zulässig und vollständig verständlich.
- [ ] Fokus, Ankersprünge, Browser-Zurück und Touchscroll bleiben normal nutzbar.

## Prüfung

- [ ] Browserreview prüft mehrere Scrollgeschwindigkeiten, Zurückscrollen, Resize, Reload in der Mitte und Ende der Choreografie.
- [ ] Reduced-Motion- und Mobile-Review beweisen vollständigen Inhalt ohne störende Übergänge.
- [ ] Performanceprofil zeigt keine dauerhaften Layoutthrashes oder auffälligen Main-Thread-Spitzen.
- [ ] Typecheck, Lint, voller Testlauf und statischer Build sind grün.
- [ ] User bestätigt Timing und Bewegungsgefühl im Live-Browser.

## Nicht in diesem Ticket

- Kein Redesign der bereits statisch freigegebenen restlichen Seite.
- Keine zusätzlichen Parallax-, Cursor- oder Dekoanimationen ohne Informationsfunktion.
- Keine Erzeugung ungesicherter Fahrzeugdetails.

## Comments

- 2026-09-05: Motion folgt ausdrücklich erst nach Ticket 10. A4 ist Mechanikbeweis, nicht Produktionscode.

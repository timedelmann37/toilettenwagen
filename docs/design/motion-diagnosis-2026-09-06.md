# Scroll-Diagnose der Leitwagenstrecke

Userauftrag: bestehende Scroll-Animation auf Blockaden, lange Kategorieabstände und unnatürliches Bewegungsgefühl prüfen. Keine neue visuelle Richtung und keine Implementierungsfreigabe durch diesen Bericht behaupten.

## Aktuelle Browserbelege

Geprüft am 2026-09-06 auf `http://localhost:3000/`, Desktop 1280 × 720, aktuelle unveränderte Implementierung.

- PageDown vom Hero erreicht 567 px, der nächste Schritt etwa 1104 px bei S. Hero-Übergang, S und L wurden als Screenshots im Browser angesehen.
- Fortlaufende kleine Abwärtsimpulse (50 Aufrufe von `tab.scroll([600,500], 'down', 0.04)` im CUA-Browser) ergeben ab M die Stichprobe `1528, 1795, 1928, 1948, 1948, 1948, 1948, 1948, 1948, 1948, 1948`. Die Seite bleibt trotz weiterer Eingaben bei L stehen.
- Nach einer Eingabepause bleibt auch ein einzelner kleiner Impuls auf 1948 px; ein größerer Impuls mit `pages: 0.2` verlässt die Station bis 2487 px. Das Verhalten am Ausgang wird deshalb nicht allein durch den Timer erklärt; natives Proximity-Snapping bleibt ebenfalls aktiv.
- Gemessene Modellzeilen: je 368 px Höhe; Dokumentanfänge S 1180.39, M 1740.39, L 2300.39 px. Dazwischen je 192 px Grid-Gap, anschließend 259.2 px Padding. Gesamte Modellreise inklusive Intro: rund 2310 px.
- Die Snap-Ziele liegen dennoch nur 420 px auseinander: Start-, Center- und End-Ausrichtung verkürzen den Zielabstand gegenüber dem tatsächlichen Zeilenabstand von 560 px. Kompakte Snap-Zahlen belegen daher kein kompaktes Inhaltslayout.

## Ursachen und Bewertung

1. `LeadVehicleMotion.tsx:378`: Der 600-ms-Unlock-Timer wird bei jedem abgefangenen Wheel-Ereignis neu gestartet, auch bei `hold`. Fortlaufendes Weiterscrollen verlängert die Sperre unbegrenzt. `leadScrollStep.ts:25` prüft die Sperre vor den äußeren Grenzen und vor der Richtung. Auch der L-Ausstieg oder ein sofortiger Richtungswechsel können dadurch blockiert werden.
2. JavaScript verwirft die native Eingabe per `preventDefault()` und ersetzt sie durch `scrollTo(..., smooth)`. Gleichzeitig gelten dokumentweites CSS-Proximity-Snapping und `scroll-snap-stop: always`. Es bestehen zwei Mechanismen zur Zielwahl; kleine Eingaben am Ausgang können wieder bei L einrasten. Der jeweilige Anteil lässt sich erst durch isoliertes Abschalten der Mechanismen abschließend messen.
3. Große Mindesthöhen plus zusätzliche Grid-Gaps erzeugen leere Strecke für sehr kurze Modelltexte. Die L-Parkstrecke verlängert den Auslauf zusätzlich.
4. Bestehende Resolver-Tests bestätigen ausdrücklich das Blockieren von Folgeereignissen. Sie prüfen nicht die reale Kombination aus Wheel-Handler, immer neu gestartetem Timer und CSS-Snapping. Grüne Tests sichern das gewünschte freie Scrollgefühl daher nicht ab.

## Empfohlene Korrekturrichtung

Eine kontinuierliche, reversible Choreografie auf Basis der normalen Scrollposition: S löst sich aus dem Hero, kurze Ruheabschnitte an S/M/L, kurze Modellübergänge, L verlässt mit dem Dokument die Bühne. Inhalt und Bewegung erhalten einen gemeinsamen kompakten Takt. Kein Wheel-Lock und keine konkurrierende globale Snap-Steuerung.

Das würde die bisherige Vorgabe „eine Geste führt genau eine Station weiter“ ersetzen. Diese Konsequenz ist ausdrücklich zu benennen, statt stillschweigend eine andere Mechanik als bereits freigegeben zu behandeln. Falls diskrete Stationen beibehalten werden sollen, sind mindestens begrenzte Sperrdauer, sofortiger Richtungswechsel und sichere Randfreigabe erforderlich.

Keine Produktionsdateien geändert. Mobile und Reduced Motion wurden in dieser gezielten Desktop-Diagnose nicht erneut geprüft. Ticket 11 bleibt ohne Bewegungsfreigabe.

## Umsetzung nach Userauftrag „dann implementiere das bitte“

- Freies Scrollen umgesetzt: Wheel-Handler, Lock-Timer, Scroll-Sprünge, CSS-Snapping und der obsolete Resolver einschließlich seiner fünf Tests entfernt.
- Vier Tests am echten React-Controller sichern fortlaufende Wheel-Eingaben, sofortige Richtungswechsel/L-Ausstieg, statischen Fallback, Reduced-Motion-Wechsel und die Hero-Startposition auf hohen Displays ab. Der Input-Test und der zusätzliche Tall-Hero-Test wurden vor dem jeweiligen Fix rot ausgeführt.
- Ruhephasen im Wagenverlauf statt in der Eingabe: je 16 % am Anfang/Ende eines Übergangs; Morph mit echten Assets bei 30–70 %. Modelltexte und Schienenebenen bestimmen gemeinsam die Lesepositionen.
- Zusätzliche Grid-Gaps entfernt. Desktopintro steht links außerhalb der Wagenbahn; obere und anschließende Abstände wurden dafür gekürzt. Desktopgeometrie existiert bereits vor Hydration/Bilddecoding, damit native Scrollrestauration stabil bleibt; bei JavaScript-/Bildfehlern bleibt die statische Familie sichtbar.
- Die Sticky-Bühne ist auf 56rem begrenzt. Das verhindert einen verfrühten L-Ausstieg auf sehr hohen Displays. Der Hero-Start ist auf frühestens Scrollposition 0 begrenzt.

### Verifizierte Ergebnisse

- 1280 × 720: Lesepositionen S 1136.32, M 1443.35, L 1749.85 px; Abstände rund 307 px. Sticky-Ende 1905.66 px, damit rund 156 px Parkstrecke ab L. Gesamte Modellreise rund 2007 px statt zuvor 2310 px.
- 50 fortlaufende kleine Wheel-Impulse passieren L ohne Stillstand: Stichprobe 1433, 1577, 1692, 1836, 1980, 2124, 2268, 2412, 2556, 2700, 2815 px. L bewegt sich nach dem Sticky-Ende genau um den weitergescrollten Betrag nach oben. Sofortiger Rücklauf: 1462, 1447, 1433, 1418 px.
- Reload mitten in der Fahrt bleibt bei 1260 → 1260 px, ohne programmgesteuertes Scrollen.
- 1920 × 2160: Bühnenhöhe 896 px; L hat rund 178 px Parkstrecke. Nach aktivierter Motion liegt S am Dokumentanfang kongruent über dem Hero-Ursprung (x 248.5, y 519.625; Rundungsabweichung unter 0.001 px).
- 390 × 844: statischer Hero und kompakte S/M/L-Tabelle visuell geprüft, Zeilen je 136 px, kein horizontaler Überlauf, Overlay deaktiviert. Reduced-Motion-Umschaltung am echten Controller getestet; keine separate Browser-Media-Emulation behauptet.
- Browserbilder von Hero-Übergang, M, L-Ausstieg, hohem Desktop und Mobilansicht wurden direkt geöffnet und angesehen. Standards- und Spec-Review gegen `ddf342182c35a8db0895e108b9efbc871623c0ce` abgeschlossen; gemeinsamer Tall-L-Befund behoben, keine offenen Befunde. Impeccable-Detector für die geänderte Motion-Komponente: `[]`.
- Lint, TypeScript, 49 Tests und statischer Produktionsbuild grün. Die Zahl sinkt gegenüber 50 durch Entfernung der fünf veralteten Lock-Tests und Ergänzung von vier Controller-Tests.

Die Korrektur ist implementiert und bereit für den Bewegungsreview des Users. Ticket 12 und Veröffentlichung wurden nicht vorgezogen.

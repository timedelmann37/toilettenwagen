# 03: Statische Modellreise S, M und L

**What to build:** Eine zusammenhängende statische Modellgeschichte führt vom Familien-Hero durch S, M und L. Alle Informationen funktionieren in normaler Dokumentreihenfolge, bevor später irgendeine Scrollanimation hinzukommt.

**Blocked by:** 02

**Status:** done

## Verbindliche Quellen

- `.scratch/startseite/spec.md`, besonders 5, 6.3, 7, 8, 10 bis 12
- `docs/design/direction-contract-home.md`
- `docs/design/asset-plan-home.md`

## Lieferumfang

- Drei klar verbundene Modellstationen in der Reihenfolge S, M, L.
- Jede Station zeigt zuerst Modell, Kapazität, Ab-Preis und kurzen Eignungshinweis.
- Maße, WC-Aufteilung und Ausstattung liegen in einer klar bezeichneten zweiten Informationsebene, die ohne Hover erreichbar ist.
- Derselbe S-Freisteller bleibt vorläufig als austauschbarer visueller Platzhalter in allen Stationen.

## Akzeptanzkriterien

- [x] Alle sichtbaren Daten stammen aus der zentralen typisierten Modelldatenquelle: S 5,67 × 2,50 × 3,00 m / bis 200 / 2 Damen / 1 Herren / 2 Urinale / 175 € netto; M 7,17 × 2,50 × 2,92 m / bis 400 / 3 Damen / 1 Herren / 3 Urinale / 190 € netto; L 8,77 × 2,50 × 2,92 m / bis 600 / 4 Damen / 2 Herren / 6 Urinale / 210 € netto.
- [x] Die Stationen bilden einen erkennbaren Erzählfluss und keine drei gleichförmigen Featurekarten.
- [x] Die visuelle Verbindung zum Hero bleibt kongruent. Kein Wagen springt im statischen Layout willkürlich von links nach rechts.
- [x] Detailinformationen sind per sichtbarer Aktion oder als zweite redaktionelle Ebene erreichbar, per Tastatur bedienbar und nicht nur auf Hover verfügbar.
- [x] Gemeinsame Ausstattung wird nicht dreimal wortgleich wiederholt. Modellspezifische S-Merkmale werden weder M noch L zugeschrieben.
- [x] Ein kurzer, ehrlicher Hinweis erklärt, dass M und L vorläufig mit demselben Bild dargestellt werden; die Daten bleiben echt.
- [x] DOM-Reihenfolge und Überschriftenhierarchie sind auf Desktop und Mobile identisch sinnvoll.
- [x] Mobile zeigt S/M/L statisch untereinander. Keine lange gepinnte Desktopspur wird simuliert.
- [x] Nach L führt eine klare visuelle Kante zum späteren Vergleich, ohne bereits die Servicegeschichte vorwegzunehmen.

## Prüfung

- [x] Renderingtest bestätigt die vollständigen Kernwerte aller drei Modelle ohne Interaktion.
- [x] Der Verhaltenstest prüft Mausöffnung und den fokussierbaren nativen Summary-Auslöser; die Browserprüfung bestätigt dessen Button-Semantik und Zustände.
- [x] Desktop-, Tablet- und Mobile-Browserreview bestätigt Lesbarkeit, Rhythmus und deutlich unterschiedliche Hierarchiestufen.
- [x] Typecheck, Lint, fokussierte Tests und statischer Build sind grün.

## Nicht in diesem Ticket

- Keine Preisumschaltung oder Empfehlungshilfe.
- Keine finale M-/L-Bildproduktion.
- Keine scrollgebundene Bewegung.

## Comments

- 2026-09-05: Neu zugeschnitten nach Freigabe der vollständigen Modellfamilien-Spec.
- 2026-09-05: Statische Modellreise abgeschlossen. Browserreview bei 1440 × 900, 900 × 1024 und 390 × 844; Details geschlossen und geöffnet geprüft. 7 Tests, Typecheck, Lint, statischer Build, `git diff --check` und Impeccable-Detector sind grün.

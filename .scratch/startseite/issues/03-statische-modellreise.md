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
- Jede Station zeigt knapp Modell, Kapazität und einen kurzen Eignungshinweis.
- Preis, Maße, WC-Aufteilung und Ausstattung bleiben dem direkt folgenden vollständigen Modellwechsler vorbehalten.
- Ein gemeinsamer S-Freisteller begleitet die drei Stationen als austauschbare Fahrzeugansicht.

## Akzeptanzkriterien

- [x] Alle sichtbaren Daten stammen aus der zentralen typisierten Modelldatenquelle: S 5,67 × 2,50 × 3,00 m / bis 200 / 2 Damen / 1 Herren / 2 Urinale / 175 € netto; M 7,17 × 2,50 × 2,92 m / bis 400 / 3 Damen / 1 Herren / 3 Urinale / 190 € netto; L 8,77 × 2,50 × 2,92 m / bis 600 / 4 Damen / 2 Herren / 6 Urinale / 210 € netto.
- [x] Die Stationen bilden einen erkennbaren Erzählfluss und keine drei gleichförmigen Featurekarten.
- [x] Die visuelle Verbindung zum Hero bleibt kongruent. Kein Wagen springt im statischen Layout willkürlich von links nach rechts.
- [x] Detailinformationen bleiben im unmittelbar folgenden Modellwechsler ohne Hover vollständig erreichbar.
- [x] Gemeinsame Ausstattung wird nicht dreimal wortgleich wiederholt. Modellspezifische S-Merkmale werden weder M noch L zugeschrieben.
- [x] Die gemeinsame Fahrzeugansicht wird keinem falschen M-/L-Maßstab zugeschrieben; die Modelldaten bleiben echt.
- [x] DOM-Reihenfolge und Überschriftenhierarchie sind auf Desktop und Mobile identisch sinnvoll.
- [x] Mobile zeigt S/M/L statisch untereinander. Keine lange gepinnte Desktopspur wird simuliert.
- [x] Nach L führt eine klare visuelle Kante zum späteren Vergleich, ohne bereits die Servicegeschichte vorwegzunehmen.

## Prüfung

- [x] Renderingtest bestätigt Modell, Kapazität und Eignungshinweis aller drei Stationen ohne Interaktion.
- [x] Renderingtest bestätigt, dass Preis und Maße nicht redundant in der Modellreise erscheinen.
- [x] Desktop-, Tablet- und Mobile-Browserreview bestätigt Lesbarkeit, Rhythmus und deutlich unterschiedliche Hierarchiestufen.
- [x] Typecheck, Lint, fokussierte Tests und statischer Build sind grün.

## Nicht in diesem Ticket

- Keine Preisumschaltung oder Empfehlungshilfe.
- Keine finale M-/L-Bildproduktion.
- Keine scrollgebundene Bewegung.

## Comments

- 2026-09-05: Neu zugeschnitten nach Freigabe der vollständigen Modellfamilien-Spec.
- 2026-09-05: Statische Modellreise abgeschlossen. Browserreview bei 1440 × 900, 900 × 1024 und 390 × 844; Details geschlossen und geöffnet geprüft. 7 Tests, Typecheck, Lint, statischer Build, `git diff --check` und Impeccable-Detector sind grün.
- 2026-09-05: Im Rahmen von Ticket 10 nach Nutzerfeedback verdichtet: drei lange, datenidentische Einzelstationen wurden zu einer kompakten Größenstaffel mit einer gemeinsamen Wagenbühne zusammengeführt. Vollständige Preise, Maße und Ausstattung bleiben im Modellwechsler.

# 10: Statische Gesamtfreigabe

**What to build:** Die vollständige statische Startseite wird als ein zusammenhängendes Produkt auf Desktop, Tablet und Mobile geprüft und bis zur visuellen, barrierearmen und performanten Freigabe korrigiert. Dieses Ticket ist das harte Gate vor jeder finalen Motion.

**Blocked by:** 04, 05, 06, 07, 08, 09

**Status:** ready-for-agent

## Verbindliche Quellen

- vollständige `.scratch/startseite/spec.md`
- `docs/design/direction-contract-home.md`
- `docs/design/asset-plan-home.md`
- alle umgesetzten Tickets 02 bis 09

## Lieferumfang

- Vollständiger Browserreview der Produktionsroute und Rechtsseiten.
- Behebung materieller Probleme in Komposition, Copy, Responsive Verhalten, Accessibility, Performance und Export.
- Dokumentierte statische Freigabe oder konkrete Restmängel. Ohne Freigabe bleibt Ticket 11 blockiert.

## Akzeptanzkriterien

- [ ] Die Seite besitzt alle drei Akte der Spec und wirkt nicht wie Hero plus wiederholte Kartenabschnitte.
- [ ] Mindestens vier klar verschiedene Layoutfamilien sind erkennbar: freie Produktbühne, Modell-/Datenkomposition, redaktioneller Bildbeweis, Prozess-/Regionsraum sowie Anfragefläche.
- [ ] Echte Bilder haben eindeutige Rollen; Reservebilder und verworfene Konzeptboards werden nicht veröffentlicht.
- [ ] Desktop 1440 × 900, breites Desktopformat, Tablet und Mobile 390 × 844 wurden vollständig gescrollt und visuell geprüft.
- [ ] Kein horizontaler Overflow, keine abgeschnittenen Logos/Wagen, keine unlesbaren Überlagerungen und keine verdeckten Anker oder Fehlermeldungen.
- [ ] Die vollständige Kerninformation ist ohne Client-JavaScript und ohne Motion lesbar.
- [ ] WCAG-2.2-AA-relevante Kontraste, logische Überschriften, Landmarken, Alternativtexte, 44-px-Ziele, Fokus, Tastatur und Formzustände sind geprüft.
- [ ] Mobile ist eine eigenständige Komposition und kein verkleinerter Desktop. Modellwahl funktioniert ohne präzise Swipe-Geste.
- [ ] Bildquellen, LCP-Priorisierung und feste Dimensionen halten die Assetbudgets ein. Zielprüfung: LCP unter 2,5 s und CLS unter 0,1 auf realistischem Mobilprofil.
- [ ] Maps lädt vor Consent nicht; Formularfallback bleibt nutzbar; Rechts- und Kontaktlinks funktionieren aus dem statischen Export.
- [ ] Alle sichtbaren Produkt-, Preis- und Serviceaussagen wurden gegen die bestätigten Quellen abgeglichen.
- [ ] Die statische Seite wurde dem User im Browser gezeigt und als Grundlage für Motion bestätigt.

## Prüfung

- [ ] Voller Testlauf, Typecheck, Lint und Produktionsbuild sind grün.
- [ ] Browser-Screenshots für Desktop, Tablet und Mobile sind als letzte visuelle Evidenz dokumentiert.
- [ ] Performanceprofil und Netzwerkprüfung für Hero, Consent und Formular liegen vor.
- [ ] Ein Spec-Review und ein Standards-Review liefern keine offenen P1/P2-Mängel für den statischen Stand.

## Nicht in diesem Ticket

- Keine finale Scrollchoreografie.
- Keine heimliche Scope-Erweiterung um CMS, Buchung, Zahlung oder Tracking.

## Comments

- 2026-09-05: Dieses Ticket trennt die statische Qualitätsfreigabe ausdrücklich von Motion.
- 2026-09-05: Erster Verdichtungsschritt im Serviceakt: vier weit auseinandergezogene Innenraumkapitel zu einer gemeinsamen Ausstattungskomposition zusammengeführt. Das Palmen-/Strand-Türmotiv steht ohne unbestätigte Modellzuordnung gleichberechtigt in der Galerie. Desktop-Gesamtansicht, Typecheck, Lint, 45 Tests, statischer Build und Impeccable-Detector sind grün; die vollständigen Tablet-/Mobile- und Performance-Prüfungen bleiben Teil dieses Tickets.
- 2026-09-05: Ablaufakt anschließend aus sechs ungleich gewichteten Textblöcken zu einer kompakten, durchgehenden Zeitachse verdichtet. Das blaue 04/05-Ereignisfenster bleibt erhalten, Schritt 06 läuft jetzt auf derselben Achse weiter; die Vorlaufangaben werden als zwei proportionale Zeitbalken gezeigt. Desktop-Gesamtansicht geprüft, die abschließenden Tablet-/Mobile-Prüfungen bleiben offen.

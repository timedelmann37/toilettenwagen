# 10: Statische Gesamtfreigabe

**What to build:** Die vollständige statische Startseite wird als ein zusammenhängendes Produkt auf Desktop, Tablet und Mobile geprüft und bis zur visuellen, barrierearmen und performanten Freigabe korrigiert. Dieses Ticket ist das harte Gate vor jeder finalen Motion.

**Blocked by:** 04, 05, 06, 07, 08, 09

**Status:** done

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

- [x] Die Seite besitzt alle drei Akte der Spec und wirkt nicht wie Hero plus wiederholte Kartenabschnitte.
- [x] Mindestens vier klar verschiedene Layoutfamilien sind erkennbar: freie Produktbühne, Modell-/Datenkomposition, redaktioneller Bildbeweis, Prozess-/Regionsraum sowie Anfragefläche.
- [x] Echte Bilder haben eindeutige Rollen; Reservebilder und verworfene Konzeptboards werden nicht veröffentlicht.
- [x] Desktop 1440 × 900, breites Desktopformat, Tablet und Mobile 390 × 844 wurden vollständig gescrollt und visuell geprüft.
- [x] Kein horizontaler Overflow, keine abgeschnittenen Logos/Wagen, keine unlesbaren Überlagerungen und keine verdeckten Anker oder Fehlermeldungen.
- [x] Die vollständige Kerninformation ist ohne Client-JavaScript und ohne Motion lesbar.
- [x] WCAG-2.2-AA-relevante Kontraste, logische Überschriften, Landmarken, Alternativtexte, 44-px-Ziele, Fokus, Tastatur und Formzustände sind geprüft.
- [x] Mobile ist eine eigenständige Komposition und kein verkleinerter Desktop. Modellwahl funktioniert ohne präzise Swipe-Geste.
- [x] Bildquellen, LCP-Priorisierung und feste Dimensionen halten die Assetbudgets ein. Zielprüfung: LCP unter 2,5 s und CLS unter 0,1 auf realistischem Mobilprofil.
- [x] Maps lädt vor Consent nicht; Formularfallback bleibt nutzbar; Rechts- und Kontaktlinks funktionieren aus dem statischen Export.
- [x] Alle sichtbaren Produkt-, Preis- und Serviceaussagen wurden gegen die bestätigten Quellen abgeglichen.
- [x] Die statische Seite wurde dem User im Browser gezeigt und als Grundlage für Motion bestätigt.

## Prüfung

- [x] Voller Testlauf, Typecheck, Lint und Produktionsbuild sind grün.
- [x] Browser-Screenshots für Desktop, Tablet und Mobile sind als letzte visuelle Evidenz dokumentiert.
- [x] Performanceprofil und Netzwerkprüfung für Hero, Consent und Formular liegen vor.
- [x] Ein Spec-Review und ein Standards-Review liefern keine offenen P1/P2-Mängel für den statischen Stand.

## Nicht in diesem Ticket

- Keine finale Scrollchoreografie.
- Keine heimliche Scope-Erweiterung um CMS, Buchung, Zahlung oder Tracking.

## Comments

- 2026-09-05: Dieses Ticket trennt die statische Qualitätsfreigabe ausdrücklich von Motion.
- 2026-09-05: Erster Verdichtungsschritt im Serviceakt: vier weit auseinandergezogene Innenraumkapitel zu einer gemeinsamen Ausstattungskomposition zusammengeführt. Das Palmen-/Strand-Türmotiv steht ohne unbestätigte Modellzuordnung gleichberechtigt in der Galerie. Desktop-Gesamtansicht, Typecheck, Lint, 45 Tests, statischer Build und Impeccable-Detector sind grün; die vollständigen Tablet-/Mobile- und Performance-Prüfungen bleiben Teil dieses Tickets.
- 2026-09-05: Ablaufakt anschließend aus sechs ungleich gewichteten Textblöcken zu einer kompakten, durchgehenden Zeitachse verdichtet. Das blaue 04/05-Ereignisfenster bleibt erhalten, Schritt 06 läuft jetzt auf derselben Achse weiter; die Vorlaufangaben werden als zwei proportionale Zeitbalken gezeigt. Desktop-Gesamtansicht geprüft, die abschließenden Tablet-/Mobile-Prüfungen bleiben offen.
- 2026-09-05: Modellreise von drei langen, faktisch redundanten Einzelstationen auf eine kompakte Größenstaffel verdichtet. S/M/L behalten Kapazität und Eignung als schnelle Orientierung; eine gemeinsame Wagenbühne ersetzt drei identische Bilder. Preise, Maße, WC-Aufteilung und Ausstattung stehen vollständig im direkt folgenden Modellwechsler. Desktop bei 1708 × 1260, Mobile bei 390 × 844 und der vollständige Desktopfluss wurden visuell geprüft; 44 Tests, Typecheck, Lint, statischer Build, `git diff --check` und Impeccable-Detector sind grün.
- 2026-09-05: Abschließender statischer Exportreview vollständig durchgeführt: Desktop 1440 × 900, breiter Desktop 1708 × 1260, Tablet 900 × 1024 und Mobile 390 × 844 ohne echten horizontalen Overflow vollständig gescrollt. Mobile No-JS-Ansicht liefert S/M/L mit Maßen, Aufteilung, Netto-/Bruttopreis und Ausstattung; Impressum und Datenschutz sind bei 390 px geprüft. Desktop-Navigation, Datenschutzzeile und Maps-Link besitzen mindestens 44 px Bedienhöhe/-fläche, Skip-Link und Fokuswege sind vorhanden, WhatsApp-Grün erreicht AA-Kontrast. Mobile Bildquelle `wagen-s-hero-960.webp` wiegt 54.622 Byte; Bricolage lädt ohne ungenutzte Zusatzachsen. Gemessenes Mobilprofil (Fast 3G, 4× CPU, Brotli): LCP 2.100 ms, CLS 0, 342.243 Byte Transfer. Vor Maps-Consent: kein iframe, kein externer Request und kein initialer Browser-Speicher. Browser-Evidenz: `static-desktop-1440.png`, `static-tablet-900.png`, `static-mobile-390.png`, `static-mobile-no-js.png`, `static-mobile-impressum.png`, `static-mobile-datenschutz.png`; Messwerte in `static-qa-report.json` und `legal-qa-report.json`. Spec-/Standards-Abgleich und Impeccable-Detector liefern keine offenen P1/P2-Mängel. Technisch bereit für die statische User-Freigabe; der letzte Akzeptanzpunkt bleibt bis zu dieser Bestätigung bewusst offen.
- 2026-09-05: Auf User-Feedback wurde die gelobte Linien- und Stationssprache gezielt weitergeführt: Die Modellreise besitzt nun ein S/M/L-Stationsraster an der Wagenbühne; die Aufstellungsplanung verbindet mitgebrachte Anschlüsse, den Wagen und die Voraussetzungen vor Ort zu einer gemeinsamen Übergabeszene. Die blau beleuchtete Nachtaufnahme bleibt bewusst der einmalige fotografische Höhepunkt. Desktop und Mobile 390 × 844 wurden für beide Änderungen erneut visuell geprüft; die statische User-Freigabe bleibt der letzte offene Akzeptanzpunkt.
- 2026-09-06: Den redundanten Wagen und den dadurch funktionslosen Mittelpunkt aus der Aufstellungsplanung auf User-Feedback wieder entfernt. Die Grafik verbindet jetzt ausschließlich die beiden tatsächlich erklärten Seiten „Was wir mitbringen“ und „Was vor Ort bereitsteht“; die Zahl wiederholter Wagenassets auf der Seite wurde reduziert.
- 2026-09-06: Nach einem separaten Vergleich mehrerer Alternativrichtungen hat der User die bestehende Originalrichtung ausdrücklich bestätigt. Die statische Seite ist damit als Grundlage für Ticket 11 freigegeben; die temporären Vergleichs- und Mechaniklabore wurden entfernt.

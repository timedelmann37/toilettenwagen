# 07: Region, Maps-Consent und Bewertungen

**What to build:** Ein regionaler Vertrauensraum verbindet das Einsatzgebiet ab Niederdreisbach mit einer consent-geschützten Google-Karte und fünf echten Kundenstimmen.

**Blocked by:** 05

**Status:** done

## Verbindliche Quellen

- `.scratch/startseite/spec.md`, besonders 6.10, 11 bis 14
- ADR-0003
- `fragebogen-infos.txt` für die tatsächlichen Bewertungen
- `docs/TODO-DATENSCHUTZ.md`

## Lieferumfang

- Einsatzgebiet mit Radius und Ortsbeispielen, unabhängig von einer Karte vollständig lesbar.
- Consent-Komponente, die Google Maps technisch erst nach aktiver Zustimmung lädt.
- Fünf reale Google-Bewertungen in freigegebener Namensform, ohne automatische Rotation.

## Akzeptanzkriterien

- [x] Niederdreisbach, ungefähr 125 km und weitere Strecken auf Anfrage sind ohne Interaktion sichtbar.
- [x] Daaden, Herdorf, Neunkirchen, Niederfischbach, Dillenburg, Haiger und Westerwald dürfen als Beispiele erscheinen, werden aber nicht als starre Liefergrenze dargestellt.
- [x] Vor Einwilligung existiert weder Google-iframe noch Google-Netzwerkanfrage. Die neutrale Ersatzfläche erklärt Nutzen und Datenübertragung und bietet gleichwertig Zustimmen und Ablehnen.
- [x] Zustände sind umgesetzt: unentschieden, zugestimmt, abgelehnt, lädt und fehlgeschlagen. Die Entscheidung kann später geändert werden.
- [x] Ohne Karte bleiben Radius, Standort, Kontaktweg und weitere-Strecken-Hinweis vollständig nutzbar.
- [x] Genau die fünf bestätigten Stimmen werden sinngemäß und ohne erfundene Zusätze verwendet. Quelle Google und nur die freigegebene Namensform sind sichtbar.
- [x] Bewertungen sind statisch lesbar, werden nicht automatisch gedreht und erscheinen nicht als fünf gleiche schwebende Karten.
- [x] Consent-Entscheidung ist per Tastatur möglich; Ablehnen ist nicht visuell oder semantisch benachteiligt.

## Prüfung

- [x] Verhaltenstests beweisen: vor Zustimmung kein iframe, Zustimmung lädt, Ablehnung lädt nicht, Änderung funktioniert und Ladefehler zeigt Fallback.
- [x] Browserprüfung dokumentiert vor Zustimmung kein Google-iframe und nach Zustimmung ausschließlich den erwarteten Google-Maps-iframe samt geladener Karte.
- [x] Renderingtest bestätigt Radius, Standort, Ortsbeispiele, fünf Stimmen und Kontaktfallback ohne Karte.
- [x] Desktop- und Mobile-Browserreview prüft Consent, Lesbarkeit und Layoutvariation.
- [x] Typecheck, Lint, Tests und statischer Build sind grün.

## Nicht in diesem Ticket

- Kein Tracking oder Marketing-Consent.
- Keine erfundene Kartenillustration vor Zustimmung.
- Kein Kontaktformular.

## Comments

- 2026-09-05: Verbindet Region und echte Stimmen zu einem gemeinsamen Vertrauensslice.
- 2026-09-05: Umgesetzt als redaktioneller Regionsraum mit sichtbarem 125-km-Hinweis, sieben Ortsbeispielen, WhatsApp-Fallback und einer kleinen clientseitigen Consent-Insel. Google Maps wird erst nach Zustimmung als iframe eingesetzt; Ablehnung, Änderung, Laden, Fehler und Wiederholung sind abgedeckt.
- 2026-09-05: Die fünf bestätigten Google-Stimmen stehen statisch in einer gewichteten Komposition mit datensparsamen Namen. Desktop und 390 x 844 wurden live geprüft; die mobile Region läuft ohne horizontale Überbreite. Impeccable-Detector, Typecheck, Lint, 31 Tests und statischer Build sind grün.

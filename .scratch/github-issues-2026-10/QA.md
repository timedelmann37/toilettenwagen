# Abschlussprüfung – GitHub #6–#15

Stand: 2026-10-09. Alle Änderungen lokal; GitHub-Issues bleiben offen zur Abnahme. Keine Veröffentlichung und keine echten E-Mails versendet.

## Umsetzung

- #6: Ein direkt editierbares Feld pro Adresse; Geoapify optional im selben Feld. Text bleibt bei fehlenden Treffern, Timeout und deaktivierten Vorschlägen erhalten. Pointer- und Keyboard-Auswahl; Datenschutz beschreibt den tatsächlichen übermittelten Suchtext.
- #7/#9/#11: PHP- und Node-Mailer liefern HTML mit Feldüberschriften plus Klartext, eindeutige Betreff-Referenzen und eine getrennte Eingangsbestätigung. Die Eingangsbestätigung verspricht keine Buchung. Bestätigungsfehler wird protokolliert und führt nicht zum erneuten Versand der internen Anfrage.
- #8: Selbstabholung bleibt bei S, M, L und Noch unsicher verfügbar; Validierung in Frontend und beiden Mailern entsprechend angepasst.
- #10: Alle Events im August – idealerweise etwa ein Jahr vorher. Anderen Vorlaufhinweis entfernt.
- #12: Fünf gekürzte Texte anhand der Nutzerlieferung vervollständigt; Ekkard Buedenbender und Alina Maurer ergänzt. 22 Rezensionen, keine gekürzten Texte. Christian Meyer wurde nicht hinzugefügt, da seine Vorlage noch mit „… Mehr“ endet. Relative Datumsnotizen dienen ausschließlich der Herkunft und werden nicht als aktuelles Datum angezeigt.
- #13–#15: Gardena-männlich entfernt, Netto als Standard, Copyright 2025.

## Prüfergebnisse

- 70 Regressionstests bestätigt: im letzten Gesamtlauf 69 bestanden; die verbleibende Mengenassertion auf 22 Rezensionen angepasst und beide Rezension-Suites danach erfolgreich geprüft (9 Tests).
- TypeScript und gezieltes ESLint für src sowie deploy/mailer bestanden.
- 5 Node-Mailer-Tests bestanden; PHP-Checks bestanden (simulierter Versand, kein Resend-Aufruf). Unter anderem: Empfänger, Antwortadressen, Deduplizierung, Rate Limits, HTML-Escaping, Selbstabholung aller Modelle, getrennte Bestätigung und Fehlerverhalten.
- Produktionsbuild einschließlich statischem Export bestanden.
- Browser: 1440 px, 390 px, 320 px; keine horizontale Überbreite. Direktes Adressfeld, simulierte Geoapify-Vorschläge per Pfeiltasten/Enter, Selbstabholung L, Netto-Standard, entfernte Gardena-Grafik, August-Text und Copyright bestätigt.
- 22 sichtbare Rezensionen in der statischen Gesamtansicht, keine überlaufenden oder abgeschnittenen Textblöcke. Reduced Motion: animation-name = none.
- Screenshot-Belege: evidence/address-desktop.png, evidence/address-mobile.png, evidence/reviews-mobile.png, evidence/review-full-mobile.png.

## Grenzen

Die Geoapify-Erfolgsvorschläge wurden im Browser simuliert. Reale E-Mail-Zustellung und externe Suchdienstverfügbarkeit sind nicht live geprüft. Das bereits vorhandene hetzner-upload-Paket wurde nicht verändert; vor Veröffentlichung muss ein frisches Paket aus diesem Stand gebaut werden. Vollständiges npm run lint erfasst außerdem bereits vorhandene generierte Uploaddateien und scheitert dort; gezieltes ESLint des Quellcodes ist grün.

Der geladene Impeccable-Kontext meldet eine veraltete Design-Sidecar-Datei (optional mit document auffrischen) und ein verfügbares Update auf 4.3.1. Diese wurden nicht im Rahmen der Issue-Korrekturen geändert.

## API-Quellen

Geoapify unterstützt freie Adress-Suchtexte und Hausnummern in Antworten: [Address Autocomplete API](https://apidocs.geoapify.com/docs/geocoding/address-autocomplete/).
Resend-Payloads mit HTML, Klartext und Antwortadresse: [offizielle Send-Email-Typen](https://github.com/resend/resend-node/blob/canary/src/emails/interfaces/create-email-options.interface.ts).

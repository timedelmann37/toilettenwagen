# 08: Anfrage und vorbereiteter Mailer-Seam

**What to build:** Der primäre WhatsApp-Weg und ein vollständig nutzbares Anfrageformular führen zu einer qualifizierten Anfrage. Das statische Frontend bereitet den sicheren JSON-Contract für den späteren PHP-Mailer vor, überträgt in der aktuellen Vorschau aber noch keine Daten.

**Blocked by:** 04, 06, 07

**Status:** done

## Verbindliche Quellen

- `.scratch/startseite/spec.md`, besonders 6.11, 11, 12 und 14
- ADR-0002
- `whatsapp unternehmenskonto.txt`
- `docs/TODO-DATENSCHUTZ.md`

## Lieferumfang

- Prominenter WhatsApp-Kontakt plus Telefon, E-Mail und Erreichbarkeit.
- Vollständiges Formular mit allen bestätigten Feldern und Modell-/Anlass-Vorauswahl.
- Dokumentierter JSON-Contract, konfigurierbarer Transport-Seam und Honeypot; der echte PHP-Endpunkt folgt später.
- Alle Initial-, Validierungs-, Sende-, Erfolgs-, Fehler-, Spam- und Nicht-konfiguriert-Zustände auf Clientseite.

## Akzeptanzkriterien

- [x] Sichtbar sind +49 160 2743001, `kontakt@mobile-sanitaeranlagen-hs.de`, Mo–Fr 08:00–13:00 und 15:00–19:00 sowie Sa 10:00–16:00.
- [x] WhatsApp ist visuell primär. Sein Deeplink enthält höchstens eine allgemeine Einleitung und niemals ungefragt Formularinhalte.
- [x] Felder: Name; E-Mail; Telefon; Ort/PLZ; Von/Bis oder Termin; Modell S/M/L/weiß nicht; Anlass laut Spec plus Sonstiges; Nachricht; nicht vorausgewählte Datenschutzfreigabe; unsichtbarer Honeypot.
- [x] Name, Ort/PLZ, Termin und Datenschutz sind Pflicht. Mindestens E-Mail oder Telefon ist nötig; E-Mail wird bei Eingabe validiert; Enddatum liegt nicht vor Startdatum.
- [x] Vorauswahl aus Modellwechsler oder Auswahlhilfe wird übernommen, bleibt aber änderbar.
- [x] Ungültig zeigt Feldfehler und fokussierbare Zusammenfassung, ohne Eingaben zu verlieren.
- [x] Während eines später konfigurierten Transports ist Doppelversand verhindert; Felder bleiben lesbar.
- [x] Der vorbereitete Erfolgstext bestätigt nur den Eingang und einen realistischen nächsten Schritt, niemals Buchung oder Verfügbarkeit.
- [x] Transportfehler erhält alle Eingaben und bietet WhatsApp sowie Telefon als Alternative. Spamverdacht bleibt neutral.
- [x] Ohne Endpunkt zeigt das Formular ausdrücklich, dass nichts gesendet wurde, und bietet die direkten Kontaktwege an.
- [x] Request und sichere JSON-Antworten sind für den späteren PHP-Endpunkt dokumentiert; unbekannte Servertexte werden nicht im Client ausgegeben.
- [x] Zugangsdaten, Empfängerinterna und technische Fehler erscheinen weder im Repository noch im Client oder Response-Text.
- [x] Der optionale Zielpfad ist für den statischen Export über `NEXT_PUBLIC_INQUIRY_ENDPOINT` konfigurierbar, ohne Secrets einzuchecken.

## Prüfung

- [x] Verhaltenstests decken Pflichtlogik, Kontaktweg, E-Mail, Datumsreihenfolge, Datenschutz, Honeypot, Doppelversand, Erfolg, Fehler und Erhalt der Eingaben ab.
- [x] Contracttests decken den nicht konfigurierten Zustand sowie vorbereitete erfolgreiche und abgelehnte JSON-Antworten ohne echten Versand ab.
- [x] Tastatur- und Screenreaderprüfung deckt Labels, Fehlerverknüpfung, Fokus und Statusmeldungen ab.
- [x] Desktop- und Mobile-Browserreview prüft Formularrhythmus, Touch-Ziele und Fallbackwege.
- [x] Typecheck, Lint, Tests und statischer Build sind grün.

## Nicht in diesem Ticket

- Keine Buchung, Zahlung, Live-Verfügbarkeit oder externe Formplattform.
- Keine ungefragte Übernahme personenbezogener Daten in WhatsApp.
- Keine neue Trackingtechnik.
- Kein produktiver PHP-Mailer oder tatsächlicher Mailversand; beides folgt auf ausdrückliche spätere Freigabe.

## Comments

- 2026-09-05: Ersetzt das frühere Rechtsseiten-Ticket; Rechtsseiten folgen nach Formular und Consent in Ticket 09.
- 2026-09-05: User-Entscheidung während der Umsetzung: Der Mailer bleibt zunächst Platzhalter. Das Formular validiert vollständig, übernimmt Modell und Anlass, hält Fehlerwerte fest und beschreibt den späteren JSON-Seam in `docs/INQUIRY_MAILER_CONTRACT.md`. Ohne Endpunkt wird nichts übertragen und kein Erfolg vorgetäuscht.
- 2026-09-05: Desktop und 390 x 844 live geprüft; Kontaktwege, Formrhythmus, Modellwahl, Fehlerzustand und Abschluss bleiben ohne horizontalen Überlauf lesbar. Impeccable-Detector, Typecheck, Lint, 40 Tests und statischer Build sind grün.

# TODO – Datenschutzerklärung (offen, vor Go-Live zwingend)

> Status: **offen**. Bewusst auf später verschoben (Grilling 2026-09-05). Der finale Text hängt davon ab,
> welche Komponenten am Ende tatsächlich eingebaut sind. **Vor dem Go-Live rechtlich verpflichtend (DE).**

## Muss abgedeckt werden (Stand der Entscheidungen)

- [ ] **Verantwortlicher** (UG, Anschrift, Vertretungsberechtigte – siehe Impressum).
- [ ] **Google Maps** (ADR-0003): externe Requests + Datenübertragung an Google, Consent-Pflicht, Google-Rechtsgrundlage/Server USA.
- [ ] **Cookie-Consent-Banner**: welche Cookies/Speicher, Einwilligung, Widerruf.
- [ ] **Anfrageformular** (ADR-0002): erhobene Daten (Name, E-Mail, Telefon, Ort, Zeitraum, Anlass, Nachricht), Zweck, Speicherdauer, Rechtsgrundlage (Art. 6 Abs. 1 lit. b DSGVO – vorvertraglich).
- [ ] **PHP-Mailversand**: Verarbeitung/Weiterleitung an `kontakt@…`, Hosting bei Hetzner (AVV mit Hetzner nötig).
- [ ] **WhatsApp-Kontakt**: Hinweis auf Datenübertragung an Meta bei Nutzung des WhatsApp-Wegs.
- [ ] **Hosting Hetzner Webhosting L**: Server-Logs, IP-Verarbeitung, Auftragsverarbeitungsvertrag.
- [ ] **Fonts**: falls Webfonts genutzt → **selbst hosten** (kein Google-Fonts-CDN), sonst hier deklarieren.
- [ ] **Google-Bewertungen/Einbindung**: falls Bewertungen live von Google eingebunden werden (nicht nur statische Zitate).

## Entscheidungen, die die DS-Erklärung vereinfachen

- Formular selbst gehostet (kein Drittanbieter) → weniger Auftragsverarbeiter.
- Fonts selbst hosten → kein externer Font-Request.
- Kundenstimmen als statische Zitate („Vorname + Initiale") → keine Live-Google-Einbindung nötig.

## Nächster Schritt

Am Ende der Implementierung (Phase 9) die tatsächlich verbaute Komponentenliste gegen diese Checkliste prüfen,
dann Datenschutzerklärung passgenau erstellen und `/datenschutz` befüllen.

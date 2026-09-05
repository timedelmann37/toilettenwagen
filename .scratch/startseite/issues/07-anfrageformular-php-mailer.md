# 07: Anfrageformular + PHP-Mailer

**What to build:** Ein sekundärer Anfrageweg per Formular, das validiert und die Anfrage an den Betrieb mailt.

**Blocked by:** 01

**Status:** ready-for-agent

- [ ] Formularfelder: Name, E-Mail, Telefon, Ort/PLZ, Zeitraum (von–bis), Modell (S/M/L/„weiß nicht"), Anlass, Nachricht, Datenschutz-Checkbox.
- [ ] Pflicht: Name + mindestens ein Kontaktweg + Zeitraum + Ort + DS-Checkbox; Label über Input, Fehlertext unter Input (kein Placeholder-als-Label).
- [ ] Client-seitige Validierung vor Absenden (Pflichtfelder, E-Mail-Format, DS-Checkbox); Honeypot-Feld gegen Spam.
- [ ] POST an ein mitgeliefertes **PHP-Mail-Skript** (ADR-0002), das an `kontakt@mobile-sanitaeranlagen-hs.de` mailt; SMTP-/Mail-Zugangsdaten als Konfigurationsplatzhalter dokumentiert.
- [ ] Erfolgszustand (Bestätigung) und Fehlerzustand (verständliche Meldung + alternativer Kontaktweg/WhatsApp).
- [ ] **Tests (Vitest+RTL):** fehlende Pflichtfelder → Fehlermeldungen; ungültige E-Mail → abgelehnt; fehlende DS-Checkbox → blockiert; gültige Eingabe → Sende-Contract ausgelöst (Backend gemockt); Erfolg-/Fehlerzustand angezeigt.

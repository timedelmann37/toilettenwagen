# Datenschutz: Technikabgleich und Freigabestatus

Stand: 5. September 2026. Die Route `/datenschutz/` beschreibt den aktuell gebauten Stand. Dieser Abgleich ersetzt keine abschließende rechtliche Prüfung.

## Im aktuellen Text abgedeckt

- [x] Verantwortlicher mit bestätigter Firma, Anschrift, Telefon und E-Mail.
- [x] Hetzner Webhosting und technisch erforderliche Server-Protokolle.
- [x] Google Maps wird erst nach ausdrücklicher Einwilligung geladen.
- [x] Die Kartenentscheidung liegt im lokalen Browser-Speicher und kann im Bereich `/#region` erneut geöffnet werden.
- [x] Sitzungsspeicher für Wagengröße, Anlass und Preisansicht.
- [x] WhatsApp als externer, erst beim Öffnen aktivierter Kontaktweg.
- [x] Anfrageformular als ehrlicher lokaler Platzhalter ohne konfigurierten Versand-Endpunkt.
- [x] Selbst ausgelieferte Webfonts ohne Laufzeitverbindung zu Google Fonts.
- [x] Kundenstimmen als statische Inhalte ohne externes Bewertungs-Widget.
- [x] Kein Analyse- oder Marketing-Tracking.

## Vor Veröffentlichung beziehungsweise Aktivierung offen

- [ ] Auftragsverarbeitungsvereinbarung mit Hetzner abschließen beziehungsweise bestätigen.
- [ ] Tatsächliche Server-Log-Konfiguration und Löschfristen des gebuchten Webhosting-Pakets prüfen und den Text bei Abweichungen anpassen.
- [ ] Datenschutzerklärung rechtlich final prüfen lassen.
- [ ] Mailer vor Aktivierung technisch und datenschutzrechtlich vollständig abnehmen: Empfänger, Datenfelder, Rechtsgrundlage, Speicherdauer, Schutzmaßnahmen und Löschprozess.
- [ ] Nach Aktivierung des Mailers den Abschnitt „Anfrageformular im aktuellen Projektstand“ vor dem produktiven Versand ersetzen.

Der Mailer bleibt auf ausdrücklichen User-Wunsch zunächst deaktiviert. `NEXT_PUBLIC_INQUIRY_ENDPOINT` darf vor Abschluss der offenen Mailer-Punkte nicht in der Produktion gesetzt werden.

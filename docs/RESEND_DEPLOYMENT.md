# Resend-Testversand über Portainer

Die bestehende `compose.yaml` bleibt die Stack-Datei. `web` bleibt auf
`127.0.0.1:8087`; der Cloudflare-Tunnel braucht keine Änderung. Nginx leitet
`/api/anfrage` intern an `mailer:3001` weiter. Der Mailer hat keinen Host-Port.

## Portainer-Variablen

Im bestehenden Git-Stack unter Environment variables eintragen:

| Name | Wert |
| --- | --- |
| RESEND_API_KEY | Den vorhandenen Resend-Schlüssel lokal in Portainer einfügen |
| MAIL_TO | Die vom Nutzer bestätigte private Gmail-Testadresse |
| NEXT_PUBLIC_INQUIRY_ENDPOINT | /api/anfrage |

Absender: `Website-Anfragen <anfragen@mail.daheim.uk>`; Website-Origin:
`https://tw.daheim.uk`. Antworten gehen an die Adresse im Formular. Keine
automatische Bestätigung an Besucher und keine zusätzlichen Empfänger.
Die Testadresse steht bewusst nicht im öffentlichen Browser-Bundle.

## Aktualisierung

1. Änderungen ins von Portainer verwendete Repository/Branch übertragen.
2. Variablen im bestehenden Portainer-Stack speichern.
3. Git-Stack aktualisieren und beide Images neu bauen lassen. Ein bloßer
   Container-Neustart aktiviert das Formular nicht: NEXT_PUBLIC_INQUIRY_ENDPOINT
   wird beim Next.js-Build eingebettet. Auf erfolgreichen Build im Log achten.
4. `mailer` muss healthy werden. Der Healthcheck prüft den Prozess, nicht den
   Resend-Schlüssel oder die Zustellung.
5. `https://tw.daheim.uk/` neu laden. Im Formular muss „Anfrage senden“ statt
   „Eingaben prüfen“ erscheinen. Einen eindeutig bezeichneten Test mit erfundenen
   Angaben senden; Empfang im privaten Postfach und Reply-To prüfen. Resend-
   Status „delivered“ bedeutet Annahme durch den empfangenden Mailserver.

## Verhalten und Grenzen

- Erfolg wird nur nach Resend-Antwort mit Mail-ID gemeldet, nicht bei HTTP-Fehlern.
- Serverseitige Pflichtfeld-, Datums-, Größen- und Origin-Prüfung, Honeypot.
- Maximal fünf Versuche pro E-Mail/15 Minuten und 30 insgesamt/Stunde.
  Diese bewusste Testbegrenzung schützt das Versandbudget, ist aber kein vollständiger
  Bot-Schutz. Origin-Prüfung ersetzt keine Bot-Erkennung.
- Gleiche Anfrage innerhalb zehn Minuten wird nicht erneut versandt;
  Resend-Idempotenzschlüssel schützt auch Wiederholungen bei Übertragungsfehlern.
- Limit-/Deduplizierungszustand liegt im RAM, ist auf eine Instanz ausgelegt und
  geht bei Neustart verloren. Keine Formularinhalte oder Schlüssel in App-Logs.
- Versand verwendet die dokumentierte Resend-REST-API:
  https://resend.com/docs/api-reference/emails/send-email

## Vor dem regulären Kundenbetrieb

Datenschutzhinweise nennen derzeit noch Hetzner und einen inaktiven Versand.
Hosting/Cloudflare/Resend und tatsächliche Empfänger sowie Aufbewahrung müssen
vor regulären Anfragen an den realen Betrieb angepasst werden. Für den ersten
Versandtest erfundene Angaben verwenden. Der private Gmail-Empfänger ist der vom
Nutzer gewünschte Testempfänger; der spätere Wechsel erfolgt über MAIL_TO.

## Rückweg

NEXT_PUBLIC_INQUIRY_ENDPOINT in Portainer leeren und `web` neu bauen. Dadurch
kehrt das Formular zum Prüfmodus zurück. Bereits versandte Mails bleiben im Postfach.

## Lokale Prüfung

`node --test deploy/mailer/server.test.mjs` verwendet einen simulierten Resend-
Dienst und verschickt keine E-Mails. Docker/Portainer und echte Zustellung müssen
auf dem Homeserver geprüft werden.

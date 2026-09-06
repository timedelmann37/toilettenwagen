# Anfrageformular: vorbereiteter Mailer-Contract

## Aktueller Stand

Der Mailer ist bewusst **noch nicht funktional**. Ohne konfigurierte Zieladresse
validiert die Oberfläche alle Angaben, überträgt aber keine personenbezogenen
Daten. Sie zeigt diesen Vorschauzustand ausdrücklich an und verweist auf
WhatsApp, Telefon und E-Mail.

Der spätere Anschluss erfolgt ausschließlich über:

```text
NEXT_PUBLIC_INQUIRY_ENDPOINT=/anfrage.php
```

Die Variable enthält nur einen öffentlichen, vorzugsweise relativen Endpunkt.
Zugangsdaten, Empfängerinterna und SMTP-Konfiguration gehören ausschließlich in
die spätere Hosting-Konfiguration.

## Request

`POST` mit `Content-Type: application/json` und diesen Feldern:

- `name`, `email`, `phone`, `location`
- `startDate`, `endDate`
- `model`: `s`, `m`, `l` oder `unknown`
- `occasion`, `occasionOther`, `message`
- `privacyAccepted`: immer `true`, da der Client vorher validiert
- `website`: Honeypot; für echte Anfragen leer

Der Client trimmt Freitext, ersetzt aber keine serverseitige Prüfung.

## Sichere Response

Erfolg:

```json
{ "ok": true }
```

Allgemeiner Fehler:

```json
{ "ok": false, "code": "invalid" }
```

Neutral behandelter Spamverdacht:

```json
{ "ok": false, "code": "spam" }
```

Andere Statuscodes, ungültiges JSON und Netzwerkfehler werden im Client als
allgemeiner Fehler behandelt. Response-Texte des Servers werden nicht ungeprüft
angezeigt.

## Spätere Serverpflichten

Der PHP-Endpunkt muss sämtliche Felder erneut validieren und begrenzen,
Mailheader-Injection verhindern, den Honeypot sowie eine angemessene
Missbrauchsbegrenzung prüfen und ausschließlich den obigen sicheren JSON-Contract
zurückgeben. Der echte Versand und ein kontrollierter Staging-Test bleiben bis
zur ausdrücklichen Aktivierung zurückgestellt.

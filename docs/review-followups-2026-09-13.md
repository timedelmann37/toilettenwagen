# Review-Korrekturen

- Nutzerbestätigung: Lieferung und Abholung zusammen bis 50 beladene km pauschal 50 EUR netto; danach 1,10 EUR netto je Mehrkilometer. Keine Leerfahrten. Auf-/Abbau separat und ohne Website-Preisangabe.
- Abwasser: 5 m als betriebliche Empfehlung, nicht Frischwassergrenze oder Gesetz. Quellen und Formulierung in abwasser-recherche-2026-09-13.md.
- Verbrauchsmaterial nach Erstausstattung bei Herrmann & Smécz nachkaufbar; Holzabdeckungen für Kanaldeckel.
- Ablauf ohne Übernehmen-Wortwahl bei Abholung und ohne Bewertungsbitte.
- Ortsbeispiele um Siegen, Netphen, Rennerod und Betzdorf ergänzt, Desktop zwei Reihen.
- WhatsApp-Symbolkonturen aus öffentlicher offizieller Homepage https://www.whatsapp.com/ (13.09.2026). Marken-Grün #25d366 mit dunklem kontrastreichem Text; Chat-Ziel unverändert.
- Favicon aus vorhandenem Unternehmenslogo: scripts/generate-favicon.mjs, ICO 16/32/48 px plus PNG.
- Modellwahl als erster Formularblock; Rechnungsanschrift als einzeiliges Feld. Beide Kontaktwege persistent im Header, mobil eigene Zeile.

## Noch offen: echte Adressvorschläge

Browser-Autofill ist vorhanden, aber keine Straßendatenbank. PLZ-gestützte Live-Straßensuche benötigt eine Provider-Entscheidung, Zugang, Datenschutztext und passende Einwilligungs-/Ladestrategie. Es wurde kein externer Dienst aktiviert und keine Kundeneingabe übertragen.
Möglicher Anbieter: [Geoapify Address Autocomplete](https://apidocs.geoapify.com/docs/geocoding/address-autocomplete/) mit Deutschlandfilter und PLZ-Gebietsfilter. Manuelle Adresseingabe muss immer möglich bleiben; ein Suchtreffer ist keine verbindliche Adressprüfung.

## Noch offen: Google-Rezensionen live

Für die eigenen vollständigen Rezensionen: genehmigter Business Profile API-Zugang, OAuth2-Web-Client und Autorisierung des verwaltenden Google-Kontos; keine reine API-Key-Lösung. Zugangsdaten serverseitig, nicht in den statischen Export. Vor Umsetzung Nutzungs-/Speicherbedingungen prüfen.
- https://developers.google.com/my-business/content/basic-setup
- https://developers.google.com/my-business/content/implement-oauth
- https://developers.google.com/my-business/content/review-data

Places liefert höchstens fünf Rezensionen und erfüllt daher den Wunsch nach allen rund 20 nicht.

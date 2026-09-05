# Google Maps Embed mit Cookie-Consent-Banner

Für das Einsatzgebiet wird bewusst ein **Google Maps Embed** eingebunden (vertraute, ansprechende Optik). Weil Google Maps externe Requests auslöst und Nutzerdaten an Google überträgt, wird ein **Cookie-Consent-Banner** eingeführt und die Karte erst nach Einwilligung geladen.

## Considered Options

- **Google Maps + Consent** (gewählt): vom Auftraggeber ausdrücklich gewünschte Optik; Consent-Banner ist heute Standard und akzeptiert.
- **Custom-Karte (SVG/illustriert)**: null externe Requests, kein Banner nötig, on-brand – aber nicht zoombar, vom Auftraggeber abgelehnt.
- **Leaflet + OpenStreetMap**: interaktiv und DS-freundlicher als Google, aber weniger vertraute Optik.

## Consequences

- Ein Consent-Mechanismus wird zur Pflichtkomponente (nicht nur für Maps, sondern für alle künftig eingebundenen Dritt-Dienste).
- Die **Datenschutzerklärung muss Google Maps abdecken** → siehe `docs/TODO-DATENSCHUTZ.md`.
- Die Karte darf erst nach aktiver Einwilligung geladen werden (kein Vorab-Laden von Google-Ressourcen).

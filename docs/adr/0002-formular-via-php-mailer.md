# Anfrageformular über eigenes PHP-Mail-Skript

Da die Seite statisch ausgeliefert wird (ADR-0001) und kein Node-Backend hat, postet das Anfrageformular an ein kleines **PHP-Skript auf dem Hetzner-Webhosting**, das die Anfrage an `kontakt@mobile-sanitaeranlagen-hs.de` mailt.

## Considered Options

- **Eigenes PHP-Skript** (gewählt): Daten bleiben auf dem eigenen Webhosting, keine Drittanbieter, PHP + Mailversand sind auf Webhosting L verfügbar, DS-freundlich.
- **Formspree / externer Formulardienst**: einfach, aber Anfragedaten (inkl. Kontaktdaten) laufen über einen Dritten → zusätzliche DS-Pflichten, Kosten, Abhängigkeit.
- **Reiner `mailto:`-Link**: kein Skript nötig, aber schlechte UX, öffnet das E-Mail-Programm des Nutzers und liefert kein strukturiertes Formular.

## Consequences

- Für den Betrieb werden die Mail-/SMTP-Zugangsdaten des Webhosting-Pakets benötigt (in der Umsetzung zu klären).
- Das PHP-Skript ist die einzige serverseitige Komponente; Spam-Schutz (z. B. Honeypot) muss dort mitgedacht werden.
- WhatsApp bleibt der primäre, bevorzugte Anfrageweg; das Formular ist der Sekundärweg.

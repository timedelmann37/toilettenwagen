# Adresssuche

Geoapify Autocomplete, Deutschland, PLZ plus Straßen-Suchtext. Optionaler Opt-in je Adresshilfe, keine Anfrage vor Aktivierung. Hausnummer und Kontaktdaten werden nicht übergeben. Manuelle Eingabe bleibt verfügbar; Vorschläge sind keine verbindliche Adressvalidierung.

Build-Konfiguration: `NEXT_PUBLIC_GEOAPIFY_API_KEY` lokal in ignorierter `.env.local`, für Produktion in der Build-Umgebung. Nicht in Git hinterlegen. Bei statischer Auslieferung ist der Schlüssel im Browser sichtbar: auf zulässige Domains begrenzen, Kontingente beobachten und den im Chat geteilten Schlüssel vor Veröffentlichung austauschen. Kein Versand-Endpunkt wird durch diese Funktion eingerichtet.

Quelle: https://apidocs.geoapify.com/docs/geocoding/address-autocomplete/
Datenschutzquelle: https://www.geoapify.com/privacy-policy/ (13.09.2026). Anbieter nennt für erfolgreiche API-Anfragen in der Regel höchstens 24 Stunden Aufbewahrung sowie Cloudflare/Hetzner als technische Dienste. Vertragliche Datenschutzprüfung vor Veröffentlichung offen.

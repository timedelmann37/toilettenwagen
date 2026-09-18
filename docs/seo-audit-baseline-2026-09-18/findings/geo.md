# GEO / AI-Search-Readiness – mobile-sanitaeranlagen-hs.de

Audit-Datum: 2026-09-18 · Baseline der alten WordPress-Seite · Empfehlungen sind für den Next.js-Relaunch formuliert.

## AI Search Readiness Score: **40 / 100**

| Dimension | Gewicht | Score | Begründung (Kurz) |
|---|---|---|---|
| Zitierfähigkeit (Citability) | 25 % | 30 | Startseite 69 Wörter ohne Ort/Zahlen; /unsere-toilettenwagen/ hat Preise + Ausstattung, aber keine Antworten zu Lieferradius, Personenkapazität, Region |
| Strukturelle Lesbarkeit | 20 % | 50 | H1/H2 vorhanden, Listen; keine Frage-Überschriften, kein FAQ; H3 = Kapazitätsstrings; "Your web browser is old"-Banner erzeugt Fremd-Headings im HTML |
| Multi-Modal | 15 % | 20 | 31 Bilder, 29 ohne alt; kein Video/YouTube; keine beschrifteten Grundriss-/Maßangaben |
| Autorität & Brand-Signale | 20 % | 25 | LocalBusiness-JSON-LD fehlerhaft (siehe unten); keine externen Erwähnungen auffindbar; Namens-/Adress-Schreibweise weicht vom Handelsregister-Eintrag ab |
| Technische Zugänglichkeit | 20 % | 70 | SSR (WordPress), robots.txt blockiert keinen AI-Crawler, Sitemap vorhanden; Shop = clientseitiges Ecwid-Widget (für Crawler leer); 9 Demo-Produkte in Sitemap |

Plattform-Einschätzung: Google AI Overviews ~40 · ChatGPT Search ~30 · Perplexity ~35 · Bing Copilot ~30 (Seite erscheint bei Bing nicht einmal für den eigenen Firmennamen; Bing-Index ist Basis für ChatGPT Search und Copilot).

---

## 1. AI-Crawler-Zugriff (robots.txt) – OK, kein Handlungsbedarf

Evidenz (`/robots.txt`, 200):
```
User-agent: *
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php
Sitemap: https://www.mobile-sanitaeranlagen-hs.de/wp-sitemap.xml
```

| Crawler | Steuert | Status |
|---|---|---|
| OAI-SearchBot | ChatGPT Search (Zitate) | erlaubt |
| Claude-SearchBot | Claude Search (Zitate) | erlaubt |
| PerplexityBot | Perplexity | erlaubt |
| Googlebot | Google Suche + AI Overviews | erlaubt |
| Bingbot | Bing + Copilot + ChatGPT-Search-Index | erlaubt |
| GPTBot | nur OpenAI-Training (kein Einfluss auf ChatGPT Search) | erlaubt |
| ClaudeBot | nur Anthropic-Training (kein Einfluss auf Claude Search) | erlaubt |
| Google-Extended | nur Gemini-Training/Grounding, nie Google Suche/AIO | erlaubt |
| Applebot-Extended | nur Apple-Intelligence-Training, nie Siri/Spotlight | erlaubt |
| CCBot, cohere-ai | Training-Datasets | erlaubt |

Empfehlung (Info, kein Muss): Für den Relaunch die Search-Crawler explizit erlauben lassen (Status quo beibehalten). Training-Crawler (GPTBot, ClaudeBot, CCBot, Google-Extended, Applebot-Extended) dürfen optional blockiert werden – ohne Auswirkung auf Sichtbarkeit in AI-Suchen. Für ein lokales Vermietungsunternehmen ist "alles erlauben" die sinnvollere Wahl.

## 2. llms.txt / RSL – fehlt (niedrig)

- `/llms.txt` → 404, `/llms-full.txt` → 404, `/.well-known/rsl.xml` → 404, `/ai.txt` → 404.
- Einordnung: llms.txt ist ein optionaler Community-Standard. **Google nutzt es nicht**, und keine der großen AI-Suchen hat die Verwendung bestätigt. Kein Score-Treiber.
- Fix (5 Min, optional): Beim Relaunch eine `public/llms.txt` mit Firmenname, Standort, Leistungen (3 Toilettenwagen S/M/L, Preise ab netto), Liefergebiet, Telefon und Links zu den 3–4 wichtigsten Seiten ausliefern. Priorität: niedrig.

## 3. Zitierfähigkeit auf Passagen-Ebene – **hoch**

Testfrage: *"Toilettenwagen mieten Westerwald/Daaden – Preise, Größen, Kapazität, Lieferradius?"*

| Teilfrage | Beantwortbar aus Seitentext? | Evidenz |
|---|---|---|
| Wer / wo? | **Nein** auf Startseite; nur Kontakt/Impressum | Startseite (69 Wörter) enthält weder "Daaden" noch "Westerwald" im sichtbaren Text – nur in Meta-Description und JSON-LD |
| Preise | Teilweise | "Preis: ab 175 € / 190 € / 210 € pro Tag zzgl. 19 % MwSt. sowie Lieferung, Aufbau und Endreinigung" – aber keine Angabe zu Lieferkosten, Wochenend-/Mehrtagespreisen, Kaution |
| Größen | **Nein** | keine Längen-/Breiten-/Gewichtsangaben, kein Platzbedarf, keine Anhängerkupplungs-/Zugfahrzeug-Info |
| Kapazität | Teilweise | Anzahl Kabinen/Urinale (S: 2 D + 1 H + 2 U; M: 3 D + 1 H + 3 U; L: 4 D + 2 H + 6 U) – aber keine Angabe "für bis zu X Gäste" |
| Lieferradius | **Nein** | "Liefer" kommt 6× vor, nur als Kostenposition; keine Ortsliste, keine km-Angabe, keine Region |
| Anschlüsse | Ja | "maximal 3 Meter vom Abwasseranschluss … Frisch- und Abwasserschläuche im Lieferumfang" – gute, extrahierbare Passage (einzige echte Antwort-Passage) |
| Strom/Wasser-Bedarf | **Nein** | 0 Treffer für "Strom", "Wasser" (außer Abwasser) |

Weitere Befunde:
- Kein einziger Satz auf der gesamten Site endet mit "?" – keine Frage-Überschriften, kein FAQ.
- Kein Absatz erreicht die für Zitate optimale Länge von ~130–170 Wörtern; die Toilettenwagen-Seite besteht aus 3 nahezu identischen Bullet-Blöcken (Duplikat-Zeilen "Moderne Spotbeleuchtung…", "Hochwertige Edelstahltreppe…" 3×).
- Startseite ist reine Marketing-Prosa ("professionelle Lösungen", "höchsten Komfort") ohne extrahierbare Fakten.
- Title der Startseite: "Mobile Sanitäranlagen: 10% Rabatt bis 30.06.2026" – abgelaufen; ein AI-Modell würde ein veraltetes Angebot zitieren.

**Fazit:** Ein LLM kann aus der Seite nur "3 Wagen, ab 175/190/210 € netto pro Tag, max. 3 m zum Abwasser" extrahieren. Für "Westerwald", "Lieferradius", "wie viele Gäste" gibt es keine Antwort → die Seite wird bei diesen Fragen nicht zitiert.

## 4. Entitäts-Klarheit – **hoch**

- **Firmenname inkonsistent** (3 Schreibweisen): Startseite/JSON-LD "Mobile Sanitäranlagen Herrmann und Smücz UG", AGB "… Herrmann & Smücz UG (haftungsbeschränkt)", Impressum "Mobile Sanitär**analgen** Herrmann und Smücz UG" (Tippfehler). Handelsregister-Auszug (NorthData, HRB 30803 Montabaur) führt "Herrmann & Sm**é**cz UG", Adresse "Im Reu**ch**ewäldchen 12". → Bitte offizielle Schreibweise von Name und Straße prüfen und **eine** kanonische Form überall verwenden (Impressum, JSON-LD, Footer, Google Business Profile).
- **Standort im sichtbaren Text nur auf Kontakt/Impressum.** Startseite und Angebotsseite nennen weder Daaden, Westerwald, Landkreis Altenkirchen noch Rheinland-Pfalz. Für AI-Modelle ist die Firma damit "irgendwo".
- **Leistungsart** ist klar (Vermietung Toilettenwagen), aber "Baustellen" (laut Meta-Description Zielgruppe) kommt im Fließtext 0× vor.
- **LocalBusiness-JSON-LD (identisch auf allen Seiten) ist mangelhaft:**
  - `sameAs: ["","","","","","",""]` – sieben leere Strings (ungültig, kein Entity-Linking)
  - `addressRegion: null`, **kein `postalCode`**, kein `addressCountry`
  - `openingHours` als Nicht-Standard-Objekt `{"weekDays":[...]}` statt `openingHoursSpecification` → wird von Google ignoriert
  - **Öffnungszeiten widersprechen der Kontaktseite**: JSON-LD Di–Fr 09–13/15–18, Sa 14–18, Mo leer; Kontaktseite Mo–Fr 09–13/15–19, Sa 10–16
  - `logo` ist relativer Pfad, `url` ohne www (Kanonisch ist www), kein `@id`, kein `image`, kein `priceRange`, kein `areaServed`, kein `hasOfferCatalog`/`Product`-Markup für die 3 Wagen, kein `aggregateRating`
  - `telephone: "01602743001"` statt E.164 `+49 160 2743001`
- Keine Autoren-/Datumsangaben, keine Referenzen/Kundenstimmen, keine "Über uns"-Seite mit den beiden Geschäftsführern.

## 5. Brand-Mention-Signale – **hoch** (Null-Footprint)

Live-Prüfung (Bing; DuckDuckGo blockte mit CAPTCHA):
- Suche `"Mobile Sanitäranlagen Herrmann und Smücz"` → **kein Treffer** für die Firma, weder eigene Domain noch Verzeichnisse.
- Suche `Toilettenwagen mieten Daaden Westerwald` → Top 10: kleinanzeigen.de, toitoidixi.de, gamo.de, mobile-toilette.de, eps.net, wc-mietservice.de, ltb-toilettenwagen.de, toilettenwagen-mieten.com. **Eigene Domain nicht vertreten.**
- Facebook/Instagram: nichts auffindbar. Wikipedia: nein (erwartbar). Reddit/YouTube: 0. LinkedIn: 0.
- Einzige externe Entität: NorthData/Handelsregister (HRB 30803) – ohne Website-Verlinkung.
- Ausgehende Links der Website: nur `gmpg.org/xfn/11` (WordPress-Standard). Keine Social-Profile, kein Google-Business-Profile-Link.
- Kein Bewertungs-Markup, keine sichtbaren Rezensionen.

Konsequenz: AI-Suchen bauen Vertrauen über externe Ko-Erwähnungen (YouTube-Korrelation ~0,74, Reddit/Wikipedia hoch, Backlinks nur ~0,27). Ohne jede Erwähnung außerhalb der eigenen Domain wird die Firma auch bei perfektem Onpage-Text kaum zitiert.

## 6. Technik – mittel

- SSR-WordPress, `is_spa=false`, Text im Raw-HTML → gut für alle Crawler.
- `/shop/` = Ecwid-Widget: Crawler sehen nur "Ihr Shop-Inhalt wird jetzt geladen …" (50 Wörter Consent-Text). Falls der Shop im Relaunch bleibt: Produkte serverseitig rendern oder entfernen.
- Sitemap `wp-sitemap-ecstore-1.xml` listet 9 Ecwid-Demo-Produkte (Sonnenbrille, Kleid, Tanktop) – verwässert das Entitätsbild "Toilettenwagen-Vermietung" und kann in AI-Antworten als Sortiment auftauchen. Entfernen / 410.
- HTML enthält den Text "Your web browser is old and not fully supported" als Heading auf jeder Seite (Kompatibilitäts-Banner) → englischer Fremdtext im Extraktionsergebnis.
- agent_ux_check: Startseite 95/100; /unsere-toilettenwagen/ 77/100 (6 interaktive Elemente ohne Accessible Name, 1 div-onclick-Widget).
- Verbindungs-Encoding: Die extrahierten Texte zeigen Umlaut-Artefakte (�) im Audit-Dump – der Server liefert `charset=UTF-8`, Ursache ist die lokale Konsole, kein Site-Fehler.

---

## Priorisierte Maßnahmen (Relaunch)

| # | Maßnahme | Schwere | Aufwand |
|---|---|---|---|
| 1 | **FAQ-/Antwortblöcke mit Frage-Überschriften** (siehe unten) auf Startseite und Toilettenwagen-Seite, jeweils Antwort in den ersten 40–60 Wörtern; als `FAQPage`-JSON-LD ergänzen | hoch | 3–5 h Text |
| 2 | **Standort + Liefergebiet in den sichtbaren Text**: "Daaden (Westerwald), Landkreis Altenkirchen, Rheinland-Pfalz" auf Startseite; Ortsliste/Radius (z. B. "bis 60 km: Betzdorf, Kirchen, Siegen, Altenkirchen, Wissen, Hachenburg, Bad Marienberg, Burbach, Neunkirchen, Herdorf") + `areaServed` im Schema | hoch | 1–2 h |
| 3 | **LocalBusiness-JSON-LD reparieren**: `@id`, `postalCode 57567`, `addressRegion "Rheinland-Pfalz"`, `addressCountry "DE"`, `openingHoursSpecification` (mit den tatsächlichen Zeiten der Kontaktseite abgleichen), `sameAs` nur mit echten URLs oder weglassen, `telephone "+49 160 2743001"`, `priceRange "€€"`, `areaServed`, `image`, absolute `logo`-URL; pro Wagen ein `Product`/`Offer` (Preis netto, `priceCurrency EUR`, `unitCode DAY`) | hoch | 1–2 h |
| 4 | **Namens-/Adress-Konsistenz** (Impressum-Tippfehler, "&" vs "und", Schreibweise laut HR prüfen); überall dieselbe Form; Google Business Profile anlegen bzw. mit Website verknüpfen und dort `sameAs` hinterlegen | hoch | 1 h + GBP-Verifizierung |
| 5 | **Externe Erwähnungen aufbauen**: Google Business Profile mit Bewertungen, Einträge in Gelbe Seiten/11880/Das Örtliche (NAP identisch), ein kurzes YouTube-Video je Wagen (Innenraum-Rundgang, 60 s) mit Firmenname + "Daaden/Westerwald" in Titel und Beschreibung, Erwähnung in lokalen Vereins-/Eventseiten (z. B. Schützenfeste, Feuerwehr, Stadt Daaden) | hoch | laufend, 2–4 h Start |
| 6 | Toilettenwagen-Seite: pro Wagen konkrete Zahlen ergänzen (Maße L×B, Gewicht, empfohlene Gästezahl, Stromanschluss 230 V/16 A, Wasseranschluss ¾"), Bild-`alt` für alle 29 Bilder (z. B. "Toilettenwagen M – Damenbereich mit 3 Kabinen"), Duplikat-Bullets zu einer gemeinsamen "Ausstattung aller Wagen"-Liste zusammenfassen | mittel | 2 h |
| 7 | Abgelaufenen Rabatt aus Title/Startseite entfernen; Demo-Produkte aus Sitemap entfernen; Ecwid-Shop serverseitig oder weglassen; Browser-Banner nicht als Heading rendern | mittel | 1 h |
| 8 | `llms.txt` ausliefern (optional, nicht von Google genutzt) | niedrig | 5 Min |

---

## Vorschlag: Frage-Überschriften + Antwort-Passagen für den Relaunch

Jede Passage ist so gebaut, dass sie ohne Kontext zitierbar ist (Firma, Ort, Zahl in den ersten Sätzen). Zahlen in eckigen Klammern sind vom Betreiber zu bestätigen.

**H2: Was kostet es, einen Toilettenwagen im Westerwald zu mieten?**
Ein Toilettenwagen von Mobile Sanitäranlagen Herrmann & Smücz aus Daaden kostet ab 175 € netto pro Tag (Toilettenwagen S), ab 190 € (M) und ab 210 € (L), jeweils zzgl. 19 % MwSt. Hinzu kommen Lieferung, Aufbau und Endreinigung, die wir je nach Entfernung pauschal berechnen – [im Umkreis von 30 km um Daaden ab X €]. Für Wochenend- und Mehrtagesmieten erstellen wir ein individuelles Angebot; eine Kaution kann verlangt werden.

**H2: Für wie viele Gäste reicht welcher Toilettenwagen?**
Toilettenwagen S (2 Damen-WCs, 1 Herren-WC, 2 Urinale) eignet sich für Feiern mit [bis zu ca. 100 Gästen], etwa Geburtstage oder Hochzeiten im Garten. Toilettenwagen M (3 Damen-WCs, 1 Herren-WC, 3 Urinale) ist für [bis zu ca. 200 Gäste] ausgelegt, z. B. Vereinsfeste. Toilettenwagen L (4 Damen-WCs, 2 Herren-WCs, 6 Urinale) deckt Großveranstaltungen mit [bis zu ca. 400 Gästen] ab, etwa Schützenfeste oder Stadtfeste. Faustregel: pro 100 Gäste und 4 Stunden eine Damenkabine.

**H2: In welchem Gebiet liefern Sie Toilettenwagen?**
Wir liefern von Daaden aus in den gesamten Westerwald, das Siegerland und den Landkreis Altenkirchen – u. a. nach Betzdorf, Kirchen, Herdorf, Wissen, Altenkirchen, Hachenburg, Bad Marienberg, Burbach, Neunkirchen und Siegen. Standard-Lieferradius sind [ca. 50 km]; weitere Entfernungen auf Anfrage. Lieferung, Aufstellen und Abholung übernimmt unser Team.

**H2: Welche Anschlüsse braucht ein Toilettenwagen am Aufstellort?**
Der Sanitärwagen benötigt einen Abwasseranschluss (Kanal oder Schacht) in maximal 3 Metern Entfernung, einen Frischwasseranschluss ([Gartenschlauch ¾"]) und einen [230-V-Stromanschluss (16 A, Schuko/CEE)] für Beleuchtung, Sensoren und Warmwasser. Frisch- und Abwasserschläuche sind im Lieferumfang enthalten. Der Stellplatz sollte eben, befestigt und mit dem Zugfahrzeug anfahrbar sein ([mind. 8 × 3 m]).

**H2: Wie groß und schwer sind die Toilettenwagen?**
Toilettenwagen S ist [ca. X m lang, X m breit, X kg]; M [ca. …]; L [ca. …]. Alle Wagen werden von uns mit eigenem Zugfahrzeug geliefert und aufgestellt – Sie brauchen keinen Anhängerführerschein.

**H2: Wie lange im Voraus sollte ich einen Toilettenwagen reservieren?**
Für Wochenenden in der Saison (Mai–September) empfehlen wir eine Anfrage [4–6 Wochen] im Voraus, da wir drei Wagen im Bestand haben. Kurzfristige Anfragen sind per WhatsApp oder Telefon (+49 160 2743001) oft noch möglich. Die Reservierung wird mit schriftlicher Auftragsbestätigung verbindlich.

**H2: Eignen sich die Toilettenwagen auch für Baustellen?**
Ja. Neben Events vermieten wir die Toilettenwagen auch an Bauunternehmen und für Langzeit-Baustellen im Westerwald. Für Mietzeiten ab [einer Woche] bieten wir Wochen- und Monatspreise sowie [regelmäßige Reinigungsintervalle] an.

**H2: Wer steht hinter Mobile Sanitäranlagen Herrmann & Smücz?**
Mobile Sanitäranlagen Herrmann & Smücz UG (haftungsbeschränkt) ist ein Vermietungsunternehmen für Toilettenwagen mit Sitz in Daaden im Westerwald (Rheinland-Pfalz), eingetragen beim Amtsgericht Montabaur (HRB 30803). Geschäftsführer sind Christian Herrmann und Phillip Smücz. [Gegründet 2025], drei eigene Toilettenwagen (S, M, L), Lieferung und Service aus einer Hand.

---

## Strukturierte Findings (für audit-data.json, Kategorie "AI Search Readiness")

```json
{
  "category": "AI Search Readiness",
  "score": 40,
  "dimensions": {"citability": 30, "structure": 50, "multimodal": 20, "authority": 25, "technical": 70},
  "platform_scores": {"google_aio": 40, "chatgpt": 30, "perplexity": 35, "bing_copilot": 30},
  "crawler_access": {"OAI-SearchBot": "allowed", "Claude-SearchBot": "allowed", "PerplexityBot": "allowed", "Googlebot": "allowed", "Bingbot": "allowed", "GPTBot": "allowed", "ClaudeBot": "allowed", "Google-Extended": "allowed", "Applebot-Extended": "allowed", "CCBot": "allowed"},
  "llms_txt": "missing (optional, not used by Google)",
  "rsl": "missing",
  "findings": [
    {"id": "geo-01", "severity": "high", "title": "Keine zitierfähigen Antwort-Passagen (Preise/Kapazität/Lieferradius/Region)", "evidence": "0 Frage-Überschriften; 'Westerwald' 0x, 'Daaden' 0x auf / und /unsere-toilettenwagen/; kein Lieferradius", "fix": "8 FAQ-Blöcke + FAQPage-Schema (siehe geo.md)"},
    {"id": "geo-02", "severity": "high", "title": "Entität unklar: Standort fehlt im sichtbaren Text, Firmenname in 3 Schreibweisen", "evidence": "Impressum 'Sanitäranalgen'; HR: 'Smécz', 'Reuchewäldchen'", "fix": "Kanonische Schreibweise prüfen und überall identisch verwenden"},
    {"id": "geo-03", "severity": "high", "title": "LocalBusiness-JSON-LD fehlerhaft", "evidence": "sameAs 7x leer, postalCode fehlt, openingHours nicht schema-konform und widerspricht Kontaktseite", "fix": "Schema neu generieren (openingHoursSpecification, areaServed, Product/Offer je Wagen)"},
    {"id": "geo-04", "severity": "high", "title": "Keine externen Brand-Mentions", "evidence": "Bing: 0 Treffer für Firmenname; kein GBP/Facebook/YouTube/Verzeichnis auffindbar", "fix": "GBP + Verzeichnisse + YouTube-Kurzvideos + lokale Erwähnungen"},
    {"id": "geo-05", "severity": "medium", "title": "Bilder ohne alt, Duplikat-Bullets, fehlende Maße/Gästezahl", "evidence": "29/31 img ohne alt; 3 identische Ausstattungsblöcke", "fix": "alt-Texte, Spezifikationstabelle je Wagen"},
    {"id": "geo-06", "severity": "medium", "title": "Veraltete/irreführende Inhalte für AI-Extraktion", "evidence": "Title '10% Rabatt bis 30.06.2026'; 9 Ecwid-Demo-Produkte in Sitemap; Shop clientseitig leer; 'Your web browser is old' als Heading", "fix": "Entfernen/serverseitig rendern"},
    {"id": "geo-07", "severity": "low", "title": "llms.txt fehlt", "evidence": "/llms.txt 404", "fix": "Optional anlegen; nicht von Google genutzt"}
  ]
}
```

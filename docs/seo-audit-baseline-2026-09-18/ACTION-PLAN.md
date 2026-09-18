# Aktionsplan: www.mobile-sanitaeranlagen-hs.de

Health Score heute: **42/100**. Ziel nach Relaunch + Phase 2: ≥ 75.
Jede Maßnahme: **Prinzip** (warum) · **Abhängigkeit** · **Falsifizierbar durch** · **Leading Indicator**.

## Phase 1 – Critical (sofort, noch auf der Alt-Seite oder spätestens am Relaunch-Tag)

| # | Maßnahme | Prinzip | Abhängigkeit | Falsifizierbar durch | Indicator |
|---|---|---|---|---|---|
| 1.1 | **Ecwid-Demoprodukte löschen**, `/shop/` entfernen (410) oder 301 → `/unsere-toilettenwagen/`; im Relaunch keine `/shop/`-Route, alte Produkt-URLs → 410 | Entity-Verwässerung: Kleidung auf einer Toilettenwagen-Seite | keine – blockt nichts, entblockt alles | `site:mobile-sanitaeranlagen-hs.de MUSTER` liefert nach 4 Wochen noch Treffer | GSC "Seiten"-Bericht: indexierte URLs = 6–7 |
| 1.2 | **Home-Title/Description ersetzen**: `Toilettenwagen mieten im Westerwald – Daaden & Umgebung` (Description s. content.md) | Page-Type-Mismatch; abgelaufene Promo signalisiert Verwahrlosung | keine | Title in SERP-Snippet nach Recrawl unverändert | GSC-CTR Home |
| 1.3 | **LocalBusiness-JSON-LD reparieren** (Block in schema.md): `openingHoursSpecification` = sichtbare Zeiten, `postalCode: 57567`, `addressCountry: DE`, `geo`, Telefon `+491602743001`, leere `sameAs` entfernen, `@id`, `areaServed`, `priceRange` | Widersprüchliche Daten = kein Vertrauen in die Entity | 1.4 (Name/Telefon final) | Rich-Results-Test zeigt Fehler/Warnungen | 0 Fehler im GSC-Bericht "Strukturierte Daten" |
| 1.4 | **NAP Single Source of Truth**: Handelsregister-Schreibweise (Smécz vs. Smücz, "&"), eine Telefonnummer (Datenschutz nutzt `+4916091633060`!), Tippfehler "Sanitäranalgen" fixen; im Relaunch alles aus `src/lib/site.ts` rendern | Prominenz-Signale (GBP, Citations) matchen nur bei identischem NAP | keine | grep über Build-Output findet > 1 Schreibweise | – |
| 1.5 | **Security-Header** in `next.config.ts` `headers()` bzw. `docker/nginx.conf`: HSTS, X-Content-Type-Options, X-Frame-Options / CSP `frame-ancestors`, Referrer-Policy | Grundhygiene, Vertrauens-/Qualitätssignal | Relaunch-Deploy | `curl -sI` zeigt Header nicht | – |
| 1.6 | **Mobile-Blocker**: Cookie-Banner verkleinern (kein 45 %-Overlay über CTA), horizontalen Scroll auf Toilettenwagen/Kontakt beheben, Telefon + CTA above the fold auf Mobile | Konversion: Nutzer, die nicht anrufen können, ranken nichts hoch | Relaunch-Layout | Mobile-Screenshot 375 px zeigt CTA nicht ohne Scroll | Anfragen/Woche |

## Phase 2 – High (Wochen 1–3, Relaunch-Inhalt)

| # | Maßnahme | Prinzip | Abhängigkeit | Falsifizierbar durch | Indicator |
|---|---|---|---|---|---|
| 2.1 | **Startseite auf ≥ 500 Wörter als lokale Landingpage**: H1 "Toilettenwagen mieten im Westerwald", Liefergebiet-Absatz mit Ortsliste (Daaden, Betzdorf, Kirchen, Wissen, Altenkirchen, Herdorf, Siegen, Hachenburg…), Anlässe (Hochzeit, Vereinsfest, Firmenevent, Stadtfest), 3 Wagen mit Personen-Kapazität + ab-Preis, Telefon/WhatsApp mehrfach | Relevanz = Ort + Leistung im sichtbaren Text | 1.2, 1.4 | Seite < 500 Wörter oder "Westerwald" < 3× | GSC-Impressions Queries mit Ortsnamen |
| 2.2 | **Detailseiten `/toilettenwagen/s|m|l/`** (Titles in content.md) mit Kapazität (Gäste), Maßen, Gewicht, Anschlüssen (Strom/Wasser/Abwasser ≤ 3 m), Preis, Galerie mit Alt-Texten, `Service`+`Offer`-Schema (schema.md) | SERP-Konsens: Modell + Kapazität + Preis | 2.1 | Keine der 3 URLs indexiert nach 6 Wochen | Impressions "Toilettenwagen S/M/L" |
| 2.3 | **Frage-Überschriften + Antwortpassagen** (8 fertige in geo.md: Preise, Gästezahl, Liefergebiet, Anschlüsse, Maße, Vorlaufzeit, Baustellen, Über uns) – als normale H2/H3, **kein FAQPage-Schema** | Zitierfähigkeit für AI Overviews/ChatGPT; PAA-Abdeckung | 2.1 | – | Bing/Perplexity-Test: Firmenname in Antwort? |
| 2.4 | **Alt-Texte für alle Bilder**, sprechende Dateinamen, `next/image` mit `width/height`, Hero als `<img priority>` statt CSS-Background, AVIF/WebP | Images 12/100; CLS; Google Images | Relaunch-Assets (liegen in `public/fotos/`) | Lighthouse: "Images without alt" > 0 | – |
| 2.5 | **Google Business Profile** anlegen/verifizieren (SAB, Adresse verbergen, Servicegebiet setzen), Link in Footer + `sameAs`; Bing Places, Apple Business Connect | Prominenz; Local Pack ist für "mieten + Ort" der halbe SERP | 1.4 | – | GBP-Insights: Aufrufe/Anrufe |
| 2.6 | **Bewertungen einsammeln** (nach jedem Einsatz WhatsApp-Link zur GBP-Bewertung), 3–5 echte Referenzen mit Fotos auf der Site | Vertrauen = schwächste Persona-Dimension | 2.5 | < 5 Bewertungen nach 3 Monaten | Bewertungszahl |
| 2.7 | **"Baustelle"-Positionierung klären**: entweder streichen oder ehrlich als Nische (Richtfest, Baustellenbüro) mit Hinweis auf Abwasseranschluss | Intent-Mismatch zieht falsche Klicks | – | Bounce auf Baustellen-Queries > 80 % | – |
| 2.8 | **Performance im Relaunch**: kein 377-KB-Inline-CSS, `next/font` `display: swap`, `Cache-Control: immutable` für `/_next/static`, Brotli in nginx, LCP-Bild `fetchpriority=high` | CWV-Lab 52 → Ziel ≥ 90 | Relaunch | PageSpeed Mobile < 90 | CrUX nach 28 Tagen (PSI) |

## Phase 3 – Medium (Monat 2, Content & Authority)

| # | Maßnahme | Prinzip | Abhängigkeit |
|---|---|---|---|
| 3.1 | 4–6 Regionsseiten (`/toilettenwagen-mieten/siegen/`, `/betzdorf/`, `/altenkirchen/`, `/hachenburg/`…) mit ≥ 60 % unique Content (Anfahrt, typische Anlässe, lokale Veranstaltungsorte) – **max. 10, sonst Doorway-Risiko** | SERP: WC-Master/curanto ranken mit Liefergebiet-Seiten | 2.1 |
| 3.2 | Anlass-Seiten: Hochzeit (VIP/Luxus-Framing), Vereinsfest (Vereinsrabatt wie STAR), Firmenevent | Intent-Cluster der SERP | 2.2 |
| 3.3 | Über-uns-Seite mit Gründern, Fotos, Handelsregister, Region; `Organization`-Schema | E-E-A-T Experience/Trust | 1.4 |
| 3.4 | Citations Tier 1: Das Örtliche, GelbeSeiten, 11880, mietmeile.de-Inserat, Kleinanzeigen-Inserat (Wettbewerber rankt damit) | Prominenz | 1.4, 2.5 |
| 3.5 | Lokaler Linkaufbau (backlinks.md): Vereine/Sponsoring, Veranstalter, Gemeinden, Partner, Regionalpresse, IHK | Autorität | 3.3 |
| 3.6 | `BreadcrumbList` + `WebSite`-Schema, kontextuelle interne Links (Home → Detailseiten → Kontakt) | Crawl-/Entity-Struktur | 2.2 |
| 3.7 | IndexNow-Key + Submit im Deploy-Script | Bing/Copilot-Aktualität | Relaunch |

## Phase 4 – Laufend (Monitoring)

- **Vor dem Relaunch:** `/seo drift baseline https://www.mobile-sanitaeranlagen-hs.de/` – danach `/seo drift compare` nach Go-Live (Titles, Canonicals, Schema, H1 dürfen nur absichtlich ändern).
- GSC einrichten (Domain-Property), Sitemap einreichen, wöchentlich: Impressions für Queries mit Ortsnamen, Index-Abdeckung = Anzahl echter Seiten.
- Google API-Key in `~/.config/claude-seo/google-api.json` → dann `/seo google` liefert CrUX-Felddaten statt Lab-Schätzung.
- Nach 8 Wochen: `/seo audit` erneut; Ziel ≥ 75.
- Kein `FAQPage`, kein `HowTo` einführen; INP (nicht FID) im Auge behalten.

## Explizit NICHT empfohlen
- `llms.txt` als Priorität (Google ignoriert es; Low)
- Mehr als ~10 Ortsseiten (Doorway-Risiko, Quality Gate 30/50)
- Blockieren von AI-Crawlern (Sichtbarkeit in ChatGPT/Perplexity ist gewünscht)

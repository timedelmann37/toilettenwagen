# SEO-Audit: www.mobile-sanitaeranlagen-hs.de

**Datum:** 18.09.2026 · **Plattform:** WordPress (IONOS) + Ecwid-Widget · **Geschäftstyp:** Local Service / Service-Area-Business (Toilettenwagen-Vermietung, Daaden/Westerwald)
**Kontext:** Diese Seite wird durch den Next.js-Relaunch in `tw-site` (gleiche Domain) abgelöst. Der Audit ist die Baseline der Alt-Seite; jede Empfehlung ist so formuliert, dass sie direkt als Anforderung in den Relaunch übernommen werden kann.
**Umfang:** 7 Content-Seiten + 9 Sitemap-URLs (Ecwid-Demoprodukte). Detailbefunde je Kategorie in `findings/`, Screenshots in `screenshots/`.

---

## Executive Summary

### SEO Health Score: **42 / 100**

| Kategorie | Gewicht | Score | Beitrag |
|---|---|---|---|
| Technical SEO | 22 % | 58 | 12,8 |
| Content Quality (E-E-A-T) | 23 % | 32 | 7,4 |
| On-Page SEO | 20 % | 41 | 8,2 |
| Schema / Structured Data | 10 % | 38 | 3,8 |
| Performance (CWV, Lab) | 10 % | 52 | 5,2 |
| AI Search Readiness (GEO) | 10 % | 40 | 4,0 |
| Images | 5 % | 12 | 0,6 |
| **Gesamt** | | | **42** |

Zusatzkategorien (nicht im Score): Local SEO 22/100 · SXO Gap 35/100 · Backlinks: keine Daten (Domain nicht im Common-Crawl-Graph, keine bezahlten Quellen).

### Das Kernproblem in einem Satz
Die Seite ist für Google **nicht als "Toilettenwagen mieten im Westerwald" erkennbar**: Kein Ort außer "Daaden" (nur im Impressum/Kontakt), das Wort "Westerwald" kommt site-weit **0-mal** vor, die Startseite hat 69 Wörter und einen Title mit seit 80 Tagen abgelaufener Rabattaktion – und die Domain erscheint in keiner der 6 geprüften Ziel-SERPs.

### Top 5 kritische Probleme
1. **Ecwid-Demoprodukte im Index** – 9 "MUSTER-…"-Kleidungsartikel (Sonnenbrille, Kleid, Tanktops) in `wp-sitemap-ecstore-1.xml`, alle HTTP 200, self-canonical, kein noindex, kein Product-Schema, identische Page-ID wie `/shop/`. Branchenfremder Müll auf einer Vermietungsseite – Entity-Verwässerung + Qualitätssignal. *(technical, sitemap, sxo)*
2. **Page-Type-Mismatch der Startseite** – Title "Mobile Sanitäranlagen: 10% Rabatt bis 30.06.2026" statt "Toilettenwagen mieten Westerwald". Kein Ranker nutzt das Vokabular "Mobile Sanitäranlagen"; die SERPs bestehen zu 80–90 % aus lokalen Landingpages mit Ort in Title+H1. *(sxo, content)*
3. **Kaputtes LocalBusiness-JSON-LD auf allen 7 Seiten** – `openingHours` als ungültiges Objekt und **widerspricht** den sichtbaren Öffnungszeiten auf /kontakt/, `postalCode`/`addressCountry` fehlen, `addressRegion: null`, `sameAs` = 7 leere Strings, Koordinaten nicht in `geo`, Telefon nicht E.164. *(schema, local, geo)*
4. **Null Vertrauenssignale** – keine Bewertungen, kein Über-uns, keine Referenzen, kein GBP-Link, keine Social-Profile; NAP mit Tippfehler "Sanitäranalgen" im Impressum, abweichende Telefonnummer in der Datenschutzerklärung, Firmenname in 3 Schreibweisen (Smécz/Smücz/&amp;). *(content, local)*
5. **Images 12/100** – 31 von 34 Bildern ohne `alt`, 3 mit `alt=""`, UUID-Dateinamen, keine `width`/`height` (CLS-Risiko), Hero als CSS-Background, unkomprimierte JPEGs bis 244 KB. *(visual, performance)*

### Top 5 Quick Wins (< 1 Tag)
1. Demo-Produkte im Ecwid-Backend löschen / Shop-Seite entfernen (410) → Sitemap bereinigt sich selbst.
2. Home-Title & -Description tauschen: `Toilettenwagen mieten im Westerwald – Daaden & Umgebung`.
3. JSON-LD reparieren (fertiger Block in `findings/schema.md`) – Öffnungszeiten, PLZ, Land, geo, E.164-Telefon, leere `sameAs` raus.
4. `tel:` / `mailto:` / `wa.me`-Links setzen (aktuell **kein einziger** tel:-Link auf der Site).
5. Security-Header (HSTS, X-Content-Type-Options, X-Frame-Options/CSP frame-ancestors) – im Relaunch zentral in `next.config.ts` `headers()`.

---

## 1. Technical SEO — 58/100
*(Details: `findings/technical.md`)*

**Funktioniert:** HTTP→HTTPS und non-www→www als saubere Single-Hop-301; alle 7 Seiten self-canonical, kein noindex, `lang="de"`, Viewport korrekt; robots.txt minimal & korrekt; SSR-WordPress (Text crawlbar); TTFB ~120 ms.

| Befund | Schwere | Evidenz | Fix |
|---|---|---|---|
| 9 Ecwid-Demoprodukte indexierbar | **Critical** | `wp-sitemap-ecstore-1.xml`, alle 200, self-canonical, kein noindex | Produkte in Ecwid löschen; `/shop/` → 410 oder 301 auf `/unsere-toilettenwagen/`; Ecwid-Sitemap-Modul deaktivieren |
| Keine Security-Header | High | `curl -sI`: kein HSTS, CSP, X-Frame-Options, X-Content-Type-Options | Relaunch: `headers()` in `next.config.ts` bzw. nginx.conf |
| Abgelaufene Promo im Title | High | "10% Rabatt bis 30.06.2026", Audit 18.09.2026 | Title ersetzen (s. On-Page) |
| `/shop/` nur per JS gerendert | High | Roh-HTML: "Ihr Shop-Inhalt wird jetzt geladen…" | Shop entfernen oder SSR/SSG |
| Bilder ohne Dimensionen, Slider lazy via `data-splide-lazy` | High | 31/31 img ohne width/height, LCP-Element JS-abhängig | `next/image` mit expliziten Maßen, Hero mit `priority` |
| IndexNow nicht eingerichtet | Low | kein Key-File | Relaunch: IndexNow-Key + Submit bei Deploy (Bing/Copilot-Sichtbarkeit) |

## 2. Content Quality & E-E-A-T — 32/100
*(Details: `findings/content.md`, inkl. Title/Description-Vorschläge für jede Seite und neue Detailseiten S/M/L)*

- **Thin Content (High):** Home 69 Wörter (Ziel ≥ 500), Toilettenwagen 240 (Ziel ≥ 800), Kontakt 180 (fast nur Formular-Labels), Shop 50. `content_quality.py` flaggt 5 von 6 Textseiten.
- **Keyword-Lücke (High):** "Westerwald" 0×, "Hochzeit"/"Event" 0×, "Baustelle" nur in Meta-Description, "Daaden" nicht auf Home/Toilettenwagen-Seite.
- **Keine Experience-/Authority-Signale (High):** Kein Über-uns, keine Referenzen/Einsätze, keine Bewertungen, keine Fotos vom echten Einsatz.
- **Intent-Mismatch "Baustelle" (High, sxo):** Baustellen-SERP erwartet Kabinen mit Wochenpreis/Online-Buchung; das Produkt ist ein Event-Anhänger mit Pflicht-Abwasseranschluss ≤ 3 m. Entweder ehrlich als Nische ("Baustellen-Büro/Richtfest") oder streichen.
- **NAP-Inkonsistenzen (Medium):** Telefon `+4916091633060` (Datenschutz) vs. `+49 160 2743001`; Tippfehler "Sanitäranalgen" (Impressum H2 + Meta); Firmenname "Smécz" auf der Live-Seite vs. "Smücz" in CONTEXT.md → **Handelsregister-Schreibweise verifizieren, bevor sie im Relaunch hart codiert wird.**
- **Lesbarkeit (Low):** Flesch-Amstad 23–33; Grammatikfehler ("Wählen sie", "2 Herrentoilette"); MwSt-Hinweis 3× wiederholt.

## 3. On-Page SEO — 41/100
*(Details: `findings/content.md` Abschnitt O1–O9)*

- Titles: Home ohne "mieten"/Ort/Marke, `/shop/` = "Shop", Datenschutz = "Ihre Daten geschützt!" (High)
- Meta-Descriptions: Shop fehlt, Home mit Zeilenumbruch, alle < 125 Zeichen (Medium)
- H1 fehlt auf /kontakt/, /agb/, /shop/; zwei versteckte englische IONOS-H3 ("Your web browser is old") auf jeder Seite (Medium)
- Interne Verlinkung nur über Navigation, keine kontextuellen Links (Medium)
- Keine `tel:`/`mailto:`-Links; WhatsApp über `wa.link`-Shortlink (Medium)
- Keine Open-Graph-/Twitter-Tags (Low) — der Relaunch hat sie bereits (`src/lib/metadata.ts`).

**Vorgeschlagene Titles (Auszug, vollständige Tabelle in content.md):**
| URL | Title |
|---|---|
| / | Toilettenwagen mieten im Westerwald – Daaden & Umgebung |
| /unsere-toilettenwagen/ | Unsere Toilettenwagen S, M & L – Ausstattung & Preise |
| /toilettenwagen/s/ (neu) | Toilettenwagen S mieten – 3 WCs, 2 Urinale, ab 175 €/Tag |
| /kontakt/ | Toilettenwagen anfragen – Kontakt & Angebot \| Daaden |

## 4. Schema / Structured Data — 38/100
*(Details + fertiges JSON-LD für Home und Toilettenwagen-Seite: `findings/schema.md`)*

Ein einziger `LocalBusiness`-Block, byte-identisch auf allen 7 Seiten (auch AGB/Datenschutz).
- **Critical:** `openingHours` = `{weekDays:[…], timeFormat:"24"}` (ungültig) und widerspricht /kontakt/ (Mo–Fr 9–13/15–19, Sa 10–16 vs. Schema Mo geschlossen, Sa 14–18).
- **Critical:** `postalCode` und `addressCountry` fehlen, `addressRegion: null`.
- **High:** `latitude`/`longitude` top-level statt `geo: GeoCoordinates`; `logo` relativer IONOS-Pfad; kein `image`.
- **Medium:** `sameAs` = 7 leere Strings; Telefon nicht E.164; kein `areaServed`, `priceRange`, `@id`.
- **Chance:** Kein `Service`/`Offer` für die drei Wagen (175/190/210 € netto/Tag stehen im Klartext), kein `BreadcrumbList`, kein `WebSite`.
- Keine veralteten Typen (kein HowTo/FAQPage) – im Relaunch beibehalten: kein FAQPage für Google-SERP-Vorteil (seit 07.05.2026 kein Rich Result mehr).

## 5. Performance — 52/100 (Lab-Schätzung, kein CrUX)
*(Details: `findings/performance.md`)*

- TTFB ~120 ms – Server ist nicht der Engpass.
- **Critical:** Inline-CSS 240 KB (Home) / 377 KB (Toilettenwagen = 100 % der HTML-Größe) + externe 265 KB `go-x/style.css` **unkomprimiert** ausgeliefert.
- **High:** LCP-Element ohne `fetchpriority="high"`/Preload (nur Logo preloaded); Hero-JPEG bis 244 KB, kein WebP/AVIF.
- **High:** CLS-Risiko – 31/31 Bilder ohne Dimensionen, kein `font-display`.
- Medium: Cache-Header inkonsistent (versionierte Assets 1 Jahr, Upload-Bilder 30 Min).
- INP voraussichtlich unkritisch (kein Third-Party-Tracking, DOM 374/647 Knoten).
- **Relaunch:** `next/image` (AVIF/WebP, Maße), `next/font` mit `display: swap`, `Cache-Control: immutable` für `/_next/static`, Ecwid gar nicht mehr laden.

## 6. Images — 12/100
*(Details + Screenshots: `findings/visual.md`, `screenshots/`)*

- 31 von 34 Bildern ohne `alt`, 3 mit `alt=""` → **0 aussagekräftige Alt-Texte**.
- UUID-Dateinamen (`b59c5dd5-…/image-1366x1024.jpg`) statt `toilettenwagen-l-innen-daaden.webp`.
- Hero als CSS-Background → für Google Images unsichtbar, nicht als LCP priorisierbar.
- **Mobile-UX (Critical):** Cookie-Banner deckt 35–45 % des Viewports ab und liegt über dem CTA; auf /kontakt/ mobil nur WhatsApp-Icon above the fold, Telefon/Adresse unter dem Fold; **horizontaler Scroll** auf /unsere-toilettenwagen/ und /kontakt/ (Splide-Slider/Formular).
- Positiv: Tap-Targets, 16 px Basis-Schrift, keine Überlappungen.

## 7. AI Search Readiness (GEO) — 40/100
*(Details + 8 fertige Frage-Überschriften mit Antwortpassagen: `findings/geo.md`)*

- robots.txt lässt alle AI-Crawler zu (OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended) – kein Handlungsbedarf.
- `llms.txt` 404 – optional, Google nutzt es nicht; niedrige Priorität.
- **High – Zitierfähigkeit:** Auf die Frage "Toilettenwagen mieten Westerwald – Preise, Größen, Kapazität, Lieferradius?" liefert die Seite nur "3 Wagen, ab 175/190/210 € netto, max. 3 m zum Abwasseranschluss". Keine Frage-Überschriften, keine Gästezahl je Wagen, kein Liefergebiet, keine Maße/Strom/Wasser-Anforderungen.
- **High – Entity-Klarheit:** Firmenname in 3 Schreibweisen; kaputtes JSON-LD; einzige externe Entität: Handelsregister HRB 30803 Montabaur.
- **High – Brand Mentions:** Bing liefert 0 Treffer für den Firmennamen; keine GBP/Social/Verzeichnis-Präsenz; einziger ausgehender Link: gmpg.org.
- Plattform-Schätzung: Google AIO ~40 · ChatGPT ~30 · Perplexity ~35 · Copilot ~30.

## 8. Local SEO — 22/100
*(Details, Citation-Liste, NAP-Vergleichstabelle: `findings/local.md`)*

- **Critical:** Keine Service-Area-Inhalte – Westerwald, Siegen, Betzdorf, Altenkirchen, Kirchen, Wissen, Herdorf: 0 Nennungen. Für SABs der wichtigste organische Rankingfaktor (Whitespark 2026).
- **High:** Kein Beleg für ein beanspruchtes Google Business Profile (Maps-Embed hinter Cookie-Wall, ohne place_id); keine Bewertungen; `sameAs` leer.
- **High:** Home und Kernseite ohne Ortsbezug in Title/H1.
- Citations (Tier 1 DE): Google Business Profile, Bing Places, Apple Business Connect, Das Örtliche, GelbeSeiten, 11880, mietmeile.de (rankt für 4 von 6 Queries!), Kleinanzeigen (ein Wettbewerber aus Niederfischbach rankt über ein Inserat).

## 9. Search Experience (SXO) — Gap 35/100
*(Details, SERP-Belege mit URLs, Persona-Scoring, SOLL-Struktur: `findings/sxo.md`)*

- Domain in **keiner** der 6 Ziel-SERPs (Toilettenwagen mieten / … Westerwald / … Siegen / Hochzeit / Baustelle / Sanitärwagen RLP).
- SERP-Konsens der Ranker: Modelle mit WC-Zahl **und Personenkapazität**, ab-Preise, Ortslisten/Liefergebiet, Bewertungen, Anlass-Framing (Hochzeit = VIP/Luxus), FAQ "Wie viele Toiletten brauche ich?", Vereinsrabatt, Telefon/WhatsApp mehrfach.
- Personas: Hochzeitspaar / Vereinsfest-Organisator / Bauleiter → Startseite 23–34/100, Toilettenwagen-Seite 34–56/100; schwächste Dimension überall: **Vertrauen**.
- Wettbewerber: toitoidixi.de, curanto.de, WC-Master (`/liefergebiet/toiletten-mieten-im-westerwald/`), mobile-toilette.de, STAR (Mudersbach), mietmeile, Kleinanzeigen.

## 10. Backlinks — keine Daten
*(Details + lokaler Linkaufbau-Plan: `findings/backlinks.md`)*

Domain nicht im Common-Crawl-Webgraph (`in_crawl: false`) → nicht "geringe Autorität", sondern **nicht gemessen**. Whois-Datum wegen .de-Datenschutz nicht verfügbar. Kein Score vergeben (INSUFFICIENT DATA). Plan: GBP → Verzeichnisse → Vereine/Sponsoring → Veranstalter/Gemeinden → Lieferanten/Partner → Regionalpresse → IHK.

---

## Synthese (PERCEIVE → ANALYZE → VALIDATE → ACT)

**Beobachtung (extern):** Google belohnt für die Zielqueries lokale Landingpages mit Ort in Title/H1, Kapazitäten, Preisen und Bewertungen. **Beobachtung (intern):** Die Seite hat die Fakten (3 Wagen, Preise, Ausstattung), aber ohne Ort, ohne Struktur, ohne Vertrauen, und verwässert die Entity mit Demo-Kleidung.
**Erste Prinzipien:** (1) Google muss die Entity "Toilettenwagen-Vermietung in Daaden/Westerwald" eindeutig erkennen – heute nicht der Fall. (2) Lokale Rankings entstehen aus Relevanz (Ort+Leistung im Text) × Prominenz (GBP, Citations, Bewertungen) × Nähe. Relevanz und Prominenz sind beide ~0.
**Systemzusammenhang:** Die Entity-Reparatur (Demoprodukte weg, NAP vereinheitlichen, JSON-LD fixen, Ort in Titles) ist Voraussetzung für alles Weitere – Content-Ausbau und Citations auf eine inkonsistente Entity zahlen auf nichts ein.
**Falsifizierbarkeit:** Wenn 8 Wochen nach Relaunch + GBP die Domain für "Toilettenwagen mieten Daaden" nicht in den Top 10 ist, ist die Hypothese "Entity + Relevanz reicht für die Nische" widerlegt → dann Prominenz (Bewertungen, Links) als Engpass.
**Leading Indicator:** GSC-Impressions für Queries mit "Westerwald"/"Daaden"/"Siegen" (heute vermutlich 0) – ohne erneuten Audit wöchentlich beobachtbar.

Siehe `ACTION-PLAN.md` für die priorisierte, sequenzierte Umsetzung.

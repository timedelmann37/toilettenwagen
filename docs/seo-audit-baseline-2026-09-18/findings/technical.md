# Technical-SEO-Audit: mobile-sanitaeranlagen-hs.de

Audit-Datum: 2026-09-18 | Geprüfte Domain: https://www.mobile-sanitaeranlagen-hs.de/
Plattform: WordPress (IONOS-Hosting, "GoX"-Pagebuilder-Theme) + Ecwid/IONOS-eCommerce-Widget im `/shop/`.
Methodik: `render_page.py` (raw+auto) für alle 7 Sitemap-Seiten + 1 Demo-Produktseite, `sitemap_discovery.py`, sowie eigene `curl -sI`-Header-Checks auf www/non-www/http/https.

**Gesamt-Technical-Score: 58 / 100**

Hinweis für den Relaunch (Next.js, gleiche Domain): Alle Befunde sind so formuliert, dass sie 1:1 als Anforderungen in die neue Codebasis übernommen werden können.

---

## 1. Crawlability — Score: 75/100 — PASS (mit Einschränkung)

| Befund | Schwere | Evidenz | Fix |
|---|---|---|---|
| robots.txt korrekt erreichbar, blockiert nur `/wp-admin/` (mit Ausnahme für `admin-ajax.php`), Sitemap-Zeile vorhanden | Info | `curl -s https://www.mobile-sanitaeranlagen-hs.de/robots.txt`: `Disallow: /wp-admin/`, `Sitemap: https://www.mobile-sanitaeranlagen-hs.de/wp-sitemap.xml` | Keine Aktion nötig; beim Relaunch identisch beibehalten (statische `robots.txt` im Next.js `public/`-Ordner). |
| Sitemap-Deklaration via `sitemap_discovery.py` **validiert** (nicht nur robots.txt-Behauptung) | Info | `sitemap_discovery.py --json`: `declared` + `found` + `common_path`-Fallback stimmen überein, `wp-sitemap.xml` = `sitemapindex`, `valid: true`, referenziert `wp-sitemap-posts-page-1.xml` (7 Seiten) und `wp-sitemap-ecstore-1.xml` (9 URLs) | Bestätigt in Ordnung. |
| **Sitemap enthält 9 irrelevante Ecwid-DEMO-Produkte** (Kleidung: "MUSTER-Sonnenbrille", "MUSTER-Schwarzes-Kleid" etc.) auf einer Toilettenwagen-Vermietungsseite, alle HTTP 200 und in der Sitemap gelistet | **Critical** | `data/sitemap-urls.txt` (Abschnitt `wp-sitemap-ecstore-1.xml`); `curl -sI` auf `/shop/MUSTER-Sonnenbrille-p812786690/` → `HTTP/1.1 200 OK`; gerendertes `<title>` = nur "Shop", kein `<meta name="description">`, aber **selbstreferenzierender Canonical** und **kein `noindex`** → Seiten sind voll indexierbar | Demo-Produkte im Ecwid-Backend löschen oder deaktivieren, sonst per `noindex` + aus Sitemap ausschließen. Bis zur Bereinigung: Sitemap-Generator (WP oder künftig Next.js) so filtern, dass `MUSTER-*`-Slugs nicht aufgenommen werden. Google Search Console auf Indexierung dieser 9 URLs prüfen und ggf. Entfernungsanfrage stellen. Beim Relaunch: Produktkatalog/Shop-Daten vor Go-Live bereinigen, bevor die neue Sitemap generiert wird. |
| Keine Crawl-Blocker in robots.txt für KI-Crawler (GPTBot, ClaudeBot, PerplexityBot etc.) — weder erlaubt noch verboten, Default-Allow | Info | robots.txt enthält nur einen `User-agent: *`-Block | Falls gewünscht, explizite Regeln für KI-Crawler ergänzen (aktuell neutral, kein Handlungsbedarf). |

---

## 2. Indexability — Score: 52/100 — FAIL

| Befund | Schwere | Evidenz | Fix |
|---|---|---|---|
| **Demo-Produkte indexierbar** (Duplikat von Punkt 1, hier aus Indexability-Sicht) | **Critical** | Canonical = self, `robots` Meta leer, Status 200 → Google kann 9 branchenfremde Kleidungsseiten indexieren und mit "Mobile Sanitäranlagen" assoziieren | Siehe Fix oben; zusätzlich `robots: noindex,follow` setzen, solange die Produkte technisch noch existieren. |
| Alle 7 echten Content-Seiten haben korrekte, **selbstreferenzierende Canonical-Tags** und **kein** `noindex` | Info | `data/summ.py`-Auswertung: `canon` = jeweils exakt die eigene URL bei `/`, `/unsere-toilettenwagen/`, `/kontakt/`, `/shop/`, `/impressum/`, `/agb/`, `/datenschutz/`; `robots: []` überall | Keine Aktion; beim Relaunch beibehalten (`<link rel="canonical">` pro Seite, kein globales noindex). |
| **Homepage-Title enthält abgelaufene Promo** ("Mobile Sanitäranlagen: 10% Rabatt bis **30.06.2026**") — Audit-Datum ist 2026-09-18, Angebot seit ca. 2,5 Monaten abgelaufen | High | `data/summ.py home` → `title: ['Mobile Sanitäranlagen: 10% Rabatt bis 30.06.2026']` | Title umschreiben auf evergreen, keyword-fokussierten Text ohne Datumsangabe, z.B. "Mobile Sanitäranlagen mieten in Daaden \| Toilettenwagen S/M/L". Zeitlich befristete Aktionen nicht in `<title>` hart codieren, sondern dynamisch/CMS-gesteuert mit Ablaufdatum-Logik. |
| **Homepage extrem dünner Content** (69 Wörter, kein Bildmaterial außer Logo, keine internen Links im Fließtext erkennbar) | Medium | `extracted_text` der Homepage: 5 Sätze Fließtext, `imgs: 1` (nur Logo-Bild) | Homepage um Leistungsübersicht (3 Toilettenwagen-Typen mit Links, Trust-Signale, CTA, Bildmaterial) erweitern; aktuell zu dünn für Money-Keywords wie "Toilettenwagen mieten Westerwald". |
| `/shop/`-Seite ohne `<title>`-Differenzierung ("Shop") und **ohne Meta-Description** | High | `data/summ.py shop`: `title: ['Shop']`, `desc: []` | Title/Description setzen, z.B. "Mietartikel & Zubehör – Mobile Sanitäranlagen Daaden"; sofern der Shop nur Demo-Daten enthält, Seite bis zur Befüllung mit echten Produkten auf `noindex` setzen. |
| `/kontakt/`, `/shop/`, `/agb/` haben **kein `<h1>`** | Medium | `data/summ.py`: `h1: []` bei kontakt, shop, agb | Jeweils ein eindeutiges H1 ergänzen (z.B. "Kontakt", "Shop", "Allgemeine Geschäftsbedingungen"). |
| Fehlende `alt`-Attribute: 29/31 Bilder auf `/unsere-toilettenwagen/`, 1/2 auf `/kontakt/` | Medium | `data/summ.py`: `imgs: 31 noalt: 29` bzw. `imgs: 2 noalt: 1` | Alt-Texte für alle Galerie-/Produktbilder ergänzen (Barrierefreiheit + Bilder-SEO). |
| Keine Open-Graph-Tags (`og:title` etc.) auf **keiner** der 7 Seiten | Low | `data/summ.py`: `og: []` bei allen sieben Seiten | OG-Tags (og:title, og:description, og:image, og:type) ergänzen für korrekte Vorschau bei WhatsApp/Facebook-Sharing — relevant, da WhatsApp explizit als Kontaktkanal genutzt wird. |
| Zeichensatz-Encoding-Anomalie in rohem HTML (Umlaute als `�` in Titles/Descriptions bei Skript-Auswertung) | Info | Sichtbar in `data/summ.py`-Output; vermutlich Artefakt der lokalen Regex-Auswertung, nicht zwingend Serverfehler | Im Live-Rendering (Screenshot/Browser) verifizieren, dass `charset=UTF-8` (Header bestätigt UTF-8) korrekt ausgeliefert wird; beim Relaunch UTF-8 ohne BOM sicherstellen. |

---

## 3. Security — Score: 25/100 — FAIL

Header-Check per `curl -sI` gegen die kanonische URL `https://www.mobile-sanitaeranlagen-hs.de/`:

```
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
server: IONOS Webserver
access-control-allow-methods: GET, POST, OPTIONS
access-control-allow-credentials: true
```

| Befund | Schwere | Evidenz | Fix |
|---|---|---|---|
| **Kein `Strict-Transport-Security` (HSTS)** Header | High | Vollständiger Header-Dump oben/`data/page-home.json:headers` enthält keinen HSTS-Eintrag | `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` setzen. Da HTTP→HTTPS-Redirect ohnehin erzwungen wird, HSTS ergänzt den Schutz gegen SSL-Stripping. |
| **Kein `Content-Security-Policy`** Header | High | s.o. | CSP definieren (mind. `default-src 'self'`, mit Ausnahmen für Ecwid-Widget-Domains, Google Fonts falls genutzt, WP-Assets). |
| **Kein `X-Content-Type-Options: nosniff`** | Medium | s.o. | Header ergänzen, verhindert MIME-Sniffing-Angriffe. |
| **Kein `X-Frame-Options`** (Clickjacking-Schutz) | Medium | s.o. | `X-Frame-Options: SAMEORIGIN` oder per CSP `frame-ancestors 'self'` setzen. |
| **Kein `Referrer-Policy`** | Low | s.o. | `Referrer-Policy: strict-origin-when-cross-origin` setzen. |
| **Kein `Permissions-Policy`** | Low | s.o. | Optional ergänzen (z.B. `geolocation=(), camera=()`), insbesondere da Kontaktformular/WhatsApp-Widget evtl. Berechtigungen anfragt. |
| `Access-Control-Allow-Credentials: true` kombiniert mit generischem CORS auf **allen** Antworten (auch 404) — potenziell unnötig offene CORS-Konfiguration | Medium | curl-Header auf `/` und auf 404-Testseite zeigen identische `access-control-allow-*`-Header sitewide | Prüfen, ob CORS mit Credentials wirklich für alle Routen nötig ist (IONOS-Plattform-Default); falls nicht business-kritisch, einschränken auf benötigte Origins. |
| Kein Mixed-Content gefunden (keine `http://`-Ressourcen in HTTPS-Seiten) | Info | Regex-Scan auf `data/page-home.json`: 0 Treffer für `http://` in `src=`/`href=` | Keine Aktion. |
| HTTPS wird korrekt erzwungen (siehe Abschnitt 4) | Info | s.u. | Keine Aktion. |

Für den Next.js-Relaunch: Security-Header zentral über `next.config.js` (`headers()`-Funktion) oder Hosting-Edge-Konfiguration (Vercel/IONOS) setzen — nicht dem Theme/Plugin überlassen.

---

## 4. URL-Struktur & Redirects — Score: 85/100 — PASS

| Befund | Schwere | Evidenz | Fix |
|---|---|---|---|
| HTTP → HTTPS Redirect korrekt (einzelner 301-Hop) | Info | `curl -sI http://www.mobile-sanitaeranlagen-hs.de/` → `301 Moved Permanently`, `Location: https://www.mobile-sanitaeranlagen-hs.de/` | Keine Aktion. |
| non-www → www Redirect korrekt (sowohl http als auch https), einzelner 301-Hop | Info | `curl -sI https://mobile-sanitaeranlagen-hs.de/` und `curl -sI http://mobile-sanitaeranlagen-hs.de/` → beide `301` → `Location: https://www.mobile-sanitaeranlagen-hs.de` | Keine Aktion; identisches Verhalten beim Relaunch beibehalten (eine einzige kanonische Host-Variante, direkter 301 ohne Zwischenschritte). |
| Redirect-Kette non-www→www läuft über **zwei unterschiedliche Server-Stacks** (Apache-Antwort für non-www, dann IONOS Webserver für www) — funktional ok, aber zusätzlicher Hop-Anbieter-Wechsel als Wartungsrisiko | Low | `Server: Apache` bei non-www-Redirects vs. `server: IONOS Webserver` beim finalen www-Host | Beim Relaunch idealerweise Redirect direkt auf Edge/DNS-Ebene lösen (ein Hop, ein Stack), um Redirect-Chain-Risiken zu minimieren. |
| Saubere, sprechende URLs ohne Parameter/IDs bei den 7 Content-Seiten (`/kontakt/`, `/agb/`, `/datenschutz/` etc.) | Info | Sitemap-Liste | Beibehalten. |
| **Hässliche/irrelevante URL-Struktur bei Demo-Produkten**: `/shop/MUSTER-Sonnenbrille-p812786690/` — Muster-Präfix + technische Produkt-ID in der URL, inhaltlich branchenfremd | Medium (verknüpft mit Crawlability/Indexability Critical-Befund) | `data/sitemap-urls.txt` | Mit Bereinigung der Demo-Produkte (siehe oben) erübrigt sich dieser Punkt automatisch. |

---

## 5. Mobile-Friendliness — Score: 70/100 — PASS (mit Einschränkung)

| Befund | Schwere | Evidenz | Fix |
|---|---|---|---|
| Korrektes Viewport-Meta-Tag vorhanden | Info | `<meta name="viewport" content="width=device-width, initial-scale=1">` in `data/page-home.json` | Keine Aktion. |
| Responsive `srcset` bei Bildern vorhanden (mehrere Breakpoints: 320w/455w bzw. 960w/1366w) | Info | Logo-`<img>` und Galerie-`<img>`-Tags mit `srcset`/`data-splide-lazy-srcset` | Keine Aktion. |
| Touch-Target-Größen und tatsächliches Rendering auf Mobilgeräten aus reinem HTML/CSS **nicht abschließend verifizierbar** (kein CSS-Body im Payload analysiert) | Info | Statische Analyse begrenzt auf HTML | Empfehlung: Lighthouse Mobile / PageSpeed Insights Live-Test ergänzend durchführen. |
| Bildergalerie auf `/unsere-toilettenwagen/` nutzt Splide.js mit `data-splide-lazy` **ohne** natives `loading="lazy"`-Attribut als Fallback | Low | `grep` auf `data/page-unsere-toilettenwagen.json`: 0 Treffer für `loading=` bei 31 `<img>`-Tags | Natives `loading="lazy"` zusätzlich zum JS-Lazy-Loading setzen, falls JS deaktiviert/langsam lädt. |

---

## 6. Core Web Vitals (Quellcode-Indizien) — Score: 45/100 — FAIL

| Befund | Schwere | Evidenz | Fix |
|---|---|---|---|
| **Keine `width`/`height`-Attribute auf allen 31 Galerie-Bildern** von `/unsere-toilettenwagen/` (der Content-reichsten Seite) | High (CLS-Risiko) | Regex-Scan `data/page-unsere-toilettenwagen.json`: `total 31, no width/height 31` | `width`/`height` (oder `aspect-ratio` per CSS) auf jedem `<img>` setzen, um Layout-Shifts beim Laden zu verhindern — besonders kritisch, da die Galerie vermutlich above-the-fold sitzt. |
| Slideshow-Bilder werden über `data-splide-lazy` statt `src` ausgeliefert → **das potenzielle LCP-Element ist von JS-Ausführung abhängig**, nicht sofort im initialen HTML sichtbar | High (LCP-Risiko) | `<img class="image-gallery-img-slideshow" ... data-splide-lazy="...image-1366x1024.jpg" ...>` ohne `src`, aus `data/page-unsere-toilettenwagen.json` | Für das erste (above-the-fold) Slide-Bild ein natives `src` (ggf. mit `fetchpriority="high"`) statt reinem JS-Lazy-Attribut verwenden, damit der Browser das LCP-Bild ohne JS-Wartezeit laden kann. |
| Homepage-Logo-`<img>` ohne `width`/`height`-Attribute | Medium (CLS-Risiko, kleiner Impact) | `data/page-home.json`: `<img src="...image-455x161.png" srcset="...">` ohne `width=`/`height=` | Explizite Dimensionen ergänzen. |
| `/shop/`-Seite liefert im initialen HTML nur Platzhaltertext ("Ihr Shop-Inhalt wird jetzt geladen …") — vollständiger Produktinhalt entsteht erst nach Ecwid-Widget-Ausführung → **verzögerter/JS-abhängiger LCP** auf dieser Seite | High | `extracted_text` aus `data/page-shop.json`: "Ihr Shop-Inhalt wird jetzt geladen ..."; `mode_used: raw` bestätigt, dass ohne JS-Rendering kein Produktinhalt sichtbar ist | Siehe Abschnitt 8 (JS-Rendering) — SSR/Prerendering für Produktinhalte erwägen, zumindest ein Skeleton mit fixen Dimensionen zur CLS-Vermeidung. |
| Kopfbereich der Homepage ohne render-blockierende Scripts (0 blockierende `<script>` ohne async/defer im `<head>`), 2 Stylesheets im `<head>` | Info (positiv) | Regex-Scan `data/page-home.json`: `blocking scripts in head: 0`, `stylesheets in head: 2` | Keine Aktion; 2 Stylesheets sind unkritisch. |
| Kein `X-Robots-Tag`, keine offensichtlichen render-blockierenden Web-Fonts (kein Google Fonts Link gefunden) auf Homepage | Info | `google fonts links: 0` | Keine Aktion; falls Web-Fonts anderweitig eingebunden sind (@font-face/self-hosted), `font-display: swap` sicherstellen. |
| Feldmessungen (echte CrUX-Daten für LCP/INP/CLS) liegen **nicht** vor — Google API/PageSpeed Insights nicht konfiguriert | Info | Laut CONTEXT.md: "Google API creds: NOT configured" | Für belastbare CWV-Zahlen PageSpeed Insights / CrUX-Dashboard/Search Console separat prüfen; diese Analyse basiert nur auf Quellcode-Indizien. |

---

## 7. Structured Data — Score: 65/100 — PASS (mit Lücken)

| Befund | Schwere | Evidenz | Fix |
|---|---|---|---|
| `LocalBusiness` + `PostalAddress` JSON-LD sitewide auf allen 7 Content-Seiten vorhanden und valide (1 Block, 780 Bytes) | Info | `data/summ.py`-Output aller 7 Seiten: `sd types: [['LocalBusiness', 'PostalAddress']]` durchgängig | Sehr gut für ein Local-Service-Business; beim Relaunch beibehalten und um `openingHoursSpecification`, `areaServed`, `priceRange` erweitern falls noch nicht enthalten (aus den vorliegenden Daten nicht im Detail einsehbar, nur Typen extrahiert). |
| Auch die Demo-Produktseite trägt nur `LocalBusiness`-Schema, **kein** `Product`-Schema, obwohl es sich um eine Ecwid-Produktseite handelt | Low | `data/demo_product.json`-Auswertung (render_page.py, mode never): `sd types: [['LocalBusiness', 'PostalAddress']]`, keine `Product`/`Offer`-Typen | Nach Bereinigung der Demo-Produkte für echte Shop-Artikel `Product`/`Offer`-Schema ergänzen. |
| Keine `BreadcrumbList`, `FAQPage`, `Service` oder `Organization`-Schemas erkennbar | Low | Kein weiterer Block-Typ in allen geprüften JSON-LD-Auswertungen | `Service`-Schema pro Toilettenwagen-Typ (S/M/L) und `BreadcrumbList` auf Unterseiten ergänzen für reichere SERP-Darstellung. |

---

## 8. JavaScript-Rendering — Score: 55/100 — FAIL (für den Shop-Bereich)

| Befund | Schwere | Evidenz | Fix |
|---|---|---|---|
| 6 der 7 Content-Seiten sind **serverseitig vollständig gerendert** (klassisches WordPress-HTML, kein SPA-Shell) | Info | `render_page.py` erkennt `is_spa: False`, `mode_used: raw` für home, kontakt, unsere-toilettenwagen etc.; vollständiger Text in `extracted_text` ohne JS nötig | Keine Aktion; sehr crawler-freundlich. |
| **`/shop/` liefert im rohen HTML keinen Produktinhalt**, sondern nur den Ladehinweis "Ihr Shop-Inhalt wird jetzt geladen …" — vollständiger Produktkatalog wird erst per Ecwid-JS-Widget nachgeladen (`ecwid-productBrowser`-Div im HTML, aber keine Produktdaten/Titel im Rohmarkup) | High | `data/page-shop.json`: `extracted_text` = Ladehinweis; `'ecwid-productBrowser' in c` = True, aber `'MUSTER' in c` = False (Produktnamen fehlen im Rohmarkup) | Für bessere Indexierbarkeit: entweder Ecwid-SEO-Modus mit serverseitig gerendertem Produkt-Snapshot aktivieren (Ecwid bietet einen "SEO Pages"/Prerendering-Modus), oder beim Next.js-Relaunch den Produktkatalog per SSR/SSG statt reinem Client-Widget ausliefern. Aktuell besteht das Risiko, dass Google zwar rendert (Googlebot kann JS ausführen), aber andere Crawler/Preview-Tools (Bing, Social-Sharing-Bots, KI-Crawler wie GPTBot/ClaudeBot) den Produktinhalt nicht sehen. |
| `sitemap_discovery.py`/Sitemap selbst listet die Demo-Produkt-URLs korrekt mit Datum — technisch valide XML, das eigentliche Problem ist der Inhalt (siehe Abschnitt 1/2), nicht das Rendering | Info | `data/sitemap-urls.txt` | — |
| Keine Konsolenfehler bei den raw-gerenderten Seiten protokolliert (da kein Playwright-Lauf nötig war) | Info | `console_errors: []`, `render_diagnostics: []` bei allen geprüften Seiten | Für den Shop-Bereich einen erzwungenen Playwright-Lauf (`--mode always`) mit Konsolen-Check empfehlen, um Ecwid-Ladefehler zu erkennen. |

---

## 9. IndexNow-Protokoll — Score: 0/100 — FAIL

| Befund | Schwere | Evidenz | Fix |
|---|---|---|---|
| Kein IndexNow-Key-File auffindbar, keine Erwähnung von IndexNow im HTML/Head der Homepage | Medium | `curl -s -o /dev/null -w "%{http_code}" https://www.mobile-sanitaeranlagen-hs.de/indexnow.txt` → `404`; `curl -s .../ | grep -i indexnow` → keine Treffer | IndexNow ist für WordPress unkompliziert über ein Plugin (z.B. "IndexNow" oder Yoast-Integration) nachrüstbar und pusht neue/aktualisierte URLs sofort an Bing, Yandex und Naver statt auf den nächsten Crawl zu warten. Besonders relevant, sobald die Demo-Produkte durch echte Inhalte ersetzt werden — dann sollte die Änderung sofort an IndexNow gemeldet werden. Beim Next.js-Relaunch: IndexNow-Ping direkt in die Deploy-Pipeline (z.B. bei jedem neuen/geänderten Static-Path) integrieren. |

---

## Priorisierte Maßnahmenliste

1. **Critical** — Demo-Produkte (9 Kleidungsartikel) aus Sitemap und Index entfernen (löschen im Ecwid-Backend oder `noindex` + Sitemap-Ausschluss). Betrifft Crawlability + Indexability.
2. **High** — Sicherheits-Header setzen: HSTS, CSP (Security-Score aktuell 25/100).
3. **High** — Homepage-Title mit abgelaufener Promo ("bis 30.06.2026") austauschen.
4. **High** — `/shop/`-Title und Meta-Description ergänzen; Produktinhalt SSR/prerendern statt reinem Client-Widget.
5. **High** — `width`/`height` auf allen Bildern setzen (CLS), erstes Galerie-Bild ohne JS-Abhängigkeit laden (LCP).
6. **Medium** — Fehlende `alt`-Texte (29 von 31 auf `/unsere-toilettenwagen/`), fehlende H1 auf 3 Seiten, X-Content-Type-Options/X-Frame-Options-Header.
7. **Medium** — IndexNow-Integration einrichten.
8. **Low** — Open-Graph-Tags, Referrer-Policy/Permissions-Policy, Product/Breadcrumb-Schema, natives `loading="lazy"` als Fallback.

---

## Kategorie-Scores im Überblick

| Kategorie | Score | Status |
|---|---|---|
| Crawlability | 75/100 | PASS (mit Einschränkung durch Demo-Produkte) |
| Indexability | 52/100 | FAIL |
| Security | 25/100 | FAIL |
| URL-Struktur & Redirects | 85/100 | PASS |
| Mobile | 70/100 | PASS (mit Einschränkung) |
| Core Web Vitals (Indizien) | 45/100 | FAIL |
| Structured Data | 65/100 | PASS (mit Lücken) |
| JavaScript-Rendering | 55/100 | FAIL (Shop-Bereich) |
| IndexNow | 0/100 | FAIL |
| **Gesamt** | **58/100** | — |

---

### Verwendete Quellen/Rohdaten
- `C:\Users\timed\tmp\mobile-sanitaeranlagen-hs.de-audit\data\page-*.json` (render_page.py-Output je Seite)
- `C:\Users\timed\tmp\mobile-sanitaeranlagen-hs.de-audit\data\sitemap-discovery.json`, `sitemap-urls.txt`
- Live `curl -sI`-Checks gegen https/http, www/non-www (2026-09-18, 11:33 UTC)
- Live `render_page.py --mode never` gegen eine Demo-Produktseite (zur Titel/Canonical-Verifikation)

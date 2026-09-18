# Sitemap-Audit — https://www.mobile-sanitaeranlagen-hs.de/

Audit-Datum: 2026-09-18 · Quelle: `wp-sitemap.xml` (WordPress-Core-Sitemap) → `wp-sitemap-posts-page-1.xml` + `wp-sitemap-ecstore-1.xml` (Ecwid/IONOS eCommerce-Widget)

## Score: 48 / 100

Die technische Sitemap-Struktur selbst (Index → zwei Teil-Sitemaps, gültiges XML, robots.txt-Verweis) ist einwandfrei und die 7 "echten" Unternehmensseiten sind vollständig und 1:1 mit den intern verlinkten Seiten abgedeckt. Der Score wird jedoch stark durch einen **High-Severity-Befund** belastet: 9 von 16 gelisteten URLs (56 %) sind Ecwid-Demo-Produkte ("MUSTER-…"-Bekleidung), die mit dem Kerngeschäft (Toilettenwagen-Vermietung) nichts zu tun haben, aber indexierbar mit HTTP 200 im Sitemap stehen.

---

## 1. Format- und Strukturprüfung

| Check | Ergebnis | Befund |
|---|---|---|
| robots.txt verweist auf Sitemap | ✅ Pass | `Sitemap: https://www.mobile-sanitaeranlagen-hs.de/wp-sitemap.xml`, kein `Disallow` auf `/shop/` |
| `wp-sitemap.xml` ist gültiger `sitemapindex` | ✅ Pass | Wohlgeformtes XML, `Content-Type: application/xml`, HTTP 200 |
| Zwei referenzierte Teil-Sitemaps erreichbar | ✅ Pass | `wp-sitemap-posts-page-1.xml` (7 URLs) und `wp-sitemap-ecstore-1.xml` (9 URLs), beide HTTP 200, gültiges `urlset` |
| Größenlimits (≤50.000 URLs / ≤50 MB) | ✅ Pass | 16 URLs gesamt — weit unter dem Limit; kein Splitting nötig |
| Deprecated Tags `priority`/`changefreq` | ℹ️ Info | Beide Teil-Sitemaps enthalten `<changefreq>daily</changefreq>`; `wp-sitemap-ecstore-1.xml` zusätzlich `<priority>0.6</priority>`. Google ignoriert beide Felder vollständig — kein Schaden, aber unnötiger Ballast. **Fix:** beim Relaunch weglassen. |

## 2. `lastmod`-Plausibilität

**Befund: Niedrig (Low)**

- Alle 7 Seiten in `wp-sitemap-posts-page-1.xml` tragen **identische** `lastmod`-Zeitstempel im Sekundenabstand: `2026-06-30T21:26:11+00:00` bis `…:12+00:00`.
- Alle 9 Ecwid-Demo-Produkte tragen ebenfalls einen **identischen** Zeitstempel: `2026-01-30T11:12:29+00:00`.
- Format ist valides W3C-Datetime (ISO 8601 mit Zeitzone) — syntaktisch korrekt.
- Inhaltlich aber **nicht plausibel**: Die Werte stammen offensichtlich aus einem einmaligen Bulk-Vorgang (z. B. Theme-/Plugin-Update, Ecwid-Sync-Job) und nicht aus echten inhaltlichen Änderungen der einzelnen Seiten. `/agb/` (Rechtstext) und `/` (Startseite mit Rabatt-Aktion) ändern sich inhaltlich zu völlig unterschiedlichen Zeitpunkten — ein gemeinsamer `lastmod` auf die Sekunde ist ein klares Signal für automatisch generierte, nicht kuratierte Zeitstempel.
- **Risiko:** Gering. Google nutzt `lastmod` nur als schwaches Crawl-Priorisierungssignal und verlangt inzwischen explizit "genau und zuverlässig" — pauschal identische Werte werden im Zweifel ignoriert, führen aber nicht zu einer Abstrafung.
- **Fix:** Beim Relaunch `lastmod` aus dem tatsächlichen CMS-Änderungsdatum der jeweiligen Seite generieren (z. B. `updatedAt` aus dem Next.js-Content-Layer), nicht pauschal beim Build.

## 3. Coverage: Crawl vs. Sitemap

**Befund: Pass** (für die WordPress-Seiten)

Abgleich der intern verlinkten Seiten (Navigation/Footer, aus `data/page-*.json`) gegen `wp-sitemap-posts-page-1.xml`:

| Seite | Intern verlinkt | Im Sitemap | Status |
|---|---|---|---|
| `/` | ✅ | ✅ | OK |
| `/unsere-toilettenwagen/` | ✅ | ✅ | OK |
| `/kontakt/` | ✅ | ✅ | OK |
| `/shop/` | ✅ | ✅ | OK |
| `/impressum/` | ✅ | ✅ | OK |
| `/agb/` | ✅ | ✅ | OK |
| `/datenschutz/` | ✅ | ✅ | OK |

- Keine fehlenden Seiten (in Crawl, aber nicht im Sitemap).
- Keine "Extra"-Seiten unter den 7 WordPress-Seiten (alle geprüft, alle HTTP 200, kein Redirect, kein Noindex — `meta name="robots" content="max-image-preview:large"` überall, also indexierbar).
- **Wichtig für den Coverage-Abgleich der Ecwid-Sektion:** Keine der 9 "MUSTER-…"-Produkt-URLs ist von irgendeiner gecrawlten Seite aus verlinkt (Navigation, Footer, `/shop/`-Seite selbst, `/unsere-toilettenwagen/`) — auch nicht nach JS-Rendering des Ecwid-Widgets. Das sind **komplett verwaiste (orphaned) Sitemap-only-URLs**, die ausschließlich über das Sitemap-Signal auffindbar sind.

## 4. Hauptbefund: 9 Ecwid-Demo-Produkte im Sitemap

**Befund: HOCH (High) — größter Einzelbefund dieses Audits**

### Evidenz

- `wp-sitemap-ecstore-1.xml` listet 9 URLs unter `/shop/MUSTER-*-p8127866XX/`, u. a. `MUSTER-Sonnenbrille`, `MUSTER-Schwarzes-Kleid`, `MUSTER-Boardshorts`, `MUSTER-Weisses-Tanktop` — Bekleidungs-/Accessoires-Beispielprodukte, die offensichtlich mit der Ecwid-Testinstallation mitgeliefert wurden und nie entfernt wurden.
- Alle 9 URLs antworten mit **HTTP 200** (verifiziert per `fetch_page.py`/`render_page.py`), sind **nicht** durch `robots.txt` blockiert, tragen **kein** `noindex` (`meta name="robots" content="max-image-preview:large"` — reine Snippet-Steuerung, kein Indexierungsausschluss) und haben einen **self-referenzierenden** `<link rel="canonical">` (z. B. auf `MUSTER-Sonnenbrille-p812786690/` selbst) → aus Google-Sicht **vollständig indexierbare, eigenständige URLs**.
- Server-seitig (ohne JS) liefern alle 9 URLs exakt denselben generischen HTML-Shell wie `/shop/` selbst: `<title>Shop</title>`, keine Meta-Description, **und dieselbe WordPress-Page-ID (`wp-json/wp/v2/pages/302`)** wie die reguläre `/shop/`-Seite — d. h. WordPress/Ecwid routet alle Produkt-Permalinks technisch auf die gleiche Shop-Seite und lässt Ecwid die Produktdetails nur clientseitig per JavaScript nachladen.
- Beim JS-Rendering (`render_page.py --mode always`) wird auf keiner geprüften MUSTER-URL echter Produktinhalt extrahiert — `extracted_text` enthält ausschließlich den Cookie-/Übersetzungs-Consent-Hinweis, dazu ein `console_errors: ["Failed to load resource: net::ERR_FAILED"]`. Das strukturierte Schema auf der Seite ist nur das globale `LocalBusiness`/`PostalAddress`-Schema, **kein** `Product`-Schema.
- **Folge:** Aus Sicht eines Crawlers (und potenziell auch eines Nutzers, der über eine dieser URLs aus der Google-Suche landet) sind das 9 nahezu inhaltsgleiche, thematisch komplett branchenfremde Seiten mit generischem Titel "Shop" — auf einer Website, deren gesamtes Geschäftsmodell die Vermietung mobiler Toilettenwagen ist.

### Risikobewertung

1. **Thin/Duplicate-Content-Risiko:** 9 Seiten mit identischem Titel "Shop", ohne Meta-Description, ohne für Crawler sichtbaren Produktinhalt → klassisches Muster für algorithmische Qualitätsabwertung (vergleichbar mit dem "Doorway-Page"-Mechanismus, nur hier durch technisches Versehen statt Absicht ausgelöst).
2. **Themenrelevanz/Trust:** Google bewertet die thematische Kohärenz einer Domain. Bekleidungs-Musterprodukte auf einer B2B-Vermietungsseite für Baustellen-/Event-Sanitäranlagen sind ein starkes Fehlsignal für die Themenzuordnung der Domain und können die Relevanzbewertung der *eigentlichen* Seiten (Toilettenwagen-Vermietung) verwässern.
3. **Crawl-Budget:** Bei nur 16 URLs insgesamt aktuell vernachlässigbar, aber ein schlechtes Vorbild für den Relaunch, falls ein echter Produktkatalog wächst.
4. **Nutzerverwirrung/Markenschaden:** Falls diese URLs (z. B. über Bild- oder Universalsuche) tatsächlich Impressionen/Klicks erhalten, landen Nutzer auf einer für sie unverständlichen Seite ("Sonnenbrille" auf einer Toilettenwagen-Website) → negatives Nutzersignal, hohe Absprungrate.
5. Kein Hard-Stop nach dem Location-Page-Gate (das betrifft programmatische Standortseiten, hier nicht einschlägig), aber das zugrunde liegende Prinzip — programmatisch/automatisch erzeugte Seiten ohne echten Mehrwert im großen Maßstab im Sitemap zu listen — ist identisch anwendbar und rechtfertigt die High-Einstufung.

### Exakter Fix (in Prioritätsreihenfolge)

1. **Ecwid-Backend bereinigen (Ursache beheben):** Im Ecwid-Control-Panel (IONOS eCommerce-Widget-Verwaltung) die 9 Demo-/Musterprodukte ("MUSTER-…") vollständig löschen. Das ist die einzige Maßnahme, die auch die URLs selbst verschwinden lässt (→ HTTP 404/410 statt 200) und damit das Problem an der Wurzel löst.
2. **Bis zur Bereinigung / für alle nicht löschbaren Testartikel:** In Ecwid product visibility auf "verborgen"/"nicht im Shop sichtbar" setzen — Ecwid entfernt sichtbare Produkte i. d. R. automatisch auch aus dem generierten Sitemap-Feed.
3. **Sitemap-seitig absichern:** Sicherstellen, dass `wp-sitemap-ecstore-1.xml` nach der Bereinigung keine der 9 URLs mehr enthält (Cache/Regenerierung des WP-Sitemap-Endpunkts prüfen — WordPress-Core-Sitemaps aktualisieren sich normalerweise automatisch bei Post-Änderungen, bei Ecwid-Produkten hängt das vom Sync-Mechanismus ab).
4. **Falls Löschung technisch nicht sofort möglich ist:** `<meta name="robots" content="noindex">` auf den 9 URLs setzen **und** sie aus der Sitemap entfernen (Sitemap sollte nie noindexte URLs enthalten — Tabellenregel "Noindexte URLs: High/Aus Sitemap entfernen"). Anschließend über Google Search Console eine Entfernungsanfrage/Neu-Crawling für diese URLs anstoßen, sofern sie bereits indexiert wurden.
5. **Für den Relaunch (Next.js, gleiche Domain):** Sitemap-Generierung ausschließlich aus einer kuratierten Content-/Produktquelle ableiten (z. B. Next.js `sitemap.ts`/`next-sitemap` mit expliziter Route-Liste), **nicht** aus einem automatischen Shop-Plugin-Export ungeprüft übernehmen. Falls ein echter Online-Shop/Katalog für Zubehör geplant ist, jedes Produkt vor Aufnahme in die Sitemap manuell freigeben.

## 5. Rechtliche Seiten (Impressum, AGB, Datenschutz) im Sitemap

**Befund: Info (kein Handlungsbedarf, aber Einordnung)**

- Alle drei Seiten sind aktuell im Sitemap enthalten, indexierbar (kein `noindex`), technisch fehlerfrei (HTTP 200).
- **Das ist unproblematisch und muss nicht geändert werden.** Google straft die Aufnahme rechtlich vorgeschriebener Seiten (Impressum-Pflicht nach § 5 TMG/DDG) nicht ab; da `priority`/`changefreq` ohnehin ignoriert werden, hat ihre Präsenz im Sitemap keine negativen Rankingeffekte auf die übrigen Seiten.
- Einzige Beobachtung: `/impressum/` hat nur 50 Wörter Inhalt und `/agb/` keine `<h1>` — das ist ein reines Content-/On-Page-Thema (nicht Gegenstand dieses Sitemap-Audits, ggf. an den Content-/On-Page-Auditor weiterreichen).
- **Empfehlung für den Relaunch:** Impressum, Datenschutz und AGB weiterhin regulär im Sitemap führen (Standardvorgehen, kein Ausschluss nötig). Falls gewünscht, können sie mit niedrigerer Priorität im internen Linking (Footer statt Hauptnavigation) behandelt werden — das ist aber eine IA-Entscheidung, keine Sitemap-Pflicht.

## 6. Bild-Sitemap — sinnvoll?

**Befund: Info — aktuell nicht erforderlich**

- Die Website ist eine kleine Local-Service-Seite (7 Seiten) ohne Bildergalerie-Traffic-Strategie; `/unsere-toilettenwagen/` hat laut Crawl 31 Bilder, davon 29 **ohne** `alt`-Attribut (separates On-Page-Problem).
- Eine dedizierte `image-sitemap.xml` bringt nur Mehrwert, wenn (a) Bilder nennenswerten Traffic über Google Bildersuche generieren sollen und (b) Bilder sonst technisch schwer auffindbar sind (z. B. Lazy-Loading/JS-only, CDN-Subdomain ohne Verlinkung von HTML-Seiten aus). Beides trifft hier nicht in relevantem Umfang zu — die Bilder sind normale `<img>`-Tags auf regulär indexierten, verlinkten Seiten.
- **Empfehlung:** Keine separate Bild-Sitemap für den Relaunch aufsetzen. Stattdessen zuerst die fehlenden `alt`-Texte ergänzen (Voraussetzung für jede Bild-SEO-Wirkung). Falls beim Relaunch eine echte Foto-Galerie der drei Toilettenwagen-Modelle mit Mehrwert für die Bildersuche entsteht (z. B. Innenraum-Fotos, die potenzielle Mieter aktiv googeln), dann `<image:image>`-Erweiterungen innerhalb der bestehenden URL-Einträge nutzen statt einer komplett separaten Sitemap-Datei.

---

## Zusammenfassung nach Schweregrad

| Schweregrad | Befund | Anzahl betroffener URLs |
|---|---|---|
| 🔴 Hoch | Ecwid-Demo-Produkte ("MUSTER-…") indexierbar im Sitemap, thematisch branchenfremd, Duplicate-Title, kein echter Inhalt für Crawler sichtbar | 9 / 16 |
| 🟡 Niedrig | Identische `lastmod`-Werte pro Teil-Sitemap (nicht inhaltlich verifiziert) | 16 / 16 |
| ⚪ Info | `priority`/`changefreq` gesetzt, von Google ignoriert | 16 / 16 |
| ⚪ Info | Rechtliche Seiten im Sitemap — unproblematisch, kein Handlungsbedarf | 3 / 16 |
| ⚪ Info | Keine Bild-Sitemap vorhanden — aktuell auch nicht nötig | — |
| ✅ Pass | XML-Format, Größenlimits, robots.txt-Verweis, Coverage der 7 Kernseiten | — |

---

## Empfohlene Ziel-Sitemap für den Relaunch (gleiche Domain, Next.js)

Basierend auf den aktuell werthaltigen Kernseiten, ohne die Ecwid-Altlasten:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.mobile-sanitaeranlagen-hs.de/</loc>
    <lastmod>2026-09-18</lastmod>
  </url>
  <url>
    <loc>https://www.mobile-sanitaeranlagen-hs.de/unsere-toilettenwagen/</loc>
    <lastmod>2026-09-18</lastmod>
  </url>
  <url>
    <loc>https://www.mobile-sanitaeranlagen-hs.de/kontakt/</loc>
    <lastmod>2026-09-18</lastmod>
  </url>
  <url>
    <loc>https://www.mobile-sanitaeranlagen-hs.de/impressum/</loc>
    <lastmod>2026-09-18</lastmod>
  </url>
  <url>
    <loc>https://www.mobile-sanitaeranlagen-hs.de/datenschutz/</loc>
    <lastmod>2026-09-18</lastmod>
  </url>
  <url>
    <loc>https://www.mobile-sanitaeranlagen-hs.de/agb/</loc>
    <lastmod>2026-09-18</lastmod>
  </url>
</urlset>
```

Hinweise zur Zielliste:
- **`/shop/` bewusst weggelassen**, bis geklärt ist, ob der Relaunch überhaupt einen Ecwid-Shop übernimmt. Falls ja: nur mit bereinigtem, echtem Produktkatalog erneut aufnehmen (kein automatischer Ecwid-Sitemap-Export ohne Review).
- Falls die drei Toilettenwagen-Modelle (S/M/L) im Relaunch eigene Unterseiten bekommen (z. B. `/unsere-toilettenwagen/toilettenwagen-s/`), diese als zusätzliche `<url>`-Einträge mit echtem, individuellem Inhalt ergänzen.
- `lastmod` sollte automatisiert aus dem tatsächlichen Content-Änderungsdatum generiert werden (z. B. `next-sitemap` mit `lastmod: page.updatedAt`), nicht als fixer Build-Zeitstempel für alle URLs.
- `priority`/`changefreq` nicht mit ausgeben (von Google ignoriert, Ballast).
- Sitemap-Generierung sollte an eine "published/indexierbar"-Flag im CMS/Content-Layer koppeln, damit nie wieder unkuratierte Fremd-/Testinhalte automatisch in die Sitemap gelangen.

---

## Strukturierte Befunde (für audit-data.json)

```json
{
  "category": "Sitemap",
  "url": "https://www.mobile-sanitaeranlagen-hs.de/wp-sitemap.xml",
  "score": 48,
  "findings": [
    {
      "id": "sitemap-ecwid-demo-products",
      "severity": "high",
      "title": "9 Ecwid-Demo-Produkte (MUSTER-…) indexierbar im Sitemap",
      "evidence": "wp-sitemap-ecstore-1.xml listet 9 URLs unter /shop/MUSTER-*-p8127866XX/, alle HTTP 200, self-canonical, kein noindex, kein robots.txt-Block, generischer Titel 'Shop' (identisch mit page-id 302 = /shop/), kein Product-Schema, extracted_text nach JS-Rendering nur Cookie-Consent-Hinweis, keine interne Verlinkung (orphaned).",
      "fix": "Demo-Produkte im Ecwid-Backend löschen oder auf 'nicht sichtbar' setzen; bis dahin noindex setzen und aus Sitemap entfernen; Sitemap-Generierung an kuratierte Produktfreigabe koppeln.",
      "affected_urls": 9
    },
    {
      "id": "sitemap-identical-lastmod",
      "severity": "low",
      "title": "Identische lastmod-Werte pro Teil-Sitemap",
      "evidence": "Alle 7 WordPress-Seiten: 2026-06-30T21:26:11/12+00:00; alle 9 Ecwid-Produkte: 2026-01-30T11:12:29+00:00 — Bulk-Zeitstempel statt echter Änderungsdaten.",
      "fix": "lastmod aus tatsächlichem Content-Änderungsdatum je Seite generieren.",
      "affected_urls": 16
    },
    {
      "id": "sitemap-deprecated-tags",
      "severity": "info",
      "title": "priority/changefreq gesetzt (von Google ignoriert)",
      "evidence": "changefreq=daily in beiden Teil-Sitemaps, priority=0.6 zusätzlich in wp-sitemap-ecstore-1.xml.",
      "fix": "Beim Relaunch weglassen.",
      "affected_urls": 16
    },
    {
      "id": "sitemap-legal-pages",
      "severity": "info",
      "title": "Rechtliche Seiten (Impressum/AGB/Datenschutz) im Sitemap — unproblematisch",
      "evidence": "Alle drei indexierbar, HTTP 200, kein negativer Effekt zu erwarten.",
      "fix": "Kein Handlungsbedarf; im Relaunch beibehalten.",
      "affected_urls": 3
    },
    {
      "id": "sitemap-image-sitemap-not-needed",
      "severity": "info",
      "title": "Keine Bild-Sitemap vorhanden — aktuell nicht erforderlich",
      "evidence": "Bilder sind normale, verlinkte <img>-Tags auf indexierten Seiten; Haupthürde ist fehlender alt-Text (29/31 Bilder ohne alt auf /unsere-toilettenwagen/), nicht fehlende Auffindbarkeit.",
      "fix": "Erst alt-Texte ergänzen; Bild-Sitemap nur bei echter Bildersuche-Strategie mit <image:image>-Erweiterung statt separater Datei.",
      "affected_urls": 0
    },
    {
      "id": "sitemap-coverage-core-pages",
      "severity": "pass",
      "title": "Coverage der 7 Kernseiten vollständig und korrekt",
      "evidence": "Alle intern verlinkten WordPress-Seiten sind 1:1 im Sitemap enthalten, keine fehlenden oder zusätzlichen URLs, keine Redirects/Noindex.",
      "fix": null,
      "affected_urls": 7
    }
  ]
}
```

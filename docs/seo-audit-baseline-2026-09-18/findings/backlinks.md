# Backlink-Profil-Analyse — mobile-sanitaeranlagen-hs.de

**Datum:** 2026-09-18
**Verfuegbare Quellen (Tier 0 — keine Moz/Bing/DataForSEO-Zugangsdaten konfiguriert):** Common Crawl Web Graph, Expired-Domain-Heritage-Check (WHOIS), lokaler Verifikations-Crawler, manuelle Prüfung der ausgehenden Links auf der Seite selbst.
**Nicht verfuegbar (fehlende Zugangsdaten):** Moz Link Explorer (DA/PA/Spam Score/verweisende Domains), Bing Webmaster Tools, DataForSEO. Es gibt **keine Tier-0-Quelle, die verweisende Domains, Ankertexte oder Linkanzahlen tatsaechlich auflisten kann** — Common Crawl liefert nur domainweite Graph-Metriken (PageRank/Centrality-Praesenz), keine Backlink-Liste.

## Zusammenfassung

Es konnte **keine einzige verweisende Domain identifiziert** werden — weder positiv noch negativ, weil die dafuer nötige Quelle (Moz/DataForSEO-Backlink-Index oder Bing Webmaster für die eigene Property) fehlt. Ein numerischer Backlink-Health-Score wird bewusst **nicht ausgewiesen** (INSUFFICIENT DATA), da von 7 Scoring-Faktoren (verweisende Domains, Domain-Qualitätsverteilung, Ankertext, Toxizität, Linkvelocity, Follow/Nofollow, geografische Relevanz) **0 mit Daten belegt** sind. Die verfügbaren Signale deuten konsistent auf ein **noch sehr kleines bis nicht vorhandenes Backlink-Profil** hin, was für eine junge lokale Ein-Firmen-Website ohne bisherige Linkaufbau-Aktivität erwartbar ist.

| Prüfpunkt | Ergebnis | Quelle (Konfidenz) | Schweregrad |
|---|---|---|---|
| Verweisende Domains (Anzahl/Liste) | **Nicht messbar** — keine Quelle vorhanden | — | Info |
| Common-Crawl-Graph-Präsenz | Domain **nicht** im CC-Webgraph gelistet (`in_crawl: false`, `in_rankings: false`, PageRank/Centrality: null) | Common Crawl `cc-main-2026-jan-feb-mar` (0.50, domainweit) | Hoch |
| Ankertext-Verteilung | Nicht messbar (keine Backlink-Quelle) | — | Info |
| Domain-Alter / Expired-Domain-Erbe | Kein Erstellungsdatum ermittelbar; .de-Whois liefert aus Datenschutzgründen keine Registrierungsdaten | domain_history.py, Fallback-WHOIS (0.30) | Info |
| Eigene ausgehende Links zu Social-Profilen/Verzeichnissen (Startseite, Kontakt, Impressum) | **Keine** externen Links zu Facebook/Instagram/Google-Unternehmensprofil/Branchenverzeichnissen gefunden — nur WordPress-interne Links (`gmpg.org/xfn/11`, `wp-json`, `wa.link` WhatsApp-Kurzlink) | Direkte HTML-Prüfung der gerenderten Seiten (0.90) | Mittel |
| Reziproke Links / Toxizität | Nicht prüfbar (kein Backlink-Kandidat vorhanden, um Crawler zu verifizieren) | — | Info |
| **Backlink Health Score** | **INSUFFICIENT DATA** — kein Score ausgewiesen | — | — |

## Einzelbefunde

### 1. Domain nicht im Common Crawl Web Graph erfasst (Schweregrad: Hoch, aber neutral zu interpretieren)
**Befund:** `commoncrawl_graph.py mobile-sanitaeranlagen-hs.de --json` liefert `in_crawl: false`, `in_rankings: false`, alle Rank-Felder `null`.
**Wichtig — korrekte Interpretation:** Das bedeutet **nicht automatisch "keine Backlinks" oder "geringe Autorität"**. Es bedeutet, dass der jüngste Common-Crawl-Release die Domain (noch) nicht erfasst hat — plausibel für eine kleine, junge, rein regionale .de-Domain mit wenig Crawl-Traffic. Es ist dennoch ein reales Signal: **keine externe Quelle konnte bislang irgendeine Verlinkung auf diese Domain im offenen Web nachweisen.**
**Fix / Konsequenz:** Kein technischer Fix nötig — dies ist ein Messproblem der freien Datenquelle, kein Website-Fehler. Für belastbare Zahlen zu verweisenden Domains: Moz-API-Key (kostenlos, 2.500 Zeilen/Monat) einrichten oder DataForSEO-Extension installieren (`./extensions/dataforseo/install.sh`).

### 2. Keine sichtbaren Social-/Verzeichnis-Links auf der eigenen Seite (Schweregrad: Mittel)
**Befund:** Direkte Prüfung der ausgehenden `<a href>`-Links auf Startseite, `/kontakt/` und `/impressum/` zeigt **keine** Verlinkung zu Google Business Profile, Facebook, Instagram oder einem Branchenverzeichnis. Einzige externen Links: WordPress-Boilerplate (`gmpg.org/xfn/11`) und ein WhatsApp-Kurzlink (`wa.link/naeydx`) auf der Kontaktseite.
**Warum relevant:** Diese Links zeigen zwar nach außen (nicht das eigentliche Backlink-Thema), belegen aber, dass die Firma aktuell **kein verlinktes Google-Unternehmensprofil, keine verlinkte Social-Media-Präsenz und keine Branchenverzeichnis-Einträge** kommuniziert — ein Hinweis darauf, dass diese off-site Grundlagen für Linkaufbau wahrscheinlich noch fehlen oder nicht verknüpft sind.
**Fix:** Google Business Profile anlegen/verlinken, Impressum um Social-Profile ergänzen (sofern vorhanden), s. Linkaufbau-Plan unten.

### 3. WHOIS liefert kein Erstellungsdatum — kein Hinweis auf Expired-Domain-Erbe, aber auch nicht ausschließbar (Schweregrad: Info)
**Befund:** `domain_history.py` meldet `whois_source: fallback`, `created: null`, `risk: unknown`. Deutsche .de-Whois-Abfragen liefern aus Datenschutzgründen i. d. R. keine Registrant-/Erstellungsdaten über öffentliche RDAP/WHOIS-Proxys.
**Konsequenz:** Es gibt keinen Beleg für ein "geerbtes" Backlink-Profil einer Vorbesitzer-Domain (positiv wie negativ). Für den Relaunch (Next.js, gleiche Domain) ist das irrelevant — die Domain bleibt gleich, es findet kein Domain-Wechsel statt, der historische Signale gefährden könnte.

### 4. Kein Moz/Bing/DataForSEO-Zugriff → keine Ankertext-, Referring-Domain- oder Toxizitätsdaten (Schweregrad: Hoch als methodische Einschränkung)
**Befund:** `backlinks_auth.py --check` bestätigt Tier 0. Ankertext-Verteilung, Anzahl verweisender Domains/IPs, Spam Score und Linkvelocity sind **grundsätzlich nicht ermittelbar** ohne kostenpflichtige/registrierte Zusatzquelle.
**Fix:** Kostenlosen Moz-API-Key registrieren (moz.com/products/api) für DA/PA/Spam Score und eine echte Referring-Domains-Liste. Danach `bing_webmaster.py` einrichten, wenn die Property in Bing Webmaster Tools verifiziert wird (kostenlos, liefert Inbound-Links direkt aus Bings Index für die eigene Domain).

## Lokaler Linkaufbau-Plan (Westerwald / Toilettenwagen-Vermietung)

Realistischer Fokus für eine junge, kleine Service-Area-Business: **wenige, aber hoch-relevante lokale/thematische Links statt Masse.** Priorisierung nach Aufwand/Nutzen.

### Priorität Hoch (geringer Aufwand, hohe lokale Relevanz)
1. **Google Business Profile** anlegen/optimieren mit Website-Link, Kategorie "Sanitäreinrichtungsvermietung", Servicegebiet Westerwald/Daaden. Kein klassischer Backlink, aber Grundvoraussetzung für lokale Sichtbarkeit und Trust-Signal für alle folgenden Schritte.
2. **Kostenlose/kostengünstige Branchenverzeichnisse** mit echtem NAP-Eintrag (Name, Adresse, Telefon konsistent zum Impressum): Das Örtliche, GelbeSeiten, 11880, Firmenwissen, Cylex, Wer-liefert-was, Meinestadt.de (Region Westerwald/Altenkirchen). Schneller Ein-Link pro Verzeichnis, wenig Aufwand.
3. **Handwerks-/Baustoff-Lieferanten und Partnerbetriebe** (z. B. Sanitärhandwerk, Baustellenausrüster, Eventtechnik-Verleiher im Westerwald), mit denen bereits Geschäftsbeziehungen bestehen: um Aufnahme in deren "Partner"/"Empfehlungen"-Seite bitten. Hohe thematische Relevanz, oft nur eine Anfrage nötig.

### Priorität Mittel (moderater Aufwand, gute Themenrelevanz)
4. **Vereine im Westerwald** (Sportvereine, Feuerwehr-Fördervereine, Schützenvereine), die Sommerfeste/Vereinsfeiern veranstalten: Toilettenwagen als Sponsoring-/Ausstatter-Leistung anbieten (z. B. vergünstigte Miete gegen Nennung + Link auf der Vereins-Website unter "Unsere Sponsoren/Partner"). Sehr natürliche, lokal-thematische Links.
5. **Veranstalter regionaler Events** (Stadtfeste, Weihnachtsmärkte, Kirmes, Vereinsfeste in Daaden, Betzdorf, Kirchen, Wissen, Herdorf): direkte Ansprache als Sanitär-Dienstleister für die Veranstaltungsseite/Sponsorenliste.
6. **Gemeinden/Verbandsgemeinden Westerwald** (Verbandsgemeinde Daaden-Herdorf, Gemeinde Daaden): Aufnahme in lokale Wirtschaftsverzeichnisse/"Ansässige Unternehmen"-Seiten der Gemeinde-Website, sofern vorhanden. Anfrage beim Gemeinde-Wirtschaftsförderer.

### Priorität Niedrig (höherer Aufwand, aber wertvoll bei Erfolg)
7. **Regionale Presse** (Westerwälder Zeitung, Rhein-Zeitung Lokalteil, Heimat-Jahrbuch Kreis Altenkirchen): Pressemitteilung bei Firmengründung/Geschäftserweiterung oder Sponsoring eines lokalen Events als Aufhänger. Realistisch nur 1-2 Erwähnungen pro Jahr, aber hohe Domain-Autorität.
8. **Branchenverbände** (z. B. Verband der Sanitär-Vermieter, IHK Koblenz Unternehmensverzeichnis): IHK-Mitgliedschaft prüfen, ggf. Eintrag im IHK-Firmenverzeichnis.

### Hinweis zur Umsetzung
- Für den Next.js-Relaunch: sicherstellen, dass alle oben erwähnten künftigen Backlinks auf die **gleiche finale URL-Struktur** zeigen (keine Weiterleitungsketten durch spätere URL-Änderungen).
- Sobald erste Links gesetzt sind, mit `verify_backlinks.py --target https://www.mobile-sanitaeranlagen-hs.de/ --links <datei.json>` verifizieren, ob sie tatsächlich (noch) live sind und ob `rel="nofollow"` gesetzt wurde.
- Nach Linkaufbau erneut Moz/DataForSEO prüfen lassen, um echten Fortschritt (Referring Domains, DA) zu messen — mit reinem Tier-0-Zugang bleibt der Fortschritt unsichtbar.

## Abgrenzung zu anderen Audit-Bereichen
- E-E-A-T/Content-Qualität: siehe `/seo content` (nicht Teil dieser Analyse).
- Crawlbarkeit/technisches SEO (z. B. die 9 Ecwid-Demoprodukte im Sitemap, fehlende Meta-Description auf `/shop/`): siehe `/seo technical` (nicht Teil dieser Analyse).

## Validierung
`validate_backlink_report.py` wurde gegen die gesammelten Daten ausgeführt → **Status: PASS** (1 Info-Hinweis: CC-Abwesenheit korrekt als "nicht gecrawlt", nicht als "geringe Autorität" interpretiert — bereits oben entsprechend formuliert). Kein numerischer Score wurde erzeugt, da 0 von 7 Scoring-Faktoren Daten haben.

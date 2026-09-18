# Content-Qualität, E-E-A-T & On-Page – mobile-sanitaeranlagen-hs.de

Audit-Datum: 2026-09-18 · Basis: `data/page-*.json` (extracted_text + HTML), `content_quality.py`, `metadata_template.py`, eigene Heading-/Link-/NAP-Extraktion. Baseline der alten WordPress/IONOS-Site; alle Fixes sind für den Next.js-Relaunch formuliert.

## Scores

| Bereich | Score | Kurzbegründung |
|---|---|---|
| **Content-Score** | **32 / 100** | 5 von 7 Seiten thin (Home 69 Wörter, Shop 50, Impressum 50, Toilettenwagen 240, Kontakt 180). Keine Referenzen, keine Bewertungen, keine Über-uns-/Team-Inhalte, kein FAQ, kein Einsatzgebiet. Fokus-Keywords „Westerwald" (0 Treffer site-weit) und „Baustelle" (nur in der Meta-Description) fehlen im Text komplett. |
| **On-Page-Score** | **41 / 100** | Title/Canonical/lang vorhanden, aber: abgelaufene Promo im Home-Title, /shop/ ohne Description, 3 Seiten ohne H1, 29 von 31 Bildern ohne alt, keine Open-Graph-Tags, interne Verlinkung nur über Navigation, Telefon/E-Mail nicht als `tel:`/`mailto:` verlinkt, fehlerhafte LocalBusiness-Daten. |
| E-E-A-T (gewichtet) | 34 / 100 | Experience 25 · Expertise 40 · Authoritativeness 15 · Trustworthiness 50 (Gewichte 20/25/25/30, internes Modell, nicht Googles) |
| AI-Citation-Readiness | 30 / 100 | Zitierfähige Fakten vorhanden (Preise, Kapazitäten, 3-m-Regel), aber keine FAQ, kein Product/Offer-Schema, LocalBusiness-Schema fehlerhaft, keine Datumsangaben. |

`content_quality.py` (QRG-Heuristik): Home 74 (thin), Toilettenwagen 86 (thin, repetitive 43), Kontakt 89 (thin), Shop 75 (thin), Impressum 90 (thin), AGB 86. Kein Filler-/AI-Pattern-Treffer – der Text ist knapp, nicht aufgebläht. `metadata_template.py`: site_risk **low**, templated_ratio 0.0, keine geteilten CTA-Phrasen.

---

## A. Content-Findings

### C1 · Thin Content auf allen kommerziellen Seiten — **Hoch**
**Evidenz:** Home 69 Wörter (Minimum Homepage 500), /unsere-toilettenwagen/ 240 (Service-Seite min. 800), /kontakt/ 180 (davon ~120 Formular-Labels und Consent-Text), /shop/ 50 (nur „Ihr Shop-Inhalt wird jetzt geladen … Hoppla!"). Homepage besteht aus H1 + einem Absatz + einem Button.
**Fix (Relaunch):** Startseite auf 500–800 Wörter ausbauen mit den Blöcken: Leistungsversprechen, 3 Wagen im Überblick (mit Link zu Detailseiten), Einsatzbereiche (Hochzeit, Dorf-/Vereinsfest, Firmenevent, Baustelle), Einsatzgebiet (Daaden, Westerwald, Kreis Altenkirchen, Siegen, Betzdorf, Kirchen, Wissen, Hachenburg …), Ablauf (Anfrage → Angebot → Lieferung/Aufbau → Abholung), Kurz-FAQ, Kontakt-CTA. Pro Wagen (S/M/L) eine eigene URL mit 400+ Wörtern.

### C2 · Fokus-Keywords fehlen im Fließtext — **Hoch**
**Evidenz (Treffer in extracted_text):** „Westerwald" 0 auf allen 7 Seiten; „Baustelle" 0 im Text (nur 1x in Home-Meta-Description); „Daaden" nur in Impressum/Kontakt/Datenschutz, nicht auf Home oder Toilettenwagen-Seite; „mieten" 1x (Home); „Event" 0x; „Hochzeit" 0x. Die Seite kann für „Toilettenwagen mieten Westerwald" nicht ranken, weil die Kombination nirgends vorkommt.
**Fix:** Primär-Keyword „Toilettenwagen mieten" + Ort in H1/Title/Intro der Startseite („Toilettenwagen mieten im Westerwald – Daaden & Umgebung"). Sekundäre Begriffe natürlich in Absätzen: Toilettenwagen für Hochzeit / Event / Baustelle / Vereinsfest, Sanitärwagen, mobile Toilette, WC-Wagen. Keine Keyword-Häufung; 1–2 Nennungen pro 100 Wörter reichen.

### C3 · Keine Experience-/Authority-Signale (Referenzen, Bewertungen, Über uns) — **Hoch**
**Evidenz:** Site-weit 0 Treffer für „Referenz", „Bewertung", „Kunden", „seit". Keine Über-uns-Seite, keine Nennung der Geschäftsführer außerhalb des Impressums, keine Fotos vom Einsatz, keine Google-Rezensionen eingebunden, JSON-LD `sameAs` besteht aus 7 leeren Strings (kein GBP, kein Social-Profil).
**Fix:** (1) Über-uns-Abschnitt/-Seite: Gründer Phillip Smécz & Christian Herrmann, Standort Daaden, Fuhrpark, Gründungsjahr, warum eigene Wagen. (2) 3–5 Einsatzbeispiele mit Foto + Ort + Gästezahl („Schützenfest Daaden, 400 Gäste, Wagen L"). (3) Google-Business-Profil anlegen/verknüpfen, Bewertungen einholen und mit Freigabe zitieren. (4) `sameAs` mit echten URLs füllen oder entfernen.

### C4 · Fehlende beratende Inhalte (Expertise) — **Mittel**
**Evidenz:** Es gibt konkrete Fachdetails (Kapazitäten, „max. 3 Meter vom Abwasseranschluss", Schläuche inklusive, Preise ab 175/190/210 € zzgl. MwSt.), aber keine Entscheidungshilfe: Welcher Wagen für wie viele Gäste? Welche Anschlüsse (Strom, Wasser) werden benötigt? Wie lange dauert Aufbau? Stellfläche/Zufahrt? Winterbetrieb?
**Fix:** FAQ-Block (6–10 Fragen) auf Startseite und Wagen-Seiten, Kapazitätstabelle „Gäste → empfohlener Wagen", Checkliste „Aufstellort vorbereiten". Diese Inhalte sind zugleich der beste Hebel für AI-Zitationen (siehe C8).

### C5 · Inkonsistente Unternehmensangaben (Trust) — **Mittel**
**Evidenz:**
- Telefon: Impressum/Kontakt/JSON-LD `+49 160 2743001`, Datenschutzerklärung `+4916091633060`.
- E-Mail: `kontakt@…` vs. Datenschutz `phillip.smecz@…`.
- Öffnungszeiten: Kontakt-Seite „Mo–Fr 09–13 / 15–19, Sa 10–16"; JSON-LD „Tu–Fr 09–13 / 15–18, Sa 14–18, Mo leer".
- Firmenname: Impressum-H2 und Impressum-Meta-Description „Sanitär**analgen**" (Tippfehler); CONTEXT nennt „Smücz", Site durchgängig „Smécz" – Schreibweise laut Handelsregister (HRB 30803, AG Montabaur) im Relaunch verbindlich festlegen.
**Fix:** Eine NAP-Quelle (Konfigurationsdatei) im Next.js-Projekt, aus der Footer, Kontakt, Impressum, Datenschutz und JSON-LD gespeist werden.

### C6 · Abgelaufenes Rabatt-Versprechen im Title — **Hoch**
**Evidenz:** Home-`<title>` „Mobile Sanitäranlagen: 10% Rabatt bis 30.06.2026" (Audit 2026-09-18 → 80 Tage abgelaufen). Der Rabatt wird auf der Seite selbst nirgends erwähnt – Title-Versprechen ohne Einlösung im Content (QRG: irreführender Title / „Clickbait"-Kriterium, Trust-Schaden).
**Fix:** Promo aus dem Title entfernen; zeitlich befristete Aktionen nur im Content mit sichtbarem Enddatum und automatischem Ablauf (Feature-Flag mit `validUntil`).

### C7 · /shop/ liefert keinen Inhalt, Sitemap enthält Ecwid-Demoprodukte — **Hoch**
**Evidenz:** Ohne JS zeigt /shop/ „Hoppla! Es ist etwas passiert, während wir Ihren Shop geladen haben" (H4). `wp-sitemap-ecstore-1.xml` listet 9 Kleidungs-Musterprodukte (MUSTER-Sonnenbrille, MUSTER-Schwarzes-Kleid …), alle 200. Für Google ist das eine themenfremde, leere Shop-Sektion – ein Qualitäts- und Vertrauenssignal gegen die gesamte Domain.
**Fix:** Im Relaunch /shop/ und alle `/shop/MUSTER-*` per 410 (oder 301 auf /unsere-toilettenwagen/) abschalten; Sitemap ohne ecstore. Buchung über Anfrageformular oder eine echte Produkt-/Angebotsseite je Wagen.

### C8 · AI-Citation-Readiness gering — **Mittel**
**Evidenz:** Zitierfähige Fakten existieren (Preise, Kapazitäten, 3-m-Regel), sind aber in Bullet-Fragmenten mit „•"-Zeichen im Text und ohne Kontextsatz formuliert; keine FAQ, kein `Product`/`Offer`/`FAQPage`-Schema, keine Datumsangaben, `LocalBusiness` ohne `postalCode`, `addressRegion: null`, `openingHours` in nicht-standardkonformem Objekt statt `openingHoursSpecification`, `url` ohne www (Canonical mit www), `telephone` nicht E.164.
**Fix:** Vollständige Sätze mit Entität + Fakt („Der Toilettenwagen L von Mobile Sanitäranlagen Herrmann & Smécz bietet 4 Damen-WCs, 2 Herren-WCs und 6 Urinale und kostet ab 210 € pro Tag zzgl. MwSt."). Schema: `LocalBusiness` korrigieren (+ `areaServed`, `priceRange`, `geo`), je Wagen `Product` mit `Offer` (`price`, `priceCurrency`, Netto-Kennzeichnung), `FAQPage` für den FAQ-Block, `dateModified` sichtbar.

### C9 · Lesbarkeit & Sprachqualität — **Niedrig**
**Evidenz:** Flesch-Amstad (dt.) Home 26, Toilettenwagen 23, AGB 33 (= „schwer"; Wagen-Seite wegen langer Komposita wie „Kontaktlose Touchsensoren", „Außenbeleuchtung"). Homepage-Absatz ist generische Marketing-Prosa („professionelle Lösungen im Bereich der Sanitärdienstleistungen", „auf Ihre individuellen Bedürfnisse zugeschnitten") ohne konkrete Aussage. Fehler auf /unsere-toilettenwagen/: „Wählen sie … stellen sie" (Anrede klein), „ideal für jede Veranstaltung, oder jedes Fest" (Komma), „2 Herrentoilette" (Plural). Bullets als Text-„•" statt `<ul>`.
**Fix:** Kurze Sätze (max. 15 Wörter), konkrete Zahlen statt Adjektive, semantische Listen, Korrekturlesen.

### C10 · Wiederholte Textblöcke auf der Wagen-Seite — **Niedrig**
**Evidenz:** repetition_score 43; der Block „Hinweis: Der Sanitärwagen muss … / Frisch- und Abwasserschläuche sind im Lieferumfang enthalten." sowie „zzgl. 19% MwSt. sowie Lieferung, Aufbau und Endreinigung" und 3 identische Bullets stehen 3x auf der Seite.
**Fix:** Gemeinsame Hinweise einmal in einem Abschnitt „Was für alle Wagen gilt" bündeln; pro Wagen nur die Unterschiede listen.

### C11 · Frische-Signale fehlen — **Niedrig**
**Evidenz:** Kein sichtbares Datum auf einer Seite; `publication_date` von render_page für 5 Seiten 2000-01-01/2012-01-01 (Fallback), Sitemap-lastmod für alle Seiten identisch 2026-06-30 (Bulk-Speicherung). Preise ohne Gültigkeitsangabe.
**Fix:** „Preise Stand MM/JJJJ" sichtbar, `dateModified` in Schema, echte lastmod pro Seite.

---

## B. On-Page-Findings

### O1 · Title-Tags — **Hoch**
| URL | Ist | Problem |
|---|---|---|
| / | „Mobile Sanitäranlagen: 10% Rabatt bis 30.06.2026" (48) | abgelaufene Promo, kein „mieten", kein Ort, keine Marke |
| /unsere-toilettenwagen/ | „Moderne Toilettenwagen für Veranstaltungen mieten" (49) | ok, aber ohne Ort/Marke |
| /kontakt/ | „Kontakt zu Mobile Sanitäranlagen - Daaden" (41) | ok |
| /shop/ | „Shop" (4) | nichtssagend |
| /impressum/ | „Impressum & Unternehmensinfo - Mobile Sanitäranlagen" (52) | ok |
| /agb/ | „AGB – Allgemeine Geschäftsbedingungen für Mietsanitär" (53) | ok |
| /datenschutz/ | „Datenschutzerklärung – Ihre Daten geschützt!" (44) | reißerisch, „!" unnötig |

### O2 · Meta-Descriptions — **Mittel**
/shop/ ohne Description; Home-Description enthält Zeilenumbruch („… private Feiern.\nJetzt …"); Impressum-Description mit Tippfehler „Sanitäranalgen"; Kontakt: `brand_suffix_in_description` (low, metadata_template.py). Datenschutz-Description „Entdecken Sie unsere Datenschutzerklärung" ist Floskel. Alle Descriptions max. 125 Zeichen – Spielraum bis ~155 ungenutzt.

### O3 · Vorschläge Title / Meta-Description (Relaunch)
| URL | Title (max. 60) | Meta-Description (max. 155) |
|---|---|---|
| / | `Toilettenwagen mieten im Westerwald – Daaden & Umgebung` | `Moderne Toilettenwagen (S/M/L) ab 175 €/Tag für Hochzeit, Vereinsfest, Firmenevent und Baustelle. Lieferung & Aufbau aus 57567 Daaden. Jetzt unverbindlich anfragen.` |
| /unsere-toilettenwagen/ (bzw. /toilettenwagen/) | `Unsere Toilettenwagen S, M & L – Ausstattung & Preise` | `3 Toilettenwagen mit 3 bis 6 WCs, kontaktlosen Armaturen und LED-Licht. Preise ab 175 € pro Tag zzgl. MwSt. Passenden Wagen wählen und Angebot anfordern.` |
| /toilettenwagen/s/ (neu) | `Toilettenwagen S mieten – 3 WCs, 2 Urinale, ab 175 €/Tag` | `Kompakter Toilettenwagen für kleinere Feste: 2 Damen-WCs, 1 Herren-WC, 2 Urinale, Touchsensoren, LED-Spiegel. Ab 175 €/Tag zzgl. MwSt. – Westerwald & Umgebung.` |
| /toilettenwagen/m/ (neu) | `Toilettenwagen M mieten – 4 WCs, 3 Urinale, ab 190 €/Tag` | `Toilettenwagen M für mittlere Feste: 3 Damen-WCs, 1 Herren-WC, 3 Urinale, großzügige Aufteilung. Ab 190 €/Tag zzgl. MwSt. Lieferung & Aufbau aus Daaden.` |
| /toilettenwagen/l/ (neu) | `Toilettenwagen L mieten – 6 WCs, 6 Urinale, ab 210 €/Tag` | `Großer Toilettenwagen für Großveranstaltungen: 4 Damen-WCs, 2 Herren-WCs, 6 Urinale. Ab 210 €/Tag zzgl. MwSt. Jetzt Verfügbarkeit im Westerwald anfragen.` |
| /kontakt/ | `Toilettenwagen anfragen – Kontakt & Angebot | Daaden` | `Anfrage in 2 Minuten: Wagen wählen, Mietzeitraum und Aufstellort angeben. Telefon +49 160 2743001, WhatsApp oder Formular. Antwort meist am selben Werktag.` |
| /impressum/ | `Impressum – Mobile Sanitäranlagen Herrmann & Smécz UG` | `Anbieterkennzeichnung: Mobile Sanitäranlagen Herrmann & Smécz UG (haftungsbeschränkt), Daaden. Geschäftsführer, Handelsregister HRB 30803, USt-IdNr.` |
| /agb/ | `AGB – Mietbedingungen für Toilettenwagen` | `Allgemeine Geschäftsbedingungen für die Miete unserer Toilettenwagen: Vertragsschluss, Mietdauer, Kaution, Übergabe, Stornokosten und Haftung.` |
| /datenschutz/ | `Datenschutzerklärung – Mobile Sanitäranlagen Herrmann & Smécz` | `Informationen zur Verarbeitung personenbezogener Daten auf mobile-sanitaeranlagen-hs.de: Server-Logs, Kontaktformular, Cookies, Google Maps und Ihre Rechte.` |
| /shop/ | entfällt (410/301) | – |

Hinweis: Zahlen (Preise, Kapazitäten) sind bewusst in den Descriptions – sie erhöhen die CTR und die Seite liefert diese Fakten tatsächlich. „Antwort meist am selben Werktag" nur verwenden, wenn das eingehalten wird.

### O4 · H1/H2-Struktur — **Mittel**
**Evidenz:** Kein H1 auf /kontakt/ (nur H2 „Kontakt"), /agb/ (H2 mit Firmenname in einer Zeile), /shop/ (nur H4 „Hoppla!"). Home-H1 „Hochwertige mobile Sanitäranlagen" ohne Keyword „Toilettenwagen"/„mieten"/Ort. Auf allen Seiten zwei versteckte IONOS-Template-H3 „Your web browser is old and not fully supported" / „For a better experience, please use a modern browser" (englisch, verwässern die Outline). /unsere-toilettenwagen/: H3 für Kapazitätszeile („2 Damentoiletten · 1 Herrentoilette · 2 Urinale") statt für einen Abschnitt.
**Fix (Relaunch):** Genau ein H1 pro Seite. Home: H1 „Toilettenwagen mieten im Westerwald", H2 „Unsere Toilettenwagen", H2 „Für Hochzeit, Fest & Baustelle", H2 „Einsatzgebiet", H2 „So läuft die Miete ab", H2 „Häufige Fragen". Wagen-Seite: H1 „Unsere Toilettenwagen", H2 je Wagen, H3 „Ausstattung"/„Preis"/„Voraussetzungen". Kontakt: H1 „Toilettenwagen anfragen". Browser-Warnung ohne Heading-Tags rendern.

### O5 · Bilder ohne Alt-Text — **Mittel**
**Evidenz:** /unsere-toilettenwagen/: 31 `<img>`, 29 ohne `alt`-Attribut, 2 mit leerem alt; Kontakt 1 ohne alt. Dateinamen sind UUIDs (`/wp-content/uploads/go-x/u/<uuid>/image.jpg`). Das sind die einzigen Experience-Belege der Site (Fotos der eigenen Wagen), sie sind für Google Bilder unsichtbar.
**Fix:** Sprechende Dateinamen (`toilettenwagen-l-innen-damen.jpg`) und beschreibende alt-Texte („Innenraum Toilettenwagen S mit LED-Spiegel und Touchsensor-Waschbecken"), `loading="lazy"` außer Hero, Galerie-Links nicht auf Rohdateien.

### O6 · Interne Verlinkung — **Mittel**
**Evidenz:** Alle internen Links stammen aus Header/Footer-Navigation; einzige kontextuelle Links: Home → /unsere-toilettenwagen/ („Unsere Sanitärwagen") und Wagen-Seite → /kontakt/ („Jetzt anfragen" 3x). Kein Link von Kontakt/Impressum/AGB zurück in den Content; AGB nennt die „3 Meter"-Regel, verlinkt aber nicht auf die Wagen-Seite. Ankertext „Unsere Sanitärwagen" vs. Zielseite „Toilettenwagen" uneinheitlich. Keine Breadcrumbs.
**Fix:** Kontextlinks mit Keyword-Anker (Home → je Wagen-Detailseite; Wagen-Seiten untereinander „Größer? Toilettenwagen L"; FAQ → AGB-Abschnitt; AGB → Wagen-Seite), `BreadcrumbList`, konsistente Terminologie „Toilettenwagen".

### O7 · Kontakt-Elemente nicht verlinkt — **Mittel**
**Evidenz:** Telefonnummer und E-Mail stehen auf /kontakt/ und /impressum/ als reiner Text; keine `tel:`/`mailto:`-Links im gesamten HTML; WhatsApp über Shortlink `https://wa.link/naeydx` (Drittanbieter, kein direktes `wa.me`). Google-Maps-Karte nur nach Consent, ohne Text-Fallback der Adresse in der Nähe.
**Fix:** `<a href="tel:+491602743001">`, `<a href="mailto:kontakt@…">`, `https://wa.me/491602743001?text=…`; Telefon-CTA auch im Header (mobil sticky).

### O8 · Open Graph / Social Meta fehlen — **Niedrig**
**Evidenz:** Keine `og:title`, `og:description`, `og:image`, `og:locale` auf keiner Seite.
**Fix:** OG + Twitter-Card mit Wagen-Foto pro Seite (Next.js `metadata.openGraph`).

### O9 · Strukturierte Daten fehlerhaft — **Mittel** (Detail in C8)
`LocalBusiness` ohne `postalCode`, `addressRegion: null`, `sameAs: ["",…]`, `openingHours` als Objekt (ungültig), `url` ohne www. Kein `Product`/`Offer`, kein `FAQPage`, kein `BreadcrumbList`. Empfehlung: `LocalBusiness` mit `areaServed` (Westerwald, Kreis Altenkirchen, Siegen-Wittgenstein), `priceRange`, `openingHoursSpecification`, `geo`, `address.postalCode: "57567"`.

---

## C. Priorisierte Maßnahmen (Relaunch)

1. **Sofort (Alt-Site, 10 Min):** Home-Title ohne Promo; /shop/ + MUSTER-Produkte auf `noindex` oder aus Sitemap entfernen.
2. **Relaunch – Content:** Startseite 500–800 Wörter mit Einsatzgebiet Westerwald/Daaden + Einsatzbereiche (Hochzeit, Fest, Firmenevent, Baustelle); 3 Wagen-Detailseiten à 400+ Wörter; Über-uns; FAQ (8–10 Fragen); 3–5 Einsatzbeispiele mit Fotos; Google-Bewertungen.
3. **Relaunch – On-Page:** Titles/Descriptions aus O3; ein H1 pro Seite; alt-Texte + Dateinamen; `tel:`/`mailto:`/`wa.me`; OG-Tags; Kontextlinks + Breadcrumbs.
4. **Relaunch – Trust:** zentrale NAP-Konfiguration (Telefon, E-Mail, Öffnungszeiten, Firmenschreibweise) → Footer, Kontakt, Impressum, Datenschutz, JSON-LD identisch; Tippfehler „Sanitäranalgen" beheben.
5. **Relaunch – Schema:** LocalBusiness korrigieren, Product/Offer je Wagen, FAQPage, BreadcrumbList, `dateModified`.

---

## D. Strukturierte Findings (audit-data.json, Kategorie „Content Quality")

```json
{
  "category": "content_quality",
  "scores": {
    "content": 32,
    "on_page": 41,
    "eeat": {"experience": 25, "expertise": 40, "authoritativeness": 15, "trustworthiness": 50, "weighted": 34},
    "ai_citation_readiness": 30
  },
  "tooling": {
    "content_quality_py": {"home": 74, "unsere-toilettenwagen": 86, "kontakt": 89, "shop": 75, "impressum": 90, "agb": 86},
    "metadata_template_py": {"site_risk": "low", "templated_ratio": 0.0, "shared_cta_phrases": {}, "page_flags": {"/kontakt/": ["brand-suffix-in-description"], "/shop/": ["missing-metadata"]}}
  },
  "findings": [
    {"id": "C1", "severity": "high", "title": "Thin Content auf kommerziellen Seiten", "evidence": "Home 69 Wörter, /unsere-toilettenwagen/ 240, /kontakt/ 180, /shop/ 50", "urls": ["/", "/unsere-toilettenwagen/", "/kontakt/", "/shop/"]},
    {"id": "C2", "severity": "high", "title": "Fokus-Keywords fehlen im Text", "evidence": "Westerwald 0x site-weit, Baustelle 0x im Text, Daaden nicht auf Home/Wagen-Seite", "urls": ["/", "/unsere-toilettenwagen/"]},
    {"id": "C3", "severity": "high", "title": "Keine Referenzen/Bewertungen/Über-uns", "evidence": "0 Treffer Referenz/Bewertung; JSON-LD sameAs = 7 leere Strings", "urls": ["/"]},
    {"id": "C4", "severity": "medium", "title": "Keine beratenden Inhalte / FAQ", "evidence": "keine Kapazitätsempfehlung, keine Anschluss-Anforderungen außer 3-m-Regel", "urls": ["/", "/unsere-toilettenwagen/"]},
    {"id": "C5", "severity": "medium", "title": "Inkonsistente NAP-/Firmenangaben", "evidence": "Telefon +49 160 2743001 vs +4916091633060 (Datenschutz); Öffnungszeiten Kontakt vs JSON-LD abweichend; Tippfehler 'Sanitäranalgen' im Impressum", "urls": ["/impressum/", "/kontakt/", "/datenschutz/"]},
    {"id": "C6", "severity": "high", "title": "Abgelaufene Promo im Title, nicht im Content", "evidence": "'10% Rabatt bis 30.06.2026' am 2026-09-18; Rabatt auf Seite nicht erwähnt", "urls": ["/"]},
    {"id": "C7", "severity": "high", "title": "Shop leer + Ecwid-Demoprodukte in Sitemap", "evidence": "/shop/ zeigt 'Hoppla!'; 9 MUSTER-Kleidungsprodukte mit Status 200 in wp-sitemap-ecstore-1.xml", "urls": ["/shop/"]},
    {"id": "C8", "severity": "medium", "title": "AI-Citation-Readiness gering / Schema fehlerhaft", "evidence": "kein FAQPage/Product/Offer; LocalBusiness ohne postalCode, addressRegion null, openingHours ungültig, url ohne www", "urls": ["/"]},
    {"id": "C9", "severity": "low", "title": "Lesbarkeit & Sprachfehler", "evidence": "Flesch-Amstad Home 26 / Wagen 23; 'Wählen sie', '2 Herrentoilette', Textbullets statt <ul>", "urls": ["/", "/unsere-toilettenwagen/"]},
    {"id": "C10", "severity": "low", "title": "Wiederholte Textblöcke", "evidence": "repetition_score 43; Hinweis-/MwSt-Block 3x identisch", "urls": ["/unsere-toilettenwagen/"]},
    {"id": "C11", "severity": "low", "title": "Keine Frische-Signale", "evidence": "kein sichtbares Datum, Sitemap-lastmod für alle Seiten identisch 2026-06-30", "urls": ["/"]},
    {"id": "O1", "severity": "high", "title": "Title-Tags: Promo, fehlender Ort/Marke, 'Shop'", "evidence": "siehe Tabelle O1", "urls": ["/", "/shop/", "/unsere-toilettenwagen/", "/datenschutz/"]},
    {"id": "O2", "severity": "medium", "title": "Meta-Descriptions: fehlend/fehlerhaft", "evidence": "/shop/ leer; Home mit Zeilenumbruch; Impressum Tippfehler; alle max. 125 Zeichen", "urls": ["/shop/", "/", "/impressum/", "/kontakt/"]},
    {"id": "O4", "severity": "medium", "title": "H1 fehlt / Template-H3 auf allen Seiten", "evidence": "kein H1 auf /kontakt/, /agb/, /shop/; 2 englische IONOS-H3 auf jeder Seite", "urls": ["/kontakt/", "/agb/", "/shop/"]},
    {"id": "O5", "severity": "medium", "title": "Bilder ohne alt-Attribut", "evidence": "29 von 31 img ohne alt, UUID-Dateinamen", "urls": ["/unsere-toilettenwagen/", "/kontakt/"]},
    {"id": "O6", "severity": "medium", "title": "Interne Verlinkung nur über Navigation", "evidence": "1 Kontextlink auf Home, 3x 'Jetzt anfragen' auf Wagen-Seite, keine Breadcrumbs", "urls": ["/", "/unsere-toilettenwagen/", "/agb/"]},
    {"id": "O7", "severity": "medium", "title": "Telefon/E-Mail nicht verlinkt", "evidence": "keine tel:/mailto:-Links; WhatsApp über wa.link-Shortlink", "urls": ["/kontakt/", "/impressum/"]},
    {"id": "O8", "severity": "low", "title": "Open-Graph-Tags fehlen", "evidence": "og:title/og:description/og:image auf 0 von 7 Seiten", "urls": ["/"]},
    {"id": "O9", "severity": "medium", "title": "LocalBusiness-Schema unvollständig/ungültig", "evidence": "sameAs leer, postalCode fehlt, openingHours-Objekt statt openingHoursSpecification", "urls": ["/"]}
  ]
}
```

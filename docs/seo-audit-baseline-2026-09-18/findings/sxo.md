# SXO-Analyse (Search Experience Optimization) – mobile-sanitaeranlagen-hs.de

Audit-Datum: 2026-09-18 · Analysierte Seiten: `/` (Startseite) und `/unsere-toilettenwagen/` · Sprache: de
Methode: SERPs für 6 Zielsuchanfragen rückwärts gelesen (WebSearch), 4 rankende Seiten strukturell geprüft (WebFetch), Zielseiten aus `data/page-*.json` (render_page.py, --mode auto, kein SPA).

**SXO Gap Score: 35/100** (getrennt vom SEO Health Score, siehe Abschnitt 5)

---

## 0. Kernbefund (zuerst lesen)

**Die Domain taucht in keiner der 6 Ziel-SERPs auf** (Top 9–10 jeweils geprüft). Der Hauptgrund ist ein doppelter Page-Type-/Intent-Mismatch:

1. **Startseite = Marken-Landingpage mit abgelaufenem Rabatt-Title** („Mobile Sanitäranlagen: 10% Rabatt bis 30.06.2026“, 69 Wörter, keine Region, kein Suchbegriff). Google belohnt für alle Ziel-Queries entweder **lokale Service-Landingpages** (Ort/Region im Title + H1) oder **Verzeichnisse/Kleinanzeigen**. Schweregrad: **CRITICAL**.
2. **Keine einzige Seite adressiert eine Region.** Für „Toilettenwagen mieten Westerwald/Siegen“ bestehen die SERPs zu 80–90 % aus Orts-Landingpages (curanto, WC-Master `/liefergebiet/…`, mobile-toilette.de `/toilettenwagen-mieten-siegen/`). Die Site erwähnt „Daaden“ nur im Kontakt-Title und in der Meta-Description der Startseite. Schweregrad: **CRITICAL**.

Die Produktseite `/unsere-toilettenwagen/` ist inhaltlich der stärkste Teil der Site (Modelle S/M/L mit WC-Zahlen und „ab“-Preisen – mehr als viele Wettbewerber zeigen), aber sie ist als reine Produktliste ohne Anlass-, Kapazitäts-, Liefergebiets- und Vertrauenssignale gebaut.

---

## 1. SERP-Analyse: Was Google pro Query belohnt

| Query | Dominanter Seitentyp (Konsens) | Belege (URLs) | Geteilte Inhaltselemente der Ranker |
|---|---|---|---|
| **Toilettenwagen mieten** (national) | Service-/Kategorieseite von Vermietern (~60 %), Verzeichnisse/Kleinanzeigen (~30 %), B2B-Directory (wlw) | toitoidixi.de/mobile-toiletten/toilettenwagen/, exklusive-wc-wagen.de, das-premium-bad-mobil.de/toilettenwagen-mieten/, aust-gg.de/produkt/toilettenwagen/, wcwagen-vermietung.de, toilettenwagen-mieten.com, kleinanzeigen.de/s-toilettenwagen-mieten/k0, wlw.de/de/showroom/toilettenwagen-mieten-kosten | Modelle mit WC/Urinal-Anzahl **und Personenkapazität** (Lampe: „Anna 50 Personen … 4XL 1.800 Personen“), Preise ab (197 € netto), Liefergebiet-Liste, Bewertungen (Lampe 30+), Anlass-Empfehlungen, Telefon mehrfach |
| **Toilettenwagen mieten Westerwald** | **Lokale Landingpage** (~90 %) | curanto.de/toilettenvermietung-bad-marienberg-westerwald-2657, wc-master-toilettenvermietung.de/liefergebiet/toiletten-mieten-im-westerwald/, mobile-toilette.de/toilette-mieten/rheinland-pfalz/bad-marienberg-westerwald/, toilettenvermietung.de/info_02-5-dernbachwesterwald.html, **kleinanzeigen.de …/exklusive-toilettenwagen-wc-wagen-fuer-ihre-veranstaltung/2006358201 (Anbieter in Niederfischbach, ~10 km von Daaden)** | Region/Ort in Title+H1, Ortslisten (WC-Master: 80+ Orte), Anfrageformular auf der Seite, kostenlose Hotline, Lieferung/Abholung/Reinigung als Leistungsversprechen |
| **Toilettenwagen mieten Siegen** | Lokale Landingpage (~78 %) + Mietportale (mietmeile ×2) | mietmeile.de/nordrhein-westfalen-siegen/…/toilettenwagen-mieten, curanto.de/toilettenvermietung-siegen-2714, mobile-toilette.de/toilettenwagen-mieten-siegen/, wcmarkt.de/angebot/mobile-toiletten-mieten/siegen/, **startoilettenwagenvermietung.de (Mudersbach – direkter lokaler Wettbewerber)** | STAR: H1 „Ihr WC-Wagen Komplettservice im Siegerland“, 5 Modelle mit WC-Zahlen, 50-km-Radius mit 10+ Ortsnamen, **Vereinsrabatt-Sektion**, 2 Bewertungen mit 5 Sternen, Hinweis zu barrierefreien WCs. curanto: Preistabelle 139–219 €, FAQ („Wie viele Toiletten brauche ich?“), TÜV-Badge, WhatsApp |
| **Toilettenwagen Hochzeit mieten** | Service-/Produktseite (~78 %), 1 Blog (mylocus), 1 Kleinanzeigen | wcmarkt.de/toilettenwagen/, erhard-weiss.de/toilettenwagen-mieten2, toilettenwagen-kamphake.de/toilettenwagen-mieten/, wc-express.com/…/toilettenwagen/, mylocus.de/blog/luxus-toilettenwagen-events/, das-premium-bad-mobil.de/klowagen/ | Framing „Luxus/VIP/elegant, neutral zur Deko“, Ausstattung Spiegel/Beleuchtung/Heizung, Preisanker „ab ca. 120 €/Tag“, Gästezahl → Modellempfehlung, Fotos Innenraum |
| **mobile Toilette mieten Baustelle** | **Online-Buchungs-/Kategorieseiten für Toilettenkabinen** (~85 %), 1 Ratgeber (bayernwc) | toitoidixi.de/mobile-toiletten/privat-mieten/, ecoservice24.com/de/baustellentoilette-mieten/, wcmarkt.de/…/baustellentoiletten/, quixx24.de, rentatoilet.de, bayernwc.de/blog/mobile-toilette-mieten/ | **Produkt = Kabine, nicht Wagen**; Wochenpreise inkl. Reinigung, Online-Kalenderbuchung, Pflichthinweis (Baustelle ohne WC → Aufstellpflicht), Stellplatzanforderungen |
| **Sanitärwagen mieten Rheinland-Pfalz** | Verzeichnisse/Kleinanzeigen (~55 %), Orts-Seiten (~22 %), Vermieter-Homepage (~22 %) | mietmeile.de/rheinland-pfalz/…/toilettenwagen-mieten, kleinanzeigen.de/s-rheinland-pfalz/toilettenwagen-mieten/k0l4938 (+3 weitere kleinanzeigen-URLs), toilettenwagen-vermietung.de (KS Sanitär), wc-express.com | Google übersetzt „Sanitärwagen“ → „Toilettenwagen“ (alle Titles). Kleinanzeigen-Inserate mit „ab 150 €/Tag, 250 €/Wochenende“ ranken |

**SERP-Features:** Keine Featured Snippets in den Rohdaten sichtbar; AI-Overview-artige Zusammenfassungen zu Kosten/Ausstattung/Stellplatz wurden bei 4 von 6 Queries ausgespielt (Themen: Kostenfaktoren, Damen-/Herren-Trennung, Warmwasser/Heizung, Stellplatz ebenerdig, Zufahrt 3 m). Local Pack konnte nicht direkt beobachtet werden (siehe Limitationen), ist bei „… Siegen/Westerwald“ aber sehr wahrscheinlich.

**Vokabular-Befund:** Alle 55 ausgewerteten Ranker-Titles verwenden „Toilettenwagen“, „WC-Wagen“, „Toilettenanhänger“ oder „Toilette(n) mieten“. **Kein einziger** führt mit „Mobile Sanitäranlagen“. Der Markenname ist als Title-/H1-Führung ungeeignet.

---

## 2. Page-Type-Klassifikation & Mismatch-Bewertung

| Seite | Ist-Typ (Taxonomie) | Soll-Typ laut SERP | Mismatch |
|---|---|---|---|
| `/` | Landing Page (dünn: Hero + 1 Absatz + 1 CTA „Unsere Sanitärwagen“; LocalBusiness-JSON-LD, aber Adresse/Region nicht im sichtbaren Haupttext) | **Local Service Page** („Toilettenwagen mieten [Region]“ + Modelle + Liefergebiet + Bewertungen + Anfrage) | **CRITICAL** |
| `/unsere-toilettenwagen/` | Product Page (3 Modelle, Preis, CTA → /kontakt/) | Service-/Produktseite mit Anlass- und Kapazitätsbezug | **MEDIUM** (richtige Familie, fehlende Tiefe) |
| Query „mobile Toilette mieten Baustelle“ vs. Angebot | Meta-Description der Startseite verspricht „Für Baustellen“; Produkt ist ein Event-Anhänger mit Pflicht-Abwasseranschluss ≤ 3 m | SERP erwartet Kabinen mit Wochenpreis/Online-Buchung | **HIGH** (falsches Versprechen → Absprung) |
| Query „… Hochzeit …“ vs. Angebot | Seite nennt „Veranstaltungen und Feste“, nie „Hochzeit“; Strand-/Meeresdesign-Wagen wird nicht als Hochzeitswagen positioniert | Luxus/VIP-Framing, Gästezahl-Empfehlung | **HIGH** |

---

## 3. User Stories (aus SERP-Signalen abgeleitet)

| # | User Story | Journey-Phase | Erzeugendes SERP-Signal |
|---|---|---|---|
| U1 | Als Brautpaar möchte ich sehen, wie der Wagen innen aussieht und ob er zu einer eleganten Feier passt, um ihn ohne Peinlichkeit vor Gästen buchen zu können. | Decision | Hochzeits-SERP: „Luxus/VIP“, „elegant, neutral zur Deko“, Spiegel/Beleuchtung (mylocus, wcmarkt) |
| U2 | Als Vereinsvorstand möchte ich wissen, welches Modell für 300 Kirmes-Besucher reicht und was Lieferung nach [Ort] kostet, um dem Vorstand ein Budget vorzulegen. | Consideration | Lampe: Personenkapazität je Modell; STAR: Vereinsrabatt + 50-km-Radius; curanto-FAQ „Wie viele Toiletten brauche ich?“ |
| U3 | Als Bauleiter möchte ich schnell eine Toilette für 8 Wochen online oder telefonisch bestellen, die ohne Kanalanschluss auskommt, um die Aufstellpflicht zu erfüllen. | Decision | Baustellen-SERP: Online-Kalenderbuchung, Wochenpreis inkl. Reinigung, Aufstellpflicht-Hinweis (ecoservice24, quixx24, rentatoilet) |
| U4 | Als Suchender aus Betzdorf/Altenkirchen/Siegen möchte ich sofort erkennen, ob der Anbieter zu mir liefert, um nicht vergeblich anzufragen. | Awareness | Westerwald/Siegen-SERP: 90 % Orts-Landingpages mit Ortslisten (WC-Master 80+ Orte, STAR 10+ Orte) |
| U5 | Als Privatperson (Geburtstag/Gartenfest) möchte ich einen transparenten Tages-/Wochenendpreis und Erfahrungen anderer sehen, um Vertrauen zu fassen. | Consideration | Kleinanzeigen-Inserate „ab 150 €/Tag, 250 €/Wochenende“ ranken; Bewertungen bei STAR/Lampe; AI-Overview „Kostenfaktoren“ |

---

## 4. Personas & Scoring (Relevanz / Klarheit / Vertrauen / Aktion, je 25)

**P1 Hochzeitspaar** – plant 80–150 Gäste, Scheune/Garten im Westerwald, Entscheidungsphase, emotional: Angst vor „Dixi-Klo-Optik“. Fragen: Sieht er hochwertig aus? Reicht Modell S für 120 Gäste? Was kostet das Wochenende inkl. Lieferung?
**P2 Vereinsfest-Organisator** – Kirmes/Schützenfest 300–800 Besucher, 2–3 Tage, Budgetverantwortung, Consideration. Fragen: Welches Modell für welche Besucherzahl? Vereinsrabatt? Wer reinigt zwischendurch? Strom/Wasser vor Ort?
**P3 Bauleiter** – braucht WC für Rohbau 6–12 Wochen, Decision, zeitknapp. Fragen: Geht das ohne Kanalanschluss? Wochenpreis? Kann ich heute noch bestellen?

| Persona | Seite | Relevanz | Klarheit | Vertrauen | Aktion | Gesamt | Rating |
|---|---|---|---|---|---|---|---|
| P1 Hochzeitspaar | `/` | 8 | 8 | 6 | 10 | **32** | Critical Mismatch |
| P1 Hochzeitspaar | `/unsere-toilettenwagen/` | 15 | 16 | 8 | 14 | **53** | Needs Work |
| P2 Vereinsfest | `/` | 10 | 8 | 6 | 10 | **34** | Critical Mismatch |
| P2 Vereinsfest | `/unsere-toilettenwagen/` | 17 | 17 | 8 | 14 | **56** | Needs Work |
| P3 Bauleiter | `/` | 5 | 5 | 5 | 8 | **23** | Critical Mismatch |
| P3 Bauleiter | `/unsere-toilettenwagen/` | 6 | 12 | 6 | 10 | **34** | Critical Mismatch |

Evidenz je Dimension:
- **Relevanz:** Startseite nennt weder Anlass noch Ort noch Modell (69 Wörter). Produktseite nennt WC-Zahlen und Preis, aber keine Personenkapazität, keinen Anlass, kein Liefergebiet. Für P3 ist das Produkt objektiv ungeeignet (Abwasseranschluss ≤ 3 m Pflicht) – die Site sagt das aber erst im Kleingedruckten.
- **Klarheit:** Produktseite ist scanbar (Bullets, Preiszeile). Startseite: Hero-Bild ohne Text-Overlay zur Leistung, Cookie-Banner überdeckt Above-the-fold, Title führt mit abgelaufenem Rabatt.
- **Vertrauen (schwächste Dimension, systemisch):** 0 Bewertungen, kein Google-Rating, kein „Über uns“, keine Referenzen/Einsatzfotos von echten Events, 29 von 31 Bildern ohne Alt-Text, JSON-LD mit `sameAs: ["","",…]`, `addressRegion: null`, ohne PLZ, Öffnungszeiten im Schema (Di–Fr 15–18, Sa 14–18, Mo leer) widersprechen der Seite (Mo–Fr 15–19, Sa 10–16). Navigation „Shop“ führt zu 9 Ecwid-Musterprodukten (Sonnenbrille, Kleid) – aktiv vertrauensschädigend.
- **Aktion:** Kein `tel:`- und kein `wa.me`-Link im HTML von `/` und `/unsere-toilettenwagen/` (WhatsApp nur als Text/Bild auf /kontakt/). „Jetzt anfragen“ führt auf ein 10-Felder-Formular ohne Modell-Vorauswahl. Für P3 fehlt jede Alternative (z. B. Partnerhinweis für Kabinen).

**Schwächste Persona: P3 Bauleiter (23/100)** → Entscheidung nötig: entweder Baustellen-Segment bedienen (Kabinen zukaufen/Partner) oder das Versprechen „Für Baustellen“ aus Meta-Description und Positionierung streichen und stattdessen „Langzeitmiete Toilettenwagen (Baustellen-Büro, Sanierung mit Kanalanschluss)“ als Nische anbieten.
**Größter Hebel: P1 + P2 auf einer lokalen Startseite** – das sind die Segmente, in denen das Produkt objektiv stark ist (Touchsensoren, LED, Design).

---

## 5. SXO Gap Score – 7 Dimensionen (Referenz: `/unsere-toilettenwagen/` als beste Seite)

| Dimension | Punkte | Evidenz |
|---|---|---|
| Page Type | 8/15 | Produktliste passt zur Familie; lokale Schicht fehlt komplett |
| Content Depth | 5/15 | 240 Wörter; keine Kapazität, kein Anlass, keine FAQ, kein Liefergebiet, kein Ablauf |
| UX Signals | 6/15 | Scanbare Bullets; aber kein Click-to-Call/WhatsApp-Link, Formular ohne Vorauswahl, „Mehr/Weniger“-Toggles verstecken Inhalt |
| Schema | 5/15 | LocalBusiness vorhanden, aber fehlerhaft/unvollständig; kein Product/Offer, kein FAQPage, kein areaServed |
| Media | 6/15 | 31 Fotos (gut), aber 29 ohne Alt-Text, keine Grundriss-/Maßskizze, kein Video |
| Authority | 2/15 | Nicht in Top 10 einer Ziel-SERP; keine Bewertungen; keine Verzeichnis-Präsenz (mietmeile, wcmarkt, kleinanzeigen) sichtbar |
| Freshness | 3/10 | Abgelaufene Aktion (30.06.2026) im Title seit 80 Tagen; keine Aktualitätssignale |
| **Summe** | **35/100** | |

---

## 6. Befunde mit Schweregrad und Empfehlung

| # | Befund | Schwere | Empfehlung (für den Relaunch) |
|---|---|---|---|
| F1 | Startseiten-Title führt mit abgelaufenem Rabatt, ohne Leistung/Region | CRITICAL | Title: „Toilettenwagen mieten im Westerwald & Siegerland – Herrmann & Smécz Daaden“. Aktionen nur zeitgesteuert (Next.js: Ablaufdatum → automatisch ausblenden), nie im Title |
| F2 | Keine regionale Verankerung im sichtbaren Inhalt | CRITICAL | H1 mit Region, Sektion „Liefergebiet“ mit Karte + Ortsliste (Daaden, Betzdorf, Kirchen, Altenkirchen, Wissen, Hachenburg, Bad Marienberg, Siegen, Neunkirchen, Burbach, Herdorf, Westerburg, Dierdorf, Montabaur) und Lieferpauschale nach Entfernung |
| F3 | Vokabular „Mobile Sanitäranlagen“ statt Such-Vokabular | HIGH | „Toilettenwagen mieten“ / „WC-Wagen“ in Title, H1, Navigation („Unsere Sanitärwagen“ → „Toilettenwagen“) |
| F4 | Kein Anlass-Bezug (Hochzeit, Vereinsfest, Firmenevent) | HIGH | Anlass-Seiten (siehe Struktur) + Anlass-Kacheln auf Startseite; Wagen S mit Strand-/Meeresdesign explizit als Hochzeitswagen positionieren |
| F5 | Baustellen-Versprechen ohne passendes Produkt | HIGH | Entweder Kabinen-Angebot/Partner oder Versprechen entfernen; Anschlussvoraussetzungen (Abwasser ≤ 3 m, Strom 230 V, Frischwasser) prominent statt im Kleingedruckten |
| F6 | Null Vertrauenssignale (Bewertungen, Referenzen, Team) | HIGH | Google-Bewertungen einholen und einbetten (mind. 5), 3–5 Einsatzfotos mit Ort/Anlass, „Über uns“ mit Gründern, Versicherungs-/Hygienehinweis |
| F7 | Shop mit Ecwid-Musterprodukten in der Navigation | HIGH | Shop entfernen bzw. `noindex` + aus Nav, bis echte Buchung existiert |
| F8 | Keine Personenkapazität je Modell | MEDIUM | Je Modell „empfohlen bis ca. X Gäste“ (S ≈ 100, M ≈ 200, L ≈ 400 als Startwerte, vom Betreiber verifizieren) + Modellfinder „Gästezahl → Wagen“ |
| F9 | Kein Click-to-Call / WhatsApp-Deeplink | MEDIUM | Sticky-Leiste mobil: `tel:+491602743001`, `https://wa.me/491602743001?text=…`, „Anfrage“; CTA je Modell mit Vorauswahl (`/anfrage?modell=m`) |
| F10 | LocalBusiness-Schema fehlerhaft/unvollständig | MEDIUM | `@type` `LocalBusiness` + `additionalType`, korrektes `openingHoursSpecification`, `postalCode`, `addressRegion: "RP"`, `areaServed` (Orte/Radius), `hasOfferCatalog` mit 3 `Product`/`Offer` (Preis ab, `priceSpecification` netto), `FAQPage`, `AggregateRating` sobald Bewertungen existieren; leere `sameAs` entfernen |
| F11 | 29/31 Bilder ohne Alt-Text | MEDIUM | Alt-Muster: „Toilettenwagen M innen – Damenbereich mit LED-Spiegel, Mietwagen Westerwald“ |
| F12 | Keine Verzeichnis-/Kleinanzeigen-Präsenz sichtbar | MEDIUM | Inserate auf kleinanzeigen.de (Rheinland-Pfalz + Siegen), Profile auf mietmeile.de, wcmarkt.de-Partner prüfen – diese Seiten ranken für 4 von 6 Queries |
| F13 | Öffnungszeiten Seite ≠ Schema | LOW | Eine Quelle (CMS-Feld) für Seite, Schema und Google Business Profile |

---

## 7. Empfohlene Seitenstruktur für den Relaunch (SOLL)

```
/                                   Toilettenwagen mieten im Westerwald & Siegerland
  ├ Hero: H1 + Sub „3 moderne WC-Wagen · Lieferung, Aufbau, Endreinigung · ab 175 €/Tag“
  │        CTAs: [Anrufen] [WhatsApp] [Unverbindlich anfragen]
  ├ Vertrauensleiste: Google-Sterne · „seit 20XX in Daaden“ · Liefergebiet 60 km
  ├ Modelle S/M/L (Karte: Foto, WC/Urinale, „bis ca. X Gäste“, ab-Preis, [Details] [Anfragen])
  ├ Einsatzbereiche (Kacheln → Anlass-Seiten): Hochzeit · Vereinsfest/Kirmes · Firmenevent · Privatfeier · Langzeit
  ├ So funktioniert's (4 Schritte: Anfrage → Angebot → Lieferung/Aufbau → Abholung)
  ├ Voraussetzungen am Aufstellort (Abwasser ≤ 3 m, Strom, Wasser, Zufahrt) – als Checkliste
  ├ Liefergebiet (Karte + Ortsliste + Lieferpauschale)
  ├ Bewertungen (3 Zitate + Link Google)
  ├ FAQ (6–8 Fragen: Wie viele Toiletten für 200 Gäste? Was ist im Preis enthalten? Winter/Heizung? Wochenendpreis?)
  └ Kontakt-Kurzform (Name, Telefon, Datum von/bis, Ort, Modell)

/toilettenwagen/                    Übersicht aller Modelle (Vergleichstabelle S/M/L)
/toilettenwagen/s/ | /m/ | /l/      Detail: Galerie (Alt-Texte), Grundriss/Maße, Ausstattung, Kapazität, Preis, Product+Offer-Schema, CTA mit Vorauswahl
/toilettenwagen-mieten/hochzeit/    Anlass-Seiten: je 400–700 Wörter, passendes Modell, Fotos, Anlass-FAQ
/toilettenwagen-mieten/vereinsfest/ (+ Hinweis Vereinsrabatt/Mehrtages-Preis, Zwischenreinigung)
/toilettenwagen-mieten/firmenevent/
/toilettenwagen-mieten/baustelle/   NUR wenn Angebot existiert (Langzeit mit Kanalanschluss oder Partner-Kabinen)
/liefergebiet/westerwald/           Regionsseite mit echtem Inhalt (Anfahrtszeit, Referenz-Orte, Fotos vor Ort)
/liefergebiet/siegen-siegerland/    dito – max. 4–6 Regionsseiten, keine Doorway-Massenseiten
/preise/                            Preistabelle Tag/Wochenende/Woche je Modell + Lieferpauschale + Inklusivleistungen
/anfrage/                           Formular mit Modell-Select, Datum, Ort, Gästezahl; Telefon/WhatsApp daneben
/ueber-uns/ · /bewertungen/ · /faq/ · /kontakt/ · /impressum/ · /datenschutz/ · /agb/
Entfernen/noindex: /shop/ (Ecwid-Muster), Demo-Produkt-URLs, /comments/feed/
```

**Cross-Skill-Hinweise:** E-E-A-T-Lücken → `/seo content`; Schema-Generierung (LocalBusiness, Product/Offer, FAQPage) → `/seo schema`; Local Pack / Google Business Profile → `/seo local`; dünne Startseite → `/seo page`.

---

## 8. Limitationen

- WebSearch liefert organische Top-10-Links und Zusammenfassungen, aber keine direkte Sicht auf Local Pack, Anzeigenanzahl, PAA-Boxen oder Positionen; Local-Pack-Präsenz ist für die Orts-Queries abgeleitet, nicht beobachtet.
- Suchvolumen/Ranking-Daten fehlen (keine Google-API/DataForSEO-Anbindung); Persona-Gewichtung beruht auf SERP-Zusammensetzung.
- Personenkapazitäten je Modell sind Schätzwerte und müssen vom Betreiber bestätigt werden.
- Rendered-DOM-Above-the-fold nur für die Startseite als Screenshot geprüft; Mobile-Viewport nicht separat gerendert.
- Wettbewerberseiten wurden per WebFetch strukturell erfasst (4 Seiten); Inhalte sind ungeprüfte Fremddaten.

PDF-Report erzeugen? `/seo google report`

---

## 9. Strukturierte Befunde (für audit-data.json, Kategorie „Search Experience“)

```json
{
  "category": "Search Experience",
  "sxo_gap_score": 35,
  "target_absent_from_all_target_serps": true,
  "dimension_scores": {"page_type": 8, "content_depth": 5, "ux_signals": 6, "schema": 5, "media": 6, "authority": 2, "freshness": 3},
  "serp_consensus": [
    {"query": "Toilettenwagen mieten", "dominant_type": "Service Page (Vermieter)", "confidence": 0.6, "secondary": "Directory/Kleinanzeigen"},
    {"query": "Toilettenwagen mieten Westerwald", "dominant_type": "Local Page", "confidence": 0.9},
    {"query": "Toilettenwagen mieten Siegen", "dominant_type": "Local Page", "confidence": 0.78, "secondary": "Rental portal (mietmeile)"},
    {"query": "Toilettenwagen Hochzeit mieten", "dominant_type": "Service Page", "confidence": 0.78},
    {"query": "mobile Toilette mieten Baustelle", "dominant_type": "Product/Booking Page (Toilettenkabine)", "confidence": 0.85},
    {"query": "Sanitärwagen mieten Rheinland-Pfalz", "dominant_type": "Directory/Kleinanzeigen", "confidence": 0.55}
  ],
  "page_type_mismatch": [
    {"url": "/", "is": "Landing Page (thin, brand)", "should": "Local Service Page", "severity": "CRITICAL"},
    {"url": "/unsere-toilettenwagen/", "is": "Product Page", "should": "Service/Product with occasion + capacity + area", "severity": "MEDIUM"},
    {"scope": "Baustelle intent", "is": "Event trailer requiring sewer", "should": "Cabin online booking", "severity": "HIGH"}
  ],
  "persona_scores": [
    {"persona": "Hochzeitspaar", "url": "/", "relevance": 8, "clarity": 8, "trust": 6, "action": 10, "total": 32},
    {"persona": "Hochzeitspaar", "url": "/unsere-toilettenwagen/", "relevance": 15, "clarity": 16, "trust": 8, "action": 14, "total": 53},
    {"persona": "Vereinsfest-Organisator", "url": "/", "relevance": 10, "clarity": 8, "trust": 6, "action": 10, "total": 34},
    {"persona": "Vereinsfest-Organisator", "url": "/unsere-toilettenwagen/", "relevance": 17, "clarity": 17, "trust": 8, "action": 14, "total": 56},
    {"persona": "Bauleiter", "url": "/", "relevance": 5, "clarity": 5, "trust": 5, "action": 8, "total": 23},
    {"persona": "Bauleiter", "url": "/unsere-toilettenwagen/", "relevance": 6, "clarity": 12, "trust": 6, "action": 10, "total": 34}
  ],
  "findings": [
    {"id": "F1", "severity": "CRITICAL", "title": "Startseiten-Title mit abgelaufenem Rabatt, ohne Leistung/Region"},
    {"id": "F2", "severity": "CRITICAL", "title": "Keine regionale Verankerung im sichtbaren Inhalt"},
    {"id": "F3", "severity": "HIGH", "title": "Vokabular 'Mobile Sanitäranlagen' statt 'Toilettenwagen mieten'"},
    {"id": "F4", "severity": "HIGH", "title": "Kein Anlass-Bezug (Hochzeit, Vereinsfest, Firmenevent)"},
    {"id": "F5", "severity": "HIGH", "title": "Baustellen-Versprechen ohne passendes Produkt"},
    {"id": "F6", "severity": "HIGH", "title": "Keine Vertrauenssignale (Bewertungen, Referenzen, Team)"},
    {"id": "F7", "severity": "HIGH", "title": "Shop mit Ecwid-Musterprodukten in Navigation"},
    {"id": "F8", "severity": "MEDIUM", "title": "Keine Personenkapazität je Modell"},
    {"id": "F9", "severity": "MEDIUM", "title": "Kein tel:/wa.me-Link, Anfrage-CTA ohne Modell-Vorauswahl"},
    {"id": "F10", "severity": "MEDIUM", "title": "LocalBusiness-Schema fehlerhaft/unvollständig, kein Product/Offer/FAQPage"},
    {"id": "F11", "severity": "MEDIUM", "title": "29/31 Bilder ohne Alt-Text"},
    {"id": "F12", "severity": "MEDIUM", "title": "Keine Verzeichnis-/Kleinanzeigen-Präsenz (ranken für 4/6 Queries)"},
    {"id": "F13", "severity": "LOW", "title": "Öffnungszeiten auf Seite widersprechen Schema"}
  ]
}
```

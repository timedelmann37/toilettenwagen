# Local SEO Audit — mobile-sanitaeranlagen-hs.de

Geprüft: 2026-09-18 · Quelle: gerenderte Seiten in `data/page-*.json` (Struktogramm/JSON-LD aus `raw_content` extrahiert). Kein DataForSEO, keine Google-API-Credentials verfügbar — Live-GBP-/Ranking-Daten konnten **nicht** verifiziert werden (siehe Limitations).

## Local SEO Score: 22 / 100

| Dimension | Gewicht | Score (0-100) | Beitrag |
|---|---|---|---|
| GBP-Signale | 25% | 20 | 5,0 |
| Reviews & Reputation | 20% | 5 | 1,0 |
| Lokales On-Page-SEO | 20% | 25 | 5,0 |
| NAP-Konsistenz & Zitate | 15% | 30 | 4,5 |
| Lokales Schema-Markup | 10% | 40 | 4,0 |
| Lokale Link-/Autoritätssignale | 10% | 20 | 2,0 |
| **Gesamt** | | | **22** |

Niedriger Score ist erwartbar für eine Alt-WordPress-Seite ohne gepflegtes GBP-Profil — als Baseline für den Next.js-Relaunch gedacht.

## Business-Typ: Service-Area Business (SAB), bestätigt

Sitz in Daaden (Westerwald/RLP), Anfahrt zu Veranstaltungen/Baustellen. Auf der Seite gibt es **keine** "wir kommen zu Ihnen"-Formulierung, keinen Lieferradius (km) und **keine Auflistung von Einsatzorten/Regionen** (Westerwald, Siegen, Betzdorf, Altenkirchen, Kirchen, Wissen, Herdorf etc. — keiner dieser Begriffe kommt irgendwo auf der Site vor, weder im Fließtext noch im Schema). Einzige Ortsangabe sitewide: "Daaden" (Impressum/Kontakt-Titel). **Severity: High** — für ein SAB ist die explizite Nennung des Servicegebiets der wichtigste On-Page-Rankingfaktor (Whitespark 2026: dedizierte Service-/Gebietsseiten = #1 lokaler organischer Faktor).

## NAP-Konsistenz-Audit (Quellenvergleich)

| Quelle | Name | Adresse | Telefon | E-Mail |
|---|---|---|---|---|
| Impressum (Fließtext) | **„Mobile Sanitäranalgen Herrmann und Smécz UG"** (Tippfehler: „analgen" statt „anlagen"!) | Im Reuschewäldchen 12, 57567 Daaden | +49 160 2743001 | kontakt@mobile-sanitaeranlagen-hs.de |
| Impressum (Title-Tag) | „...Mobile Sanitäranlagen" (korrekt geschrieben) | — | — | — |
| Kontakt (Fließtext) | Mobile Sanitäranlagen Herrmann und Smécz UG | Im Reuschewäldchen 12, 57567 Daaden | +49 160 2743001 | kontakt@mobile-sanitaeranlagen-hs.de |
| Meta-Description /kontakt/ | — | Adresse referenziert, nicht ausgeschrieben | +49 160 2743001 | — |
| AGB (Fließtext) | „Herrmann & Smécz UG (haftungsbeschränkt)" — abweichende Kurzform mit „&" statt „und" | — | — | — |
| JSON-LD (sitewide, identisch auf allen 7 Seiten) | Mobile Sanitäranlagen Herrmann und Smécz UG | streetAddress „Im Reuschewäldchen 12", addressLocality „Daaden", **kein postalCode, kein addressCountry**, addressRegion: null | „01602743001" (national, ohne +49, ohne Leerzeichen — Format weicht vom sichtbaren Text ab) | kontakt@mobile-sanitaeranlagen-hs.de |
| Sichtbares Footer/Nav (Home, Shop, AGB, Wagen-Seite) | — kein NAP im Footer — | — kein NAP im Footer — | — kein NAP im Footer — | — |

**Befunde:**
1. **Critical:** Impressum enthält im Firmennamen selbst zwei unterschiedliche Schreibweisen auf derselben Seite ("Sanitäranlagen" im Title, "Sanitäranalgen" im Fließtext-Firmennamen). Impressum ist die Quelle, aus der viele deutsche Verzeichnisse (11880, Das Örtliche, gelbeseiten) den Firmennamen übernehmen — ein Tippfehler dort pflanzt sich in Zitate fort und schadet der NAP-Konsistenz systematisch. Vor Korrektur mit dem Handelsregistereintrag (HRB 30803, AG Montabaur) abgleichen, welche Schreibweise offiziell korrekt ist.
2. **High:** Telefonnummer im JSON-LD ("01602743001") ist anders formatiert als im sichtbaren Text/Meta-Description ("+49 160 2743001"). Gleiche Nummer, aber inkonsistentes Format — sollte einheitlich im internationalen Format (`+49 160 2743001` bzw. `tel:+491602743001`) vorliegen, v. a. weil GBP und Zitate exakt diese Formatierung spiegeln sollten.
3. **High:** JSON-LD-Adresse fehlt `postalCode` ("57567") und `addressCountry` komplett — auf **allen** Seiten. Das ist ein Pflichtfeld für vollständige NAP-Schema-Daten und wird von manchen Aggregatoren/Rich-Result-Parsern als unvollständig zurückgewiesen.
4. **Medium:** Keine `tel:`- oder `mailto:`-Links irgendwo auf der Site (0 Treffer sitewide) — Klick-zum-Anrufen fehlt komplett, auch auf der Kontaktseite. WhatsApp wird nur als Text erwähnt, kein `wa.me`-Link.
5. **Medium:** Kein sichtbares NAP im Footer auf den Commerce-relevanten Seiten (Home, Toilettenwagen-Seite, Shop) — nur auf Kontakt/Impressum. Für lokale Signalstärke sollte NAP (mind. Ort + Telefon) im globalen Footer stehen.
6. **Low:** JSON-LD `url` = `https://mobile-sanitaeranlagen-hs.de` (ohne `www.`), während der Canonical-Tag durchgängig `https://www.mobile-sanitaeranlagen-hs.de/` verwendet — kleine Inkonsistenz in der Entitäts-URL.

## GBP-Optimierungs-Checkliste (erkannt vs. fehlend)

| Signal | Status | Evidenz |
|---|---|---|
| Google-Maps-Embed vorhanden | Teilweise vorhanden | Maps-Embed-API-Aufruf auf /kontakt/ (`google.com/maps/embed/v1/place?...q=Im+Reuschewäldchen+12...`), aber hinter Cookie-Consent-Blocker versteckt (`display:none` bis Klick auf „Akzeptieren") — Crawler/Erstbesucher sehen ohne Interaktion keine Karte. |
| Verlinkung zu echtem GBP-Profil (Place-ID/CID) | **Fehlt** | Embed nutzt eine reine Adress-Query, keine `place_id`/CID — kein Beleg, dass überhaupt ein bestehendes, verifiziertes Google-Business-Profil verlinkt ist. |
| `sameAs`-Verweise (Social/GBP/Verzeichnisse) im Schema | **Fehlt komplett** | JSON-LD enthält `"sameAs":["","","","","","",""]` — 7 leere Platzhalter, die das Website-Baukasten-Template vorgesehen hat, aber nie befüllt wurden. |
| Facebook/Instagram-Links | **Fehlt** | 0 Treffer sitewide für facebook.com/instagram.com. |
| Review-Widget/Sternebewertungen auf der Seite | **Fehlt** | Keine Treffer für Bewertungs-/Sterne-Markup; alle "review"-Treffer im HTML sind JS-Kommentare (IntersectionObserver-Code), keine echten Rezensionen. |
| Google-Posts-Hinweise | Nicht prüfbar von der Website aus | Kein Hinweis auf der Site — GBP-Posts sind ohnehin nur im Profil selbst sichtbar. |
| Fotobelege (Fahrzeuge/Anlagen) | Vorhanden auf /unsere-toilettenwagen/ | 31 Bilder, aber laut Kontext 29 ohne Alt-Text — Bilder ohne Ortsbezug im Alt-Text (verpasste lokale Bild-SEO-Chance). |
| Öffnungszeiten konsistent mit GBP | **Nicht prüfbar / Widerspruch on-site** | Sichtbarer Text (Kontakt): Mo–Fr 09–13/15–19 Uhr, Sa 10–16 Uhr. JSON-LD: Fr endet um 18 Uhr (nicht 19 Uhr), Sa 14–18 Uhr (nicht 10–16 Uhr), Montag im JSON-LD ganz ohne Zeiten. **Website widerspricht sich selbst zwischen sichtbarem Text und Schema.** |

**Handlungsempfehlung an den Betreiber (nicht von außen verifizierbar):** Bitte im Google-Business-Profil-Dashboard (business.google.com) prüfen: (a) Ist ein Profil überhaupt angelegt/verifiziert? (b) Primärkategorie korrekt gesetzt (idealerweise „Toilettenverleih“ bzw. „Sanitäreinrichtungen-Vermietung“ — Whitespark 2026: falsche Primärkategorie ist der **stärkste negative Rankingfaktor**)? (c) Servicegebiet (Westerwald, Kreis Altenkirchen, Kreis Siegen-Wittgenstein) statt/zusätzlich zur Pin-Adresse hinterlegt? (d) Öffnungszeiten im Profil vs. Website abgleichen? (e) Regelmäßig Fotos/Posts pflegen (18-Tage-Regel: Sterling Sky zufolge droht ohne Aktivität alle 3 Wochen ein Ranking-Einbruch).

## Review-Snapshot

- **Sichtbare Bewertungen: 0.** Keine Sterne, kein `aggregateRating` im Schema, kein Testimonial-Bereich, kein Review-Widget (Google/Trustpilot/Facebook) irgendwo eingebettet.
- Aktuelle Rating/Count/Response-Rate im echten GBP-Profil kann von der Website aus **nicht verifiziert werden** — Betreiber sollte dies direkt im GBP-Dashboard oder per Google-Maps-Suche „Mobile Sanitäranlagen Herrmann und Smécz" prüfen.
- **Fix:** Aktiv um Bewertungen bitten (Review-Link per WhatsApp/E-Mail nach jeder Vermietung), sobald ein GBP-Profil existiert; mind. 1 neue Bewertung alle 2-3 Wochen anstreben (18-Tage-Regel).

## Citation-Status (Tier 1, für DE-Vermietungsbetrieb)

Keine Citation-Präsenz von der Website aus verifizierbar (keine ausgehenden Links zu Profilen, kein NAP-Abgleich möglich ohne Live-Suche/DataForSEO). **Alle folgenden Einträge sind ungeprüfte Empfehlungen, keine bestätigten Lücken:**

| Priorität | Verzeichnis | Warum relevant |
|---|---|---|
| Kritisch | Google Business Profile | Primärer lokaler Rankingfaktor; Kategorie + Servicegebiet + Fotos/Reviews |
| Kritisch | Bing Places for Business | Speist Bing/Copilot-Local-Ergebnisse, oft vernachlässigt |
| Hoch | Das Örtliche | Größtes klassisches DE-Verzeichnis, hohe Vertrauenswürdigkeit bei Nutzern 45+ (Baustellen-/Eventkunden-Zielgruppe) |
| Hoch | GelbeSeiten.de | Standard-DE-Zitat, wird von Aggregatoren gespiegelt |
| Hoch | 11880.com | Klassisches Telefonbuch-Pendant, NAP-Konsistenz wichtig |
| Mittel | Apple Maps (Apple Business Connect) | Wachsender Anteil bei iOS-Nutzern/CarPlay-Navigation zur Baustelle |
| Mittel | Yelp.de | Geringere DE-Relevanz, aber gehört zu den vom Whitespark-Modell erfassten Tier-1-Signalen |
| Mittel | Branchen-spezifisch: **MietMeister / Rentaki / Mietflotte** (Baumaschinen-/Eventverleih-Portale) | Themenrelevante Nischenverzeichnisse für Verleihbetriebe, oft leicht zu bekommen und stark themenrelevant |
| Niedrig | BBB-Äquivalent DE: **TÜV/Trusted Shops** (falls Online-Shop-Bestellung ernst betrieben wird) | Vertrauenssignal für den Ecwid-Shop |
| Niedrig | Facebook-Unternehmensseite + Instagram | Aktuell 0 Social-Profile verlinkt — Basis-Präsenz fehlt komplett |

**Wichtig:** Vor Eintragung in jedes Verzeichnis zuerst den Impressum-Tippfehler ("Sanitäranalgen") und das Telefonformat vereinheitlichen — sonst werden inkonsistente NAP-Daten in die Zitate übernommen.

## Lokale Schema-Validierung

**Typ:** `LocalBusiness` (generisch) — es existiert kein spezifischerer von Google unterstützter Subtyp für Toilettenwagen-/Sanitärverleih; `LocalBusiness` ist daher vertretbar. Empfehlung für den Relaunch: zusätzlich `additionalType` oder Kategorie-Text nutzen, um "Equipment Rental Service" zu präzisieren.

| Property | Status | Bewertung |
|---|---|---|
| `name` | vorhanden, aber s.o. Tippfehler-Risiko in Impressum-Quelle | Pflichtfeld ✓ (inhaltlich zu bereinigen) |
| `address` | vorhanden, aber **ohne `postalCode`, ohne `addressCountry`** | Pflichtfeld unvollständig — **High** |
| `geo` (lat/long) | vorhanden, sehr präzise (>5 Dezimalstellen) | Empfehlung erfüllt ✓ |
| `openingHours` | vorhanden, aber **kein gültiges Schema.org-Format** — verschachteltes Objekt `{weekDays:[...], timeFormat:"24"}` statt String/Array oder `OpeningHoursSpecification` | **High** — wird von Google/Rich-Results wahrscheinlich nicht korrekt geparst |
| `telephone` | vorhanden, Formatinkonsistenz zu sichtbarem Text | Empfehlung teilweise erfüllt |
| `url` | vorhanden, aber ohne `www.` (Canonical-Mismatch) | Low |
| `sameAs` | vorhanden, aber **7 leere Strings** | fehlt faktisch — **Medium** |
| `areaServed` | **fehlt komplett** | für SAB industrie-empfohlen — **High**, besonders relevant hier |
| `priceRange` | **fehlt** | Preise ab 175-210€/Tag sind auf der Seite genannt, aber nicht im Schema |
| `aggregateRating` | fehlt (keine Reviews vorhanden — konsistent) | nachholen, sobald Reviews existieren |
| `image` | fehlt (nur `logo`) | Empfehlung nicht erfüllt |
| `@id` | fehlt | keine eindeutige Entitäts-ID für Knowledge-Graph-Verknüpfung |

Das Schema-Block ist **identisch auf allen 7 Seiten** (byte-genau gleich, 780 Bytes) — offensichtlich ein sitewide-Template des Website-Baukastens, nicht manuell gepflegt. Positiv: Konsistenz über die Seite hinweg ist gegeben, negativ: strukturelle Mängel wiederholen sich auf jeder Seite.

## Lokales On-Page-SEO / Keyword-Targeting

| Seite | Title | H1 | Ortsbezug? |
|---|---|---|---|
| / (Home) | „Mobile Sanitäranlagen: 10% Rabatt bis 30.06.2026" | „Hochwertige mobile Sanitäranlagen" | **Kein Ortsbezug** — Rabatt-Datum zudem abgelaufen (heute: 2026-09-18) |
| /unsere-toilettenwagen/ | „Moderne Toilettenwagen für Veranstaltungen mieten" | „Unsere Toilettenwagen für Ihre Veranstaltung" | **Kein Ortsbezug** — genau die Seite, die für „Toilettenwagen mieten Westerwald/Siegen/Betzdorf" ranken müsste |
| /kontakt/ | „Kontakt zu Mobile Sanitäranlagen - Daaden" | (kein H1) | „Daaden" vorhanden |
| /impressum/ | „Impressum & Unternehmensinfo..." | „Impressum" | „Daaden" nur im Fließtext (Pflichtangabe, kein Keyword-Kontext) |

**Kritischer Befund:** Die beiden konversionsrelevanten Seiten (Home, Toilettenwagen-Übersicht) enthalten **keinerlei** Standort- oder Regionsbegriff in Title/H1/Copy. Es gibt keine dedizierte Servicegebiets-Seite oder -Sektion, die Westerwald, Siegen, Betzdorf, Altenkirchen, Kirchen, Wissen, Herdorf o. ä. nennt — obwohl das laut Kontext genau die Lieferregion ist. Laut Whitespark 2026 sind dedizierte Servicegebiets-/Serviceseiten der **wichtigste lokale organische Rankingfaktor** und der zweitwichtigste Faktor für KI-Sichtbarkeit (ChatGPT/Perplexity-Empfehlungen). Das ist die größte Chance für den Next.js-Relaunch.

## Standortseiten (Multi-Location)

Nicht zutreffend — Einzelstandort-SAB, keine Filialseiten zu prüfen.

## Top 10 priorisierte Maßnahmen

1. **[Critical]** Firmennamen-Tippfehler im Impressum („Sanitäranalgen" → „Sanitäranlagen") korrigieren, mit Handelsregister (HRB 30803, AG Montabaur) abgleichen, und identischen Namen auf allen Seiten/im Schema verwenden.
2. **[Critical]** Servicegebiet explizit benennen: eigene Sektion/Seite „Einsatzgebiet" mit Westerwald, Kreis Altenkirchen, Kreis Siegen-Wittgenstein sowie konkreten Städten (Siegen, Betzdorf, Altenkirchen, Kirchen, Wissen, Herdorf, Daaden …) und ggf. Liefer-km-Radius. In Title/H1 der Toilettenwagen-Seite und Homepage einbauen.
3. **[Critical]** Google Business Profile Status prüfen/anlegen/verifizieren lassen (durch Betreiber — nicht von außen einsehbar); korrekte Primärkategorie setzen (stärkster Rankingfaktor laut Whitespark 2026).
4. **[High]** JSON-LD `openingHours` in gültiges Schema.org-Format bringen (String-Array `"Mo,Tu,We,Th,Fr 09:00-13:00"` etc. oder `OpeningHoursSpecification`) und mit den tatsächlichen, sichtbaren Öffnungszeiten synchronisieren (aktuell widersprechen sich Fr-Ende 18 vs. 19 Uhr, Sa 14-18 vs. 10-16 Uhr, Montag fehlt).
5. **[High]** `postalCode` (57567) und `addressCountry` (DE) im JSON-LD ergänzen — auf allen Seiten.
6. **[High]** Reviews aktiv aufbauen: GBP-Bewertungslink nach jeder Vermietung per WhatsApp/E-Mail verschicken; Ziel mind. alle 2-3 Wochen eine neue Bewertung (18-Tage-Regel), sobald GBP existiert.
7. **[Medium]** Telefonnummer sitehsweit einheitlich im internationalen Format formatieren (`+49 160 2743001`) inkl. `tel:`-Links (aktuell 0 Klick-zum-Anrufen-Links sitewide) und `wa.me`-Link statt reinem Text.
8. **[Medium]** `sameAs` im Schema befüllen (Google-Profil-URL, Facebook/Instagram falls vorhanden) statt 7 leerer Platzhalter; Social-Profile grundsätzlich anlegen, falls nicht vorhanden.
9. **[Medium]** NAP (Ort + Telefon, klickbar) im globalen Footer auf allen Seiten ergänzen, nicht nur auf Kontakt/Impressum.
10. **[Low]** Prioritätsliste Citations abarbeiten: Google Business Profile → Bing Places → Das Örtliche → GelbeSeiten → 11880 → Apple Business Connect → themenrelevante Verleih-Portale (siehe Tabelle oben) — jeweils NAP exakt nach bereinigtem Impressum eintragen. Zusätzlich `priceRange` und `areaServed` im Schema ergänzen, `url` im Schema auf `https://www.` vereinheitlichen.

## Limitations / nicht prüfbar ohne bezahlte Tools

- **Kein Zugriff auf das echte Google-Business-Profil** (kein API-Key, kein DataForSEO) — Existenz, Verifizierungsstatus, echte Sternebewertung/Anzahl, Review-Velocity, Kategorie-Zuordnung, Fotos/Posts-Aktivität und Local-Pack-Position konnten **nicht** direkt abgefragt werden. Alle Aussagen dazu sind Website-seitige Indizien, keine Bestätigung.
- **Proximity-Faktor** (55,2% der Ranking-Varianz laut Search Atlas ML-Studie) liegt außerhalb der Kontrolle des Betreibers und wurde hier nicht bewertet.
- **Citation-Konsistenz auf externen Verzeichnissen** (Yelp, BBB, gelbeseiten, 11880, Das Örtliche) konnte nicht per Live-Suche verifiziert werden — Empfehlungen in der Tabelle sind Prioritäten, keine bestätigten Lücken oder Duplicate-Listing-Funde.
- **Backlink-/Autoritätsprofil** wurde nur oberflächlich anhand fehlender On-Page-Hinweise (keine Presse-/Partner-Links, keine Verzeichnis-Badges) bewertet, nicht anhand echter Backlink-Daten.
- Kontext-Hinweis: Das Sitemap-Problem mit 9 Ecwid-Demo-Produkten (Kleidung statt Sanitäranlagen) betrifft primär Technical/Content-SEO, wurde hier nur am Rand erwähnt, da es indirekt Trust-/Relevanzsignale für lokale Suche schwächen kann.

Rohdaten: `C:\Users\timed\tmp\mobile-sanitaeranlagen-hs.de-audit\data\page-*.json` (Feld `raw_content` enthält das extrahierte `<script type="application/ld+json">`), `data\txt-*.txt` (sichtbarer Text je Seite).

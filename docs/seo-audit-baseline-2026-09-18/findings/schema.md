# Schema.org-Audit — mobile-sanitaeranlagen-hs.de

**Datum:** 2026-09-18
**Geprüfte Seiten:** `/`, `/unsere-toilettenwagen/`, `/kontakt/`, `/impressum/`, `/shop/`, `/agb/`, `/datenschutz/`
**Tools:** `render_page.py`-Snapshots aus `data/page-*.json` (Feld `content`/`structured_data`), manuelle JSON-LD-Extraktion (Node), `schema_generate.py --help` geprüft (deckt nur `reservation/order/discussion/profile` ab — für LocalBusiness/Service/Offer/BreadcrumbList nicht einschlägig, daher manuell nach Schema.org-Spezifikation erstellt).

## Score: 38 / 100

Begründung: Es existiert zwar auf **jeder** Seite ein JSON-LD-Block, aber er ist technisch fehlerhaft (ungültige `openingHours`-Syntax, `geo`-Properties nicht verschachtelt, fehlende Pflicht-Adressfelder), widerspricht an zentraler Stelle den sichtbaren Öffnungszeiten auf `/kontakt/`, enthält eine unbrauchbare `sameAs`-Liste (7× Leerstring) und einen wahrscheinlich toten `logo`-Pfad. Zusätzlich fehlt jede strukturierte Abbildung des Kerngeschäfts (3 Toilettenwagen mit Tagespreisen), obwohl die Preise im Klartext auf der Seite stehen. Kein Rich-Result-Schaden durch deprecated Typen (FAQPage/HowTo), da keine vorhanden sind — das drückt den Score nicht weiter, hebt ihn aber auch nicht.

---

## 1. Erkanntes Schema (Ist-Zustand)

**Einziger Typ auf der gesamten Seite:** `LocalBusiness` + verschachteltes `PostalAddress`. Identischer JSON-LD-Block, Byte-für-Byte, auf allen 7 geprüften Seiten inkl. `/agb/` und `/datenschutz/` — er wird offensichtlich global vom IONOS/„go-x"-Website-Baukasten injiziert, nicht Seiten-spezifisch gerendert.

Extrahiert aus `data/page-home.json` (`content`, `<script type="application/ld+json">`):

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Daaden",
    "streetAddress": "Im Reuschewäldchen 12",
    "addressRegion": null
  },
  "telephone": "01602743001",
  "logo": "/-_-/resources/images/files/65e3544e-92ef-40ff-9525-9d2cc851b83a/e9436a69-49b0-4bfa-b724-d1e7cbad0dbe?o=rs:fill:1024:1024:1:1/g:sm/",
  "url": "https://mobile-sanitaeranlagen-hs.de",
  "longitude": 7.958288699999999,
  "latitude": 50.73930499999999,
  "name": "Mobile Sanitäranlagen Herrmann und Smécz UG",
  "sameAs": ["", "", "", "", "", "", ""],
  "openingHours": {
    "weekDays": ["Mo ", "Tu 09:00-13:00,15:00-18:00", "We 09:00-13:00,15:00-18:00", "Th 09:00-13:00,15:00-18:00", "Fr 09:00-13:00,15:00-18:00", "Sa 14:00-18:00", "Su "],
    "timeFormat": "24"
  },
  "email": "kontakt@mobile-sanitaeranlagen-hs.de"
}
```

Kein `WebSite`, kein `Organization`, kein `BreadcrumbList`, kein `Service`/`Offer`/`Product`, kein `FAQPage`, kein `HowTo`. Keine Microdata, keine RDFa gefunden.

---

## 2. Validierung — Befund je Property

| # | Property/Block | Befund | Schweregrad | Beleg |
|---|---|---|---|---|
| 1 | `openingHours` | **Ungültige Syntax.** Schema.org erwartet einen Text-String (z. B. `"Mo,Tu,We,Th,Fr 09:00-13:00"`) oder `openingHoursSpecification`-Objekte. Hier steht ein Custom-Objekt `{weekDays:[...], timeFormat:"24"}` — das ist kein gültiger Schema.org-Werttyp und wird vom Rich-Results-Test voraussichtlich als "Ungültiger Wert" verworfen. | **Kritisch** | `data/page-home.json` (siehe oben) |
| 2 | `openingHours` vs. sichtbarer Text | **Widerspricht dem Seiteninhalt.** JSON-LD: Mo geschlossen, Di–Fr 09:00–13:00 & 15:00–**18**:00, Sa **14:00–18:00**, So geschlossen. `/kontakt/` zeigt: „Mo – Fr 09:00–13:00 / 15:00–**19**:00", „Samstag **10:00–16:00**", „Sonntag Geschlossen". Montag wird auf der Kontaktseite nicht ausgeschlossen, im JSON-LD aber leer/geschlossen geführt. Das ist keine Formatierungsfrage, sondern ein inhaltlicher Widerspruch zwischen strukturierten Daten und sichtbarem Inhalt (verstößt gegen Googles Richtlinie „structured data muss den sichtbaren Content widerspiegeln"). | **Kritisch** | `data/page-home.json` vs. `data/page-kontakt.json` (`extracted_text`) |
| 3 | `geo` (latitude/longitude) | Werte sind **nicht** in ein `"geo": {"@type":"GeoCoordinates", ...}`-Objekt verschachtelt, sondern liegen als lose Top-Level-Properties `longitude`/`latitude` direkt am `LocalBusiness`. Laut Schema.org ist das falsch verschachtelt. | **Hoch** | `data/page-home.json` |
| 4 | `address.postalCode` | **Fehlt komplett.** Impressum/Kontakt nennen durchgängig „57567 Daaden". | **Kritisch** (Pflichtfeld für lokale Rich Results / GBP-Abgleich) | `data/page-impressum.json`, `data/page-kontakt.json` |
| 5 | `address.addressCountry` | Fehlt. | **Hoch** | — |
| 6 | `address.addressRegion` | Explizit `null` statt String (z. B. „Rheinland-Pfalz" oder ISO „RP"). Ein literales `null` im JSON-LD ist schlechter als ein fehlendes Feld. | **Mittel** | `data/page-home.json` |
| 7 | `telephone` | Format `"01602743001"` (nationale Schreibweise ohne Trennzeichen, kein Ländercode) widerspricht Googles Empfehlung für E.164 (`+49...`) **und** dem auf der Seite selbst verwendeten Format `+49 160 2743001` (Impressum, Kontakt). Numerisch identisch, aber inkonsistent formatiert. | **Mittel** | `data/page-impressum.json`: „Telefon: +49 160 2743001" vs. JSON-LD `01602743001` |
| 8 | `url` | `"https://mobile-sanitaeranlagen-hs.de"` (ohne `www.`, ohne Trailing Slash) vs. `<link rel="canonical" href="https://www.mobile-sanitaeranlagen-hs.de/">`. Domain-Variante weicht von der kanonischen URL ab. | **Mittel** | `data/page-home.json` (canonical-Tag) |
| 9 | `logo` | Wert ist ein **relativer Pfad** (`/-_-/resources/images/files/...`), keine absolute URL. Der Pfad taucht an **keiner anderen Stelle** im HTML der Seite als echtes `<img src>` oder `<link>` auf (geprüft per Volltextsuche) — mutmaßlich eine verwaiste interne Referenz aus dem Website-Baukasten, nicht verifizierbar als funktionierendes Bild. Zusätzlich fehlt ein Top-Level `image`. | **Hoch** | `data/page-home.json`; Gegenprüfung: keine absolute Fundstelle im restlichen HTML |
| 10 | `sameAs` | Array mit **7 Leerstrings** `["","","","","","",""]`. Leerstrings sind keine gültigen URLs — ungültiges Property. Auf der gesamten Seite wurden zudem keine Social-Media-Links gefunden (Facebook/Instagram/LinkedIn/YouTube/TikTok/Xing — alle „not found"). | **Mittel** (aktiv schädlich, da ungültiger Wert; besser: Feld entfernen, bis echte Profile existieren) | `data/page-home.json`; Grep über `data/page-home.json` content |
| 11 | `name` — NAP-Konsistenz | Firmenname existiert in **drei** Schreibweisen auf der Domain: JSON-LD: „Mobile **Sanitäranlagen** Herrmann **und** Smécz UG"; Impressum: „Mobile **Sanitäranalgen** Herrmann und Smécz UG" (Tippfehler: „Sanitäranalgen"); AGB: „Mobile Sanitäranlagen Herrmann **&** Smécz UG". Die JSON-LD-Version ist die korrekte, aber der sichtbare Impressum-Text weicht ab — NAP-Risiko für Google Business Profile-Abgleich. | **Mittel** (Content-Fix auf `/impressum/`, kein Schema-Fix) | `data/page-impressum.json`, `data/page-agb.json` |
| 12 | `priceRange` | Fehlt. Reale Tagespreise (175 €/190 €/210 € netto) sind auf `/unsere-toilettenwagen/` öffentlich einsehbar. | **Niedrig-Mittel** | `data/page-unsere-toilettenwagen.json` |
| 13 | `areaServed` | Fehlt vollständig — für ein Service-Area-Business (Anfahrt/Lieferung von Toilettenwagen) eine zentrale Property. Auf der Seite selbst steht kein expliziter Liefer-Radius/keine Region (nur „Lieferung, Aufbau und Endreinigung" ohne Kilometerangabe) — Wert muss vom Betreiber bestätigt werden. | **Niedrig-Mittel** (Opportunity, nicht verifizierbar ohne Rückfrage) | `data/page-unsere-toilettenwagen.json` (kein Radius im Text) |
| 14 | `@type: LocalBusiness` (generisch) | Kein Schema.org-Subtyp passt exakt zu „Toilettenwagen-Vermietung" (kein `HomeAndConstructionBusiness`, kein `RentalCarReservation` — beides falsch). `LocalBusiness` ist als Basis-Typ korrekt und Google-safe; die Produktebene sollte stattdessen über `Service`/`Offer` abgebildet werden (siehe Abschnitt 4). | **Info** | — |
| 15 | Seitenweite Duplizierung | Identischer Block auf `/agb/`, `/datenschutz/`, `/shop/` — Rechtsseiten und Shop-Seite benötigen kein `LocalBusiness`-Markup; kein Fehler, aber unnötiger Byte-Ballast und ein Hinweis, dass das Snippet nicht Seiten-bewusst gerendert wird (relevant für den Next.js-Relaunch: pro Route bewusst entscheiden, welches Schema injiziert wird). | **Info** | alle `data/page-*.json` |

---

## 3. Deprecated/No-Value-Typen — Guardrail-Check

- **FAQPage / HowTo / SpecialAnnouncement / CourseInfo / EstimatedSalary / LearningVideo:** Keiner dieser Typen ist aktuell auf der Domain vorhanden (Volltextsuche über alle 7 Seiten negativ). Kein Handlungsbedarf.
- Für den Relaunch als Leitplanke dokumentiert: **Kein `HowTo`** verwenden (Rich Results seit 09/2023 entfernt). **Kein neues `FAQPage`** für Google-Rich-Results anlegen (seit 07.05.2026 domainweit ohne SERP-Feature) — falls das Team dennoch FAQ-Inhalte für AI-Overviews/GEO ergänzen möchte, ausdrücklich nur mit dem Hinweis, dass der Google-SERP-Nutzen entfällt und der AI/GEO-Nutzen unbestätigt ist. Falls echte Kunden-Q&A-Inhalte geplant sind (z. B. ein Support-Forum), `QAPage` statt `FAQPage` verwenden.

---

## 4. Fehlende Opportunities für das Kerngeschäft

Auf `/unsere-toilettenwagen/` stehen drei konkrete, öffentlich sichtbare Produktvarianten mit Preisen — aktuell **null** strukturierte Daten dazu:

| Wagen | Ausstattung (Auszug) | Preis (netto/Tag) | Quelle |
|---|---|---|---|
| Toilettenwagen S | 2 Damen-, 1 Herrentoilette, 2 Urinale | ab 175 € | `data/page-unsere-toilettenwagen.json` |
| Toilettenwagen M | 3 Damen-, 1 Herrentoilette, 3 Urinale | ab 190 € | dito |
| Toilettenwagen L | 4 Damen-, 2 Herrentoiletten, 6 Urinale | ab 210 € | dito |

Alle Preise sind „ab"-Preise, netto, zzgl. 19 % MwSt. sowie Lieferung/Aufbau/Endreinigung — das muss in `description` bzw. via `valueAddedTaxIncluded:false` abgebildet werden, nicht als glatter Endpreis.

**Empfohlene Ergänzungen (priorisiert):**
1. **Hoch:** `Service`/`OfferCatalog` mit drei `Offer`-Einträgen (S/M/L) auf `/unsere-toilettenwagen/` — macht die Preisstruktur für Suchmaschinen/KI-Assistenten maschinenlesbar.
2. **Mittel:** `BreadcrumbList` auf allen Unterseiten (aktuell nirgends vorhanden).
3. **Niedrig:** `WebSite` auf der Startseite (ohne `SearchAction`, da keine interne Suche auf der Seite gefunden wurde — nicht erfinden).
4. **Info:** Separates `Organization`-Objekt ist verzichtbar, da `LocalBusiness` `Organization` bereits erweitert; stattdessen `@id`-Referenzierung zwischen den Blöcken nutzen (siehe Code unten).

---

## 5. Korrigiertes JSON-LD — Startseite (`/`)

Ersetzt den bestehenden Block 1:1. **Placeholder klar markiert** — vor dem Go-Live ausfüllen/bestätigen.

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.mobile-sanitaeranlagen-hs.de/#business",
  "name": "Mobile Sanitäranlagen Herrmann und Smécz UG",
  "url": "https://www.mobile-sanitaeranlagen-hs.de/",
  "telephone": "+49 160 2743001",
  "email": "kontakt@mobile-sanitaeranlagen-hs.de",
  "description": "Vermietung mobiler Toilettenwagen (S, M, L) für Veranstaltungen, Feste und Baustellen im Raum Daaden/Westerwald.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Im Reuschewäldchen 12",
    "addressLocality": "Daaden",
    "postalCode": "57567",
    "addressRegion": "Rheinland-Pfalz",
    "addressCountry": "DE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 50.739305,
    "longitude": 7.958289
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "13:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "15:00",
      "closes": "19:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "10:00",
      "closes": "16:00"
    }
  ],
  "priceRange": "175 €–210 € pro Tag (netto, zzgl. Lieferung/Aufbau/Endreinigung & 19% MwSt.)",
  "image": "PLATZHALTER: absolute URL zu einem echten Produkt-/Wagenfoto einsetzen (z. B. https://www.mobile-sanitaeranlagen-hs.de/wp-content/uploads/go-x/u/<echte-datei>.jpg)",
  "logo": "PLATZHALTER: absolute URL zum Firmenlogo einsetzen — der bisherige Pfad '/-_-/resources/images/files/...' ist relativ UND taucht nirgendwo sonst im HTML als echtes Bild auf; vor Wiederverwendung prüfen, ob er überhaupt auflöst",
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": { "@type": "GeoCoordinates", "latitude": 50.739305, "longitude": 7.958289 },
    "geoRadius": "PLATZHALTER: Liefer-/Einsatzradius in Metern mit dem Betreiber abstimmen (auf der Seite nicht angegeben)"
  }
}
```

**Wichtige Hinweise zu diesem Block:**
- `sameAs` bewusst **weggelassen** — auf der gesamten Domain wurden keine Social-Media-Profile gefunden. Ein Feld mit Leerstrings ist schlechter als kein Feld. Erst ergänzen, wenn echte, funktionierende Profil-URLs existieren (z. B. Google Business Profile, Facebook).
- Die Öffnungszeiten oben folgen dem **sichtbaren Text auf `/kontakt/`** (Mo–Fr 9–13/15–19, Sa 10–16, So geschlossen), nicht der alten (widersprüchlichen) JSON-LD-Rohdaten. **Vor Veröffentlichung mit dem Betreiber final bestätigen**, welche Zeiten aktuell wirklich gelten — die beiden bisherigen Quellen widersprachen sich (siehe Befund #2).
- `telephone` jetzt im gleichen Format wie Impressum/Kontakt (`+49 160 2743001`); für striktes E.164 ohne Leerzeichen wäre `+491602743001` die Google-konformste Variante — beide sind akzeptabel, Hauptsache konsistent auf der ganzen Domain.

---

## 6. Neues JSON-LD — `/unsere-toilettenwagen/`

Ergänzend zum (korrigierten) `LocalBusiness`-Block: `Service` mit `OfferCatalog` für die drei Wagen + `BreadcrumbList`.

```json
[
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Toilettenwagen-Vermietung",
    "name": "Vermietung von Toilettenwagen für Veranstaltungen",
    "provider": { "@id": "https://www.mobile-sanitaeranlagen-hs.de/#business" },
    "areaServed": "PLATZHALTER: identisch zum areaServed im LocalBusiness-Block pflegen, sobald bestätigt",
    "url": "https://www.mobile-sanitaeranlagen-hs.de/unsere-toilettenwagen/",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Toilettenwagen-Modelle",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Toilettenwagen S",
          "description": "2 Damentoiletten, 1 Herrentoilette, 2 Urinale. Moderne Spotbeleuchtung, kontaktlose Touchsensoren, einstellbare Außenbeleuchtung, Strand-/Meeresdesign im Damenbereich, LED-Spiegel, Edelstahltreppe.",
          "price": "175.00",
          "priceCurrency": "EUR",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "175.00",
            "priceCurrency": "EUR",
            "unitText": "Tag",
            "valueAddedTaxIncluded": false,
            "eligibleTransactionVolume": "PLATZHALTER: falls Mindestbuchungsdauer gilt, hier ergänzen"
          },
          "url": "https://www.mobile-sanitaeranlagen-hs.de/unsere-toilettenwagen/",
          "itemOffered": {
            "@type": "Product",
            "name": "Toilettenwagen S",
            "image": "PLATZHALTER: absolute Bild-URL für Wagen S (Galerie liefert keine eindeutig zugeordneten Alt-Texte/IDs pro Variante)"
          }
        },
        {
          "@type": "Offer",
          "name": "Toilettenwagen M",
          "description": "3 Damentoiletten, 1 Herrentoilette, 3 Urinale. Großzügige Raumaufteilung für höhere Besucherzahlen, moderne Spotbeleuchtung, kontaktlose Touchsensoren, Edelstahltreppe.",
          "price": "190.00",
          "priceCurrency": "EUR",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "190.00",
            "priceCurrency": "EUR",
            "unitText": "Tag",
            "valueAddedTaxIncluded": false
          },
          "url": "https://www.mobile-sanitaeranlagen-hs.de/unsere-toilettenwagen/",
          "itemOffered": {
            "@type": "Product",
            "name": "Toilettenwagen M",
            "image": "PLATZHALTER: absolute Bild-URL für Wagen M"
          }
        },
        {
          "@type": "Offer",
          "name": "Toilettenwagen L",
          "description": "4 Damentoiletten, 2 Herrentoiletten, 6 Urinale. Hohe Kapazität für Großveranstaltungen, moderne Spotbeleuchtung, kontaktlose Touchsensoren, Edelstahltreppe.",
          "price": "210.00",
          "priceCurrency": "EUR",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "210.00",
            "priceCurrency": "EUR",
            "unitText": "Tag",
            "valueAddedTaxIncluded": false
          },
          "url": "https://www.mobile-sanitaeranlagen-hs.de/unsere-toilettenwagen/",
          "itemOffered": {
            "@type": "Product",
            "name": "Toilettenwagen L",
            "image": "PLATZHALTER: absolute Bild-URL für Wagen L"
          }
        }
      ]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://www.mobile-sanitaeranlagen-hs.de/" },
      { "@type": "ListItem", "position": 2, "name": "Unsere Toilettenwagen", "item": "https://www.mobile-sanitaeranlagen-hs.de/unsere-toilettenwagen/" }
    ]
  }
]
```

**Hinweise:**
- Preise (175/190/210 €) und Ausstattungsmerkmale sind 1:1 aus `data/page-unsere-toilettenwagen.json` (`extracted_text`) übernommen und damit verifiziert — es sind **„ab"-Preise**; falls netto/brutto oder Mindestbuchungsdauer strenger definiert werden sollen, im `priceSpecification`-Block ergänzen.
- Alle drei Bild-Platzhalter bewusst **nicht** befüllt: Die Galerie auf `/unsere-toilettenwagen/` liefert 30 Slideshow-Bilder ohne Alt-Text und ohne erkennbare Zuordnung zu S/M/L (`data-splide-lazy`-Pfade ohne Variantenkennung) — eine automatische Zuordnung wäre eine Vermutung, keine verifizierte Angabe.
- `provider` referenziert per `@id` den `LocalBusiness`-Block aus Abschnitt 5 — dafür muss dessen `@id` (`.../#business`) tatsächlich im selben Dokumenten-Graph vorhanden sein (z. B. im `<head>` oder als zweiter `<script>`-Block auf derselben Seite).

---

## 7. Priorisierte Maßnahmenliste

1. **Kritisch:** `openingHours` auf valides Schema.org-Format (`openingHoursSpecification`) umstellen **und** vorher mit dem Betreiber klären, welche Zeiten korrekt sind (Widerspruch JSON-LD vs. `/kontakt/`).
2. **Kritisch:** `postalCode` (57567) und `addressCountry` (DE) in jedem `LocalBusiness`-Block ergänzen; `addressRegion` von `null` auf „Rheinland-Pfalz" setzen.
3. **Hoch:** `geo` korrekt als `GeoCoordinates`-Objekt verschachteln; `logo`/`image` auf verifizierte absolute URLs umstellen.
4. **Mittel:** `sameAs` mit Leerstrings entfernen (bis echte Profile existieren); `telephone`-Format domainweit vereinheitlichen; Tippfehler „Sanitäranalgen" auf `/impressum/` korrigieren (Content, kein Schema).
5. **Hoch (Opportunity):** `Service`/`OfferCatalog` mit den drei Toilettenwagen-Offers auf `/unsere-toilettenwagen/` einführen (Abschnitt 6).
6. **Mittel (Opportunity):** `BreadcrumbList` auf allen Unterseiten; `WebSite` auf der Startseite.
7. **Info:** Für den Next.js-Relaunch das Schema pro Route bewusst zusammenstellen statt eines global identischen Blocks auf jeder Seite (inkl. `/agb/`, `/datenschutz/`, `/shop/`), und `FAQPage`/`HowTo` gemäß Guardrail nicht (wieder) einführen.

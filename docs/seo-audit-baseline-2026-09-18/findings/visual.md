# Visual & UX Audit — mobile-sanitaeranlagen-hs.de

Geprüft: `/`, `/unsere-toilettenwagen/`, `/kontakt/` · Viewports: Desktop 1920×1080, Mobile 375×812 (zzgl. Tablet/Laptop als Zusatzbeleg)
Screenshots: `C:\Users\timed\tmp\mobile-sanitaeranlagen-hs.de-audit\screenshots\{home,toilettenwagen,kontakt}-{desktop,mobile,laptop,tablet}.png`

## Gesamtbewertung

| Kategorie | Bewertung |
|---|---|
| **Images (Alt-Text/SEO)** | **12/100** |
| Above-the-Fold (mobil) | Mangelhaft |
| Mobile Rendering | Mangelhaft (horizontaler Scroll auf 2/3 Seiten) |
| Cookie-Banner-Impact | Kritisch |
| CTA-Prominenz | Mittel |
| Tap-Targets/Lesbarkeit | Gut |

---

## 1. Above-the-Fold: Kernangebot "Toilettenwagen mieten + Region + CTA/Telefon" — NICHT vollständig sichtbar

**Befund (mobil, 375×812):**
- **Startseite** (`home-mobile.png`): H1 "Hochwertige mobile Sanitäranlagen" und Fließtext sind sichtbar, aber der CTA-Button "Unsere Sanitärwagen" ist bereits am unteren Bildschirmrand nur zur Hälfte sichtbar und wird sofort vom Cookie-Banner verdeckt. **Keine Region** (Daaden/Westerwald) und **keine Telefonnummer** im sichtbaren Bereich — der Nutzer sieht weder "wo" noch "wie anrufen", bevor er scrollt oder den Cookie-Banner bedient.
- **/unsere-toilettenwagen/** (`toilettenwagen-mobile.png`): H1 + Teaser-Text sichtbar, aber keine Telefonnummer/CTA-Button im Above-the-Fold-Bereich — direkt darunter beginnt bereits die erste Fahrzeug-Galerie, keine Region-Nennung.
- **/kontakt/** (`kontakt-mobile.png`): **Kritisch.** Über der Falz ist nur ein dunkles Hero-Bild + "Kontakt"-Überschrift + ein großes WhatsApp-Icon sichtbar. **Telefonnummer, E-Mail und Adresse (Daaden) liegen erst deutlich unterhalb der Falz** und werden zusätzlich vom Cookie-Banner verdeckt (vgl. `kontakt-desktop.png`, wo Telefon/Adresse direkt sichtbar sind). Auf Mobile — dem Gerät, auf dem am ehesten spontan angerufen wird — ist die Telefonnummer nicht ohne Scrollen erreichbar.

**Schweregrad:** Hoch (Startseite, Kontakt) / Mittel (Toilettenwagen-Seite)

**Fix:**
- Sticky Mobile-CTA-Leiste (Telefon-Button "Jetzt anrufen" + WhatsApp) am unteren Bildschirmrand auf allen Seiten, unabhängig vom Scroll-Zustand.
- Hero-Sektion der Startseite um Region ("Toilettenwagen mieten in Daaden & Westerwald") und Telefonnummer ergänzen, CTA-Button höher positionieren (aktuell zu tief im Viewport).
- Kontaktseite: Telefonnummer/Adresse direkt unter dem H1 platzieren, nicht erst nach dem WhatsApp-Icon-Block.

---

## 2. Cookie-Banner verdeckt CTA und Kerninhalte auf Mobile

**Befund:** Der Cookie-Consent-Banner (Usercentrics/Borlabs o.ä.) erscheint auf allen drei Seiten sofort beim Laden und nimmt auf 375×812 **ca. 35–45 % der Viewport-Höhe** ein (`home-mobile.png`, `toilettenwagen-mobile.png`, `kontakt-mobile.png`). Er liegt über dem CTA-Button (Startseite) bzw. über allen Kontaktdaten (Kontaktseite), bevor der Nutzer interagiert hat. "Akzeptieren"/"Ablehnen"-Buttons sind zwar ausreichend groß (≈48px Höhe), aber der Banner blockiert genau die Elemente, die für die Konversion (Anruf/Anfrage) entscheidend sind.

**Schweregrad:** Hoch

**Fix:** Banner verkleinern (einzeilige Kurzfassung + "Mehr erfahren"-Link statt 6-zeiligem Fließtext), CTA/Telefonnummer NICHT im vom Banner verdeckten Bereich platzieren, oder Banner als schmaler Bottom-Sheet mit max. 20% Viewport-Höhe gestalten.

---

## 3. Mobile Rendering: horizontaler Scroll auf 2 von 3 Seiten

**Befund (automatisierte Analyse, `analyze_visual.py --json`):**
- `/` : `horizontal_scroll: false` — OK
- `/unsere-toilettenwagen/` : `horizontal_scroll: true`
- `/kontakt/` : `horizontal_scroll: true`

Wahrscheinliche Ursache: Bild-/Galerie-Container (Splide-Slider auf der Toilettenwagen-Seite) bzw. eingebettetes Formular/WhatsApp-Widget auf der Kontaktseite ragen über die Viewport-Breite hinaus (kein `max-width: 100%` / `overflow-x: hidden` auf Container-Ebene).

**Schweregrad:** Mittel–Hoch (schlechte UX, wirkt "kaputt" auf Mobile, potenzieller Core-Web-Vitals-/Layout-Impact)

**Fix:** Alle Bild-/Slider-/Formular-Container mit `box-sizing: border-box` und `max-width: 100%` versehen; im Next.js-Relaunch von Anfang an mit `overflow-x: hidden` auf `<body>` sowie responsive Bildkomponenten (z. B. `next/image` mit `sizes`) arbeiten.

---

## 4. Tap-Targets & Textlesbarkeit — unauffällig

**Befund:** Basis-Schriftgröße 16px auf allen drei Seiten (`fonts.base_size: 16`, `readable: true`), Viewport-Meta korrekt gesetzt, keine überlappenden Elemente oder Text-Overflow in der automatisierten Prüfung. Slider-Pfeile und Hamburger-Menü auf `toilettenwagen-mobile.png` wirken ausreichend groß (>48px). Cookie-Banner-Buttons "Akzeptieren"/"Ablehnen" ebenfalls ausreichend dimensioniert.

**Schweregrad:** Niedrig / kein Handlungsbedarf

---

## 5. Hero-Bild

**Befund:** Die automatisierte Erkennung liefert auf allen drei Seiten identisch `hero_image: image-455x161.png` — das ist tatsächlich das **Logo im Header**, nicht das eigentliche Hero-Foto (dieses wird per CSS-Hintergrundbild eingebunden, s. `home-desktop.png`/`home-mobile.png` mit Wohnwagen-Motiv im Wald). Das eigentliche Hero-Hintergrundbild wirkt in den Screenshots ausreichend scharf, ist aber als CSS-Background nicht für Lazy-Loading/`srcset`-Optimierung zugänglich und liefert keinen Alt-Text/SEO-Wert (Hintergrundbilder werden von Screenreadern und Bild-Suche ignoriert).

**Schweregrad:** Niedrig–Mittel

**Fix:** Im Relaunch das Hero-Bild als echtes `<img>`/`next/image` mit beschreibendem Alt-Text ("Mobiler Toilettenwagen im Wald – Herrmann & Smécz Daaden") statt als CSS-Hintergrund einbinden; das ermöglicht Alt-Text, responsive `srcset` und ggf. Bild-Suche-Traffic.

---

## 6. CTA-Prominenz

**Befund:** Startseite hat genau einen CTA-Button ("Unsere Sanitärwagen", hellblau auf dunklem Hintergrund) — Kontrast ist ausreichend, aber der Button führt nur zur Übersichtsseite, nicht zu einer direkten Handlung (Anruf/Anfrage/WhatsApp). Auf der Kontaktseite ist paradoxerweise nur das WhatsApp-Icon großformatig above-the-fold, während Telefonnummer und Formular erst später folgen. Es gibt keinen sitewide sichtbaren "Jetzt anrufen"-Button in der Kopfzeile (Desktop-Nav zeigt nur Textlinks "Startseite / Unsere Toilettenwagen / Kontakt").

**Schweregrad:** Mittel

**Fix:** Telefonnummer/Klick-zum-Anrufen-Button fest in Header/Sticky-Footer auf allen Seiten; Startseiten-CTA zusätzlich mit direktem "Jetzt Angebot anfragen"-Link statt nur zur Übersichtsseite zu verlinken.

---

## 7. Bild-Alt-Text — Kernbefund (Images Score: 12/100)

**Quantifizierung (aus HTML-Rohdaten, `data/page-*.json`):**

| Seite | Bilder gesamt | ohne `alt`-Attribut | `alt=""` (leer) | mit sinnvollem Alt-Text |
|---|---|---|---|---|
| `/unsere-toilettenwagen/` | 31 | 29 | 2 | **0** |
| `/kontakt/` | 2 | 1 | 1 | **0** |
| `/` (Startseite) | 1 | 1 | 0 | **0** |
| **Summe (3 Seiten)** | **34** | **31** | **3** | **0** |

- Auf `/unsere-toilettenwagen/` sind es alle Galeriebilder der drei Fahrzeugtypen (Toilettenwagen S/M/L), technisch als Splide-Slider mit `data-splide-lazy="…"` eingebunden — **kein einziges** trägt einen beschreibenden Alt-Text.
- Beispiel-Quellen ohne Alt-Text (Sample): `.../b59c5dd5-.../image-1366x1024.jpg`, `.../193b8e9a-.../image-1366x1116.jpg`, `.../580c380b-.../image-1366x1821.jpg` — Dateinamen sind zufällige UUIDs ohne semantischen Wert, verstärkt das Problem für Bilder-SEO zusätzlich.
- Kontaktseite: Das WhatsApp-Icon (visuell dominant im Above-the-Fold-Bereich, `kontakt-mobile.png`) hat `alt="MISSING"` — für Screenreader-Nutzer nicht erkennbar, dass es sich um einen WhatsApp-Kontaktlink handelt.
- Startseite: Header-Logo ohne Alt-Text.

**Schweregrad:** Hoch (Accessibility-Verstoß WCAG 2.1 / BITV, entgangenes Bilder-SEO-Potenzial bei einer bildgetriebenen Dienstleistung wie Toilettenwagen-Vermietung)

**Fix (priorisiert):**
1. Jedes Galeriebild auf `/unsere-toilettenwagen/` mit konkretem, keyword-relevantem Alt-Text versehen, z. B. `alt="Toilettenwagen S – Innenansicht Damentoilette mit Waschbecken"`, `alt="Toilettenwagen L – Außenansicht mit LED-Beleuchtung bei Nacht"`.
2. WhatsApp-Icon: `alt="Kontakt per WhatsApp aufnehmen"`.
3. Logo: `alt="Herrmann & Smécz Mobile Sanitäranlagen – Logo"`.
4. Im Next.js-Relaunch: Alt-Text als Pflichtfeld im Bild-Datenmodell/CMS erzwingen (z. B. Zod-Schema-Validierung), damit dieser Fehler nicht erneut auftritt; sprechende Dateinamen statt UUIDs vergeben.

---

## Priorisierte Maßnahmenliste

| Prio | Maßnahme | Seite(n) | Aufwand |
|---|---|---|---|
| 1 | Alt-Text für alle 34 gesichteten Bilder ergänzen (sitewide-Problem, vermutlich auf allen Seiten) | alle | Niedrig |
| 1 | Cookie-Banner verkleinern, CTA/Kontaktdaten nicht verdecken | alle (mobil) | Mittel |
| 2 | Telefonnummer/Region above-the-fold auf Startseite + Kontaktseite (mobil) | `/`, `/kontakt/` | Mittel |
| 2 | Horizontalen Scroll auf `/unsere-toilettenwagen/` und `/kontakt/` beheben | 2 Seiten | Mittel |
| 3 | Sticky Klick-zum-Anrufen-Leiste mobil | alle | Mittel |
| 3 | Hero-Bild als `<img>` mit Alt-Text statt CSS-Background (Relaunch) | `/` | Niedrig (im Neubau) |

## Evidenz (Screenshots)
- `home-mobile.png`, `home-desktop.png` — CTA-Sichtbarkeit, Cookie-Banner-Overlap
- `toilettenwagen-mobile.png`, `toilettenwagen-desktop.png` — horizontaler Scroll, Galerie ohne Alt-Text
- `kontakt-mobile.png`, `kontakt-desktop.png` — fehlende Telefonnummer above-the-fold auf Mobile vs. Desktop
- `data/visual-home.json`, `data/visual-toilettenwagen.json`, `data/visual-kontakt.json` — automatisierte Above-the-Fold-/Mobile-Metriken

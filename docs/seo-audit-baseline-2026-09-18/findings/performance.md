# Performance / Core Web Vitals — mobile-sanitaeranlagen-hs.de

**Geprüfte URLs:** `/` (Startseite), `/unsere-toilettenwagen/`
**Methode:** Kein Google-API-Key konfiguriert → CrUX/PageSpeed Insights nicht verfügbar. Alle Werte sind **Lab-Schätzungen** aus `curl`-Timing, `render_page.py` (Playwright, WordPress-Server IONOS) und `preload_check.py`. Keine Feld-/CrUX-Perzentil-Daten. FID wird nirgends referenziert (INP ist die alleinige Interaktivitätsmetrik).

## Performance-Score (Schätzung): **52 / 100**

Getrennt nach Metrik unten begründet. Hauptgrund für den mittleren Score: sehr gutes TTFB, aber massiv aufgeblähtes/unkomprimiertes CSS und fehlende Bild-Dimensionen/-Optimierung.

## Core Web Vitals — Status (Lab-Schätzung, keine Feld-Perzentile)

| Metrik | Startseite | /unsere-toilettenwagen/ | Bewertung |
|---|---|---|---|
| LCP | ~2.5–4.0s (geschätzt) | ~3–4.5s (geschätzt, mehr Bilder/DOM) | **Verbesserungswürdig bis Schlecht** |
| INP | wahrscheinlich ≤200ms (kein Third-Party-JS, wenig Interaktivität) | wahrscheinlich ≤200ms, Risiko durch Slideshow/Lightbox-JS | **Voraussichtlich Gut**, nicht gemessen |
| CLS | Risiko 0.1–0.25 (Bilder ohne width/height, Web-Font ohne font-display) | höheres Risiko (31 Bilder ohne Dimensionen) | **Verbesserungswürdig** (geschätzt) |

Da keine CrUX-Daten vorliegen (Site hat vermutlich zu wenig Traffic für CrUX), gilt die 75.-Perzentil-Bewertung von Google hier nicht — Aussagen sind Lab-Indikatoren, keine Pass/Fail-Zertifizierung.

---

## Belege / Evidence

### TTFB & Server (gut)
- `curl` Timing Startseite: `time_starttransfer ≈ 126ms`, Total ≈ 228ms, HTTP 200, Server: IONOS Webserver.
- `/unsere-toilettenwagen/`: `time_starttransfer ≈ 121ms`, Total ≈ 165ms.
- **TTFB liegt klar unter der 200ms-Schwelle für "Gut" → keine LCP-Bremse durch den Server.**
- HTML wird per Brotli komprimiert (`content-encoding: br`), Transfer-Größe Startseite nur ~32KB trotz 248KB Roh-HTML.

### Kritisch: CSS-Bloat blockiert Rendering (Severity: **Hoch**)
- Startseite: `<style>`-Inline-Blöcke summieren sich auf **~240KB** (u.a. ein einzelner `global-styles-inline-css`-Block mit **168.007 Bytes** — WordPress-Gutenberg-Standardproblem: alle Theme-Presets werden inline gedumpt, unabhängig davon ob genutzt).
- `/unsere-toilettenwagen/`: Inline-`<style>`-Blöcke summieren sich auf **377KB** — das sind praktisch **100% der HTML-Dateigröße (377.119 Bytes)**.
- Zusätzlich eine **extern verlinkte, render-blockierende** Stylesheet-Datei `wp-content/uploads/go-x/style.css` mit **265.477 Bytes**, die **ohne jegliche Kompression** ausgeliefert wird (kein `content-encoding` trotz `Accept-Encoding: br` im Request — verifiziert per `curl`, `size_download` == `Content-Length`).
- Effekt: Browser muss vor First Paint hunderte KB CSS parsen (inline, sofort verfügbar, aber CPU-Kosten) **plus** eine unkomprimierte 265KB-Datei laden — auf Mobilfunk/Mittelklasse-Geräten ein direkter LCP- und Rendering-Verzögerer.

### LCP-Signale fehlen (Severity: Hoch)
- `preload_check.py`: Score 75/100 für beide URLs. `lcp_resource_hints.preload_lcp_candidate: false`, `fetchpriority_high: 0`. Empfehlung des Tools: LCP-Hero-Bild braucht `fetchpriority="high"`.
- Startseite hat nur 1 `<img>` (Logo, bereits mit `preload as="image" imagesrcset"` versehen — positiv), das eigentliche LCP-Element ist wahrscheinlich der H1-Text oder ein CSS-Hintergrundbild (3× `background-image` in den Styles gefunden) — Hintergrundbilder werden vom Browser nicht automatisch priorisiert.
- `/unsere-toilettenwagen/`: 31 `<img>`-Tags, Galerie/Slideshow nutzt `data-splide-lazy` (JS-Lazy-Loading via Splide) — das größte Slideshow-Bild (`image-1366x1024.jpg`) ist **249.879 Bytes** als unkomprimiertes JPEG, kein WebP/AVIF, kein `fetchpriority`.

### Bilder: keine Dimensionen → CLS-Risiko (Severity: Mittel-Hoch)
- Alle 31 `<img>`-Tags auf `/unsere-toilettenwagen/`: **0 mit `width`/`height`-Attribut**, nur 2 mit (leerem) `alt`. Ohne reservierten Platz verursacht das Nachladen der Slideshow/Galerie-Bilder Layout-Shifts.
- Bildformate durchweg PNG/JPEG, kein WebP/AVIF (moderne Formate würden 25–50% Dateigröße sparen).
- Nicht-versionierte Upload-Bilder (ohne `?ver=`-Query, z.B. die Slideshow-JPGs) haben nur **~30 Minuten `Expires`**-Cache-Lebensdauer, während versionierte Assets (`?ver=…`) korrekt 1 Jahr `Expires` bekommen. Wiederholte Besuche laden dieselben ~250KB-Bilder unnötig neu.

### Web-Fonts (Severity: Niedrig-Mittel)
- Self-hosted Fonts (Merriweather, BebasNeue, OpenSans) unter `/wp-content/themes/gox/public/fonts/` — gut, kein Google Fonts-Umweg.
- Aber: **kein `font-display`** in den `@font-face`-Regeln gefunden (`grep -c font-display` = 0) → Standardverhalten (browserabhängig FOIT) kann Text-Paint verzögern und bei Fallback→Custom-Font-Wechsel einen Reflow/CLS-Beitrag verursachen.

### JavaScript / INP (Severity: Niedrig, unauffällig)
- Auf beiden geprüften Seiten **kein Third-Party-Tracking-JS** gefunden (nur Same-Origin-Skripte: `wp-hooks`, `wp-i18n`, go-x-Plugin-Skripte für Navigation/Consent/Slideshow/Lightbox). Das Ecwid-Shop-Widget lädt nicht auf `/` oder `/unsere-toilettenwagen/` (nur auf `/shop/`), dort aber tote Ecwid-Popup-Callback-Reste im Homepage-Inline-JS (kosmetisch, kein Performance-Problem).
- Scripts ohne `defer`/`async` liegen spät im `<body>` (ab Byte ~194.711, `</head>` bei 52.386) — geringes Risiko für Render-Blocking, aber unsauber.
- DOM-Größe moderat: ~374 Elemente (Startseite), ~647 (Toilettenwagen-Seite) — deutlich unter der 1.500-Elemente-Warnschwelle. Kein INP-Risiko durch DOM-Größe.
- Speculation Rules (`prefetch`) sind aktiv — positiv für wahrgenommene Navigationsgeschwindigkeit.

---

## Priorisierte Empfehlungen

### 1. CSS-Payload radikal reduzieren (Impact: Hoch, LCP + TBT)
- WordPress: `global-styles-inline-css` durch Deaktivieren ungenutzter Theme-Presets/Block-Support-Styles verkleinern (Gutenberg `theme.json` beschneiden) oder auf ein schlankeres Theme/Custom-CSS ohne Full-Site-Editing-Overhead wechseln.
- Die externe `go-x/style.css` (265KB) **serverseitig komprimieren** (Brotli/Gzip aktivieren für `/wp-content/uploads/*.css` — aktuell nur HTML wird komprimiert, statische Assets in diesem Pfad nicht).
- Ungenutztes CSS aus dem Bundle entfernen/tree-shaken (PurgeCSS-Ansatz), Critical-CSS inline nur für Above-the-Fold, Rest async nachladen.

### 2. LCP-Element explizit markieren (Impact: Hoch, LCP)
- Hero-Bild/-Hintergrund mit `fetchpriority="high"` und `<link rel="preload" as="image">` versehen (aktuell nur das Logo preloaded, nicht das eigentliche LCP-Kandidat-Bild).
- Falls LCP ein CSS-`background-image` ist: auf ein echtes `<img>`-Tag mit `fetchpriority="high"` umstellen — Hintergrundbilder werden vom Preload-Scanner nicht erkannt.

### 3. Bilder optimieren + Dimensionen setzen (Impact: Mittel-Hoch, CLS + LCP)
- `width`/`height` (oder `aspect-ratio` per CSS) auf **allen** `<img>`-Tags setzen, insbesondere den 31 Galerie-Bildern auf `/unsere-toilettenwagen/`.
- Auf WebP/AVIF konvertieren (aktuell PNG/JPEG bis 244KB pro Bild); responsive `srcset` ist bereits vorhanden — Format-Wechsel würde 30–50% sparen.
- Cache-Header für alle Upload-Bilder auf 1 Jahr + Versionierung (`?ver=` bzw. Content-Hash im Dateinamen) vereinheitlichen, damit auch nicht-versionierte Assets lange gecacht werden (aktuell nur 30 Minuten `Expires`).

### 4. `font-display: swap` ergänzen (Impact: Niedrig-Mittel, CLS + LCP-Text)
- Allen `@font-face`-Regeln (Merriweather, BebasNeue, OpenSans) `font-display: swap` oder `optional` hinzufügen, um FOIT zu vermeiden und Text-Paint nicht zu blockieren.

### 5. Aufräumen: totes Ecwid-JS von Nicht-Shop-Seiten entfernen (Impact: Niedrig)
- Ecwid-Popup-Callback-Code liegt inline auf der Startseite, obwohl das Widget dort nicht lädt — bedingt einbinden (nur auf `/shop/`).

---

## Für den Next.js-Relaunch (gleiche Domain)

Diese Baseline zeigt, welche WordPress-spezifischen Probleme im Relaunch **architektonisch vermieden** werden sollten:

- **CSS**: Next.js mit CSS-Modulen/Tailwind + automatischem Code-Splitting erzeugt von Natur aus kein 168–269KB-Inline-CSS-Monster. Sicherstellen, dass der Build kein ungenutztes CSS in den kritischen Pfad injiziert (Tailwind-Purge/JIT nutzen) und dass alle statischen Assets über die Hosting-Plattform mit Brotli/Gzip komprimiert werden (bei Vercel/Next-Standard automatisch, bei Eigenbetrieb auf IONOS explizit prüfen).
- **Bilder**: `next/image` durchgängig verwenden → automatische `width`/`height`-Reservierung (kein CLS), automatische AVIF/WebP-Auslieferung, automatisches `priority`-Flag für das LCP-Hero-Bild statt manuellem `fetchpriority`.
- **Fonts**: `next/font` nutzen → automatisches Self-Hosting, `font-display: swap` und Preload sind Default-Verhalten, kein manuelles `@font-face`-Handling nötig.
- **Caching**: Immutable-Cache-Header (`Cache-Control: public, max-age=31536000, immutable`) für alle Hash-versionierten Build-Assets von Anfang an einplanen (Next.js `_next/static` macht das automatisch) — die inkonsistente 30-Min-vs-1-Jahr-Situation der WP-Seite entfällt dadurch komplett.
- **Ecwid/Shop**: Falls der Ecwid-Shop im Relaunch weiter genutzt wird, das Widget **nur** auf der Shop-Route dynamisch laden (`next/dynamic`, `ssr:false`), nicht global einbinden — verhindert Third-Party-JS-Kosten auf Content-Seiten wie `/` und `/unsere-toilettenwagen/`.
- **Nach Go-Live**: CrUX/PageSpeed-API-Key einrichten, um ab Tag 1 echte Feld-Perzentile statt Lab-Schätzungen zu erhalten (aktuell nicht möglich, da kein Key konfiguriert und die Domain evtl. noch keine ausreichende CrUX-Datenbasis hat).

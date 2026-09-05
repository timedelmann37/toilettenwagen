# Direction Contract — Startseite `/`

> Phase-3-Ergebnis (WEB_WORKFLOW). Vom User bestätigte Richtung: **Kandidat A – „Vertrauens-Katalog"** (produktgeführt).
> Maschinenlesbare Kurzfassung (6 Blöcke) für Impeccable-Build-Phasen: `.impeccable/surfaces/src-app-page-tsx.md`.
> Bei Änderungen **beide** synchron halten. Quellen: `PRODUCT.md`, `CONTEXT.md`, `docs/DISCOVERY.md`, `docs/RESEARCH.md`, `docs/adr/`.

## Modus & Klassifizierung

- **Visitor mode:** Persuade (Ziel: Miet-Anfrage).
- **Redesign mode:** greenfield.
- **Design Read:** lokale Dienstleister-Landingpage für gemischtes Publikum, bodenständig-seriöse, warm-vertrauensbildende Sprache; Tailwind v4 + Off-White/Navy/Blau + echte Fotografie + zurückhaltende Motion.

## Dials

```
DESIGN_VARIANCE: 5   (editorialer Rhythmus, etwas Asymmetrie, geerdet)
MOTION_INTENSITY: 3  (nur Scroll-Reveal + Hover-Feedback; Anti-Ziel „zu viele Animationen")
VISUAL_DENSITY: 4    (ruhig gegliedert, kein Cockpit)
```

## Thesis & erster Beweis

- **Thesis:** Ehrlicher, produktgeführter Miet-Katalog. Verweigert den Deko-Gradient-Hero und das anonyme Hero→Feature-Karten→Testimonial-Skelett.
- **First-Viewport-Proof:** echtes Produkt (freigestellter S-Wagen) + faires-Preis-Versprechen + sofortiger WhatsApp-CTA.

## Seitenmodell & Inhaltsreihenfolge (One-Pager)

1. Hero (Split: Claim + CTA links, freigestellter S-Wagen rechts)
2. Die Wagen (S/M/L Vergleich + **Privat/Firma-Preis-Toggle**)
3. „Alles dabei" / USP (faire Berechnung, Liefer-/Abholtag frei, Zubehör inklusive)
4. Ablauf (Anfrage → Angebot <2 h → Lieferung → Abholung → Reinigung)
5. Einsatzgebiet (Google-Maps-Karte + 125-km-Region)
6. Kundenstimmen (echte Zitate, „Vorname + Initiale"/Google)
7. Anfrage (WhatsApp + Formular) → Footer (voller Rechtsname, Impressum/Datenschutz)

Nav (einzeilig, ≤80px): *Wagen · Leistungen · Ablauf · Einsatzgebiet · Kontakt* + Logo.

## Visuelle Regeln (OWN-WORLD)

- **Palette:** warmes Off-White als Grund (nicht kaltes Grau), Deep-Navy-Text, EIN klares Blau als einziger Akzent (Color-Consistency-Lock), warme Grau-Neutrals. Kein AI-Lila, keine Gradient-Slop.
- **Typografie:** sachlicher, warm-humanistischer Grotesk, self-hosted (`@font-face`, kein Google-Fonts-CDN → DS + statischer Export). **Nicht** Inter als Default. Finaler Font in `DESIGN.md` (bei Finish).
- **Bilder:** echte Fotos; Hero = freigestellter S-Wagen auf Farbfläche. Formate vorab zu WebP optimiert (statischer Export, `images.unoptimized`). Keine Stock-/Deko-Bilder.
- **Form/Shape:** ein weiches Radius-System durchgängig (Shape-Consistency-Lock); dünne Trennlinien statt Karten-Overkill.
- **Theme:** ein Theme für die ganze Seite (hell; Dark-Mode optional später), kein Sektions-Flip.

## Signatur-Interaktion & Reduced-Motion

- **Signatur:** Privat/Firma-Preis-Toggle schaltet die Modell-Karten live um (brutto/netto).
- **Motion-Budget (Dial 3):** dezentes Scroll-Reveal (Fade+Rise) auf Schlüsselsektionen, Hover-/Active-Feedback auf CTAs. Kein Parallax, kein Scroll-Hijack, keine Marquee.
- **Reduced-Motion:** `prefers-reduced-motion` → alle Reveals sofort/statisch.

## Erlaubte Assets & Claims

- **Assets:** 26 echte Fotos (Root → `public/`), `firmenlogo.png`. 5 echte Kundenstimmen.
- **Claims erlaubt:** nur aus `PRODUCT.md`/`DISCOVERY.md`. **Verboten:** erfundene Testimonials, Kundenlogos, Statistiken, Zertifikate, Case-Study-Zahlen. Preise als Richtwerte („ab …"), kein Festpreis.

## Constraints

- **A11y:** WCAG AA, gut lesbare Typo, große Touch-Ziele (teils ältere Privatkunden).
- **Responsive:** Split-Hero → einspaltig < 768px, Wagen-Bild oben; explizite Mobile-Collapses.
- **Performance:** LCP < 2,5 s (Hero-Bild priorisiert/vorab optimiert), CLS < 0,1.
- **SEO:** deutschsprachig, lokale Keywords (Toilettenwagen mieten + Region); Meta/OG bei Build.
- **Recht:** Impressum + Datenschutz Pflicht; Google Maps nur nach Cookie-Consent (`docs/adr/0003`); Preis brutto/netto (`docs/adr/0004`).
- **Technik:** statischer Next-Export, PHP-Mailer (`docs/adr/0001`, `0002`).

## Anti-Ziele

Zu viele Animationen · unnötig viele Bilder · überzogenes Design · kalt-technische Grau-Fläche · Deko-Gradient-Hero · Cards-in-Cards · erfundener Social Proof.

## Akzeptanz-Evidenz (Phase 7)

Desktop- + Mobile-Screenshots zeigen: freigestellter Wagen + WhatsApp-CTA im ersten Viewport ohne Scrollen; Preis-Toggle funktioniert brutto/netto; ein Blau-Akzent konsistent; echte Fotos; ruhiger, variierter Sektionsrhythmus; lesbar in AA-Kontrast.

## FINISH

unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

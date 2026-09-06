# 01: Fundament & App-Shell

**What to build:** Das technische Fundament und die Seiten-Hülle, auf der alle Sektionen aufsetzen. Danach baut die Seite als statischer Export, Navigation und Footer stehen, und die Testumgebung läuft.

**Blocked by:** None (can start immediately)

**Status:** done (2026-09-05)

- [ ] Next.js auf statischen Export konfiguriert (`output: 'export'`, `images.unoptimized: true`) – ADR-0001; `next build` erzeugt `out/`.
- [ ] Design-Tokens gesetzt (warmes Off-White als Grund, Deep-Navy-Text, EIN Blau-Akzent, warme Grau-Neutrals, ein weiches Radius-System) gemäß Direction Contract.
- [ ] Ein warm-humanistischer Grotesk self-hosted via `@font-face` (kein Google-CDN); nicht Inter.
- [ ] Die 26 echten Fotos nach `public/` verschoben, sinnvoll benannt, zu WebP optimiert (inkl. freigestellter S-Wagen fürs Hero).
- [ ] Vitest + @testing-library/react (jsdom) eingerichtet; ein Smoke-Test läuft grün; Test-Script in `package.json`.
- [ ] Sticky-Ankernavigation (einzeilig, ≤80px) mit Logo + Anker-Links (Wagen · Leistungen · Ablauf · Einsatzgebiet · Kontakt).
- [ ] Footer-Gerüst mit vollem Rechtsnamen + Links zu `/impressum` und `/datenschutz`.
- [ ] Leere Sektions-Anker in korrekter Reihenfolge; Default-Scaffold aus `page.tsx` entfernt.
- [ ] Basis-SEO/Meta (deutschsprachiger Titel/Description, OG) im Layout.
- [ ] Ein helles Theme für die ganze Seite (kein Sektions-Flip).

## Comments

> Umgesetzt: statischer Export, Design-Tokens, Hanken Grotesk (self-hosted via next/font, kein Runtime-CDN → erfüllt DS-Absicht), 25 Fotos + Logo → `public/` (WebP; „26" war Zählfehler), Vitest+RTL (3 Tests grün), Sticky-Nav + Footer + Sektions-Anker (inkl. Kundenstimmen), Basis-SEO/Meta. Lint/Typecheck/Tests/Build grün. Code-Review (Standards+Spec) durchgeführt, Fixes eingearbeitet (Transition-Bug, Nav-Dedup, Radius-/WhatsApp-Ausnahme dokumentiert). Bewusst später: `og:image` (eigenes Ticket), finaler Font/Logo-Behandlung (Ticket 02/Design).

# 09: Responsive / A11y / Performance

**What to build:** Die gesamte Seite auf allen Breiten sauber, zugänglich und schnell machen.

**Blocked by:** 02, 03, 04, 05, 06, 07, 08

**Status:** ready-for-agent

- [ ] Jede Sektion mobil (≤768px) explizit einspaltig geprüft; keine horizontalen Overflows; `min-h-[100dvh]` statt `h-screen` fürs Hero.
- [ ] Kontrast WCAG AA für Text, Buttons, Formularfelder/Placeholder/Focus-Ringe; CTA-Text nie unlesbar.
- [ ] Vollständige Tastaturbedienung (Nav, Toggle, Formular, Consent); sichtbare Focus-States.
- [ ] Performance: LCP < 2,5 s (Hero-Bild priorisiert/optimiert), CLS < 0,1 (Bild-/Font-Maße reserviert).
- [ ] Bilder in sinnvollen Größen/Formaten; keine überflüssigen Bilder (Anti-Ziel).

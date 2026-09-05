# 10: Motion (dezent) + Visual-Review

**What to build:** Zurückhaltende, begründete Bewegung als Feinschliff, dann der finale Design-Review.

**Blocked by:** 09

**Status:** ready-for-agent

- [ ] Motion gemäß MOTION_INTENSITY 3: dezentes Scroll-Reveal (Fade+Rise) auf Schlüsselsektionen, Hover-/Active-Feedback auf CTAs. Keine Parallax/Scroll-Hijack/Marquee.
- [ ] Jede Animation in einem Satz begründbar (Hierarchie/Feedback/State); nur `transform`/`opacity` animiert.
- [ ] `prefers-reduced-motion` → alle Reveals sofort/statisch.
- [ ] Impeccable-Detector über geänderte UI-Dateien laufen lassen (`impeccable detect --json`), mechanische Findings beheben.
- [ ] Visual QA (Desktop + Mobile) gegen den Direction Contract; Akzeptanz-Evidenz erfüllt (freigestellter Wagen + WhatsApp-CTA im ersten Viewport, Preis-Toggle funktioniert, ein Blau konsistent, echte Fotos, ruhiger Sektionsrhythmus).

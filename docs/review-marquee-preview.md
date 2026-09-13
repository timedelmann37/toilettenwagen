# Google-Bewertungen: lokale Laufband-Vorschau

- Quelle Layout/Bewegung: vom User angehängter React-Komponenten-Prompt `testimonials-with-marquee.tsx`. Nur horizontales Kartenband, Profilbereich und Rezensionstext übernehmen; keine Demo-Überschrift, englische Demo-Claims, Twitter-Links oder Dark-Mode-Fläche.
- Quelle Daten: User-Screenshot `codex-clipboard-275e02b5-3a21-4648-904b-39c584e995bc.png`. Sieben sichtbare Rezensionen, jeweils 5/5. Keine Gesamtbewertung oder Gesamtzahl daraus ableiten.
- Abgeschnittene Texte enden mit Auslassungszeichen und sind als Auszug markiert. Relative Datumsangaben gehören zum Screenshot, nicht zu einem aktuellen API-Abruf.
- Profilfotos von Ebrar Kargun und Ralf Baldus als unveränderte 32-px-Ausschnitte aus dem Screenshot lokal hinterlegt. Andere Karten verwenden Initialen, keine erfundenen Personenfotos.
- Bestehende helle Seitenfarben und Schrift bleiben verbindlich. Die vormals vorhandene große Bewertungsüberschrift entfällt auf Wunsch, die Region hat einen zugänglichen Namen.
- Implementierung in vorhandenen React-/CSS-Modul-Strukturen, ohne unnötiges shadcn/Radix-Setup. Die Vorlage ist Design-/Verhaltensreferenz, kein Auftrag zu Framework-Migrationen.
- Schnittstelle: `Review` in `src/lib/reviews.ts`; `ReviewMarquee` erhält Rezensionen als Props. Später ersetzt ein autorisierter API-Adapter die Vorschauquelle. Noch keine externe Verbindung, keine erfundenen Original-Rezensionslinks.
- Bewegung: zwei identische Gruppen für nahtlosen Loop, Kopie vor Screenreadern verborgen. Pause-Schalter, Hover-/Fokus-Pause, statische Gesamtansicht, Stopp außerhalb des Viewports und bei verborgenem Tab. Reduced Motion: statisch horizontal scrollbar, keine Kopie.

## Abnahme

Desktop 1440 × 1000 und Mobile 390 × 844 im Browser geprüft; kein horizontaler Seitenüberlauf. Bewegungsfortschritt über zwei unterschiedliche Transformationswerte bestätigt, Pause/Fortsetzen und Wechsel in statische Ansicht bedient. Reduced-Motion-Fallback im CSS implementiert (Browserprüfung unter normaler Motion-Einstellung). Kleine Profilbilder werden vorab geladen, damit sie beim Laufband-Loop nicht fehlen. 51 Tests, ESLint und Produktionsbuild grün; Detector 0 Anti-Patterns. Diese Vorschau ist nicht als live synchronisiertes Google-Widget veröffentlicht.

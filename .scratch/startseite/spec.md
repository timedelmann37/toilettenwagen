# Spec: Startseite (Toilettenwagen-Vermietung)

Status: ready-for-agent

> Synthese aus `docs/design/direction-contract-home.md`, `PRODUCT.md`, `CONTEXT.md`, `docs/DISCOVERY.md`, `docs/adr/`.
> Terminologie durchgehend nach `CONTEXT.md`. Bindende Entscheidungen in ADR-0001..0004.

## Problem Statement

Ein potenzieller Kunde (privat, Firma, Veranstalter oder Kommune) im Umkreis von ca. 125 km um Niederdreisbach braucht für einen Termin einen sauberen, beheizten **Toilettenwagen**. Aktuell gibt es keine Website; Interessenten finden das Angebot nur über Kleinanzeigen und können sich weder ein Bild von den Wagen machen, noch Preise/Leistungen einschätzen, noch schnell und niederschwellig anfragen. Sie wissen nicht, ob ihr Anlass, ihre Region und ihr Termin bedient werden.

## Solution

Eine schlichte, vertrauensbildende **One-Pager-Startseite** (`/`), die die echten Wagen zeigt, die drei **Modelle** (S/M/L) mit fairen Preisen vergleichbar macht, den USP („Liefer-/Abholtag kostenfrei", „alles dabei") und den Ablauf erklärt, das Einsatzgebiet zeigt und den Besucher an einem klaren Ziel entlangführt: eine **Anfrage** stellen — primär per WhatsApp, sekundär per Formular. Zwei separate Pflichtseiten `/impressum` und `/datenschutz` erfüllen die Rechtslage. Alles produktgeführt gemäß Direction Contract (Kandidat A „Vertrauens-Katalog").

## User Stories

1. Als Besucher möchte ich im ersten Viewport sofort erkennen, dass hier gepflegte Toilettenwagen vermietet werden, damit ich weiß, dass ich richtig bin.
2. Als Besucher möchte ich im Hero einen echten, freigestellten Wagen sehen, damit ich die Qualität einschätzen kann.
3. Als eiliger Besucher möchte ich den WhatsApp-Kontakt ohne Scrollen sehen, damit ich sofort anfragen kann.
4. Als Besucher, der lieber nicht per WhatsApp schreibt, möchte ich einen zweiten Weg (Formular) sehen, damit ich trotzdem anfragen kann.
5. Als Besucher möchte ich per Sticky-Ankernavigation zu Wagen, Leistungen, Ablauf, Einsatzgebiet und Kontakt springen, damit ich gezielt navigiere.
6. Als Privatkunde möchte ich die drei Modelle S/M/L mit Kabinen-/Urinal-Anzahl und Ausstattung vergleichen, damit ich das passende auswähle.
7. Als Privatkunde möchte ich Preise **brutto (inkl. MwSt.)** sehen, damit ich den echten Endpreis kenne.
8. Als Firmenkunde möchte ich per Umschalter auf **Netto**-Preise wechseln, damit ich kalkulieren kann.
9. Als Besucher möchte ich den Hinweis „zzgl. Anfahrt 1,10 €/km · Liefer-/Abholtag kostenfrei" bei den Preisen sehen, damit ich keine versteckten Kosten fürchte.
10. Als Besucher möchte ich verstehen, dass Preise Richtwerte sind und ein individuelles Angebot folgt, damit meine Erwartung stimmt.
11. Als Besucher möchte ich den USP „alles dabei" (Abwasserrohre, Frischwasserschläuche, Holz-Kanaldeckel) verstehen, damit ich den Mehrwert gegenüber der Konkurrenz sehe.
12. Als Besucher möchte ich sehen, dass Liefer- und Abholtag nicht als Miettage zählen, damit ich die faire Berechnung erkenne.
13. Als Besucher möchte ich den Ablauf (Anfrage → Angebot < 2 h → Lieferung → Abholung → Reinigung) sehen, damit ich weiß, was mich erwartet.
14. Als Besucher möchte ich wissen, was ich selbst bereitstellen muss (Strom 230 V, Wasser, ebener Untergrund, Abwasseranschluss inkl. Genehmigung), damit ich vorbereitet bin.
15. Als Besucher möchte ich das Einsatzgebiet auf einer Karte sehen, damit ich prüfe, ob mein Ort bedient wird.
16. Als datenschutzbewusster Besucher möchte ich, dass die Google-Karte erst nach meiner Einwilligung lädt, damit meine Daten nicht ungefragt an Google gehen.
17. Als Besucher möchte ich echte Kundenstimmen sehen, damit ich Vertrauen fasse.
18. Als Besucher möchte ich im Anfrageformular Name, Kontakt, Ort/PLZ, Zeitraum, Modell, Anlass und Nachricht angeben, damit ein belastbares Angebot möglich ist.
19. Als Besucher möchte ich beim Absenden klare Fehlermeldungen bekommen, wenn Pflichtangaben fehlen oder die E-Mail ungültig ist, damit ich die Anfrage korrigieren kann.
20. Als Besucher möchte ich der Datenverarbeitung per Checkbox zustimmen, bevor ich absende, damit die Anfrage rechtskonform ist.
21. Als Besucher möchte ich nach erfolgreichem Absenden eine Bestätigung sehen, damit ich weiß, dass die Anfrage raus ist.
22. Als Besucher möchte ich bei einem Sendefehler eine verständliche Meldung + alternativen Kontaktweg sehen, damit ich nicht im Leeren stehe.
23. Als Mobil-Besucher möchte ich die Seite einspaltig und gut lesbar sehen (Wagen-Bild oben), damit sie am Handy funktioniert.
24. Als Besucher mit Sehbeeinträchtigung möchte ich ausreichenden Kontrast und lesbare Schrift (WCAG AA), damit ich die Inhalte erfassen kann.
25. Als Tastatur-Nutzer möchte ich Navigation, Toggle und Formular vollständig per Tastatur bedienen können, damit ich nicht auf die Maus angewiesen bin.
26. Als Besucher, der Bewegung reduziert hat (`prefers-reduced-motion`), möchte ich statische Inhalte ohne Animationen, damit mir nicht schlecht wird.
27. Als Besucher möchte ich im Footer den vollständigen Firmennamen und Links zu Impressum und Datenschutz finden, damit ich die rechtlichen Angaben erreiche.
28. Als Besucher möchte ich das Impressum mit allen Pflichtangaben (UG, Anschrift, Vertretung, HRB, USt-ID) sehen, damit die Firma verifizierbar ist.
29. Als Besucher möchte ich die Öffnungs-/Erreichbarkeitszeiten sehen, damit ich weiß, wann ich Antwort erwarten kann.
30. Als Suchender bei Google möchte ich die Seite über lokale Begriffe (Toilettenwagen mieten + Region) finden, damit ich sie überhaupt entdecke.
31. Als Betreiber möchte ich, dass Anfragen aus dem Formular an `kontakt@mobile-sanitaeranlagen-hs.de` gemailt werden, damit ich sie bearbeiten kann.
32. Als Betreiber möchte ich Basis-Spamschutz im Formular (Honeypot), damit ich nicht mit Spam zugeschüttet werde.

## Implementation Decisions

- **Auslieferung:** Next.js 16 als **statischer Export** (`output: 'export'`, `images.unoptimized`), Deployment auf Hetzner Webhosting L (ADR-0001). Keine SSR/API-Routen.
- **Seitenstruktur:** One-Pager `/` mit Sektionen in fester Reihenfolge (Hero → Wagen → „Alles dabei"/USP → Ablauf → Einsatzgebiet → Kundenstimmen → Anfrage → Footer) + separate Routen `/impressum`, `/datenschutz`.
- **Navigation:** Sticky-Ankernavigation (einzeilig, ≤80px) mit Logo; Anker auf die Sektionen.
- **Interaktive Leaves (Client Components, isoliert):** `PriceToggle` (Wagen-Sektion), `InquiryForm` (Anfrage), `MapConsent` (Einsatzgebiet). Restliche Seite statisch/serverseitig gerendert.
- **Preis-Toggle:** Zustand Privat|Firma; Default **Privat/brutto** (ADR-0004). Brutto = Netto × 1,19, kaufmännisch gerundet. Zusatzzeile mit Anfahrt/Liefertag-Hinweis. Preise als Richtwerte („ab …").
- **Modelle:** Datengetriebene Darstellung der drei Modelle (Name, Kabinen, Urinale, Ausstattung, Ab-Preis netto) aus einer zentralen Datenquelle; brutto wird abgeleitet.
- **Anfrageformular:** Felder Name, E-Mail, Telefon, Ort/PLZ, Zeitraum (von–bis), Modell (S/M/L/„weiß nicht"), Anlass, Nachricht, DS-Checkbox. Pflicht: Name + mindestens ein Kontaktweg + Zeitraum + Ort + DS-Checkbox. Client-seitige Validierung vor Absenden; Honeypot-Feld gegen Spam.
- **Formular-Backend:** POST an ein **PHP-Mail-Skript** auf demselben Webhosting, das an `kontakt@…` mailt (ADR-0002). Contract: Formular sendet Feldwerte; PHP antwortet mit Erfolg/Fehler; UI zeigt Bestätigungs-/Fehlerzustand. SMTP-/Mail-Zugangsdaten in der Umsetzung zu klären.
- **Karte + Consent:** Cookie-Consent-Banner; Google-Maps-Embed lädt **erst nach Einwilligung** (ADR-0003). Vor Einwilligung Platzhalter mit Klick-zum-Laden.
- **WhatsApp-CTA:** primärer, überall sichtbarer CTA (Deeplink aus `whatsapp unternehmenskonto.txt`) + Telefon/E-Mail.
- **Assets:** echte Fotos vorab zu WebP optimiert, nach `public/` verschoben, sinnvoll benannt; Hero = freigestellter S-Wagen. Logo self-hosted. Fonts self-hosted (`@font-face`, kein Google-CDN).
- **Theme:** ein helles Theme für die ganze Seite (Dark-Mode optional später), kein Sektions-Flip.
- **SEO:** deutschsprachige Meta-Titel/Description, OG-Card, lokale Keywords; strukturierte Daten (LocalBusiness) optional.

## Testing Decisions

- **Framework (neuer Seam):** Vitest + @testing-library/react (jsdom). Bisher kein Test-Setup im Repo — dies etabliert das Muster (Prior Art wird mit dem ersten Test geschaffen).
- **Guter Test = nur externes Verhalten**, keine Implementierungsdetails: sichtbarer DOM, Rollen/Labels, Nutzerinteraktionen — nicht interne State-Variablen oder CSS-Klassen.
- **Getestete Module (die drei Verhaltens-Leaves):**
  - `PriceToggle` / Wagen-Sektion: Default zeigt Brutto-Preise inkl. MwSt.; Umschalten auf Firma zeigt Netto; Hinweiszeile vorhanden; per Tastatur bedienbar.
  - `InquiryForm`: Absenden ohne Pflichtfelder zeigt Fehlermeldungen; ungültige E-Mail wird abgelehnt; fehlende DS-Checkbox blockiert Absenden; gültige Eingabe löst den Sende-Contract aus (Backend gemockt); Erfolg-/Fehlerzustand wird angezeigt.
  - `MapConsent`: vor Einwilligung wird die Google-Karte NICHT geladen (kein Google-iframe/-Request im DOM); nach Klick auf Einwilligung wird sie geladen.
- **Nicht per Test geprüft:** reine Optik, Layout, Farb-/Font-Treue → Phase 7 Visual QA. PHP-Mailversand selbst (außerhalb der JS-Testgrenze) → manuell verifiziert.

## Out of Scope

- Konkrete Design-Vorlagen/Comps, finale Layouts, finaler Font, Feinabstimmung → Phase 5/6/7.
- Higgsfield-generierte Assets (später; vorerst echte Fotos).
- „Über uns"/Gründer-Block (v2).
- Finaler Datenschutz-Text (`docs/TODO-DATENSCHUTZ.md`; abhängig von verbauten Komponenten).
- Exakte Wortmarke; Registergericht/MStV-Verantwortliche im Impressum (⚠️ in `docs/IMPRESSUM.md`).
- Feste Preisstaffelung, Wochenend-Preise, Service-Intervalle, Partner.
- Online-Buchung/Zahlung, Kalender/Verfügbarkeit, CMS, Mehrsprachigkeit, Dark-Mode.

## Further Notes

- Bilder: 26 echte Fotos im Root (Handy-Qualität, meist 4:3/3:4); `s-wagen ohne schatten.jpg` ist freigestellt (Hero). `aussenbeleuchtung.jpeg` ist Banner-breit (2048×732).
- Impressum-Entwurf liegt in `docs/IMPRESSUM.md` (offene ⚠️-Punkte).
- Kundenstimmen: „Vorname + Initiale"/Google, Klarname nur mit Einwilligung.
- Tickets folgen in Phase 5 via `/to-tickets` (Tracer-Bullets, Reihenfolge: Fundament → Hero/Direction-Proof → Wagen+Toggle → USP/Ablauf → Einsatzgebiet+Consent → Kundenstimmen → Anfrageformular → Rechtsseiten → Responsive/A11y/Perf → Motion → Visual-Review).

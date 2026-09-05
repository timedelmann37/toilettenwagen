# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Bestehendes Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + TypeScript.
Auslieferung als **statischer Export** (`output: 'export'`) auf Hetzner Webhosting L; Anfrageformular über ein PHP-Mail-Skript auf demselben Hosting. Siehe `docs/adr/0001` und `0002`.

## Users

- **Privatkunden** (Hochzeiten, Gartenpartys, private Feiern) – oft einmalige Anmietung, planen ein persönlich wichtiges Event, teils ältere Gastgeber.
- **Event-Veranstalter** (Festivals, Märkte, Sportveranstaltungen).
- **Bau/Gewerbe** (Baustellen, Firmenfeiern).
- **Kommunen/Behörden.**

Gemeinsame Situation: ein Termin/Ort im Umkreis ~125 km um Niederdreisbach braucht saubere mobile Sanitäranlagen; Aufgabe des Besuchers: **schnell eine Miet-Anfrage stellen** (bevorzugt WhatsApp).

## Product Purpose

Vermietung gepflegter, ganzjährig beheizter Toilettenwagen in drei Größen (S/M/L). Die Website existiert, um eine **Miet-Anfrage** auszulösen – nicht den Abschluss. Erfolg = qualifizierte Anfrage mit genug Angaben für ein Angebot (Ziel < 2 h).

## Positioning

Was eine Nachbar-Firma nicht wahrheitsgemäß kopieren kann:
- **Faire Berechnung:** Liefer- und Abholtag zählen nicht als Miettage.
- **„Alles dabei":** Abwasserrohre, Frischwasserschläuche, maßgefertigte Holz-Kanaldeckel inklusive – anderswo muss der Kunde die Hälfte selbst stellen.
- Meistert schwierige Aufbauten (Unterbau, Revisionsschächte, schiefe Auffahrten).
- Sehr schneller, persönlicher Kontakt; Angebote meist < 2 h.

## Operating Context

- **Kunde stellt bereit:** Stromanschluss 230 V, Wasseranschluss, fester ebener Untergrund, Abwasseranschluss vor Ort inkl. Genehmigung.
- **Ablauf:** Anfrage → Angebot (< 2 h) → Auftragsbestätigung → ggf. 30 % Anzahlung → Anlieferung/Aufbau (meist 1 Tag vorher) → Abholung/Abbau (meist 1 Tag nach Event) → Reinigung → Schlussrechnung + Bitte um Google-Bewertung.
- **Buchungsvorlauf:** Hochzeit (August) idealerweise 1 Jahr vorher, sonst 3–6 Monate.
- **Standort der Wagen:** Niederdreisbach. **Anfahrt:** 1,10 €/km, nicht im Mietpreis enthalten.

## Capabilities and Constraints

- **Drei Modelle** (Terminologie siehe `CONTEXT.md`):
  - **S** – 2 Damen, 1 Herren + 2 Urinale; Heizung, warm+kalt fließend Wasser, Sensorarmaturen, Palmen-/Strand-Innenfolierung. Ab 175 € netto/Tag.
  - **M** – 3 Damen, 1 Herren + 3 Urinale; kalt fließend Wasser. Ab 190 € netto/Tag.
  - **L** – 4 Damen, 2 Herren + 6 Urinale; kalt fließend Wasser. Ab 210 € netto/Tag.
- Alle: ganzjährig beheizt, Waschbecken, Spiegel, Innen-/Außenbeleuchtung, Spülung, Tork-Papierspender.
- Preise sind Richtwerte („Freestyle" je nach Ort/Anlass), kein Festpreis; Anzeige brutto/netto per Toggle (`docs/adr/0004`).
- **Undecided (nicht erfinden):** feste Preisstaffelung, günstigster Wochenend-Ab-Preis, Service-Intervall bei langen Mieten, feste Partner (Caterer/Zelt), „Über uns"-Text.

## Brand Commitments

- **Name:** Mobile Sanitäranlagen Herrmann und Smécz UG (haftungsbeschränkt); Kurzform als Wortmarke, voller Name im Footer/Impressum.
- **Logo:** `firmenlogo.png` (vorhanden, 455×161).
- **Bindende Farbvorgabe:** Blau, Weiß/Grau.
- **Bindender Eindruck:** modern & schlicht, bodenständig & ehrlich.
- **Bindende Anti-Ziele:** zu viele Animationen, unnötig viele Bilder, überzogenes Design.
- **Sprache:** Deutsch.

## Evidence on Hand

- **26 echte Fotos** im Repo-Root (Innen, Außen, Kabinen, Urinale, Wagen S/M/L, Außenbeleuchtung); `s-wagen ohne schatten.jpg` ist freigestellt. Handy-Qualität; To-do: nach `public/` optimieren (WebP), sinnvoll benennen.
- **5 echte Kundenstimmen** (Quelle `fragebogen-infos.txt`); Veröffentlichung als „Vorname + Initiale"/Google, Klarname nur mit Einwilligung (`docs/adr` offen).
- Google-Bewertungen werden aktiv erbeten.
- **Absence:** keine erfundenen Testimonials, Kundenlogos, Statistiken, Zertifikate oder Case-Study-Ergebnisse.

## Product Principles

1. **Anfrage vor Abschluss** – jede Sektion dient dem einen Ziel: eine qualifizierte Miet-Anfrage.
2. **Echtes zeigen** – echte Wagen, echte Region, echte Stimmen; kein Deko-Ersatz, keine Stock-Fotos.
3. **Fairness sichtbar machen** – der USP „Liefer-/Abholtag kostenfrei" und „alles dabei" sind der Vertrauenshebel.
4. **Ruhig & ehrlich** – schlicht statt überzogen; Zurückhaltung ist Teil der Marke, nicht ein Kompromiss.
5. **Regional & schnell** – Nähe (125 km) und Tempo (Angebot < 2 h) sind konkrete Verkaufsargumente.

## Accessibility & Inclusion

Breites, teils älteres Privatpublikum → gut lesbare Typo, klarer Kontrast, einfache Sprache, große Touch-Ziele. Ziel WCAG AA.

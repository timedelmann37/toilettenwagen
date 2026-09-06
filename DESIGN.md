---
name: Mobile Sanitäranlagen HS
description: Präzise Produktinszenierung mit warmem regionalem Servicecharakter.
colors:
  porcelain: "#f2f2ee"
  mineral-surface: "#e9ece9"
  porcelain-raised: "#f8f8f4"
  deep-navy: "#142b3b"
  muted-navy: "#526471"
  mineral-line: "#d8ddda"
  mineral-line-strong: "#aab6bc"
  hygiene-blue: "#246bb5"
  hygiene-blue-strong: "#185894"
  cool-white: "#f9fbfc"
  whatsapp-green: "#1e8449"
  whatsapp-green-strong: "#176f3c"
  inquiry-navy: "#173548"
  inquiry-white: "#f8f7f0"
  focus-blue: "#b7daf7"
  error-peach: "#ffd0bd"
  map-copy: "#d5e0e3"
  map-line: "#91aab7"
  sand-marker: "#ded8ca"
  timeline-blue: "#21475e"
  timeline-highlight: "#b9daed"
  timeline-muted: "#d3dee2"
  inquiry-muted: "#d7e1e4"
  success-green: "#9fd2b2"
typography:
  display:
    fontFamily: "Bricolage Grotesque, Hanken Grotesk, sans-serif"
    fontSize: "clamp(3.4rem, 6.25vw, 5.9rem)"
    fontWeight: 650
    lineHeight: 0.94
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Bricolage Grotesque, Hanken Grotesk, sans-serif"
    fontSize: "clamp(2.3rem, 4vw, 3.7rem)"
    fontWeight: 640
    lineHeight: 0.96
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 720
    lineHeight: 1.2
rounded:
  card: "0.875rem"
  pill: "999px"
  marker-sm: "0.2rem"
  legal-sm: "0.25rem"
  timeline-sm: "0.3rem"
spacing:
  page-x: "clamp(1rem, 4vw, 4.5rem)"
  section-y: "clamp(5rem, 9vw, 9rem)"
  panel: "clamp(2rem, 5vw, 4.5rem)"
components:
  button-whatsapp:
    backgroundColor: "{colors.whatsapp-green}"
    textColor: "{colors.cool-white}"
    rounded: "{rounded.pill}"
    padding: "0 1.5rem"
    height: "3rem"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.deep-navy}"
    rounded: "{rounded.pill}"
    padding: "0 1.4rem"
    height: "3rem"
  model-choice-selected:
    backgroundColor: "{colors.hygiene-blue}"
    textColor: "{colors.cool-white}"
    padding: "1.1rem clamp(1rem, 2vw, 2rem)"
    height: "7.25rem"
  input-dark:
    backgroundColor: "rgba(248, 247, 240, 0.06)"
    textColor: "{colors.inquiry-white}"
    rounded: "{rounded.card}"
    padding: "0.8rem 0.95rem"
    height: "3.25rem"
  panel:
    backgroundColor: "{colors.porcelain-raised}"
    textColor: "{colors.deep-navy}"
    rounded: "{rounded.card}"
    padding: "{spacing.panel}"
---

# Design System: Mobile Sanitäranlagen HS

## Overview

**Creative North Star: „Die Modellfamilie als roter Faden“**

Die Website inszeniert Mobile Sanitäranlagen Herrmann & Smécz wie ein sorgfältig geführtes Produkt- und Servicestudio. Die drei realen Wagen sind Hauptdarsteller und Orientierungssystem: zuerst als Familie, dann als kontinuierliche S/M/L-Reise, schließlich als Ausgangspunkt für Service, Ablauf, Region und Anfrage.

Die visuelle Welt verbindet technische Präzision mit regionaler Nähe. Große freie Produktbühnen wechseln mit strengen Daten- und Formularrastern; warmes Porzellan, tiefes Navy und sparsam eingesetztes Hygiene-Blau halten die Seite hochwertig, lesbar und menschlich. Sie vermeidet kalte SaaS-Flächen, künstliche Studiohintergründe, generische Kartenraster und erfundenen Produktbeweis.

**Key Characteristics:**

- reale Wagenkonturen als visuelle Hauptform statt dekorativer Illustration
- großzügige Bühnen im Wechsel mit kompakten, präzisen Informationszonen
- dünne blaue Linien als wiederkehrende Grammatik für Stationen, Übergaben und Zeitverläufe
- echtes Bildmaterial mit genau einer Rolle je Motiv
- Motion erklärt das Sortiment, während alle Inhalte statisch vollständig bleiben

## Colors

Die Palette wirkt wie warmes Porzellan, Mineraloberflächen, tiefes Beschriftungs-Navy und ein kontrollierter Wasser-/Hygieneakzent.

### Primary

- **Hygiene Blue** (`#246bb5`): aktiver Modellzustand, Fokus, Stationsmarken und erklärende Verbindungslinien.
- **Hygiene Blue Strong** (`#185894`): Hover- und Textakzent, wenn mehr Kontrast als beim Grundblau nötig ist.

### Secondary

- **WhatsApp Green** (`#1e8449`): ausschließlich der primäre WhatsApp-Kanal.
- **WhatsApp Green Strong** (`#176f3c`): ausschließlich dessen Hoverzustand.

### Tertiary

- **Inquiry Navy** (`#173548`): dunkle Abschlussfläche des Anfrageformulars.
- **Error Peach** (`#ffd0bd`): warme, gut erkennbare Fehlerrückmeldung auf der Anfragefläche.
- **Sand Marker** (`#ded8ca`): kleiner warmer Gegenakzent in der regionalen Vertrauensebene.
- **Success Green** (`#9fd2b2`): zurückhaltende Erfolgsmarkierung ausschließlich innerhalb der Anfragefläche.

### Neutral

- **Porcelain** (`#f2f2ee`): globale Grundfläche; kein reines Bildschirmweiß.
- **Mineral Surface** (`#e9ece9`): ruhige Gruppierungen und Schalterhintergründe.
- **Porcelain Raised** (`#f8f8f4`): hervorgehobene helle Flächen.
- **Deep Navy** (`#142b3b`): primäre Schrift und dunkle Bedienelemente.
- **Muted Navy** (`#526471`): erklärender Sekundärtext.
- **Mineral Line / Strong** (`#d8ddda` / `#aab6bc`): Trennung und technische Raster.
- **Cool White** (`#f9fbfc`) und **Inquiry White** (`#f8f7f0`): Kontrasttext auf Blau, Grün und Navy.
- **Focus Blue** (`#b7daf7`): sichtbarer Fokus innerhalb der dunklen Formularfläche.
- **Map Copy / Line** (`#d5e0e3` / `#91aab7`): helle Kartenbeschriftung und Kontur auf dem dunklen Regionspanel.
- **Timeline Blue / Highlight / Muted** (`#21475e` / `#b9daed` / `#d3dee2`): abgestufte Prozessbühne für Ereignisfenster und Begleittext.
- **Inquiry Muted** (`#d7e1e4`): sekundäre Formular- und Statuskopie auf Inquiry Navy.

**The Channel Color Rule.** Grün bezeichnet immer WhatsApp und nie die allgemeine Marke. Hygiene-Blau erklärt Auswahl, Struktur und Präzision; es wird nicht als flächiger Standardgradient benutzt.

## Typography

**Display Font:** Bricolage Grotesque mit Hanken-Grotesk-Fallback

**Body Font:** Hanken Grotesk mit System-Sans-Fallback

**Character:** Bricolage gibt den kurzen Produktüberschriften eine eigenständige, leicht handwerkliche Silhouette. Hanken hält Fließtext, Daten, Formulare und Rechtstexte warm, unaufgeregt und auch für ein breites Publikum gut lesbar. Beide Schriften werden selbst gehostet ausgeliefert.

### Hierarchy

- **Display** (650, `clamp(3.4rem, 6.25vw, 5.9rem)`, 0.94): maximal kurze Hero-Claims, balanciert und auf etwa 10,5 Zeichen Breite begrenzt.
- **Headline** (640, `clamp(2.3rem, 4vw, 3.7rem)`, 0.96): Kapitel- und Abschlussüberschriften.
- **Title** (700, etwa `clamp(1.65rem, 2.5vw, 2.5rem)`, 1): Modellnamen und markante Zwischenüberschriften.
- **Body** (400, 1rem bis 1.18rem, 1.45–1.55): Erläuterungen mit typischer Zeilenlänge von 32 bis 42rem; Rechtstexte höchstens 72ch.
- **Label** (700–750, 0.84–0.92rem): Modell-, Preis-, Formular- und technische Kennzeichnungen; Großbuchstaben nur punktuell.

**The Short Headline Rule.** Überschriften bleiben inhaltlich knapp und räumlich breit; technische Details wandern in die nächste Hierarchieebene.

## Layout

Die Seite folgt keinem wiederholten Landingpage-Grid. Freie Wagenbühnen, eine rechte vertikale Modellspur, asymmetrische Bildbeweise, eine redaktionelle Zeitachse, ein Regionsraum und die dunkle Anfragewerkstatt bilden bewusst verschiedene Layoutfamilien. Der gemeinsame Außenabstand ist `clamp(1rem, 4vw, 4.5rem)`; große Inhaltsbreiten enden bei rund 88rem. Abschnittsabstände liegen typischerweise zwischen `clamp(5rem, 9vw, 9rem)` und `clamp(7rem, 11vw, 11rem)`.

Desktop darf reale Wagenkonturen über Rastergrenzen führen, während Daten und Formulare einem ruhigen Zwei-Spalten-Raster folgen. Unter 1040/900px lösen sich breite Produkt- und Formularanordnungen schrittweise. Unter 767px wird daraus eine eigenständige lineare Komposition: die lange Leitspur entfällt, S/M/L bleiben statisch sichtbar, Aktionen stapeln sich und sämtliche Inhalte bleiben ohne präzise Gesten erreichbar.

## Elevation & Depth

Das System ist flach und tonal geschichtet. Porzellan-, Mineral- und Navy-Flächen sowie dünne Regeln erzeugen den Großteil der Tiefe. Schatten gehören nur zu freigestellten Wagen und wenigen echten schwebenden Übergangselementen; Karten werden nicht durch pauschale Schatten aufgewertet.

### Shadow Vocabulary

- **Vehicle Grounding** (`filter: drop-shadow(0 1.25rem 1.55rem rgb(22 43 57 / 0.14))`): bindet transparente Wagen glaubwürdig an die gemeinsame Bodenlinie.
- **Ambient Proof** (`box-shadow: 0 1.8rem 4rem rgb(20 43 59 / 0.1)`): einmalige weiche Tiefe an einem hervorgehobenen Servicebeweis.
- **Motion Marker** (`box-shadow: 0 0.6rem 1.4rem rgb(20 43 59 / 0.12)`): kleiner räumlicher Hinweis innerhalb der Leitwagen-Choreografie.

**The Flat-by-Default Rule.** Flächen bleiben im Ruhezustand flach; Schatten erklären physische Freistellung oder einen besonderen Übergang, nie bloß „Premium“.

## Shapes

Die normative Komponentenform besitzt zwei Stufen: `0.875rem` für Flächen, Karten und Eingabefelder sowie `999px` für CTAs, Schalter und Chips. Kreisformen sind Messpunkte oder Icons. Dünne Linien dürfen Kapitel verbinden; vollständig umrahmte Karten werden nur eingesetzt, wenn sie eine echte Auswahl oder Gruppierung tragen. Die dokumentierten Radien `0.2rem`, `0.25rem` und `0.3rem` bleiben ausschließlich lokalen Mess-, Rechts- und Zeitachsenmarkern vorbehalten und bilden keine zusätzliche allgemeine Komponentenform.

## Components

### Buttons

- **Shape:** Pill (`999px`) mit mindestens 44px Bedienhöhe.
- **WhatsApp Primary:** `#1e8449` auf hellem Kontrasttext, 48px hoch; Hover `#176f3c`, Aktivzustand 1px nach unten.
- **Secondary:** transparent, Deep Navy, unterstrichen und zurückhaltend; Hover wechselt zu Hygiene Blue Strong.
- **Focus:** 2px Hygiene Blue mit 3–4px Abstand; innerhalb des Navy-Formulars Focus Blue.

### Chips

- **Style:** Preis- und Modelltoggles nutzen flache Mineralflächen und Pill-Form. Ausgewählt wird der Preis in Deep Navy, das Modell in Hygiene Blue; die Beschriftung bleibt jederzeit explizit.

### Cards / Containers

- **Corner Style:** `0.875rem`, sofern eine Fläche überhaupt eine geschlossene Kontur braucht.
- **Background:** Porcelain Raised oder Mineral Surface; die Anfragefläche ist Inquiry Navy.
- **Shadow Strategy:** flach im Normalzustand, Trennung primär über Ton und 1px-Regeln.
- **Internal Padding:** kompakt `clamp(1.25rem, 2.5vw, 2rem)`, groß `clamp(2rem, 5vw, 4.5rem)`.

### Inputs / Fields

- **Style:** auf der Navy-Fläche halbtransparente helle Kontur, `0.875rem` Radius, mindestens 52px hoch.
- **Focus:** helle Kontur plus 2px Focus Blue; nie nur Farbverschiebung.
- **Error / Disabled:** Fehler stehen feldnah und gesammelt im fokussierbaren Alert; deaktivierter Versand bleibt lesbar und zeigt Wartezustand.

### Navigation

Einzeilig und ruhig: schwarzes transparentes Logo, fünf Anker und ein kompakter WhatsApp-CTA. Auf Mobile bleibt die Marke sichtbar, während sich die Navigation auf die wesentlichen Wege reduziert. Sticky-Verhalten dient Orientierung und darf die Produktbühne nicht dominieren.

### Model Family & Journey

Die Wagenfamilie zeigt S, M und L auf einer glaubwürdigen Bodenlinie. Auf Desktop führt genau ein Wagen auf derselben rechten Achse durch drei Stationen; die native Scrollposition steuert den Ablauf ohne Snap, Wheel-Sperre oder programmgesteuertes Scrollen. Auf Mobile und bei Reduced Motion erscheint dieselbe Information statisch in normaler Dokumentreihenfolge.

## Do's and Don'ts

### Do

- **Do** reale S/M/L-Wagen, reale Innenräume und überprüfte Produktdaten als primären Beweis verwenden.
- **Do** große freie Bühnen mit kompakten Daten-, Prozess- und Formularzonen abwechseln.
- **Do** Hygiene-Blau für aktive Zustände, Fokus und erklärende Linien reservieren.
- **Do** Privat/brutto standardmäßig zeigen und Gewerbe/netto ausdrücklich benennen.
- **Do** mindestens 44px große Ziele, sichtbaren Fokus und vollständige statische Fallbacks erhalten.
- **Do** Motion an die native Scrollposition binden und `prefers-reduced-motion` vollständig respektieren.

### Don't

- **Don't** kaltes Reinweiß, generische SaaS-Blaugrauflächen oder dekorativen AI-Nebel einführen.
- **Don't** einen Standard-Split-Hero, gleichförmige Featurekarten oder ein automatisch laufendes Testimonial-Karussell bauen.
- **Don't** Stockbilder, erfundene Ausstattung, Zertifikate, Kundenlogos oder Leistungsstatistiken ergänzen.
- **Don't** Wagenproportionen, Logos, Achsen, Türen oder technische Daten zugunsten einer schöneren Darstellung verfälschen.
- **Don't** Google Maps vor Einwilligung oder nicht freigegebene Reserve- und Konzeptassets ausliefern.
- **Don't** native Scroll-Eingaben sperren, CSS-Snapping erzwingen oder Information ausschließlich in Motion verstecken.

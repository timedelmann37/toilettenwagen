# Spec: Startseite — Modellfamilie als roter Faden

Status: ready-for-agent

> Verbindliche Synthese aus `docs/design/direction-contract-home.md`, `PRODUCT.md`, `CONTEXT.md`, `docs/DISCOVERY.md` und ADR-0001 bis ADR-0004.
> Der A4-Prototyp unter `/prototype/family-unfold/?variant=a4` ist ausschließlich Interaktionsbeweis. Er ist weder Seitenvorlage noch Produktionscode.

## 1. Problem

Privatkunden, Veranstalter, Firmen und Kommunen benötigen für einen festen Ort und Termin eine gepflegte mobile Sanitärlösung. Vor einer Anfrage müssen sie schnell verstehen:

- welche der drei Wagen-Größen grundsätzlich passt,
- welche Ausstattung und Anschlüsse dazugehören,
- welche Kostenlogik gilt,
- ob der Ort im Einsatzgebiet liegt,
- wie Lieferung und Abholung ablaufen,
- und wie sie ohne Hürde ein persönliches Angebot erhalten.

Eine gewöhnliche regionale Dienstleister-Landingpage würde die sachlichen Informationen zwar transportieren, aber weder die Qualität der Wagen noch den eigenständigen Produktcharakter glaubwürdig vermitteln. Die neue Seite muss deshalb Produktinszenierung, regionale Nähe und konkrete Planungshilfe in einer zusammenhängenden Erzählung verbinden.

## 2. Lösung und Erfolg

Gebaut wird eine deutschsprachige One-Page-Startseite `/` mit den Rechtsseiten `/impressum` und `/datenschutz`.

Die **Modellfamilie** bildet den roten Faden: S, M und L eröffnen gemeinsam die Seite. Danach erklärt eine statisch vollständig lesbare Modellgeschichte die drei Größen. In Phase 8 wird daraus die bestätigte Scrollchoreografie, bei der sich derselbe Leitwagen aus dem Hero löst, rechts durch die Stationen S/M/L fährt und anschließend parkt. Von dort übernimmt die Servicestory bis zur Anfrage.

Erfolg bedeutet:

1. Im ersten Viewport sind Produkt, Region und primäre Handlung verständlich.
2. Ein Besucher kann S/M/L und Privat-/Gewerbepreise sicher vergleichen.
3. Bedingungen, Service und Voraussetzungen sind vor der Anfrage klar.
4. WhatsApp ist jederzeit leicht erreichbar.
5. Eine qualifizierte Formularanfrage kann alternativ vollständig abgesendet werden.
6. Alle Kerninhalte funktionieren statisch, mobil, per Tastatur und mit reduzierter Bewegung.

## 3. Autorität und Grenzen

- Der [Direction Contract](../../docs/design/direction-contract-home.md) entscheidet visuelle Welt, Seitenmodell, Bildwelt, Anti-Ziele und spätere Motion.
- `PRODUCT.md` und `docs/DISCOVERY.md` entscheiden Produktdaten und Claims.
- `CONTEXT.md` entscheidet Begriffe. Insbesondere heißt die Conversion **Anfrage**, nicht Buchung oder Reservierung.
- ADR-0001 entscheidet statischen Next.js-Export; ADR-0002 PHP-Mailer; ADR-0003 Google Maps mit Consent; ADR-0004 Privat-brutto/Gewerbe-netto.
- Ein Implementierer darf keine Preise, Ausstattungen, Kundenstimmen, Statistiken, Zertifikate oder Verfügbarkeiten ergänzen.
- Das Logo darf professionell aufbereitet, inhaltlich aber nicht verändert werden.
- Produktion ersetzt nicht die bestehende Prototyp-Route; diese bleibt bis zur späteren Bereinigung als Entscheidungsnachweis bestehen.

## 4. Zielgruppen und Hauptaufgabe

Die Seite richtet sich gleichwertig an:

- Privatkunden für Hochzeiten, Gartenpartys und Feiern,
- Veranstalter für Kirmes, Märkte, Festivals und Sportveranstaltungen,
- Firmen und Baustellen,
- Kommunen und Behörden.

Keine Zielgruppe erhält im Hero eine exklusive Bild- oder Sprachwelt. Die gemeinsame Hauptaufgabe lautet: **Eignung grob prüfen und eine qualifizierte Anfrage stellen.**

## 5. Informations- und Interaktionsarchitektur

Die Seite folgt nicht dem üblichen Baukasten aus Hero, Featurekarten, Icon-Ablauf, Testimonials und Kontaktband. Sie besitzt drei zusammenhängende Akte:

### Akt I — Produkt verstehen

1. **Ruhige Orientierung:** Logo, Ankernavigation und WhatsApp.
2. **Die Familie:** S/M/L als gemeinsame Produktbühne im ersten Viewport.
3. **Ein Wagen, drei Stationen:** Modellgeschichte S → M → L.
4. **In Ruhe vergleichen:** Modellwechsler, Preisansicht und kompakte Auswahlhilfe.

### Akt II — Zusammenarbeit verstehen

5. **Der Wagen parkt. Der Service übernimmt:** faire Miettage, Inklusivzubehör, ganzjähriger Betrieb und schwierige Aufstellungen.
6. **Was vor Ort zählt:** Anschlüsse, Untergrund und Genehmigung.
7. **Von der Anfrage bis zur Abholung:** echter zeitlicher Ablauf und Buchungsvorlauf.

### Akt III — Vertrauen und handeln

8. **Aus Niederdreisbach. Für die Region:** Einsatzgebiet, consent-geschützte Karte und echte Kundenstimmen.
9. **Sag uns Ort, Termin und Anlass:** WhatsApp und Anfrageformular.
10. **Verbindlicher Abschluss:** Firma, Kontakt und Recht.

Die Kapitel dürfen visuell ineinandergreifen. Sie dürfen nicht als zehn gleichförmige rechteckige Sektionen oder Kartenstapel umgesetzt werden.

## 6. Seitenkapitel und sichtbare Anforderungen

### 6.1 Navigation

- Logo links; Anker **Wagen · Service · Ablauf · Region · Kontakt**.
- WhatsApp als hervorgehobene Handlung.
- Desktop einzeilig und ruhig; nach dem ersten Scroll funktional sticky.
- Mobile als verständlich beschriftetes Menü mit sichtbarem Fokus, Escape-Schließen und Rückgabe des Fokus an den Auslöser.
- Anchor-Sprünge landen unterhalb der sticky Navigation und verschieben keinen Fokus unkontrolliert.

### 6.2 First Viewport — Die Familie

- Drei freigestellte Wagen stehen getrennt, aber kompositorisch zusammengehörig; keine sterile Längenreihe.
- Keine künstliche Studiofläche, Texturkulisse oder fotografische Karte hinter den Wagen.
- Vorläufig ist dreimal derselbe aufbereitete S-Wagen zulässig. Labels und Modelldaten bleiben trotzdem korrekt S/M/L. Die Seite behauptet visuell nicht, dass die provisorischen Assets bereits maßhaltige M-/L-Abbildungen sind.
- Kurzer Claim, knappe regionale Einordnung und ein konkretes Nutzenversprechen.
- Primär-CTA **Per WhatsApp anfragen**; sekundärer Sprung **Anfrage vorbereiten**.
- Logo, Handlung und mindestens ein klarer Produktbeweis sind ohne Scrollen sichtbar.
- Technische Tabellen, WC-Aufteilung und lange Ausstattungstexte erscheinen nicht im ersten Viewport.

### 6.3 Modellgeschichte S/M/L

- Alle drei Stationen sind bereits in Phase 6 statisch und in normaler Dokumentreihenfolge vollständig verständlich.
- Pro Station werden zuerst Modell, Kapazität, Ab-Preis und ein kurzer Eignungshinweis gezeigt.
- Maße, WC-Aufteilung und Ausstattung liegen auf einer klar bezeichneten zweiten Informationsebene.
- Detailinhalte sind nicht nur per Hover erreichbar.
- Die spätere Bewegung ist kein Bestandteil des statischen Abnahmetests in Phase 6/7.
- Für Phase 8 gilt die Choreografie des Direction Contracts: identischer Leitwagen, Hero-Ausbruch, rechte vertikale Spur, Stillstand S/M/L, Verlängerung nur zwischen Stationen, zweite Achse bei L, Parken vor dem Vergleich.

### 6.4 Modellwechsler

- Auswahl S/M/L aktualisiert als eine zusammenhängende Ansicht:
  - Wagenbild,
  - Kapazität,
  - Maße,
  - Damen-/Herrenaufteilung und Urinale,
  - modellspezifische und gemeinsame Ausstattung,
  - Ab-Preis.
- Aktives Modell ist sichtbar, programmatisch erkennbar und per Tastatur auswählbar.
- Kein automatisch laufendes Carousel und kein erzwungenes Wischen.
- Ein direkter Anfrage-CTA übernimmt das gewählte Modell als unverbindliche Vorauswahl in das Formular.

### 6.5 Preisansicht

- Default: **Privat · brutto inkl. MwSt.**
- Alternative: **Gewerbe · netto**.
- Brutto wird aus Netto × 1,19 kaufmännisch auf Cent gerundet:
  - S: 175,00 € netto / 208,25 € brutto,
  - M: 190,00 € netto / 226,10 € brutto,
  - L: 210,00 € netto / 249,90 € brutto.
- Jede Ansicht verwendet „ab“ und „pro Miettag“.
- In unmittelbarer Nähe steht unmissverständlich:
  - Anfahrt 1,10 €/km, nicht im Mietpreis enthalten,
  - Lieferung und Abholung werden separat berechnet,
  - Liefer- und Abholtag zählen nicht als Miettage,
  - das verbindliche Ergebnis folgt als individuelles Angebot.
- Die Wahl darf lokal während des Seitenbesuchs erhalten bleiben; keine persistente Profilbildung.

### 6.6 Kompakte Auswahlhilfe

- Die v1-Auswahlhilfe ist bewusst klein und nicht als Buchungswizard inszeniert.
- Eingaben: geschätzte Personenzahl und optional Anlass.
- Ausgabe: das kleinste Modell, dessen veröffentlichte Kapazität die Personenzahl abdeckt.
- Schwellen: bis 200 → S, 201–400 → M, 401–600 → L.
- Über 600 oder fehlende/ungültige Zahl → persönliche Beratung statt automatischer Empfehlung.
- Ergebnis immer als **unverbindliche Orientierung** bezeichnen; Anlass, Zeitraum, Anschlüsse und Verfügbarkeit können die persönliche Empfehlung verändern.
- Ergebnis kann Modell und Anlass im Anfrageformular vorbefüllen.
- Kein Preisangebot, keine Verfügbarkeitsprüfung und keine automatische Buchung.

### 6.7 Serviceübergang

Folgende Aussagen werden als wenige große, inhaltlich verschiedene Beweise inszeniert, nicht als gleichförmige Iconkarten:

- Liefer- und Abholtag zählen nicht als Miettage.
- Abwasserrohre, Frischwasserschläuche und maßgefertigte Holzabdeckungen sind dabei.
- Alle Wagen sind beheizt und ganzjährig einsetzbar.
- Waschbecken, Spiegel, Innen-/Außenbeleuchtung, Spülung und Tork-Papierspender gehören zur gemeinsamen Ausstattung.
- Schwierige Aufstellungen werden lösungsorientiert geplant.

Modell S darf zusätzlich warmes und kaltes Wasser sowie Sensorarmaturen nennen. Das vorhandene Foto der Palmen-/Strand-Innenfolierung darf als allgemeine Innenansicht erscheinen; eine Modellzuordnung oder Exklusivität wird erst nach Bestätigung behauptet.

### 6.8 Voraussetzungen vor Ort

Die Seite nennt zusammenhängend und gut auffindbar:

- 230-V-Stromanschluss,
- Wasseranschluss,
- festen, ebenen Untergrund,
- Abwasseranschluss vor Ort,
- erforderliche Genehmigung für den Abwasseranschluss.

Die Darstellung soll als gemeinsame Aufstellungsplanung verstanden werden, nicht als versteckter Haftungsausschluss.

### 6.9 Ablauf

Verbindliche Reihenfolge:

1. Anfrage per WhatsApp oder Formular.
2. Persönliches Angebot üblicherweise in unter zwei Stunden innerhalb der Erreichbarkeit.
3. Auftragsbestätigung; fallweise 30 % Anzahlung.
4. Lieferung und Aufbau meistens einen Tag vor dem Anlass.
5. Abholung und Abbau meistens einen Tag danach.
6. Reinigung, Schlussrechnung und Bitte um Google-Bewertung.

Zusätzlicher Planungshinweis: August-Hochzeiten idealerweise etwa ein Jahr vorher anfragen; sonst meist drei bis sechs Monate Vorlauf.

### 6.10 Einsatzgebiet, Karte und Bewertungen

- Standort der Wagen: Niederdreisbach.
- Reguläres Einsatzgebiet: ungefähr 125 km; weiter auf Anfrage.
- Ortsbeispiele dürfen Daaden, Herdorf, Neunkirchen, Niederfischbach, Dillenburg, Haiger und Westerwald nennen.
- Auch ohne Google Maps bleiben Radius und Ortsinformation vollständig sichtbar.
- Vor Einwilligung existiert kein Google-iframe und keine Anfrage an Google.
- Zustände: noch nicht entschieden, zugestimmt, abgelehnt, Karte lädt, Karte fehlgeschlagen.
- Einwilligung kann später geändert werden.
- Die fünf echten Kundenstimmen werden mit Quelle Google und nur in freigegebener Namensform gezeigt.
- Bewertungen bleiben ohne automatische Rotation lesbar.

### 6.11 Anfrage und Kontakt

WhatsApp ist visuell primär. Zusätzlich sichtbar:

- Telefon/WhatsApp: +49 160 2743001,
- E-Mail: `kontakt@mobile-sanitaeranlagen-hs.de`,
- Mo–Fr 08:00–13:00 und 15:00–19:00,
- Sa 10:00–16:00.

Formularfelder:

| Feld | Regel |
| --- | --- |
| Name | Pflicht |
| E-Mail | optional, aber E-Mail oder Telefon muss vorhanden sein; bei Eingabe valide |
| Telefon | optional, aber E-Mail oder Telefon muss vorhanden sein |
| Ort/PLZ | Pflicht |
| Von/Bis bzw. Termin | Pflicht; Ende nicht vor Beginn |
| Modell | S, M, L oder „weiß nicht“; Vorauswahl möglich |
| Anlass | Hochzeit, private Feier, Festival/Großveranstaltung, Firmenfeier, Markt, Sportveranstaltung oder Freitext/sonstiges |
| Nachricht | optional; ausreichend für realistische Rückfragen dimensioniert |
| Datenschutz | Pflicht, nicht vorausgewählt; Link zu `/datenschutz` |
| Honeypot | für Menschen unsichtbar und nicht als normale Eingabe angekündigt |

Formularzustände:

- **Initial:** keine irreführende Erfolgsaussage.
- **Ungültig:** Feldfehler plus fokussierbare Fehlerzusammenfassung; vorhandene Eingaben bleiben erhalten.
- **Sendet:** Submit gegen Doppelversand gesichert; Felder bleiben lesbar.
- **Erfolg:** eindeutige Bestätigung und realistischer nächster Schritt; kein Buchungsversprechen.
- **Server-/Netzwerkfehler:** Eingaben bleiben erhalten; WhatsApp und Telefon als Alternative. Formularinhalte werden nicht ungefragt in einen externen Deeplink übertragen.
- **Spamverdacht:** neutrale Fehlermeldung ohne Offenlegung der Filterlogik.

Das statische Frontend sendet nach späterer Aktivierung per POST an das PHP-Mail-Skript desselben Hostings. Das Backend antwortet in einem fest definierten JSON-Contract mit Erfolg oder sicherer Fehlermeldung. Zugangsdaten und interne Fehlerdetails erscheinen weder im Client noch in der Antwort.

**Amendment vom 2026-09-05:** Der User hat den produktiven Mailer bis zu einer späteren Umsetzung zurückgestellt. Bis dahin validiert das vollständige Formular lokal, zeigt klar an, dass nichts übertragen wurde, und hält den dokumentierten Transport-Contract austauschbar bereit. Ein echter Versand oder eine positive Eingangsbestätigung darf ohne konfigurierten Endpunkt nicht simuliert werden.

### 6.12 Footer und Rechtsseiten

- Vollständiger Firmenname, Anschrift, Telefon, E-Mail sowie Links zu Impressum und Datenschutz.
- Impressum enthält vor Go-live Rechtsform, Vertretung, Anschrift, HRB/Registergericht und USt-ID.
- Datenschutz beschreibt nur tatsächlich eingesetzte Technik, insbesondere Formular, Hosting, Consent-Speicherung und Google Maps.
- Solange die in `docs/IMPRESSUM.md` und `docs/TODO-DATENSCHUTZ.md` markierten Pflichtangaben offen sind, ist die Seite nicht auslieferbar.

## 7. Verbindliche Modelldaten

| Modell | Maße | Kapazität | Damen | Herren | Urinale | Netto ab/Tag |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| S | 5,67 × 2,50 × 3,00 m | bis 200 Personen | 2 | 1 | 2 | 175 € |
| M | 7,17 × 2,50 × 2,92 m | bis 400 Personen | 3 | 1 | 3 | 190 € |
| L | 8,77 × 2,50 × 2,92 m | bis 600 Personen | 4 | 2 | 6 | 210 € |

Gemeinsame Ausstattung und modellspezifische Unterschiede werden in einer zentralen, typisierten Datenquelle gepflegt. Dieselben Daten versorgen Modellgeschichte, Modellwechsler, Auswahlhilfe und Formularoptionen. Widersprüchliche Duplikate sind nicht zulässig.

## 8. Visuelle Umsetzungsregeln

- Grundfläche: warmes Porzellan/Off-White, nicht Reinweiß oder kaltes SaaS-Grau.
- Text: tiefes warmes Navy/Graphit.
- Akzent: Hygiene-Blau, kontrollierte Verläufe erlaubt; kleiner warmer Gegenakzent nur gezielt.
- Keine AI-Texturen, Nebel, dekorativen Flüssigkeitsformen, Glasflächen oder Hintergrundkulissen hinter den Wagen.
- Display-Schrift eigenständig und breit; Fließtext humanistisch und sehr gut lesbar; beide selbst gehostet. Exakte Auswahl erfolgt in Phase 5 anhand eines visuellen Vergleichs.
- Große Produktbühnen wechseln mit kompakten Datenzonen. Freie Wagenkonturen dürfen das Raster brechen; Daten und Formular bleiben streng ausgerichtet.
- Karten nur für echte Gruppierung oder Interaktion. Service, Ablauf und Bewertungen werden nicht als gleichförmige Card-Grids umgesetzt.
- Ein konsistentes Radius-System, wenig Schatten und keine Cards-in-Cards.
- Der genaue visuelle Build folgt ausschließlich dem Direction Contract, nicht der alten Produktionsseite oder dem Prototyp-Styling.

## 9. Asset-Anforderungen für die nächste Phase

Phase 5 erstellt den eigentlichen Asset-Plan. Die Spec setzt dafür folgende Rollen:

1. **Hero:** drei transparente Wagen-Freisteller; vorläufig derselbe S-Freisteller dreifach.
2. **Leitwagen:** transparenter S-Freisteller mit offen sichtbaren Türen und stabiler Perspektive.
3. **Finale Modelle:** maßhaltige, zueinander passende 2,5D-Assets für S/M/L; L mit zweiter Achse.
4. **Servicebeweise:** wenige echte Details zu Anschlüssen, Innenraum, Licht oder realer Aufstellung.
5. **Region/Ablauf:** nur reale Bilder, wenn sie eine konkrete Aussage belegen.
6. **Logo:** bestehende Symbole und Aussage unverändert; professionelle Reinzeichnung zulässig.
7. **OG-Bild:** eigenes, später abzunehmendes Social-Preview-Asset.

Alle bearbeiteten Rasterassets erhalten nachvollziehbare Herkunft, Eingabedatei und Bearbeitungsschritte. Generierte oder retuschierte Inhalte dürfen keine nicht vorhandene Ausstattung hinzufügen.

## 10. Responsive Verhalten

### Desktop

- Wagenfamilie und spätere rechte Leitwagenspur erhalten ausreichend Raum, ohne Claim oder CTA zu verdecken.
- Modellgeschichte nutzt asymmetrische Produkt-/Datenkomposition.
- Vergleich und Formular dürfen breit, aber nicht als Dashboard wirken.

### Tablet

- Familienkomposition bleibt als Gruppe lesbar; Überlagerungen dürfen keine Logos, Türen oder Labels abschneiden.
- Statische Modellstationen können alternieren, bleiben aber in logischer DOM-Reihenfolge.
- Keine Desktop-Pinning-Mechanik wird vorausgesetzt.

### Mobile

- Eigene mobile Komposition statt verkleinertem Desktop.
- Wagenfamilie darf gestaffelt oder in einer kontrollierten kurzen Sequenz erscheinen, muss aber alle drei Modelle vermitteln.
- Modellgeschichte steht statisch untereinander. Eine lange gepinnte Scrollspur ist nicht Pflicht und darf nicht ohne spätere Prüfung eingeführt werden.
- Modellwechsler ist ohne horizontale Präzisionsgeste bedienbar.
- Formularfelder, CTAs und Consent haben mindestens 44 px große Ziele.
- Sticky Elemente verdecken weder Inhalte noch Fehlermeldungen.

## 11. Accessibility

- Ziel WCAG 2.2 AA für Kontrast, Fokus, Tastatur und Formulare.
- Eine H1; danach semantische, logisch verschachtelte Überschriften.
- Wagenbilder erhalten informative Alternativtexte; dekorative Wiederholungen werden korrekt ausgeblendet.
- Modell- und Preiswahl verwenden native oder ARIA-konforme Gruppen mit verständlichem Namen und Zustand.
- Kein Inhalt nur über Farbe, Position, Hover oder Animation.
- Formularfehler werden mit Feldern verknüpft und bei Absenden zusammengefasst.
- Consent ablehnen ist ebenso leicht wie zustimmen; erneute Entscheidung erreichbar.
- `prefers-reduced-motion: reduce` liefert die vollständige statische Geschichte ohne Scrubbing, Pinning oder lange Übergänge.

## 12. Performance und technische Lieferung

- Next.js 16 App Router als statischer Export; keine SSR- oder Next-API-Abhängigkeit.
- `next/image` nur in einer mit Export kompatiblen, unoptimierten Konfiguration oder äquivalente responsive Bildausgabe.
- Hero-Asset priorisiert, feste Dimensionen/Seitenverhältnisse gegen Layout Shift.
- Zielwerte: LCP unter 2,5 s und CLS unter 0,1 auf einem realistischen Mobilprofil.
- Interaktive Client-Komponenten bleiben kleine Leaves: Navigation, Modell-/Preiswahl, Auswahlhilfe, Formular und Consent.
- Produkt- und Modelldaten sind statisch verfügbar und indexierbar; Client-JavaScript ist nicht nötig, um Kerninformationen zu lesen.
- Keine rohen Scroll-Listener oder kontinuierlichen Scrollwerte im React-State.
- Mechanik/Bibliothek der Phase-8-Choreografie wird erst nach statischer Visual-QA festgelegt.
- PHP-Mailer validiert und sanitisiert serverseitig erneut, setzt sichere Header, begrenzt Missbrauch und gibt keine Interna aus.

## 13. SEO und rechtliche Auffindbarkeit

- Deutscher Titel und Description für „Toilettenwagen mieten“ plus glaubwürdigen regionalen Bezug.
- Indexierbare Modellnamen, Kapazitäten, Einsatzgebiet und Kontaktangaben.
- Canonical, Favicons und OG-Metadaten vor Go-live.
- Strukturierte Daten für das lokale Unternehmen nur mit bestätigten Fakten.
- Alle internen Anker und Rechtslinks funktionieren im statischen Export.
- Keine Tracking- oder Marketingdienste ohne eigene Entscheidung und passende Datenschutzerweiterung.

## 14. Teststrategie — höchster nützlicher Seam

Das vorhandene Vitest-/Testing-Library-Setup bleibt bestehen. Tests prüfen sichtbares Nutzerverhalten, nicht CSS-Klassen oder interne States.

### Komponenten-/Integrationsverhalten

- **Modellwechsler:** korrekte Defaultauswahl, vollständiger Datenwechsel S/M/L, Tastaturbedienung, Formular-Vorauswahl.
- **Preiswahl:** Privat/brutto als Default, korrekte Werte und Labels, Wechsel auf Gewerbe/netto, Kostenhinweise bleiben sichtbar.
- **Auswahlhilfe:** Grenzwerte 200/201/400/401/600, ungültige Eingabe, >600, unverbindlicher Hinweis und Formular-Vorauswahl.
- **Anfrageformular:** Pflichtlogik, mindestens ein Kontaktweg, E-Mail-Format, Datumsreihenfolge, Datenschutz, Honeypot, Doppelversand, Erfolg, Backendfehler und Erhalt der Eingaben.
- **Map-Consent:** vor Zustimmung kein Google-iframe; Zustimmung lädt; Ablehnung lädt nicht; Änderung der Entscheidung; Ladefehler-Fallback.
- **Navigation:** Anker und mobiles Menü sind per Tastatur bedienbar; externe und rechtliche Ziele sind korrekt beschriftet.

### Statische/vertragliche Checks

- Ein route-naher Renderingtest bestätigt zentrale Überschriften, S/M/L-Daten, Kontakt und Rechtslinks ohne Interaktion.
- Eine Datenprüfung stellt sicher, dass alle Verbraucherpreise exakt aus den Nettoquellen und 19 % MwSt. entstehen.
- Build und Typecheck bestätigen die statische Exportfähigkeit.

### Bewusst außerhalb automatischer DOM-Tests

- Komposition, Typografie, Farbe, Bildqualität, Rhythmus und Nicht-Generik: Browser-Review in Phase 7 mit Desktop und Mobile.
- Tatsächlicher Mailversand: bis zur späteren Mailer-Aktivierung zurückgestellt; dann Staging-Test des PHP-Endpunkts mit kontrollierter Testanfrage sowie Fehlerfall.
- Scrollchoreografie: erst Phase 8; danach Browserprüfung inklusive Reduced Motion und Mobilprofil.
- Google-Netzwerkverhalten wird zusätzlich im Browser-Netzwerkprotokoll vor und nach Consent verifiziert.

## 15. Abnahmekriterien für die statische Website

Phase 6/7 ist erst erfüllt, wenn:

- die komplette One-Page-Erzählung vorhanden ist, nicht nur Hero und Wagenvergleich,
- der First Viewport Wagenfamilie, Angebot, Region und WhatsApp beweist,
- alle Modelldaten korrekt und auch ohne JavaScript/Animation verständlich sind,
- Privat-/Gewerbepreise und Kostenlogik korrekt funktionieren,
- Auswahlhilfe und Formular sinnvoll zusammenspielen,
- Service, Voraussetzungen, Ablauf, Einsatzgebiet und echte Bewertungen vollständig sind,
- Maps vor Consent technisch nicht geladen wird,
- alle Formularzustände einschließlich des ehrlichen Nicht-konfiguriert-Zustands funktionieren; PHP- und Staging-Prüfung folgen erst mit der späteren Mailer-Aktivierung,
- Desktop, Tablet und Mobile als eigene Kompositionen funktionieren,
- Tastatur, Focus, Kontrast und Reduced Motion geprüft sind,
- keine generische Kartenlandschaft oder austauschbare Dienstleister-Topologie entstanden ist,
- Produktionsbuild, Typecheck und relevante Tests erfolgreich sind.

Erst danach beginnt Phase 8 mit der finalen Leitwagenanimation.

## 16. Out of Scope

- Online-Buchung, Reservierung, Zahlung oder Live-Verfügbarkeit.
- CMS, Benutzerkonto, Mehrsprachigkeit und Dark Mode.
- Automatische Entfernungspreise oder verbindliche Angebotsberechnung.
- Erfundenes Verfügbarkeits-, Kapazitäts- oder Eignungswissen jenseits der bestätigten Modelldaten.
- Partnerlogos, Zertifikate oder nicht bestätigte Leistungszahlen.
- Ein eigenständiger umfangreicher „Über uns“-Block, solange keine freigegebene Firmengeschichte vorliegt.
- Finale Scrollmotion vor bestandener statischer Visual-QA.
- Vollständige Erzeugung neuer M-/L-Fahrzeugdetails ohne maßhaltige Referenzgrundlage.

## 17. Offene Entscheidungen, die kein Implementierer selbst treffen darf

- Finale Display- und Textschrift nach visuellem Vergleich in Phase 5.
- Finale S/M/L-2,5D-Assets und deren maßhaltige Freigabe.
- Exakte Motion-Technik, Scrolllänge, Easing und Breakpoints erst in Phase 8.
- Fehlende Pflichtangaben im Impressum und finaler Datenschutztext vor Go-live.
- Finales `og:image`.

Die Stärke der v1-Auswahlhilfe ist in dieser Spec auf eine kompakte, unverbindliche Personenanzahl-Empfehlung begrenzt. Eine größere Beratung oder weitere Fragen wären eine neue Scope-Entscheidung.

## 18. Nächster Gate

Diese Spec wurde am 2026-09-05 vom User bestätigt. Phase 5 folgt:

1. Asset-Ledger und Freisteller-/Foto-Plan festlegen.
2. Bestehende alte Tickets verwerfen oder neu schneiden.
3. Neue vertikale Tickets zur Bestätigung vorlegen.
4. Erst nach Ticketfreigabe die Produktionsroute umsetzen.

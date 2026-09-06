# Workflow-Status

Dieser Block wird an jeder Phasengrenze aktualisiert (siehe `WEB_WORKFLOW.md`).
Eine neue Session steigt bei der genannten Phase wieder ein – nicht neu starten, nicht überspringen.

## Workflow state

- Surface: `/` (vollständige Startseite, Marketing) + `/impressum` + `/datenschutz`
- Mode: `Persuade` (Ziel: qualifizierte Miet-Anfrage)
- Phase: `8. Motion and hardening`
- Redesign mode: `greenfield`
- Confirmed direction: **„Die Modellfamilie als roter Faden“** bleibt bestätigt. Der User hat die zwischenzeitlich geprüften Alternativen am 2026-09-06 verworfen und sich ausdrücklich für die bestehende Originalrichtung entschieden.
- Current primary source: `.scratch/startseite/issues/11-leitwagen-motion-reduced-motion.md`, Status `ready-for-user-review`, auf Basis von `docs/design/direction-contract-home.md` und der statisch freigegebenen Produktionsroute `/`.
- Next permitted action: User prüft im Live-Browser den kurzen S→M→L-Morph, die kompakteren Snap-Abstände und den natürlichen L-Ausstieg. Nach Bestätigung wird Ticket 11 abgeschlossen; danach folgt Ticket 12 mit finalem Review und Auslieferung.
- Open decision or blocker: Die korrigierte Motion benötigt erneut die Bewegungsfreigabe des Users. Go-live bleibt zusätzlich blockiert, bis Registergericht und eine gegebenenfalls erforderliche MStV-Verantwortung bestätigt, die Rechtstexte final geprüft und Hetzner-AVV/Logkonfiguration geklärt sind. Der produktive PHP-Mailer wurde vom User ausdrücklich auf später verschoben und bleibt vor echtem Formularversand ein eigener Go-live-Blocker.
- Last visual evidence: Der 1280 × 720 Browserreview vom 2026-09-06 misst die kompakten Snap-Ziele bei S 1108, M 1528 und L 1948 px, also gleichmäßig 420 px auseinander. Ein Gestus bleibt weiterhin auf genau eine Station begrenzt. In beiden Übergangsmitten sind die echten Ausgangs- und Zielassets über komplementäre Masken mit weicher 28-%-Schnittzone und maximal 0,8 px Blur aktiv; es gibt keinen harten Bildsprung und keine Vollflächen-Kreuzblende. L parkt nach dem Einrasten 260 px bis zum Sticky-Ende bei 2209 px, läuft danach exakt im Dokumenttempo nach oben und bleibt bei 2668 px noch angeschnitten sichtbar; die Ebene wird erst nach einer weiteren Viewportlänge deaktiviert. Mobile und Reduced Motion bleiben statisch. Lint, Typecheck über den Next-Build, alle 50 Tests, statischer Export und `git diff --check` sind grün. Der frühere einmalige Impeccable-Detector wurde regelkonform nicht wiederholt.

> Phase 0 (Prepare) erledigt: Matt-Pocock-Engineering-Skills installiert (`.agents/skills/`, Symlinks in `.claude/skills/`), Tracker = lokal Markdown (`.scratch/`), Standard-Triage-Labels, single-context. Config in `docs/agents/`.
> **Update (Session 2026-09-05):** Impeccable und Taste-Skills sind installiert. Higgsfield weiterhin nicht installiert; Asset-Generierung bleibt eine spätere Produktionsentscheidung.
> Phase 2 (Research) erledigt: Referenz-Ledger in `docs/RESEARCH.md` aus lokaler Bibliothek `website-bib` (6 Referenzen, Kategorie-Defaults-zu-vermeiden, 2 tragfähige Richtungen A/B).
> **Phase 3 (Direction) zuerst abgeschlossen und am 2026-09-05 bewusst erneut geöffnet:** Der frühe „Vertrauens-Katalog“ war zu nah an einer üblichen Dienstleister-Landingpage und berücksichtigte die Design-Ideen des Users nicht ausreichend.
> **Phase 3 am 2026-09-05 erneut abgeschlossen:** Design-Interview plus A1–A4-Prototypen führten zur neuen verbindlichen Richtung „Modellfamilie als roter Faden“. Voller Contract: `docs/design/direction-contract-home.md`; Surface-Brief synchron in `.impeccable/surfaces/src-app-page-tsx.md`.
> **Phase 3 am 2026-09-06 kurz erneut geöffnet und wieder geschlossen:** Die geprüften Alternativen wurden verworfen. Der User bestätigt die bestehende Originalrichtung „Modellfamilie als roter Faden“. Die Testlabore und Richtungs-Branches wurden entfernt; Ticket 10 gilt als statisch freigegeben und Phase 8 setzt mit Ticket 11 fort.
> **Phase 4 am 2026-09-05 abgeschlossen:** Vollständige Startseiten-Spec mit Seitenakten, S/M/L- und Preisverträgen, kompakter Auswahlhilfe, Kontakt-/Consent-Zuständen, Responsive-/A11y-/Performance-Regeln und externem Verhaltenstest-Seam vom User bestätigt. Quelle: `.scratch/startseite/spec.md`.
> **Phase 5 am 2026-09-05 abgeschlossen:** Asset-Plan und vertikale Tickets 02 bis 12 vom User bestätigt und veröffentlicht. Frontier ist ausschließlich Ticket 02; Motion bleibt durch Ticket 10 blockiert.
> **Ticket 02 am 2026-09-05 abgeschlossen:** finaler First Viewport mit Bricolage/Hanken, schwarzem transparentem Firmenlogo, grünem WhatsApp-Kanal und responsiver Wagenfamilie. Frontier ist nun ausschließlich Ticket 03.
> **Ticket 03 am 2026-09-05 abgeschlossen:** statische S/M/L-Modellreise mit realen Kerndaten, nativen Detail-Ebenen und einer gemeinsamen rechten Wagenachse. Frontier ist nun ausschließlich Ticket 04.
> **Ticket 04 am 2026-09-05 abgeschlossen:** zusammenhängender S/M/L-Modellwechsler, Privat-brutto/Gewerbe-netto-Ansicht, dauerhaft sichtbare Kostenhinweise und kompakte Auswahlhilfe mit session-lokalem Übergabe-Seam. Frontier ist nun ausschließlich Ticket 05.
> **Ticket 05 am 2026-09-05 abgeschlossen:** sichtbarer Serviceübergang mit einmaliger Nachtzäsur, echten Waschplatz-, Kabinen-, Urinal- und S-Sonderbeweisen, fairer Miettag-/Lieferkostenlogik sowie gemeinsamer Planung aller Voraussetzungen. Frontier ist nun ausschließlich Ticket 06.
> **Ticket 06 am 2026-09-05 abgeschlossen:** redaktionelle Zeitstrecke von Anfrage bis Schlussrechnung mit ehrlicher Angebotsreaktion, fallweiser Anzahlung, Lieferung/Abholung rund um den Anlass sowie klarer Vorlauforientierung. Frontier ist nun ausschließlich Ticket 07.
> **Ticket 07 am 2026-09-05 abgeschlossen:** eigenständiger Regionsraum ab Niederdreisbach mit sichtbarem 125-km-Hinweis, consent-geschützter Google-Karte, vollständigem Ohne-Karte-Fallback und fünf echten, statisch gewichteten Google-Stimmen. Frontier ist nun ausschließlich Ticket 08.
> **Ticket 08 am 2026-09-05 abgeschlossen:** vollständiger Anfrageabschluss mit primärem WhatsApp, direkten Kontaktdaten, responsivem Formular, Vorauswahl, Validierung und allen vorbereiteten Transportzuständen. Auf User-Wunsch bleibt der echte PHP-Mailer vorerst deaktiviert; der dokumentierte JSON-Seam täuscht ohne Konfiguration keinen Versand vor. Frontier ist nun ausschließlich Ticket 09.
> **Ticket 09 am 2026-09-05 abgeschlossen:** statische Rechtsseiten, konsistente bestätigte Stammdaten, technikgenauer Datenschutz ohne Tracking-Fiktion, änderbare Maps-Einwilligung, Canonicals, strukturierte Unternehmensdaten und Social Previews aus dem realen S-Wagen sind umgesetzt. Fehlende Pflichtangaben bleiben ausschließlich in `docs/GO_LIVE_CHECKLIST.md` als Blocker sichtbar. Frontier ist nun ausschließlich Ticket 10; Phase 7 beginnt.
> **Grilling (`grill-with-docs`) am 2026-09-05 nachgeholt:** gesicherte Produkt- und Funktionsentscheidungen: One-Pager + Sticky-Anker-Nav + Rechtsseiten; Privat-brutto/Gewerbe-netto; WhatsApp + Anfrageformular; Maps mit Consent; echte Fotos/2,5D-Freisteller; reale Kundenstimmen; Hetzner Webhosting L mit statischem Next-Export und PHP-Mailer. Domain-Unterlagen: `CONTEXT.md`, ADR-0001..0004, `docs/IMPRESSUM.md`, `docs/TODO-DATENSCHUTZ.md`.

## Bestätigte Basics

- **Geschäft:** Vermietung von Toilettenwagen durch Mobile Sanitäranlagen Herrmann und Smécz UG (haftungsbeschränkt).
- **Zielgruppe:** Privatkunden, Event-Veranstalter, Bau/Gewerbe und Kommunen/Behörden.
- **Primäre Conversion:** WhatsApp-Anfrage; **sekundär:** Anfrageformular.
- **Technik:** Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + TypeScript; statischer Export + PHP-Mailer.

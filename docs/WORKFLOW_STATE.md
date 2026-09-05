# Workflow-Status

Dieser Block wird an jeder Phasengrenze aktualisiert (siehe `WEB_WORKFLOW.md`).
Eine neue Session steigt bei der genannten Phase wieder ein – nicht neu starten, nicht überspringen.

## Workflow state

- Surface: `/` (Startseite, Marketing)
- Mode: `Persuade` (Ziel: Miet-Anfrage)
- Phase: `6. Implement` (Tickets veröffentlicht, Frontier = Ticket 01)
- Redesign mode: `greenfield`
- Confirmed direction: **Kandidat A – „Vertrauens-Katalog" (produktgeführt).** Direction Contract in `docs/design/direction-contract-home.md` (+ Impeccable-Kurzfassung `.impeccable/surfaces/src-app-page-tsx.md`).
- Current primary source: `.scratch/startseite/spec.md` (Status: ready-for-agent) + `docs/design/direction-contract-home.md`
- Next permitted action: Phase 6 – `/implement` (user-invocable) für **Ticket 01** (Fundament & App-Shell, einziger unblockierter Frontier-Ticket). Danach parallelisierbar: 02–08 (alle nur von 01 geblockt), dann 09, dann 10. Test-Seam: **Vitest + Testing Library**.
- Open decision or blocker: keiner blockierend. Bewusst später: Datenschutztext (`docs/TODO-DATENSCHUTZ.md`), „Über uns"/Gründer-Block, exakte Wortmarke, finaler Font, Registergericht/MStV-Verantwortlicher im Impressum (⚠️ in `docs/IMPRESSUM.md`).
- Last visual evidence: `keine`

> Phase 0 (Prepare) erledigt: Matt-Pocock-Engineering-Skills installiert (`.agents/skills/`, Symlinks in `.claude/skills/`), Tracker = lokal Markdown (`.scratch/`), Standard-Triage-Labels, single-context. Config in `docs/agents/`.
> **Update (Session 2026-09-05):** Impeccable UND Taste-Skill sind jetzt installiert – `impeccable` (via `npx impeccable install`) und das taste-skill-Paket `Leonxlnx/taste-skill` (u.a. `design-taste-frontend`, `redesign-existing-projects`, `high-end-visual-design`) in `.agents/skills/` mit Symlinks in Claude Code. Higgsfield weiterhin nicht installiert (Asset-Generierung erst in Phase 5 relevant). Skills wurden bisher noch NICHT im Design-Prozess verwendet – Einsatz beginnt jetzt in Phase 3.
> Phase 2 (Research) erledigt: Referenz-Ledger in `docs/RESEARCH.md` aus lokaler Bibliothek `website-bib` (6 Referenzen, Kategorie-Defaults-zu-vermeiden, 2 tragfähige Richtungen A/B).
> **Phase 3 (Direction) am 2026-09-05 abgeschlossen:** Taste-Skill `design-taste-frontend` → Design Read + Dials (VARIANCE 5 / MOTION 3 / DENSITY 4); 3 Kandidaten vorgelegt, User wählte **A „Vertrauens-Katalog"**. Impeccable: `PRODUCT.md` (init-Äquivalent aus vorhandener Wahrheit) + Direction Contract als Surface-Brief (`.impeccable/surfaces/src-app-page-tsx.md`) + `.impeccable/config.json` buildPath=code. Kein concept-seed-Roll (user-gepinnte Richtung schlägt Roll). Voller Direction Contract: `docs/design/direction-contract-home.md`.
> **Grilling (`grill-with-docs`) am 2026-09-05 nachgeholt:** harte Interview-Runden (Q1–Q16) → gesicherte Entscheidungen: One-Pager + Sticky-Anker-Nav + `/impressum` & `/datenschutz`; Preis-Toggle Privat(brutto)/Firma(netto); WhatsApp-CTA + Anfrageformular; Google Maps + Cookie-Consent; echte Fotos vorerst (Hero = freigestellter S-Wagen), Higgsfield später; Kundenstimmen „Vorname + Initiale"; Hosting Hetzner Webhosting L (vorhanden) → statischer Next-Export + PHP-Mailer + SSH-Deploy. Domain-Modeling-Output: `CONTEXT.md` (Glossar) + ADR-0001..0004 in `docs/adr/`. Impressum-Entwurf in `docs/IMPRESSUM.md`, Datenschutz-TODO in `docs/TODO-DATENSCHUTZ.md`.

## Bestätigte Basics (aus Discovery-Gespräch)

- **Geschäft:** Vermietung von Toilettenwagen (Toilettenwagen-hs). Primäres Ziel der Seite: Miet-**Anfrage** auslösen.
- **Zielgruppe:** Privatkunden, Event-Veranstalter, Bau/Gewerbe, Kommunen/Behörden.
- **Technik:** Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + TypeScript.

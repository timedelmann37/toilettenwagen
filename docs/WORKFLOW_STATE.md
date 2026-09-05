# Workflow-Status

Dieser Block wird an jeder Phasengrenze aktualisiert (siehe `WEB_WORKFLOW.md`).
Eine neue Session steigt bei der genannten Phase wieder ein – nicht neu starten, nicht überspringen.

## Workflow state

- Surface: `/` (Startseite, Marketing)
- Mode: `Persuade` (Ziel: Miet-Anfrage)
- Phase: `1. Discover`
- Redesign mode: `greenfield`
- Confirmed direction: `pending`
- Current primary source: `docs/DISCOVERY.md`
- Next permitted action: Produktwahrheit vervollständigen (Kontaktdaten, Einzugsgebiet, Wagenmodelle, Alleinstellung), dann Phase 2 Research.
- Open decision or blocker: Reale Inhalte fehlen (Fotos, Preise, Kontakt, Standort).
- Last visual evidence: `keine`

> Phase 0 (Prepare) erledigt: Matt-Pocock-Engineering-Skills installiert (`.agents/skills/`, Symlinks in `.claude/skills/`), Tracker = lokal Markdown (`.scratch/`), Standard-Triage-Labels, single-context. Config in `docs/agents/`. Hinweis: Impeccable/Taste/Higgsfield aus WEB_WORKFLOW.md sind NICHT installiert.

## Bestätigte Basics (aus Discovery-Gespräch)

- **Geschäft:** Vermietung von Toilettenwagen (Toilettenwagen-hs). Primäres Ziel der Seite: Miet-**Anfrage** auslösen.
- **Zielgruppe:** Privatkunden, Event-Veranstalter, Bau/Gewerbe, Kommunen/Behörden.
- **Technik:** Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + TypeScript.

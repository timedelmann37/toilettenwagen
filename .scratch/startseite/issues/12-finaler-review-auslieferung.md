# 12: Finaler Review und Auslieferungsstand

**What to build:** Die gesamte Arbeit wird gegen Spec, Repository-Standards und den bestätigten Direction Contract geprüft. Der statische Export ist technisch auslieferbar; verbleibende externe Pflichtangaben werden eindeutig benannt.

**Blocked by:** 11

**Status:** ready-for-agent

## Verbindliche Quellen

- `.scratch/startseite/spec.md`
- `docs/design/direction-contract-home.md`
- `docs/design/asset-plan-home.md`
- `docs/WORKFLOW_STATE.md`
- alle Tickets 01 bis 11 und ihre Review-Evidenz

## Lieferumfang

- Abschließender Standards- und Spec-Review mit behobenen materiellen Befunden.
- Vollständiger Test-, Build-, Export-, Link- und Assetcheck.
- Aktualisierte Projektdokumentation und eindeutiger Status für Auslieferung oder externe Blocker.

## Akzeptanzkriterien

- [ ] Jeder Abnahmepunkt aus Abschnitt 15 der Spec besitzt prüfbare Evidenz.
- [ ] Code-Review meldet keine offenen P1/P2-Defekte; kleinere bewusste Abweichungen sind dokumentiert und begründet.
- [ ] Typecheck, Lint, vollständige Tests und `next build` laufen aus sauberem Projektzustand erfolgreich.
- [ ] `out/` enthält Startseite, Rechtsseiten, Assets und funktionierende interne Pfade für statisches Hosting.
- [ ] Keine Secrets, lokalen absoluten Laufzeitpfade, Debugausgaben oder verworfenen Konzeptassets gelangen in die Auslieferung.
- [ ] PHP-Stagingversand, Fehlerfall und Google-Consent-Netzwerkverhalten sind dokumentiert geprüft.
- [ ] Finale Desktop- und Mobile-Browserbelege zeigen Hero, Modellreise, Vergleich, Service, Ablauf, Region, Anfrage, Footer und Reduced Motion.
- [ ] `docs/WORKFLOW_STATE.md` nennt Phase 9, tatsächlichen Reviewstatus, letzte visuelle Evidenz und genau den nächsten zulässigen Schritt.
- [ ] `DESIGN.md` und seine Impeccable-Sidecar-Dokumentation werden erst aus dem tatsächlich ausgelieferten Artefakt abgeleitet und stimmen mit diesem überein.
- [ ] Fehlende Impressums-/Datenschutzangaben oder Hostingzugänge sind entweder geschlossen oder als externe Go-live-Blocker mit Eigentümer benannt.

## Prüfung

- [ ] Finaler Spec-Review und Standards-Review wurden separat durchgeführt.
- [ ] Produktionsbuild und Export wurden lokal geöffnet und auf Kernpfade geprüft.
- [ ] Link-, Asset- und Metadatencheck ist grün.
- [ ] User erhält eine kurze Übergabe mit Ergebnis, Restblockern und relevanten Dateien.

## Nicht in diesem Ticket

- Kein neues Designkonzept und keine neue Produktfunktion.
- Kein Deployment ohne ausdrücklichen Auftrag und vorhandene Zugangsdaten.

## Comments

- 2026-09-05: Abschlussslice des am selben Tag bestätigten Ticketplans.

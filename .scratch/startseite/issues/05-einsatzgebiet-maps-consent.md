# 05: Einsatzgebiet + Google-Maps-Consent

**What to build:** Das Einsatzgebiet auf einer Karte zeigen, datenschutzkonform hinter einer Einwilligung.

**Blocked by:** 01

**Status:** ready-for-agent

- [ ] Sektion Einsatzgebiet: Region + 125-km-Radius, gelistete Orte (Daaden, Herdorf, Neunkirchen, Niederfischbach, Dillenburg, Haiger, Westerwald), Anfahrt 1,10 €/km, „weiter auf Anfrage".
- [ ] Cookie-Consent-Banner; Google-Maps-Embed lädt **erst nach aktiver Einwilligung** (ADR-0003) – vorher Klick-zum-Laden-Platzhalter, keine Google-Requests.
- [ ] Einwilligung wird gespeichert (z. B. localStorage), Widerruf möglich.
- [ ] **Tests (Vitest+RTL):** vor Einwilligung kein Google-iframe/-Request im DOM; nach Klick wird die Karte geladen.
- [ ] Datenschutz-TODO um tatsächlich verbaute Consent-Details ergänzt (`docs/TODO-DATENSCHUTZ.md`).

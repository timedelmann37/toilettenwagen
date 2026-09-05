# 03: Wagen S/M/L + Preis-Toggle

**What to build:** Die drei Modelle vergleichbar darstellen und die Preise rechtssicher zwischen Privat (brutto) und Firma (netto) umschalten.

**Blocked by:** 01

**Status:** ready-for-agent

- [ ] Datengetriebene Darstellung der drei Modelle (Name, Kabinen, Urinale, Ausstattung, Ab-Preis) aus einer zentralen Datenquelle; Terminologie nach `CONTEXT.md`.
- [ ] Preis-Toggle Privat|Firma, Default **Privat/brutto** (ADR-0004); brutto = netto × 1,19 kaufmännisch gerundet.
- [ ] Hinweiszeile „inkl. MwSt. · zzgl. Anfahrt 1,10 €/km · Liefer-/Abholtag kostenfrei" (bzw. Netto-Variante bei Firma).
- [ ] Deutlich gemacht, dass Preise Richtwerte sind und ein individuelles Angebot folgt.
- [ ] Toggle per Tastatur bedienbar, mit klarer aktiver Anzeige.
- [ ] **Tests (Vitest+RTL):** Default zeigt Brutto; Umschalten auf Firma zeigt Netto; Hinweiszeile vorhanden; Tastaturbedienung.

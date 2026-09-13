"use client";

import { useEffect, useRef, useState } from "react";
import { AddressSearchError, searchAddress, type AddressSuggestion } from "@/lib/addressSearch";
import styles from "./AddressLookup.module.css";

type Props = { id: string; label: string; onChoose: (address: string) => void };

/** Optional assistant; the ordinary address input remains editable and authoritative. */
export function AddressLookup({ id, label, onChoose }: Props) {
  const [enabled, setEnabled] = useState(false);
  const [postcode, setPostcode] = useState("");
  const [street, setStreet] = useState("");
  const [house, setHouse] = useState("");
  const [selected, setSelected] = useState<AddressSuggestion | null>(null);
  const [results, setResults] = useState<AddressSuggestion[]>([]);
  const [status, setStatus] = useState("");
  const [active, setActive] = useState(-1);
  const [dismissed, setDismissed] = useState(false);
  const houseRef = useRef<HTMLInputElement>(null);
  const revision = useRef(0);

  useEffect(() => {
    const version = ++revision.current;
    if (!enabled || !/^\d{5}$/.test(postcode) || selected || dismissed || (street.length > 0 && street.trim().length < 2)) return;
    const controller = new AbortController();
    let cancelled = false;
    const timer = setTimeout(async () => {
      setStatus("Vorschläge werden gesucht …");
      const timeout = setTimeout(() => controller.abort(), 8000);
      try {
        const matches = await searchAddress(postcode, street, controller.signal);
        if (cancelled || version !== revision.current) return;
        setResults(matches);
        setStatus(matches.length ? `${matches.length} Vorschläge verfügbar.` : "Kein Treffer. Bitte ergänzen Sie die Adresse manuell im Adressfeld.");
      } catch (error) {
        if (!cancelled && version === revision.current) {
          const reason = error instanceof AddressSearchError
            ? error.status === 401 || error.status === 403
              ? "Der Adressdienst verweigert den Zugriff. Die Website-Konfiguration muss geprüft werden."
              : error.status === 429
                ? "Der Adressdienst hat sein Anfragelimit erreicht. Bitte versuchen Sie es später erneut."
                : "Der Adressdienst meldet einen Fehler. Bitte versuchen Sie es später erneut."
            : controller.signal.aborted
              ? "Die Adresssuche hat zu lange gedauert. Bitte versuchen Sie es erneut."
              : "Keine Verbindung zum Adressdienst. Bitte prüfen Sie Ihre Verbindung oder mögliche Browser-Blocker.";
          setStatus(`${reason} Manuelle Eingabe bleibt möglich.`);
        }
      } finally { clearTimeout(timeout); }
    }, 650);
    return () => { cancelled = true; clearTimeout(timer); controller.abort(); };
  }, [enabled, postcode, street, selected, dismissed]);

  if (!process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY) return null;

  function resetResults() {
    ++revision.current;
    setResults([]); setSelected(null); setStatus(""); setActive(-1); setDismissed(false);
  }

  function choose(result: AddressSuggestion) {
    ++revision.current;
    setResults([]); setActive(-1);
    if (!result.street) {
      setStreet(""); setStatus(`${result.postcode} ${result.city}: Bitte mindestens zwei Buchstaben der Straße eingeben.`);
      setDismissed(true);
    } else {
      setSelected(result); setStreet(result.street); setStatus("Bitte Hausnummer ergänzen und Adresse eintragen.");
      houseRef.current?.focus();
    }
  }

  return (
    <div className={styles.lookup} role="group" aria-label={`Adresshilfe für ${label}`}>
      {!enabled ? (
        <>
          <p>Optional: PLZ und Straße online suchen. Nach Aktivierung werden Ihre Suchangaben, IP-Adresse und technische Browserdaten an Geoapify übertragen. Namen und Kontaktdaten senden wir nicht. <a href="/datenschutz/#adresssuche">Datenschutz zur Adresssuche</a></p>
          <button type="button" onClick={() => setEnabled(true)}>Adresssuche aktivieren</button>
        </>
      ) : (
        <>
          <div className={styles.fields}>
            <label htmlFor={`${id}-postcode`}>PLZ
              <input id={`${id}-postcode`} value={postcode} inputMode="numeric" maxLength={5} autoComplete="off"
                onChange={event => { resetResults(); setPostcode(event.target.value.replace(/\D/g, "")); setStreet(""); setHouse(""); }}
                aria-describedby={`${id}-status`} />
            </label>
            <label htmlFor={`${id}-street`}>Straße suchen
              <input id={`${id}-street`} value={street} autoComplete="off" disabled={postcode.length !== 5}
                placeholder="Mindestens 2 Buchstaben"
                role="combobox" aria-autocomplete="list" aria-expanded={results.length > 0}
                aria-controls={`${id}-results`} aria-activedescendant={active >= 0 && results[active] ? `${id}-option-${active}` : undefined}
                onChange={event => { resetResults(); setStreet(event.target.value); }}
                onKeyDown={event => {
                  if (event.key === "Escape") { ++revision.current; setResults([]); setActive(-1); setDismissed(true); setStatus(""); }
                  if (event.key === "ArrowDown" && results.length) { event.preventDefault(); setActive(index => (index + 1) % results.length); }
                  if (event.key === "ArrowUp" && results.length) { event.preventDefault(); setActive(index => (index <= 0 ? results.length : index) - 1); }
                  if (event.key === "Enter") { event.preventDefault(); if (results[active]) choose(results[active]); }
                }} />
            </label>
          </div>
          <ul id={`${id}-results`} role="listbox" aria-label="Adressvorschläge" className={styles.results}>
            {results.map((result, index) => <li key={`${result.city}-${result.street}`} id={`${id}-option-${index}`}
              role="option" aria-selected={active === index} tabIndex={0}
              onClick={() => choose(result)} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); choose(result); } }}>
              {result.street && <strong>{result.street}</strong>} {result.postcode} {result.city}
            </li>)}
          </ul>
          <p id={`${id}-status`} role="status" aria-live="polite">{status || "Geben Sie zuerst die fünfstellige PLZ ein."}</p>
          <div className={styles.fields}>
            <label htmlFor={`${id}-house`}>Hausnummer
              <input ref={houseRef} id={`${id}-house`} value={house} autoComplete="off" onChange={event => setHouse(event.target.value)} />
            </label>
            <button type="button" disabled={!selected || !house.trim()} onClick={() => {
              if (!selected) return;
              onChoose(`${selected.street} ${house.trim()}, ${selected.postcode} ${selected.city}`);
              setStatus("Adresse eingetragen. Bitte prüfen Sie das Adressfeld und ergänzen Sie bei Bedarf den Empfänger.");
            }}>Adresse eintragen</button>
          </div>
          <div className={styles.footer}>
            <a href="https://www.geoapify.com/" target="_blank" rel="noopener noreferrer">Powered by Geoapify</a>
            <button type="button" onClick={() => { resetResults(); setEnabled(false); setPostcode(""); setStreet(""); setHouse(""); }}>Suche deaktivieren</button>
          </div>
          <p>Vorschläge sind keine verbindliche Adressprüfung. Manuelle Eingabe bleibt jederzeit möglich.</p>
        </>
      )}
    </div>
  );
}

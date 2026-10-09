"use client";

import { useEffect, useRef, useState } from "react";
import { searchAddressText } from "@/lib/addressSearch";
import styles from "./AddressLookup.module.css";

type Props = { id: string; name?: string; label: string; value: string; onChoose: (address: string) => void; error?: string; autoComplete?: string };

export function AddressLookup({ id, name, label, value, onChoose, error, autoComplete }: Props) {
  const [enabled, setEnabled] = useState(false);
  const [focused, setFocused] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [status, setStatus] = useState("");
  const [active, setActive] = useState(-1);
  const [dismissed, setDismissed] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const revision = useRef(0);
  const configured = Boolean(process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY?.trim());

  useEffect(() => {
    const version = ++revision.current;
    if (!enabled || !focused || dismissed || value.trim().length < 5) return;
    const controller = new AbortController();
    let cancelled = false;
    const timer = setTimeout(async () => {
      setStatus("Adressvorschläge werden gesucht …");
      const timeout = setTimeout(() => controller.abort(), 8000);
      try {
        const matches = await searchAddressText(value, controller.signal);
        if (cancelled || version !== revision.current) return;
        setResults(matches);
        setStatus(matches.length ? "Vorschlag auswählen oder Adresse selbst vervollständigen." : "Kein passender Vorschlag. Ihre Eingabe bleibt erhalten.");
      } catch {
        if (!cancelled && version === revision.current) {
          setResults([]);
          setStatus("Adressvorschläge sind gerade nicht verfügbar. Sie können Ihre Adresse weiter eingeben.");
        }
      } finally { clearTimeout(timeout); }
    }, 650);
    return () => { cancelled = true; clearTimeout(timer); controller.abort(); };
  }, [enabled, focused, dismissed, value]);

  function dismiss() { ++revision.current; setResults([]); setActive(-1); setDismissed(true); setStatus(""); }
  function choose(address: string) { dismiss(); onChoose(address); input.current?.focus(); setStatus("Adresse übernommen. Bitte Hausnummer prüfen und bei Bedarf ergänzen."); }
  return (
    <div className={styles.lookup}>
      <label htmlFor={id}>{label}</label>
      <input ref={input} id={id} name={name} value={value} required autoComplete={autoComplete} placeholder="Straße, Hausnummer, PLZ und Ort"
        role={configured && enabled ? "combobox" : undefined} aria-autocomplete={configured && enabled ? "list" : undefined}
        aria-expanded={configured && enabled ? results.length > 0 : undefined} aria-controls={configured && enabled ? id + "-results" : undefined}
        aria-activedescendant={active >= 0 && results[active] ? id + "-option-" + active : undefined}
        aria-invalid={Boolean(error)} aria-describedby={[id + "-hint", error ? id + "-error" : ""].filter(Boolean).join(" ")}
        onFocus={() => setFocused(true)} onBlur={() => { setFocused(false); dismiss(); }}
        onChange={event => { dismiss(); setDismissed(false); onChoose(event.target.value); }}
        onKeyDown={event => {
          if (event.key === "Escape") dismiss();
          if (event.key === "ArrowDown" && results.length) { event.preventDefault(); setActive(index => (index + 1) % results.length); }
          if (event.key === "ArrowUp" && results.length) { event.preventDefault(); setActive(index => index <= 0 ? results.length - 1 : index - 1); }
          if (event.key === "Enter" && results.length) { event.preventDefault(); if (results[active]) choose(results[active]); }
        }} />
      {error && <p id={id + "-error"} className={styles.error}>{error}</p>}
      <p id={id + "-hint"}>Adresse direkt eingeben. Eine Auswahl aus Vorschlägen ist nicht erforderlich.</p>
      {configured && <label className={styles.toggle}><input type="checkbox" checked={enabled} onChange={event => { dismiss(); setDismissed(false); setEnabled(event.target.checked); }} />Adressvorschläge verwenden</label>}
      {configured && enabled && <>
        <p>Für Vorschläge wird Ihr Adress-Suchtext an Geoapify übertragen. Bitte nur die Adresse eingeben, keinen Empfängernamen. <a href="/datenschutz/#adresssuche">Datenschutz</a> · <a href="https://www.geoapify.com/" target="_blank" rel="noopener noreferrer">Powered by Geoapify</a></p>
        <ul id={id + "-results"} role="listbox" aria-label={"Adressvorschläge für " + label} className={styles.results}>
          {results.map((address, index) => <li key={address} id={id + "-option-" + index} role="option" aria-selected={active === index}
            onPointerDown={event => event.preventDefault()} onClick={() => choose(address)}>{address}</li>)}
        </ul>
        <p role="status" aria-live="polite">{status}</p>
      </>}
    </div>
  );
}

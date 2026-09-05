"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import styles from "./MapConsent.module.css";

type ConsentDecision = "undecided" | "granted" | "denied";
type MapLoadState = "loading" | "ready" | "error";

const STORAGE_KEY = "tw-google-maps-consent-v1";
const CONSENT_EVENT = "tw-google-maps-consent-change";
const MAP_URL =
  "https://www.google.com/maps?q=Niederdreisbach%2C%20Deutschland&z=9&output=embed";

type Props = {
  loadTimeoutMs?: number;
};

function readConsent(): ConsentDecision {
  if (typeof window === "undefined") return "undecided";

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "granted" || stored === "denied" ? stored : "undecided";
  } catch {
    return "undecided";
  }
}

function subscribeToConsent(callback: () => void) {
  window.addEventListener(CONSENT_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function storeConsent(decision: ConsentDecision) {
  try {
    if (decision === "undecided") {
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      window.localStorage.setItem(STORAGE_KEY, decision);
    }
  } catch {
    // Die Einwilligung bleibt auch ohne verfügbaren Browser-Speicher bedienbar.
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export function MapConsent({ loadTimeoutMs = 15_000 }: Props = {}) {
  const decision = useSyncExternalStore(
    subscribeToConsent,
    readConsent,
    () => "undecided",
  );
  const [loadState, setLoadState] = useState<MapLoadState>("loading");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (decision !== "granted" || loadState !== "loading") return;

    const timeoutId = window.setTimeout(() => {
      setLoadState("error");
    }, loadTimeoutMs);

    return () => window.clearTimeout(timeoutId);
  }, [attempt, decision, loadState, loadTimeoutMs]);

  function choose(decisionValue: ConsentDecision) {
    setLoadState("loading");
    if (decisionValue === "granted") {
      setAttempt((current) => current + 1);
    }
    storeConsent(decisionValue);
  }

  if (decision === "undecided") {
    return (
      <div className={styles.consentPanel}>
        <div>
          <h3>Google Maps nur mit Ihrer Zustimmung.</h3>
          <p>
            Die Karte hilft bei der räumlichen Orientierung. Beim Laden wird
            eine Verbindung zu Google hergestellt; dabei können unter anderem
            Ihre IP-Adresse und technische Browserdaten übermittelt werden.
          </p>
          <a href="/datenschutz/">Mehr zum Datenschutz</a>
        </div>
        <div className={styles.choices} aria-label="Google-Maps-Einstellung">
          <button type="button" onClick={() => choose("granted")}>
            Google Maps laden
          </button>
          <button type="button" onClick={() => choose("denied")}>
            Ohne Karte fortfahren
          </button>
        </div>
      </div>
    );
  }

  if (decision === "denied") {
    return (
      <div className={styles.decisionPanel}>
        <div>
          <h3>Google Maps bleibt ausgeschaltet.</h3>
          <p>
            Standort, Einsatzgebiet und Ortsbeispiele bleiben ohne externe
            Karte vollständig lesbar.
          </p>
        </div>
        <button type="button" onClick={() => choose("undecided")}>
          Karteneinstellung ändern
        </button>
      </div>
    );
  }

  if (loadState === "error") {
    return (
      <div className={styles.decisionPanel}>
        <div>
          <h3>Die Karte konnte nicht geladen werden.</h3>
          <p>
            Die regionale Information bleibt oben verfügbar. Sie können die
            Karte erneut laden oder Ihre Entscheidung ändern.
          </p>
        </div>
        <div className={styles.retryActions}>
          <button
            type="button"
            onClick={() => {
              setLoadState("loading");
              setAttempt((current) => current + 1);
            }}
          >
            Erneut versuchen
          </button>
          <button type="button" onClick={() => choose("undecided")}>
            Karteneinstellung ändern
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mapFrame}>
      <div className={styles.mapViewport}>
        <iframe
          key={attempt}
          src={MAP_URL}
          title="Google Maps: Einsatzgebiet ab Niederdreisbach"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          onLoad={() => setLoadState("ready")}
          onError={() => setLoadState("error")}
        />
        {loadState === "loading" && (
          <div className={styles.loading} role="status" aria-live="polite">
            Karte wird geladen …
          </div>
        )}
      </div>
      {loadState === "ready" && (
        <div className={styles.mapControls}>
          <p>Google Maps ist aktiviert.</p>
          <button type="button" onClick={() => choose("undecided")}>
            Karteneinstellung ändern
          </button>
        </div>
      )}
    </div>
  );
}

"use client";

import Image from "next/image";
import {
  FormEvent,
  KeyboardEvent,
  useState,
  useSyncExternalStore,
} from "react";
import {
  INQUIRY_DRAFT_EVENT,
  PRICE_VIEW_STORAGE_KEY,
  updateInquiryDraft,
  type InquiryDraft,
} from "@/lib/inquiryDraft";
import {
  grossPriceCents,
  sharedFeatures,
  trailerModels,
  type TrailerModelId,
} from "@/lib/models";
import styles from "./ModelSelector.module.css";

type PriceView = "private" | "business";
type Recommendation =
  | { kind: "idle" }
  | { kind: "model"; modelId: TrailerModelId }
  | { kind: "advice" };

const occasions = [
  "Hochzeit oder private Feier",
  "Firmenveranstaltung",
  "Kirmes oder Volksfest",
  "Baustelle oder Gewerbe",
  "Kommune oder öffentlicher Einsatz",
  "Sonstiger Anlass",
] as const;

const PRICE_VIEW_EVENT = "mshs:price-view-change";
let inMemoryPriceView: PriceView = "private";

const currency = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function recommendModel(personCount: number): TrailerModelId | null {
  if (!Number.isInteger(personCount) || personCount < 1 || personCount > 600) {
    return null;
  }
  if (personCount <= 200) return "s";
  if (personCount <= 400) return "m";
  return "l";
}

function publishDraft(patch: Parameters<typeof updateInquiryDraft>[1]) {
  try {
    const draft = updateInquiryDraft(window.sessionStorage, patch);
    window.dispatchEvent(
      new CustomEvent<InquiryDraft>(INQUIRY_DRAFT_EVENT, { detail: draft }),
    );
  } catch {
    // The controls still work when storage is unavailable.
  }
}

function readPriceView(): PriceView {
  try {
    const stored = window.sessionStorage.getItem(PRICE_VIEW_STORAGE_KEY);
    return stored === "business" || stored === "private"
      ? stored
      : inMemoryPriceView;
  } catch {
    return inMemoryPriceView;
  }
}

function subscribeToPriceView(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(PRICE_VIEW_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(PRICE_VIEW_EVENT, onStoreChange);
  };
}

function storePriceView(priceView: PriceView) {
  inMemoryPriceView = priceView;
  try {
    window.sessionStorage.setItem(PRICE_VIEW_STORAGE_KEY, priceView);
  } catch {
    // In-memory state keeps the control usable without storage.
  }
  window.dispatchEvent(new Event(PRICE_VIEW_EVENT));
}

export function ModelSelector() {
  const [selectedId, setSelectedId] = useState<TrailerModelId>("s");
  const priceView = useSyncExternalStore(
    subscribeToPriceView,
    readPriceView,
    () => "private",
  );
  const [personCount, setPersonCount] = useState("");
  const [occasion, setOccasion] = useState("");
  const [recommendation, setRecommendation] = useState<Recommendation>({
    kind: "idle",
  });

  const selectedModel =
    trailerModels.find((model) => model.id === selectedId) ?? trailerModels[0];
  const displayedPriceCents =
    priceView === "private"
      ? grossPriceCents(selectedModel.priceNetCents)
      : selectedModel.priceNetCents;

  function selectModel(modelId: TrailerModelId) {
    setSelectedId(modelId);
    publishDraft({ model: modelId });
  }

  function handleModelKeyDown(
    event: KeyboardEvent<HTMLInputElement>,
    currentIndex: number,
  ) {
    const lastIndex = trailerModels.length - 1;
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = lastIndex;
    }

    if (nextIndex === null) return;
    event.preventDefault();
    const nextModel = trailerModels[nextIndex];
    selectModel(nextModel.id);
    document.getElementById(`model-choice-${nextModel.id}`)?.focus();
  }

  function handleOccasionChange(value: string) {
    setOccasion(value);
    publishDraft({ occasion: value || null });
  }

  function handleRecommendation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsedCount = Number(personCount);
    const modelId = recommendModel(parsedCount);

    if (!personCount.trim() || !modelId) {
      setRecommendation({ kind: "advice" });
      publishDraft({ model: null, occasion: occasion || null });
      return;
    }

    setRecommendation({ kind: "model", modelId });
    selectModel(modelId);
    publishDraft({ model: modelId, occasion: occasion || null });
  }

  function prepareInquiry() {
    publishDraft({ model: selectedId, occasion: occasion || null });
  }

  function prepareAdvice() {
    publishDraft({ model: null, occasion: occasion || null });
  }

  return (
    <section
      id="modellvergleich"
      className={styles.selector}
      aria-labelledby="model-selector-title"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="model-selector-title">Drei Größen. Direkt vergleichbar.</h2>
          <p>Wähle ein Modell und sieh alle Daten in einer Ansicht.</p>
        </header>

        <fieldset className={styles.modelPicker}>
          <legend>Modell auswählen</legend>
          <div className={styles.modelChoices}>
            {trailerModels.map((model, index) => (
              <label key={model.id}>
                <input
                  id={`model-choice-${model.id}`}
                  type="radio"
                  name="trailer-model"
                  value={model.id}
                  aria-label={`Modell ${model.name}, bis ${model.capacity} Personen`}
                  checked={selectedId === model.id}
                  onChange={() => selectModel(model.id)}
                  onKeyDown={(event) => handleModelKeyDown(event, index)}
                />
                <span className={styles.modelChoice}>
                  <strong>{model.name}</strong>
                  <span>bis {model.capacity} Personen</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className={styles.productView}>
          <figure className={styles.productStage}>
            <Image
              key={selectedModel.id}
              src="/fotos/wagen-s-hero-1600.webp"
              alt={`Vorläufiger S-Freisteller als Bildplatzhalter für Modell ${selectedModel.name}`}
              width={1600}
              height={1229}
              sizes="(max-width: 767px) 92vw, 52vw"
            />
            <figcaption>
              Modell {selectedModel.name}: Der finale maßhaltige Freisteller
              wird später eingesetzt.
            </figcaption>
          </figure>

          <article
            className={styles.modelData}
            aria-labelledby="selected-model-title"
          >
            <div className={styles.modelLead}>
              <h3 id="selected-model-title">
                Modell <span>{selectedModel.name}</span>
              </h3>
              <p>{selectedModel.suitability}</p>
            </div>

            <div className={styles.priceBlock}>
              <fieldset className={styles.pricePicker}>
                <legend>Preisansicht</legend>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="price-view"
                      value="private"
                      aria-label="Privat, brutto inkl. MwSt."
                      checked={priceView === "private"}
                      onChange={() => storePriceView("private")}
                    />
                    <span>Privat · brutto</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="price-view"
                      value="business"
                      aria-label="Gewerbe, netto"
                      checked={priceView === "business"}
                      onChange={() => storePriceView("business")}
                    />
                    <span>Gewerbe · netto</span>
                  </label>
                </div>
              </fieldset>

              <p className={styles.price} aria-live="polite">
                <span>ab</span> {currency.format(displayedPriceCents / 100)}
              </p>
              <p className={styles.priceQualifier}>
                {priceView === "private"
                  ? "brutto inkl. 19 % MwSt. pro Miettag"
                  : "netto zzgl. 19 % MwSt. pro Miettag"}
              </p>
            </div>

            <dl className={styles.facts}>
              <div className={styles.wideFact}>
                <dt>Maße</dt>
                <dd>{selectedModel.dimensions}</dd>
              </div>
              <div>
                <dt>Kapazität</dt>
                <dd>bis {selectedModel.capacity} Personen</dd>
              </div>
              <div>
                <dt>Damen-WCs</dt>
                <dd>{selectedModel.womensCabins}</dd>
              </div>
              <div>
                <dt>Herren-WCs</dt>
                <dd>{selectedModel.mensCabins}</dd>
              </div>
              <div>
                <dt>Urinale</dt>
                <dd>{selectedModel.urinals}</dd>
              </div>
            </dl>

            <div className={styles.equipment}>
              <h4>Ausstattung</h4>
              <div className={styles.equipmentGroups}>
                <div>
                  <p>In jedem Modell</p>
                  <ul>
                    {sharedFeatures.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
                {selectedModel.specificFeatures.length > 0 && (
                  <div>
                    <p>Zusätzlich in Modell {selectedModel.name}</p>
                    <ul>
                      {selectedModel.specificFeatures.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.costNotes} aria-label="Kostenhinweise">
              <p>Anfahrt: 1,10 €/km, nicht im Mietpreis enthalten.</p>
              <p>Lieferung und Abholung werden separat berechnet.</p>
              <p>Liefer- und Abholtag zählen nicht als Miettage.</p>
              <p>Verbindlich ist das individuelle Angebot.</p>
            </div>

            <a
              href="#kontakt"
              className={styles.inquiryLink}
              onClick={prepareInquiry}
            >
              Modell {selectedModel.name} anfragen
            </a>
          </article>
        </div>

        <div className={styles.advisor}>
          <div className={styles.advisorIntro}>
            <h3>Unsicher bei der Größe?</h3>
            <p>
              Eine Personenzahl reicht für eine erste, unverbindliche
              Orientierung.
            </p>
          </div>

          <form className={styles.advisorForm} onSubmit={handleRecommendation} noValidate>
            <label>
              <span>Geschätzte Personenzahl</span>
              <input
                type="number"
                inputMode="numeric"
                min="1"
                step="1"
                value={personCount}
                onChange={(event) => setPersonCount(event.target.value)}
              />
            </label>
            <label>
              <span>Anlass (optional)</span>
              <select
                value={occasion}
                onChange={(event) => handleOccasionChange(event.target.value)}
              >
                <option value="">Bitte auswählen</option>
                {occasions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit">Größe einschätzen</button>
          </form>

          <div className={styles.recommendation} role="status" aria-live="polite">
            {recommendation.kind === "idle" && (
              <p>
                Das Ergebnis ist eine Orientierung, kein Preisangebot und keine
                Verfügbarkeitsprüfung.
              </p>
            )}
            {recommendation.kind === "model" && (
              <>
                <h4>
                  Unverbindliche Orientierung: Modell {recommendation.modelId.toUpperCase()}
                </h4>
                <p>
                  Anlass, Zeitraum, Anschlüsse und Verfügbarkeit können die
                  persönliche Empfehlung verändern.
                </p>
                <a href="#kontakt" onClick={prepareInquiry}>
                  Anfrage vorbereiten
                </a>
              </>
            )}
            {recommendation.kind === "advice" && (
              <>
                <h4>Persönliche Beratung empfohlen</h4>
                <p>
                  Für diese Angabe empfehlen wir den passenden Wagen persönlich.
                  Anlass, Zeitraum, Anschlüsse und Verfügbarkeit entscheiden mit.
                </p>
                <a href="#kontakt" onClick={prepareAdvice}>
                  Beratung anfragen
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

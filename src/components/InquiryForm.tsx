"use client";

import {
  type ChangeEvent,
  type FormEvent,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { WhatsappButton } from "@/components/WhatsappButton";
import {
  INQUIRY_DRAFT_EVENT,
  INQUIRY_DRAFT_STORAGE_KEY,
  readInquiryDraft,
} from "@/lib/inquiryDraft";
import {
  initialInquiryValues,
  inquiryOccasions,
  isInquiryTransportConfigured,
  normalizeDraftOccasion,
  submitInquiry,
  validateInquiry,
  type InquiryFieldErrors,
  type InquiryFieldName,
  type InquiryFormValues,
} from "@/lib/inquiry";
import { trailerModels } from "@/lib/models";
import { site } from "@/lib/site";
import styles from "./InquiryForm.module.css";

type FormStatus =
  | "idle"
  | "invalid"
  | "sending"
  | "success"
  | "error"
  | "spam"
  | "not-configured";

const errorTargets: Record<InquiryFieldName, string> = {
  name: "inquiry-name",
  email: "inquiry-email",
  phone: "inquiry-phone",
  contact: "inquiry-email",
  location: "inquiry-location",
  startDate: "inquiry-start-date",
  endDate: "inquiry-end-date",
  model: "inquiry-model-unknown",
  occasion: "inquiry-occasion",
  occasionOther: "inquiry-occasion-other",
  message: "inquiry-message",
  privacyAccepted: "inquiry-privacy",
  website: "inquiry-website",
};

function subscribeToInquiryDraft(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(INQUIRY_DRAFT_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(INQUIRY_DRAFT_EVENT, onStoreChange);
  };
}

function readInquiryDraftSnapshot() {
  try {
    return window.sessionStorage.getItem(INQUIRY_DRAFT_STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

export function InquiryForm() {
  const [values, setValues] = useState<InquiryFormValues>(initialInquiryValues);
  const [draftOverrides, setDraftOverrides] = useState({
    model: false,
    occasion: false,
  });
  const [errors, setErrors] = useState<InquiryFieldErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const submittingRef = useRef(false);
  const transportConfigured = isInquiryTransportConfigured();
  const draftSnapshot = useSyncExternalStore(
    subscribeToInquiryDraft,
    readInquiryDraftSnapshot,
    () => "",
  );
  const draft = readInquiryDraft({
    getItem: () => draftSnapshot || null,
  });
  const formValues: InquiryFormValues = {
    ...values,
    ...(!draftOverrides.model && draft.model ? { model: draft.model } : {}),
    ...(!draftOverrides.occasion && draft.occasion
      ? { occasion: normalizeDraftOccasion(draft.occasion) }
      : {}),
  };

  function setField<Key extends keyof InquiryFormValues>(
    field: Key,
    value: InquiryFormValues[Key],
  ) {
    setValues((current) => ({ ...current, [field]: value }));
    if (field === "model" || field === "occasion") {
      setDraftOverrides((current) => ({ ...current, [field]: true }));
    }
    setErrors((current) => {
      if (!current[field] && !(field === "email" || field === "phone")) {
        return current;
      }
      const next = { ...current };
      delete next[field];
      if (field === "email" || field === "phone") delete next.contact;
      return next;
    });
    if (status !== "idle" && status !== "sending") setStatus("idle");
  }

  function handleTextField(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const field = event.currentTarget.name as keyof InquiryFormValues;
    setField(field, event.currentTarget.value as InquiryFormValues[typeof field]);
  }

  async function handleAttempt() {
    if (submittingRef.current) return;

    const nextErrors = validateInquiry(formValues);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("invalid");
      requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }

    if (formValues.website) {
      setStatus("spam");
      return;
    }

    setErrors({});
    submittingRef.current = true;
    setStatus("sending");
    const result = await submitInquiry(formValues);
    submittingRef.current = false;
    setStatus(result.kind);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void handleAttempt();
  }

  const errorEntries = Object.entries(errors) as [InquiryFieldName, string][];
  const describedBy = (field: InquiryFieldName, hintId?: string) =>
    [hintId, errors[field] ? `${errorTargets[field]}-error` : undefined]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <section id="kontakt" className={styles.contact} aria-labelledby="contact-title">
      <div className={styles.inner}>
        <header className={styles.intro}>
          <h2 id="contact-title">Sag uns Ort, Termin und Anlass.</h2>
          <div className={styles.introAside}>
            <p>
              Ein paar Eckdaten genügen für den Anfang. Wir prüfen persönlich,
              welcher Wagen und welcher Aufbau zu Ihrem Termin passen.
            </p>
            <WhatsappButton />
          </div>
        </header>

        <div className={styles.workspace}>
          <aside className={styles.contactRail} aria-label="Direkte Kontaktwege">
            <div>
              <h3>Lieber direkt?</h3>
              <p>
                WhatsApp ist der schnellste Weg. Telefon und E-Mail bleiben
                genauso erreichbar.
              </p>
            </div>

            <div className={styles.directLinks}>
              <a href={site.phoneHref}>{site.phone}</a>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>

            <dl className={styles.hours}>
              {site.hours.map((item) => (
                <div key={item.days}>
                  <dt>{item.days}</dt>
                  <dd>{item.time}</dd>
                </div>
              ))}
            </dl>
          </aside>

          <form
            className={styles.form}
            onSubmit={handleSubmit}
            action={
              transportConfigured
                ? process.env.NEXT_PUBLIC_INQUIRY_ENDPOINT
                : undefined
            }
            method={transportConfigured ? "post" : undefined}
            noValidate
            aria-labelledby="inquiry-form-title"
          >
            <div className={styles.formHeader}>
              <h3 id="inquiry-form-title">Ihre Anfrage</h3>
              <p>Pflichtfelder sind mit * gekennzeichnet.</p>
            </div>

            {errorEntries.length > 0 && (
              <div
                ref={errorSummaryRef}
                className={styles.errorSummary}
                role="alert"
                tabIndex={-1}
                aria-labelledby="inquiry-error-title"
              >
                <h4 id="inquiry-error-title">Bitte prüfen Sie Ihre Angaben.</h4>
                <ul>
                  {errorEntries.map(([field, message]) => (
                    <li key={field}>
                      <a href={`#${errorTargets[field]}`}>{message}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className={styles.formGrid}>
              <label className={styles.field} htmlFor="inquiry-name">
                <span>Name *</span>
                <input
                  id="inquiry-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formValues.name}
                  onChange={handleTextField}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={describedBy("name")}
                />
                {errors.name && (
                  <span id="inquiry-name-error" className={styles.fieldError}>
                    {errors.name}
                  </span>
                )}
              </label>

              <label className={styles.field} htmlFor="inquiry-location">
                <span>Ort oder PLZ *</span>
                <input
                  id="inquiry-location"
                  name="location"
                  type="text"
                  autoComplete="postal-code"
                  required
                  value={formValues.location}
                  onChange={handleTextField}
                  aria-invalid={Boolean(errors.location)}
                  aria-describedby={describedBy("location")}
                />
                {errors.location && (
                  <span id="inquiry-location-error" className={styles.fieldError}>
                    {errors.location}
                  </span>
                )}
              </label>

              <label className={styles.field} htmlFor="inquiry-email">
                <span>E-Mail</span>
                <input
                  id="inquiry-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={formValues.email}
                  onChange={handleTextField}
                  aria-invalid={Boolean(errors.email || errors.contact)}
                  aria-describedby={[
                    "inquiry-contact-hint",
                    errors.email ? "inquiry-email-error" : undefined,
                    errors.contact ? "inquiry-contact-error" : undefined,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                />
                {errors.email && (
                  <span id="inquiry-email-error" className={styles.fieldError}>
                    {errors.email}
                  </span>
                )}
              </label>

              <label className={styles.field} htmlFor="inquiry-phone">
                <span>Telefon</span>
                <input
                  id="inquiry-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={formValues.phone}
                  onChange={handleTextField}
                  aria-invalid={Boolean(errors.contact)}
                  aria-describedby={[
                    "inquiry-contact-hint",
                    errors.contact ? "inquiry-contact-error" : undefined,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                />
              </label>

              <p id="inquiry-contact-hint" className={styles.contactHint}>
                Bitte mindestens E-Mail oder Telefon angeben.
                {errors.contact && (
                  <span id="inquiry-contact-error" className={styles.fieldError}>
                    {errors.contact}
                  </span>
                )}
              </p>

              <label className={styles.field} htmlFor="inquiry-start-date">
                <span>Von oder Termin *</span>
                <input
                  id="inquiry-start-date"
                  name="startDate"
                  type="date"
                  required
                  value={formValues.startDate}
                  onChange={handleTextField}
                  aria-invalid={Boolean(errors.startDate)}
                  aria-describedby={describedBy("startDate")}
                />
                {errors.startDate && (
                  <span id="inquiry-start-date-error" className={styles.fieldError}>
                    {errors.startDate}
                  </span>
                )}
              </label>

              <label className={styles.field} htmlFor="inquiry-end-date">
                <span>Bis (optional)</span>
                <input
                  id="inquiry-end-date"
                  name="endDate"
                  type="date"
                  min={formValues.startDate || undefined}
                  value={formValues.endDate}
                  onChange={handleTextField}
                  aria-invalid={Boolean(errors.endDate)}
                  aria-describedby={describedBy("endDate")}
                />
                {errors.endDate && (
                  <span id="inquiry-end-date-error" className={styles.fieldError}>
                    {errors.endDate}
                  </span>
                )}
              </label>

              <fieldset className={`${styles.fieldset} ${styles.full}`}>
                <legend>Welches Modell kommt infrage?</legend>
                <div className={styles.modelChoices}>
                  {trailerModels.map((model) => (
                    <label key={model.id}>
                      <input
                        id={`inquiry-model-${model.id}`}
                        type="radio"
                        name="model"
                        value={model.id}
                        aria-label={`Modell ${model.name}, bis ${model.capacity} Personen`}
                        checked={formValues.model === model.id}
                        onChange={() => setField("model", model.id)}
                      />
                      <span>
                        <strong>{model.name}</strong>
                        <small>bis {model.capacity} Personen</small>
                      </span>
                    </label>
                  ))}
                  <label>
                    <input
                      id="inquiry-model-unknown"
                      type="radio"
                      name="model"
                      value="unknown"
                      aria-label="Modell noch unsicher, persönliche Beratung"
                      checked={formValues.model === "unknown"}
                      onChange={() => setField("model", "unknown")}
                    />
                    <span>
                      <strong>Noch unsicher</strong>
                      <small>Wir beraten persönlich</small>
                    </span>
                  </label>
                </div>
              </fieldset>

              <label className={`${styles.field} ${styles.full}`} htmlFor="inquiry-occasion">
                <span>Anlass</span>
                <select
                  id="inquiry-occasion"
                  name="occasion"
                  value={formValues.occasion}
                  onChange={handleTextField}
                >
                  <option value="">Bitte auswählen</option>
                  {inquiryOccasions.map((occasion) => (
                    <option key={occasion} value={occasion}>
                      {occasion}
                    </option>
                  ))}
                </select>
              </label>

              {formValues.occasion === "Sonstiges" && (
                <label className={`${styles.field} ${styles.full}`} htmlFor="inquiry-occasion-other">
                  <span>Anlass kurz beschreiben *</span>
                  <input
                    id="inquiry-occasion-other"
                    name="occasionOther"
                    type="text"
                    value={formValues.occasionOther}
                    onChange={handleTextField}
                    aria-invalid={Boolean(errors.occasionOther)}
                    aria-describedby={describedBy("occasionOther")}
                  />
                  {errors.occasionOther && (
                    <span id="inquiry-occasion-other-error" className={styles.fieldError}>
                      {errors.occasionOther}
                    </span>
                  )}
                </label>
              )}

              <label className={`${styles.field} ${styles.full}`} htmlFor="inquiry-message">
                <span>Was sollten wir noch wissen?</span>
                <textarea
                  id="inquiry-message"
                  name="message"
                  rows={6}
                  placeholder="Zum Beispiel Personenzahl, Aufstellort oder Besonderheiten vor Ort"
                  value={formValues.message}
                  onChange={handleTextField}
                />
              </label>
            </div>

            <div className={styles.honeypot} aria-hidden="true">
              <label htmlFor="inquiry-website">Website</label>
              <input
                id="inquiry-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={formValues.website}
                onChange={handleTextField}
              />
            </div>

            <label className={styles.privacy} htmlFor="inquiry-privacy">
              <input
                id="inquiry-privacy"
                name="privacyAccepted"
                type="checkbox"
                required
                checked={formValues.privacyAccepted}
                onChange={(event) =>
                  setField("privacyAccepted", event.currentTarget.checked)
                }
                aria-invalid={Boolean(errors.privacyAccepted)}
                aria-describedby={describedBy("privacyAccepted")}
              />
              <span>
                Ich stimme der Verarbeitung meiner Angaben zur Bearbeitung der
                Anfrage gemäß der <a href="/datenschutz/">Datenschutzerklärung</a> zu. *
              </span>
            </label>
            {errors.privacyAccepted && (
              <span id="inquiry-privacy-error" className={styles.privacyError}>
                {errors.privacyAccepted}
              </span>
            )}

            <div className={styles.submitBar}>
              <p>
                {transportConfigured
                  ? "Ihre Angaben werden ausschließlich zur Bearbeitung dieser Anfrage verwendet."
                  : "Vorschau: Der Mailversand folgt später. Aktuell werden keine Angaben übertragen."}
              </p>
              <button
                type={transportConfigured ? "submit" : "button"}
                onClick={transportConfigured ? undefined : () => void handleAttempt()}
                disabled={status === "sending"}
              >
                {status === "sending"
                  ? "Wird gesendet …"
                  : transportConfigured
                    ? "Anfrage senden"
                    : "Eingaben prüfen"}
              </button>
            </div>

            <FormResult status={status} />
          </form>
        </div>
      </div>
    </section>
  );
}

function FormResult({ status }: { status: FormStatus }) {
  if (status === "idle" || status === "invalid" || status === "sending") {
    return status === "sending" ? (
      <p className={styles.liveStatus} role="status" aria-live="polite">
        Die Anfrage wird übertragen. Bitte senden Sie das Formular nicht erneut.
      </p>
    ) : null;
  }

  const content = {
    success: {
      title: "Vielen Dank. Ihre Anfrage ist eingegangen.",
      text: "Wir melden uns innerhalb unserer Erreichbarkeit persönlich. Eine Buchung oder Verfügbarkeit ist damit noch nicht bestätigt.",
    },
    error: {
      title: "Die Anfrage konnte gerade nicht gesendet werden.",
      text: "Ihre Eingaben bleiben erhalten. Nutzen Sie alternativ WhatsApp oder rufen Sie uns an.",
    },
    spam: {
      title: "Die Anfrage konnte nicht verarbeitet werden.",
      text: "Bitte versuchen Sie es erneut oder nutzen Sie WhatsApp beziehungsweise Telefon.",
    },
    "not-configured": {
      title: "Die Angaben sind vollständig, aber noch nicht gesendet.",
      text: "Der Mailversand ist in dieser Vorschau noch nicht freigeschaltet. Nutzen Sie bis dahin WhatsApp, Telefon oder E-Mail.",
    },
  }[status];

  return (
    <div
      className={`${styles.result} ${status === "success" ? styles.resultSuccess : styles.resultFallback}`}
      role="status"
      aria-live="polite"
    >
      <h4>{content.title}</h4>
      <p>{content.text}</p>
      {status !== "success" && (
        <div className={styles.resultLinks}>
          <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer">
            WhatsApp öffnen
          </a>
          <a href={site.phoneHref}>{site.phone}</a>
        </div>
      )}
    </div>
  );
}

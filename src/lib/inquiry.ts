import type { TrailerModelId } from "@/lib/models";

export const inquiryOccasions = [
  "Hochzeit",
  "Private Feier",
  "Festival oder Großveranstaltung",
  "Firmenfeier",
  "Markt",
  "Sportveranstaltung",
  "Gewerbliche Veranstaltung",
  "Kommune oder öffentlicher Einsatz",
  "Sonstiges",
] as const;

export type InquiryOccasion = (typeof inquiryOccasions)[number] | "";
export type InquiryModel = TrailerModelId | "unknown";

export type InquiryFormValues = {
  name: string;
  email: string;
  phone: string;
  location: string;
  customerType: "private" | "business";
  company: string;
  billingSameAsLocation: boolean;
  billingAddress: string;
  deliveryDate: string;
  startDate: string;
  endDate: string;
  model: InquiryModel;
  occasion: InquiryOccasion;
  occasionOther: string;
  message: string;
  privacyAccepted: boolean;
  website: string;
};

export type InquiryFieldName = keyof InquiryFormValues | "contact";
export type InquiryFieldErrors = Partial<Record<InquiryFieldName, string>>;

export type InquiryPayload = Omit<InquiryFormValues, "privacyAccepted"> & {
  privacyAccepted: true;
};

export type InquiryTransportResult =
  | { kind: "success" }
  | { kind: "spam" }
  | { kind: "error" }
  | { kind: "not-configured" };

export const initialInquiryValues: InquiryFormValues = {
  name: "",
  email: "",
  phone: "",
  location: "",
  customerType: "private",
  company: "",
  billingSameAsLocation: false,
  billingAddress: "",
  deliveryDate: "",
  startDate: "",
  endDate: "",
  model: "unknown",
  occasion: "",
  occasionOther: "",
  message: "",
  privacyAccepted: false,
  website: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateInquiry(values: InquiryFormValues) {
  const errors: InquiryFieldErrors = {};

  if (!values.name.trim()) errors.name = "Bitte nennen Sie uns Ihren Namen.";
  if (!values.location.trim()) {
    errors.location = "Bitte nennen Sie Ort oder Postleitzahl.";
  }
  if (!values.startDate) {
    errors.startDate = "Bitte wählen Sie den Veranstaltungstag oder Mietbeginn.";
  }
  if (values.endDate && values.startDate && values.endDate < values.startDate) {
    errors.endDate = "Das Enddatum darf nicht vor dem Mietbeginn liegen.";
  }
  if (!values.email.trim()) errors.email = "Bitte geben Sie Ihre E-Mail-Adresse an.";
  if (!values.phone.trim()) errors.phone = "Bitte geben Sie Ihre Telefonnummer für dringende Rückfragen an.";
  if (values.customerType === "business" && !values.company.trim()) errors.company = "Bitte nennen Sie den Firmennamen.";
  if (!values.billingSameAsLocation && !values.billingAddress.trim()) errors.billingAddress = "Bitte geben Sie Ihre Rechnungsanschrift an.";
  if (!values.deliveryDate) errors.deliveryDate = "Bitte wählen Sie den gewünschten Liefertag.";
  if (values.deliveryDate && values.startDate && values.deliveryDate > values.startDate) errors.deliveryDate = "Der Liefertag darf nicht nach dem Nutzungsbeginn liegen.";
  if (values.email.trim() && !emailPattern.test(values.email.trim())) {
    errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
  }
  if (values.occasion === "Sonstiges" && !values.occasionOther.trim()) {
    errors.occasionOther = "Bitte beschreiben Sie den Anlass kurz.";
  }
  if (!values.privacyAccepted) {
    errors.privacyAccepted = "Bitte stimmen Sie der Verarbeitung Ihrer Angaben zu.";
  }

  return errors;
}

export function isInquiryTransportConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_INQUIRY_ENDPOINT?.trim());
}

export async function submitInquiry(
  values: InquiryFormValues,
): Promise<InquiryTransportResult> {
  const endpoint = process.env.NEXT_PUBLIC_INQUIRY_ENDPOINT?.trim();
  if (!endpoint) return { kind: "not-configured" };

  const payload: InquiryPayload = {
    ...values,
    name: values.name.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
    location: values.location.trim(),
    company: values.company.trim(),
    billingAddress: values.billingSameAsLocation ? values.location.trim() : values.billingAddress.trim(),
    occasionOther: values.occasionOther.trim(),
    message: values.message.trim(),
    privacyAccepted: true,
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body: unknown = await response.json().catch(() => null);

    if (response.ok && isSuccessResponse(body)) return { kind: "success" };
    if (isSpamResponse(body)) return { kind: "spam" };
    return { kind: "error" };
  } catch {
    return { kind: "error" };
  }
}

function isSuccessResponse(value: unknown): value is { ok: true } {
  return Boolean(value && typeof value === "object" && (value as { ok?: unknown }).ok === true);
}

function isSpamResponse(value: unknown): value is { ok: false; code: "spam" } {
  if (!value || typeof value !== "object") return false;
  const candidate = value as { ok?: unknown; code?: unknown };
  return candidate.ok === false && candidate.code === "spam";
}

export function normalizeDraftOccasion(value?: string): InquiryOccasion {
  if (!value) return "";
  if ((inquiryOccasions as readonly string[]).includes(value)) {
    return value as InquiryOccasion;
  }

  const legacyMap: Record<string, InquiryOccasion> = {
    "Hochzeit oder private Feier": "Hochzeit",
    Firmenveranstaltung: "Firmenfeier",
    "Kirmes oder Volksfest": "Festival oder Großveranstaltung",
    "Sonstiger Anlass": "Sonstiges",
  };
  return legacyMap[value] ?? "";
}

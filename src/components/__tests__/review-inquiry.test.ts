import { describe, expect, it } from "vitest";
import { initialInquiryValues, validateInquiry } from "@/lib/inquiry";

const valid = {
  ...initialInquiryValues,
  name: "Testperson",
  location: "Teststraße 1, 57567 Daaden",
  billingAddress: "Rechnungsstraße 2, 57567 Daaden",
  phone: "0123456789",
  email: "test@example.com",
  deliveryDate: "2026-10-10",
  startDate: "2026-10-11",
  privacyAccepted: true,
};

describe("Review-Anforderungen im Formular", () => {
  it("verlangt Telefon und E-Mail unabhängig voneinander", () => {
    expect(validateInquiry(valid)).toEqual({});
    expect(validateInquiry({ ...valid, phone: "" })).toHaveProperty("phone");
    expect(validateInquiry({ ...valid, email: "" })).toHaveProperty("email");
  });
  it("prüft Rechnungsanschrift und gewerbliche Firmendaten", () => {
    expect(validateInquiry({ ...valid, billingAddress: "" })).toHaveProperty("billingAddress");
    expect(validateInquiry({ ...valid, billingAddress: "", billingSameAsLocation: true })).toEqual({});
    expect(validateInquiry({ ...valid, customerType: "business" })).toHaveProperty("company");
    expect(validateInquiry({ ...valid, customerType: "business", company: "Beispiel GmbH" })).toEqual({});
  });
  it("verhindert eine Lieferung nach Nutzungsbeginn", () => {
    expect(validateInquiry({ ...valid, deliveryDate: "2026-10-12" })).toHaveProperty("deliveryDate");
    expect(validateInquiry({ ...valid, deliveryDate: "" })).toHaveProperty("deliveryDate");
  });
});

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InquiryForm } from "@/components/InquiryForm";
import { updateInquiryDraft } from "@/lib/inquiryDraft";

async function fillValidForm() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText("Name *"), "Mara Beispiel");
  await user.type(screen.getByLabelText("Ort oder PLZ *"), "57567 Daaden");
  await user.type(screen.getByLabelText("E-Mail"), "mara@example.de");
  await user.type(screen.getByLabelText("Von oder Termin *"), "2026-10-12");
  await user.click(
    screen.getByRole("checkbox", { name: /Datenschutzerklärung/i }),
  );
  return user;
}

describe("InquiryForm", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("fasst Pflichtfehler fokussierbar zusammen und behält Eingaben", async () => {
    const user = userEvent.setup();
    render(<InquiryForm />);

    await user.type(screen.getByLabelText("Name *"), "Mara");
    await user.click(screen.getByRole("button", { name: "Eingaben prüfen" }));

    const summary = await screen.findByRole("alert");
    await waitFor(() => expect(summary).toHaveFocus());
    expect(summary).toHaveTextContent("Ort oder Postleitzahl");
    expect(summary).toHaveTextContent("E-Mail-Adresse oder Telefonnummer");
    expect(summary).toHaveTextContent("Termin oder Starttag");
    expect(summary).toHaveTextContent("Datenschutzerklärung");
    expect(screen.getByLabelText("Name *")).toHaveValue("Mara");
  });

  it("prüft E-Mail und Datumsreihenfolge", async () => {
    const user = userEvent.setup();
    render(<InquiryForm />);

    await user.type(screen.getByLabelText("Name *"), "Mara Beispiel");
    await user.type(screen.getByLabelText("Ort oder PLZ *"), "57567 Daaden");
    await user.type(screen.getByLabelText("E-Mail"), "nicht-gueltig");
    await user.type(screen.getByLabelText("Von oder Termin *"), "2026-10-12");
    await user.type(screen.getByLabelText("Bis (optional)"), "2026-10-10");
    await user.click(
      screen.getByRole("checkbox", { name: /Datenschutzerklärung/i }),
    );
    await user.click(screen.getByRole("button", { name: "Eingaben prüfen" }));

    expect(screen.getAllByText(/E-Mail-Adresse/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Enddatum/i).length).toBeGreaterThan(0);
  });

  it("übernimmt Modell und Anlass aus der vorherigen Auswahl", async () => {
    updateInquiryDraft(window.sessionStorage, {
      model: "m",
      occasion: "Hochzeit oder private Feier",
    });

    render(<InquiryForm />);

    await waitFor(() =>
      expect(
        screen.getByRole("radio", { name: "Modell M, bis 400 Personen" }),
      ).toBeChecked(),
    );
    expect(screen.getByLabelText("Anlass")).toHaveValue("Hochzeit");
  });

  it("meldet in der Vorschau ehrlich, dass nichts gesendet wurde", async () => {
    render(<InquiryForm />);
    const user = await fillValidForm();

    await user.click(screen.getByRole("button", { name: "Eingaben prüfen" }));

    expect(
      await screen.findByText(/vollständig, aber noch nicht gesendet/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "WhatsApp öffnen" })).toBeInTheDocument();
  });

  it("behandelt den Honeypot neutral", async () => {
    const { container } = render(<InquiryForm />);
    const user = await fillValidForm();
    const honeypot = container.querySelector<HTMLInputElement>(
      'input[name="website"]',
    );
    expect(honeypot).not.toBeNull();
    if (!honeypot) return;

    fireEvent.change(honeypot, { target: { value: "https://spam.invalid" } });
    await user.click(screen.getByRole("button", { name: "Eingaben prüfen" }));

    expect(
      await screen.findByText("Die Anfrage konnte nicht verarbeitet werden."),
    ).toBeInTheDocument();
  });

  it("verarbeitet den vorbereiteten JSON-Erfolg ohne Buchungsversprechen", async () => {
    vi.stubEnv("NEXT_PUBLIC_INQUIRY_ENDPOINT", "/anfrage.php");
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    });
    vi.stubGlobal("fetch", fetchMock);
    render(<InquiryForm />);
    const user = await fillValidForm();

    await user.click(screen.getByRole("button", { name: "Anfrage senden" }));

    expect(
      await screen.findByText("Vielen Dank. Ihre Anfrage ist eingegangen."),
    ).toBeInTheDocument();
    expect(screen.getByText(/noch nicht bestätigt/i)).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [, request] = fetchMock.mock.calls[0];
    expect(JSON.parse(request.body)).toMatchObject({
      name: "Mara Beispiel",
      location: "57567 Daaden",
      privacyAccepted: true,
    });
  });

  it("erhält bei einem Transportfehler alle Eingaben", async () => {
    vi.stubEnv("NEXT_PUBLIC_INQUIRY_ENDPOINT", "/anfrage.php");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    render(<InquiryForm />);
    const user = await fillValidForm();

    await user.click(screen.getByRole("button", { name: "Anfrage senden" }));

    expect(
      await screen.findByText("Die Anfrage konnte gerade nicht gesendet werden."),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Name *")).toHaveValue("Mara Beispiel");
    expect(screen.getByLabelText("E-Mail")).toHaveValue("mara@example.de");
  });

  it("verhindert einen Doppelversand während der Übertragung", async () => {
    vi.stubEnv("NEXT_PUBLIC_INQUIRY_ENDPOINT", "/anfrage.php");
    let resolveRequest: ((value: unknown) => void) | undefined;
    const fetchMock = vi.fn().mockReturnValue(
      new Promise((resolve) => {
        resolveRequest = resolve;
      }),
    );
    vi.stubGlobal("fetch", fetchMock);
    const { container } = render(<InquiryForm />);
    await fillValidForm();
    const form = container.querySelector("form");
    expect(form).not.toBeNull();
    if (!form) return;

    fireEvent.submit(form);
    fireEvent.submit(form);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Wird gesendet …" })).toBeDisabled();

    resolveRequest?.({ ok: true, json: async () => ({ ok: true }) });
    await screen.findByText("Vielen Dank. Ihre Anfrage ist eingegangen.");
  });
});

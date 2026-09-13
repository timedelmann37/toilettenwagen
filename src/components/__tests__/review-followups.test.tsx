import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { InquiryForm } from "../InquiryForm";
import { Header } from "../Header";
import { Faq } from "../Faq";

describe("Bestätigte Review-Korrekturen", () => {
  it("weist die reguläre Endreinigung als bereits enthalten aus", () => {
    render(<Faq />);
    const answer = screen.getByText(/Bitte geben Sie den Wagen besenrein zurück/);
    expect(answer).toHaveTextContent("mit 50 € bereits im Preis enthalten");
    expect(answer).toHaveTextContent("wird nicht zusätzlich berechnet");
    expect(answer).toHaveTextContent("Bei außergewöhnlicher Verschmutzung");
  });
  it("erklärt die passenden TORK-Systeme getrennt von der Erstausstattung", () => {
    render(<Faq />);
    const answer = screen.getByText(/Im Wagen S werden Tork Matic/);
    expect(answer).toHaveTextContent("Handtuchrollen H1");
    expect(answer).toHaveTextContent("Tork Express Multifold Handtücher Universal H2");
    expect(answer).toHaveTextContent("S erhält Toilettenpapier");
    expect(screen.getByText("In welche Orte liefern Sie?")).toBeInTheDocument();
    expect(screen.getByText("Darf die Rechnungsanschrift vom Aufstellort abweichen?")).toBeInTheDocument();
    expect(screen.getByText("Warum sind Telefon und E-Mail beide erforderlich?")).toBeInTheDocument();
  });
  it("beginnt mit der Modellwahl und verwendet ein kompaktes Adressfeld", () => {
    const { container } = render(<InquiryForm />);
    expect(container.querySelector("form input[name]")).toHaveAttribute("name", "model");
    expect(screen.getByLabelText("Rechnungsanschrift *").tagName).toBe("INPUT");
    expect(screen.getByLabelText("Telefon *")).toBeRequired();
    expect(screen.getByLabelText("E-Mail *")).toBeRequired();
  });

  it("hält beide Kontaktwege im Header bereit", () => {
    render(<Header />);
    const header = within(screen.getByRole("banner"));
    for (const link of header.getAllByRole("link", { name: "Zum Anfrageformular" })) {
      expect(link).toHaveAttribute("href", "/#kontakt");
    }
    expect(header.getAllByRole("link", { name: "Per WhatsApp anfragen" })).toHaveLength(2);
  });

  it("erklärt die gemeinsame Netto-Pauschale mit einem korrekten Beispiel", () => {
    render(<Faq />);
    expect(screen.getByText(/25 km Hinbringen plus 25 km Abholen/)).toHaveTextContent("85,68 €");
    expect(screen.getByText(/25 km Hinbringen plus 25 km Abholen/)).toHaveTextContent("Leerfahrten werden nicht berechnet");
    expect(screen.getByText(/Für den Abwasseranschluss empfehlen/)).toHaveTextContent("Kanaldeckel");
    expect(screen.getByText(/Wenn die Erstausstattung aufgebraucht/)).toHaveTextContent("nachkaufen");
  });
});

import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { InquiryForm } from "../InquiryForm";
import { Header } from "../Header";
import { Faq } from "../Faq";

describe("Bestätigte Review-Korrekturen", () => {
  it("bietet Selbstabholung für S und M und wechselt bei L zurück zur Lieferung", () => {
    render(<InquiryForm />);
    const form = within(screen.getByRole("form", { name: "Ihre Anfrage" }));
    fireEvent.click(form.getByRole("radio", { name: "Modell S, bis 200 Personen" }));
    fireEvent.click(form.getByRole("radio", { name: /Selbstabholung/ }));
    expect(form.getByLabelText("Gewünschter Abholtag *")).toBeInTheDocument();
    fireEvent.click(form.getByRole("radio", { name: "Modell L, bis 600 Personen" }));
    expect(form.getByRole("radio", { name: /Selbstabholung/ })).toBeDisabled();
    expect(form.getByRole("radio", { name: /^Lieferung/ })).toBeChecked();
    expect(form.getByLabelText("Gewünschter Liefertag *")).toBeInTheDocument();
  });
  it("weist Endreinigung und Desinfektion als immer berechnete Pauschale aus", () => {
    render(<Faq />);
    const answer = screen.getByText(/Bitte geben Sie den Wagen besenrein zurück/);
    expect(answer).toHaveTextContent("Endreinigung inklusive Desinfektion");
    expect(answer).toHaveTextContent("immer eine Pauschale von 50 € zusätzlich zur Miete");
    expect(answer).toHaveTextContent("auch bei besenreiner Rückgabe");
    expect(answer).toHaveTextContent("Bei außergewöhnlicher Verschmutzung");
  });
  it("erklärt die passenden TORK-Systeme getrennt von der Erstausstattung", () => {
    render(<Faq />);
    const answer = screen.getByText(/Im Wagen S werden Tork Matic/);
    expect(answer).toHaveTextContent("Handtuchrollen H1");
    expect(answer).toHaveTextContent("Tork Express Multifold Handtücher Universal H2");
    expect(answer).toHaveTextContent("Alle drei Wagen erhalten dieselbe Erstausstattung: Toilettenpapier, Seife und Papierhandtücher");
    expect(screen.queryByText(/Örtliche Informationen/)).not.toBeInTheDocument();
    expect(screen.getByText(/Auf öffentlichen Flächen müssen Sie/)).toHaveTextContent("vor der Lieferung schriftlich vorliegen");
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

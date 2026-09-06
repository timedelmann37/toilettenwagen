import { render, screen, within } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";
import { trailerModels } from "@/lib/models";

describe("Startseite", () => {
  it("zeigt Angebot, Region, Anfragewege und die Modellfamilie", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Drei Größen. Sauber gelöst.",
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Niederdreisbach/i).length).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("link", { name: "Per WhatsApp anfragen" }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getByRole("link", { name: "Anfrage vorbereiten" }),
    ).toHaveAttribute("href", "#kontakt");

    for (const model of trailerModels) {
      expect(screen.getAllByText(model.name).length).toBeGreaterThan(0);
      expect(
        screen.getAllByText(`bis ${model.capacity} Personen`).length,
      ).toBeGreaterThan(0);
    }
  });

  it("zeigt die Größenstaffel der kompakten Modellreise", () => {
    render(<Home />);

    const journeyHeading = screen.getByRole("heading", {
      level: 2,
      name: "Ein Wagen. Drei Stationen.",
    });
    const journey = journeyHeading.closest("section");
    expect(journey).not.toBeNull();
    if (!journey) return;

    for (const model of trailerModels) {
      const station = within(journey).getByRole("listitem", {
        name: `Modell ${model.name}`,
      });

      expect(
        within(station).getByRole("heading", {
          level: 3,
          name: `Modell ${model.name}`,
        }),
      ).toBeInTheDocument();
      expect(station).toHaveTextContent(`bis ${model.capacity} Personen`);
      expect(within(station).getByText(model.suitability)).toBeInTheDocument();
    }

    expect(within(journey).getAllByRole("img")).toHaveLength(1);
    expect(
      within(journey).queryByText(trailerModels[0].dimensions),
    ).not.toBeInTheDocument();
    expect(within(journey).queryByText(/netto\/Tag/)).not.toBeInTheDocument();
  });

  it("liefert ohne Client-JavaScript die Kerndaten aller Modelle aus", () => {
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain("<noscript>");
    expect(markup).toContain("Alle Modelle im Überblick");

    for (const model of trailerModels) {
      expect(markup).toContain(model.dimensions);
      expect(markup).toContain(`${model.womensCabins} Damen-WCs`);
      expect(markup).toContain(`${model.mensCabins}`);
      expect(markup).toContain(`${model.urinals} Urinale`);
    }
  });

  it("erklärt Service, faire Berechnung und alle Voraussetzungen zusammenhängend", () => {
    const { container } = render(<Home />);
    const service = container.querySelector("#service");

    expect(service).not.toBeNull();
    if (!service) return;

    const section = within(service as HTMLElement);
    expect(
      section.getByRole("heading", {
        level: 2,
        name: "Der Wagen parkt. Der Service übernimmt.",
      }),
    ).toBeInTheDocument();
    expect(section.getByText(/Liefer- und Abholtag zählen nicht als Miettage/i)).toBeInTheDocument();
    expect(section.getByText(/Lieferung und Abholung werden separat berechnet/i)).toBeInTheDocument();
    expect(section.getAllByText(/Abwasserrohre/i).length).toBeGreaterThan(0);
    expect(section.getAllByText(/Frischwasserschläuche/i).length).toBeGreaterThan(0);
    expect(section.getAllByText(/maßgefertigte Holzabdeckungen/i).length).toBeGreaterThan(0);
    expect(section.getByText(/beheizt und ganzjährig einsetzbar/i)).toBeInTheDocument();
    expect(section.getByText(/Waschbecken, Spiegel, Innen- und Außenbeleuchtung, Spülung und Tork-Papierspender/i)).toBeInTheDocument();
    expect(section.getByText(/Schwierige Aufstellungen werden lösungsorientiert geplant/i)).toBeInTheDocument();

    for (const requirement of [
      "230 V Stromanschluss",
      "Wasseranschluss",
      "Fester, ebener Untergrund",
      "Abwasseranschluss vor Ort",
      "Erforderliche Genehmigung",
    ]) {
      expect(section.getByText(requirement)).toBeInTheDocument();
    }

    expect(section.getAllByRole("img")).toHaveLength(5);
    expect(service.querySelectorAll("img")).toHaveLength(5);
    expect(
      section.getByRole("list", {
        name: "Von uns mitgebrachte Anschlüsse und Abdeckungen",
      }),
    ).toBeInTheDocument();
    expect(
      section.getByRole("list", {
        name: "Gemeinsame Ausstattung aller Wagen",
      }),
    ).toBeInTheDocument();
    expect(
      section.getByAltText(
        "Innenansicht mit Palmen- und Strandmotiv auf den Türen",
      ),
    ).toBeInTheDocument();
    expect(section.queryByText(/Eigenständig bis in die Türen/i)).not.toBeInTheDocument();
    expect(section.queryByText(/Nur Modell S/i)).not.toBeInTheDocument();
    expect(
      section.getByAltText(
        "Beleuchteter Toilettenwagen bei Nacht mit blauen Lichtlinien",
      ),
    ).toBeInTheDocument();
  });

  it("zeigt den vollständigen Ablauf und beide Vorlaufhinweise in richtiger Reihenfolge", () => {
    const { container } = render(<Home />);
    const process = container.querySelector("#ablauf");

    expect(process).not.toBeNull();
    if (!process) return;

    const section = within(process as HTMLElement);
    expect(
      section.getByRole("heading", {
        level: 2,
        name: "Von der ersten Nachricht bis zum sauberen Abschluss.",
      }),
    ).toBeInTheDocument();

    const steps = section.getAllByRole("listitem");
    expect(steps).toHaveLength(6);
    expect(steps[0]).toHaveTextContent(/WhatsApp oder Formular/i);
    expect(steps[1]).toHaveTextContent(/üblicherweise in unter zwei Stunden/i);
    expect(steps[1]).toHaveTextContent(/innerhalb unserer Erreichbarkeit/i);
    expect(steps[2]).toHaveTextContent(/Anzahlung von 30 %/i);
    expect(steps[3]).toHaveTextContent(/einen Tag vor/i);
    expect(steps[4]).toHaveTextContent(/einen Tag nach/i);
    expect(steps[5]).toHaveTextContent(/Reinigung/i);
    expect(steps[5]).toHaveTextContent(/Schlussrechnung/i);
    expect(steps[5]).toHaveTextContent(/Google-Bewertung/i);

    expect(section.getByText(/August-Hochzeiten/i)).toBeInTheDocument();
    expect(section.getByText(/etwa ein Jahr vorher/i)).toBeInTheDocument();
    expect(section.getByText(/drei bis sechs Monate Vorlauf/i)).toBeInTheDocument();
  });

  it("zeigt Einsatzgebiet, Ortsbeispiele und genau fünf echte Google-Stimmen", () => {
    const { container } = render(<Home />);
    const region = container.querySelector("#region");

    expect(region).not.toBeNull();
    if (!region) return;

    const section = within(region as HTMLElement);
    expect(
      section.getByRole("heading", {
        level: 2,
        name: "Aus Niederdreisbach. Für die Region.",
      }),
    ).toBeInTheDocument();
    expect(section.getByText(/ungefähr 125 km/i)).toBeInTheDocument();
    expect(section.getByText(/weitere Strecken sind auf Anfrage/i)).toBeInTheDocument();

    for (const place of [
      "Daaden",
      "Herdorf",
      "Neunkirchen",
      "Niederfischbach",
      "Dillenburg",
      "Haiger",
      "Westerwald",
    ]) {
      expect(section.getByText(place)).toBeInTheDocument();
    }

    expect(region.querySelectorAll("blockquote")).toHaveLength(5);
    for (const name of ["Hans D.", "Eileen D.", "Alic.", "Vivien F.", "Ralf B."]) {
      expect(section.getByText(name)).toBeInTheDocument();
    }
    expect(section.getAllByText("Google-Bewertung")).toHaveLength(5);
    expect(
      section.getByRole("link", { name: "Per WhatsApp anfragen" }),
    ).toBeInTheDocument();
  });

  it("zeigt den vollständigen Kontaktabschluss mit ehrlichem Mailer-Platzhalter", () => {
    const { container } = render(<Home />);
    const contact = container.querySelector("#kontakt");

    expect(contact).not.toBeNull();
    if (!contact) return;

    const section = within(contact as HTMLElement);
    expect(
      section.getByRole("heading", {
        level: 2,
        name: "Sag uns Ort, Termin und Anlass.",
      }),
    ).toBeInTheDocument();
    expect(section.getByText("+49 160 2743001")).toBeInTheDocument();
    expect(section.getByText("kontakt@mobile-sanitaeranlagen-hs.de")).toBeInTheDocument();
    expect(section.getByText("08:00-13:00 & 15:00-19:00")).toBeInTheDocument();
    expect(section.getByText("10:00-16:00")).toBeInTheDocument();
    expect(section.getByRole("button", { name: "Eingaben prüfen" })).toBeInTheDocument();
    expect(section.getByText(/Aktuell werden keine Angaben übertragen/i)).toBeInTheDocument();
    expect(
      section.getByRole("checkbox", { name: /Datenschutzerklärung/i }),
    ).not.toBeChecked();
  });
});

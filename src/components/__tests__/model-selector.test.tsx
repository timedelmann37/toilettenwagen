import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { ModelSelector, recommendModel } from "@/components/ModelSelector";
import {
  INQUIRY_DRAFT_STORAGE_KEY,
  PRICE_VIEW_STORAGE_KEY,
  readInquiryDraft,
} from "@/lib/inquiryDraft";
import { grossPriceCents, trailerModels } from "@/lib/models";

describe("ModelSelector", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it("startet mit Modell S und der privaten Bruttopreis-Ansicht", () => {
    render(<ModelSelector />);

    expect(
      screen.getByRole("radio", { name: "Modell S, bis 200 Personen" }),
    ).toBeChecked();
    expect(
      screen.getByRole("radio", { name: "Privat, brutto inkl. MwSt." }),
    ).toBeChecked();
    expect(screen.getByText(/208,25\s*€/)).toBeInTheDocument();
    expect(
      screen.getByText("brutto inkl. 19 % MwSt. pro Miettag"),
    ).toBeInTheDocument();
  });

  it("wechselt sämtliche sichtbaren Modelldaten gemeinsam", async () => {
    const user = userEvent.setup();
    render(<ModelSelector />);

    await user.click(
      screen.getByRole("radio", { name: "Modell M, bis 400 Personen" }),
    );

    expect(
      screen
        .getByRole("img", {
          name: "Freigestellter Toilettenwagen Modell M",
        })
        .getAttribute("src"),
    ).toContain("wagen-m-model-1600.webp");

    const modelM = screen.getByRole("article", { name: "Modell M" });
    expect(within(modelM).getByText("7,17 × 2,50 × 2,92 m")).toBeInTheDocument();
    expect(modelM).toHaveTextContent(/Kapazitätbis 400 Personen/);
    expect(modelM).toHaveTextContent(/Damen-WCs3/);
    expect(modelM).toHaveTextContent(/Herren-WCs1/);
    expect(modelM).toHaveTextContent(/Urinale3/);
    expect(within(modelM).getByText(/226,10\s*€/)).toBeInTheDocument();
    expect(
      within(modelM).getByText("Beheizt und ganzjährig einsetzbar"),
    ).toBeInTheDocument();
    expect(within(modelM).getByText("Kalt fließendes Wasser")).toBeInTheDocument();
    expect(within(modelM).queryByText("Sensorarmaturen")).not.toBeInTheDocument();

    await user.click(
      screen.getByRole("radio", { name: "Modell L, bis 600 Personen" }),
    );
    expect(
      screen
        .getByRole("img", {
          name: "Freigestellter Toilettenwagen Modell L",
        })
        .getAttribute("src"),
    ).toContain("wagen-l-model-1600.webp");
    const modelL = screen.getByRole("article", { name: "Modell L" });
    expect(within(modelL).getByText("8,77 × 2,50 × 2,92 m")).toBeInTheDocument();
    expect(modelL).toHaveTextContent(/Damen-WCs4/);
    expect(modelL).toHaveTextContent(/Herren-WCs2/);
    expect(modelL).toHaveTextContent(/Urinale6/);
    expect(within(modelL).getByText(/249,90\s*€/)).toBeInTheDocument();
    expect(within(modelL).getByText("Kalt fließendes Wasser")).toBeInTheDocument();
  });

  it("bedient die Modellwahl per Pfeiltaste und übergibt sie an das Anfrage-Draft", async () => {
    const user = userEvent.setup();
    render(<ModelSelector />);

    const modelS = screen.getByRole("radio", {
      name: "Modell S, bis 200 Personen",
    });
    modelS.focus();
    await user.keyboard("{ArrowRight}");

    expect(
      screen.getByRole("radio", { name: "Modell M, bis 400 Personen" }),
    ).toBeChecked();
    expect(readInquiryDraft(window.sessionStorage)).toEqual({ model: "m" });
  });

  it("zeigt Gewerbepreise und erhält die Preiswahl während des Seitenbesuchs", async () => {
    const user = userEvent.setup();
    const firstRender = render(<ModelSelector />);

    await user.click(screen.getByRole("radio", { name: "Gewerbe, netto" }));
    expect(screen.getByText(/175,00\s*€/)).toBeInTheDocument();
    expect(
      screen.getByText("netto zzgl. 19 % MwSt. pro Miettag"),
    ).toBeInTheDocument();
    expect(window.sessionStorage.getItem(PRICE_VIEW_STORAGE_KEY)).toBe(
      "business",
    );

    firstRender.unmount();
    render(<ModelSelector />);
    expect(screen.getByRole("radio", { name: "Gewerbe, netto" })).toBeChecked();
  });

  it("hält die vollständigen Kostenhinweise in jeder Preisansicht sichtbar", async () => {
    const user = userEvent.setup();
    render(<ModelSelector />);

    const notes = screen.getByLabelText("Kostenhinweise");
    expect(notes).toHaveTextContent("Anfahrt: 1,10 €/km, nicht im Mietpreis enthalten.");
    expect(notes).toHaveTextContent("Lieferung und Abholung werden separat berechnet.");
    expect(notes).toHaveTextContent("Liefer- und Abholtag zählen nicht als Miettage.");
    expect(notes).toHaveTextContent("Verbindlich ist das individuelle Angebot.");

    await user.click(screen.getByRole("radio", { name: "Gewerbe, netto" }));
    expect(screen.getByLabelText("Kostenhinweise")).toBeVisible();
  });

  it.each([
    [200, "s"],
    [201, "m"],
    [400, "m"],
    [401, "l"],
    [600, "l"],
  ] as const)("empfiehlt bei %i Personen Modell %s", async (count, modelId) => {
    const user = userEvent.setup();
    render(<ModelSelector />);

    await user.type(
      screen.getByRole("spinbutton", { name: "Geschätzte Personenzahl" }),
      String(count),
    );
    await user.click(screen.getByRole("button", { name: "Größe einschätzen" }));

    expect(screen.getByRole("status")).toHaveTextContent(
      `Unverbindliche Orientierung: Modell ${modelId.toUpperCase()}`,
    );
    expect(
      screen.getByRole("radio", {
        name: new RegExp(`Modell ${modelId.toUpperCase()}`),
      }),
    ).toBeChecked();
  });

  it.each(["", "0", "-2", "601", "200.5"])(
    "führt für die Angabe %s zur persönlichen Beratung",
    async (count) => {
      const user = userEvent.setup();
      render(<ModelSelector />);

      if (count) {
        await user.type(
          screen.getByRole("spinbutton", { name: "Geschätzte Personenzahl" }),
          count,
        );
      }
      await user.click(
        screen.getByRole("button", { name: "Größe einschätzen" }),
      );

      expect(screen.getByRole("status")).toHaveTextContent(
        "Persönliche Beratung empfohlen",
      );
      expect(readInquiryDraft(window.sessionStorage).model).toBeUndefined();
    },
  );

  it("übergibt empfohlenes Modell und Anlass an das spätere Formular", async () => {
    const user = userEvent.setup();
    render(<ModelSelector />);

    await user.type(
      screen.getByRole("spinbutton", { name: "Geschätzte Personenzahl" }),
      "201",
    );
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Anlass (optional)" }),
      "Hochzeit oder private Feier",
    );
    await user.click(screen.getByRole("button", { name: "Größe einschätzen" }));

    expect(readInquiryDraft(window.sessionStorage)).toEqual({
      model: "m",
      occasion: "Hochzeit oder private Feier",
    });
    expect(
      window.sessionStorage.getItem(INQUIRY_DRAFT_STORAGE_KEY),
    ).toContain('"model":"m"');
  });
});

describe("Preis- und Empfehlungsregeln", () => {
  it("berechnet alle Bruttopreise aus den Nettoquellen mit 19 Prozent", () => {
    expect(trailerModels.map((model) => grossPriceCents(model.priceNetCents))).toEqual([
      20_825,
      22_610,
      24_990,
    ]);
  });

  it("gibt außerhalb der veröffentlichten Kapazität keine automatische Empfehlung", () => {
    expect(recommendModel(Number.NaN)).toBeNull();
    expect(recommendModel(0)).toBeNull();
    expect(recommendModel(601)).toBeNull();
    expect(recommendModel(200.5)).toBeNull();
  });
});

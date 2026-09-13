import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { VehicleModelLink } from "../VehicleModelLink";
import { ModelSelector } from "../ModelSelector";

afterEach(() => vi.unstubAllGlobals());

describe("Hero-Modellwahl", () => {
  it.each([false, true])("wählt den Wagen und berücksichtigt reduzierte Bewegung: %s", (reduced) => {
    const scrollTo = vi.fn();
    vi.stubGlobal("scrollTo", scrollTo);
    vi.stubGlobal("matchMedia", () => ({ matches: reduced }));
    render(<><VehicleModelLink model="l" className="">Wagen L ansehen</VehicleModelLink><ModelSelector /></>);
    fireEvent.click(screen.getByRole("link", { name: "Wagen L auswählen und ansehen" }));
    expect(screen.getByRole("radio", { name: "Modell L, bis 600 Personen" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Modell L, bis 600 Personen" })).toHaveFocus();
    expect(screen.getByRole("heading", { name: "Modell L" })).toBeInTheDocument();
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: reduced ? "instant" : "smooth" });
  });
});

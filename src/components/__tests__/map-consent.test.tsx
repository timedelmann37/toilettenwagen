import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { MapConsent } from "@/components/MapConsent";

describe("Google-Maps-Einwilligung", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("lädt vor einer Zustimmung keinen Google-iframe", () => {
    render(<MapConsent />);

    expect(screen.queryByTitle(/Google Maps/i)).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Google Maps laden" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Ohne Karte fortfahren" }),
    ).toBeInTheDocument();
  });

  it("lädt die Karte nach Zustimmung und erlaubt eine neue Entscheidung", async () => {
    const user = userEvent.setup();
    render(<MapConsent />);

    await user.click(screen.getByRole("button", { name: "Google Maps laden" }));
    const iframe = screen.getByTitle(
      "Google Maps: Einsatzgebiet ab Niederdreisbach",
    );
    expect(iframe).toHaveAttribute("src", expect.stringContaining("google.com/maps"));
    expect(screen.getByRole("status")).toHaveTextContent(/Karte wird geladen/i);

    fireEvent.load(iframe);
    expect(screen.getByText("Google Maps ist aktiviert.")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Karteneinstellung ändern" }),
    );
    expect(screen.queryByTitle(/Google Maps/i)).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Google Maps laden" }),
    ).toBeInTheDocument();
  });

  it("respektiert Ablehnung und zeigt bei Ladefehler einen nutzbaren Fallback", async () => {
    const user = userEvent.setup();
    render(<MapConsent loadTimeoutMs={20} />);

    await user.click(
      screen.getByRole("button", { name: "Ohne Karte fortfahren" }),
    );
    expect(screen.queryByTitle(/Google Maps/i)).not.toBeInTheDocument();
    expect(
      screen.getByText("Google Maps bleibt ausgeschaltet."),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Karteneinstellung ändern" }),
    );
    await user.click(screen.getByRole("button", { name: "Google Maps laden" }));
    await waitFor(() => {
      expect(screen.queryByTitle(/Google Maps/i)).not.toBeInTheDocument();
    });
    expect(
      screen.getByText("Die Karte konnte nicht geladen werden."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Erneut versuchen" }),
    ).toBeInTheDocument();
  });
});

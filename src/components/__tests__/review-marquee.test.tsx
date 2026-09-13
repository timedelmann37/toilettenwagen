import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ReviewMarquee } from "../ReviewMarquee";
import { reviewPreview } from "@/lib/reviews";

describe("ReviewMarquee", () => {
  it("exposes each sourced review once and labels incomplete excerpts", () => {
    render(<ReviewMarquee reviews={reviewPreview} />);
    const cards = screen.getAllByRole("figure");
    expect(cards).toHaveLength(7);
    expect(screen.getAllByRole("img", { name: "5 von 5 Sternen" })).toHaveLength(7);
    expect(cards.filter(card => within(card).queryByText("Auszug aus der Rezension"))).toHaveLength(5);
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    expect(screen.queryByText("Emma Thompson")).not.toBeInTheDocument();
  });

  it("offers persistent pause and a static reading view", () => {
    render(<ReviewMarquee reviews={reviewPreview} />);
    const region = screen.getByRole("region", { name: "Google-Bewertungen" });
    fireEvent.click(screen.getByRole("button", { name: "Bewegung pausieren" }));
    expect(region).toHaveAttribute("data-running", "false");
    expect(screen.getByRole("button", { name: "Bewegung fortsetzen" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Alle Bewertungen lesen" }));
    expect(region).toHaveAttribute("data-expanded", "true");
    fireEvent.click(screen.getByRole("button", { name: "Als Laufband anzeigen" }));
    expect(region).toHaveAttribute("data-expanded", "false");
  });
});

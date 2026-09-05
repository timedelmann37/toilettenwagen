import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { navLinks, site } from "@/lib/site";

describe("App-Shell", () => {
  it("Header zeigt alle Navigationslinks", () => {
    render(<Header />);
    for (const link of navLinks) {
      expect(
        screen.getAllByRole("link", { name: link.label }).length,
      ).toBeGreaterThan(0);
    }
  });

  it("Header hat einen WhatsApp-Anfrage-CTA", () => {
    render(<Header />);
    const cta = screen.getAllByRole("link", { name: /WhatsApp/i })[0];
    expect(cta).toHaveAttribute("href", site.whatsappUrl);
  });

  it("Footer nennt den vollen Rechtsnamen und die Pflicht-Links", () => {
    render(<Footer />);
    expect(screen.getByText(site.legalName, { exact: false })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Impressum" }),
    ).toHaveAttribute("href", expect.stringContaining("/impressum"));
    expect(
      screen.getByRole("link", { name: "Datenschutz" }),
    ).toHaveAttribute("href", expect.stringContaining("/datenschutz"));
  });
});

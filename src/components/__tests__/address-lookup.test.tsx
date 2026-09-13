import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { AddressLookup } from "../AddressLookup";
import { InquiryForm } from "../InquiryForm";
import { searchAddress } from "@/lib/addressSearch";

afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

it("keeps the form address read-only until manual fallback is chosen", async () => {
  vi.useFakeTimers();
  vi.stubEnv("NEXT_PUBLIC_GEOAPIFY_API_KEY", "test-key");
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ results: [] }) }));
  render(<InquiryForm />);
  const address = screen.getByLabelText("Aufstellort: Straße, Hausnummer, PLZ und Ort *");
  expect(address).toHaveAttribute("readonly");
  fireEvent.change(within(screen.getByRole("group", { name: "Adresshilfe für Aufstellort" })).getByLabelText("PLZ"), { target: { value: "57567" } });
  await act(async () => { await vi.advanceTimersByTimeAsync(650); });
  fireEvent.click(screen.getByRole("button", { name: /Manuell eintragen/ }));
  expect(address).not.toHaveAttribute("readonly");
  expect(address).toHaveFocus();
});

it.each([
  [403, "verweigert den Zugriff"],
  [429, "Anfragelimit erreicht"],
  [503, "meldet einen Fehler"],
])("explains HTTP %s without exposing credentials", async (status, explanation) => {
  vi.useFakeTimers();
  vi.stubEnv("NEXT_PUBLIC_GEOAPIFY_API_KEY", "test-key");
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status }));
  render(<AddressLookup id="test-error" label="Testadresse" onChoose={vi.fn()} />);
  fireEvent.change(screen.getByLabelText("PLZ"), { target: { value: "57567" } });
  await act(async () => { await vi.advanceTimersByTimeAsync(650); });
  expect(screen.getByRole("status")).toHaveTextContent(explanation);
  expect(screen.getByRole("status")).not.toHaveTextContent("test-key");
});

it("filters other postcodes and duplicate streets", async () => {
  vi.stubEnv("NEXT_PUBLIC_GEOAPIFY_API_KEY", "test-key");
  const row = { country_code: "de", postcode: "57567", city: "Daaden", street: "Bahnhofstraße" };
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ results: [row, row, { ...row, postcode: "82467" }] }) }));
  expect(await searchAddress("57567", "Bahnhof", new AbortController().signal)).toEqual([{ postcode: "57567", city: "Daaden", street: "Bahnhofstraße" }]);
});

it("starts without activation, waits for input and applies a selected street with house number", async () => {
  vi.useFakeTimers();
  vi.stubEnv("NEXT_PUBLIC_GEOAPIFY_API_KEY", "test-key");
  const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ results: [{ country_code: "de", postcode: "57567", city: "Daaden", street: "Bahnhofstraße" }] }) });
  vi.stubGlobal("fetch", fetchMock);
  const choose = vi.fn();
  render(<AddressLookup id="test" label="Testadresse" onChoose={choose} />);
  await act(async () => { await vi.advanceTimersByTimeAsync(1000); });
  expect(fetchMock).not.toHaveBeenCalled();
  expect(screen.queryByRole("button", { name: "Adresssuche aktivieren" })).not.toBeInTheDocument();
  fireEvent.change(screen.getByLabelText("PLZ"), { target: { value: "57567" } });
  fireEvent.change(screen.getByRole("combobox"), { target: { value: "Bahnhof" } });
  await act(async () => { await vi.advanceTimersByTimeAsync(650); });
  fireEvent.click(screen.getByRole("option"));
  fireEvent.change(screen.getByLabelText("Hausnummer"), { target: { value: "12" } });
  fireEvent.click(screen.getByRole("button", { name: "Adresse eintragen" }));
  expect(choose).toHaveBeenCalledWith("Bahnhofstraße 12, 57567 Daaden");
  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(String(fetchMock.mock.calls[0][0])).not.toContain("12");
});

it("offers manual entry after no results and stops searching in manual mode", async () => {
  vi.useFakeTimers();
  vi.stubEnv("NEXT_PUBLIC_GEOAPIFY_API_KEY", "test-key");
  const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ results: [] }) });
  vi.stubGlobal("fetch", fetchMock);
  const manual = vi.fn();
  render(<AddressLookup id="fallback" label="Testadresse" onChoose={vi.fn()} onManualEntry={manual} />);
  expect(screen.queryByRole("button", { name: /Manuell eintragen/ })).not.toBeInTheDocument();
  fireEvent.change(screen.getByLabelText("PLZ"), { target: { value: "57567" } });
  await act(async () => { await vi.advanceTimersByTimeAsync(650); });
  fireEvent.click(screen.getByRole("button", { name: /Manuell eintragen/ }));
  expect(manual).toHaveBeenCalledOnce();
  expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
  await act(async () => { await vi.advanceTimersByTimeAsync(1000); });
  expect(fetchMock).toHaveBeenCalledTimes(1);
});

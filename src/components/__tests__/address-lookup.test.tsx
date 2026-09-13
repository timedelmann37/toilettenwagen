import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { AddressLookup } from "../AddressLookup";
import { searchAddress } from "@/lib/addressSearch";

afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

it("filters other postcodes and duplicate streets", async () => {
  vi.stubEnv("NEXT_PUBLIC_GEOAPIFY_API_KEY", "test-key");
  const row = { country_code: "de", postcode: "57567", city: "Daaden", street: "Bahnhofstraße" };
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ results: [row, row, { ...row, postcode: "82467" }] }) }));
  expect(await searchAddress("57567", "Bahnhof", new AbortController().signal)).toEqual([{ postcode: "57567", city: "Daaden", street: "Bahnhofstraße" }]);
});

it("does not query until activated and applies a selected street with manual house number", async () => {
  vi.useFakeTimers();
  vi.stubEnv("NEXT_PUBLIC_GEOAPIFY_API_KEY", "test-key");
  const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ results: [{ country_code: "de", postcode: "57567", city: "Daaden", street: "Bahnhofstraße" }] }) });
  vi.stubGlobal("fetch", fetchMock);
  const choose = vi.fn();
  render(<AddressLookup id="test" label="Testadresse" onChoose={choose} />);
  await act(async () => { await vi.advanceTimersByTimeAsync(1000); });
  expect(fetchMock).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole("button", { name: "Adresssuche aktivieren" }));
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

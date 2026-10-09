import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { InquiryForm } from "../InquiryForm";
import { searchAddressText } from "@/lib/addressSearch";

afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

it("accepts an address directly without enabling search or making requests", async () => {
  vi.useFakeTimers(); vi.stubEnv("NEXT_PUBLIC_GEOAPIFY_API_KEY", "test-key");
  const fetchMock = vi.fn(); vi.stubGlobal("fetch", fetchMock);
  render(<InquiryForm />);
  const address = screen.getByLabelText("Aufstellort: Straße, Hausnummer, PLZ und Ort *");
  expect(address).not.toHaveAttribute("readonly");
  fireEvent.change(address, { target: { value: "Bahnhofstraße 12, 57567 Daaden" } });
  await act(async () => { await vi.advanceTimersByTimeAsync(1000); });
  expect(address).toHaveValue("Bahnhofstraße 12, 57567 Daaden");
  expect(fetchMock).not.toHaveBeenCalled();
});

it("applies keyboard suggestions in the same input and preserves editing", async () => {
  vi.useFakeTimers(); vi.stubEnv("NEXT_PUBLIC_GEOAPIFY_API_KEY", "test-key");
  const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ results: [{ country_code: "de", postcode: "57567", city: "Daaden", street: "Bahnhofstraße", housenumber: "12" }] }) });
  vi.stubGlobal("fetch", fetchMock); render(<InquiryForm />);
  fireEvent.click(screen.getAllByLabelText("Adressvorschläge verwenden")[0]);
  const address = screen.getByLabelText("Aufstellort: Straße, Hausnummer, PLZ und Ort *");
  fireEvent.focus(address); fireEvent.change(address, { target: { value: "Bahnhofstraße 12, Daaden" } });
  await act(async () => { await vi.advanceTimersByTimeAsync(650); });
  expect(screen.getByRole("option", { name: "Bahnhofstraße 12, 57567 Daaden" })).toHaveTextContent("Bahnhofstraße 12, 57567 Daaden");
  fireEvent.keyDown(address, { key: "ArrowDown" }); fireEvent.keyDown(address, { key: "Enter" });
  expect(address).toHaveValue("Bahnhofstraße 12, 57567 Daaden");
  expect(screen.queryByRole("option", { name: "Bahnhofstraße 12, 57567 Daaden" })).not.toBeInTheDocument();
  fireEvent.click(screen.getAllByLabelText("Adressvorschläge verwenden")[0]);
  fireEvent.change(address, { target: { value: "Bahnhofstraße 12a, 57567 Daaden" } });
  await act(async () => { await vi.advanceTimersByTimeAsync(1000); });
  expect(fetchMock).toHaveBeenCalledTimes(1);
});

it("retains typed text when the service fails", async () => {
  vi.useFakeTimers(); vi.stubEnv("NEXT_PUBLIC_GEOAPIFY_API_KEY", "test-key");
  vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline"))); render(<InquiryForm />);
  fireEvent.click(screen.getAllByLabelText("Adressvorschläge verwenden")[0]);
  const address = screen.getByLabelText("Aufstellort: Straße, Hausnummer, PLZ und Ort *");
  fireEvent.focus(address); fireEvent.change(address, { target: { value: "Meine Adresse" } });
  await act(async () => { await vi.advanceTimersByTimeAsync(650); });
  expect(address).toHaveValue("Meine Adresse");
  expect(screen.getByRole("status")).toHaveTextContent("weiter eingeben");
});

it("filters foreign results and deduplicates complete suggestions", async () => {
  vi.stubEnv("NEXT_PUBLIC_GEOAPIFY_API_KEY", "test-key");
  const row = { country_code: "de", postcode: "57567", city: "Daaden", street: "Bahnhofstraße", housenumber: "12" };
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ results: [row, row, { ...row, country_code: "at" }] }) }));
  expect(await searchAddressText("Bahnhofstraße 12", new AbortController().signal)).toEqual(["Bahnhofstraße 12, 57567 Daaden"]);
});

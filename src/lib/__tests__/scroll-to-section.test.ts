import { afterEach, expect, it, vi } from "vitest";
import { scrollToSection } from "../scrollToSection";

afterEach(() => { window.dispatchEvent(new Event("wheel")); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

function setup(reduced = false) {
  const scroll = vi.fn();
  const frames: FrameRequestCallback[] = [];
  vi.stubGlobal("scrollTo", scroll);
  vi.stubGlobal("scrollY", 0);
  vi.stubGlobal("matchMedia", () => ({ matches: reduced }));
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => { frames.push(callback); return frames.length; });
  vi.stubGlobal("cancelAnimationFrame", vi.fn());
  vi.spyOn(document.documentElement, "scrollHeight", "get").mockReturnValue(10000);
  return { scroll, frames };
}

it("accelerates, slows at the destination and reaches the exact target", () => {
  const { scroll, frames } = setup();
  scrollToSection(2500); // 900 ms at this distance.
  frames.shift()!(0);
  frames.shift()!(225);
  expect(scroll).toHaveBeenLastCalledWith({ top: 156.25, behavior: "instant" });
  frames.shift()!(450);
  expect(scroll).toHaveBeenLastCalledWith({ top: 1250, behavior: "instant" });
  frames.shift()!(675);
  expect(scroll).toHaveBeenLastCalledWith({ top: 2343.75, behavior: "instant" });
  frames.shift()!(900);
  expect(scroll).toHaveBeenLastCalledWith({ top: 2500, behavior: "instant" });
  expect(frames).toHaveLength(0);
});

it("cancels on manual scrolling", () => {
  setup();
  scrollToSection(2500);
  window.dispatchEvent(new Event("wheel"));
  expect(cancelAnimationFrame).toHaveBeenCalledWith(1);
});

it("moves immediately for reduced motion", () => {
  const { scroll, frames } = setup(true);
  scrollToSection(2500);
  expect(scroll).toHaveBeenCalledWith({ top: 2500, behavior: "instant" });
  expect(frames).toHaveLength(0);
});

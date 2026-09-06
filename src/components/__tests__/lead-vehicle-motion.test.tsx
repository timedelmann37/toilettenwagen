import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LeadVehicleMotion } from "../LeadVehicleMotion";
import { ModelJourney } from "../ModelJourney";

let motionAllowed = true;
const modeChange = new EventTarget();

function mountMotion() {
  const view = render(
    <>
      <div data-lead-origin><picture /></div>
      <ModelJourney />
      <LeadVehicleMotion />
    </>,
  );
  act(() => vi.advanceTimersByTime(32));
  return view;
}

beforeEach(() => {
  vi.useFakeTimers();
  motionAllowed = true;
  vi.stubGlobal("innerHeight", 720);
  vi.stubGlobal("innerWidth", 1280);
  vi.stubGlobal("scrollY", 1108);
  vi.stubGlobal("scrollTo", vi.fn());
  vi.stubGlobal("matchMedia", () => ({
    get matches() { return motionAllowed; },
    addEventListener: modeChange.addEventListener.bind(modeChange),
    removeEventListener: modeChange.removeEventListener.bind(modeChange),
  }));
  vi.spyOn(HTMLImageElement.prototype, "complete", "get").mockReturnValue(true);
  vi.spyOn(HTMLImageElement.prototype, "naturalWidth", "get").mockReturnValue(1600);
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (this: HTMLElement) {
    const model = this.getAttribute("data-lead-stop");
    const index = ["s", "m", "l"].indexOf(model ?? "");
    if (index >= 0) return new DOMRect(0, 1180 + index * 560 - window.scrollY, 440, 368);
    if (this.hasAttribute("data-lead-origin")) return new DOMRect(500, 400 - window.scrollY, 400, 307.25);
    if (this.tagName === "PICTURE") return new DOMRect(500, 400 - window.scrollY, 400, 307.25);
    return new DOMRect(650, 72, 550, 648);
  });
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("LeadVehicleMotion browser input", () => {
  it("keeps S in its hero position at document top on a tall desktop", () => {
    vi.stubGlobal("innerHeight", 2160);
    vi.stubGlobal("scrollY", 0);
    const view = mountMotion();
    expect(view.container.querySelector('[data-lead-model="s"]')).toHaveStyle({
      transform: "translate3d(500px, 400px, 0) scale(0.25)",
    });
  });

  it("never cancels sustained wheel input, immediate reversal or the L exit", () => {
    const view = mountMotion();
    expect(view.container.querySelector("[data-lead-enabled]")).not.toBeNull();

    const cancelled: boolean[] = [];
    for (let index = 0; index < 50; index++) {
      vi.stubGlobal("scrollY", index < 25 ? 1108 : 1948);
      const event = new WheelEvent("wheel", {
        deltaY: index % 3 === 0 ? -24 : 24,
        cancelable: true,
      });
      window.dispatchEvent(event);
      cancelled.push(event.defaultPrevented);
      act(() => vi.advanceTimersByTime(30));
    }
    expect(cancelled.some(Boolean)).toBe(false);
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it("restores the static vehicles when reduced motion is enabled during use", () => {
    const view = mountMotion();
    const source = view.container.querySelector("[data-lead-origin] picture");
    expect(source).toHaveStyle({ visibility: "hidden" });
    act(() => {
      motionAllowed = false;
      modeChange.dispatchEvent(new Event("change"));
    });
    expect(view.container.querySelector("[data-lead-enabled]")).toBeNull();
    expect(source).not.toHaveStyle({ visibility: "hidden" });
    expect(view.container.querySelector("[data-lead-stage-vehicles]"))
      .not.toHaveStyle({ visibility: "hidden" });
  });

  it("keeps the static presentation when motion is unavailable", () => {
    motionAllowed = false;
    const view = mountMotion();
    expect(view.container.querySelector("[data-lead-enabled]")).toBeNull();
    expect(view.container.querySelector("[data-lead-origin] picture"))
      .not.toHaveStyle({ visibility: "hidden" });
  });
});

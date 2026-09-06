import { describe, expect, it } from "vitest";
import { getLeadWheelAction } from "../leadScrollStep";

const anchors = {
  s: 1108,
  m: 1828,
  l: 2548,
};

describe("getLeadWheelAction", () => {
  it("führt von S pro freigegebenem Abwärtsgestus genau zu M", () => {
    expect(
      getLeadWheelAction({
        scrollY: anchors.s,
        deltaY: 760,
        anchors,
        locked: false,
        entryStart: 640,
      }),
    ).toEqual({ type: "snap", model: "m", target: anchors.m });
  });

  it("blockiert Folgeereignisse desselben Gestus statt M zu überspringen", () => {
    expect(
      getLeadWheelAction({
        scrollY: anchors.m,
        deltaY: 760,
        anchors,
        locked: true,
        entryStart: 640,
      }),
    ).toEqual({ type: "hold" });
  });

  it("führt den nächsten freigegebenen Gestus von M zu L", () => {
    expect(
      getLeadWheelAction({
        scrollY: anchors.m,
        deltaY: 760,
        anchors,
        locked: false,
        entryStart: 640,
      }),
    ).toEqual({ type: "snap", model: "l", target: anchors.l });
  });

  it("gibt den normalen Dokumentfluss an den äußeren Grenzen frei", () => {
    expect(
      getLeadWheelAction({
        scrollY: anchors.s,
        deltaY: -240,
        anchors,
        locked: false,
        entryStart: 640,
      }),
    ).toEqual({ type: "release" });
    expect(
      getLeadWheelAction({
        scrollY: anchors.l,
        deltaY: 240,
        anchors,
        locked: false,
        entryStart: 640,
      }),
    ).toEqual({ type: "release" });
  });

  it("holt einen Abwärtsgestus im Übergang zuerst an die S-Station", () => {
    expect(
      getLeadWheelAction({
        scrollY: 820,
        deltaY: 180,
        anchors,
        locked: false,
        entryStart: 640,
      }),
    ).toEqual({ type: "snap", model: "s", target: anchors.s });
  });
});

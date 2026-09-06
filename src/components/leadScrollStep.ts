export type LeadModel = "s" | "m" | "l";

type LeadWheelAction =
  | { type: "release" }
  | { type: "hold" }
  | { type: "snap"; model: LeadModel; target: number };

type LeadWheelInput = {
  scrollY: number;
  deltaY: number;
  anchors: Record<LeadModel, number>;
  locked: boolean;
  entryStart: number;
};

const edgeTolerance = 32;

export function getLeadWheelAction({
  scrollY,
  deltaY,
  anchors,
  locked,
  entryStart,
}: LeadWheelInput): LeadWheelAction {
  if (locked) return { type: "hold" };
  if (deltaY === 0 || scrollY < entryStart || scrollY > anchors.l + edgeTolerance) {
    return { type: "release" };
  }

  if (deltaY > 0) {
    if (scrollY >= anchors.l - edgeTolerance) return { type: "release" };
    if (scrollY < anchors.s - edgeTolerance) {
      return { type: "snap", model: "s", target: anchors.s };
    }
    if (scrollY < anchors.m - edgeTolerance) {
      return { type: "snap", model: "m", target: anchors.m };
    }
    return { type: "snap", model: "l", target: anchors.l };
  }

  if (scrollY <= anchors.s + edgeTolerance) return { type: "release" };
  if (scrollY > anchors.m + edgeTolerance) {
    return { type: "snap", model: "m", target: anchors.m };
  }
  return { type: "snap", model: "s", target: anchors.s };
}

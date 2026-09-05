import type { TrailerModelId } from "@/lib/models";

export const INQUIRY_DRAFT_STORAGE_KEY = "mshs.inquiry-draft.v1";
export const INQUIRY_DRAFT_EVENT = "mshs:inquiry-draft-change";
export const PRICE_VIEW_STORAGE_KEY = "mshs.price-view.v1";

export type InquiryDraft = {
  model?: TrailerModelId;
  occasion?: string;
};

type DraftPatch = {
  model?: TrailerModelId | null;
  occasion?: string | null;
};

const modelIds: readonly TrailerModelId[] = ["s", "m", "l"];

function isModelId(value: unknown): value is TrailerModelId {
  return typeof value === "string" && modelIds.includes(value as TrailerModelId);
}

export function readInquiryDraft(
  storage: Pick<Storage, "getItem">,
): InquiryDraft {
  try {
    const stored = storage.getItem(INQUIRY_DRAFT_STORAGE_KEY);
    if (!stored) return {};

    const parsed: unknown = JSON.parse(stored);
    if (!parsed || typeof parsed !== "object") return {};

    const candidate = parsed as Record<string, unknown>;
    return {
      ...(isModelId(candidate.model) ? { model: candidate.model } : {}),
      ...(typeof candidate.occasion === "string" && candidate.occasion
        ? { occasion: candidate.occasion }
        : {}),
    };
  } catch {
    return {};
  }
}

export function updateInquiryDraft(
  storage: Pick<Storage, "getItem" | "setItem">,
  patch: DraftPatch,
) {
  const current = readInquiryDraft(storage);
  const next: InquiryDraft = {
    ...current,
    ...(patch.model ? { model: patch.model } : {}),
    ...(patch.occasion ? { occasion: patch.occasion } : {}),
  };

  if (patch.model === null) delete next.model;
  if (patch.occasion === null) delete next.occasion;
  storage.setItem(INQUIRY_DRAFT_STORAGE_KEY, JSON.stringify(next));

  return next;
}

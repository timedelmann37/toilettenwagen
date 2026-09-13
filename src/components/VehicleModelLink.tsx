"use client";

import type { MouseEvent, ReactNode } from "react";
import type { TrailerModelId } from "@/lib/models";
import { scrollToSection } from "@/lib/scrollToSection";

export function VehicleModelLink({ model, className, children }: {
  model: TrailerModelId;
  className: string;
  children: ReactNode;
}) {
  function selectAndScroll(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const input = document.getElementById(`model-choice-${model}`);
    const picker = document.getElementById("modellauswahl");
    if (!(input instanceof HTMLInputElement) || !picker) return;
    event.preventDefault();
    // Reuse the selector's selection, draft and accessibility behavior.
    input.click();
    input.focus({ preventScroll: true });
    const headerHeight = document.getElementById("site-header")?.getBoundingClientRect().height ?? 0;
    scrollToSection(window.scrollY + picker.getBoundingClientRect().top - headerHeight - 16);
  }

  return <a href="#modellauswahl" className={className} aria-label={`Wagen ${model.toUpperCase()} auswählen und ansehen`} onClick={selectAndScroll}>{children}</a>;
}

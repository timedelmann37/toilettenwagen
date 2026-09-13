let cancelCurrentScroll: (() => void) | undefined;

/** Only animates explicit navigation; wheel, touch and keyboard remain native. */
export function scrollToSection(top: number) {
  cancelCurrentScroll?.();
  const start = window.scrollY;
  const target = Math.max(0, Math.min(top, document.documentElement.scrollHeight - window.innerHeight));
  const distance = target - start;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || Math.abs(distance) < 1) {
    window.scrollTo({ top: target, behavior: "instant" });
    return;
  }
  const duration = Math.min(1050, 500 + Math.sqrt(Math.abs(distance)) * 8);
  let frame = 0;
  let started: number | undefined;
  function cancel() {
    cancelAnimationFrame(frame);
    window.removeEventListener("wheel", cancel);
    window.removeEventListener("touchstart", cancel);
    window.removeEventListener("pointerdown", cancel);
    window.removeEventListener("keydown", cancel);
    if (cancelCurrentScroll === cancel) cancelCurrentScroll = undefined;
  }
  function step(now: number) {
    started ??= now;
    const progress = Math.min(1, (now - started) / duration);
    const eased = progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
    window.scrollTo({ top: start + distance * eased, behavior: "instant" });
    if (progress < 1) frame = requestAnimationFrame(step);
    else cancel();
  }
  cancelCurrentScroll = cancel;
  window.addEventListener("wheel", cancel, { passive: true });
  window.addEventListener("touchstart", cancel, { passive: true });
  window.addEventListener("pointerdown", cancel, { passive: true });
  window.addEventListener("keydown", cancel);
  frame = requestAnimationFrame(step);
}

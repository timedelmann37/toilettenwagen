"use client";

import { useEffect, useRef } from "react";
import type { TrailerModelId } from "@/lib/models";
import { VehicleImage, vehicleAssets } from "./VehicleImage";
import styles from "./LeadVehicleMotion.module.css";

type LeadModel = TrailerModelId;

type LeadPose = {
  right: number;
  centerY: number;
  width: number;
};

type MotionMetrics = {
  origin: LeadPose;
  handoffOrigin: LeadPose;
  handoffStart: number;
  handoffArrival: number;
  handoffEnd: number;
  releaseStart: number;
  railX: number;
  anchors: Record<LeadModel, number>;
  poses: Record<LeadModel, LeadPose>;
};

const modelOrder: LeadModel[] = ["s", "m", "l"];

const modelDimensions = vehicleAssets;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

const smoothstep = (start: number, end: number, value: number) => {
  if (start === end) return value >= end ? 1 : 0;
  const progress = clamp01((value - start) / (end - start));
  return progress * progress * (3 - 2 * progress);
};

const smootherstep = (start: number, end: number, value: number) => {
  if (start === end) return value >= end ? 1 : 0;
  const progress = clamp01((value - start) / (end - start));
  return (
    progress * progress * progress * (progress * (progress * 6 - 15) + 10)
  );
};

const mix = (from: number, to: number, progress: number) =>
  from + (to - from) * progress;

const mixPose = (from: LeadPose, to: LeadPose, progress: number): LeadPose => ({
  right: mix(from.right, to.right, progress),
  centerY: mix(from.centerY, to.centerY, progress),
  width: mix(from.width, to.width, progress),
});

export function LeadVehicleMotion() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLSpanElement>(null);
  const sRef = useRef<HTMLDivElement>(null);
  const mRef = useRef<HTMLDivElement>(null);
  const lRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const modelLabel = markerRef.current;
    const origin = document.querySelector<HTMLElement>("[data-lead-origin]");
    const journey = document.querySelector<HTMLElement>("[data-lead-journey]");
    const stage = document.querySelector<HTMLElement>("[data-lead-stage]");
    const sourcePicture = origin?.querySelector<HTMLElement>("picture");
    const stageVehicles = stage?.querySelector<HTMLElement>(
      "[data-lead-stage-vehicles]",
    );
    const layers: Record<LeadModel, HTMLDivElement | null> = {
      s: sRef.current,
      m: mRef.current,
      l: lRef.current,
    };
    const overlayImages = Array.from(
      overlay?.querySelectorAll<HTMLImageElement>("img") ?? [],
    );
    const stops: Record<LeadModel, HTMLElement | null> = {
      s: document.querySelector<HTMLElement>('[data-lead-stop="s"]'),
      m: document.querySelector<HTMLElement>('[data-lead-stop="m"]'),
      l: document.querySelector<HTMLElement>('[data-lead-stop="l"]'),
    };
    const levels: Record<LeadModel, HTMLElement | null> = {
      s: document.querySelector<HTMLElement>('[data-lead-level="s"]'),
      m: document.querySelector<HTMLElement>('[data-lead-level="m"]'),
      l: document.querySelector<HTMLElement>('[data-lead-level="l"]'),
    };

    if (
      !overlay ||
      !modelLabel ||
      !origin ||
      !journey ||
      !stage ||
      !sourcePicture ||
      !stageVehicles ||
      overlayImages.length !== modelOrder.length ||
      modelOrder.some(
        (model) => !layers[model] || !stops[model] || !levels[model],
      ) ||
      typeof window.matchMedia !== "function"
    ) {
      return;
    }

    const motionQuery = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    );
    let metrics: MotionMetrics | null = null;
    let frame = 0;
    let activationFrame = 0;
    let enabled = false;
    let activeModel = "";

    const setActiveModel = (model: LeadModel) => {
      if (activeModel === model) return;
      activeModel = model;
      modelLabel.textContent = model.toUpperCase();

      for (const key of modelOrder) {
        stops[key]?.toggleAttribute("data-lead-active", key === model);
      }
    };

    const clearLayerPresentation = (model: LeadModel) => {
      const layer = layers[model]!;
      layer.removeAttribute("data-lead-visible");
      layer.removeAttribute("data-lead-morph");
      layer.style.removeProperty("--morph-edge");
      layer.style.removeProperty("--morph-blur");
    };

    const showSingleModel = (model: LeadModel) => {
      for (const key of modelOrder) clearLayerPresentation(key);
      layers[model]!.setAttribute("data-lead-visible", "true");
    };

    const showModelMorph = (
      from: LeadModel,
      to: LeadModel,
      progress: number,
    ) => {
      for (const key of modelOrder) clearLayerPresentation(key);

      const edge = mix(112, -12, progress);
      const blur = Math.sin(progress * Math.PI) * 0.8;
      const fromLayer = layers[from]!;
      const toLayer = layers[to]!;

      fromLayer.setAttribute("data-lead-visible", "true");
      fromLayer.setAttribute("data-lead-morph", "out");
      fromLayer.style.setProperty("--morph-edge", `${edge}%`);
      fromLayer.style.setProperty("--morph-blur", `${blur}px`);

      toLayer.setAttribute("data-lead-visible", "true");
      toLayer.setAttribute("data-lead-morph", "in");
      toLayer.style.setProperty("--morph-edge", `${edge}%`);
      toLayer.style.setProperty("--morph-blur", `${blur}px`);
    };

    const measure = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const sourceRect = sourcePicture.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();
      const stickyTop =
        Number.parseFloat(window.getComputedStyle(stage).top) || 72;
      const stageWidth = stageRect.width;
      const rightInset = Math.min(36, stageWidth * 0.045);
      const stageRight = stageRect.right;
      const desiredWidths: Record<LeadModel, number> = {
        s: Math.min(stageWidth * 0.64, window.innerWidth * 0.32),
        m: Math.min(stageWidth * 0.76, window.innerWidth * 0.37),
        l: Math.min(stageWidth * 0.87, window.innerWidth * 0.41),
      };
      const levelCenters = Object.fromEntries(
        modelOrder.map((model) => {
          const levelRect = levels[model]!.getBoundingClientRect();
          return [
            model,
            stickyTop + levelRect.top - stageRect.top + levelRect.height / 2,
          ];
        }),
      ) as Record<LeadModel, number>;
      const stopRects = Object.fromEntries(
        modelOrder.map((model) => [model, stops[model]!.getBoundingClientRect()]),
      ) as Record<LeadModel, DOMRect>;
      // Each reading moment aligns the model copy with its rail level.
      // These are animation landmarks, never targets for browser scrolling.
      const anchors = Object.fromEntries(
        modelOrder.map((model) => [
          model,
          stopRects[model].top + scrollY + stopRects[model].height / 2 - levelCenters[model],
        ]),
      ) as Record<LeadModel, number>;
      const originPose: LeadPose = {
        right: sourceRect.right,
        centerY: sourceRect.top + scrollY + sourceRect.height / 2,
        width: sourceRect.width,
      };
      const handoffStart = Math.max(
        0,
        origin.getBoundingClientRect().bottom + scrollY - viewportHeight * 0.62,
      );
      const settleDistance = Math.min(38, viewportHeight * 0.045);
      const stageContainerRect = stage.parentElement!.getBoundingClientRect();
      const releaseStart =
        stageContainerRect.bottom +
        scrollY -
        stageRect.height -
        stickyTop;

      metrics = {
        origin: originPose,
        handoffOrigin: {
          ...originPose,
          centerY: originPose.centerY - handoffStart,
        },
        handoffStart,
        handoffArrival: anchors.s - settleDistance,
        handoffEnd: releaseStart + viewportHeight,
        releaseStart,
        railX: stageRight,
        anchors,
        poses: {
          s: {
            right: stageRight - rightInset,
            centerY: levelCenters.s,
            width: desiredWidths.s,
          },
          m: {
            right: stageRight - rightInset,
            centerY: levelCenters.m,
            width: desiredWidths.m,
          },
          l: {
            right: stageRight - rightInset,
            centerY: levelCenters.l,
            width: desiredWidths.l,
          },
        },
      };
    };

    const placeLayer = (
      layer: HTMLDivElement,
      model: LeadModel,
      pose: LeadPose,
    ) => {
      const dimensions = modelDimensions[model];
      const scale = pose.width / dimensions.width;
      const renderedHeight = dimensions.height * scale;
      const x = pose.right - pose.width;
      const y = pose.centerY - renderedHeight / 2;
      layer.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    };

    const update = () => {
      frame = 0;
      if (!enabled || !metrics) return;

      const scrollY = window.scrollY;
      const movingOrigin: LeadPose = {
        ...metrics.origin,
        centerY: metrics.origin.centerY - scrollY,
      };
      let pose: LeadPose;
      let model: LeadModel;
      let morph:
        | { from: LeadModel; to: LeadModel; progress: number }
        | undefined;

      if (scrollY <= metrics.handoffStart) {
        pose = movingOrigin;
        model = "s";
      } else if (scrollY < metrics.handoffArrival) {
        const travel = smoothstep(
          metrics.handoffStart,
          metrics.handoffArrival,
          scrollY,
        );
        pose = {
          ...mixPose(metrics.handoffOrigin, metrics.poses.s, travel),
          right: mix(
            metrics.handoffOrigin.right,
            metrics.poses.s.right,
            smoothstep(0, 0.58, travel),
          ),
        };
        model = "s";
      } else if (scrollY <= metrics.anchors.s) {
        pose = metrics.poses.s;
        model = "s";
      } else if (scrollY < metrics.anchors.m) {
        const linearTravel = clamp01(
          (scrollY - metrics.anchors.s) /
            (metrics.anchors.m - metrics.anchors.s),
        );
        const travel = smootherstep(0.16, 0.84, linearTravel);
        const morphProgress = smoothstep(0.3, 0.7, linearTravel);
        pose = mixPose(metrics.poses.s, metrics.poses.m, travel);
        model = morphProgress < 0.5 ? "s" : "m";
        morph = { from: "s", to: "m", progress: morphProgress };
      } else if (scrollY < metrics.anchors.l) {
        const linearTravel = clamp01(
          (scrollY - metrics.anchors.m) /
            (metrics.anchors.l - metrics.anchors.m),
        );
        const travel = smootherstep(0.16, 0.84, linearTravel);
        const morphProgress = smoothstep(0.3, 0.7, linearTravel);
        pose = mixPose(metrics.poses.m, metrics.poses.l, travel);
        model = morphProgress < 0.5 ? "m" : "l";
        morph = { from: "m", to: "l", progress: morphProgress };
      } else {
        pose = {
          ...metrics.poses.l,
          centerY:
            metrics.poses.l.centerY -
            Math.max(0, scrollY - metrics.releaseStart),
        };
        model = "l";
      }

      for (const key of modelOrder) {
        placeLayer(layers[key]!, key, pose);
      }

      if (morph && morph.progress > 0 && morph.progress < 1) {
        showModelMorph(morph.from, morph.to, morph.progress);
      } else {
        showSingleModel(model);
      }

      const isVisible = scrollY < metrics.handoffEnd;
      const hasReachedRail = smoothstep(
        metrics.handoffStart,
        metrics.handoffArrival,
        scrollY,
      );
      const isMoving =
        (scrollY > metrics.handoffStart && scrollY < metrics.handoffArrival) ||
        (scrollY > metrics.anchors.s && scrollY < metrics.anchors.m) ||
        (scrollY > metrics.anchors.m && scrollY < metrics.anchors.l) ||
        scrollY > metrics.releaseStart;

      overlay.style.opacity = isVisible ? "1" : "0";
      overlay.toggleAttribute("data-lead-moving", isMoving);
      modelLabel.style.opacity = `${hasReachedRail * (isVisible ? 1 : 0)}`;
      modelLabel.style.transform = `translate3d(${metrics.railX - 20.8}px, ${pose.centerY - 20.8}px, 0)`;
      setActiveModel(model);
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    const scheduleMeasure = () => {
      if (!enabled) return;
      if (frame) window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        measure();
        update();
      });
    };

    const disable = () => {
      if (activationFrame) window.cancelAnimationFrame(activationFrame);
      activationFrame = 0;
      enabled = false;
      metrics = null;
      activeModel = "";
      journey.removeAttribute("data-lead-motion");
      overlay.removeAttribute("data-lead-enabled");
      overlay.removeAttribute("data-lead-moving");
      overlay.removeAttribute("style");
      modelLabel.removeAttribute("style");
      sourcePicture.style.removeProperty("visibility");
      stageVehicles.style.removeProperty("visibility");

      for (const model of modelOrder) {
        layers[model]?.removeAttribute("data-lead-visible");
        layers[model]?.removeAttribute("data-lead-morph");
        layers[model]?.removeAttribute("style");
        stops[model]?.removeAttribute("data-lead-active");
      }
    };

    const enable = () => {
      if (enabled || !motionQuery.matches) return;
      enabled = true;
      journey.setAttribute("data-lead-motion", "active");
      activationFrame = window.requestAnimationFrame(() => {
        activationFrame = 0;
        if (!enabled) return;
        measure();
        update();
        sourcePicture.style.visibility = "hidden";
        stageVehicles.style.visibility = "hidden";
        overlay.setAttribute("data-lead-enabled", "true");
      });
    };

    const syncMode = () => {
      if (!motionQuery.matches) {
        disable();
        return;
      }

      if (
        overlayImages.every((image) => image.complete && image.naturalWidth > 0)
      ) {
        enable();
      }
    };

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleMeasure);
    motionQuery.addEventListener("change", syncMode);
    for (const image of overlayImages) image.addEventListener("load", syncMode);
    document.fonts?.ready.then(scheduleMeasure);
    syncMode();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleMeasure);
      motionQuery.removeEventListener("change", syncMode);
      for (const image of overlayImages) {
        image.removeEventListener("load", syncMode);
      }
      disable();
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      className={styles.leadVehicle}
      data-lead-overlay
      aria-hidden="true"
    >
      <div ref={sRef} className={styles.vehicleLayer} data-lead-model="s">
        <VehicleImage model="s" alt="" sizes="43vw" loading="eager" />
      </div>
      <div ref={mRef} className={styles.vehicleLayer} data-lead-model="m">
        <VehicleImage model="m" alt="" sizes="43vw" loading="eager" />
      </div>
      <div ref={lRef} className={styles.vehicleLayer} data-lead-model="l">
        <VehicleImage model="l" alt="" sizes="43vw" loading="eager" />
      </div>
      <span ref={markerRef} className={styles.modelMarker}>
        S
      </span>
    </div>
  );
}

"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import styles from "./family-unfold.module.css";

// Four variants of the same product-family idea, switchable via `?variant=`.
// A4 answers whether one persistent wagon should guide the vertical story.
type Variant = "a1" | "a2" | "a3" | "a4";
type ModelId = "S" | "M" | "L";
type DetailKey = "raum" | "komfort" | "vorOrt";

type Model = {
  id: ModelId;
  title: string;
  capacity: string;
  dimensions: string;
  layout: string;
  price: string;
  comfort: string;
};

const models: readonly Model[] = [
  {
    id: "S",
    title: "Kompakt für kleinere Veranstaltungen.",
    capacity: "bis ca. 200 Personen",
    dimensions: "5,67 × 2,50 × 3,00 m",
    layout: "2 Damen · 1 Herren · 2 Urinale",
    price: "ab 175 € netto / Tag",
    comfort: "Heizung, warmes und kaltes Wasser sowie Sensorarmaturen.",
  },
  {
    id: "M",
    title: "Mehr Kapazität für mittlere Veranstaltungen.",
    capacity: "bis ca. 400 Personen",
    dimensions: "7,17 × 2,50 × 2,92 m",
    layout: "3 Damen · 1 Herren · 3 Urinale",
    price: "ab 190 € netto / Tag",
    comfort: "Heizung, kalt fließendes Wasser, Waschbecken und Spiegel.",
  },
  {
    id: "L",
    title: "Die große Lösung für viele Gäste.",
    capacity: "bis ca. 600 Personen",
    dimensions: "8,77 × 2,50 × 2,92 m",
    layout: "4 Damen · 2 Herren · 6 Urinale",
    price: "ab 210 € netto / Tag",
    comfort: "Heizung, kalt fließendes Wasser, Waschbecken und Spiegel.",
  },
] as const;

const variants: readonly { id: Variant; name: string }[] = [
  { id: "a1", name: "Symmetrisch" },
  { id: "a2", name: "Nacheinander" },
  { id: "a3", name: "Leichter Fächer" },
  { id: "a4", name: "Leitwagen" },
] as const;

const choreography: Record<
  Exclude<Variant, "a4">,
  readonly { startX: number; startY: number; startRotate: number; delay: number }[]
> = {
  a1: [
    { startX: -15, startY: 2, startRotate: -3, delay: 0 },
    { startX: 0, startY: -1, startRotate: 0, delay: 0 },
    { startX: 15, startY: 2, startRotate: 3, delay: 0 },
  ],
  a2: [
    { startX: -17, startY: 3, startRotate: -2, delay: 0 },
    { startX: 0, startY: 0, startRotate: 0, delay: 0.06 },
    { startX: 17, startY: -3, startRotate: 2, delay: 0.12 },
  ],
  a3: [
    { startX: -13, startY: 6, startRotate: -7, delay: 0 },
    { startX: 0, startY: 0, startRotate: 0, delay: 0.04 },
    { startX: 13, startY: -5, startRotate: 7, delay: 0.08 },
  ],
};

type MotionPoint = {
  at: number;
  x: number;
  y: number;
  scale: number;
  length: number;
  rotate: number;
};

type RevealWindow = {
  enterStart: number;
  enterEnd: number;
  exitStart: number;
  exitEnd: number;
};

const companionMotion: readonly MotionPoint[] = [
  { at: 0, x: -7, y: 11, scale: 0.492, length: 1, rotate: -2 },
  { at: 0.11, x: 20, y: -18, scale: 0.52, length: 1, rotate: 0 },
  { at: 0.28, x: 20, y: -18, scale: 0.52, length: 1, rotate: 0 },
  { at: 0.39, x: 20, y: 0, scale: 0.54, length: 1.18, rotate: 0 },
  { at: 0.57, x: 20, y: 0, scale: 0.54, length: 1.18, rotate: 0 },
  { at: 0.68, x: 20, y: 16, scale: 0.56, length: 1.36, rotate: 0 },
  { at: 0.83, x: 20, y: 16, scale: 0.56, length: 1.36, rotate: 0 },
  { at: 0.92, x: 20, y: 20, scale: 0.56, length: 1.36, rotate: 0 },
  { at: 1, x: 20, y: 20, scale: 0.56, length: 1.36, rotate: 0 },
] as const;

const chapterWindows: readonly RevealWindow[] = [
  { enterStart: 0.075, enterEnd: 0.12, exitStart: 0.27, exitEnd: 0.32 },
  { enterStart: 0.345, enterEnd: 0.395, exitStart: 0.56, exitEnd: 0.61 },
  { enterStart: 0.635, enterEnd: 0.685, exitStart: 0.83, exitEnd: 0.88 },
] as const;

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smoothstep(from: number, to: number, value: number) {
  const t = clamp((value - from) / (to - from));
  return t * t * (3 - 2 * t);
}

function mix(from: number, to: number, progress: number) {
  return from + (to - from) * progress;
}

function sampleMotion(progress: number) {
  if (progress <= companionMotion[0].at) return companionMotion[0];

  for (let index = 1; index < companionMotion.length; index += 1) {
    const previous = companionMotion[index - 1];
    const next = companionMotion[index];
    if (progress > next.at) continue;

    const localProgress = smoothstep(previous.at, next.at, progress);
    return {
      at: progress,
      x: mix(previous.x, next.x, localProgress),
      y: mix(previous.y, next.y, localProgress),
      scale: mix(previous.scale, next.scale, localProgress),
      length: mix(previous.length, next.length, localProgress),
      rotate: mix(previous.rotate, next.rotate, localProgress),
    };
  }

  return companionMotion[companionMotion.length - 1];
}

function revealWindow(
  progress: number,
  { enterStart, enterEnd, exitStart, exitEnd }: RevealWindow,
) {
  return (
    smoothstep(enterStart, enterEnd, progress) *
    (1 - smoothstep(exitStart, exitEnd, progress))
  );
}

function getInitialVariant(): Variant {
  if (typeof window === "undefined") return "a1";
  const value = new URLSearchParams(window.location.search).get("variant");
  return value === "a2" || value === "a3" || value === "a4" ? value : "a1";
}

function subscribeToVariantChange(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}

function getServerVariant(): Variant {
  return "a1";
}

function Vehicle({ model, priority = false }: { model: ModelId; priority?: boolean }) {
  return (
    <div className={styles.imageWrap}>
      <Image
        src="/fotos/wagen-s-cutout-prototype.webp"
        alt={`Temporärer Bildplatzhalter für Wagen ${model}`}
        width={1742}
        height={1352}
        priority={priority}
        className={styles.vehicleImage}
      />
      <span className={styles.modelLetter}>{model}</span>
    </div>
  );
}

function ModelFacts({ model }: { model: Model }) {
  return (
    <>
      <p className={styles.capacity}>{model.capacity}</p>
      <p className={styles.layout}>{model.layout}</p>
      <dl>
        <div>
          <dt>Außenmaße</dt>
          <dd>{model.dimensions}</dd>
        </div>
        <div>
          <dt>Richtpreis</dt>
          <dd>{model.price}</dd>
        </div>
      </dl>
    </>
  );
}

function DetailExplorer({ model, instance }: { model: Model; instance: string }) {
  const [detail, setDetail] = useState<DetailKey>("komfort");
  const content: Record<DetailKey, string> = {
    raum: model.layout,
    komfort: model.comfort,
    vorOrt: "Benötigt werden 230 V, Wasser, Abwasser und ein fester, ebener Untergrund.",
  };
  const labels: Record<DetailKey, string> = {
    raum: "Aufteilung",
    komfort: "Komfort",
    vorOrt: "Vor Ort",
  };

  return (
    <div className={styles.detailExplorer}>
      <div className={styles.detailTabs} role="tablist" aria-label={`Details zu Wagen ${model.id}`}>
        {(Object.keys(labels) as DetailKey[]).map((key) => (
          <button
            key={key}
            id={`${instance}-${key}-tab`}
            type="button"
            role="tab"
            aria-selected={detail === key}
            aria-controls={`${instance}-${key}-panel`}
            onClick={() => setDetail(key)}
          >
            {labels[key]}
          </button>
        ))}
      </div>
      <p
        id={`${instance}-${detail}-panel`}
        role="tabpanel"
        aria-labelledby={`${instance}-${detail}-tab`}
        className={styles.detailPanel}
      >
        {content[detail]}
      </p>
    </div>
  );
}

function ModelSelector() {
  const [selected, setSelected] = useState<ModelId>("M");
  const model = models.find((item) => item.id === selected) ?? models[1];

  return (
    <section className={styles.modelSelector} aria-labelledby="selector-title">
      <div className={styles.selectorHeading}>
        <h2 id="selector-title">Noch einmal in Ruhe vergleichen.</h2>
        <p>
          Nach der geführten Geschichte bleibt die Entscheidung frei: Modell
          wählen, Daten prüfen, Anfrage starten.
        </p>
      </div>

      <div className={styles.selectorControls} aria-label="Wagenmodell auswählen">
        {models.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={selected === item.id}
            onClick={() => setSelected(item.id)}
          >
            {item.id}
          </button>
        ))}
      </div>

      <div className={styles.selectorStage}>
        <div className={styles.selectorVehicle}>
          <Vehicle model={model.id} />
        </div>
        <div className={styles.selectorFacts}>
          <ModelFacts model={model} />
          <DetailExplorer model={model} instance={`selector-${model.id}`} />
        </div>
      </div>
    </section>
  );
}

export function FamilyUnfoldPrototype() {
  const rootRef = useRef<HTMLDivElement>(null);
  const standardSceneRef = useRef<HTMLElement>(null);
  const companionSceneRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number | null>(null);
  const variant = useSyncExternalStore(
    subscribeToVariantChange,
    getInitialVariant,
    getServerVariant,
  );

  const renderProgress = useCallback(() => {
    frameRef.current = null;
    const root = rootRef.current;
    const scene =
      variant === "a4" ? companionSceneRef.current : standardSceneRef.current;
    if (!root || !scene) return;

    const distance = Math.max(1, scene.offsetHeight - window.innerHeight);
    const triggerOffset = Math.min(96, window.innerHeight * 0.1);
    const progress = clamp(
      (triggerOffset - scene.getBoundingClientRect().top) / distance,
    );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    root.style.setProperty("--scroll-progress", String(progress));

    if (variant === "a4") {
      if (reducedMotion) return;

      const familyExit = smoothstep(0.015, 0.14, progress);
      const companion = root.querySelector<HTMLElement>("[data-companion-wagon]");
      const companionBody = root.querySelector<HTMLElement>("[data-companion-body]");
      const prototypeAxle = root.querySelector<HTMLElement>("[data-prototype-axle]");
      const family = root.querySelector<HTMLElement>("[data-companion-family]");
      const parked = root.querySelector<HTMLElement>("[data-parked-content]");

      if (family) {
        family.style.opacity = String(1 - familyExit);
        family.style.transform = `translateY(${mix(0, -28, familyExit)}px) scale(${mix(1, 0.94, familyExit)})`;
      }

      if (companion) {
        const position = sampleMotion(progress);
        companion.style.opacity = "1";
        companion.style.transform = `translate3d(calc(-50% + ${position.x}vw), calc(-50% + ${position.y}vh), 0) rotate(${position.rotate}deg) scale(${position.scale})`;

        if (companionBody) {
          companionBody.style.transform = `scaleX(${position.length})`;
        }

        if (prototypeAxle) {
          prototypeAxle.style.opacity = String(smoothstep(0.61, 0.69, progress));
        }
      }

      root
        .querySelectorAll<HTMLElement>("[data-companion-chapter]")
        .forEach((chapter, index) => {
          const reveal = revealWindow(progress, chapterWindows[index]);
          chapter.style.opacity = String(reveal);
          chapter.style.pointerEvents = reveal > 0.72 ? "auto" : "none";
          chapter.style.transform = `translateY(${mix(30, 0, reveal)}px)`;
        });

      root
        .querySelectorAll<HTMLElement>("[data-companion-badge]")
        .forEach((badge, index) => {
          const window = chapterWindows[index];
          const reveal =
            index === 0
              ? 1 - smoothstep(window.exitStart, window.exitEnd, progress)
              : revealWindow(progress, {
                  ...window,
                  exitEnd: index === 2 ? 1 : window.exitEnd,
                });
          badge.style.opacity = String(reveal);
        });

      if (parked) {
        const reveal = smoothstep(0.865, 0.93, progress);
        parked.style.opacity = String(reveal);
        parked.style.transform = `translateY(${mix(28, 0, reveal)}px)`;
      }

      return;
    }

    root.querySelectorAll<HTMLElement>("[data-model]").forEach((element, index) => {
      const config = choreography[variant][index];
      const finalX = [-31, 0, 31][index];
      const localProgress = reducedMotion
        ? progress >= 0.35
          ? 1
          : 0
        : smoothstep(0.025 + config.delay, 0.47 + config.delay, progress);
      const x = mix(config.startX, finalX, localProgress);
      const y = mix(config.startY, 1, localProgress);
      const rotate = mix(config.startRotate, 0, localProgress);
      const scale = mix(index === 0 ? 0.54 : index === 1 ? 0.58 : 0.62, 0.54, localProgress);

      element.style.transform = `translate3d(calc(-50% + ${x}vw), calc(-50% + ${y}vh), 0) rotate(${rotate}deg) scale(${scale})`;

      const copy = element.querySelector<HTMLElement>("[data-model-copy]");
      if (copy) {
        const reveal = reducedMotion
          ? progress >= 0.58
            ? 1
            : 0
          : smoothstep(0.43 + config.delay * 0.35, 0.62 + config.delay * 0.35, progress);
        copy.style.opacity = String(reveal);
        copy.style.transform = `translateY(${mix(24, 0, reveal)}px)`;
      }
    });
  }, [variant]);

  useEffect(() => {
    const requestRender = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(renderProgress);
    };

    requestRender();
    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", requestRender);

    return () => {
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", requestRender);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [renderProgress]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.matches("button, input, textarea, [contenteditable='true']")) return;
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

      const index = variants.findIndex((item) => item.id === variant);
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const next = variants[(index + direction + variants.length) % variants.length];
      chooseVariant(next.id);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  function chooseVariant(next: Variant) {
    const url = new URL(window.location.href);
    url.searchParams.set("variant", next);
    window.history.replaceState({}, "", url);
    window.scrollTo({ top: 0, behavior: "instant" });
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  return (
    <div ref={rootRef} className={styles.prototype}>
      <div className={styles.prototypeNotice}>
        <strong>Interaktionsprototyp</strong>
        <span>
          {variant === "a4"
            ? "Geometriewechsel S → M → L folgt erst mit finalen Modell-Assets."
            : "Alle drei Bilder zeigen vorerst Wagen S."}
        </span>
      </div>

      {variant === "a4" ? (
        <>
          <section
            ref={companionSceneRef}
            className={styles.companionScene}
            aria-labelledby="companion-title"
          >
            <div className={styles.companionSticky}>
              <div data-companion-family className={styles.companionFamily}>
                <div className={styles.companionHeroCopy}>
                  <h1 id="companion-title">Drei Größen. Ein Leitwagen.</h1>
                  <p>
                    Die Modellfamilie eröffnet die Seite. Beim ersten Scroll fährt
                    der Leitwagen rechts auf seine feste Spur.
                  </p>
                </div>
                <div className={styles.companionFamilyVehicles} aria-label="Weitere Modelle M und L">
                  {models.slice(1).map((model) => (
                    <figure
                      key={model.id}
                      className={`${styles.companionFamilyModel} ${
                        model.id === "M" ? styles.familyModelM : styles.familyModelL
                      }`}
                    >
                      <Vehicle model={model.id} priority />
                    </figure>
                  ))}
                </div>
              </div>

              <figure data-companion-wagon className={styles.companionWagon}>
                <div data-companion-body className={styles.companionBody}>
                  <Image
                    src="/fotos/wagen-s-cutout-prototype.webp"
                    alt="Wagen fährt durch die Stationen S, M und L"
                    width={1742}
                    height={1352}
                    priority
                    className={styles.vehicleImage}
                  />
                  <span
                    data-prototype-axle
                    className={styles.prototypeAxle}
                    aria-hidden="true"
                  />
                </div>
                {models.map((model) => (
                  <span
                    key={model.id}
                    data-companion-badge={model.id}
                    className={styles.companionBadge}
                  >
                    {model.id}
                  </span>
                ))}
              </figure>

              <div className={styles.companionChapters}>
                {models.map((model) => (
                  <article
                    key={model.id}
                    data-companion-chapter={model.id}
                    className={`${styles.companionChapter} ${styles.chapterLeft}`}
                  >
                    <span className={styles.chapterLetter} aria-hidden="true">
                      {model.id}
                    </span>
                    <div className={styles.chapterContent}>
                      <h2>{model.title}</h2>
                      <ModelFacts model={model} />
                      <DetailExplorer model={model} instance={`chapter-${model.id}`} />
                    </div>
                  </article>
                ))}
              </div>

              <article data-parked-content className={styles.parkedContent}>
                <h2>Der L-Wagen parkt. Der Service übernimmt.</h2>
                <p>
                  Rohre, Schläuche und maßgefertigte Kanaldeckel sind dabei.
                  Liefer- und Abholtag zählen nicht als Miettage.
                </p>
              </article>

              <p className={styles.scrollHint}>Scrollen – der Wagen fährt zur nächsten Station</p>
            </div>
          </section>

          <section className={styles.reducedMotionFallback} aria-label="Modelle ohne Scrollanimation">
            {models.map((model) => (
              <article key={model.id}>
                <Vehicle model={model.id} />
                <ModelFacts model={model} />
              </article>
            ))}
          </section>

          <ModelSelector />
        </>
      ) : (
        <section
          ref={standardSceneRef}
          className={styles.scrollScene}
          aria-labelledby="prototype-title"
        >
          <div className={styles.stickyFrame}>
            <div className={styles.introCopy}>
              <h1 id="prototype-title">Drei Größen. Ein sauberer Auftritt.</h1>
              <p>
                Vom kompakten Wagen bis zur großen Veranstaltung – die passende
                Ausstattung bleibt nur eine Anfrage entfernt.
              </p>
            </div>

            <div className={styles.family} aria-label="Modellfamilie S, M und L">
              {models.map((model) => (
                <figure key={model.id} data-model={model.id} className={styles.model}>
                  <Vehicle model={model.id} priority />
                  <figcaption data-model-copy className={styles.modelCopy}>
                    <ModelFacts model={model} />
                  </figcaption>
                </figure>
              ))}
            </div>

            <p className={styles.scrollHint}>Scrollen, um die Familie zu entfalten</p>
          </div>
        </section>
      )}

      <section className={styles.outro}>
        <h2>
          {variant === "a4"
            ? "Hier würde die übrige Seite nahtlos weiterlaufen."
            : "Danach beginnt der eigentliche Modellvergleich."}
        </h2>
      </section>

      {process.env.NODE_ENV !== "production" && (
        <nav className={styles.switcher} aria-label="Prototyp-Varianten">
          {variants.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={variant === item.id}
              onClick={() => chooseVariant(item.id)}
            >
              {item.id.toUpperCase()} · {item.name}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}

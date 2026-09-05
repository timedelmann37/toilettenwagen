import Image from "next/image";
import { Plus } from "@phosphor-icons/react/ssr";
import { sharedFeatures, trailerModels } from "@/lib/models";
import styles from "./ModelJourney.module.css";

const euro = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

function formatNetPrice(priceNetCents: number) {
  return `ab ${euro.format(priceNetCents / 100)} netto/Tag`;
}

function DetailsLabel() {
  return (
    <>
      <span className={styles.closedLabel}>Details ansehen</span>
      <span className={styles.openLabel}>Details schließen</span>
      <Plus aria-hidden="true" weight="bold" className={styles.detailsIcon} />
    </>
  );
}

export function ModelJourney() {
  return (
    <section className={styles.journey} aria-labelledby="model-journey-title">
      <div className={styles.journeyInner}>
        <header className={styles.intro}>
          <div>
            <h2 id="model-journey-title" className={styles.title}>
              Ein Wagen. Drei Stationen.
            </h2>
            <p className={styles.lead}>
              Von S bis L wächst die Kapazität. Die wichtigen Daten bleiben in
              jeder Größe ruhig lesbar.
            </p>
          </div>

          <div className={styles.introAside}>
            <p className={styles.provisionalNote}>
              Bis die maßhaltigen M- und L-Ansichten fertig sind, dient der
              S-Freisteller als Bildplatzhalter.
            </p>

            <details id="grundausstattung" className={styles.sharedDetails}>
              <summary>
                <span className={styles.closedLabel}>
                  Ausstattung in jedem Wagen
                </span>
                <span className={styles.openLabel}>Ausstattung schließen</span>
                <Plus
                  aria-hidden="true"
                  weight="bold"
                  className={styles.detailsIcon}
                />
              </summary>
              <ul className={styles.sharedFeatureList}>
                {sharedFeatures.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </details>
          </div>
        </header>

        <div className={styles.stations}>
          {trailerModels.map((model) => (
            <article
              key={model.id}
              className={styles.station}
              aria-labelledby={`model-${model.id}-title`}
            >
              <div className={styles.stationCopy}>
                <h3
                  id={`model-${model.id}-title`}
                  className={styles.modelHeading}
                >
                  <span className={styles.modelWord}>Modell</span>
                  {" "}
                  <span className={styles.modelLetter}>{model.name}</span>
                </h3>
                <p className={styles.suitability}>{model.suitability}</p>

                <dl className={styles.primaryFacts}>
                  <div>
                    <dt>Kapazität</dt>
                    <dd>bis {model.capacity} Personen</dd>
                  </div>
                  <div>
                    <dt>Preis</dt>
                    <dd>{formatNetPrice(model.priceNetCents)}</dd>
                  </div>
                </dl>

                <details className={styles.modelDetails}>
                  <summary>
                    <DetailsLabel />
                  </summary>
                  <dl className={styles.detailGrid}>
                    <div>
                      <dt>Maße</dt>
                      <dd>{model.dimensions}</dd>
                    </div>
                    <div>
                      <dt>Damen-WCs</dt>
                      <dd>{model.womensCabins}</dd>
                    </div>
                    <div>
                      <dt>Herren-WCs</dt>
                      <dd>{model.mensCabins}</dd>
                    </div>
                    <div>
                      <dt>Urinale</dt>
                      <dd>{model.urinals}</dd>
                    </div>
                    <div className={styles.equipmentReference}>
                      <dt>Ausstattung</dt>
                      <dd>Gemeinsame Grundausstattung</dd>
                    </div>
                  </dl>

                  {model.specificFeatures.length > 0 && (
                    <div className={styles.specificFeatures}>
                      <h4>Zusätzlich im Modell {model.name}</h4>
                      <ul>
                        {model.specificFeatures.map((feature) => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </details>
              </div>

              <figure className={styles.vehicleStage}>
                <Image
                  src="/fotos/wagen-s-hero-1600.webp"
                  alt={`Vorläufiger S-Freisteller als Bildplatzhalter für Modell ${model.name}`}
                  width={1600}
                  height={1229}
                  sizes="(max-width: 767px) 92vw, 52vw"
                />
              </figure>
            </article>
          ))}
        </div>

        <div className={styles.comparisonThreshold} aria-hidden="true" />
      </div>
    </section>
  );
}

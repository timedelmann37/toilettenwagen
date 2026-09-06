import { trailerModels } from "@/lib/models";
import { VehicleImage } from "./VehicleImage";
import styles from "./ModelJourney.module.css";

export function ModelJourney() {
  return (
    <section className={styles.journey} aria-labelledby="model-journey-title">
      <div className={styles.journeyInner}>
        <header className={styles.intro}>
          <h2 id="model-journey-title" className={styles.title}>
            Ein Wagen. Drei Stationen.
          </h2>
          <p className={styles.lead}>
            S, M und L zeigen die Größenstaffel der Familie. Maße, Aufteilung
            und Preis folgen direkt danach im Vergleich.
          </p>
        </header>

        <div className={styles.journeyStage}>
          <ol
            className={styles.modelScale}
            aria-label="Größenstaffel S, M und L"
          >
            {trailerModels.map((model) => (
              <li
                key={model.id}
                className={styles.modelStop}
                aria-label={`Modell ${model.name}`}
              >
                <h3
                  id={`model-${model.id}-title`}
                  className={styles.modelHeading}
                >
                  <span className={styles.modelWord}>Modell</span>
                  {" "}
                  <span className={styles.modelLetter}>{model.name}</span>
                </h3>

                <div className={styles.modelSummary}>
                  <p className={styles.capacity}>
                    bis <strong>{model.capacity}</strong> Personen
                  </p>
                  <p className={styles.suitability}>{model.suitability}</p>
                  <span className={styles.capacityLine} aria-hidden="true" />
                </div>
              </li>
            ))}
          </ol>

          <figure className={styles.vehicleStage}>
            <div className={styles.stageRail} aria-hidden="true">
              <span data-model="S" />
              <span data-model="M" />
              <span data-model="L" />
            </div>
            <VehicleImage
              alt="Freigestellter Toilettenwagen als gemeinsame Fahrzeugansicht der Modelle S, M und L"
              sizes="(max-width: 767px) 92vw, 48vw"
            />
            <figcaption>
              Eine gemeinsame Fahrzeugansicht. Die vollständigen Maße und
              Ausstattungen folgen direkt im Modellvergleich.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

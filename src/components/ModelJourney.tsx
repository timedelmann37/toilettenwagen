import { trailerModels } from "@/lib/models";
import { VehicleImage } from "./VehicleImage";
import styles from "./ModelJourney.module.css";

export function ModelJourney() {
  return (
    <section
      className={styles.journey}
      aria-labelledby="model-journey-title"
      data-lead-journey
    >
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
                data-lead-stop={model.id}
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

          <figure className={styles.vehicleStage} data-lead-stage>
            <div className={styles.stageRail} aria-hidden="true">
              {trailerModels.map((model) => (
                <span
                  key={model.id}
                  data-model={model.name}
                  data-lead-level={model.id}
                />
              ))}
            </div>
            <div
              className={styles.staticVehicleFamily}
              data-lead-stage-vehicles
            >
              {trailerModels.map((model) => (
                <span
                  key={model.id}
                  className={styles.staticVehicle}
                  data-model={model.name}
                >
                  <VehicleImage
                    model={model.id}
                    alt={`Freigestellter Toilettenwagen Modell ${model.name}`}
                    sizes="(max-width: 767px) 29vw, 16vw"
                    loading="eager"
                  />
                </span>
              ))}
            </div>
            <figcaption>
              Drei eigenständige Wagenmodelle, gemeinsam auf einer Größenlinie.
              Verbindliche Maße und Ausstattung folgen im Modellvergleich.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

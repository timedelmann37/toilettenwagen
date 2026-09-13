import {
  Drop,
  Lightbulb,
  ThermometerHot,
  ToiletPaper,
} from "@phosphor-icons/react/ssr";
import Image from "next/image";
import styles from "./ServiceProof.module.css";

const sharedEquipmentOverview = [
  {
    label: "Beheizt",
    note: "ganzjährig nutzbar",
    icon: ThermometerHot,
  },
  {
    label: "Waschplätze",
    note: "mit Becken & Spiegel",
    icon: Drop,
  },
  {
    label: "Beleuchtung",
    note: "innen & außen",
    icon: Lightbulb,
  },
  {
    label: "Spülung & Papier",
    note: "Tork-Spender",
    icon: ToiletPaper,
  },
] as const;

const siteRequirements = [
  {
    title: "230 V Stromanschluss",
    description: "für Licht, Heizung und die technische Ausstattung",
  },
  {
    title: "Wasseranschluss",
    description: "GEKA- oder Gardena-Anschluss, höchstens 5 Meter vom Wagen entfernt",
  },
  {
    title: "Fester, ebener Untergrund",
    description: "damit der Wagen sicher aufgestellt werden kann",
  },
  {
    title: "Abwasseranschluss vor Ort",
    description: "für den fachgerechten Anschluss des Wagens",
  },
  {
    title: "Erforderliche Genehmigung",
    description: "für die Nutzung des Abwasseranschlusses",
  },
] as const;

const includedConnections = [
  "Abwasserrohre",
  "10 Meter Frischwasserschlauch",
  "Maßgefertigte Holzabdeckungen",
] as const;

export function ServiceProof() {
  return (
    <section id="service" className={styles.service}>
      <figure className={styles.nightStage}>
        <Image
          src="/fotos/aussenbeleuchtung-service-retouched-v1-1600.webp"
          alt="Beleuchteter Toilettenwagen bei Nacht mit blauen Lichtlinien"
          width={1600}
          height={572}
          sizes="100vw"
        />
        <figcaption>Außenbeleuchtung für eine klare Orientierung am Abend.</figcaption>
      </figure>

      <div className={styles.introShell}>
        <div className={styles.intro}>
          <h2>Anschlüsse und Aufbau. Vorab geklärt.</h2>
          <div className={styles.introCopy}>
            <p>
              Lieferung, Aufbau und Anschlüsse stimmen wir vorab persönlich
              mit Ihnen ab.
            </p>
            <div className={styles.billingStatement}>
              <strong>
                Liefer- und Abholtag zählen nicht als Miettage.
              </strong>
              <span>
                Je Strecke mit angehängtem Wagen: bis 50 km pauschal 50 € brutto,
                danach 1,10 € brutto je zusätzlichem Kilometer. Berechnet werden
                Hinbringen und Abholen, keine Leerfahrten.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.story}>
        <div className={styles.storyIntro}>
          <div>
            <h3>Sauber bis ins Detail.</h3>
            <p className={styles.largeCopy}>
              Alle Wagen sind beheizt und ganzjährig einsetzbar.
            </p>
          </div>
        </div>

        <ul
          className={styles.equipmentOverview}
          aria-label="Gemeinsame Ausstattung aller Wagen"
        >
          {sharedEquipmentOverview.map(({ label, note, icon: Icon }) => (
            <li key={label}>
              <Icon aria-hidden="true" weight="regular" />
              <span>
                <strong>{label}</strong>
                <small>{note}</small>
              </span>
            </li>
          ))}
        </ul>

        <p className={styles.largeCopy}>Die Erstausstattung im S enthält Toilettenpapier. M und L erhalten Toilettenpapier, Seife und Tücher. Weiteren Bedarf bringen Sie selbst mit.</p>

        <div className={styles.gallery} role="group" aria-label="Echte Innenansichten">
          <figure className={styles.editorialFigure}>
            <Image
              src="/fotos/interieur-2-service-retouched-v2-1200.webp"
              alt="Waschplatz mit Spiegel, Becken und Papierspendern im Toilettenwagen"
              width={900}
              height={1200}
              sizes="(max-width: 767px) 50vw, 35vw"
            />
            <figcaption>Waschplatz mit Spiegel und Spendern.</figcaption>
          </figure>
          <figure className={styles.cabinFigure}>
            <Image
              src="/fotos/foto-03-kabine-retouched-v2-1200.webp"
              alt="Gepflegte WC-Kabine mit Toilette und Spülung"
              width={900}
              height={1200}
              sizes="(max-width: 767px) 50vw, 22vw"
            />
            <figcaption>Gepflegte WC-Kabine.</figcaption>
          </figure>
          <figure className={styles.urinalFigure}>
            <Image
              src="/fotos/foto-08-urinale-retouched-v2-1200.webp"
              alt="Drei Urinale mit Trennwänden im beleuchteten Herrenbereich"
              width={900}
              height={1200}
              sizes="(max-width: 767px) 50vw, 22vw"
            />
            <figcaption>Urinale mit Trennwänden.</figcaption>
          </figure>
          <figure className={styles.doorFigure}>
            <Image
              src="/fotos/kabinen-aussen-s-retouched-v2-1200.webp"
              alt="Innenansicht mit Palmen- und Strandmotiv auf den Türen"
              width={900}
              height={1200}
              sizes="(max-width: 767px) 50vw, 22vw"
            />
            <figcaption>Türmotiv in einer Innenansicht.</figcaption>
          </figure>
        </div>
      </div>

      <div className={styles.planning}>
        <div className={styles.planningIntro}>
          <h2>Aufstellung klar vorbereitet.</h2>
        </div>

        <div className={styles.planningBoard}>
          <div className={styles.ourPart}>
            <h3>Was wir mitbringen</h3>
            <ul
              className={styles.includedList}
              aria-label="Von uns mitgebrachte Anschlüsse und Abdeckungen"
            >
              {includedConnections.map((connection) => (
                <li key={connection}>{connection}</li>
              ))}
            </ul>
            <p className={styles.setupNote}>
              Der Aufstellplatz muss fest und wirklich eben sein. Anschlüsse und Zugänglichkeit stimmen wir vorab mit Ihnen ab.
            </p>
          </div>

          <div className={styles.sitePart}>
            <h3>Was vor Ort bereitsteht</h3>
            <dl className={styles.requirements}>
              {siteRequirements.map((requirement) => (
                <div key={requirement.title}>
                  <dt>{requirement.title}</dt>
                  <dd>
                    {requirement.description}
                    {requirement.title === "Wasseranschluss" && (
                      <div className={styles.connectionGuide}>
                      <figure className={styles.connectionFigure}>
                        <div className={styles.connectionDrawing}>
                          <Image
                            src="/fotos/geka-transparent-v2.webp"
                            alt="Technische Illustration einer GEKA-Klauenkupplung mit Dichtungsring"
                            width={640}
                            height={640}
                            sizes="112px"
                          />
                        </div>
                        <figcaption>
                          <strong>GEKA erkennen</strong>
                          Zwei gegenüberliegende Klauen und ein Dichtungsring.
                        </figcaption>
                      </figure>
                      <figure className={styles.connectionFigure}>
                        <div className={styles.connectionDrawing}>
                          <Image
                            src="/fotos/gardena-male-transparent-v2.webp"
                            alt="Technische Illustration eines männlichen Gardena-Steckteils"
                            width={640}
                            height={640}
                            sizes="112px"
                          />
                        </div>
                        <figcaption>
                          <strong>Gardena – männlich</strong>
                          Steckteil mit hervorstehendem Anschlusszapfen.
                        </figcaption>
                      </figure>
                      <figure className={styles.connectionFigure}>
                        <div className={styles.connectionDrawing}>
                          <Image
                            src="/fotos/gardena-female-transparent-v2.webp"
                            alt="Technische Illustration eines weiblichen Gardena-Schlauchstücks"
                            width={640}
                            height={640}
                            sizes="112px"
                          />
                        </div>
                        <figcaption>
                          <strong>Gardena – weiblich</strong>
                          Schlauchstück mit Aufnahmeöffnung und Entriegelungshülse.
                        </figcaption>
                      </figure>
                      <p className={styles.connectionNote}>
                        Beispielabbildungen. Die genaue Anschlussausführung stimmen wir vorab mit Ihnen ab.
                      </p>
                      </div>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

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
    note: "ganzjährig",
    icon: ThermometerHot,
  },
  {
    label: "Waschplätze",
    note: "Becken & Spiegel",
    icon: Drop,
  },
  {
    label: "Beleuchtet",
    note: "innen & außen",
    icon: Lightbulb,
  },
  {
    label: "Einsatzbereit",
    note: "Spülung & Tork",
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
    description: "für die Versorgung des Toilettenwagens",
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
  "Frischwasserschläuche",
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
          <h2>Der Wagen parkt. Der Service übernimmt.</h2>
          <div className={styles.introCopy}>
            <p>
              Vor Ort zählt nicht nur der Wagen, sondern was schon mitgedacht
              ist. Wir bringen die nötigen Verbindungen mit und stimmen die
              Aufstellung vorab persönlich mit Ihnen ab.
            </p>
            <div className={styles.billingStatement}>
              <strong>
                Liefer- und Abholtag zählen nicht als Miettage.
              </strong>
              <span>
                Lieferung und Abholung werden separat berechnet. Die Anfahrt
                wird mit 1,10&nbsp;€/km berücksichtigt.
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
          <p>
            Waschbecken, Spiegel, Innen- und Außenbeleuchtung, Spülung und
            Tork-Papierspender gehören zur gemeinsamen Ausstattung.
          </p>
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

        <div className={styles.gallery} aria-label="Echte Innenansichten">
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
          <h2>Vor Ort gemeinsam vorbereitet.</h2>
          <p>
            Wir klären die Aufstellung vorab gemeinsam. So ist früh sichtbar,
            was wir mitbringen und was am Aufstellort bereitsteht.
          </p>
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
              Unterbauten, Revisionsschächte und schiefe Zufahrten betrachten
              wir vorab. Schwierige Aufstellungen werden lösungsorientiert
              geplant.
            </p>
          </div>

          <div className={styles.sitePart}>
            <h3>Was vor Ort bereitsteht</h3>
            <dl className={styles.requirements}>
              {siteRequirements.map((requirement) => (
                <div key={requirement.title}>
                  <dt>{requirement.title}</dt>
                  <dd>{requirement.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

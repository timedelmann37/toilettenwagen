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
    description: "Frischwasseranschluss mit GEKA- oder Gardena-Kupplung",
  },
  {
    title: "Fester, ebener Untergrund",
    description: "damit der Wagen sicher aufgestellt werden kann",
  },
  {
    title: "Abwasseranschluss vor Ort",
    description: "Empfehlung: höchstens 5 Meter vom Wagen entfernt. Der geeignete und zulässige Anschluss muss vor der Lieferung feststehen und nutzbar sein.",
  },
  {
    title: "Genehmigungen vorab selbst einholen",
    description: "Auf öffentlichen Flächen müssen uns die erforderlichen Genehmigungen vor der Lieferung schriftlich vorliegen. Beantragung und Klärung übernehmen Sie selbst, nicht wir vor Ort. Auf Privatgrund entfällt die Freigabe einer öffentlichen Fläche; Vorgaben zum Abwasseranschluss gelten weiterhin. Reine Regenwasserabläufe sind nicht geeignet.",
  },
] as const;

const includedConnections = [
  "Abwasserrohre",
  "10 Meter Frischwasserschlauch",
  "Maßgefertigte Holzabdeckungen für Kanaldeckel",
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
                Für Lieferung und Abholung zusammen: bis insgesamt 50 km mit
                angehängtem Wagen pauschal 50 € netto (59,50 € inkl. MwSt.).
                Danach 1,10 € netto je zusätzlichem Kilometer, zzgl. 19 % MwSt.
                Leerfahrten werden nicht berechnet.
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
              Unsere Sanitärwagen sind beheizt und ganzjährig einsetzbar.
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

        <div className={styles.supplyDetails}>
          <div>
            <h4>Erstausstattung</h4>
            <dl className={styles.supplyList}>
              <div><dt>Alle Wagen · S, M &amp; L</dt><dd>Toilettenpapier, Seife und Papierhandtücher</dd></div>
            </dl>
            <p className={styles.restockNote}>
              <strong>Nachschub benötigt?</strong> Wenn die Erstausstattung
              aufgebraucht ist, können Sie Toilettenpapier, Seife und
              Papierhandtücher bei uns nachkaufen.
            </p>
          </div>
          <div>
            <h4>Passende TORK-Handtücher</h4>
            <dl className={styles.supplyList}>
              <div><dt>Wagen S · H1</dt><dd>Tork Matic Advanced Handtuchrolle</dd></div>
              <div><dt>Wagen M &amp; L · H2</dt><dd>Tork Express Multifold Handtücher Universal</dd></div>
            </dl>
          </div>
        </div>

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

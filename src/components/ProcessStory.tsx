import styles from "./ProcessStory.module.css";

type ProcessStep = {
  number: string;
  title: string;
  description: string;
  timing: string;
  event?: "start" | "end";
};

const processSteps: readonly ProcessStep[] = [
  {
    number: "01",
    title: "Anfrage senden.",
    description:
      "Ort, Termin und Anlass erreichen uns per WhatsApp oder Formular.",
    timing: "Der Ausgangspunkt",
  },
  {
    number: "02",
    title: "Angebot erhalten.",
    description:
      "Innerhalb unserer Erreichbarkeit üblicherweise in unter zwei Stunden.",
    timing: "Meist unter 2 Std.",
  },
  {
    number: "03",
    title: "Auftrag bestätigen.",
    description:
      "Fallweise wird mit der Bestätigung eine Anzahlung von 30 % fällig.",
    timing: "Fallweise 30 %",
  },
  {
    number: "04",
    title: "Lieferung & Aufbau.",
    description:
      "Meist einen Tag vor Ihrem Anlass steht der Wagen am abgestimmten Platz.",
    timing: "Meist −1 Tag",
    event: "start",
  },
  {
    number: "05",
    title: "Abholung & Abbau.",
    description:
      "Meist einen Tag nach Ihrem Anlass übernehmen wir Abbau und Abholung.",
    timing: "Meist +1 Tag",
    event: "end",
  },
  {
    number: "06",
    title: "Sauber abschließen.",
    description:
      "Nach der Reinigung folgen Schlussrechnung und die Bitte um eine Google-Bewertung.",
    timing: "Nach der Rückkehr",
  },
];

export function ProcessStory() {
  return (
    <section id="ablauf" className={styles.process}>
      <div className={styles.inner}>
        <header className={styles.intro}>
          <h2>Von der ersten Nachricht bis zum sauberen Abschluss.</h2>
          <p>
            Sechs klare Stationen führen von Ihrer Anfrage bis zur
            Schlussrechnung – persönlich und auf Ihren Termin abgestimmt.
          </p>
        </header>

        <aside className={styles.advance} aria-labelledby="advance-title">
          <div className={styles.advanceIntro}>
            <h3 id="advance-title">Wie früh sollten Sie anfragen?</h3>
            <p>Eine Orientierung für die Planung, keine Verfügbarkeitszusage.</p>
          </div>
          <dl>
            <div className={styles.longLead}>
              <dt>August-Hochzeiten</dt>
              <dd>idealerweise etwa ein Jahr vorher</dd>
              <span className={styles.leadBar} aria-hidden="true" />
            </div>
            <div className={styles.shortLead}>
              <dt>Andere Anlässe</dt>
              <dd>meist drei bis sechs Monate Vorlauf</dd>
              <span className={styles.leadBar} aria-hidden="true" />
            </div>
          </dl>
        </aside>

        <div className={styles.timelineShell}>
          <div className={styles.axis} aria-hidden="true">
            <span />
          </div>
          <ol
            className={styles.timeline}
            aria-label="Ablauf von der Anfrage bis zum Abschluss"
          >
            {processSteps.map((step) => {
              const stepClassName = step.event
                ? `${styles.step} ${styles.eventStep} ${
                    step.event === "start"
                      ? styles.eventStart
                      : styles.eventEnd
                  }`
                : styles.step;

              return (
                <li key={step.number} className={stepClassName}>
                  <div className={styles.stepMeta}>
                    <span className={styles.stepNumber} aria-hidden="true">
                      {step.number}
                    </span>
                    <span className={styles.stepTiming}>{step.timing}</span>
                  </div>
                  <span className={styles.stepNode} aria-hidden="true" />
                  {step.event === "end" && (
                    <span className={styles.eventPivot} aria-hidden="true">
                      Ihr Anlass
                    </span>
                  )}
                  <div className={styles.stepCopy}>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <footer className={styles.regionBridge}>
          <h3>Weiter zur Region.</h3>
          <p>
            Als Nächstes sehen Sie, wo wir rund um Niederdreisbach für Sie
            unterwegs sind.
          </p>
        </footer>
      </div>
    </section>
  );
}

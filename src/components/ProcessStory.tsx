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
      "Senden Sie uns Ort, Termin und Anlass per WhatsApp oder Formular.",
    timing: "Der Ausgangspunkt",
  },
  {
    number: "02",
    title: "Angebot erhalten.",
    description:
      "Während unserer Erreichbarkeit erhalten Sie das Angebot üblicherweise innerhalb von zwei Stunden.",
    timing: "Meist unter 2 Std.",
  },
  {
    number: "03",
    title: "Auftrag bestätigen.",
    description:
      "Je nach Auftrag wird mit der Bestätigung eine Anzahlung von 30 % fällig.",
    timing: "Je nach Auftrag",
  },
  {
    number: "04",
    title: "Lieferung und Aufbau.",
    description:
      "Meist einen Tag vor Ihrem Anlass steht der Wagen am abgestimmten Platz.",
    timing: "Meist −1 Tag",
    event: "start",
  },
  {
    number: "05",
    title: "Abholung und Abbau.",
    description:
      "Meist einen Tag nach Ihrem Anlass bauen wir den Wagen ab und holen ihn ab.",
    timing: "Meist +1 Tag",
    event: "end",
  },
  {
    number: "06",
    title: "Reinigung und Abschluss.",
    description:
      "Nach der Rückkehr reinigen wir den Wagen und senden Ihnen die Schlussrechnung.",
    timing: "Nach der Rückkehr",
  },
];

export function ProcessStory() {
  return (
    <section id="ablauf" className={styles.process}>
      <div className={styles.inner}>
        <header className={styles.intro}>
          <h2>So läuft Ihre Miete ab.</h2>
        </header>

        <aside className={styles.advance} aria-labelledby="advance-title">
          <div className={styles.advanceIntro}>
            <h3 id="advance-title">Wie früh sollten Sie anfragen?</h3>
            <p>Von Ihrer Anfrage bis zur Abholung.</p>
          </div>
          <dl>
            <div className={styles.longLead}>
              <dt>Hochzeiten im August</dt>
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

      </div>
    </section>
  );
}

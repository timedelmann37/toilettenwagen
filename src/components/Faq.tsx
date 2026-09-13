import styles from "./Faq.module.css";

const questions = [
  ["Welche Anschlüsse und welchen Untergrund brauchen wir?", "Bitte stellen Sie 230 V Strom, einen Wasseranschluss mit GEKA- oder Gardena-Kupplung und einen geeigneten Abwasseranschluss samt erforderlicher Genehmigung bereit. Der Wagen darf höchstens fünf Meter vom Wasseranschluss entfernt stehen. Die Aufstellfläche muss fest und eben sein. Wir bringen zehn Meter Frischwasserschlauch, Abwasserrohre und Holzabdeckungen mit."],
  ["Was ist als Erstausstattung enthalten?", "Modell S erhält Toilettenpapier. In M und L sind Toilettenpapier, Seife und Tücher als Erstausstattung vorhanden. Zusätzlichen Bedarf und Nachschub organisieren Sie selbst."],
  ["Wie werden Lieferung und Abholung berechnet?", "Wir berechnen ausschließlich die Strecken mit angehängtem Toilettenwagen: die Lieferung zu Ihnen und die Abholung zurück. Je Strecke kosten die ersten 50 Kilometer pauschal 50 € brutto. Jeder weitere Kilometer kostet 1,10 € brutto. Leerfahrten werden nicht berechnet. Beispiel bei 70 km Entfernung: 72 € für die Lieferung und 72 € für die Abholung, zusammen 144 € brutto."],
  ["Kann ich den Wagen selbst abholen?", "Die Modelle S und M können Sie nach Absprache selbst abholen. Teilen Sie uns Ihren Wunsch bei der Anfrage mit."],
  ["Welche Tage zählen als Miettage?", "Liefer- und Abholtag zählen nicht als Miettage. Geben Sie den gewünschten Liefertag und Ihren tatsächlichen Nutzungszeitraum getrennt an. Bei längerer Mietdauer erhalten Sie günstigere Konditionen im persönlichen Angebot."],
  ["Wie muss der Wagen zurückgegeben werden?", "Bitte geben Sie den Wagen besenrein zurück. Für die anschließende Reinigung durch uns fallen zusätzlich 50 € an. Bei außergewöhnlicher Verschmutzung kann die Reinigung mehr kosten."],
  ["Gibt es eine Betreuung während der Veranstaltung?", "Eine Betreuung der Toilettenwagen durch einen Partner ist separat auf Anfrage möglich. Dies ist eine Betreuung der Sanitäranlagen, kein Security- oder Bewachungsdienst."],
  ["Kann ich für eine Firma oder eine Baustelle anfragen?", "Gewerbliche Anfragen sind willkommen: Wählen Sie im Formular Firma / gewerblich und geben Sie Ihre Rechnungsanschrift getrennt vom Aufstellort an. Baustellen bedienen wir nicht."],
] as const;

export function Faq() {
  return <section id="faq" className={styles.faq} aria-labelledby="faq-title">
    <div className={styles.intro}><h2 id="faq-title">Gut zu wissen. Vor Ihrer Anfrage.</h2><p>Die wichtigsten Antworten zu Aufstellung, Ausstattung und Abrechnung.</p></div>
    <div>{questions.map(([question, answer]) => <details key={question} className={styles.item}><summary>{question}</summary><p>{answer}</p></details>)}</div>
  </section>;
}

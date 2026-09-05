import { MapConsent } from "@/components/MapConsent";
import { WhatsappButton } from "@/components/WhatsappButton";
import styles from "./RegionTrust.module.css";

const places = [
  "Daaden",
  "Herdorf",
  "Neunkirchen",
  "Niederfischbach",
  "Dillenburg",
  "Haiger",
  "Westerwald",
] as const;

const reviews = [
  {
    id: "vivien",
    name: "Vivien F.",
    quote:
      "Ich habe für ein größeres Event einen 3+1/3 Toilettenwagen gebucht. Der Toilettenwagen war sehr modern und optisch wirklich ansprechend, alles war super sauber und der gesamte Ablauf inklusive Lieferung, Aufbau, Abbau und Abholung war tadellos. Preis und Leistung waren wirklich top. Uneingeschränkt weiterzuempfehlen!",
  },
  {
    id: "eileen",
    name: "Eileen D.",
    quote:
      "Pünktliche Lieferung, sauberer, gepflegter Wagen und gute Kommunikation. Sehr zu empfehlen.",
  },
  {
    id: "ralf",
    name: "Ralf B.",
    quote:
      "Sehr einfache Buchung, pünktliche Lieferung und ein sehr flexibles Team. Als der geplante Aufstellort nicht möglich war, wurde unkompliziert umgeplant. Sehr moderner Toilettenwagen.",
  },
  {
    id: "alic",
    name: "Alic.",
    quote:
      "Top Service von Anfang bis Ende! Freundliches Team, schnelle und unkomplizierte Abwicklung sowie zuverlässige und saubere Arbeit. Vielen Dank – jederzeit gerne wieder!",
  },
  {
    id: "hans",
    name: "Hans D.",
    quote:
      "Super klasse. Die Jungs machen echt gute Arbeit. Bei Problemen ist sofort jemand zur Stelle. Jederzeit wieder. Der Toilettenwagen ist echt klasse.",
  },
] as const;

const reviewClasses: Record<(typeof reviews)[number]["id"], string> = {
  vivien: styles.reviewFeature,
  eileen: styles.reviewEileen,
  ralf: styles.reviewRalf,
  alic: styles.reviewAlic,
  hans: styles.reviewHans,
};

export function RegionTrust() {
  return (
    <section id="region" className={styles.region}>
      <div className={styles.inner}>
        <header className={styles.intro}>
          <h2>Aus Niederdreisbach. Für die Region.</h2>
          <div>
            <p className={styles.radiusStatement}>
              Unser reguläres Einsatzgebiet reicht ungefähr 125&nbsp;km um den
              Standort der Wagen.
            </p>
            <p>
              Weitere Strecken sind auf Anfrage möglich. Entscheidend sind Ort,
              Termin und die konkrete Aufstellung – nicht eine starre Linie auf
              der Karte.
            </p>
          </div>
        </header>

        <div className={styles.placeField}>
          <div className={styles.origin}>
            <span>Standort der Wagen</span>
            <strong>Niederdreisbach</strong>
          </div>
          <div className={styles.placeList}>
            <p>Ortsbeispiele aus dem regulären Umfeld</p>
            <ul>
              {places.map((place) => (
                <li key={place}>{place}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.mapStory}>
          <div className={styles.mapCopy}>
            <h3>Liegt Ihr Ort dazwischen oder etwas weiter?</h3>
            <p>
              Senden Sie uns Ort, Zeitraum und Anlass. Wir prüfen die Strecke
              gemeinsam mit der passenden Wagen-Größe und nennen die Anfahrt
              transparent im persönlichen Angebot.
            </p>
            <WhatsappButton className={styles.whatsapp} />
          </div>
          <MapConsent />
        </div>

        <section className={styles.reviews} aria-labelledby="reviews-title">
          <header className={styles.reviewsIntro}>
            <h2 id="reviews-title">Was nach der Abholung bleibt.</h2>
            <p>
              Fünf echte Google-Stimmen über saubere Wagen, verlässliche
              Lieferung und unkomplizierte Lösungen vor Ort.
            </p>
          </header>

          <div className={styles.reviewField}>
            {reviews.map((review) => (
              <figure
                key={review.id}
                className={`${styles.review} ${reviewClasses[review.id]}`}
              >
                <blockquote>
                  <p>{review.quote}</p>
                </blockquote>
                <figcaption>
                  <cite>{review.name}</cite>
                  <span>Google-Bewertung</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

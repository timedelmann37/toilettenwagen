import { ReviewMarquee } from "@/components/ReviewMarquee";
import { reviewPreview } from "@/lib/reviews";
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
  "Siegen",
  "Netphen",
  "Rennerod",
  "Betzdorf",
] as const;

export function RegionTrust() {
  return (
    <section id="region" className={styles.region}>
      <div className={styles.inner}>
        <header className={styles.intro}>
          <h2>Aus Niederdreisbach. Für die Region.</h2>
          <div>
            <p className={styles.radiusStatement}>
              Unser reguläres Einsatzgebiet reicht ungefähr 125&nbsp;km um den
              Standort der Wagen. Weitere Strecken prüfen wir auf Anfrage.
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
            <h3>Liegt Ihr Ort im Einsatzgebiet?</h3>
            <p>
              Senden Sie uns Ort und Termin. Wir prüfen Entfernung, Anfahrt und
              passende Wagengröße im persönlichen Angebot.
            </p>
            <WhatsappButton className={styles.whatsapp} />
          </div>
          <MapConsent />
        </div>

        <ReviewMarquee reviews={reviewPreview} />
      </div>
    </section>
  );
}

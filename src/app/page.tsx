import { InquiryForm } from "@/components/InquiryForm";
import { Faq } from "@/components/Faq";
import { ModelSelector } from "@/components/ModelSelector";
import { ProcessStory } from "@/components/ProcessStory";
import { RegionTrust } from "@/components/RegionTrust";
import { ServiceProof } from "@/components/ServiceProof";
import { VehicleImage } from "@/components/VehicleImage";
import { WhatsappButton } from "@/components/WhatsappButton";
import { trailerModels, type TrailerModelId } from "@/lib/models";
import { site } from "@/lib/site";
import styles from "./home.module.css";

const vehicleClasses: Record<TrailerModelId, string> = {
  s: styles.vehicleS,
  m: styles.vehicleM,
  l: styles.vehicleL,
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${site.url}/#unternehmen`,
  name: site.legalName,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    postalCode: site.address.postalCode,
    addressLocality: site.address.locality,
    addressCountry: "DE",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <section id="wagen" className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <h1 className={styles.headline}>Drei Größen. Sauber gelöst.</h1>
            <div className={styles.heroDetails}>
            <p className={styles.subtext}>
              Gepflegte, beheizte Toilettenwagen für Feiern, Veranstaltungen
              und Einsätze rund um Niederdreisbach.
            </p>
            <div className={styles.actions}>
              <WhatsappButton />
              <a href="#kontakt" className={styles.secondaryAction}>
                Zum Anfrageformular
              </a>
            </div>
            </div>
          </div>

          <div
            className={styles.family}
            role="group"
            tabIndex={0}
            aria-label="Toilettenwagen als Modellfamilie S, M und L"
          >
            {trailerModels.map((model, index) => (
              <figure
                key={model.id}
                className={`${styles.vehicle} ${vehicleClasses[model.id]}`}
              >
                <VehicleImage
                  model={model.id}
                  alt={`Freigestellter Toilettenwagen Modell ${model.name} mit geöffneten Türen`}
                  sizes="(max-width: 767px) 78vw, 35vw"
                  loading="eager"
                  fetchPriority={index === 1 ? "high" : "auto"}
                />
                <figcaption className={styles.vehicleCaption}>
                  <span className={styles.modelName}>{model.name}</span>
                  <span className={styles.capacity}>
                    bis {model.capacity} Personen
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <ModelSelector />
      <ServiceProof />
      <ProcessStory />
      <RegionTrust />
      <InquiryForm />
      <Faq />
    </>
  );
}

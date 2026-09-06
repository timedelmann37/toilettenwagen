import type { Metadata } from "next";
import { LegalDocument } from "@/components/LegalDocument";
import legalStyles from "@/components/LegalDocument.module.css";
import { createLegalMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = createLegalMetadata(
  "Impressum",
  `Impressum und Anbieterangaben von ${site.legalName}.`,
  "/impressum/",
);

const sections = [
  { href: "#anbieter", label: "Anbieter" },
  { href: "#vertretung", label: "Vertretung" },
  { href: "#kontaktangaben", label: "Kontakt" },
  { href: "#register", label: "Register und Steuer" },
] as const;

export default function ImprintPage() {
  return (
    <LegalDocument
      title="Impressum"
      intro="Die bestätigten Anbieter- und Kontaktdaten unseres Unternehmens auf einen Blick."
      updatedAt="5. September 2026"
      sections={sections}
    >
      <section id="anbieter">
        <h2>Angaben nach § 5 DDG</h2>
        <address>
          <strong>{site.legalName}</strong>
          <br />
          {site.address.street}
          <br />
          {site.address.city}
          <br />
          {site.address.country}
        </address>
      </section>

      <section id="vertretung">
        <h2>Vertretung</h2>
        <p>Vertreten durch die Geschäftsführer:</p>
        <ul>
          {site.managingDirectors.map((director) => (
            <li key={director}>{director}</li>
          ))}
        </ul>
      </section>

      <section id="kontaktangaben">
        <h2>Kontakt</h2>
        <dl className={legalStyles.dataList}>
          <div>
            <dt>Telefon</dt>
            <dd>
              <a href={site.phoneHref}>{site.phone}</a>
            </dd>
          </div>
          <div>
            <dt>E-Mail</dt>
            <dd>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </dd>
          </div>
        </dl>
      </section>

      <section id="register">
        <h2>Register und Steuer</h2>
        <dl className={legalStyles.dataList}>
          <div>
            <dt>Handelsregister</dt>
            <dd>{site.commercialRegisterNumber}</dd>
          </div>
          <div>
            <dt>Umsatzsteuer-ID</dt>
            <dd>{site.vatId}</dd>
          </div>
        </dl>
      </section>
    </LegalDocument>
  );
}

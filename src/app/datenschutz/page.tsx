import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument } from "@/components/LegalDocument";
import { createLegalMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = createLegalMetadata(
  "Datenschutz",
  `Datenschutzhinweise für die Website von ${site.legalName}.`,
  "/datenschutz/",
);

const sections = [
  { href: "#verantwortlich", label: "Verantwortlicher" },
  { href: "#hosting", label: "Hosting" },
  { href: "#speicher", label: "Lokaler Speicher" },
  { href: "#maps", label: "Google Maps" },
  { href: "#kontaktwege", label: "Kontaktwege" },
  { href: "#formular", label: "Anfrageformular" },
  { href: "#inhalte", label: "Schriften und Bewertungen" },
  { href: "#rechte", label: "Ihre Rechte" },
] as const;

export default function PrivacyPage() {
  return (
    <LegalDocument
      title="Datenschutz"
      intro="Hier steht, welche Daten diese Website tatsächlich verarbeitet, wann externe Dienste geladen werden und welche Entscheidung bei Ihnen bleibt."
      updatedAt="5. September 2026"
      sections={sections}
    >
      <section id="verantwortlich">
        <h2>Verantwortlicher</h2>
        <address>
          <strong>{site.legalName}</strong>
          <br />
          {site.address.street}
          <br />
          {site.address.city}
          <br />
          {site.address.country}
        </address>
        <p>
          Telefon: <a href={site.phoneHref}>{site.phone}</a>
          <br />
          E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      </section>

      <section id="hosting">
        <h2>Hosting und Server-Protokolle</h2>
        <p>
          Diese Website wird als statische Website auf Webhosting-Infrastruktur
          der Hetzner Online GmbH bereitgestellt. Beim Aufruf werden technisch
          erforderliche Verbindungsdaten verarbeitet. Dazu können insbesondere
          IP-Adresse, Datum und Uhrzeit, aufgerufene Datei, übertragene
          Datenmenge, Referrer sowie Browser- und Betriebssystemangaben gehören.
        </p>
        <p>
          Die Verarbeitung dient der sicheren und stabilen Bereitstellung der
          Website und der Fehleranalyse. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f
          DSGVO. Unser berechtigtes Interesse liegt in einem sicheren und
          technisch zuverlässigen Webangebot. Weitere Informationen finden Sie
          in den{" "}
          <a
            href="https://www.hetzner.com/de/legal/privacy-policy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Datenschutzhinweisen von Hetzner
          </a>
          .
        </p>
      </section>

      <section id="speicher">
        <h2>Lokaler Browser-Speicher</h2>
        <p>
          Die Website setzt keine Analyse- oder Marketing-Cookies ein. Für zwei
          rein funktionale Einstellungen nutzt sie den Speicher Ihres Browsers:
        </p>
        <ul>
          <li>
            Im <strong>lokalen Speicher</strong> wird festgehalten, ob Sie dem
            Laden von Google Maps zugestimmt oder es abgelehnt haben.
          </li>
          <li>
            Im <strong>Sitzungsspeicher</strong> werden die ausgewählte
            Wagengröße, der Anlass und die Preisansicht gespeichert, damit diese
            Auswahl innerhalb des geöffneten Tabs erhalten bleibt.
          </li>
        </ul>
        <p>
          Diese Angaben verlassen dadurch nicht Ihren Browser. Sie können den
          Speicher über die Einstellungen Ihres Browsers löschen.
        </p>
      </section>

      <section id="maps">
        <h2>Google Maps nur nach Ihrer Einwilligung</h2>
        <p>
          Die Karte im Bereich „Region“ wird erst geladen, wenn Sie aktiv
          zustimmen. Vorher stellt diese Website keine Kartenverbindung zu
          Google her. Nach Ihrer Zustimmung baut Ihr Browser eine direkte
          Verbindung zu Google auf. Dabei können insbesondere Ihre IP-Adresse
          und technische Browserdaten an Google übermittelt werden.
        </p>
        <p>
          Rechtsgrundlage ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO.
          Sie können Ihre Entscheidung jederzeit für die Zukunft ändern. Öffnen
          Sie dazu die{" "}
          <Link href="/#region">Karteneinstellung im Bereich Region</Link>. Weitere
          Informationen finden Sie in der{" "}
          <a
            href="https://policies.google.com/privacy?hl=de"
            target="_blank"
            rel="noopener noreferrer"
          >
            Datenschutzerklärung von Google
          </a>
          .
        </p>
      </section>

      <section id="kontaktwege">
        <h2>Telefon, E-Mail und WhatsApp</h2>
        <p>
          Wenn Sie uns telefonisch oder per E-Mail kontaktieren, verarbeiten wir
          die von Ihnen übermittelten Angaben, um Ihre Anfrage zu beantworten
          und gegebenenfalls vorvertragliche Schritte durchzuführen.
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit es um eine
          konkrete Mietanfrage geht; im Übrigen Art. 6 Abs. 1 lit. f DSGVO.
        </p>
        <p>
          Der WhatsApp-Link ist ein externer Kontaktweg. Erst wenn Sie ihn
          öffnen, verlassen Sie diese Website und stellen eine Verbindung zu
          WhatsApp her. Für Personen in der Europäischen Region wird der Dienst
          von WhatsApp Ireland Limited bereitgestellt. Es gelten die{" "}
          <a
            href="https://www.whatsapp.com/legal/privacy-policy-eea?lang=de"
            target="_blank"
            rel="noopener noreferrer"
          >
            Datenschutzbestimmungen von WhatsApp
          </a>
          . Sie können uns stattdessen jederzeit per Telefon oder E-Mail
          erreichen.
        </p>
      </section>

      <section id="formular">
        <h2>Anfrageformular im aktuellen Projektstand</h2>
        <p>
          Das Anfrageformular prüft die eingegebenen Daten derzeit ausschließlich
          lokal in Ihrem Browser. Solange kein Versand-Endpunkt konfiguriert ist,
          werden die Formularangaben weder an uns übertragen noch serverseitig
          gespeichert. Das Formular weist vor dem Absenden sichtbar auf diesen
          Vorschauzustand hin.
        </p>
        <p>
          Vorgesehen sind Name, E-Mail-Adresse und Telefonnummer,
          Privat- oder Firmenanfrage, gegebenenfalls Firmenname, Aufstellort und
          Rechnungsanschrift, Liefertag und Nutzungszeitraum, gewünschtes Modell, Anlass und eine
          optionale Nachricht. Vor der späteren Aktivierung des Mailversands wird
          dieser Abschnitt an den tatsächlich eingesetzten Versandweg, die
          Speicherdauer und die Empfänger angepasst.
        </p>
      </section>

      <section id="inhalte">
        <h2>Schriften und Kundenstimmen</h2>
        <p>
          Die verwendeten Webschriften werden mit der Website ausgeliefert. Beim
          Lesen der Seite entsteht deshalb keine Verbindung zu einem externen
          Schriftenanbieter. Kundenstimmen sind als statische Inhalte hinterlegt;
          es wird dafür kein Bewertungs-Widget von Google oder einem anderen
          Anbieter geladen.
        </p>
      </section>

      <section id="rechte">
        <h2>Ihre Datenschutzrechte</h2>
        <p>
          Sie haben im Rahmen der gesetzlichen Voraussetzungen das Recht auf
          Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
          Datenübertragbarkeit und Widerspruch. Eine erteilte Einwilligung können
          Sie jederzeit mit Wirkung für die Zukunft widerrufen.
        </p>
        <p>
          Wenn Sie Ihre Rechte ausüben möchten, schreiben Sie an{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>. Außerdem haben Sie
          das Recht, sich bei einer zuständigen Datenschutzaufsichtsbehörde zu
          beschweren.
        </p>
      </section>
    </LegalDocument>
  );
}

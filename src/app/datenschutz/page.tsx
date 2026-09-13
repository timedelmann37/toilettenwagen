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
  { href: "#adresssuche", label: "Adresssuche" },
  { href: "#inhalte", label: "Lokale Schriften" },
  { href: "#bewertungen", label: "Google-Bewertungen" },
  { href: "#speicherdauer", label: "Speicherdauer" },
  { href: "#rechte", label: "Ihre Rechte" },
] as const;

export default function PrivacyPage() {
  return (
    <LegalDocument
      title="Datenschutz"
      intro="Hier steht, welche Daten diese Website tatsächlich verarbeitet, wann externe Dienste geladen werden und welche Entscheidung bei Ihnen bleibt."
      updatedAt="13. September 2026"
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
          funktionale Bereiche nutzt sie den Speicher Ihres Browsers:
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
          Diese Angaben verlassen dadurch nicht Ihren Browser. Der lokale
          Speicher hat keine automatische Ablaufzeit; die Kartenentscheidung
          bleibt gespeichert, bis Sie diese ändern oder den Speicher löschen.
          Der Sitzungsspeicher ist auf die jeweilige Browsersitzung beschränkt.
          Sie können beide Speicher über die Einstellungen Ihres Browsers löschen.
          Soweit die Speicherung unbedingt erforderlich ist, um die von Ihnen
          ausdrücklich gewünschte Funktion bereitzustellen, erfolgt sie auf
          Grundlage von § 25 Abs. 2 Nr. 2 TDDDG. Soweit dabei personenbezogene
          Daten verarbeitet werden, dient dies unserem berechtigten Interesse
          an einer funktionsfähigen Website gemäß Art. 6 Abs. 1 lit. f DSGVO.
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
          Anbieter ist Google Ireland Limited, Gordon House, Barrow Street,
          Dublin 4, Irland. Eine Verarbeitung durch Google LLC in den USA
          ist möglich. Sind Sie bei Google angemeldet, kann Google die Nutzung
          Ihrem Konto zuordnen.
        </p>
        <p>
          Rechtsgrundlage ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO.
          Soweit Google Informationen auf Ihrem Endgerät speichert oder ausliest,
          umfasst die Einwilligung auch § 25 Abs. 1 TDDDG.
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
        <p>
          Telefon und E-Mail sind beide erforderlich: die Telefonnummer für
          dringende Rückfragen, die E-Mail-Adresse für Unterlagen und allgemeine
          Absprachen. Die optionale Online-Adresssuche ist davon unabhängig und
          wird im folgenden Abschnitt beschrieben.
        </p>
      </section>

      <section id="adresssuche">
        <h2>Optionale Adresssuche mit Geoapify</h2>
        <p>Erst nach einem Klick auf „Adresssuche aktivieren“ verbindet sich Ihr
          Browser für die Suche mit Geoapify. Übermittelt werden die eingegebene
          PLZ und der Straßen-Suchtext sowie IP-Adresse und technische
          Verbindungsdaten. Die separat eingegebene Hausnummer, Namen,
          Telefonnummern und E-Mail-Adressen werden nicht an die Suche übergeben.
          Sie können die Adresse stattdessen vollständig manuell eingeben.</p>
        <p>Rechtsgrundlage ist Ihre Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO.
          Mit „Suche deaktivieren“ beenden Sie weitere Abfragen für die jeweilige
          Adresshilfe. Beim Neuladen ist eine erneute Aktivierung erforderlich.
          Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt
          unberührt.</p>
        <p>Geoapify verarbeitet Anfrage- und Verbindungsdaten unter anderem zur
          Zugriffskontrolle, Nutzungszählung und Fehleranalyse. Nach Anbieterangaben
          werden Daten erfolgreicher Abfragen in der Regel höchstens 24 Stunden
          vorgehalten; Geoapify nutzt für die API unter anderem Cloudflare und
          Hetzner. Weitere Angaben zu Empfängern und Speicherung finden Sie in den{" "}
          <a href="https://www.geoapify.com/privacy-policy/" target="_blank" rel="noopener noreferrer">Datenschutzhinweisen von Geoapify</a>.</p>
      </section>

      <section id="inhalte">
        <h2>Lokal bereitgestellte Schriften</h2>
        <p>
          Die verwendeten Webschriften werden mit der Website ausgeliefert. Beim
          Lesen der Seite entsteht deshalb keine Verbindung zu einem externen
          Schriftenanbieter.
        </p>
      </section>

      <section id="bewertungen">
        <h2>Google-Bewertungen und Profilbilder</h2>
        <p>
          Wir zeigen ausgewählte Rezensionen aus unserem Google-Unternehmensprofil
          als lokal hinterlegte Zusammenstellung. Angezeigt werden die dort verwendeten
          Anzeigenamen, Sternebewertungen, Bewertungstexte beziehungsweise
          gekennzeichnete Auszüge und, soweit
          vorhanden, Profilbilder. Die Quelle sind vom Unternehmen
          bereitgestellte Screenshots der auf Google veröffentlichten Rezensionen.
          Die Darstellung dient dazu, Interessierten Erfahrungen mit unserem
          Angebot zu zeigen.
        </p>
        <p>
          Die Texte und Profilbilder werden mit dieser Website ausgeliefert.
          Es wird dafür kein Bewertungs-Widget von Google oder einem anderen
          Anbieter geladen. Allein durch das Lesen der Bewertungen entsteht
          keine Verbindung zu Google; Ihre IP-Adresse wird dafür nicht an Google
          übermittelt. Eine Live-Abfrage über eine Google-API findet derzeit
          nicht statt.
        </p>
        <p>
          Wenn eine hier gezeigte Rezension oder ein Profilbild von Ihnen stammt,
          können Sie sich bei Fragen zur Veröffentlichung, zur Berichtigung oder
          zur Entfernung an <a href={`mailto:${site.email}`}>{site.email}</a> wenden.
          Eine Änderung auf Google wird in dieser statischen Zusammenstellung nicht
          automatisch übernommen. Die Inhalte sind für Besucher dieser Website
          einsehbar und werden über unseren Hosting-Anbieter bereitgestellt.
        </p>
      </section>

      <section id="speicherdauer">
        <h2>Dauer der Speicherung</h2>
        <p>
          Personenbezogene Daten werden nur so lange verarbeitet, wie dies für
          den jeweiligen Zweck erforderlich ist. Kontaktanfragen werden nach
          abschließender Bearbeitung gelöscht, soweit keine gesetzlichen
          Aufbewahrungspflichten oder berechtigten Gründe zur Geltendmachung,
          Ausübung oder Verteidigung von Rechtsansprüchen entgegenstehen.
          Vertrags- und Abrechnungsunterlagen unterliegen gegebenenfalls
          handels- und steuerrechtlichen Aufbewahrungspflichten.
        </p>
        <p>
          Lokal hinterlegte Rezensionen bleiben bis zur Entfernung aus dem
          Website-Inhalt sichtbar; eine automatische Synchronisierung oder
          Löschung anhand des Google-Profils findet derzeit nicht statt.
          Für den Browser-Speicher gelten die oben beschriebenen
          Löschmöglichkeiten.
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
        <p>
          Bei einer Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO
          können Sie aus Gründen Ihrer besonderen Situation widersprechen
          (Art. 21 DSGVO). Ein Widerruf berührt nicht die Rechtmäßigkeit der
          Verarbeitung bis zum Widerruf.
        </p>
        <p>
          Für unseren Sitz in Rheinland-Pfalz ist der{" "}
          <a href="https://www.datenschutz.rlp.de/" target="_blank" rel="noopener noreferrer">
            Landesbeauftragte für den Datenschutz und die Informationsfreiheit Rheinland-Pfalz
          </a>{" "}
          eine zuständige Anlaufstelle. Sie können sich auch an die
          Aufsichtsbehörde Ihres Aufenthaltsorts oder Arbeitsplatzes wenden.
        </p>
      </section>
    </LegalDocument>
  );
}

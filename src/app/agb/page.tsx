import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument } from "@/components/LegalDocument";
import { createLegalMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = createLegalMetadata(
  "AGB",
  `Allgemeine Geschäftsbedingungen von ${site.legalName}.`,
  "/agb/",
);

/** Ein Absatz einer Klausel; optional mit Aufzählung unterhalb des Absatztextes. */
type ClauseItem = string | { text: string; bullets: readonly string[] };

type Clause = {
  id: string;
  title: string;
  items: readonly ClauseItem[];
};

/** Stand 14.09.2026, vom Betreiber übergebener Wortlaut. Firmenname/Adresse aus site.ts. */
const clauses: readonly Clause[] = [
  { id: "geltungsbereich", title: "§ 1 Geltungsbereich", items: [
    `Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen der ${site.legalName}, nachfolgend „Vermieter“, und ihren Kunden, nachfolgend „Mieter“, über die Vermietung mobiler Sanitäranlagen sowie damit verbundene Leistungen.`,
    "Der genaue Umfang der jeweils geschuldeten Leistungen ergibt sich aus dem individuellen Angebot, der Auftragsbestätigung bzw. dem Mietvertrag.",
    "Abweichende oder ergänzende Vereinbarungen zu diesen AGB bedürfen der Bestätigung durch den Vermieter in Textform.",
    "Bei Verträgen mit Verbrauchern gelten ergänzend die zwingenden gesetzlichen Verbraucherschutzvorschriften.",
  ] },
  { id: "vertragsgegenstand", title: "§ 2 Vertragsgegenstand", items: [
    "Gegenstand des Vertrages ist die zeitlich befristete Vermietung mobiler Sanitäranlagen, insbesondere Toilettenwagen verschiedener Größen, sowie der im jeweiligen Angebot vereinbarten Zusatzleistungen.",
    { text: "Zu den möglichen Zusatzleistungen gehören insbesondere:", bullets: [
      "Lieferung und Abholung,",
      "Auf- und Abbau,",
      "Endreinigung,",
      "Bereitstellung von Verbrauchsmaterialien,",
      "Anschluss an geeignete Frisch- und Abwasserleitungen,",
      "sonstige ausdrücklich vereinbarte Sonderleistungen.",
    ] },
    "Maßgeblich für den konkreten Leistungsumfang ist das jeweilige Angebot bzw. die Auftragsbestätigung.",
  ] },
  { id: "vertragsschluss", title: "§ 3 Angebot und Vertragsschluss", items: [
    "Anfragen des Mieters stellen grundsätzlich noch keine verbindliche Buchung dar.",
    "Ein verbindlicher Vertrag kommt zustande, wenn der Vermieter das Angebot bzw. die Buchungsanfrage ausdrücklich bestätigt oder der Mieter ein vom Vermieter abgegebenes Angebot wirksam annimmt.",
    "Die Annahme kann insbesondere per E-Mail oder über andere vom Vermieter zugelassene elektronische Kommunikationswege erfolgen.",
    "Eine bloße Anfrage über ein Kontaktformular oder eine unverbindliche Verfügbarkeitsanfrage stellt noch keine verbindliche Reservierung dar, sofern dies nicht ausdrücklich anders angegeben wird.",
    "Der Vermieter ist berechtigt, eine Buchung abzulehnen, insbesondere wenn die gewünschte Anlage zum gewünschten Zeitraum nicht verfügbar ist oder die Voraussetzungen für eine sichere Aufstellung nicht gegeben sind.",
  ] },
  { id: "mietdauer", title: "§ 4 Mietdauer sowie Lieferung und Abholung", items: [
    "Die Mietdauer richtet sich nach dem im Angebot bzw. Mietvertrag vereinbarten Zeitraum.",
    "Eine Verlängerung der Mietdauer bedarf der vorherigen Zustimmung des Vermieters.",
    "Die Lieferung und Abholung erfolgt nach der im Angebot vereinbarten Planung.",
    "Der Vermieter bestimmt den konkreten Liefer- und Abholzeitpunkt unter Berücksichtigung seiner Touren- und Einsatzplanung, sofern kein konkreter Zeitpunkt ausdrücklich vereinbart wurde.",
    "Eine Angabe wie beispielsweise „07.08. / 08.08.“ bezeichnet grundsätzlich einen vorgesehenen Liefer- bzw. Abholzeitraum. Daraus ergibt sich kein Anspruch des Mieters auf einen bestimmten Uhrzeitpunkt, sofern dieser nicht ausdrücklich vereinbart wurde.",
    "Eine Lieferung bereits am Vortag des eigentlichen Mietbeginns stellt keine zusätzliche Mietzeit dar, sofern die Lieferung in dieser Form im Angebot vorgesehen oder mit dem Mieter vereinbart wurde.",
    "Der Mieter hat sicherzustellen, dass der Aufstellort zum vereinbarten bzw. vom Vermieter angekündigten Lieferzeitpunkt zugänglich und für die Anlieferung vorbereitet ist.",
  ] },
  { id: "preise", title: "§ 5 Preise und Zahlungsbedingungen", items: [
    "Alle Preise verstehen sich zuzüglich der gesetzlichen Umsatzsteuer, sofern nicht ausdrücklich ein Bruttopreis angegeben ist.",
    "Zusatzleistungen werden nach dem jeweiligen Angebot berechnet.",
    "Der reguläre Auf- und Abbau wird mit 75,00 € netto berechnet, sofern im Angebot nichts Abweichendes vereinbart wurde.",
    "Bei besonderen örtlichen, technischen oder organisatorischen Umständen können zusätzliche Leistungen und Kosten entstehen. Solche zusätzlichen Leistungen werden, soweit sie nicht bereits im Angebot enthalten sind, grundsätzlich vor Durchführung mit dem Mieter abgestimmt.",
    { text: "Zu den möglichen zusätzlichen Leistungen gehören insbesondere:", bullets: [
      "zusätzliche Frischwasserverlängerungen,",
      "erschwerte Anschlussarbeiten,",
      "Arbeiten an Revisions- oder Kanalschächten,",
      "besondere Aufstellbedingungen,",
      "zusätzliche Wartezeiten,",
      "erschwerte Zufahrten,",
      "zusätzliche Reinigungs- oder Reparaturarbeiten.",
    ] },
    "Eine zusätzliche 20-m-Frischwasserverlängerung wird mit 20,00 € netto je Verlängerung berechnet, sofern eine solche benötigt und vereinbart wird.",
    "Für die Nutzung bzw. Öffnung eines Revisions- oder Kanalschachtes kann eine zusätzliche Pauschale von 50,00 € netto berechnet werden.",
    "Der Vermieter ist berechtigt, vor Beginn der Vermietung eine angemessene Anzahlung oder Kaution zu verlangen. Höhe und Zahlungszeitpunkt werden im Angebot bzw. Mietvertrag festgelegt.",
  ] },
  { id: "zahlung", title: "§ 6 Rechnungen, Zahlungsfristen und Zahlungsverzug", items: [
    "Rechnungen sind, sofern im Angebot oder auf der Rechnung nichts Abweichendes vereinbart ist, innerhalb von 14 Kalendertagen ab Rechnungsdatum zu bezahlen.",
    "Nach Ablauf der Zahlungsfrist kann der Vermieter eine Zahlungserinnerung mit einer weiteren Zahlungsfrist von 7 Kalendertagen versenden.",
    "Nach erfolglosem Ablauf dieser Frist kann eine erste Mahnung erfolgen.",
    "Bei einem Unternehmer als Schuldner kann der Vermieter bei Vorliegen der gesetzlichen Voraussetzungen die gesetzliche Verzugspauschale in Höhe von 40,00 € verlangen.",
    "Gegenüber Verbrauchern wird die vorgenannte Verzugspauschale nicht verlangt.",
    "Nach erfolgloser erster Mahnung kann dem Schuldner eine weitere Zahlungsfrist von 7 Kalendertagen eingeräumt werden.",
    "Nach Ablauf dieser Frist kann eine weitere bzw. letzte Mahnung erfolgen.",
    "Ab Eintritt des gesetzlichen Zahlungsverzugs können die jeweils gesetzlich geschuldeten Verzugszinsen sowie weitere gesetzlich zulässige Verzugsschäden verlangt werden.",
    "Nach erfolglosem Ablauf der gesetzten Zahlungsfristen ist der Vermieter berechtigt, die offene Forderung an ein Inkassounternehmen oder einen Rechtsanwalt zu übergeben und erforderlichenfalls gerichtlich geltend zu machen.",
    "Die gesetzlichen Voraussetzungen für den Eintritt des Zahlungsverzugs bleiben unberührt.",
  ] },
  { id: "aufstellung", title: "§ 7 Voraussetzungen für Lieferung und Aufstellung", items: [
    "Der Mieter hat einen für die Aufstellung geeigneten, sicheren und zugelassenen Aufstellort bereitzustellen.",
    { text: "Der Aufstellort muss insbesondere:", bullets: [
      "ausreichend fest und tragfähig,",
      "möglichst eben,",
      "standsicher,",
      "ausreichend zugänglich und",
      "für den Sanitärwagen geeignet sein.",
    ] },
    "Stark abschüssige, aufgeweichte, instabile oder erheblich unebene Flächen können für die Aufstellung ungeeignet sein.",
    "Der Mieter hat vor der Anlieferung sicherzustellen, dass sämtliche erforderlichen Genehmigungen und Zustimmungen für die Aufstellung und Nutzung vorliegen.",
    "Der Mieter ist für die Richtigkeit der Angaben zum Aufstellort verantwortlich.",
    "Der Vermieter kann die Aufstellung verweigern oder abbrechen, wenn die örtlichen Gegebenheiten eine sichere Aufstellung oder einen sicheren Anschluss nicht ermöglichen.",
    { text: "Dies gilt insbesondere bei:", bullets: [
      "fehlender oder nicht ausreichender Tragfähigkeit des Untergrundes,",
      "erheblich ungeeignetem Gelände,",
      "nicht ausreichender Zufahrt,",
      "fehlender Rangiermöglichkeit,",
      "ungeeigneten Frischwasser- oder Abwasseranschlüssen,",
      "gefährlichen Arbeitsbedingungen oder",
      "sonstigen Umständen, die eine sichere Durchführung nicht gewährleisten.",
    ] },
    "Kann die vereinbarte Leistung aus Gründen, die der Mieter zu vertreten hat, nicht oder nur teilweise erbracht werden, bleiben die vertraglich vereinbarten Vergütungsansprüche sowie Ansprüche auf Ersatz bereits entstandener und gesetzlich ersatzfähiger Aufwendungen unberührt.",
  ] },
  { id: "anschluss", title: "§ 8 Frischwasser- und Abwasseranschluss", items: [
    "Der Mieter hat geeignete und funktionsfähige Frischwasser- und Abwasseranschlüsse zur Verfügung zu stellen.",
    "Für die Frischwasserversorgung stellt der Vermieter grundsätzlich bis zu 10 Meter Frischwasserschlauch zur Verfügung.",
    "Benötigt der Mieter eine größere Entfernung, können zusätzliche 20-Meter-Verlängerungen gegen eine zusätzliche Vergütung von 20,00 € netto je Verlängerung bereitgestellt werden.",
    "Für den Abwasseranschluss stellt der Vermieter die erforderlichen Abwasserrohre bzw. Abwasserschläuche zur Verfügung.",
    "Zwischen dem Sanitärwagen und dem geeigneten Abwasseranschluss wird eine Entfernung von bis zu etwa 5 Metern empfohlen.",
    "Ein Abwasseranschluss bei einer Entfernung von mehr als 5 Metern kann nach technischer Prüfung im Einzelfall dennoch möglich sein.",
    "Bei einer Abwasserleitung von mehr als 5 Metern übernimmt der Vermieter jedoch keine Garantie für einen jederzeit störungsfreien Ablauf. Dies gilt insbesondere bei ungünstigem Gefälle, Höhenunterschieden, langen Leitungswegen oder ungünstiger Leitungsführung.",
    "Soweit gesetzlich zulässig, haftet der Vermieter nicht für Störungen, die nachweislich durch die vom Mieter gewünschte oder zu vertretende außergewöhnliche Leitungslänge oder ungünstige örtliche Anschlussbedingungen verursacht wurden.",
    "Der Vermieter ist nicht verpflichtet, einen Anschluss an eine Regenwasserleitung, ungeeignete Abwasserleitung oder sonstige technisch oder hygienisch ungeeignete Leitung herzustellen.",
    "Ob ein vorhandener Anschluss technisch und hygienisch geeignet ist, kann der Vermieter vor Ort beurteilen.",
    "Ist ein Anschluss aufgrund ungeeigneter, fehlender oder nicht zugänglicher Anschlüsse nicht möglich, gilt § 7 dieser AGB.",
  ] },
  { id: "schaechte", title: "§ 9 Revisions- und Kanalschächte", items: [
    "Muss für die Herstellung des Abwasseranschlusses ein Revisions- oder Kanalschacht geöffnet oder genutzt werden, kann hierfür eine zusätzliche Pauschale von 50,00 € netto berechnet werden.",
    "Der Vermieter ist nicht verpflichtet, in Revisions-, Kanal- oder sonstige Schächte einzusteigen.",
    "Insbesondere bei Schächten, die nicht sicher zugänglich, nicht ausreichend gesichert oder anderweitig gefährlich sind, kann die Durchführung der Anschlussarbeiten abgelehnt werden.",
    "Kann der Anschluss aufgrund eines nicht sicher nutzbaren Schachtes nicht hergestellt werden, gilt § 7 dieser AGB.",
  ] },
  { id: "abdeckung", title: "§ 10 Abwasserkanaldeckel und provisorische Abdeckung", items: [
    "Sofern für den Anschluss ein vorhandener Schacht geöffnet werden muss, kann der Vermieter den vorhandenen Schachtdeckel entfernen und durch eine vom Vermieter mitgeführte, individuell gefertigte Holzabdeckung ersetzen.",
    "Diese Holzabdeckung dient ausschließlich als technische bzw. provisorische Abdeckung.",
    { text: "Die Holzabdeckung ist insbesondere nicht vorgesehen als:", bullets: [
      "öffentliche Gehfläche,",
      "Verkehrsfläche,",
      "Fahrbahn,",
      "Stellfläche für Fahrzeuge,",
      "dauerhaft belastbare Abdeckung oder",
      "anderweitig zugelassene tragende Abdeckung.",
    ] },
    "Der Mieter bzw. Veranstalter hat die betreffende Stelle eigenverantwortlich so abzusichern, dass Gäste, Besucher und sonstige Dritte die Gefahrenstelle nicht betreten oder befahren können.",
    "Hierzu sind je nach örtlicher Situation beispielsweise Absperrgitter, Warnbaken, Bauzäune oder vergleichbare geeignete Sicherungsmittel einzusetzen.",
    "Der Vermieter ist nicht verpflichtet, eine dauerhaft belastbare oder für den öffentlichen Verkehr geeignete Schachtabdeckung oder eine vollständige Baustellenabsicherung bereitzustellen, sofern dies nicht ausdrücklich vereinbart wurde.",
    "Passt eine vom Vermieter mitgeführte provisorische Abdeckung aufgrund besonderer Schachtabmessungen oder örtlicher Gegebenheiten nicht sicher, ist der Vermieter nicht verpflichtet, diese vor Ort baulich anzupassen.",
  ] },
  { id: "abbruch", title: "§ 11 Abbruch oder Verweigerung des Aufbaus", items: [
    "Der Vermieter ist berechtigt, die Aufstellung oder den Anschluss abzubrechen oder zu verweigern, wenn die Durchführung unter den vorgefundenen Bedingungen nicht sicher, technisch nicht möglich oder aus hygienischen Gründen nicht vertretbar ist.",
    "Dies gilt insbesondere bei ungeeignetem Untergrund, fehlender Zufahrt, ungeeigneten Anschlüssen, gefährlichen Schächten oder sonstigen Umständen, die eine sichere Durchführung verhindern.",
    "Soweit die Ursache der nicht möglichen Leistungserbringung aus dem Verantwortungsbereich des Mieters stammt, bleiben die gesetzlichen und vertraglichen Ansprüche des Vermieters unberührt.",
    "Bereits entstandene Anfahrts-, Personal-, Transport- oder sonstige Aufwendungen können nach Maßgabe der gesetzlichen Vorschriften geltend gemacht werden.",
    "Der Vermieter ist berechtigt, zur Dokumentation der vorgefundenen örtlichen Bedingungen Fotos anzufertigen, soweit dies zur Dokumentation der Durchführung, des Zustands oder der Abwicklung des Mietverhältnisses erforderlich ist.",
  ] },
  { id: "zufahrt", title: "§ 12 Zugang und Zufahrt zum Aufstellort", items: [
    "Der Mieter hat sicherzustellen, dass der Aufstellort mit dem für die Lieferung eingesetzten Fahrzeug erreichbar ist.",
    "Die Zufahrt muss ausreichend breit, tragfähig und für das eingesetzte Lieferfahrzeug geeignet sein.",
    "Der Mieter hat insbesondere auf niedrige Durchfahrten, enge Zufahrten, Gewichtsbegrenzungen, Baustellen, Poller, Schranken, enge Kurven und sonstige Hindernisse hinzuweisen.",
    "Wartezeiten oder zusätzliche Aufwendungen, die durch vom Mieter zu vertretende erschwerte oder nicht mögliche Zufahrten entstehen, können dem Mieter nach vorheriger Abstimmung bzw. nach Maßgabe der gesetzlichen Vorschriften berechnet werden.",
  ] },
  { id: "rueckgabe", title: "§ 13 Übergabe und Rückgabe", items: [
    "Die Übergabe erfolgt zum vereinbarten Zeitpunkt und Ort.",
    "Der Mieter verpflichtet sich, die Sanitäranlage während der Mietzeit pfleglich und bestimmungsgemäß zu behandeln.",
    "Bei Rückgabe bzw. Abholung muss sich die Anlage grundsätzlich in dem Zustand befinden, der einer normalen vertragsgemäßen Nutzung entspricht.",
    "Schäden, außergewöhnliche Verschmutzungen, Verstopfungen oder sonstige über die normale Nutzung hinausgehende Beeinträchtigungen können dem Mieter nach Maßgabe der gesetzlichen Vorschriften in Rechnung gestellt werden.",
    "Eine vereinbarte Endreinigung umfasst nur den im Angebot beschriebenen normalen Reinigungsumfang.",
    "Besonders starke Verschmutzungen oder durch unsachgemäße Nutzung verursachte Reinigungsarbeiten können gesondert berechnet werden.",
  ] },
  { id: "selbstabholung", title: "§ 14 Selbstabholung und Selbstaufbau", items: [
    "Eine Selbstabholung und ein Selbstaufbau sind nur nach vorheriger Vereinbarung möglich.",
    "Der Mieter muss über die erforderliche Fahrerlaubnis sowie ein geeignetes Zugfahrzeug verfügen.",
    "Der Mieter ist bei Selbstabholung für den ordnungsgemäßen Transport, die Ladungs- und Betriebssicherheit sowie den fachgerechten Auf- und Abbau verantwortlich.",
    "Der Vermieter stellt, soweit vorgesehen, eine Aufbauanleitung bzw. Einweisung zur Verfügung.",
    "Die Vorgaben des Vermieters und des Herstellers sind einzuhalten.",
    "Der Mieter haftet nach den gesetzlichen Vorschriften für Schäden, die er während des Transports, Auf- oder Abbaus schuldhaft verursacht.",
  ] },
  { id: "pflichten", title: "§ 15 Pflichten des Mieters und Schutz der Anlage", items: [
    "Der Mieter hat die Sanitäranlage während der Mietdauer vor Beschädigung, Diebstahl und Vandalismus angemessen zu schützen.",
    "Schäden, Störungen oder sonstige Auffälligkeiten sind dem Vermieter unverzüglich mitzuteilen.",
    "Der Mieter hat dafür Sorge zu tragen, dass die Anlage nicht durch Gäste, Besucher oder sonstige Dritte unsachgemäß verwendet oder beschädigt wird.",
    "Erforderliche Genehmigungen für die Veranstaltung, die Aufstellung und die Nutzung des Aufstellortes sind vom Mieter einzuholen, sofern nicht ausdrücklich etwas anderes vereinbart wurde.",
  ] },
  { id: "nutzung", title: "§ 16 Bestimmungsgemäße Nutzung", items: [
    "Die Sanitäranlagen dürfen ausschließlich bestimmungsgemäß genutzt werden.",
    "Das Einbringen von Feuchttüchern, Papierhandtüchern, Hygieneartikeln, Windeln, Müll, Essensresten, Flüssigkeiten oder sonstigen Fremdkörpern in Toiletten, Waschbecken oder Abwasserleitungen ist untersagt, soweit diese Stoffe nicht ausdrücklich für die jeweilige Anlage vorgesehen sind.",
    "Verstopfungen oder Schäden, die durch eine unsachgemäße Nutzung verursacht werden, können dem Mieter in Rechnung gestellt werden.",
    "Dies gilt insbesondere für zusätzliche Reinigungs-, Entstopfungs-, Reparatur- und Anfahrtskosten, soweit diese durch den Mieter oder ihm zurechenbare Nutzer verursacht wurden.",
  ] },
  { id: "haftung", title: "§ 17 Haftung", items: [
    "Der Mieter haftet nach den gesetzlichen Vorschriften für Schäden, die er oder ihm zurechenbare Personen schuldhaft an der gemieteten Anlage verursachen.",
    "Dies gilt insbesondere für Schäden durch unsachgemäße Nutzung, vorsätzliche Beschädigung, Vandalismus, unsachgemäßen Transport bei Selbstabholung oder fehlende Sicherung der Anlage.",
    "Der Vermieter haftet unbeschränkt für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit, soweit diese auf einer vorsätzlichen oder fahrlässigen Pflichtverletzung des Vermieters, seiner gesetzlichen Vertreter oder Erfüllungsgehilfen beruhen.",
    "Für sonstige Schäden haftet der Vermieter bei Vorsatz und grober Fahrlässigkeit nach den gesetzlichen Vorschriften.",
    "Bei einfacher Fahrlässigkeit haftet der Vermieter nur bei Verletzung wesentlicher Vertragspflichten. In diesem Fall ist die Haftung auf den bei Vertragsschluss vorhersehbaren und typischerweise eintretenden Schaden begrenzt.",
    "Die gesetzlichen Haftungsregelungen bleiben im Übrigen unberührt.",
  ] },
  { id: "stornierung", title: "§ 18 Stornierung", items: [
    "Eine Stornierung hat in Textform, insbesondere per E-Mail, zu erfolgen.",
    { text: "Sofern im individuellen Angebot keine abweichenden Regelungen vereinbart wurden, gelten folgende Stornierungspauschalen:", bullets: [
      "bis 12 Wochen vor Mietbeginn: 20 % des vereinbarten Mietpreises",
      "bis 8 Wochen vor Mietbeginn: 50 % des vereinbarten Mietpreises",
      "ab 4 Wochen vor Mietbeginn: 100 % des vereinbarten Mietpreises",
    ] },
    "Die vorgenannten Zeiträume gelten jeweils ab dem Tag des vereinbarten Mietbeginns rückwärts.",
    "Dem Mieter bleibt ausdrücklich der Nachweis gestattet, dass dem Vermieter kein oder ein wesentlich geringerer Schaden entstanden ist.",
    "Dem Vermieter bleibt der Nachweis eines tatsächlich höheren Schadens vorbehalten, soweit dies gesetzlich zulässig ist.",
    "Gesetzliche Rücktritts-, Kündigungs- oder Widerrufsrechte bleiben unberührt.",
  ] },
  { id: "hoehere-gewalt", title: "§ 19 Höhere Gewalt", items: [
    "Ereignisse höherer Gewalt sowie sonstige unvorhersehbare Ereignisse, die außerhalb des Einflussbereichs der Parteien liegen und die Leistungserbringung erheblich erschweren oder unmöglich machen, werden nach den gesetzlichen Vorschriften behandelt.",
    "Hierzu können insbesondere Naturereignisse, extreme Wetterlagen, behördliche Maßnahmen, erhebliche Verkehrsbehinderungen, Streiks, Krieg, Epidemien oder sonstige vergleichbare Ereignisse gehören.",
    "Die Parteien sind verpflichtet, sich über ein solches Ereignis unverzüglich zu informieren und nach Möglichkeit gemeinsam nach einer zumutbaren Lösung zu suchen.",
    "Im Übrigen gelten die gesetzlichen Rechte und Pflichten.",
  ] },
  { id: "datenschutz", title: "§ 20 Datenschutz", items: [
    "Die Verarbeitung personenbezogener Daten erfolgt nach den jeweils geltenden datenschutzrechtlichen Vorschriften.",
    "Einzelheiten zur Verarbeitung personenbezogener Daten, zu eingesetzten Drittanbietern sowie zu auf der Website verwendeten Diensten, insbesondere Kartendiensten wie Google Maps, ergeben sich aus der gesonderten Datenschutzerklärung des Vermieters.",
  ] },
  { id: "schlussbestimmungen", title: "§ 21 Schlussbestimmungen", items: [
    "Es gilt das Recht der Bundesrepublik Deutschland.",
    "Gegenüber Verbrauchern gelten die gesetzlichen Gerichtsstände.",
    "Gegenüber Unternehmern ist – soweit gesetzlich zulässig – der Gerichtsstand am Sitz des Vermieters vereinbart.",
    "Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.",
    "An die Stelle der unwirksamen Bestimmung treten die gesetzlichen Vorschriften.",
  ] },
];

const validFrom = "14. September 2026";

const withdrawalFormLines = [
  "Gebuchte Dienstleistung / Toilettenwagen:",
  "Mietzeitraum:",
  "Bestellt am:",
  "Name des/der Verbraucher(s):",
  "Anschrift des/der Verbraucher(s):",
  "Datum:",
  "Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)",
] as const;

const sections = [
  ...clauses.map((clause) => ({ href: `#${clause.id}` as const, label: clause.title })),
  { href: "#widerrufsbelehrung" as const, label: "Widerrufsbelehrung" },
  { href: "#widerrufsformular" as const, label: "Muster-Widerrufsformular" },
];

export default function TermsPage() {
  return (
    <LegalDocument
      title="AGB"
      intro={`Allgemeine Geschäftsbedingungen der ${site.legalName}.`}
      updatedAt={validFrom}
      sections={sections}
    >
      {clauses.map((clause) => (
        <section id={clause.id} key={clause.id}>
          <h2>{clause.title}</h2>
          <ol>
            {clause.items.map((item) => {
              const text = typeof item === "string" ? item : item.text;
              return (
                <li key={text}>
                  {text}
                  {typeof item !== "string" && (
                    <ul>
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ol>
          {clause.id === "datenschutz" && (
            <p>
              <Link href="/datenschutz/">Zur Datenschutzerklärung</Link>
            </p>
          )}
        </section>
      ))}

      <section id="gueltigkeit">
        <p>Gültig ab: {validFrom}</p>
        <p>{site.legalName}</p>
      </section>

      <section id="widerrufsbelehrung">
        <h2>Widerrufsbelehrung</h2>
        <h3>Kein Widerrufsrecht bei verbindlich gebuchten Mietzeiträumen</h3>
        <p>
          Bei Verträgen über die Vermietung von mobilen Sanitäranlagen, bei denen für die
          Erbringung der Leistung ein spezifischer Termin oder Zeitraum verbindlich vereinbart
          wird, besteht für Verbraucher kein gesetzliches Widerrufsrecht nach § 312g Abs. 2
          Nr. 9 BGB.
        </p>
        <p>
          Dies betrifft insbesondere die verbindliche Buchung eines Toilettenwagens für einen
          konkret vereinbarten Zeitraum, beispielsweise für eine Hochzeit, einen Polterabend,
          eine private Feier, ein Vereinsfest, eine Veranstaltung oder einen sonstigen
          bestimmten Veranstaltungstermin.
        </p>
        <p>
          Ein Widerruf des Vertrages nach den gesetzlichen Vorschriften über das
          Widerrufsrecht ist in diesen Fällen daher nicht möglich.
        </p>
        <p>
          Das Recht des Kunden, einen Vertrag nach Maßgabe der vereinbarten
          Stornierungsbedingungen zu stornieren oder gesetzliche Rücktritts- bzw.
          Kündigungsrechte geltend zu machen, bleibt hiervon unberührt.
        </p>
        <h3>Stornierung</h3>
        <p>
          Für die Stornierung einer verbindlich gebuchten Mietleistung gelten die in den
          Allgemeinen Geschäftsbedingungen (AGB) vereinbarten Stornierungsbedingungen
          (<a href="#stornierung">§ 18</a>). Die gesetzlichen Rechte des Kunden bleiben
          unberührt.
        </p>
      </section>

      <section id="widerrufsformular">
        <h2>Muster-Widerrufsformular</h2>
        <p>
          Wenn Sie den Vertrag widerrufen wollen, können Sie dieses Formular ausfüllen und an
          uns zurücksenden.
        </p>
        <h3>An</h3>
        <address>
          {site.legalName}
          <br />
          {site.address.street}
          <br />
          {site.address.city}
          <br />
          {site.address.country}
          <br />
          E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
        </address>
        <p>
          Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über die
          Erbringung der folgenden Dienstleistung:
        </p>
        <ul>
          {withdrawalFormLines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <p>(*) Unzutreffendes streichen.</p>
      </section>
    </LegalDocument>
  );
}

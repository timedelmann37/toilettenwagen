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

const clauses = [
  { id: "geltungsbereich", title: "1. Geltungsbereich", paragraphs: [
    `Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge, Lieferungen und Leistungen zwischen der ${site.legalName}, nachfolgend „Vermieter“, und ihren Kunden, nachfolgend „Mieter“. Abweichende Bedingungen des Mieters finden keine Anwendung, es sei denn, der Vermieter stimmt diesen ausdrücklich schriftlich zu.`,
  ] },
  { id: "vertragsgegenstand", title: "2. Vertragsgegenstand", paragraphs: [
    "Gegenstand des Vertrages ist die zeitlich befristete Vermietung mobiler Sanitäranlagen sowie der im Angebot vereinbarten Leistungen wie Lieferung, Auf- und Abbau sowie Endreinigung. Der genaue Leistungsumfang ergibt sich aus dem jeweiligen Angebot oder Mietvertrag.",
  ] },
  { id: "vertragsschluss", title: "3. Angebot und Vertragsschluss", paragraphs: [
    "Angebote des Vermieters sind freibleibend. Ein Vertrag kommt erst durch schriftliche Auftragsbestätigung oder durch tatsächliche Leistungserbringung zustande.",
  ] },
  { id: "mietdauer", title: "4. Mietdauer", paragraphs: [
    "Die Mietdauer richtet sich nach dem im Angebot oder Mietvertrag vereinbarten Zeitraum. Eine Verlängerung der Mietdauer bedarf der vorherigen schriftlichen Zustimmung des Vermieters.",
  ] },
  { id: "preise", title: "5. Preise und Zahlungsbedingungen", paragraphs: [
    "Alle Preise verstehen sich zuzüglich der gesetzlichen Mehrwertsteuer, sofern nicht ausdrücklich anders ausgewiesen. Zusatzleistungen wie Lieferung, Aufbau, Abbau oder Sonderleistungen werden gesondert berechnet. Für die Endreinigung inklusive Desinfektion wird immer eine Pauschale von 50 € zusätzlich zur Miete berechnet, auch bei besenreiner Rückgabe.",
    "Der Vermieter ist berechtigt, eine Kaution zu verlangen. Die Höhe der Kaution richtet sich nach dem Wert der gemieteten Anlage.",
  ] },
  { id: "rueckgabe", title: "6. Übergabe und Rückgabe", paragraphs: [
    "Die Übergabe der Sanitäranlagen erfolgt zum vereinbarten Zeitpunkt und Ort. Der Mieter verpflichtet sich, die Anlagen pfleglich zu behandeln und ausschließlich bestimmungsgemäß zu nutzen.",
    "Bei Rückgabe sind die Anlagen in ordnungsgemäßem und besenreinem Zustand zurückzugeben. Die Endreinigung inklusive Desinfektion durch den Vermieter wird immer mit einer Pauschale von 50 € zusätzlich zur Miete berechnet, auch bei besenreiner Rückgabe. Bei außergewöhnlicher Verschmutzung können zusätzliche Reinigungskosten entstehen.",
  ] },
  { id: "pflichten", title: "7. Pflichten des Mieters", paragraphs: [
    "Der Mieter verpflichtet sich insbesondere, einen geeigneten und zugelassenen Aufstellort bereitzustellen, erforderliche Genehmigungen selbst einzuholen, die Anlagen vor Beschädigung, Diebstahl und Vandalismus zu schützen sowie Schäden oder Störungen unverzüglich dem Vermieter zu melden.",
    "Für den Abwasseranschluss wird ein Abstand von höchstens 5 Metern zum Sanitärwagen empfohlen. Der Mieter muss Aufstellort und geeigneten, zulässigen Anschluss vor der Lieferung sicherstellen. Bei öffentlichen Flächen muss der Mieter die erforderlichen Genehmigungen selbst einholen und dem Vermieter vor der Lieferung schriftlich vorlegen. Der Vermieter übernimmt weder die Beantragung noch eine Klärung vor Ort. Auf Privatgrund entfällt die Genehmigung zur Nutzung einer öffentlichen Fläche; die Zustimmung des Eigentümers und die örtlichen Vorgaben für den Abwasseranschluss bleiben zu beachten.",
    "Frischwasserschläuche sowie Abwasserschläuche werden vom Vermieter gestellt und sind in der Buchung enthalten. Der Mieter stellt sicher, dass geeignete und funktionsfähige Frisch- und Abwasseranschlüsse am Einsatzort vorhanden und zugänglich sind.",
    "Ist der Anschluss an Frisch- oder Abwasser aufgrund fehlender, ungeeigneter oder nicht zugänglicher Anschlüsse nicht oder nur eingeschränkt möglich, haftet der Mieter für daraus entstehende Mehrkosten, Verzögerungen oder einen Mehraufwand.",
  ] },
  { id: "haftung", title: "8. Haftung", paragraphs: [
    "Der Vermieter haftet nur für Schäden, die auf vorsätzlichem oder grob fahrlässigem Verhalten beruhen. Bei einfacher Fahrlässigkeit haftet der Vermieter nur bei Verletzung wesentlicher Vertragspflichten und beschränkt auf den vorhersehbaren Schaden. Eine Haftung für Folgeschäden, Nutzungsausfall oder entgangenen Gewinn ist ausgeschlossen.",
  ] },
  { id: "stornierung", title: "9. Stornierung", paragraphs: [
    "Stornierungen bedürfen der Schriftform. Sofern nicht anders vereinbart, gelten folgende Stornokosten:",
  ], items: ["bis 12 Wochen vor Mietbeginn: 20 % des Mietpreises", "bis 8 Wochen vor Mietbeginn: 50 % des Mietpreises", "bis 4 Wochen vor Mietbeginn oder später: 100 % des Mietpreises"] },
  { id: "hoehere-gewalt", title: "10. Höhere Gewalt", paragraphs: [
    "Ereignisse höherer Gewalt, die die Leistungserbringung unmöglich oder unzumutbar machen, berechtigen beide Parteien zum Rücktritt vom Vertrag. Schadensersatzansprüche sind in diesem Fall ausgeschlossen.",
  ] },
  { id: "datenschutz", title: "11. Datenschutz", paragraphs: [
    "Die Verarbeitung personenbezogener Daten erfolgt gemäß den geltenden Datenschutzbestimmungen. Weitere Informationen sind der Datenschutzerklärung auf der Website des Vermieters zu entnehmen.",
  ] },
  { id: "schlussbestimmungen", title: "12. Schlussbestimmungen", paragraphs: [
    "Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist, soweit gesetzlich zulässig, der Sitz des Vermieters. Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.",
  ] },
];

export default function TermsPage() {
  return (
    <LegalDocument title="AGB" intro={`Allgemeine Geschäftsbedingungen der ${site.legalName}.`} updatedAt="13. September 2026" sections={clauses.map(clause => ({ href: `#${clause.id}` as const, label: clause.title }))}>
      {clauses.map(clause => (
        <section id={clause.id} key={clause.id}>
          <h2>{clause.title}</h2>
          {clause.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          {clause.items && <ul>{clause.items.map(item => <li key={item}>{item}</li>)}</ul>}
          {clause.id === "datenschutz" && <p><Link href="/datenschutz/">Zur Datenschutzerklärung</Link></p>}
        </section>
      ))}
    </LegalDocument>
  );
}

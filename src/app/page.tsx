// Startseite (One-Pager). Ticket 01 legt nur die Sektions-Anker + Shell an;
// die einzelnen Sektionen werden in den Tickets 02–07 gefüllt.

const sections = [
  { id: "wagen", title: "Unsere Wagen" },
  { id: "leistungen", title: "Alles dabei" },
  { id: "ablauf", title: "So läuft's ab" },
  { id: "einsatzgebiet", title: "Einsatzgebiet" },
  { id: "kundenstimmen", title: "Kundenstimmen" },
  { id: "kontakt", title: "Anfrage" },
] as const;

export default function Home() {
  return (
    <>
      {/* Hero-Platzhalter (Ticket 02) */}
      <section
        id="hero"
        className="mx-auto flex max-w-6xl scroll-mt-20 flex-col justify-center px-4 py-24 sm:px-6"
      >
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          Mobile Sanitäranlagen HS
        </p>
        <h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Toilettenwagen mieten – gepflegt, beheizt, fair berechnet.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-ink-soft">
          Grundgerüst der Startseite. Hero-Inhalt folgt in Ticket 02.
        </p>
      </section>

      {sections.map((s) => (
        <section
          key={s.id}
          id={s.id}
          className="scroll-mt-20 border-t border-line"
        >
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-ink">
              {s.title}
            </h2>
            <p className="mt-2 text-sm text-ink-soft">Abschnitt folgt.</p>
          </div>
        </section>
      ))}
    </>
  );
}

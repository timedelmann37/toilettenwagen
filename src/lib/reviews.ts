export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  avatarUrl?: string;
  dateLabel: string;
  isExcerpt: boolean;
  sourceUrl?: string;
}

// Local review data transcribed from user-supplied Google screenshots.
// Relative dates belong to that screenshot, not to a live API response.
// Intentionally maintained locally; no Google API. Dates retained as source notes only.
export const reviewPreview: readonly Review[] = [
  { id: "kersten-reininger", name: "Kersten Reininger", rating: 5, dateLabel: "vor 4 Tagen", isExcerpt: false,
    text: "Spitzen Anbieter mit Top-Toilettenwagen, neu und gepflegt. Perfekte Kommunikation, ist flexibel und zuverlässig. Die Kombination habe ich zwei Wochen lang gesucht und bei ihm gefunden. Sehr gerne im nächsten Jahr wieder." },
  { id: "hans-dieter", name: "Hans Dieter", rating: 5, dateLabel: "vor 2 Wochen", isExcerpt: false,
    text: "Super klasse. Die Jungs machen echt gute Arbeit. Bei Problemen ist sofort jemand zur Stelle. Jederzeit wieder. Toilettenwagen ist echt klasse. Gruß Alex WW" },
  { id: "eileen-dormann", name: "Eileen Dormann", rating: 5, dateLabel: "vor 2 Wochen", isExcerpt: false,
    text: "Alles super verlaufen 👍🏻\nPünktliche Lieferung, sauberer, gepflegter Wagen und gute Kommunikation.\nSehr zu empfehlen." },
  { id: "lena-hergel", name: "Lena Hergel", rating: 5, dateLabel: "Bearbeitet: vor 2 Wochen", isExcerpt: false, text: "" },
  { id: "tim-edelmann", name: "Tim Edelmann", rating: 5, dateLabel: "vor 3 Monaten", isExcerpt: false, text: "" },
  { id: "nik", name: "Nik", rating: 5, dateLabel: "vor 4 Monaten", isExcerpt: false, text: "" },
  { id: "sevket-baran", name: "Sevket Baran", rating: 5, dateLabel: "vor 4 Monaten", isExcerpt: false, text: "" },
  { id: "markus-d", name: "Markus D", rating: 5, dateLabel: "vor 6 Monaten", isExcerpt: false,
    text: "Die gesamte Abwicklung - von der ersten Anfrage bis zur Abholung - war absolut professionell, freundlich und zuverlässig." },
  { id: "khrystyna-voloshchak", name: "Khrystyna Voloshchak", rating: 5, dateLabel: "vor 3 Monaten", isExcerpt: false, text: "Richtig guter Service!" },
  { id: "adrian", name: "Adrian", rating: 5, dateLabel: "vor 3 Monaten", isExcerpt: false, text: "Alles top!" },
  { id: "vivien-ferbert", name: "Vivien Ferbert", rating: 5, dateLabel: "vor 2 Monaten", isExcerpt: false,
    text: "Ich habe für ein größeres Event einen 3+1/3 Toilettenwagen gebucht. Der Toilettenwagen war sehr modern und optisch wirklich ansprechend, alles war super sauber und der gesamte Ablauf, inkl Lieferung Aufbau/Abbau und Abholung war tadellos. Preis/Leistung war wirklich top.\nUneingeschränkt weiterzuempfehlen!" },
  { id: "leo-b", name: "Leo B", rating: 5, dateLabel: "vor 3 Monaten", isExcerpt: false,
    text: "Wir haben den Toilettenwagen für unser diesjähriges Pfingstlager gemietet und sind durchweg zufrieden.\nDie Kabinen sind großzügig, haben eine kleine Ablagefläche und es gibt sogar zwei Waschbecken (auf dem Damen WC).\nAlles hat problemlos funktioniert - von Lieferung/Anschluss bis Abholung.\nDie Jungs sind sehr flexibel und hilfsbereit.\nImmer wieder gerne!" },
  { id: "robin-mueller", name: "Robin Müller", rating: 5, dateLabel: "vor 4 Tagen", isExcerpt: false,
    text: "Super freundlich, unkompliziert, zuverlässig\nSuper Preis Leistung, Toiletten waren sauber und es war alles dabei was man braucht\nKann man nur empfehlen" },
  {
    id: "ebrar-kargun", name: "Ebrar Kargun", rating: 5,
    avatarUrl: "/fotos/reviews/ebrar-kargun.webp", dateLabel: "vor 2 Monaten",
    text: "Sehr zuverlässiger Service! Pünktlich, professionell und super freundlich. Besonders die Flexibilität und das Entgegenkommen haben uns überzeugt. Alles hat …",
    isExcerpt: true,
  },
  {
    id: "daniel-gergel", name: "Daniel Gergel", rating: 5, dateLabel: "vor 2 Monaten",
    text: "Alles hat reibungslos funktioniert, vom Erstkontakt bis zur Abholung. Die beiden sind sehr flexibel und eine kurzfristige Anmietung war kein Problem.. wer eine …",
    isExcerpt: true,
  },
  {
    id: "alic-32", name: "alic.32", rating: 5, dateLabel: "vor 2 Monaten",
    text: "Top Service von Anfang bis Ende! Freundliches Team, schnelle und unkomplizierte Abwicklung sowie eine zuverlässige und saubere Arbeit. Man merkt, dass hier …",
    isExcerpt: true,
  },
  {
    id: "jeremy-lueckhof", name: "Jeremy Lückhof", rating: 5, dateLabel: "vor 2 Monaten",
    text: "Absolute Weiterempfehlung !!\nDie Toilettenwagen war sauber und das ganze hat sehr unkompliziert funktioniert. …",
    isExcerpt: true,
  },
  {
    id: "saki-egert", name: "Saki Egert", rating: 5, dateLabel: "vor einem Monat",
    text: "Alles hat perfekt funktioniert, der Kontakt war sehr freundlich, der wc Wagen super sauber und die Übergabe war unkompliziert. Vielen Dank!",
    isExcerpt: false,
  },
  {
    id: "ralf-baldus", name: "Ralf Baldus", rating: 5,
    avatarUrl: "/fotos/reviews/ralf-baldus.webp", dateLabel: "vor 2 Monaten",
    text: "Sehr einfache Buchung, pünktliche Lieferung und sehr flexibles Team. Als der geplante Aufstellort nicht möglich war wurde unkompliziert umgeplant. Sehr moderner Toilettenwagen.",
    isExcerpt: false,
  },
  {
    id: "tom-schneider", name: "tom schneider", rating: 5, dateLabel: "vor 3 Monaten",
    text: "Ich habe über das Onlineportal gebucht alles verlief schnell und unkompliziert. Gerne wieder! …",
    isExcerpt: true,
  },
];

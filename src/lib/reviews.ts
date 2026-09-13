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

// Local preview data transcribed from the user-supplied Google screenshot.
// Relative dates belong to that screenshot, not to a live API response.
// Replace this provider with an authorized API adapter; keep Review as the UI seam.
export const reviewPreview: readonly Review[] = [
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

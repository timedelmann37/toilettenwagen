export type TrailerModelId = "s" | "m" | "l";

export type TrailerModel = {
  id: TrailerModelId;
  name: "S" | "M" | "L";
  dimensions: string;
  capacity: number;
  womensCabins: number;
  mensCabins: number;
  urinals: number;
  priceNetCents: number;
  suitability: string;
  specificFeatures: readonly string[];
};

export const sharedFeatures = [
  "Beheizt und ganzjährig einsetzbar",
  "Waschbecken und Spiegel",
  "Innen- und Außenbeleuchtung",
  "Spülung und Tork-Papierspender",
] as const;

export const VAT_RATE_PERCENT = 19;

export function grossPriceCents(priceNetCents: number) {
  return Math.round(priceNetCents * (1 + VAT_RATE_PERCENT / 100));
}

export const trailerModels = [
  {
    id: "s",
    name: "S",
    dimensions: "5,67 × 2,50 × 3,00 m",
    capacity: 200,
    womensCabins: 2,
    mensCabins: 1,
    urinals: 2,
    priceNetCents: 17_500,
    suitability: "Die kompakte Wahl für kleinere Feiern und Einsätze.",
    specificFeatures: ["Warmes und kaltes Wasser", "Sensorarmaturen"],
  },
  {
    id: "m",
    name: "M",
    dimensions: "7,17 × 2,50 × 2,92 m",
    capacity: 400,
    womensCabins: 3,
    mensCabins: 1,
    urinals: 3,
    priceNetCents: 19_000,
    suitability: "Mehr Kapazität für mittelgroße Veranstaltungen.",
    specificFeatures: [],
  },
  {
    id: "l",
    name: "L",
    dimensions: "8,77 × 2,50 × 2,92 m",
    capacity: 600,
    womensCabins: 4,
    mensCabins: 2,
    urinals: 6,
    priceNetCents: 21_000,
    suitability: "Die größte Kapazität der Familie für große Veranstaltungen.",
    specificFeatures: [],
  },
] as const satisfies readonly TrailerModel[];

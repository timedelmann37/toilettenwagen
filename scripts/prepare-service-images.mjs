// Erstellt reproduzierbare, budgetierte Ableitungen der echten Servicefotos.
// Die Originale in public/fotos bleiben unverändert.
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const root = process.cwd();
const photoDirectory = join(root, "public", "fotos");

const derivatives = [
  {
    source: "aussenbeleuchtung.webp",
    target: "aussenbeleuchtung-service-1600.webp",
    width: 1600,
    quality: 80,
  },
  {
    source: "interieur-2.webp",
    target: "interieur-2-service-1200.webp",
    height: 1200,
    quality: 80,
  },
  {
    source: "foto-03.webp",
    target: "foto-03-kabine-1200.webp",
    height: 1200,
    quality: 80,
  },
  {
    source: "foto-08.webp",
    target: "foto-08-urinale-1200.webp",
    height: 1200,
    quality: 78,
  },
  {
    source: "kabinen-aussen.webp",
    target: "kabinen-aussen-s-sondermotiv-1200.webp",
    height: 1200,
    quality: 78,
  },
];

await mkdir(photoDirectory, { recursive: true });

for (const derivative of derivatives) {
  const { source, target, quality, ...resize } = derivative;

  await sharp(join(photoDirectory, source))
    .rotate()
    .resize({ ...resize, withoutEnlargement: true })
    .webp({ quality, smartSubsample: true })
    .toFile(join(photoDirectory, target));

  console.log(`${source} -> ${target}`);
}

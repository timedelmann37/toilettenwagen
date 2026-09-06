// Konvertiert die echten Quell-Fotos aus dem Repo-Root in den nicht ausgelieferten
// Reservepool. Produktionsassets werden anschließend gezielt nach public/fotos/
// abgeleitet (ADR-0001: statischer Export, keine Laufzeitoptimierung).
// Aufruf: node scripts/optimize-images.mjs
import { readdir, mkdir, copyFile, rm } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const OUT = join(ROOT, "assets", "reserve", "fotos");
const MAX_W = 2000;
const QUALITY = 82;

// Kuratierte, sinnvolle Namen für die wichtigen Motive.
const rename = {
  "s-wagen ohne schatten.jpg": "wagen-s-freigestellt",
  "wagen M aussen.jpeg": "wagen-m-aussen",
  "wagen m aussen beleuchtet.jpeg": "wagen-m-aussen-beleuchtet",
  "wagen m aussen offen.jpeg": "wagen-m-aussen-offen",
  "wagen L aussen.jpeg": "wagen-l-aussen",
  "wagen L kabinen.jpeg": "wagen-l-kabinen",
  "wagen L pissoire.jpeg": "wagen-l-urinale",
  "kabinen aussen.jpeg": "kabinen-aussen",
  "kabinen innen.jpeg": "kabinen-innen",
  "interieur.jpeg": "interieur",
  "interieru 2.jpeg": "interieur-2",
  "pissoirs.jpeg": "urinale",
  "einstieg männer.jpeg": "einstieg-herren",
  "aussenbeleuchtung.jpeg": "aussenbeleuchtung",
};

const slug = (name) =>
  name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const isPhoto = (f) => /\.(jpe?g)$/i.test(f);

await mkdir(OUT, { recursive: true });

const entries = await readdir(ROOT);
let whatsappCount = 0;
const moved = [];

for (const file of entries) {
  if (!isPhoto(file)) continue;
  let base = rename[file];
  if (!base) {
    base = /^whatsapp image/i.test(file)
      ? `foto-${String(++whatsappCount).padStart(2, "0")}`
      : slug(file);
  }
  const outPath = join(OUT, `${base}.webp`);
  await sharp(join(ROOT, file))
    .rotate() // EXIF-Orientierung anwenden
    .resize({ width: MAX_W, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(outPath);
  await rm(join(ROOT, file));
  moved.push(`${file} -> assets/reserve/fotos/${base}.webp`);
}

// Logo separat: als PNG (Transparenz) nach public/logo.png.
const logoSrc = join(ROOT, "firmenlogo.png");
try {
  await copyFile(logoSrc, join(ROOT, "public", "logo.png"));
  await rm(logoSrc);
  moved.push("firmenlogo.png -> public/logo.png");
} catch {}

console.log(moved.join("\n"));
console.log(`\n${moved.length} Dateien verarbeitet.`);

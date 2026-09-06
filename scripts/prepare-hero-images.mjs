// Erstellt eine mobile, transparente Ableitung des freigestellten Hero-Wagens.
// Die Desktop-Quelle bleibt unverändert.
import { join } from "node:path";
import sharp from "sharp";

const photoDirectory = join(process.cwd(), "public", "fotos");

await sharp(join(photoDirectory, "wagen-s-hero-1600.webp"))
  .resize({ width: 960, withoutEnlargement: true })
  .webp({ quality: 80, smartSubsample: true, effort: 6 })
  .toFile(join(photoDirectory, "wagen-s-hero-960.webp"));

console.log("wagen-s-hero-1600.webp -> wagen-s-hero-960.webp");

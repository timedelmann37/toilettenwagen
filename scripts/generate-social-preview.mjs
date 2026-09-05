import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourceVehicle = path.join(root, "public", "fotos", "wagen-s-hero-1600.webp");
const sourceLogo = path.join(root, "public", "logo.png");
const outputDirectory = path.join(root, "public", "social");
const output = path.join(outputDirectory, "toilettenwagen-westerwald-og.png");
const squareOutput = path.join(
  outputDirectory,
  "toilettenwagen-westerwald-square.png",
);
const bundledFont = path.join(
  root,
  "scripts",
  "assets",
  "bricolage-grotesque-latin.woff2",
);

async function findNextFont() {
  const chunksDirectory = path.join(root, ".next", "static", "chunks");
  const mediaDirectory = path.join(root, ".next", "static", "media");
  const cssFiles = (await fs.readdir(chunksDirectory)).filter((file) =>
    file.endsWith(".css"),
  );

  for (const file of cssFiles) {
    const css = await fs.readFile(path.join(chunksDirectory, file), "utf8");
    const face = css.match(
      /@font-face\{font-family:Bricolage Grotesque;[^}]*src:url\(\.\.\/media\/([^\)]+\.woff2)\)[^}]*unicode-range:U\+\?\?/,
    );
    if (face) return path.join(mediaDirectory, face[1]);
  }

  throw new Error(
    "Bricolage Grotesque wurde nicht gefunden. Einmal `npm run build` ausführen und erneut starten.",
  );
}

async function ensureFontAsset() {
  try {
    await fs.access(bundledFont);
  } catch {
    const generatedFont = await findNextFont();
    await fs.mkdir(path.dirname(bundledFont), { recursive: true });
    await fs.copyFile(generatedFont, bundledFont);
  }

  return fs.readFile(bundledFont);
}

const font = await ensureFontAsset();
const encodedFont = font.toString("base64");

const typography = Buffer.from(`
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <style>
      @font-face {
        font-family: "Bricolage Social";
        src: url("data:font/woff2;base64,${encodedFont}") format("woff2");
        font-weight: 200 800;
        font-style: normal;
      }
      .display { font-family: "Bricolage Social", sans-serif; font-weight: 670; letter-spacing: -3px; }
      .support { font-family: "Bricolage Social", sans-serif; font-weight: 520; letter-spacing: -0.4px; }
    </style>
    <rect width="1200" height="630" fill="#f2f2ee"/>
    <path d="M72 196H150" stroke="#246bb5" stroke-width="10" stroke-linecap="round"/>
    <text class="display" x="68" y="292" font-size="76" fill="#142b3b">Toilettenwagen</text>
    <text class="display" x="68" y="367" font-size="76" fill="#142b3b">mieten.</text>
    <text class="support" x="72" y="424" font-size="27" fill="#526471">Rund um Niederdreisbach.</text>
    <text class="support" x="72" y="470" font-size="20" fill="#185894">S · M · L für Feiern, Events und Einsätze</text>
  </svg>
`);

const logo = await sharp(sourceLogo)
  .resize({ width: 296, withoutEnlargement: true })
  .ensureAlpha()
  .negate({ alpha: false })
  .png()
  .toBuffer();

const vehicle = await sharp(sourceVehicle)
  .resize({ width: 630, withoutEnlargement: true })
  .png()
  .toBuffer();

const shadow = Buffer.from(`
  <svg width="760" height="120" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="380" cy="60" rx="310" ry="34" fill="#142b3b" fill-opacity="0.16"/>
  </svg>
`);

const squareTypography = Buffer.from(`
  <svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
    <style>
      @font-face {
        font-family: "Bricolage Social";
        src: url("data:font/woff2;base64,${encodedFont}") format("woff2");
        font-weight: 200 800;
        font-style: normal;
      }
      .display { font-family: "Bricolage Social", sans-serif; font-weight: 670; letter-spacing: -3px; }
      .support { font-family: "Bricolage Social", sans-serif; font-weight: 520; letter-spacing: -0.4px; }
    </style>
    <rect width="1080" height="1080" fill="#f2f2ee"/>
    <path d="M72 220H150" stroke="#246bb5" stroke-width="10" stroke-linecap="round"/>
    <text class="display" x="68" y="330" font-size="86" fill="#142b3b">Toilettenwagen</text>
    <text class="display" x="68" y="416" font-size="86" fill="#142b3b">mieten.</text>
    <text class="support" x="72" y="478" font-size="31" fill="#526471">Rund um Niederdreisbach.</text>
  </svg>
`);

const squareVehicle = await sharp(sourceVehicle)
  .resize({ width: 760, withoutEnlargement: true })
  .png()
  .toBuffer();

await fs.mkdir(outputDirectory, { recursive: true });
await sharp(typography)
  .composite([
    { input: logo, left: 70, top: 52 },
    { input: shadow, left: 510, top: 500, blend: "multiply" },
    { input: vehicle, left: 570, top: 142 },
  ])
  .png({ compressionLevel: 9, palette: true, quality: 92 })
  .toFile(output);

await sharp(squareTypography)
  .composite([
    { input: logo, left: 70, top: 52 },
    { input: shadow, left: 160, top: 942, blend: "multiply" },
    { input: squareVehicle, left: 250, top: 495 },
  ])
  .png({ compressionLevel: 9, palette: true, quality: 92 })
  .toFile(squareOutput);

const metadata = await sharp(output).metadata();
const squareMetadata = await sharp(squareOutput).metadata();
console.log(`Social Preview: ${path.relative(root, output)} (${metadata.width}×${metadata.height})`);
console.log(
  `Social Preview: ${path.relative(root, squareOutput)} (${squareMetadata.width}×${squareMetadata.height})`,
);

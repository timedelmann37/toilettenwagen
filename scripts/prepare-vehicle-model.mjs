import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import sharp from "sharp";

const [sourcePath, outputPrefix, desktopWidthArg = "1600"] = process.argv.slice(2);

if (!sourcePath || !outputPrefix) {
  throw new Error(
    "Aufruf: node scripts/prepare-vehicle-model.mjs <quelle> <ziel-prefix> [desktop-breite]",
  );
}

const desktopWidth = Number.parseInt(desktopWidthArg, 10);

if (!Number.isFinite(desktopWidth) || desktopWidth < 960) {
  throw new Error("Die Desktop-Breite muss mindestens 960 px betragen.");
}

const source = sharp(sourcePath).removeAlpha();
const { data, info } = await source.raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
const pixelCount = width * height;
const backgroundCandidate = new Uint8Array(pixelCount);
const exterior = new Uint8Array(pixelCount);
const queue = new Int32Array(pixelCount);
let queueStart = 0;
let queueEnd = 0;

const isBackground = (index) => {
  const offset = index * channels;
  const red = data[offset];
  const green = data[offset + 1];
  const blue = data[offset + 2];
  const minimum = Math.min(red, green, blue);
  const maximum = Math.max(red, green, blue);

  return minimum >= 218 && maximum - minimum <= 24;
};

for (let index = 0; index < pixelCount; index += 1) {
  backgroundCandidate[index] = isBackground(index) ? 1 : 0;
}

const enqueue = (index) => {
  if (!backgroundCandidate[index] || exterior[index]) return;
  exterior[index] = 1;
  queue[queueEnd] = index;
  queueEnd += 1;
};

for (let x = 0; x < width; x += 1) {
  enqueue(x);
  enqueue((height - 1) * width + x);
}

for (let y = 0; y < height; y += 1) {
  enqueue(y * width);
  enqueue(y * width + width - 1);
}

while (queueStart < queueEnd) {
  const index = queue[queueStart];
  queueStart += 1;
  const x = index % width;
  const y = Math.floor(index / width);

  if (x > 0) enqueue(index - 1);
  if (x + 1 < width) enqueue(index + 1);
  if (y > 0) enqueue(index - width);
  if (y + 1 < height) enqueue(index + width);
}

const interiorOpening = new Uint8Array(pixelCount);
const visitedInterior = new Uint8Array(pixelCount);

for (let seed = 0; seed < pixelCount; seed += 1) {
  if (
    !backgroundCandidate[seed] ||
    exterior[seed] ||
    visitedInterior[seed]
  ) {
    continue;
  }

  const component = [];
  queueStart = 0;
  queueEnd = 0;
  queue[queueEnd] = seed;
  queueEnd += 1;
  visitedInterior[seed] = 1;
  let minX = width;
  let maxX = 0;
  let minY = height;
  let maxY = 0;

  while (queueStart < queueEnd) {
    const index = queue[queueStart];
    queueStart += 1;
    component.push(index);
    const x = index % width;
    const y = Math.floor(index / width);
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);

    for (const neighbour of [
      x > 0 ? index - 1 : -1,
      x + 1 < width ? index + 1 : -1,
      y > 0 ? index - width : -1,
      y + 1 < height ? index + width : -1,
    ]) {
      if (
        neighbour >= 0 &&
        backgroundCandidate[neighbour] &&
        !exterior[neighbour] &&
        !visitedInterior[neighbour]
      ) {
        visitedInterior[neighbour] = 1;
        queue[queueEnd] = neighbour;
        queueEnd += 1;
      }
    }
  }

  const componentWidth = maxX - minX + 1;
  const componentHeight = maxY - minY + 1;
  const isStepOpening =
    minY > height * 0.54 &&
    component.length > pixelCount * 0.00018 &&
    componentWidth > width * 0.024 &&
    componentHeight > height * 0.008;

  if (isStepOpening) {
    for (const index of component) interiorOpening[index] = 1;
  }
}

const rgba = Buffer.alloc(pixelCount * 4);

for (let index = 0; index < pixelCount; index += 1) {
  const sourceOffset = index * channels;
  const targetOffset = index * 4;
  rgba[targetOffset] = data[sourceOffset];
  rgba[targetOffset + 1] = data[sourceOffset + 1];
  rgba[targetOffset + 2] = data[sourceOffset + 2];
  rgba[targetOffset + 3] = exterior[index] || interiorOpening[index] ? 0 : 255;
}

// Weiche nur die direkt an die Außenfläche angrenzenden Antialias-Pixel aus
// und entferne dort die weiße Studio-Matte aus den Farbpixeln.
for (let index = 0; index < pixelCount; index += 1) {
  if (rgba[index * 4 + 3] === 0) continue;
  const x = index % width;
  const y = Math.floor(index / width);
  const touchesExterior =
    (x > 0 && rgba[(index - 1) * 4 + 3] === 0) ||
    (x + 1 < width && rgba[(index + 1) * 4 + 3] === 0) ||
    (y > 0 && rgba[(index - width) * 4 + 3] === 0) ||
    (y + 1 < height && rgba[(index + width) * 4 + 3] === 0);

  if (!touchesExterior) continue;
  const sourceOffset = index * channels;
  const minimum = Math.min(
    data[sourceOffset],
    data[sourceOffset + 1],
    data[sourceOffset + 2],
  );
  const edgeAlpha = Math.round(
    Math.max(0, Math.min(1, (218 - minimum) / 24)) * 255,
  );
  const alpha = Math.min(255, Math.max(20, edgeAlpha));
  rgba[index * 4 + 3] = alpha;

  const alphaShare = alpha / 255;
  for (let channel = 0; channel < 3; channel += 1) {
    const unmatte =
      (rgba[index * 4 + channel] - 255 * (1 - alphaShare)) / alphaShare;
    rgba[index * 4 + channel] = Math.max(0, Math.min(255, Math.round(unmatte)));
  }
}

await mkdir(dirname(outputPrefix), { recursive: true });
const image = sharp(rgba, { raw: { width, height, channels: 4 } }).trim({
  background: { r: 0, g: 0, b: 0, alpha: 0 },
  threshold: 2,
});

for (const targetWidth of [desktopWidth, 960]) {
  const targetPath = `${outputPrefix}-${targetWidth}.webp`;
  const result = await image
    .clone()
    .resize({ width: targetWidth, withoutEnlargement: true })
    .webp({ quality: 84, alphaQuality: 100, smartSubsample: true, effort: 6 })
    .toFile(targetPath);
  console.log(`${targetPath}: ${result.width}x${result.height}, ${result.size} Byte`);
}

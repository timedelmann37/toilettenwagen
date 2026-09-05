import path from "node:path";
import process from "node:process";

import sharp from "sharp";

const [inputArgument, outputArgument] = process.argv.slice(2);

if (!inputArgument || !outputArgument) {
  console.error(
    "Usage: node scripts/create-prototype-cutout.mjs <input> <output>",
  );
  process.exit(1);
}

const inputPath = path.resolve(inputArgument);
const outputPath = path.resolve(outputArgument);
const { data, info } = await sharp(inputPath)
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const pixelCount = width * height;
const background = new Uint8Array(pixelCount);
const queue = new Int32Array(pixelCount);
let queueHead = 0;
let queueTail = 0;

function isBackgroundCandidate(pixelIndex) {
  const offset = pixelIndex * channels;
  const red = data[offset];
  const green = data[offset + 1];
  const blue = data[offset + 2];
  const minimum = Math.min(red, green, blue);
  const maximum = Math.max(red, green, blue);

  // The source is a compressed WebP. Its nominally white background contains
  // faint grey and coloured bands, so the connected-edge test deliberately
  // accepts a wider near-white range. Connectivity keeps the bright surfaces
  // inside the vehicle intact.
  return minimum >= 215 && maximum - minimum <= 40;
}

function enqueue(pixelIndex) {
  if (background[pixelIndex] || !isBackgroundCandidate(pixelIndex)) return;

  background[pixelIndex] = 1;
  queue[queueTail] = pixelIndex;
  queueTail += 1;
}

for (let x = 0; x < width; x += 1) {
  enqueue(x);
  enqueue((height - 1) * width + x);
}

for (let y = 0; y < height; y += 1) {
  enqueue(y * width);
  enqueue(y * width + width - 1);
}

while (queueHead < queueTail) {
  const pixelIndex = queue[queueHead];
  const x = pixelIndex % width;
  const y = Math.floor(pixelIndex / width);
  queueHead += 1;

  if (x > 0) enqueue(pixelIndex - 1);
  if (x + 1 < width) enqueue(pixelIndex + 1);
  if (y > 0) enqueue(pixelIndex - width);
  if (y + 1 < height) enqueue(pixelIndex + width);
}

const rgba = Buffer.alloc(pixelCount * 4);
let minX = width;
let minY = height;
let maxX = 0;
let maxY = 0;

for (let pixelIndex = 0; pixelIndex < pixelCount; pixelIndex += 1) {
  const sourceOffset = pixelIndex * channels;
  const targetOffset = pixelIndex * 4;
  const alpha = background[pixelIndex] ? 0 : 255;

  rgba[targetOffset] = data[sourceOffset];
  rgba[targetOffset + 1] = data[sourceOffset + 1];
  rgba[targetOffset + 2] = data[sourceOffset + 2];
  rgba[targetOffset + 3] = alpha;

  if (alpha > 0) {
    const x = pixelIndex % width;
    const y = Math.floor(pixelIndex / width);
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }
}

const padding = 32;
const left = Math.max(0, minX - padding);
const top = Math.max(0, minY - padding);
const right = Math.min(width - 1, maxX + padding);
const bottom = Math.min(height - 1, maxY + padding);

await sharp(rgba, { raw: { width, height, channels: 4 } })
  .extract({
    left,
    top,
    width: right - left + 1,
    height: bottom - top + 1,
  })
  .webp({ lossless: true })
  .toFile(outputPath);

console.log(
  `Created ${outputPath} (${right - left + 1}x${bottom - top + 1}, transparent background)`,
);

import sharp from 'sharp';
import assert from 'node:assert/strict';

// Extract only the connected exterior black matte; preserve dark material inside.
for (const name of ['geka', 'gardena-male', 'gardena-female']) {
  const input = `assets/reserve/fotos/${name}-reference-v2-black.png`;
  const { data, info: { width, height } } = await sharp(input).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const count = width * height;
  const exterior = new Uint8Array(count);
  const queue = new Int32Array(count);
  let head = 0, tail = 0;
  const add = (i) => {
    if (exterior[i] || Math.max(data[i * 3], data[i * 3 + 1], data[i * 3 + 2]) > 28) return;
    exterior[i] = 1;
    queue[tail++] = i;
  };
  for (let x = 0; x < width; x++) { add(x); add((height - 1) * width + x); }
  for (let y = 0; y < height; y++) { add(y * width); add(y * width + width - 1); }
  while (head < tail) {
    const i = queue[head++], x = i % width;
    if (x > 0) add(i - 1);
    if (x < width - 1) add(i + 1);
    if (i >= width) add(i - width);
    if (i + width < count) add(i + width);
  }
  const rgba = Buffer.alloc(count * 4);
  let left = width, top = height, right = 0, bottom = 0;
  for (let i = 0; i < count; i++) {
    data.copy(rgba, i * 4, i * 3, i * 3 + 3);
    rgba[i * 4 + 3] = exterior[i] ? 0 : 255;
    if (!exterior[i]) {
      left = Math.min(left, i % width); right = Math.max(right, i % width);
      top = Math.min(top, Math.floor(i / width)); bottom = Math.max(bottom, Math.floor(i / width));
    }
  }
  const output = `public/fotos/${name}-transparent-v2.webp`;
  await sharp(rgba, { raw: { width, height, channels: 4 } })
    .extract({ left, top, width: right - left + 1, height: bottom - top + 1 })
    .resize(600, 600, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({ top: 20, bottom: 20, left: 20, right: 20, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 90, alphaQuality: 100 }).toFile(output);
  const metadata = await sharp(output).metadata();
  assert.equal(metadata.hasAlpha, true);
  const stats = await sharp(output).stats();
  assert.equal(stats.channels[3].min, 0);
  assert.equal(stats.channels[3].max, 255);
  console.log(output, metadata.width, metadata.height, 'verified transparent alpha');
}

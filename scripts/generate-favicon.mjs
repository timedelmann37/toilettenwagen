import sharp from "sharp";
import { writeFile } from "node:fs/promises";

// Use the existing white company pictogram, not the unreadable full wordmark.
const mark = await sharp("public/logo.png")
  .extract({ left: 0, top: 0, width: 165, height: 161 })
  .resize(208, 208, { fit: "contain", background: "#173548" })
  .png().toBuffer();
const master = await sharp({
  create: { width: 256, height: 256, channels: 4, background: "#173548" },
}).composite([{ input: mark, left: 24, top: 24 }]).png().toBuffer();
await writeFile("src/app/icon.png", master);
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(size => sharp(master).resize(size, size).png().toBuffer()));
const header = Buffer.alloc(6 + sizes.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
images.forEach((data, index) => {
  const entry = 6 + index * 16;
  header[entry] = sizes[index];
  header[entry + 1] = sizes[index];
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(data.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += data.length;
});
await writeFile("src/app/favicon.ico", Buffer.concat([header, ...images]));

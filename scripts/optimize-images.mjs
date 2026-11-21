// Converts PNG/JPG screenshots in src/assets/screens/** to optimized WebP.
//   npm run images
// - resizes to at most 1440px wide (never enlarges)
// - WebP is limited to 16383px in either direction: taller full-page captures are split into -part1, -part2 ...
// - originals are moved to screens-originals/ (outside src/) so nothing is lost and nothing is bundled twice
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.join(process.cwd(), "src", "assets", "screens");
const BACKUP = path.join(process.cwd(), "screens-originals");
const MAX_W = 1440;
const MAX_H = 16000;
const QUALITY = 82;

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));

const files = walk(ROOT).filter((f) => /\.(png|jpe?g)$/i.test(f));
if (!files.length) {
  console.log("No PNG/JPG files found in src/assets/screens. Nothing to do.");
  process.exit(0);
}

for (const file of files) {
  const rel = path.relative(ROOT, file);
  const base = file.replace(/\.[^.]+$/, "");
  const meta = await sharp(file).metadata();
  const scale = Math.min(1, MAX_W / meta.width);
  const w = Math.round(meta.width * scale);
  const h = Math.round(meta.height * scale);
  const resized = await sharp(file).resize({ width: w }).toBuffer();

  if (h <= MAX_H) {
    await sharp(resized).webp({ quality: QUALITY }).toFile(`${base}.webp`);
    console.log(`${rel} -> ${path.basename(base)}.webp (${w}x${h})`);
  } else {
    const parts = Math.ceil(h / MAX_H);
    const partH = Math.ceil(h / parts);
    for (let i = 0; i < parts; i++) {
      const top = i * partH;
      await sharp(resized)
        .extract({ left: 0, top, width: w, height: Math.min(partH, h - top) })
        .webp({ quality: QUALITY })
        .toFile(`${base}-part${i + 1}.webp`);
    }
    console.log(`${rel} is ${h}px tall: split into ${parts} WebP parts (limit is 16383px)`);
  }
  const dest = path.join(BACKUP, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.renameSync(file, dest);
}
console.log(`\nDone. Originals are in ${path.relative(process.cwd(), BACKUP)}/`);

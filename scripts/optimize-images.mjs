import sharp from "sharp";
import { readdir, stat, mkdir } from "fs/promises";
import { join, extname, basename } from "path";

const INPUT_DIR = "public/images";
const OUTPUT_DIR = "public/images";

const MEMBER_PHOTOS = [
  "chiaki.png",
  "tomhirosoeno.png",
  "takagi.png",
  "ito.png",
  "mura.png",
  "friends.png",
];

const PROJECT_PHOTOS = [
  "wazaoipponbackground.jpg",
  "tsukanoma-no-sugoi-sauna.jpg",
];

async function optimizeImage(filename, opts) {
  const input = join(INPUT_DIR, filename);
  const name = basename(filename, extname(filename));
  const output = join(OUTPUT_DIR, `${name}.webp`);

  const pipeline = sharp(input).webp({ quality: opts.quality || 80 });
  if (opts.width) pipeline.resize(opts.width);

  await pipeline.toFile(output);

  const [before, after] = await Promise.all([
    stat(input).then((s) => s.size),
    stat(output).then((s) => s.size),
  ]);

  const reduction = ((1 - after / before) * 100).toFixed(1);
  console.log(
    `  ${filename} → ${name}.webp | ${fmt(before)} → ${fmt(after)} (${reduction}% smaller)`
  );
}

function fmt(bytes) {
  return bytes > 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1)} MB`
    : `${(bytes / 1024).toFixed(0)} KB`;
}

async function main() {
  console.log("Optimizing member photos (512px WebP)...");
  for (const f of MEMBER_PHOTOS) {
    await optimizeImage(f, { width: 512, quality: 80 });
  }

  console.log("\nOptimizing project photos (1920px WebP)...");
  for (const f of PROJECT_PHOTOS) {
    await optimizeImage(f, { width: 1920, quality: 80 });
  }

  console.log("\nDone!");
}

main().catch(console.error);

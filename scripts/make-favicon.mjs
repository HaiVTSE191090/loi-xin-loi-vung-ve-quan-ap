import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const root = process.cwd();
const source = path.join(root, "public", "images", "vy-source.png");
const iconsDir = path.join(root, "public", "icons");

await fs.mkdir(iconsDir, { recursive: true });

const meta = await sharp(source).metadata();
const size = Math.min(meta.width ?? 300, meta.height ?? 300);

// Crop toward the visible face in the supplied portrait.
const left = Math.max(0, Math.floor(((meta.width ?? size) - size) * 0.15));
const top = Math.max(0, Math.floor(((meta.height ?? size) - size) * 0.02));

const square = await sharp(source)
  .extract({ left, top, width: size, height: size })
  .resize(512, 512, { fit: "cover" })
  .png()
  .toBuffer();

const rounded = await sharp(square)
  .composite([
    {
      input: Buffer.from(
        `<svg width="512" height="512" viewBox="0 0 512 512"><rect x="12" y="12" width="488" height="488" rx="96" fill="white"/></svg>`
      ),
      blend: "dest-in"
    }
  ])
  .png()
  .toBuffer();

await sharp(rounded).toFile(path.join(iconsDir, "apple-touch-icon.png"));
await sharp(rounded).resize(192, 192).toFile(path.join(iconsDir, "icon-192.png"));
await sharp(rounded).resize(512, 512).toFile(path.join(iconsDir, "icon-512.png"));
await sharp(rounded).resize(32, 32).toFile(path.join(iconsDir, "favicon-32x32.png"));
await sharp(rounded).resize(16, 16).toFile(path.join(iconsDir, "favicon-16x16.png"));

const ico = await pngToIco([
  path.join(iconsDir, "favicon-16x16.png"),
  path.join(iconsDir, "favicon-32x32.png"),
  path.join(iconsDir, "icon-192.png")
]);

await fs.writeFile(path.join(root, "public", "favicon.ico"), ico);
console.log("Favicon assets generated from public/images/vy-source.png");

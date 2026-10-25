// Lager mindre utgaver av de store bildene, så en telefon ikke laster ned et
// 1440 px bilde for å vise det i en rute på 340 px. Siden er statisk eksportert
// uten bildeserver, så størrelsene ligger ferdig i public/ ved siden av
// originalen (navn-640.webp) og velges av lib/image-loader.ts.
//
// Kjør på nytt når et bilde legges til eller byttes: node scripts/responsive-images.mjs
import { readdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const groups = [
  // Jobbilder og portrett: vises fra full mobilbredde til et halvt skrivebord.
  { dir: 'public/brand/pics_work', widths: [640, 1024] },
  { dir: 'public/brand', only: ['simon-transparent.webp'], widths: [640] },
  // Produktbildene på bilpleie vises på 64–96 px; 192 holder til skarpe 2x-skjermer.
  { dir: 'public/brand/xpel-care', widths: [128, 192] },
];

const variant = /-\d+\.webp$/;
const manifest = {};

for (const { dir, only, widths } of groups) {
  const files = (await readdir(dir)).filter(
    (f) => f.endsWith('.webp') && !variant.test(f) && (!only || only.includes(f)),
  );
  for (const file of files) {
    const src = `${dir}/${file}`;
    const { width } = await sharp(src).metadata();
    const made = [];
    for (const w of widths.filter((w) => w < width)) {
      await sharp(src).resize({ width: w }).webp({ quality: 78 }).toFile(src.replace(/\.webp$/, `-${w}.webp`));
      made.push(w);
    }
    if (made.length) manifest[src.replace(/^public/, '')] = made;
  }
}

await writeFile('lib/responsive-images.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(`${Object.keys(manifest).length} bilder, ${Object.values(manifest).flat().length} utgaver`);

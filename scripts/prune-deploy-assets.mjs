import { readdir, readFile, rm, stat } from "node:fs/promises";
import { dirname, extname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const clientRoot = join(root, "dist", "client");
const sourceRoots = ["app", "components", "lib", "public"].map((directory) => join(root, directory));
const textExtensions = new Set([".ts", ".tsx", ".js", ".mjs", ".css", ".json", ".html", ".md"]);
const mediaExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"]);
const deployedMediaRoots = ["icons", "images", "map"];
const maximumMediaBytes = 2_500_000;

async function filesBelow(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesBelow(path) : [path];
  }))).flat();
}

const sourceFiles = (await Promise.all(sourceRoots.map(filesBelow))).flat()
  .filter((path) => textExtensions.has(extname(path)));
const referenced = new Set();
const assetPattern = /["'`(](\/[A-Za-z0-9._~%/-]+\.(?:avif|gif|jpe?g|png|svg|webp))/gi;

for (const sourceFile of sourceFiles) {
  const source = await readFile(sourceFile, "utf8");
  for (const match of source.matchAll(assetPattern)) referenced.add(decodeURI(match[1]));
}

const nestedMedia = (await Promise.all(deployedMediaRoots.map(async (directory) => {
  const path = join(clientRoot, directory);
  try { return await filesBelow(path); } catch { return []; }
}))).flat();
const rootMedia = (await readdir(clientRoot, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && mediaExtensions.has(extname(entry.name).toLowerCase()))
  .map((entry) => join(clientRoot, entry.name));
const deployedMedia = [...nestedMedia, ...rootMedia];

let removedFiles = 0;
let removedBytes = 0;
let keptBytes = 0;

for (const file of deployedMedia) {
  const url = `/${relative(clientRoot, file).split(sep).join("/")}`;
  const size = (await stat(file)).size;
  if (!referenced.has(url)) {
    await rm(file);
    removedFiles += 1;
    removedBytes += size;
    continue;
  }
  if (size > maximumMediaBytes) {
    throw new Error(`Referenced deploy asset ${url} is ${(size / 1_000_000).toFixed(1)} MB; optimize it below 2.5 MB.`);
  }
  keptBytes += size;
}

const missing = [];
for (const url of referenced) {
  try { await stat(join(clientRoot, url)); } catch { missing.push(url); }
}
if (missing.length) throw new Error(`Referenced public assets are missing from the build:\n${missing.join("\n")}`);

console.log(`[assets] Kept ${(keptBytes / 1_000_000).toFixed(1)} MB of referenced media; removed ${removedFiles} unused files (${(removedBytes / 1_000_000).toFixed(1)} MB).`);

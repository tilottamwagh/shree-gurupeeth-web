import {readdir, readFile, writeFile} from "node:fs/promises";
import {relative, resolve} from "node:path";

const clientDirectory = resolve("dist/client");
const viteManifestPath = resolve(clientDirectory, ".vite/manifest.json");
const viteManifest = JSON.parse(await readFile(viteManifestPath, "utf8"));
const urls = new Set();

function addPublicPath(path) {
  if (typeof path !== "string") return;
  const slashPath = path.replaceAll("\\", "/");
  const normalized = slashPath.startsWith("/") ? slashPath : `/${slashPath}`;
  if (/\.(?:m?js|css|woff2?|ttf|otf)$/i.test(normalized)) urls.add(normalized);
}

for (const entry of Object.values(viteManifest)) {
  addPublicPath(entry.file);
  for (const file of entry.css || []) addPublicPath(file);
  for (const file of entry.assets || []) addPublicPath(file);
}

async function addEmittedStyles(directory) {
  for (const entry of await readdir(directory, {withFileTypes: true})) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) await addEmittedStyles(path);
    else if (entry.isFile()) addPublicPath(relative(clientDirectory, path));
  }
}

await addEmittedStyles(resolve(clientDirectory, "assets"));

const aartiPath = resolve("public/app-assets/aarti.json");
const aartiGroups = JSON.parse(await readFile(aartiPath, "utf8"));
for (const group of aartiGroups) {
  for (const item of group.items || []) {
    const image = item.image;
    if (typeof image === "string" && image.startsWith("/app-assets/")) {
      urls.add(image);
    }
  }
}

await writeFile(
  resolve(clientDirectory, "offline-precache.json"),
  `${JSON.stringify([...urls].sort(), null, 2)}\n`,
  "utf8",
);

console.log(`Generated offline precache manifest with ${urls.size} assets.`);

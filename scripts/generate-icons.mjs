// Regenerates app/favicon.ico, app/icon.png and app/apple-icon.png from scripts/icon-source.svg.
// Usage: node scripts/generate-icons.mjs
import { readFile, writeFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import path from "node:path"
import sharp from "sharp"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const svg = await readFile(path.join(root, "scripts", "icon-source.svg"))
const render = (size) => sharp(svg, { density: 384 }).resize(size, size).png({ compressionLevel: 9 }).toBuffer()

await writeFile(path.join(root, "app", "icon.png"), await render(512))

// Apple touch icons are not masked with transparency, so use a full-bleed square.
const fullBleed = Buffer.from(
  svg.toString().replace(/ rx="96"/, ""),
)
await writeFile(
  path.join(root, "app", "apple-icon.png"),
  await sharp(fullBleed, { density: 384 }).resize(180, 180).png({ compressionLevel: 9 }).toBuffer(),
)

const sizes = [16, 32, 48]
const pngs = await Promise.all(sizes.map(render))
const header = Buffer.alloc(6)
header.writeUInt16LE(1, 2)
header.writeUInt16LE(sizes.length, 4)
let offset = 6 + 16 * sizes.length
const entries = pngs.map((png, i) => {
  const e = Buffer.alloc(16)
  e.writeUInt8(sizes[i], 0)
  e.writeUInt8(sizes[i], 1)
  e.writeUInt16LE(1, 4)
  e.writeUInt16LE(32, 6)
  e.writeUInt32LE(png.length, 8)
  e.writeUInt32LE(offset, 12)
  offset += png.length
  return e
})
await writeFile(path.join(root, "app", "favicon.ico"), Buffer.concat([header, ...entries, ...pngs]))

import { promises as fs } from "fs"
import path from "path"
import type { SpecialsData } from "@/lib/specials-types"

export type { SpecialItem, SpecialsData } from "@/lib/specials-types"
export { createSpecialId } from "@/lib/specials-types"

const SPECIALS_PATH = path.join(process.cwd(), "data", "specials.json")

export async function readSpecials(): Promise<SpecialsData> {
  try {
    const raw = await fs.readFile(SPECIALS_PATH, "utf-8")
    const data = JSON.parse(raw) as SpecialsData
    return { items: Array.isArray(data.items) ? data.items : [] }
  } catch {
    return { items: [] }
  }
}

export async function writeSpecials(specials: SpecialsData): Promise<void> {
  await fs.writeFile(SPECIALS_PATH, `${JSON.stringify(specials, null, 2)}\n`, "utf-8")
}

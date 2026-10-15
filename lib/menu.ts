import { promises as fs } from "fs"
import path from "path"
import type { MenuData } from "@/lib/menu-types"

export type { MenuItem, MenuSubgroup, MenuGroup, MenuSection, MenuData } from "@/lib/menu-types"
export { createItemId } from "@/lib/menu-types"

const MENU_PATH = path.join(process.cwd(), "data", "menu.json")

export async function readMenu(): Promise<MenuData> {
  const raw = await fs.readFile(MENU_PATH, "utf-8")
  return JSON.parse(raw) as MenuData
}

export async function writeMenu(menu: MenuData): Promise<void> {
  await fs.writeFile(MENU_PATH, `${JSON.stringify(menu, null, 2)}\n`, "utf-8")
}

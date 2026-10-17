import { getSupabaseAdmin, getSupabaseAnon } from "@/lib/supabase"
import { assembleMenu, flattenMenu, type MenuItemRow } from "@/lib/menu-transform"
import type { MenuData } from "@/lib/menu-types"

export type { MenuItem, MenuSubgroup, MenuGroup, MenuSection, MenuData } from "@/lib/menu-types"
export { createItemId } from "@/lib/menu-types"

export async function readMenu(): Promise<MenuData> {
  const supabase = getSupabaseAnon()
  const { data, error } = await supabase
    .from("menu_items")
    .select("id, section, name, description, price, sort_order")
    .order("sort_order", { ascending: true })

  if (error) {
    throw new Error(`Failed to load menu from Supabase: ${error.message}`)
  }

  return assembleMenu((data ?? []) as MenuItemRow[])
}

export async function writeMenu(menu: MenuData): Promise<void> {
  const supabase = getSupabaseAdmin()
  const rows = flattenMenu(menu)

  const { error: deleteError } = await supabase.from("menu_items").delete().neq("id", "")
  if (deleteError) {
    throw new Error(`Failed to clear menu_items: ${deleteError.message}`)
  }

  if (rows.length === 0) return

  const { error: insertError } = await supabase.from("menu_items").insert(rows)
  if (insertError) {
    throw new Error(`Failed to save menu_items: ${insertError.message}`)
  }
}

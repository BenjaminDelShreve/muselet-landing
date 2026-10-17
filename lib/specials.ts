import { getSupabaseAdmin, getSupabaseAnon } from "@/lib/supabase"
import type { SpecialItem, SpecialsData } from "@/lib/specials-types"

export type { SpecialItem, SpecialsData } from "@/lib/specials-types"
export { createSpecialId } from "@/lib/specials-types"

type SpecialRow = {
  id: string
  name: string
  description: string | null
  price: string
  sort_order: number
}

export async function readSpecials(): Promise<SpecialsData> {
  const supabase = getSupabaseAnon()
  const { data, error } = await supabase
    .from("specials")
    .select("id, name, description, price, sort_order")
    .order("sort_order", { ascending: true })

  if (error) {
    throw new Error(`Failed to load specials from Supabase: ${error.message}`)
  }

  const items: SpecialItem[] = ((data ?? []) as SpecialRow[]).map((row) => ({
    id: row.id,
    name: row.name,
    price: row.price,
    ...(row.description ? { description: row.description } : {}),
  }))

  return { items }
}

export async function writeSpecials(specials: SpecialsData): Promise<void> {
  const supabase = getSupabaseAdmin()
  const rows: SpecialRow[] = specials.items.map((item, index) => ({
    id: item.id,
    name: item.name,
    description: item.description?.trim() ? item.description : null,
    price: item.price,
    sort_order: index,
  }))

  const { error: deleteError } = await supabase.from("specials").delete().neq("id", "")
  if (deleteError) {
    throw new Error(`Failed to clear specials: ${deleteError.message}`)
  }

  if (rows.length === 0) return

  const { error: insertError } = await supabase.from("specials").insert(rows)
  if (insertError) {
    throw new Error(`Failed to save specials: ${insertError.message}`)
  }
}

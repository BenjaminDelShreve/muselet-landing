export type SpecialItem = {
  id: string
  name: string
  description?: string
  price: string
}

export type SpecialsData = {
  items: SpecialItem[]
}

export function createSpecialId(name: string): string {
  const slug = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
  return `${slug || "special"}-${Date.now().toString(36)}`
}

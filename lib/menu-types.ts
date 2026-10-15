export type MenuItem = {
  id: string
  name: string
  description?: string
  price: string
}

export type MenuSubgroup = {
  id: string
  title: string
  items: MenuItem[]
}

export type MenuGroup = {
  id: string
  title: string
  items?: MenuItem[]
  subgroups?: MenuSubgroup[]
}

export type MenuSection = {
  id: string
  title: string
  items?: MenuItem[]
  groups?: MenuGroup[]
}

export type MenuData = {
  sections: MenuSection[]
}

export function createItemId(name: string): string {
  const slug = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
  return `${slug || "item"}-${Date.now().toString(36)}`
}

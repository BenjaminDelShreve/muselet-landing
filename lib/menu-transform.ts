import type { MenuData, MenuGroup, MenuItem, MenuSection, MenuSubgroup } from "@/lib/menu-types"

export const SECTION_PATH_SEP = "|||"

export type MenuItemRow = {
  id: string
  section: string
  name: string
  description: string | null
  price: string
  sort_order: number
}

function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "section"
  )
}

/** Flatten nested MenuData into flat DB rows, preserving order. */
export function flattenMenu(menu: MenuData): MenuItemRow[] {
  const rows: MenuItemRow[] = []
  let sortOrder = 0

  for (const section of menu.sections) {
    if (section.groups?.length) {
      for (const group of section.groups) {
        if (group.subgroups?.length) {
          for (const subgroup of group.subgroups) {
            for (const item of subgroup.items) {
              rows.push({
                id: item.id,
                section: [section.title, group.title, subgroup.title].join(SECTION_PATH_SEP),
                name: item.name,
                description: item.description?.trim() ? item.description : null,
                price: item.price,
                sort_order: sortOrder++,
              })
            }
          }
        } else {
          for (const item of group.items ?? []) {
            rows.push({
              id: item.id,
              section: [section.title, group.title].join(SECTION_PATH_SEP),
              name: item.name,
              description: item.description?.trim() ? item.description : null,
              price: item.price,
              sort_order: sortOrder++,
            })
          }
        }
      }
    } else {
      for (const item of section.items ?? []) {
        rows.push({
          id: item.id,
          section: section.title,
          name: item.name,
          description: item.description?.trim() ? item.description : null,
          price: item.price,
          sort_order: sortOrder++,
        })
      }
    }
  }

  return rows
}

/** Rebuild nested MenuData from flat DB rows. */
export function assembleMenu(rows: MenuItemRow[]): MenuData {
  const sorted = [...rows].sort((a, b) => a.sort_order - b.sort_order)
  const sections: MenuSection[] = []
  const sectionIndex = new Map<string, MenuSection>()

  for (const row of sorted) {
    const parts = row.section.split(SECTION_PATH_SEP)
    const topTitle = parts[0] ?? "Menu"
    const item: MenuItem = {
      id: row.id,
      name: row.name,
      price: row.price,
      ...(row.description ? { description: row.description } : {}),
    }

    let section = sectionIndex.get(topTitle)
    if (!section) {
      section = { id: slugify(topTitle), title: topTitle }
      sectionIndex.set(topTitle, section)
      sections.push(section)
    }

    if (parts.length === 1) {
      section.items = section.items ?? []
      section.items.push(item)
      continue
    }

    section.groups = section.groups ?? []
    const groupTitle = parts[1] ?? "Group"
    let group = section.groups.find((g) => g.title === groupTitle)
    if (!group) {
      group = { id: slugify(`${topTitle}-${groupTitle}`), title: groupTitle }
      section.groups.push(group)
    }

    if (parts.length === 2) {
      group.items = group.items ?? []
      group.items.push(item)
      continue
    }

    const subgroupTitle = parts[2] ?? "Subgroup"
    group.subgroups = group.subgroups ?? []
    let subgroup: MenuSubgroup | undefined = group.subgroups.find((s) => s.title === subgroupTitle)
    if (!subgroup) {
      subgroup = {
        id: slugify(`${topTitle}-${groupTitle}-${subgroupTitle}`),
        title: subgroupTitle,
        items: [],
      }
      group.subgroups.push(subgroup)
    }
    subgroup.items.push(item)
  }

  // Ensure nested sections don't also carry flat items
  for (const section of sections) {
    if (section.groups?.length) {
      delete section.items
      for (const group of section.groups as MenuGroup[]) {
        if (group.subgroups?.length) delete group.items
      }
    }
  }

  return { sections }
}

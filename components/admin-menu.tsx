"use client"

import { useEffect, useState, type FormEvent } from "react"
import { createItemId, type MenuData, type MenuItem, type MenuSection } from "@/lib/menu-types"
import { createSpecialId, type SpecialItem, type SpecialsData } from "@/lib/specials-types"

type Status = { type: "success" | "error"; message: string } | null
type AdminTab = "menu" | "specials"

export function AdminMenu() {
  const [checking, setChecking] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [loggingIn, setLoggingIn] = useState(false)

  useEffect(() => {
    fetch("/api/admin/session")
      .then((res) => res.json())
      .then((data) => setAuthenticated(Boolean(data.authenticated)))
      .catch(() => setAuthenticated(false))
      .finally(() => setChecking(false))
  }, [])

  async function handleLogin(e: FormEvent) {
    e.preventDefault()
    setLoggingIn(true)
    setLoginError("")
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setLoginError(data.error || "Login failed")
        return
      }
      setAuthenticated(true)
      setPassword("")
    } catch {
      setLoginError("Unable to reach the server")
    } finally {
      setLoggingIn(false)
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" })
    setAuthenticated(false)
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <p className="font-serif text-primary text-lg">Loading…</p>
      </div>
    )
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h1 className="font-serif text-4xl text-primary">Menu Admin</h1>
            <p className="font-serif text-muted-foreground italic">Enter the shared password to continue</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="password" className="font-serif text-sm text-primary tracking-wide uppercase">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full border border-secondary/40 bg-background px-4 py-3 font-serif text-foreground outline-none focus:border-accent focus:ring-1 focus:ring-accent/40 transition-colors"
                required
              />
            </div>
            {loginError && <p className="font-serif text-sm text-red-700">{loginError}</p>}
            <button
              type="submit"
              disabled={loggingIn}
              className="w-full bg-primary text-primary-foreground font-serif tracking-wide uppercase py-3 hover:bg-secondary transition-colors disabled:opacity-60"
            >
              {loggingIn ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return <AdminEditor onLogout={handleLogout} />
}

function AdminEditor({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<AdminTab>("menu")
  const [menu, setMenu] = useState<MenuData | null>(null)
  const [specials, setSpecials] = useState<SpecialsData | null>(null)
  const [activeSectionId, setActiveSectionId] = useState<string>("")
  const [status, setStatus] = useState<Status>(null)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([fetch("/api/menu").then((res) => res.json()), fetch("/api/specials").then((res) => res.json())])
      .then(([menuData, specialsData]: [MenuData, SpecialsData]) => {
        setMenu(menuData)
        setActiveSectionId(menuData.sections[0]?.id ?? "")
        setSpecials({ items: Array.isArray(specialsData.items) ? specialsData.items : [] })
      })
      .catch(() => setStatus({ type: "error", message: "Failed to load admin data" }))
      .finally(() => setLoading(false))
  }, [])

  const activeSection = menu?.sections.find((s) => s.id === activeSectionId)

  async function saveMenu(next: MenuData) {
    setSaving(true)
    setStatus(null)
    try {
      const res = await fetch("/api/menu", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      })
      const data = await res.json()
      if (!res.ok) {
        setStatus({ type: "error", message: data.error || "Save failed" })
        return
      }
      setMenu(next)
      setStatus({ type: "success", message: "Menu saved to data/menu.json" })
    } catch {
      setStatus({ type: "error", message: "Unable to save menu" })
    } finally {
      setSaving(false)
    }
  }

  async function saveSpecials(next: SpecialsData) {
    setSaving(true)
    setStatus(null)
    try {
      const res = await fetch("/api/specials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      })
      const data = await res.json()
      if (!res.ok) {
        setStatus({ type: "error", message: data.error || "Save failed" })
        return
      }
      setSpecials(next)
      setStatus({ type: "success", message: "Specials saved to data/specials.json" })
    } catch {
      setStatus({ type: "error", message: "Unable to save specials" })
    } finally {
      setSaving(false)
    }
  }

  function updateSection(sectionId: string, updater: (section: MenuSection) => MenuSection) {
    if (!menu) return
    const next: MenuData = {
      sections: menu.sections.map((section) => (section.id === sectionId ? updater(section) : section)),
    }
    setMenu(next)
  }

  function updateFlatItem(sectionId: string, itemId: string, patch: Partial<MenuItem>) {
    updateSection(sectionId, (section) => ({
      ...section,
      items: section.items?.map((item) => (item.id === itemId ? { ...item, ...patch } : item)),
    }))
  }

  function deleteFlatItem(sectionId: string, itemId: string) {
    updateSection(sectionId, (section) => ({
      ...section,
      items: section.items?.filter((item) => item.id !== itemId),
    }))
  }

  function addFlatItem(sectionId: string) {
    const item: MenuItem = {
      id: createItemId("new-item"),
      name: "New Item",
      description: "",
      price: "",
    }
    updateSection(sectionId, (section) => ({
      ...section,
      items: [...(section.items ?? []), item],
    }))
  }

  function updateNestedItem(
    sectionId: string,
    groupId: string,
    subgroupId: string | null,
    itemId: string,
    patch: Partial<MenuItem>,
  ) {
    updateSection(sectionId, (section) => ({
      ...section,
      groups: section.groups?.map((group) => {
        if (group.id !== groupId) return group
        if (subgroupId) {
          return {
            ...group,
            subgroups: group.subgroups?.map((subgroup) =>
              subgroup.id === subgroupId
                ? {
                    ...subgroup,
                    items: subgroup.items.map((item) => (item.id === itemId ? { ...item, ...patch } : item)),
                  }
                : subgroup,
            ),
          }
        }
        return {
          ...group,
          items: group.items?.map((item) => (item.id === itemId ? { ...item, ...patch } : item)),
        }
      }),
    }))
  }

  function deleteNestedItem(sectionId: string, groupId: string, subgroupId: string | null, itemId: string) {
    updateSection(sectionId, (section) => ({
      ...section,
      groups: section.groups?.map((group) => {
        if (group.id !== groupId) return group
        if (subgroupId) {
          return {
            ...group,
            subgroups: group.subgroups?.map((subgroup) =>
              subgroup.id === subgroupId
                ? { ...subgroup, items: subgroup.items.filter((item) => item.id !== itemId) }
                : subgroup,
            ),
          }
        }
        return {
          ...group,
          items: group.items?.filter((item) => item.id !== itemId),
        }
      }),
    }))
  }

  function addNestedItem(sectionId: string, groupId: string, subgroupId: string | null) {
    const item: MenuItem = {
      id: createItemId("new-item"),
      name: "New Item",
      description: "",
      price: "",
    }
    updateSection(sectionId, (section) => ({
      ...section,
      groups: section.groups?.map((group) => {
        if (group.id !== groupId) return group
        if (subgroupId) {
          return {
            ...group,
            subgroups: group.subgroups?.map((subgroup) =>
              subgroup.id === subgroupId ? { ...subgroup, items: [...subgroup.items, item] } : subgroup,
            ),
          }
        }
        return { ...group, items: [...(group.items ?? []), item] }
      }),
    }))
  }

  function updateSpecial(itemId: string, patch: Partial<SpecialItem>) {
    if (!specials) return
    setSpecials({
      items: specials.items.map((item) => (item.id === itemId ? { ...item, ...patch } : item)),
    })
  }

  function deleteSpecial(itemId: string) {
    if (!specials) return
    setSpecials({ items: specials.items.filter((item) => item.id !== itemId) })
  }

  function addSpecial() {
    if (!specials) return
    const item: SpecialItem = {
      id: createSpecialId("new-special"),
      name: "New Special",
      description: "",
      price: "",
    }
    setSpecials({ items: [...specials.items, item] })
  }

  if (loading || !menu || !specials) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <p className="font-serif text-primary text-lg">Loading…</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-secondary/30 bg-background/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl text-primary">Menu Admin</h1>
            <p className="font-serif text-sm text-muted-foreground italic">Edit items, then save to update the JSON</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="/menu" className="font-serif text-sm text-secondary hover:text-accent transition-colors">
              View menu
            </a>
            <button
              type="button"
              onClick={onLogout}
              className="font-serif text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Log out
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={() => (tab === "menu" ? saveMenu(menu) : saveSpecials(specials))}
              className="bg-primary text-primary-foreground font-serif text-sm tracking-wide uppercase px-5 py-2.5 hover:bg-secondary transition-colors disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        {status && (
          <div
            className={`font-serif text-sm px-4 py-3 border ${
              status.type === "success"
                ? "border-secondary/40 text-primary bg-secondary/5"
                : "border-red-300 text-red-800 bg-red-50"
            }`}
          >
            {status.message}
          </div>
        )}

        <div className="flex gap-2 border-b border-secondary/30 pb-4">
          {([
            { id: "menu", label: "Menu" },
            { id: "specials", label: "Specials" },
          ] as const).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setTab(item.id)
                setStatus(null)
              }}
              className={`px-4 py-2 text-sm font-serif tracking-wide uppercase transition-all ${
                tab === item.id
                  ? "bg-accent text-accent-foreground"
                  : "text-primary hover:text-accent hover:bg-secondary/10"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {tab === "menu" && (
          <>
            <div className="flex flex-wrap gap-2">
              {menu.sections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveSectionId(section.id)}
                  className={`px-3 py-2 text-sm font-serif rounded-md transition-all ${
                    activeSectionId === section.id
                      ? "bg-primary text-primary-foreground"
                      : "text-primary hover:text-accent hover:bg-secondary/10"
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </div>

            {activeSection && (
              <section className="space-y-6">
                <div className="flex items-end justify-between gap-4 border-b-2 border-secondary pb-2">
                  <h2 className="font-serif text-3xl text-primary">{activeSection.title}</h2>
                  {!activeSection.groups && (
                    <button
                      type="button"
                      onClick={() => addFlatItem(activeSection.id)}
                      className="font-serif text-sm text-accent hover:text-primary transition-colors"
                    >
                      + Add item
                    </button>
                  )}
                </div>

                {activeSection.groups ? (
                  activeSection.groups.map((group) => (
                    <div key={group.id} className="space-y-4">
                      <h3 className="font-serif text-xl text-primary border-b border-secondary pb-1">{group.title}</h3>
                      {group.subgroups ? (
                        group.subgroups.map((subgroup) => (
                          <div key={subgroup.id} className="space-y-3 pl-0 sm:pl-2">
                            <div className="flex items-center justify-between gap-3">
                              <h4 className="font-serif text-lg text-foreground">{subgroup.title}</h4>
                              <button
                                type="button"
                                onClick={() => addNestedItem(activeSection.id, group.id, subgroup.id)}
                                className="font-serif text-sm text-accent hover:text-primary transition-colors"
                              >
                                + Add item
                              </button>
                            </div>
                            {subgroup.items.map((item) => (
                              <ItemEditor
                                key={item.id}
                                item={item}
                                onChange={(patch) =>
                                  updateNestedItem(activeSection.id, group.id, subgroup.id, item.id, patch)
                                }
                                onDelete={() => deleteNestedItem(activeSection.id, group.id, subgroup.id, item.id)}
                              />
                            ))}
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={() => addNestedItem(activeSection.id, group.id, null)}
                              className="font-serif text-sm text-accent hover:text-primary transition-colors"
                            >
                              + Add item
                            </button>
                          </div>
                          {group.items?.map((item) => (
                            <ItemEditor
                              key={item.id}
                              item={item}
                              onChange={(patch) => updateNestedItem(activeSection.id, group.id, null, item.id, patch)}
                              onDelete={() => deleteNestedItem(activeSection.id, group.id, null, item.id)}
                            />
                          ))}
                        </>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="space-y-4">
                    {activeSection.items?.map((item) => (
                      <ItemEditor
                        key={item.id}
                        item={item}
                        onChange={(patch) => updateFlatItem(activeSection.id, item.id, patch)}
                        onDelete={() => deleteFlatItem(activeSection.id, item.id)}
                      />
                    ))}
                  </div>
                )}
              </section>
            )}
          </>
        )}

        {tab === "specials" && (
          <section className="space-y-6">
            <div className="flex items-end justify-between gap-4 border-b-2 border-secondary pb-2">
              <div>
                <h2 className="font-serif text-3xl text-primary">Weekend Specials</h2>
                <p className="font-serif text-sm text-muted-foreground italic mt-1">
                  Shown as a callout on the menu page. Leave empty to hide the section.
                </p>
              </div>
              <button
                type="button"
                onClick={addSpecial}
                className="font-serif text-sm text-accent hover:text-primary transition-colors whitespace-nowrap"
              >
                + Add special
              </button>
            </div>

            {specials.items.length === 0 ? (
              <p className="font-serif text-muted-foreground italic">No specials yet. Add one to show the weekend callout.</p>
            ) : (
              <div className="space-y-4">
                {specials.items.map((item) => (
                  <ItemEditor
                    key={item.id}
                    item={item}
                    onChange={(patch) => updateSpecial(item.id, patch)}
                    onDelete={() => deleteSpecial(item.id)}
                  />
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  )
}

function ItemEditor({
  item,
  onChange,
  onDelete,
}: {
  item: MenuItem
  onChange: (patch: Partial<MenuItem>) => void
  onDelete: () => void
}) {
  return (
    <div className="border border-secondary/25 p-4 space-y-3 bg-background">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <div className="space-y-1">
          <label className="font-serif text-xs uppercase tracking-wide text-muted-foreground">Name</label>
          <input
            value={item.name}
            onChange={(e) => onChange({ name: e.target.value })}
            className="w-full border border-secondary/30 bg-transparent px-3 py-2 font-serif text-foreground outline-none focus:border-accent"
          />
        </div>
        <div className="space-y-1 sm:w-36">
          <label className="font-serif text-xs uppercase tracking-wide text-muted-foreground">Price</label>
          <input
            value={item.price}
            onChange={(e) => onChange({ price: e.target.value })}
            className="w-full border border-secondary/30 bg-transparent px-3 py-2 font-serif text-accent outline-none focus:border-accent"
          />
        </div>
      </div>
      <div className="space-y-1">
        <label className="font-serif text-xs uppercase tracking-wide text-muted-foreground">Description</label>
        <input
          value={item.description ?? ""}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="Optional"
          className="w-full border border-secondary/30 bg-transparent px-3 py-2 font-serif text-sm italic text-muted-foreground outline-none focus:border-accent"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onDelete}
          className="font-serif text-sm text-red-700/80 hover:text-red-800 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

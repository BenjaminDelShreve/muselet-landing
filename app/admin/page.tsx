import { AdminMenu } from "@/components/admin-menu"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Menu Admin | Muselet",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function AdminPage() {
  return <AdminMenu />
}

import { AdminMenu } from "@/components/admin-menu"

export const metadata = {
  title: "Menu Admin | Muselet",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminPage() {
  return <AdminMenu />
}

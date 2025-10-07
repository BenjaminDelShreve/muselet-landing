import { DigitalMenu } from "@/components/digital-menu"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function MenuPage() {
  return (
    <main className="relative min-h-screen">
      <Navigation />
      <DigitalMenu />
      <Footer />
    </main>
  )
}

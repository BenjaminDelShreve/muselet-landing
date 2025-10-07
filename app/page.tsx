import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { DigitalMenu } from "@/components/digital-menu"
import { Hours } from "@/components/hours"
import { Footer } from "@/components/footer"
import { Bubbles } from "@/components/bubbles"

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Bubbles />
      <Navigation />
      <Hero />
      <About />
      <DigitalMenu />
      <Hours />
      <Footer />
    </main>
  )
}

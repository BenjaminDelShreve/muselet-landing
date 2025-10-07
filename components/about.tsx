import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function About() {
  return (
    <section id="about" className="py-24 bg-[#FDF8F0]">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2
              className="text-5xl md:text-6xl font-light mb-6 text-[#063B29]"
              style={{ fontFamily: "'Cormorant', serif" }}
            >
              Effervescent Elegance
            </h2>
            <p className="text-lg text-[#303030] mb-6 leading-relaxed">
              Muselet is Bentonville's premier destination for champagne and sparkling wine enthusiasts. Our carefully
              curated selection features exceptional bottles from renowned regions, complemented by artisanal small
              plates.
            </p>
            <p className="text-lg text-[#303030] mb-8 leading-relaxed">
              Named after the wire cage that secures a champagne cork, Muselet embodies the art of celebration and the
              joy of discovery. Join us for an unforgettable experience.
            </p>
            <div id="menu" className="flex gap-4">
              <Button
                asChild
                variant="outline"
                className="border-[#063B29] text-[#063B29] hover:bg-[#063B29] hover:text-[#FDF8F0] bg-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#063B29]/25"
              >
                <Link href="#menu-section">View Menu</Link>
              </Button>
            </div>
          </div>

          <div className="relative h-[500px] rounded-sm overflow-hidden">
            <Image src="/elegant-champagne-glasses-on-bar-counter-with-art-.jpg" alt="Champagne at Muselet" fill className="object-cover" />
          </div>
        </div>

        {/* Menu Section */}
        <div id="menu-section" className="mt-24">
          <h3
            className="text-4xl font-light mb-12 text-[#063B29] text-center"
            style={{ fontFamily: "'Cormorant', serif" }}
          >
            Our Selection
          </h3>
        </div>
      </div>
    </section>
  )
}

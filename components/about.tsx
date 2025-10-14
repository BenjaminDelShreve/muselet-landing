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
            <div className="flex gap-4">
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
            <Image src="/menu/muselet-stemware.HEIC.jpeg" alt="Champagne at Muselet" fill className="object-cover" />
          </div>
        </div>

        {/* About Aaron Section */}
        <div className="mt-24">
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-5xl md:text-6xl font-light mb-6 text-[#063B29] text-center"
              style={{ fontFamily: "'Cormorant', serif" }}
            >
              About Aaron
            </h2>
          </div>
        </div>

        {/* Aaron Countryside Image */}
        <div className="mt-8">
          <div className="relative h-[400px] md:h-[600px] rounded-sm overflow-hidden">
            <Image 
              src="/menu/aaron-muselet-countryside.jpg" 
              alt="Aaron in the countryside" 
              fill 
              className="object-contain md:object-cover object-center" 
            />
          </div>
        </div>

        {/* About Aaron Content */}
        <div className="mt-16">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-[#303030] mb-6 leading-relaxed text-center">
              Aaron's journey to Muselet is a story of culinary discovery, from the Rockies to the tropics and back again. It began at the Escoffier School of Culinary Arts in Boulder, Colorado, where a passion for food was ignited. This led to a unique opportunity as a private chef in Hawaii, where they spent four years crafting memorable meals.
            </p>
            <p className="text-lg text-[#303030] mb-8 leading-relaxed text-center">
              Upon returning to Little Rock, he explored a new path in wine retail. Traveling and expanding their knowledge of wine regions, they discovered a profound love for Champagne—a drink that represents celebration, joy, and craftsmanship. Muselet was born from this love, a place where he can share the magic of Champagne with you.
            </p>
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

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Bubbles } from "@/components/bubbles"

export default function ReservationsPage() {
  return (
    <main className="relative min-h-screen bg-[#063B29]">
      <Bubbles />
      <Navigation />

      <section id="reservations" className="relative z-10 px-6 pt-36 pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1
            className="text-5xl md:text-6xl text-[#FDF8F0] mb-4 tracking-wide"
            style={{ fontFamily: "'Cormorant', serif" }}
          >
            Reservations
          </h1>
          <p className="text-[#FDF8F0]/85 text-lg mb-12 max-w-xl mx-auto">
            Reserve your table directly below.
          </p>

          <div className="flex justify-center">
            <a
              href="https://www.opentable.com/restref/client/?rid=1498192"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#AF911C] text-[#303030] hover:bg-[#AF911C]/90 font-medium tracking-wide text-lg px-12 py-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#AF911C]/25 rounded-md"
            >
              Reserve Now
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

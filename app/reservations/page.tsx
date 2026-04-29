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
            <div className="bg-[#FDF8F0]/95 rounded-xl p-6 shadow-xl border border-[#AF911C]/30">
              <iframe
                src="https://opentable.com/widget/reservation/loader?rid=1498192&type=standard&theme=standard&color=1&dark=false&iframe=true"
                width="224"
                height="301"
                frameBorder="0"
                scrolling="no"
                name="opentable-make-reservation-widget"
                title="OpenTable Reservation Widget"
                className="mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

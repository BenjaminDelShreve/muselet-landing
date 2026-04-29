import Link from "next/link"
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer id="contact" className="bg-[#303030] text-[#FDF8F0] py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-medium mb-6 text-[#AF911C] tracking-wide">Visit Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#AF911C] mt-1 flex-shrink-0" />
                <p className="text-[#FDF8F0]/90">
                  406 SE 5th St, Suite 4<br />
                  Bentonville, AR 72712
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#AF911C] flex-shrink-0" />
                <a href="tel:479-553-7001" className="text-[#FDF8F0]/90 hover:text-[#AF911C] transition-colors">
                  479.553.7001
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#AF911C] flex-shrink-0" />
                <a
                  href="mailto:museletnwa@gmail.com"
                  className="text-[#FDF8F0]/90 hover:text-[#AF911C] transition-colors"
                >
                  museletnwa@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-medium mb-6 text-[#AF911C] tracking-wide">Quick Links</h3>
            <div className="space-y-3">
              <Link href="#home" className="block text-[#FDF8F0]/90 hover:text-[#AF911C] transition-colors">
                Home
              </Link>
              <Link href="#about" className="block text-[#FDF8F0]/90 hover:text-[#AF911C] transition-colors">
                About
              </Link>
              <Link href="#menu" className="block text-[#FDF8F0]/90 hover:text-[#AF911C] transition-colors">
                Menu
              </Link>
              <Link href="/reservations" className="block text-[#FDF8F0]/90 hover:text-[#AF911C] transition-colors">
                Reservations
              </Link>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-medium mb-6 text-[#AF911C] tracking-wide">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/muselet.nwa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-[#FDF8F0]/10 hover:bg-[#AF911C] rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/MuseletChampagneBar"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-[#FDF8F0]/10 hover:bg-[#AF911C] rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#FDF8F0]/20 pt-8 text-center">
          <p className="text-[#FDF8F0]/70 text-sm">
            © {new Date().getFullYear()} Muselet Champagne Bar. All rights reserved.
          </p>
          <p className="text-[#FDF8F0]/70 text-sm mt-2">
            <a href="https://museletchampagnebar.com" className="hover:text-[#AF911C] transition-colors">
              museletchampagnebar.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const navHeight = 100 // Account for fixed navigation bar
      const elementPosition = element.offsetTop - navHeight

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }
  }

  const handleNavigation = (path: string, sectionId?: string) => {
    if (path === "/") {
      if (pathname === "/") {
        // Home should jump to the top immediately.
        window.scrollTo({ top: 0, behavior: "auto" })
      } else {
        router.push("/")
      }
      return
    }

    if (pathname === "/" && sectionId) {
      scrollToSection(sectionId)
      return
    }

    router.push(path)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#063B29]/95 backdrop-blur-sm py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/muselet-wordmark-gold-HZuSjdZS0lkOgC2xLtccmmnimnlG4O.png"
            alt="Muselet"
            width={120}
            height={60}
            className="h-12 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => handleNavigation("/")}
            className="text-[#FDF8F0] hover:text-[#AF911C] transition-colors text-sm tracking-wider uppercase"
          >
            Home
          </button>
          <button
            onClick={() => handleNavigation("/#about", "about")}
            className="text-[#FDF8F0] hover:text-[#AF911C] transition-colors text-sm tracking-wider uppercase"
          >
            About
          </button>
          <button
            onClick={() => handleNavigation("/menu")}
            className="text-[#FDF8F0] hover:text-[#AF911C] transition-colors text-sm tracking-wider uppercase"
          >
            Menu
          </button>
          <Link href="/reservations" className="text-[#FDF8F0] hover:text-[#AF911C] transition-colors text-sm tracking-wider uppercase">
            Reservations
          </Link>
          <button
            onClick={() => handleNavigation("/#hours", "hours")}
            className="text-[#FDF8F0] hover:text-[#AF911C] transition-colors text-sm tracking-wider uppercase"
          >
            Hours
          </button>
          <button
            onClick={() => handleNavigation("/#contact", "contact")}
            className="text-[#FDF8F0] hover:text-[#AF911C] transition-colors text-sm tracking-wider uppercase"
          >
            Contact
          </button>
        </div>

        {/* Desktop Reserve Button */}
        <Button asChild className="hidden md:flex bg-[#AF911C] text-[#303030] hover:bg-[#AF911C]/90 font-medium tracking-wide transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#AF911C]/25">
          <Link href="/reservations">
            Reserve Now
          </Link>
        </Button>

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1"
          aria-label="Toggle mobile menu"
        >
          <span
            className={`w-6 h-0.5 bg-[#FDF8F0] transition-all duration-300 ${
              isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-[#FDF8F0] transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-[#FDF8F0] transition-all duration-300 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#063B29]/98 backdrop-blur-md border-t border-[#AF911C]/20">
          <div className="container mx-auto px-6 py-6 space-y-4">
            <button
              onClick={() => {
                handleNavigation("/")
                setIsMobileMenuOpen(false)
              }}
              className="block w-full text-left text-[#FDF8F0] hover:text-[#AF911C] transition-colors text-lg tracking-wider uppercase py-2"
            >
              Home
            </button>
            <button
              onClick={() => {
                handleNavigation("/#about", "about")
                setIsMobileMenuOpen(false)
              }}
              className="block w-full text-left text-[#FDF8F0] hover:text-[#AF911C] transition-colors text-lg tracking-wider uppercase py-2"
            >
              About
            </button>
            <button
              onClick={() => {
                handleNavigation("/menu")
                setIsMobileMenuOpen(false)
              }}
              className="block w-full text-left text-[#FDF8F0] hover:text-[#AF911C] transition-colors text-lg tracking-wider uppercase py-2"
            >
              Menu
            </button>
            <Link
              href="/reservations"
              className="block w-full text-left text-[#FDF8F0] hover:text-[#AF911C] transition-colors text-lg tracking-wider uppercase py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Reservations
            </Link>
            <button
              onClick={() => {
                handleNavigation("/#hours", "hours")
                setIsMobileMenuOpen(false)
              }}
              className="block w-full text-left text-[#FDF8F0] hover:text-[#AF911C] transition-colors text-lg tracking-wider uppercase py-2"
            >
              Hours
            </button>
            <button
              onClick={() => {
                handleNavigation("/#contact", "contact")
                setIsMobileMenuOpen(false)
              }}
              className="block w-full text-left text-[#FDF8F0] hover:text-[#AF911C] transition-colors text-lg tracking-wider uppercase py-2"
            >
              Contact
            </button>
            <div className="pt-4 border-t border-[#AF911C]/20">
              <Button asChild className="w-full bg-[#AF911C] text-[#303030] hover:bg-[#AF911C]/90 font-medium tracking-wide transition-all duration-300">
                <Link
                  href="/reservations"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Reserve Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

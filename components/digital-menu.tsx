"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

export function DigitalMenu() {
  return (
    <section id="menu" className="relative py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif text-5xl md:text-6xl text-center mb-16 text-accent"
        >
          The Muselet Menu
        </motion.h2>

        {/* Menu Sub-Navigation */}
        <MenuSubNavigation />

        {/* Menu Grid */}
        <div className="max-w-4xl mx-auto space-y-16">
          {/* BY THE BOTTLE */}
          <MenuSection title="By the Bottle" id="by-the-bottle">
            {/* Champagne: By Sub-Region */}
            <div className="space-y-6">
              <h4 className="font-serif text-xl text-primary border-b border-secondary pb-1 mb-4">Champagne: By Sub-Region</h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="font-serif text-lg text-foreground mb-2">Côte des Blancs</h5>
                  <MenuItem name="Gimonnet Special Club 2016" price="225" />
                  <MenuItem name="A. Margaine Special Club 2018" price="225" />
                  <MenuItem name="Dom Pérignon 2015" price="300" />
                </div>
                
                <div>
                  <h5 className="font-serif text-lg text-foreground mb-2">Montagne de Reims</h5>
                  <MenuItem name="Clotilde Grand Cru" price="120" />
                  <MenuItem name="Paul Barthelot Les Marquise" price="140" />
                  <MenuItem name="Vilmart Rosé Emotion 2015" price="360" />
                </div>
                
                <div>
                  <h5 className="font-serif text-lg text-foreground mb-2">Vallée de la Marne</h5>
                  <MenuItem name="Moussé Les Fortes Terres 2018" price="280" />
                  <MenuItem name="Champagne Geoffroy Rosé de Saignée" price="150" />
                </div>
                
                <div>
                  <h5 className="font-serif text-lg text-foreground mb-2">Côte des Bar / Aube</h5>
                  <MenuItem name="Remi Leroy Extra Brut" price="110" />
                  <MenuItem name="Remi Leroy Rosé" price="125" />
                </div>
                
                <div>
                  <h5 className="font-serif text-lg text-foreground mb-2">Multi-Regional Blends</h5>
                  <MenuItem name="Krug 172ème Edition" price="300" />
                  <MenuItem name="Ruinart Blanc de Blancs" price="180" />
                  <MenuItem name="Laurent Perrier Grand Siècle" price="300" />
                  <MenuItem name="Marc Hébrart Special Club 2019" price="160" />
                  <MenuItem name="Julliet Lallament Special Club 2016" price="170" />
                  <MenuItem name="Nominé Renard Special Club 2017" price="165" />
                </div>
              </div>
            </div>

            {/* Still White Wines: By Region */}
            <div className="space-y-6">
              <h4 className="font-serif text-xl text-primary border-b border-secondary pb-1 mb-4">Still White Wines: By Region</h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="font-serif text-lg text-foreground mb-2">Germany (Riesling)</h5>
                  <MenuItem name="Wagner Stempel Höllberg GG Riesling 2023" price="85" />
                  <MenuItem name="JJ Prüm Graacher Himmelreich Auslese 2011" price="120" />
                  <MenuItem name="Wegeler Winkel Jesuitgarten Auslese 1993" price="200" />
                  <MenuItem name="Schnaitmann Lämmer Riesling 2011" price="75" />
                </div>
                
                <div>
                  <h5 className="font-serif text-lg text-foreground mb-2">Spain (White Rioja)</h5>
                  <MenuItem name="Lopez de Heredia Viña Tondonia White Rioja 2013" price="95" />
                  <MenuItem name="Lopez de Heredia Viña Gravonia White Rioja 2016" price="80" />
                </div>
                
                <div>
                  <h5 className="font-serif text-lg text-foreground mb-2">France (Bandol)</h5>
                  <MenuItem name="Domaine Tempier Bandol Blanc 2024" price="90" />
                </div>
              </div>
            </div>

            {/* Still Rosé Wines: By Region */}
            <div className="space-y-6">
              <h4 className="font-serif text-xl text-primary border-b border-secondary pb-1 mb-4">Still Rosé Wines: By Region</h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="font-serif text-lg text-foreground mb-2">France (Provence)</h5>
                  <MenuItem name="Clos Cibonne Rosé 2023" price="65" />
                </div>
                
                <div>
                  <h5 className="font-serif text-lg text-foreground mb-2">France (Rhône - Tavel)</h5>
                  <MenuItem name="Château de Trinquevedel Tavel Rosé 2024" price="60" />
                </div>
              </div>
            </div>

            {/* Still Red Wines: By Region */}
            <div className="space-y-6">
              <h4 className="font-serif text-xl text-primary border-b border-secondary pb-1 mb-4">Still Red Wines: By Region</h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="font-serif text-lg text-foreground mb-2">Spain (Rioja)</h5>
                  <MenuItem name="Remelluri Rioja Reserva 2016" price="110" />
                </div>
                
                <div>
                  <h5 className="font-serif text-lg text-foreground mb-2">Italy (Barolo)</h5>
                  <MenuItem name="Oddero Barolo 2021" price="150" />
                </div>
                
                <div>
                  <h5 className="font-serif text-lg text-foreground mb-2">USA (Napa)</h5>
                  <MenuItem name="Hourglass HG3 Red Blend" price="90" />
                </div>
              </div>
            </div>
          </MenuSection>

          {/* CHAMPAGNE */}
          <MenuSection title="Champagne" id="champagne">
            <MenuItem
              name="Perrier Jouet Brut"
              description="lemon zest, gardenia, white peach · côte de blanc, fr"
              price="28 / 99"
            />
            <MenuItem
              name="Taittinger Prestige Rosé"
              description="wild strawberry, rose petal, raspberry crumble · montagne de reims, fr"
              price="38 / 140"
            />
            <MenuItem
              name="Ayala Brut Majeur"
              description="lemon zest, gardenia, white peach · aÿ, vallée de la marne, fr"
              price="30 / 120"
            />
            <MenuItem
              name="Doyard Vendémiaire Blanc de Blanc"
              description="preserved lemon, white flower, saline · côte de blanc, fr"
              price="35 / 130"
            />
            <MenuItem
              name="Legras & Haas Exigence no.9"
              description="brioche, peach tart, honeysuckle · côte de blanc, fr"
              price="45 / 180"
            />
            <MenuItem
              name="Krug Grand Cuvée 172"
              description="toasted almond, brioche, cardamom · montagne de reims, fr"
              price="70 / 300"
            />
          </MenuSection>

          {/* NOT CHAMPAGNE */}
          <MenuSection title="Not Champagne" id="not-champagne">
            <MenuItem
              name="Avinyó Reserva Cava 2021"
              description="green apple, brioche, wet stone · penedes, es"
              price="17 / 70"
            />
            <MenuItem
              name="Le Coeur de la Reine Crémant de Loire"
              description="quince, chamomile, honeysuckle · touraine, fr"
              price="12 / 48"
            />
            <MenuItem
              name="Bisol Crede Prosecco"
              description="ripe pear, peach blossom, green apple · valdobbiedene, it"
              price="14 / 60"
            />
            <MenuItem
              name="JCB Caviar Crémant de Bourgogne"
              description="white blossoms, green apple, brioche · burgundy, fr"
              price="15 / 65"
            />
            <MenuItem
              name="Terrazze dell'Etna Rosé"
              description="pomegranate, raspberry, herbaceous · etna, sicily, it"
              price="17 / 70"
            />
            <MenuItem
              name="Tapiz Torrontés"
              description="jasmine, orange blossom, lemon curd · mendoza, ar"
              price="12 / 48"
            />
          </MenuSection>

          {/* ROSÉ */}
          <MenuSection title="Rosé" id="rose">
            <MenuItem
              name="Château de Ségrièse Tavel"
              description="watermelon, cherry, spice · tavel, fr"
              price="18 / 72"
            />
            <MenuItem name="Matthiasson Rosé" description="strawberry, citrus, saline · napa valley, ca" price="16 / 64" />
          </MenuSection>

          {/* WHITE */}
          <MenuSection title="White" id="white">
            <MenuItem
              name="Ridge Grenache Blanc"
              description="apricot, lemon zest, jasmine · paso robles, ca"
              price="22 / 84"
            />
            <MenuItem
              name="Angelo Negro Roero Arneis"
              description="pear, lime, acacia · piedmont, it"
              price="12 / 50"
            />
            <MenuItem
              name="Trimbach Reserve Pinot Gris"
              description="d'anjou pear, quince, saline · alsace, fr"
              price="20 / 80"
            />
            <MenuItem
              name="Giacometto Bruno Erbaluce di Caluso"
              description="flint, white flower, green apple · caluso, it"
              price="18 / 72"
            />
          </MenuSection>

          {/* RED */}
          <MenuSection title="Red" id="red">
            <MenuItem
              name="Domaine de Leyre-Loup Morgon"
              description="plum, cherry, forest floor · beaujolais, fr"
              price="18 / 72"
            />
            <MenuItem
              name="Brotte St. Joseph"
              description="dark plum, olive, pepper · rhone, fr"
              price="18 / 72"
            />
            <MenuItem
              name="Poggio del Moro Chianti Riserva"
              description="dried cherry, earth, tobacco · tuscany, it"
              price="16 / 64"
            />
            <MenuItem
              name="Angelo Negro Barbaresco"
              description="raspberry, baking spice, dried rose · piedmont, it"
              price="26 / 98"
            />
            <MenuItem
              name="Hourglass HGIII"
              description="bing cherry, mocha, pink peppercorn · napa valley, ca"
              price="20 / 80"
            />
            <MenuItem
              name="Double Diamond Cabernet Sauvignon"
              description="cassis, dark chocolate, graphite · napa valley, ca"
              price="32 / 110"
            />
          </MenuSection>

          {/* FLIGHTS */}
          <MenuSection title="Flights" id="flights">
            <MenuItem name="Champagne" description="doyard, gosset, gimonnet" price="45" />
            <MenuItem name="World Tour" description="von winning sekt, tapiz torrontés, bisol crede" price="20" />
            <MenuItem name="Wildcard" description="server's choice" price="35" />
          </MenuSection>

          {/* BEER & CIDER */}
          <MenuSection title="Beer & Cider" id="beer-cider">
            <MenuItem name="Kronenbourg Blanc" price="6" />
            <MenuItem name="Miller High Life" price="5" />
            <MenuItem name="Montucky Cold Snack" price="6" />
            <MenuItem name="Eggenberg Pilsner" price="6" />
            <MenuItem name="Space Goose IPA" price="7" />
            <MenuItem name="Hawk Moth *R&D*" price="25" />
            <MenuItem name="Avail Blanc Cider" price="7" />
          </MenuSection>

          {/* CAVIAR */}
          <MenuSection title="Caviar" id="caviar">
            <MenuItem name="Ossetra 30g" description="nutty, firm, buttery" price="120" />
            <MenuItem name="Kaluga 30g" description="large, briny, creamy" price="100" />
            <MenuItem name="Bong & a Bump" description="chambong and a bump of caviar" price="18" />
            <MenuItem
              name="Golden Nugget"
              description="house chicken nugget, crème fraîche, golden ossetra caviar"
              price="24"
            />
          </MenuSection>

          {/* SHAREABLES */}
          <MenuSection title="Shareables" id="shareables">
            <MenuItem name="Oyster Service" description="mignonette, lacto-fermented hot sauce" price="mkt" />
            <MenuItem
              name="Better Popcorn"
              description="heirloom kernels, cultured butter, rotating flavors"
              price="7"
            />
            <MenuItem name="Sam's Caesar" description="lemon zest, breadcrumbs, caviar caesar dressing" price="18" />
            <MenuItem name="Pommes Frites" description="double fried beef tallow russets, aioli" price="12" />
            <MenuItem name="Rotating Deviled Eggs" description="local egg, kewpi, smoked spanish paprika" price="14" />
            <MenuItem name="Arancini" description="peas, taleggio, mint" price="15" />
            <MenuItem
              name="Fried Chicken"
              description="tallow fried local chicken, gluten free breading, slaw"
              price="28"
            />
          </MenuSection>

          {/* AFTER DINNER */}
          <MenuSection title="After Dinner" id="after-dinner">
            <MenuItem
              name="Fernando de Castilla Palo Cortado Antique"
              description="dried fruits, marzipan, hazelnut, jerez, es"
              price="18"
            />
            <MenuItem
              name="Fernando de Castilla Amontillado Antique"
              description="toffee, golden raisin, coffee, jerez, es"
              price="14"
            />
            <MenuItem
              name="Fernando de Castilla Pedro Ximénez Antique"
              description="fruit cake, dark chocolate, sweet tobacco, jerez, es"
              price="10"
            />
          </MenuSection>

          {/* DESSERT */}
          <MenuSection title="Dessert" id="dessert">
            <MenuItem name="Chocolate Torte" description="coulis, sea salt, crunch" price="12" />
          </MenuSection>
        </div>
      </div>
    </section>
  )
}

function MenuSection({ title, children, id }: { title: string; children: React.ReactNode; id?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <motion.h3
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="font-serif text-3xl text-primary border-b-2 border-secondary pb-2 mb-6 relative group cursor-default"
      >
        {title}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
      </motion.h3>
      <div className="space-y-4">{children}</div>
    </motion.div>
  )
}

function MenuItem({ name, description, price }: { name: string; description?: string; price: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02, x: 4 }}
      className="group cursor-default"
    >
      <div className="flex justify-between items-start gap-4 transition-opacity duration-300 group-hover:opacity-90">
        <div className="flex-1">
          <h4 className="font-serif text-lg text-foreground leading-tight">{name}</h4>
          {description && (
            <p className="font-serif text-sm text-muted-foreground mt-1 italic leading-relaxed">{description}</p>
          )}
        </div>
        <span className="font-serif text-lg text-accent whitespace-nowrap font-medium">{price}</span>
      </div>
    </motion.div>
  )
}

function MenuSubNavigation() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Only apply hide/show behavior on mobile and tablet (below lg breakpoint)
      if (window.innerWidth < 1024) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down - hide sub-nav
          setIsVisible(false)
        } else {
          // Scrolling up - show sub-nav
          setIsVisible(true)
        }
      } else {
        // Always visible on desktop
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const mainNavHeight = 100 // Account for fixed main navigation bar
      const subNavHeight = 100 // Account for sticky sub-navigation bar
      const extraPadding = 40 // Extra spacing for better visibility
      const totalOffset = mainNavHeight + subNavHeight + extraPadding
      const elementRect = element.getBoundingClientRect()
      const elementPosition = elementRect.top + window.pageYOffset - totalOffset

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    } else {
      console.log(`Element with ID ${sectionId} not found`)
    }
  }

  const menuItems = [
    { label: "By the Bottle", id: "by-the-bottle" },
    { label: "Champagne", id: "champagne" },
    { label: "Not Champagne", id: "not-champagne" },
    { label: "Rosé", id: "rose" },
    { label: "White", id: "white" },
    { label: "Red", id: "red" },
    { label: "Flights", id: "flights" },
    { label: "Beer & Cider", id: "beer-cider" },
    { label: "Caviar", id: "caviar" },
    { label: "Shareables", id: "shareables" },
    { label: "After Dinner", id: "after-dinner" },
    { label: "Dessert", id: "dessert" }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`sticky top-20 z-40 mb-16 transition-all duration-500 ease-in-out ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'lg:translate-y-0 lg:opacity-100 -translate-y-full opacity-0'
      }`}
    >
      <div className="bg-background/95 backdrop-blur-md border border-secondary/20 rounded-lg p-4 shadow-lg">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="px-3 py-2 text-sm font-serif text-primary hover:text-accent hover:bg-secondary/10 rounded-md transition-all duration-300 hover:scale-105 whitespace-nowrap"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

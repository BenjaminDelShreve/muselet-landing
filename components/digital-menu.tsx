"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

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

        {/* Menu Grid */}
        <div className="max-w-4xl mx-auto space-y-16">
          {/* CHAMPAGNE */}
          <MenuSection title="Champagne">
            <MenuItem
              name="Pierre Gimonnet Premier Cru"
              description="lemon zest, green apple, almond · côte de blanc, fr"
              price="32 / 120"
            />
            <MenuItem
              name="Laurent Perrier Cuvée Rosé"
              description="red currant, rose petal, white pepper · montagne de reims, fr"
              price="38 / 140"
            />
            <MenuItem
              name="Gosset Grand Reserve Brut"
              description="ripe apple, toasted brioche, honey · aÿ, vallée de la marne, fr"
              price="28 / 100"
            />
            <MenuItem
              name="Doyard Vendémiaire Blanc de Blanc"
              description="preserved lemon, white flower, saline · côte de blanc, fr"
              price="35 / 130"
            />
            <MenuItem
              name="Gaston Chiquet Special Club 2015"
              description="baked apple, hazelnut, lemon curd · vallée de la marne, fr"
              price="45 / 180"
            />
            <MenuItem
              name="Krug Grand Cuvée 172"
              description="toasted almond, brioche, cardamom · montagne de reims, fr"
              price="70 / 300"
            />
          </MenuSection>

          {/* NOT CHAMPAGNE */}
          <MenuSection title="Not Champagne">
            <MenuItem
              name="Von Winning Sekt"
              description="green apple, white peach, wet stone · pfalz, ge"
              price="14 / 60"
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
              name="Huber Rosé"
              description="sour cherry, fresh strawberry, pepper · traisental valley, at"
              price="15 / 65"
            />
            <MenuItem
              name="Luigi Giordano Brut Nature Rosé"
              description="smarties, strawberry, dried rose · barbaresco, it"
              price="20 / 85"
            />
            <MenuItem
              name="Tapiz Torrontés"
              description="jasmine, orange blossom, lemon curd · mendoza, ar"
              price="12 / 48"
            />
          </MenuSection>

          {/* ROSÉ */}
          <MenuSection title="Rosé">
            <MenuItem
              name="Château Trinquevedel Tavel"
              description="watermelon, cherry, spice · tavel, fr"
              price="16 / 60"
            />
            <MenuItem name="Unalou" description="strawberry, citrus, saline · napa valley, ca" price="14 / 58" />
          </MenuSection>

          {/* WHITE */}
          <MenuSection title="White">
            <MenuItem
              name="Royal Tokaji Furmint"
              description="apricot, lemon zest, wet stone · tokaj, hu"
              price="13 / 55"
            />
            <MenuItem
              name="Angelo Negro Roero Arneis"
              description="pear, lime, acacia · piedmont, it"
              price="12 / 50"
            />
            <MenuItem
              name="Heidi Schrock More is More"
              description="grapefruit, white flower, hay · burgenland, at"
              price="14 / 70"
            />
            <MenuItem
              name="La Spinetta Timorasso"
              description="bergamot, aromatic herbs, acacia honey · colli tortonesi doc, it"
              price="16 / 75"
            />
            <MenuItem
              name="Bedrock Sauvignon Blanc"
              description="grapefruit, passion fruit, green apple · sonoma, ca"
              price="18 / 80"
            />
          </MenuSection>

          {/* RED */}
          <MenuSection title="Red">
            <MenuItem
              name="Chanrion Côte de Brouilly"
              description="raspberry, cherry, violet · beaujolais, fr"
              price="18 / 80"
            />
            <MenuItem
              name="Kaltern Lagrein"
              description="dark plum, coffee, forest floor · alto adige, it"
              price="12 / 50"
            />
            <MenuItem
              name="Angelo Negro Barbaresco"
              description="raspberry, baking spice, dried rose · piedmont, it"
              price="26 / 98"
            />
            <MenuItem
              name="Hourglass HGIII"
              description="bing cherry, mocha, pink peppercorn · napa valley, ca"
              price="20 / 90"
            />
            <MenuItem
              name="No Brainer Merlot"
              description="black cherry, plum, dark chocolate · dry creek valley, ca"
              price="16 / 65"
            />
          </MenuSection>

          {/* FLIGHTS */}
          <MenuSection title="Flights">
            <MenuItem name="Champagne" description="doyard, gosset, gimonnet" price="45" />
            <MenuItem name="World Tour" description="von winning sekt, tapiz torrontés, bisol crede" price="20" />
            <MenuItem name="Wildcard" description="server's choice" price="35" />
          </MenuSection>

          {/* BEER & CIDER */}
          <MenuSection title="Beer & Cider">
            <MenuItem name="Kronenbourg Blanc" price="6" />
            <MenuItem name="Miller High Life" price="5" />
            <MenuItem name="Montucky Cold Snack" price="6" />
            <MenuItem name="Eggenberg Pilsner" price="6" />
            <MenuItem name="Space Goose IPA" price="7" />
            <MenuItem name="Hawk Moth *R&D*" price="25" />
            <MenuItem name="Avail Blanc Cider" price="7" />
          </MenuSection>

          {/* CAVIAR */}
          <MenuSection title="Caviar">
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
          <MenuSection title="Shareables">
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
          <MenuSection title="After Dinner">
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
          <MenuSection title="Dessert">
            <MenuItem name="Chocolate Torte" description="coulis, sea salt, crunch" price="12" />
          </MenuSection>
        </div>
      </div>
    </section>
  )
}

function MenuSection({ title, children }: { title: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
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

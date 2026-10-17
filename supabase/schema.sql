-- Muselet menu + specials: schema + one-time seed
-- Paste into Supabase SQL Editor and run once.

create table if not exists menu_items (
  id text primary key,
  section text not null,
  name text not null,
  description text,
  price text not null,
  sort_order integer not null default 0
);

create table if not exists specials (
  id text primary key,
  name text not null,
  description text,
  price text not null,
  sort_order integer not null default 0
);

alter table menu_items enable row level security;
alter table specials enable row level security;

drop policy if exists "Public read menu_items" on menu_items;
create policy "Public read menu_items"
  on menu_items for select
  to anon, authenticated
  using (true);

drop policy if exists "Public read specials" on specials;
create policy "Public read specials"
  on specials for select
  to anon, authenticated
  using (true);

-- Seed (safe to re-run: clears then inserts)
truncate table menu_items;
truncate table specials;

insert into menu_items (id, section, name, description, price, sort_order) values
  ('gimonnet-special-club-2016', 'By the Bottle|||Champagne: By Sub-Region|||Côte des Blancs', 'Gimonnet Special Club 2016', NULL, '225', 0),
  ('a-margaine-special-club-2018', 'By the Bottle|||Champagne: By Sub-Region|||Côte des Blancs', 'A. Margaine Special Club 2018', NULL, '225', 1),
  ('dom-perignon-2015', 'By the Bottle|||Champagne: By Sub-Region|||Côte des Blancs', 'Dom Pérignon 2015', NULL, '300', 2),
  ('clotilde-grand-cru', 'By the Bottle|||Champagne: By Sub-Region|||Montagne de Reims', 'Clotilde Grand Cru', NULL, '120', 3),
  ('paul-barthelot-les-marquise', 'By the Bottle|||Champagne: By Sub-Region|||Montagne de Reims', 'Paul Barthelot Les Marquise', NULL, '140', 4),
  ('vilmart-rose-emotion-2015', 'By the Bottle|||Champagne: By Sub-Region|||Montagne de Reims', 'Vilmart Rosé Emotion 2015', NULL, '360', 5),
  ('mousse-les-fortes-terres-2018', 'By the Bottle|||Champagne: By Sub-Region|||Vallée de la Marne', 'Moussé Les Fortes Terres 2018', NULL, '280', 6),
  ('champagne-geoffroy-rose-de-saignee', 'By the Bottle|||Champagne: By Sub-Region|||Vallée de la Marne', 'Champagne Geoffroy Rosé de Saignée', NULL, '150', 7),
  ('remi-leroy-extra-brut', 'By the Bottle|||Champagne: By Sub-Region|||Côte des Bar / Aube', 'Remi Leroy Extra Brut', NULL, '110', 8),
  ('remi-leroy-rose', 'By the Bottle|||Champagne: By Sub-Region|||Côte des Bar / Aube', 'Remi Leroy Rosé', NULL, '125', 9),
  ('krug-172eme-edition', 'By the Bottle|||Champagne: By Sub-Region|||Multi-Regional Blends', 'Krug 172ème Edition', NULL, '300', 10),
  ('ruinart-blanc-de-blancs', 'By the Bottle|||Champagne: By Sub-Region|||Multi-Regional Blends', 'Ruinart Blanc de Blancs', NULL, '180', 11),
  ('laurent-perrier-grand-siecle', 'By the Bottle|||Champagne: By Sub-Region|||Multi-Regional Blends', 'Laurent Perrier Grand Siècle', NULL, '300', 12),
  ('marc-hebrart-special-club-2019', 'By the Bottle|||Champagne: By Sub-Region|||Multi-Regional Blends', 'Marc Hébrart Special Club 2019', NULL, '160', 13),
  ('julliet-lallament-special-club-2016', 'By the Bottle|||Champagne: By Sub-Region|||Multi-Regional Blends', 'Julliet Lallament Special Club 2016', NULL, '170', 14),
  ('nomine-renard-special-club-2017', 'By the Bottle|||Champagne: By Sub-Region|||Multi-Regional Blends', 'Nominé Renard Special Club 2017', NULL, '165', 15),
  ('wagner-stempel-hollberg-gg-riesling-2023', 'By the Bottle|||Still White Wines: By Region|||Germany (Riesling)', 'Wagner Stempel Höllberg GG Riesling 2023', NULL, '85', 16),
  ('jj-prum-graacher-himmelreich-auslese-2011', 'By the Bottle|||Still White Wines: By Region|||Germany (Riesling)', 'JJ Prüm Graacher Himmelreich Auslese 2011', NULL, '120', 17),
  ('wegeler-winkel-jesuitgarten-auslese-1993', 'By the Bottle|||Still White Wines: By Region|||Germany (Riesling)', 'Wegeler Winkel Jesuitgarten Auslese 1993', NULL, '200', 18),
  ('schnaitmann-lammer-riesling-2011', 'By the Bottle|||Still White Wines: By Region|||Germany (Riesling)', 'Schnaitmann Lämmer Riesling 2011', NULL, '75', 19),
  ('lopez-de-heredia-vina-tondonia-white-rioja-2013', 'By the Bottle|||Still White Wines: By Region|||Spain (White Rioja)', 'Lopez de Heredia Viña Tondonia White Rioja 2013', NULL, '95', 20),
  ('lopez-de-heredia-vina-gravonia-white-rioja-2016', 'By the Bottle|||Still White Wines: By Region|||Spain (White Rioja)', 'Lopez de Heredia Viña Gravonia White Rioja 2016', NULL, '80', 21),
  ('domaine-tempier-bandol-blanc-2024', 'By the Bottle|||Still White Wines: By Region|||France (Bandol)', 'Domaine Tempier Bandol Blanc 2024', NULL, '90', 22),
  ('clos-cibonne-rose-2023', 'By the Bottle|||Still Rosé Wines: By Region|||France (Provence)', 'Clos Cibonne Rosé 2023', NULL, '65', 23),
  ('chateau-de-trinquevedel-tavel-rose-2024', 'By the Bottle|||Still Rosé Wines: By Region|||France (Rhône - Tavel)', 'Château de Trinquevedel Tavel Rosé 2024', NULL, '60', 24),
  ('remelluri-rioja-reserva-2016', 'By the Bottle|||Still Red Wines: By Region|||Spain (Rioja)', 'Remelluri Rioja Reserva 2016', NULL, '110', 25),
  ('oddero-barolo-2021', 'By the Bottle|||Still Red Wines: By Region|||Italy (Barolo)', 'Oddero Barolo 2021', NULL, '150', 26),
  ('hourglass-hg3-red-blend', 'By the Bottle|||Still Red Wines: By Region|||USA (Napa)', 'Hourglass HG3 Red Blend', NULL, '90', 27),
  ('perrier-jouet-brut', 'Champagne', 'Perrier Jouet Brut', 'lemon zest, gardenia, white peach · côte de blanc, fr', '28 / 99', 28),
  ('taittinger-prestige-rose', 'Champagne', 'Taittinger Prestige Rosé', 'wild strawberry, rose petal, raspberry crumble · montagne de reims, fr', '38 / 140', 29),
  ('ayala-brut-majeur', 'Champagne', 'Ayala Brut Majeur', 'lemon zest, gardenia, white peach · aÿ, vallée de la marne, fr', '30 / 120', 30),
  ('doyard-vendemiaire-blanc-de-blanc', 'Champagne', 'Doyard Vendémiaire Blanc de Blanc', 'preserved lemon, white flower, saline · côte de blanc, fr', '35 / 130', 31),
  ('legras-haas-exigence-no-9', 'Champagne', 'Legras & Haas Exigence no.9', 'brioche, peach tart, honeysuckle · côte de blanc, fr', '45 / 180', 32),
  ('krug-grand-cuvee-172', 'Champagne', 'Krug Grand Cuvée 172', 'toasted almond, brioche, cardamom · montagne de reims, fr', '70 / 300', 33),
  ('avinyo-reserva-cava-2021', 'Not Champagne', 'Avinyó Reserva Cava 2021', 'green apple, brioche, wet stone · penedes, es', '17 / 70', 34),
  ('le-coeur-de-la-reine-cremant-de-loire', 'Not Champagne', 'Le Coeur de la Reine Crémant de Loire', 'quince, chamomile, honeysuckle · touraine, fr', '12 / 48', 35),
  ('bisol-crede-prosecco', 'Not Champagne', 'Bisol Crede Prosecco', 'ripe pear, peach blossom, green apple · valdobbiedene, it', '14 / 60', 36),
  ('jcb-caviar-cremant-de-bourgogne', 'Not Champagne', 'JCB Caviar Crémant de Bourgogne', 'white blossoms, green apple, brioche · burgundy, fr', '15 / 65', 37),
  ('terrazze-dell-etna-rose', 'Not Champagne', 'Terrazze dell''Etna Rosé', 'pomegranate, raspberry, herbaceous · etna, sicily, it', '17 / 70', 38),
  ('tapiz-torrontes', 'Not Champagne', 'Tapiz Torrontés', 'jasmine, orange blossom, lemon curd · mendoza, ar', '12 / 48', 39),
  ('chateau-de-segriese-tavel', 'Rosé', 'Château de Ségrièse Tavel', 'watermelon, cherry, spice · tavel, fr', '18 / 72', 40),
  ('matthiasson-rose', 'Rosé', 'Matthiasson Rosé', 'strawberry, citrus, saline · napa valley, ca', '16 / 64', 41),
  ('ridge-grenache-blanc', 'White', 'Ridge Grenache Blanc', 'apricot, lemon zest, jasmine · paso robles, ca', '22 / 84', 42),
  ('angelo-negro-roero-arneis', 'White', 'Angelo Negro Roero Arneis', 'pear, lime, acacia · piedmont, it', '12 / 50', 43),
  ('trimbach-reserve-pinot-gris', 'White', 'Trimbach Reserve Pinot Gris', 'd''anjou pear, quince, saline · alsace, fr', '20 / 80', 44),
  ('giacometto-bruno-erbaluce-di-caluso', 'White', 'Giacometto Bruno Erbaluce di Caluso', 'flint, white flower, green apple · caluso, it', '18 / 72', 45),
  ('domaine-de-leyre-loup-morgon', 'Red', 'Domaine de Leyre-Loup Morgon', 'plum, cherry, forest floor · beaujolais, fr', '18 / 72', 46),
  ('brotte-st-joseph', 'Red', 'Brotte St. Joseph', 'dark plum, olive, pepper · rhone, fr', '18 / 72', 47),
  ('poggio-del-moro-chianti-riserva', 'Red', 'Poggio del Moro Chianti Riserva', 'dried cherry, earth, tobacco · tuscany, it', '16 / 64', 48),
  ('angelo-negro-barbaresco', 'Red', 'Angelo Negro Barbaresco', 'raspberry, baking spice, dried rose · piedmont, it', '26 / 98', 49),
  ('hourglass-hgiii', 'Red', 'Hourglass HGIII', 'bing cherry, mocha, pink peppercorn · napa valley, ca', '20 / 80', 50),
  ('double-diamond-cabernet-sauvignon', 'Red', 'Double Diamond Cabernet Sauvignon', 'cassis, dark chocolate, graphite · napa valley, ca', '32 / 110', 51),
  ('flight-champagne', 'Flights', 'Champagne', 'doyard, gosset, gimonnet', '45', 52),
  ('flight-world-tour', 'Flights', 'World Tour', 'von winning sekt, tapiz torrontés, bisol crede', '20', 53),
  ('flight-wildcard', 'Flights', 'Wildcard', 'server''s choice', '35', 54),
  ('kronenbourg-blanc', 'Beer & Cider', 'Kronenbourg Blanc', NULL, '6', 55),
  ('miller-high-life', 'Beer & Cider', 'Miller High Life', NULL, '5', 56),
  ('montucky-cold-snack', 'Beer & Cider', 'Montucky Cold Snack', NULL, '6', 57),
  ('eggenberg-pilsner', 'Beer & Cider', 'Eggenberg Pilsner', NULL, '6', 58),
  ('space-goose-ipa', 'Beer & Cider', 'Space Goose IPA', NULL, '7', 59),
  ('hawk-moth-rd', 'Beer & Cider', 'Hawk Moth *R&D*', NULL, '25', 60),
  ('avail-blanc-cider', 'Beer & Cider', 'Avail Blanc Cider', NULL, '7', 61),
  ('ossetra-30g', 'Caviar', 'Ossetra 30g', 'nutty, firm, buttery', '120', 62),
  ('kaluga-30g', 'Caviar', 'Kaluga 30g', 'large, briny, creamy', '100', 63),
  ('bong-and-a-bump', 'Caviar', 'Bong & a Bump', 'chambong and a bump of caviar', '18', 64),
  ('golden-nugget', 'Caviar', 'Golden Nugget', 'house chicken nugget, crème fraîche, golden ossetra caviar', '24', 65),
  ('oyster-service', 'Shareables', 'Oyster Service', 'mignonette, lacto-fermented hot sauce', 'mkt', 66),
  ('better-popcorn', 'Shareables', 'Better Popcorn', 'heirloom kernels, cultured butter, rotating flavors', '7', 67),
  ('sams-caesar', 'Shareables', 'Sam''s Caesar', 'lemon zest, breadcrumbs, caviar caesar dressing', '18', 68),
  ('pommes-frites', 'Shareables', 'Pommes Frites', 'double fried beef tallow russets, aioli', '12', 69),
  ('rotating-deviled-eggs', 'Shareables', 'Rotating Deviled Eggs', 'local egg, kewpi, smoked spanish paprika', '14', 70),
  ('arancini', 'Shareables', 'Arancini', 'peas, taleggio, mint', '15', 71),
  ('fried-chicken', 'Shareables', 'Fried Chicken', 'tallow fried local chicken, gluten free breading, slaw', '28', 72),
  ('fernando-de-castilla-palo-cortado-antique', 'After Dinner', 'Fernando de Castilla Palo Cortado Antique', 'dried fruits, marzipan, hazelnut, jerez, es', '18', 73),
  ('fernando-de-castilla-amontillado-antique', 'After Dinner', 'Fernando de Castilla Amontillado Antique', 'toffee, golden raisin, coffee, jerez, es', '14', 74),
  ('fernando-de-castilla-pedro-ximenez-antique', 'After Dinner', 'Fernando de Castilla Pedro Ximénez Antique', 'fruit cake, dark chocolate, sweet tobacco, jerez, es', '10', 75),
  ('chocolate-torte', 'Dessert', 'Chocolate Torte', 'coulis, sea salt, crunch', '12', 76);

insert into specials (id, name, description, price, sort_order) values
  ('weekend-grower-flight', 'Grower Champagne Flight', 'three pours from small-house producers · rotating selection', '55', 0),
  ('weekend-caviar-toast', 'Caviar & Brioche Toast', 'kaluga, crème fraîche, chives · for two', '48', 1);

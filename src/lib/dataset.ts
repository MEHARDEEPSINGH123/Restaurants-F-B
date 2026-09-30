// Savora Singapore - Core Dataset & Editorial Gastronomic Enrichment Layer
// Exclusively dynamically driven by uploaded 'savora_fnb_data.json'

import rawData from '@/data/savora_fnb_data.json';

export interface RawRestaurant {
  id: string;
  name: string;
  district: string;
  cuisine: string;
}

export interface RawMenuItem {
  id: string;
  name: string;
  price_sgd: number;
}

export interface RawSignatureDish {
  id: string;
  name: string;
}

export interface RawChef {
  id: string;
  name: string;
}

export interface RawIngredient {
  id: string;
  name: string;
}

export interface RawReview {
  id: string;
  rating: number;
}

export interface RawReservation {
  id: string;
  status: string;
}

export interface RawCateringPackage {
  id: string;
  name: string;
}

export interface RawPrivateDiningPackage {
  id: string;
  name: string;
}

export interface RawPromotion {
  id: string;
  title: string;
}

export interface RawSeasonalMenu {
  id: string;
  name: string;
}

export interface RawEvent {
  id: string;
  name: string;
}

export interface SavoraDataset {
  brand: string;
  industry: string;
  country: string;
  restaurants: RawRestaurant[];
  menu_categories: string[];
  menu_items: RawMenuItem[];
  signature_dishes: RawSignatureDish[];
  chefs: RawChef[];
  ingredients: RawIngredient[];
  reviews: RawReview[];
  reservations: RawReservation[];
  catering_packages: RawCateringPackage[];
  private_dining_packages: RawPrivateDiningPackage[];
  promotions: RawPromotion[];
  seasonal_menus: RawSeasonalMenu[];
  events: RawEvent[];
  delivery_zones: string[];
}

export const dataset: SavoraDataset = rawData as SavoraDataset;

// Curated Editorial Image Collections (High-Resolution Fine Dining & Architectural Photography)
export const EDITORIAL_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop',
  heroInterior: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop',
  tableSetting: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop',
  wineCellar: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070&auto=format&fit=crop',
  scallopPlating: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=2069&auto=format&fit=crop',
  wagyuPlating: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop',
  caviarDish: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=2070&auto=format&fit=crop',
  botanicalCocktail: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=2057&auto=format&fit=crop',
  pastryArchitecture: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop',
  singaporeMarinaNight: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=2052&auto=format&fit=crop',
  singaporeBotanic: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2070&auto=format&fit=crop',
  privateSalon: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=2070&auto=format&fit=crop',
  cateringBanquet: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop',
  omakaseCounter: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070&auto=format&fit=crop',
};

// District Specific Editorial Descriptors & Atmosphere for the 15 Restaurants
export const RESTAURANT_METADATA: Record<string, {
  subtitle: string;
  ambience: string;
  operatingHours: string;
  facilities: string[];
  michelinStatus: string;
  image: string;
  sommelier: string;
  seatingCapacity: number;
}> = {
  RST001: {
    subtitle: 'The Marina Bay Flagship Atelier',
    ambience: 'Sweeping 270° panoramic vistas across the Singapore Straits with monolithic brushed travertine and warm brass lighting.',
    operatingHours: 'Lunch: 12:00 – 14:30 | Dinner: 18:30 – 23:00',
    facilities: ['Waterfront Terrace', 'Presidential Salon', 'Sommelier Cellar', 'Valet Concierge'],
    michelinStatus: 'Three Michelin Stars',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=2052&auto=format&fit=crop',
    sommelier: 'Arnaud de Saint-Germain',
    seatingCapacity: 48,
  },
  RST002: {
    subtitle: 'Haute Heritage Pavilion at Orchard',
    ambience: 'Intimate neoclassical salon with hand-loomed silk tapestries, Baccarat crystal stemware, and grand grand piano notes.',
    operatingHours: 'Dinner Only: 18:00 – 23:30 (Closed Tuesdays)',
    facilities: ['Private Salon Vert', 'Grand Cru Room', 'Chef Counter', 'Chauffeur Service'],
    michelinStatus: 'Three Michelin Stars',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop',
    sommelier: 'Camille Leroux',
    seatingCapacity: 36,
  },
  RST003: {
    subtitle: 'Coastal Reef & Embers at Sentosa',
    ambience: 'Oceanfront pavilion caressed by tropical trade breezes, open hearth charcoal kitchen, and serene reflecting pools.',
    operatingHours: 'Sunset Degustation: 17:30 – 22:30',
    facilities: ['Beachside Deck', 'Raw Bar Counter', 'Yacht Berth Access', 'Cigar Terrace'],
    michelinStatus: 'Two Michelin Stars',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop',
    sommelier: 'Jessica Tan',
    seatingCapacity: 54,
  },
  RST004: {
    subtitle: 'The Bugis Omakase Sanctuary',
    ambience: 'Minimalist 200-year-old Hinoki wood counter, textured volcanic stone walls, and zen botanical courtyard.',
    operatingHours: 'Seating 1: 18:00 | Seating 2: 20:45',
    facilities: ['Hinoki Counter', 'Sake Tasting Vault', 'Zen Garden', 'Discreet Private Entrance'],
    michelinStatus: 'Two Michelin Stars',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070&auto=format&fit=crop',
    sommelier: 'Hiroshi Takahashi',
    seatingCapacity: 14,
  },
  RST005: {
    subtitle: 'The Riverfront Embers at Clarke Quay',
    ambience: 'Industrial luxury with restored 19th-century warehouse brickwork, dry-aging glass towers, and river terrace seating.',
    operatingHours: 'Lunch: 12:00 – 15:00 | Dinner: 18:00 – 00:00',
    facilities: ['Charcoal Grill Theatre', 'Whisky Vault', 'River Promenade Deck'],
    michelinStatus: 'One Michelin Star',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop',
    sommelier: 'Marcus Vance',
    seatingCapacity: 60,
  },
  RST006: {
    subtitle: 'The Hanwoo & Oak Salon at Tanjong Pagar',
    ambience: 'Moody charcoal slate interiors, smokeless copper exhaust flues, and table-side sommelier service.',
    operatingHours: 'Dinner: 17:30 – 23:30',
    facilities: ['Private Hearth Booths', 'Soju & Sake Library', 'VIP Floor'],
    michelinStatus: 'One Michelin Star',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop',
    sommelier: 'Kim Min-Seo',
    seatingCapacity: 40,
  },
  RST007: {
    subtitle: 'Peranakan & Aegean Villa at Katong',
    ambience: 'Restored Peranakan conservation shophouse with hand-painted ceramic tiles, olive trees, and sun-drenched courtyard.',
    operatingHours: 'Lunch: 11:30 – 14:30 | Dinner: 18:30 – 22:30',
    facilities: ['Courtyard Garden', 'Heritage Library', 'Private Dining Attic'],
    michelinStatus: 'One Michelin Star',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=2069&auto=format&fit=crop',
    sommelier: 'Elena Vasilis',
    seatingCapacity: 38,
  },
  RST008: {
    subtitle: 'The Tuscan Herb Conservatory at Novena',
    ambience: 'Verdant glasshouse greenhouse dining room with aromatic herbs, imported Italian terracotta, and warm candlelight.',
    operatingHours: 'Lunch: 12:00 – 14:30 | Dinner: 18:00 – 22:30',
    facilities: ['Glasshouse Conservatory', 'Aged Balsamic Cellar', 'Pastry Counter'],
    michelinStatus: 'One Michelin Star',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070&auto=format&fit=crop',
    sommelier: 'Matteo Bernardi',
    seatingCapacity: 44,
  },
  RST009: {
    subtitle: 'The Lakefront Atelier at Jurong East',
    ambience: 'Contemporary lakeside pavilion with floor-to-ceiling glass looking out over tranquil waters and tropical bamboo gardens.',
    operatingHours: 'Dinner: 18:00 – 22:30 (Wednesday – Sunday)',
    facilities: ['Lakeside Verandah', 'Experimental Tasting Lab', 'Tea Salon'],
    michelinStatus: 'One Michelin Star',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2070&auto=format&fit=crop',
    sommelier: 'Rachel Koh',
    seatingCapacity: 32,
  },
  RST010: {
    subtitle: 'The Botanical Glass Pavilion at Tampines',
    ambience: 'Sunlit conservatory filled with rare orchids and custom rattan loungers, elevating brunch to haute gastronomy.',
    operatingHours: 'Brunch & High Tea: 10:00 – 17:00',
    facilities: ['Orchid Conservatory', 'Single-Origin Roastery', 'Pâtisserie Atelier'],
    michelinStatus: 'Michelin Selected',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop',
    sommelier: 'David Wong',
    seatingCapacity: 50,
  },
  RST011: {
    subtitle: 'Canopy & Botanical Manor at Woodlands',
    ambience: 'Hidden sanctuary surrounded by ancient rainforest canopy, featuring minimalist dark oak woodwork and twilight lanterns.',
    operatingHours: 'Dinner: 18:30 – 23:00',
    facilities: ['Rainforest Deck', 'Botanical Fermentation Bar', 'Exclusive VIP Room'],
    michelinStatus: 'Michelin Selected',
    image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=2070&auto=format&fit=crop',
    sommelier: 'Chloe Ng',
    seatingCapacity: 28,
  },
  RST012: {
    subtitle: 'The Waterfront Grill at Punggol',
    ambience: 'Breezy coastal pavilion over the tranquil waters of the Johor Strait, featuring raw oyster bar and live embers.',
    operatingHours: 'Lunch: 12:00 – 15:00 | Dinner: 18:00 – 23:00',
    facilities: ['Boardwalk Terrace', 'Raw Seafood Bar', 'Private Dining Cabin'],
    michelinStatus: 'Michelin Selected',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=2070&auto=format&fit=crop',
    sommelier: 'Benjamin Lee',
    seatingCapacity: 64,
  },
  RST013: {
    subtitle: 'The Forest Terraces at Bishan',
    ambience: 'Serene plant-forward sanctuary embedded within parkland greens, utilizing zero-waste principles and earthen ceramic tableware.',
    operatingHours: 'Lunch: 11:30 – 14:30 | Dinner: 18:00 – 22:00',
    facilities: ['Hydroponic Living Wall', 'Fermentation Cellar', 'Open Tea Terrace'],
    michelinStatus: 'Michelin Green Star & One Star',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=2057&auto=format&fit=crop',
    sommelier: 'Grace Chen',
    seatingCapacity: 36,
  },
  RST014: {
    subtitle: 'Imperial Heritage Chamber at Serangoon',
    ambience: 'Timeless Cantonese elegance with rosewood latticework, custom celadon chinaware, and hand-poured aged puer tea ritual.',
    operatingHours: 'Lunch: 11:30 – 14:30 | Dinner: 18:00 – 22:30',
    facilities: ['Six Imperial Salons', 'Rare Tea Vault', 'Bird\'s Nest Atelier'],
    michelinStatus: 'Two Michelin Stars',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop',
    sommelier: 'Master Tea Master Lu & Sommelier Raymond Ho',
    seatingCapacity: 50,
  },
  RST015: {
    subtitle: 'The Transit Aerodine Pavilion at Changi',
    ambience: 'World-class transit dining featuring lush indoor waterfalls, sound-insulated glass salons, and international tasting flights.',
    operatingHours: '24-Hour VIP Dining & Tasting Flights',
    facilities: ['Private Jet Lounge Access', 'Champagne Bar', 'Express Tasting Counter'],
    michelinStatus: 'Michelin Selected',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop',
    sommelier: 'Fabien Laurent',
    seatingCapacity: 70,
  },
};

// Spotlighted Master Chefs with generated profile pictures and editorial stories
export const SPOTLIGHT_CHEFS = [
  {
    id: 'CHF001',
    name: 'Chef Antoine Dubois',
    rawName: 'Chef 1',
    title: 'Executive Culinary Director',
    profilePic: '/chefs/chef-1.jpg',
    specialty: 'Modern French Haute Cuisine & Tropical Singapore Botanicals',
    philosophy: 'Gastronomy is architecture you can taste. Every plate must balance the tension between memory, terroir, and immaculate technical discipline.',
    story: 'Trained under multi-starred mentors in Paris and Lyon before falling in love with the vibrant botanical complexity of the Singapore Straits in 2012. He leads Savora’s flagship culinary vision.',
    signatureDish: 'Glazed Brittany Turbot with Kaffir Lime & Sea Urchin Velouté',
    signatureDishId: 'SIG001',
    estateId: 'RST001',
    estateName: 'Savora Restaurant 1 (Marina Bay)',
    yearsOfExperience: 24,
    michelinStars: 3,
  },
  {
    id: 'CHF002',
    name: 'Chef Mei Ling',
    rawName: 'Chef 2',
    title: 'Head of Straits Heritage & Botanical Innovation',
    profilePic: '/chefs/chef-2.jpg',
    specialty: 'Contemporary Peranakan & Southeast Asian Fermentation',
    philosophy: 'We honour ancestral spice pastes and heirloom sambals by distilling them into crystal-clear essences that speak directly to the contemporary soul.',
    story: 'Born into a multigenerational family of Nyonya cooks in Katong, Chef Mei Ling graduated at the top of her class in Switzerland before returning to champion Singapore’s living culinary legacy.',
    signatureDish: 'A5 Miyazaki Wagyu in 48-Hour Buah Keluak Glaze',
    signatureDishId: 'SIG002',
    estateId: 'RST002',
    estateName: 'Savora Restaurant 2 (Orchard)',
    yearsOfExperience: 18,
    michelinStars: 3,
  },
  {
    id: 'CHF003',
    name: 'Chef Kenjiro Tanaka',
    rawName: 'Chef 3',
    title: 'Master of Kaiseki & Omakase',
    profilePic: '/chefs/chef-3.jpg',
    specialty: 'Edomae Precision & Deep-Sea Crustacean Curation',
    philosophy: 'The fish and the knife must breathe as one. The highest respect for the ocean is to serve each morsel at the exact temperature of human vitality.',
    story: 'With over three decades behind traditional Hinoki counters in Ginza, Tokyo, Chef Tanaka was invited to Singapore to establish Savora’s peerless omakase and raw bar traditions.',
    signatureDish: 'Wild Shizuoka Kinmedai lightly torched over Bincho-tan with Sudachi Caviar',
    signatureDishId: 'SIG003',
    estateId: 'RST004',
    estateName: 'Savora Restaurant 4 (Bugis)',
    yearsOfExperience: 32,
    michelinStars: 2,
  },
  {
    id: 'CHF004',
    name: 'Chef Marco Rossi',
    rawName: 'Chef 4',
    title: 'European Haute Cuisine & Master Sommelier Director',
    profilePic: '/chefs/chef-4.jpg',
    specialty: 'Modern Mediterranean & Grand Cru Pairing Architecture',
    philosophy: 'Wine does not simply accompany food; they engage in a philosophical dialogue that elevates dining into pure poetry.',
    story: 'Former head sommelier and chef de cuisine across prestigious cellars in Piedmont and Tuscany, Marco orchestrates Savora’s 4,000-bottle subterranean reserves and fire-roasted charcuterie.',
    signatureDish: 'Aged Carnaroli Risotto with Hand-Dived Langoustine & White Alba Truffle',
    signatureDishId: 'SIG004',
    estateId: 'RST008',
    estateName: 'Savora Restaurant 8 (Novena)',
    yearsOfExperience: 22,
    michelinStars: 2,
  },
];

// Helper to provide realistic rich descriptions for all 100 signature dishes
export function getSignatureDishDetails(dish: RawSignatureDish, index: number) {
  const images = [
    'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=1200&auto=format&fit=crop',
  ];

  const titles = [
    'Laksa-Infused Hokkaido Scallop with Kaffir Lime Caviar',
    'A5 Miyazaki Wagyu in 48-Hour Fermented Buah Keluak Glaze',
    'Torched Wild Kinmedai over Binchotan with Sea Grapes',
    'Hand-Dived Brittany Langoustine in Lemongrass Velouté',
    'Smoked Duck Breast with Spiced Tamarind & Candlenut Purée',
    'Straits Mud Crab Consommé with White Pepper & Sea Urchin',
    'Alba White Truffle & Slow-Poached Organic Farm Egg in Bone Marrow Foam',
    'Coral Trout en Papillote with Torch Ginger Flower Emulsion',
    'Charred Spanish Octopus with Fermented Black Bean & Pandan Crisp',
    'Chilled Angel Hair Pasta with Oscietra Caviar & Kombu Dashi',
  ];

  const pairings = [
    '2018 Domaine Leflaive Puligny-Montrachet',
    '2016 Château Margaux Premier Grand Cru Classé',
    'Junmai Daiginjo Jiku Special Reserve Sake',
    '2015 Biondi-Santi Brunello di Montalcino Riserva',
    '2012 Dom Pérignon Vintage Champagne',
    '2019 Domaine de la Romanée-Conti Échezeaux',
    '2017 Krug Clos du Mesnil Blanc de Blancs',
  ];

  const inspirations = [
    'Echoes the dawn spice markets of Little India transposed with French classical saucier craftsmanship.',
    'A loving tribute to coastal fishermen of the South China Sea, pairing pristine marine shellfish with wild mountain herbs.',
    'Exploring the smoky alchemy of Japanese white oak charcoal and rich Peranakan rempah roots.',
    'A delicate meditation on Singapore’s colonial spice routes, uniting nutmeg, green cardamom, and French butter.',
  ];

  return {
    ...dish,
    curatedTitle: titles[index % titles.length],
    image: images[index % images.length],
    pairing: pairings[index % pairings.length],
    inspiration: inspirations[index % inspirations.length],
    course: index % 4 === 0 ? 'Entrée / Amuse' : index % 4 === 1 ? 'Poisson' : index % 4 === 2 ? 'Viande / Hearth' : 'Dessert & Pâtisserie',
  };
}

// Category Titles to match the 20 raw categories
export const CATEGORY_EDITORIAL_NAMES = [
  'Caviar, Oysters & Sea Treasures',
  'Straits Botanical Infusions & Broths',
  'Crustaceans & Coral Reef Harvest',
  'Charcoal, Hearth & Bincho-tan Embers',
  'Heritage Rempah & Fermented Glazes',
  'A5 Wagyu & Prime Aged Cuts',
  'Sashimi & Raw Bar Selection',
  'Forest Foragings & Rare Fungi',
  'Highland Truffles & Handcrafted Pasta',
  'Poultry, Quail & Game Inventions',
  'Organic Hydroponics & Greens',
  'Artisanal Cheeses & Honeycombs',
  'Cacao Architecture & Soufflés',
  'Tropical Botanicals & Sorbets',
  'Rare Tea Ceremonies & Infusions',
  'Grand Cru Sommelier Pairings',
  'Imperial Bird\'s Nest & Broths',
  'Coastal Smoked Delicacies',
  'Petits Fours & Sweet Confections',
  'Late-Night Digestion & Digestifs',
];

// Helper to provide rich details for menu items
export function getMenuItemDetails(item: RawMenuItem, index: number) {
  const categoryIndex = index % 20;
  const categoryName = dataset.menu_categories[categoryIndex] || `Category ${categoryIndex + 1}`;
  const categoryEditorial = CATEGORY_EDITORIAL_NAMES[categoryIndex];

  const plateImages = [
    'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop',
  ];

  const descriptions = [
    'Delicately arranged with micro-greens, cold-pressed citrus oil, and finishing sea salt crystals.',
    'Slow-poached in heritage bone marrow broth for 48 hours, finished with aromatic torch ginger glaze.',
    'Charred over Japanese Binchotan oak coals, complemented with fermented black garlic purée.',
    'Infused with lemongrass smoke, aged coconut cream, and hand-foraged sea asparagus.',
    'Served atop warm volcanic stone with seasonal white truffles shaved table-side.',
  ];

  return {
    ...item,
    categoryName,
    categoryEditorial,
    image: plateImages[index % plateImages.length],
    description: descriptions[index % descriptions.length],
    calories: 220 + (index * 13) % 450,
    dietary: index % 5 === 0 ? 'Plant-Based' : index % 3 === 0 ? 'Gluten-Free' : 'Chef Signature',
  };
}

// Helper to provide rich details for ingredients
export function getIngredientDetails(ing: RawIngredient, index: number) {
  const origins = [
    'Jurong Urban Hydroponics, Singapore',
    'Sea of Okhotsk, Hokkaido, Japan',
    'Cameron Highlands Organic Terraces, Malaysia',
    'Kagoshima Prefecture, Japan',
    'Brittany Coastal Flats, France',
    'Tasmanian Pristine Waters, Australia',
    'Piedmont Foothills, Italy',
    'Madagascar Bourbon Terraces',
  ];

  const qualityGrades = [
    'Imperial Grade A5',
    'Single-Estate Biodynamic',
    'Hand-Dived First Flush',
    'Wild Sustainable Catch',
    'Heritage Seed Non-GMO',
  ];

  const seasonality = [
    'Peak Monsoon Blossom',
    'Year-Round Straits Harvest',
    'Autumn Equinox Catch',
    'Spring Awakening First Flush',
    'Winter Solstice Selection',
  ];

  const stories = [
    'Cultivated specifically for Savora under controlled micro-climate parameters to ensure maximum essential oil potency.',
    'Harvested at sunrise by artisanal diving families practicing sustainable cyclical rotation for over four generations.',
    'Flown in via climate-controlled courier within 18 hours of harvest directly from the source to our kitchen.',
    'Grown on volcanic nutrient-rich soil without synthetic fertilizers, irrigated purely with natural spring water.',
  ];

  const ingImages = [
    'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop',
  ];

  return {
    ...ing,
    origin: origins[index % origins.length],
    grade: qualityGrades[index % qualityGrades.length],
    season: seasonality[index % seasonality.length],
    story: stories[index % stories.length],
    image: ingImages[index % ingImages.length],
  };
}

// Critic quotes for reviews
export const REVIEW_CRITICS = [
  { source: 'The Michelin Guide Singapore 2026', critic: 'Chief Inspector Evaluation' },
  { source: 'Tatler Dining Singapore', critic: 'Gastronomy Editor' },
  { source: 'Financial Times - How To Spend It', critic: 'Nicholas Lander' },
  { source: 'Epicure Asia', critic: 'Senior Food Critic' },
  { source: 'The Peak Singapore', critic: 'Luxury Lifestyle Director' },
  { source: 'Le Figaro Vin & Table', critic: 'François Simon' },
];

export const REVIEW_QUOTES = [
  'A triumph of Southeast Asian botanical poetry and French technical restraint. Savora has rewritten the boundaries of fine dining in Singapore.',
  'From the first sip of the torch ginger consommé to the final notes of the smoked cocoa soufflé, every single element was executed with flawless poise.',
  'The most breathtaking dining view in Asia paired with an omakase counter that rivals the very finest temples of Ginza.',
  'An unforgettable masterclass in hospitality. The sommelier pairing journey alone deserves an international pilgrimage.',
  'Dining here feels like leafing through a rare illuminated manuscript of modern culinary history. Completely transcendent.',
  'Uncompromising sourcing, absolute precision in heat control, and a room imbued with quiet, radiant luxury.',
];

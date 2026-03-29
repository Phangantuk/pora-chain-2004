import type { Lang } from '@/lib/i18n'

export interface MealRegion {
  slug: string
  name: string
  country: string
  countryCode: string
  emoji: string
  description: string
  need: string
  goalUsd: number
  raisedUsd: number
  mealsServed: number
  eventCount: number
  lastActivity: string
  status: 'active' | 'urgent' | 'funded'
  tags: string[]
  coords: { lat: number; lng: number }
}

export type SpiceLevel = 'none' | 'mild' | 'medium' | 'hot'

export interface FeaturedMeal {
  mealName: string
  mealDescription: string
  mealType: string
  isVegetarian: boolean
  spiceLevel: SpiceLevel
  caloriesApprox: number
  availableToday: boolean
  portionLabel: string
}

export interface MealVenue {
  slug: string
  regionSlug: string
  regionName: string
  name: string
  city: string
  country: string
  neighborhood: string
  address: string
  coords: { lat: number; lng: number }
  featuredMeal: FeaturedMeal
}

export interface Donation {
  id: string
  regionSlug: string
  regionName: string
  amountUsd: number
  currency: 'USDT' | 'ETH' | 'USD'
  date: string
  status: 'confirmed' | 'pending' | 'processing'
  txHash?: string
  donor?: string
}

export interface MealEvent {
  id: string
  regionSlug: string
  regionName: string
  mealsCount: number
  date: string
  description: string
  validator?: string
  verified: boolean
}

export interface UserDonationSummary {
  totalUsd: number
  donationCount: number
  regionsSupported: number
  mealsImpacted: number
}

export const REGIONS: MealRegion[] = [
  {
    slug: 'nairobi-east',
    name: 'Nairobi East',
    country: 'Kenya',
    countryCode: 'KE',
    emoji: 'KE',
    description: 'Community kitchens in Mathare and Eastlands serving meals to displaced families and children.',
    need: 'Daily meals for 400+ people across 3 community kitchens',
    goalUsd: 12000,
    raisedUsd: 8640,
    mealsServed: 18400,
    eventCount: 47,
    lastActivity: '2026-03-18T09:14:00Z',
    status: 'active',
    tags: ['children', 'displaced', 'urban'],
    coords: { lat: -1.286, lng: 36.82 },
  },
  {
    slug: 'lahore-south',
    name: 'Lahore South',
    country: 'Pakistan',
    countryCode: 'PK',
    emoji: 'PK',
    description: 'Mobile food units serving flood-affected communities in southern Lahore.',
    need: 'Mobile kitchen fuel, ingredients, and volunteer coordinators',
    goalUsd: 9500,
    raisedUsd: 3200,
    mealsServed: 7800,
    eventCount: 22,
    lastActivity: '2026-03-19T14:30:00Z',
    status: 'urgent',
    tags: ['flood', 'mobile', 'urgent'],
    coords: { lat: 31.52, lng: 74.36 },
  },
  {
    slug: 'istanbul-migrant',
    name: 'Istanbul Migrant District',
    country: 'Turkey',
    countryCode: 'TR',
    emoji: 'TR',
    description: 'Refugee-run canteen in Sultanbeyli serving Syrian and Afghan refugee families.',
    need: 'Weekly ingredients for a 200-person canteen',
    goalUsd: 7000,
    raisedUsd: 7000,
    mealsServed: 24600,
    eventCount: 89,
    lastActivity: '2026-03-20T07:00:00Z',
    status: 'funded',
    tags: ['refugees', 'community-led', 'cultural'],
    coords: { lat: 41.01, lng: 29.17 },
  },
  {
    slug: 'manila-barangay',
    name: 'Manila Barangay 14',
    country: 'Philippines',
    countryCode: 'PH',
    emoji: 'PH',
    description: 'Barangay-based feeding for children under five with severe acute malnutrition in Tondo.',
    need: 'Therapeutic foods and cooking supplies for 80 children weekly',
    goalUsd: 5500,
    raisedUsd: 2900,
    mealsServed: 6200,
    eventCount: 31,
    lastActivity: '2026-03-17T11:00:00Z',
    status: 'urgent',
    tags: ['children', 'malnutrition', 'targeted'],
    coords: { lat: 14.62, lng: 120.98 },
  },
  {
    slug: 'lagos-mainland',
    name: 'Lagos Mainland',
    country: 'Nigeria',
    countryCode: 'NG',
    emoji: 'NG',
    description: 'A network of five community kitchens across Yaba, Mushin, and Surulere.',
    need: 'Scale from 320 to 500 daily meals with additional kitchen equipment',
    goalUsd: 15000,
    raisedUsd: 6400,
    mealsServed: 32000,
    eventCount: 112,
    lastActivity: '2026-03-20T10:45:00Z',
    status: 'active',
    tags: ['network', 'scaling', 'ngo-led'],
    coords: { lat: 6.52, lng: 3.38 },
  },
  {
    slug: 'berlin-migrant',
    name: 'Berlin Neukolln',
    country: 'Germany',
    countryCode: 'DE',
    emoji: 'DE',
    description: 'Multi-cultural solidarity kitchen serving migrants, asylum seekers, and low-income residents.',
    need: 'Monthly operational costs for weekend open meals',
    goalUsd: 4200,
    raisedUsd: 4200,
    mealsServed: 11200,
    eventCount: 58,
    lastActivity: '2026-03-16T16:00:00Z',
    status: 'funded',
    tags: ['solidarity', 'migrant', 'weekend'],
    coords: { lat: 52.48, lng: 13.43 },
  },
  {
    slug: 'cairo-informal',
    name: 'Cairo Informal Settlements',
    country: 'Egypt',
    countryCode: 'EG',
    emoji: 'EG',
    description: 'Feeding program in Manshiyat Naser serving waste-picker families and children.',
    need: 'Daily meals for 250 people in two settlement kitchens',
    goalUsd: 6800,
    raisedUsd: 1900,
    mealsServed: 4400,
    eventCount: 18,
    lastActivity: '2026-03-15T08:30:00Z',
    status: 'urgent',
    tags: ['informal', 'waste-pickers', 'children'],
    coords: { lat: 30.07, lng: 31.29 },
  },
  {
    slug: 'sao-paulo-periphery',
    name: 'Sao Paulo Periphery',
    country: 'Brazil',
    countryCode: 'BR',
    emoji: 'BR',
    description: "Community soup kitchens operated by local mothers' cooperatives in outer districts.",
    need: 'Ingredient funding and gas for six cooperative kitchens',
    goalUsd: 8200,
    raisedUsd: 5100,
    mealsServed: 14700,
    eventCount: 67,
    lastActivity: '2026-03-19T12:00:00Z',
    status: 'active',
    tags: ['cooperative', 'women-led', 'periphery'],
    coords: { lat: -23.55, lng: -46.63 },
  },
]

export const VENUES: MealVenue[] = [
  {
    slug: 'nairobi-mathare-kitchen',
    regionSlug: 'nairobi-east',
    regionName: 'Nairobi East',
    name: 'Mathare Community Kitchen',
    city: 'Nairobi',
    country: 'Kenya',
    neighborhood: 'Mathare',
    address: 'Mathare North Rd, Nairobi',
    coords: { lat: -1.259, lng: 36.854 },
    featuredMeal: {
      mealName: 'Ugali with Bean Stew',
      mealDescription: 'Steamed maize meal with slow-cooked red beans and seasonal greens.',
      mealType: 'hot meal',
      isVegetarian: true,
      spiceLevel: 'mild',
      caloriesApprox: 620,
      availableToday: true,
      portionLabel: '1 tray (520 g)',
    },
  },
  {
    slug: 'nairobi-eastlands-mobile',
    regionSlug: 'nairobi-east',
    regionName: 'Nairobi East',
    name: 'Eastlands Mobile Point',
    city: 'Nairobi',
    country: 'Kenya',
    neighborhood: 'Eastlands',
    address: 'Outer Ring Rd, Nairobi',
    coords: { lat: -1.286, lng: 36.896 },
    featuredMeal: {
      mealName: 'Fortified Maize Porridge',
      mealDescription: 'Warm maize porridge with milk powder and groundnut blend for children and elders.',
      mealType: 'porridge',
      isVegetarian: true,
      spiceLevel: 'none',
      caloriesApprox: 410,
      availableToday: true,
      portionLabel: '1 cup (350 ml)',
    },
  },
  {
    slug: 'lahore-ravi-mobile',
    regionSlug: 'lahore-south',
    regionName: 'Lahore South',
    name: 'Ravi Flood Relief Unit',
    city: 'Lahore',
    country: 'Pakistan',
    neighborhood: 'Ravi sector',
    address: 'Shahdara bypass service lot, Lahore',
    coords: { lat: 31.585, lng: 74.292 },
    featuredMeal: {
      mealName: 'Lentil Rice Bowl',
      mealDescription: 'Masoor dal with steamed rice and a small cucumber-onion salad.',
      mealType: 'rice bowl',
      isVegetarian: true,
      spiceLevel: 'medium',
      caloriesApprox: 560,
      availableToday: true,
      portionLabel: '1 bowl (480 g)',
    },
  },
  {
    slug: 'istanbul-sultanbeyli-canteen',
    regionSlug: 'istanbul-migrant',
    regionName: 'Istanbul Migrant District',
    name: 'Sultanbeyli Solidarity Canteen',
    city: 'Istanbul',
    country: 'Turkey',
    neighborhood: 'Sultanbeyli',
    address: 'Fatih Blv 91, Sultanbeyli',
    coords: { lat: 40.97, lng: 29.27 },
    featuredMeal: {
      mealName: 'Mercimek Soup Set',
      mealDescription: 'Red lentil soup served with flatbread and a boiled egg.',
      mealType: 'soup set',
      isVegetarian: false,
      spiceLevel: 'mild',
      caloriesApprox: 500,
      availableToday: true,
      portionLabel: '1 set (450 g)',
    },
  },
  {
    slug: 'manila-tondo-center',
    regionSlug: 'manila-barangay',
    regionName: 'Manila Barangay 14',
    name: 'Tondo Child Nutrition Hub',
    city: 'Manila',
    country: 'Philippines',
    neighborhood: 'Tondo',
    address: 'Barangay 14 covered court, Manila',
    coords: { lat: 14.626, lng: 120.972 },
    featuredMeal: {
      mealName: 'Chicken Arroz Caldo',
      mealDescription: 'Rice porridge with shredded chicken, ginger, and soft-boiled egg.',
      mealType: 'porridge',
      isVegetarian: false,
      spiceLevel: 'none',
      caloriesApprox: 470,
      availableToday: true,
      portionLabel: '1 bowl (430 g)',
    },
  },
  {
    slug: 'lagos-yaba-community',
    regionSlug: 'lagos-mainland',
    regionName: 'Lagos Mainland',
    name: 'Yaba Community Kitchen',
    city: 'Lagos',
    country: 'Nigeria',
    neighborhood: 'Yaba',
    address: 'Herbert Macaulay Rd, Yaba',
    coords: { lat: 6.515, lng: 3.372 },
    featuredMeal: {
      mealName: 'Jollof Rice with Beans',
      mealDescription: 'Tomato jollof rice paired with black-eyed beans and cabbage slaw.',
      mealType: 'rice plate',
      isVegetarian: true,
      spiceLevel: 'medium',
      caloriesApprox: 640,
      availableToday: true,
      portionLabel: '1 plate (500 g)',
    },
  },
  {
    slug: 'lagos-mushin-family-kitchen',
    regionSlug: 'lagos-mainland',
    regionName: 'Lagos Mainland',
    name: 'Mushin Family Support Kitchen',
    city: 'Lagos',
    country: 'Nigeria',
    neighborhood: 'Mushin',
    address: 'Agege Motor Rd, Mushin',
    coords: { lat: 6.535, lng: 3.352 },
    featuredMeal: {
      mealName: 'Rice with Efo Riro',
      mealDescription: 'Steamed rice with spinach stew and small protein chunks.',
      mealType: 'stew plate',
      isVegetarian: false,
      spiceLevel: 'hot',
      caloriesApprox: 610,
      availableToday: true,
      portionLabel: '1 plate (490 g)',
    },
  },
  {
    slug: 'berlin-neukolln-solidarity',
    regionSlug: 'berlin-migrant',
    regionName: 'Berlin Neukolln',
    name: 'Neukolln Solidarity Kitchen',
    city: 'Berlin',
    country: 'Germany',
    neighborhood: 'Neukolln',
    address: 'Sonnenallee 115, Berlin',
    coords: { lat: 52.473, lng: 13.445 },
    featuredMeal: {
      mealName: 'Vegetable Lentil Stew',
      mealDescription: 'Hearty lentil stew with potatoes, carrots, and rye bread.',
      mealType: 'stew set',
      isVegetarian: true,
      spiceLevel: 'none',
      caloriesApprox: 530,
      availableToday: true,
      portionLabel: '1 bowl + bread (460 g)',
    },
  },
  {
    slug: 'cairo-manshiyat-kitchen-1',
    regionSlug: 'cairo-informal',
    regionName: 'Cairo Informal Settlements',
    name: 'Manshiyat Naser Kitchen 1',
    city: 'Cairo',
    country: 'Egypt',
    neighborhood: 'Manshiyat Naser',
    address: 'Al Nasr St service lane, Cairo',
    coords: { lat: 30.086, lng: 31.314 },
    featuredMeal: {
      mealName: 'Classic Koshari',
      mealDescription: 'Rice, pasta, lentils, chickpeas, and tomato sauce with crispy onions.',
      mealType: 'mixed bowl',
      isVegetarian: true,
      spiceLevel: 'mild',
      caloriesApprox: 690,
      availableToday: true,
      portionLabel: '1 bowl (520 g)',
    },
  },
  {
    slug: 'cairo-manshiyat-kitchen-2',
    regionSlug: 'cairo-informal',
    regionName: 'Cairo Informal Settlements',
    name: 'Manshiyat Naser Kitchen 2',
    city: 'Cairo',
    country: 'Egypt',
    neighborhood: 'Manshiyat Naser',
    address: 'El Mahjar community yard, Cairo',
    coords: { lat: 30.072, lng: 31.302 },
    featuredMeal: {
      mealName: 'Ful Wrap Meal',
      mealDescription: 'Fava bean mash in baladi bread with tomato-cucumber side.',
      mealType: 'wrap set',
      isVegetarian: true,
      spiceLevel: 'none',
      caloriesApprox: 520,
      availableToday: true,
      portionLabel: '1 wrap set (420 g)',
    },
  },
  {
    slug: 'saopaulo-zonaleste-coop',
    regionSlug: 'sao-paulo-periphery',
    regionName: 'Sao Paulo Periphery',
    name: 'Zona Leste Cooperative Kitchen',
    city: 'Sao Paulo',
    country: 'Brazil',
    neighborhood: 'Zona Leste',
    address: 'Av. Mateo Bei 2200, Sao Paulo',
    coords: { lat: -23.548, lng: -46.47 },
    featuredMeal: {
      mealName: 'Rice, Beans and Vegetables',
      mealDescription: 'Brazilian-style rice and beans with pumpkin and braised cabbage.',
      mealType: 'plate',
      isVegetarian: true,
      spiceLevel: 'none',
      caloriesApprox: 580,
      availableToday: true,
      portionLabel: '1 plate (500 g)',
    },
  },
  {
    slug: 'saopaulo-grajau-kitchen',
    regionSlug: 'sao-paulo-periphery',
    regionName: 'Sao Paulo Periphery',
    name: 'Grajau Family Kitchen',
    city: 'Sao Paulo',
    country: 'Brazil',
    neighborhood: 'Grajau',
    address: 'R. Dona Belmira Marin 9800, Sao Paulo',
    coords: { lat: -23.787, lng: -46.697 },
    featuredMeal: {
      mealName: 'Chicken and Pumpkin Stew',
      mealDescription: 'Slow-cooked chicken with pumpkin, cassava, and white rice.',
      mealType: 'stew plate',
      isVegetarian: false,
      spiceLevel: 'mild',
      caloriesApprox: 630,
      availableToday: true,
      portionLabel: '1 plate (510 g)',
    },
  },
]

export const MOCK_DONATIONS: Donation[] = [
  { id: 'd-001', regionSlug: 'nairobi-east', regionName: 'Nairobi East', amountUsd: 150, currency: 'USDT', date: '2026-03-20T09:15:00Z', status: 'confirmed', txHash: '0x3f8a...2c9e', donor: 'Anonymous' },
  { id: 'd-002', regionSlug: 'lahore-south', regionName: 'Lahore South', amountUsd: 80, currency: 'USDT', date: '2026-03-20T07:40:00Z', status: 'confirmed', txHash: '0xd12b...8f01', donor: 'Alex M.' },
  { id: 'd-003', regionSlug: 'istanbul-migrant', regionName: 'Istanbul Migrant District', amountUsd: 300, currency: 'ETH', date: '2026-03-19T21:00:00Z', status: 'confirmed', txHash: '0x71ca...4d55', donor: 'Anonymous' },
  { id: 'd-004', regionSlug: 'lagos-mainland', regionName: 'Lagos Mainland', amountUsd: 500, currency: 'USDT', date: '2026-03-19T14:30:00Z', status: 'confirmed', txHash: '0xaa3f...9b22', donor: 'Maria G.' },
  { id: 'd-005', regionSlug: 'manila-barangay', regionName: 'Manila Barangay 14', amountUsd: 60, currency: 'USD', date: '2026-03-18T18:20:00Z', status: 'confirmed', donor: 'John D.' },
  { id: 'd-006', regionSlug: 'cairo-informal', regionName: 'Cairo Informal Settlements', amountUsd: 120, currency: 'USDT', date: '2026-03-18T11:00:00Z', status: 'pending', txHash: '0x5e7d...3c88', donor: 'Anonymous' },
  { id: 'd-007', regionSlug: 'sao-paulo-periphery', regionName: 'Sao Paulo Periphery', amountUsd: 200, currency: 'ETH', date: '2026-03-17T15:45:00Z', status: 'confirmed', txHash: '0xb2f1...7a04', donor: 'Anna K.' },
  { id: 'd-008', regionSlug: 'berlin-migrant', regionName: 'Berlin Neukolln', amountUsd: 75, currency: 'USD', date: '2026-03-17T10:10:00Z', status: 'confirmed', donor: 'P. Mueller' },
  { id: 'd-009', regionSlug: 'nairobi-east', regionName: 'Nairobi East', amountUsd: 250, currency: 'USDT', date: '2026-03-16T08:00:00Z', status: 'confirmed', txHash: '0xc9d0...1a3f', donor: 'Anonymous' },
  { id: 'd-010', regionSlug: 'lahore-south', regionName: 'Lahore South', amountUsd: 100, currency: 'ETH', date: '2026-03-15T19:30:00Z', status: 'confirmed', txHash: '0xf3e1...55bb', donor: 'Sam T.' },
]

export const MOCK_EVENTS: MealEvent[] = [
  { id: 'ev-001', regionSlug: 'lagos-mainland', regionName: 'Lagos Mainland', mealsCount: 320, date: '2026-03-20T10:45:00Z', description: 'Morning distribution at Yaba community center', verified: true, validator: 'validator_0x3f' },
  { id: 'ev-002', regionSlug: 'nairobi-east', regionName: 'Nairobi East', mealsCount: 180, date: '2026-03-20T09:14:00Z', description: 'Lunch service at Mathare kitchen', verified: true, validator: 'validator_0xd1' },
  { id: 'ev-003', regionSlug: 'istanbul-migrant', regionName: 'Istanbul Migrant District', mealsCount: 210, date: '2026-03-20T07:00:00Z', description: 'Breakfast for refugee families in Sultanbeyli', verified: true, validator: 'validator_0x71' },
  { id: 'ev-004', regionSlug: 'sao-paulo-periphery', regionName: 'Sao Paulo Periphery', mealsCount: 145, date: '2026-03-19T12:00:00Z', description: 'Lunch cooperative in Zona Leste kitchen', verified: true, validator: 'validator_0xaa' },
  { id: 'ev-005', regionSlug: 'lahore-south', regionName: 'Lahore South', mealsCount: 96, date: '2026-03-19T14:30:00Z', description: 'Mobile unit deployment in flood zone sector 4', verified: false },
  { id: 'ev-006', regionSlug: 'manila-barangay', regionName: 'Manila Barangay 14', mealsCount: 80, date: '2026-03-18T11:00:00Z', description: 'Therapeutic feeding for 80 children in Tondo district', verified: true, validator: 'validator_0x5e' },
  { id: 'ev-007', regionSlug: 'berlin-migrant', regionName: 'Berlin Neukolln', mealsCount: 165, date: '2026-03-16T16:00:00Z', description: 'Sunday solidarity meal multi-cultural community event', verified: true, validator: 'validator_0xb2' },
  { id: 'ev-008', regionSlug: 'cairo-informal', regionName: 'Cairo Informal Settlements', mealsCount: 110, date: '2026-03-15T08:30:00Z', description: 'Morning feeding in Manshiyat Naser kitchen 1', verified: false },
]

export const MOCK_USER_SUMMARY: UserDonationSummary = {
  totalUsd: 835,
  donationCount: 7,
  regionsSupported: 3,
  mealsImpacted: 1680,
}

export const MOCK_USER_DONATIONS: Donation[] = MOCK_DONATIONS.slice(0, 5)

export function getRegionBySlug(slug: string): MealRegion | undefined {
  return REGIONS.find((region) => region.slug === slug)
}

export function getVenueBySlug(slug: string): MealVenue | undefined {
  return VENUES.find((venue) => venue.slug === slug)
}

export function getVenuesByRegion(regionSlug: string): MealVenue[] {
  return VENUES.filter((venue) => venue.regionSlug === regionSlug)
}

export function getProgressPct(region: MealRegion): number {
  return Math.min(100, Math.round((region.raisedUsd / region.goalUsd) * 100))
}

export function formatUsd(amount: number): string {
  return `$${amount.toLocaleString()}`
}

function localeForLang(lang: Lang): string {
  if (lang === 'ru') return 'ru-RU'
  if (lang === 'es') return 'es-ES'
  return 'en-US'
}

export function timeAgo(iso: string, lang: Lang = 'en'): string {
  const deltaSeconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  const abs = Math.abs(deltaSeconds)
  const rtf = new Intl.RelativeTimeFormat(localeForLang(lang), { numeric: 'auto' })

  if (abs < 60) return rtf.format(-deltaSeconds, 'second')
  if (abs < 3600) return rtf.format(-Math.floor(deltaSeconds / 60), 'minute')
  if (abs < 86400) return rtf.format(-Math.floor(deltaSeconds / 3600), 'hour')
  return rtf.format(-Math.floor(deltaSeconds / 86400), 'day')
}

export function formatDate(iso: string, lang: Lang = 'en'): string {
  return new Date(iso).toLocaleDateString(localeForLang(lang), {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

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

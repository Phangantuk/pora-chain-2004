import type { Lang } from '@/lib/i18n'

export type VenueSettlementStatus = 'draft' | 'reviewed' | 'approved' | 'paid'
export type VenueAvailabilityStatus = 'open' | 'low' | 'paused' | 'full'

export interface VenueSettlementRow {
  id: string
  weekLabel: string
  periodStart: string
  periodEnd: string
  confirmedMeals: number
  ratePerMeal: number
  grossAmount: number
  adjustments: number
  finalPayout: number
  status: VenueSettlementStatus
}

export interface VenueActivityItem {
  id: string
  timestamp: string
  title: string
  detail: string
}

export const VENUE_SUMMARY = {
  activeVenues: 12,
  activeCities: 8,
  confirmedMealsYtd: 13840,
  averageRatePerMeal: 2.42,
  currentPeriodLabel: 'Week 12, 2026',
  operationalFeePct: 3,
}

export const VENUE_SETTLEMENT_PREVIEW: VenueSettlementRow[] = [
  {
    id: 'v-set-2026-w10',
    weekLabel: 'Week 10, 2026',
    periodStart: '2026-03-03',
    periodEnd: '2026-03-09',
    confirmedMeals: 642,
    ratePerMeal: 2.45,
    grossAmount: 1572.9,
    adjustments: -24,
    finalPayout: 1548.9,
    status: 'paid',
  },
  {
    id: 'v-set-2026-w11',
    weekLabel: 'Week 11, 2026',
    periodStart: '2026-03-10',
    periodEnd: '2026-03-16',
    confirmedMeals: 688,
    ratePerMeal: 2.48,
    grossAmount: 1706.24,
    adjustments: 18,
    finalPayout: 1724.24,
    status: 'approved',
  },
  {
    id: 'v-set-2026-w12',
    weekLabel: 'Week 12, 2026',
    periodStart: '2026-03-17',
    periodEnd: '2026-03-23',
    confirmedMeals: 705,
    ratePerMeal: 2.5,
    grossAmount: 1762.5,
    adjustments: -11.5,
    finalPayout: 1751,
    status: 'reviewed',
  },
  {
    id: 'v-set-2026-w13',
    weekLabel: 'Week 13, 2026',
    periodStart: '2026-03-24',
    periodEnd: '2026-03-30',
    confirmedMeals: 512,
    ratePerMeal: 2.5,
    grossAmount: 1280,
    adjustments: 0,
    finalPayout: 1280,
    status: 'draft',
  },
]

export const VENUE_ACTIVITY_FEED: VenueActivityItem[] = [
  {
    id: 'va-001',
    timestamp: '2026-03-24T08:45:00Z',
    title: 'Service window opened',
    detail: 'Venue status moved to open with 120 planned portions.',
  },
  {
    id: 'va-002',
    timestamp: '2026-03-24T12:10:00Z',
    title: 'Claim confirmation batch',
    detail: '84 recipient claims confirmed and recorded as issued meals.',
  },
  {
    id: 'va-003',
    timestamp: '2026-03-24T15:30:00Z',
    title: 'Capacity changed to low',
    detail: 'Stock dropped below 20%; queue guidance was updated for remaining claims.',
  },
  {
    id: 'va-004',
    timestamp: '2026-03-25T09:20:00Z',
    title: 'Weekly draft generated',
    detail: 'Settlement draft generated from confirmed events and flagged exceptions.',
  },
]

export function getVenueSettlementStatusLabel(status: VenueSettlementStatus, lang: Lang): string {
  if (lang === 'ru') {
    if (status === 'draft') return '\u0447\u0435\u0440\u043d\u043e\u0432\u0438\u043a'
    if (status === 'reviewed') return '\u043f\u0440\u043e\u0432\u0435\u0440\u0435\u043d\u043e'
    if (status === 'approved') return '\u0443\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u043e'
    return '\u043e\u043f\u043b\u0430\u0447\u0435\u043d\u043e'
  }
  return status
}

export function getVenueSettlementStatusColor(status: VenueSettlementStatus): string {
  if (status === 'paid') return '#4ECAA0'
  if (status === 'approved') return '#7BA7F5'
  if (status === 'reviewed') return '#F5C542'
  return '#E8855A'
}

export function getVenueStateLabel(status: VenueAvailabilityStatus, lang: Lang): string {
  if (lang === 'ru') {
    if (status === 'open') return '\u043e\u0442\u043a\u0440\u044b\u0442\u043e'
    if (status === 'low') return '\u043d\u0438\u0437\u043a\u0438\u0439 \u0440\u0435\u0437\u0435\u0440\u0432'
    if (status === 'paused') return '\u043f\u0430\u0443\u0437\u0430'
    return '\u043f\u043e\u043b\u043d\u0430\u044f \u0435\u043c\u043a\u043e\u0441\u0442\u044c'
  }
  if (status === 'open') return 'open'
  if (status === 'low') return 'low'
  if (status === 'paused') return 'paused'
  return 'full'
}

export function getVenueStateColor(status: VenueAvailabilityStatus): string {
  if (status === 'open') return '#4ECAA0'
  if (status === 'low') return '#F5C542'
  if (status === 'paused') return '#E8855A'
  return '#7BA7F5'
}

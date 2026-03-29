import type { Lang } from '@/lib/i18n'
import { VENUES } from '@/lib/meal/data'

export type SettlementStatus = 'draft' | 'reviewed' | 'approved' | 'paid'

export interface SettlementLine {
  venueSlug: string
  venueName: string
  cityZone: string
  confirmedMeals: number
  ratePerMeal: number
  grossAmount: number
  adjustments: number
  finalPayout: number
  status: SettlementStatus
}

export interface WeeklySettlement {
  id: string
  weekLabel: string
  periodStart: string
  periodEnd: string
  confirmedMeals: number
  venuePayoutTotal: number
  operationalFee: number
  remainingBalance: number
  status: SettlementStatus
  lines: SettlementLine[]
}

export type StatementType = 'weekly' | 'monthly'

export interface FunderStatement {
  id: string
  type: StatementType
  periodLabel: string
  fundsReceived: number
  confirmedMealsIssued: number
  venuePayoutTotal: number
  operationalFee: number
  remainingBalance: number
  activeVenues: number
  exceptionSummary: string
  narrativeSummary: string
  generatedAt: string
  status: 'generated' | 'published'
}

export interface FunderActivityItem {
  id: string
  timestamp: string
  kind:
    | 'funding_received'
    | 'venue_state'
    | 'claim_confirmed'
    | 'meal_issued'
    | 'settlement_generated'
    | 'payout_approved'
    | 'statement_generated'
  title: string
  detail: string
}

export interface FunderExceptionItem {
  id: string
  date: string
  type:
    | 'expired_claim'
    | 'rejected_claim'
    | 'duplicate_attempt'
    | 'venue_adjustment'
    | 'venue_interruption'
    | 'manual_adjustment'
  venueName: string
  cityZone: string
  detail: string
  impactAmount: number
}

export interface FunderDocument {
  id: string
  title: string
  summary: string
  updatedAt: string
}

export interface FunderVenueReportRow {
  venueSlug: string
  venueName: string
  cityZone: string
  confirmedMeals: number
  grossAmount: number
  adjustments: number
  finalPayout: number
  state: 'active' | 'paused' | 'full'
}

interface SettlementSeed {
  id: string
  weekLabel: string
  periodStart: string
  periodEnd: string
  status: SettlementStatus
  lines: Array<{
    venueSlug: string
    confirmedMeals: number
    ratePerMeal: number
    adjustments?: number
    status?: SettlementStatus
  }>
}

const INITIAL_FUNDED_POOL = 120000
const OPERATIONAL_FEE_RATE = 0.03

const VENUE_STATE: Record<string, 'active' | 'paused' | 'full'> = {
  'nairobi-mathare-kitchen': 'active',
  'nairobi-eastlands-mobile': 'active',
  'lahore-ravi-mobile': 'active',
  'istanbul-sultanbeyli-canteen': 'active',
  'manila-tondo-center': 'full',
  'lagos-yaba-community': 'active',
  'lagos-mushin-family-kitchen': 'active',
  'berlin-neukolln-solidarity': 'active',
  'cairo-manshiyat-kitchen-1': 'paused',
  'cairo-manshiyat-kitchen-2': 'active',
  'saopaulo-zonaleste-coop': 'active',
  'saopaulo-grajau-kitchen': 'active',
}

const SETTLEMENT_SEEDS: SettlementSeed[] = [
  {
    id: 'set-2026-w10',
    weekLabel: 'Week 10, 2026',
    periodStart: '2026-03-03',
    periodEnd: '2026-03-09',
    status: 'paid',
    lines: [
      { venueSlug: 'nairobi-mathare-kitchen', confirmedMeals: 640, ratePerMeal: 2.45 },
      { venueSlug: 'nairobi-eastlands-mobile', confirmedMeals: 430, ratePerMeal: 2.05 },
      { venueSlug: 'lahore-ravi-mobile', confirmedMeals: 520, ratePerMeal: 2.18 },
      { venueSlug: 'istanbul-sultanbeyli-canteen', confirmedMeals: 470, ratePerMeal: 2.72 },
      { venueSlug: 'manila-tondo-center', confirmedMeals: 405, ratePerMeal: 2.26 },
      { venueSlug: 'lagos-yaba-community', confirmedMeals: 700, ratePerMeal: 2.52 },
      { venueSlug: 'lagos-mushin-family-kitchen', confirmedMeals: 620, ratePerMeal: 2.48, adjustments: -42 },
    ],
  },
  {
    id: 'set-2026-w11',
    weekLabel: 'Week 11, 2026',
    periodStart: '2026-03-10',
    periodEnd: '2026-03-16',
    status: 'approved',
    lines: [
      { venueSlug: 'nairobi-mathare-kitchen', confirmedMeals: 680, ratePerMeal: 2.45 },
      { venueSlug: 'lahore-ravi-mobile', confirmedMeals: 560, ratePerMeal: 2.2 },
      { venueSlug: 'istanbul-sultanbeyli-canteen', confirmedMeals: 495, ratePerMeal: 2.72 },
      { venueSlug: 'lagos-yaba-community', confirmedMeals: 740, ratePerMeal: 2.54 },
      { venueSlug: 'lagos-mushin-family-kitchen', confirmedMeals: 655, ratePerMeal: 2.5 },
      { venueSlug: 'cairo-manshiyat-kitchen-1', confirmedMeals: 390, ratePerMeal: 2.22, adjustments: -31 },
      { venueSlug: 'cairo-manshiyat-kitchen-2', confirmedMeals: 360, ratePerMeal: 2.18, adjustments: 22 },
    ],
  },
  {
    id: 'set-2026-w12',
    weekLabel: 'Week 12, 2026',
    periodStart: '2026-03-17',
    periodEnd: '2026-03-23',
    status: 'reviewed',
    lines: [
      { venueSlug: 'nairobi-mathare-kitchen', confirmedMeals: 710, ratePerMeal: 2.46 },
      { venueSlug: 'nairobi-eastlands-mobile', confirmedMeals: 465, ratePerMeal: 2.05 },
      { venueSlug: 'manila-tondo-center', confirmedMeals: 430, ratePerMeal: 2.28 },
      { venueSlug: 'berlin-neukolln-solidarity', confirmedMeals: 355, ratePerMeal: 2.88 },
      { venueSlug: 'saopaulo-zonaleste-coop', confirmedMeals: 520, ratePerMeal: 2.34 },
      { venueSlug: 'saopaulo-grajau-kitchen', confirmedMeals: 500, ratePerMeal: 2.38 },
      { venueSlug: 'lagos-yaba-community', confirmedMeals: 760, ratePerMeal: 2.56, adjustments: -18 },
      { venueSlug: 'lagos-mushin-family-kitchen', confirmedMeals: 680, ratePerMeal: 2.52 },
    ],
  },
]

function round2(value: number): number {
  return Math.round(value * 100) / 100
}

function venueBySlug(slug: string) {
  return VENUES.find((venue) => venue.slug === slug)
}

function buildSettlement(seed: SettlementSeed, runningBalance: number): WeeklySettlement {
  const lines: SettlementLine[] = seed.lines.map((line) => {
    const venue = venueBySlug(line.venueSlug)
    const grossAmount = round2(line.confirmedMeals * line.ratePerMeal)
    const adjustments = line.adjustments ?? 0
    const finalPayout = round2(grossAmount + adjustments)
    return {
      venueSlug: line.venueSlug,
      venueName: venue?.name ?? line.venueSlug,
      cityZone: venue ? `${venue.city} / ${venue.neighborhood}` : 'Unknown',
      confirmedMeals: line.confirmedMeals,
      ratePerMeal: line.ratePerMeal,
      grossAmount,
      adjustments,
      finalPayout,
      status: line.status ?? seed.status,
    }
  })

  const confirmedMeals = lines.reduce((sum, line) => sum + line.confirmedMeals, 0)
  const venuePayoutTotal = round2(lines.reduce((sum, line) => sum + line.finalPayout, 0))
  const operationalFee = round2(venuePayoutTotal * OPERATIONAL_FEE_RATE)
  const remainingBalance = round2(runningBalance - venuePayoutTotal - operationalFee)

  return {
    id: seed.id,
    weekLabel: seed.weekLabel,
    periodStart: seed.periodStart,
    periodEnd: seed.periodEnd,
    confirmedMeals,
    venuePayoutTotal,
    operationalFee,
    remainingBalance,
    status: seed.status,
    lines,
  }
}

const settlementBuffer: WeeklySettlement[] = []
let currentBalance = INITIAL_FUNDED_POOL

for (const seed of SETTLEMENT_SEEDS) {
  const built = buildSettlement(seed, currentBalance)
  settlementBuffer.push(built)
  currentBalance = built.remainingBalance
}

export const FUNDING_POOL = {
  totalFunded: INITIAL_FUNDED_POOL,
  currentBalance,
  operationalFeeRatePct: 3,
}

export const FUNDING_MODEL = {
  fundsInAdvance:
    'Funds are provided in advance by the funder and received by the Thai operating company as the official recipient.',
  payoutModel:
    'Confirmed issued meals are aggregated weekly. Venue payouts are calculated from confirmed meal issuance lines.',
  feeModel:
    'A transparent 3% operational/reporting fee is applied to support reporting, verification, and transparency infrastructure.',
  balanceModel:
    'Remaining balance stays visible after each settlement cycle and is carried into the next reporting period.',
}

export const WEEKLY_SETTLEMENTS: WeeklySettlement[] = settlementBuffer

const weeklyStatements: FunderStatement[] = WEEKLY_SETTLEMENTS.map((settlement) => ({
  id: `stmt-${settlement.id}`,
  type: 'weekly',
  periodLabel: `${settlement.weekLabel} (${settlement.periodStart} to ${settlement.periodEnd})`,
  fundsReceived: 0,
  confirmedMealsIssued: settlement.confirmedMeals,
  venuePayoutTotal: settlement.venuePayoutTotal,
  operationalFee: settlement.operationalFee,
  remainingBalance: settlement.remainingBalance,
  activeVenues: new Set(settlement.lines.map((line) => line.venueSlug)).size,
  exceptionSummary: 'Minor line-level adjustments tracked and documented in exceptions.',
  narrativeSummary:
    'Weekly settlement completed from confirmed issued meal records. Payout values and fee line are reflected transparently.',
  generatedAt: settlement.periodEnd,
  status: settlement.status === 'paid' ? 'published' : 'generated',
}))

const monthlyTotals = WEEKLY_SETTLEMENTS.reduce(
  (acc, settlement) => {
    acc.confirmedMealsIssued += settlement.confirmedMeals
    acc.venuePayoutTotal += settlement.venuePayoutTotal
    acc.operationalFee += settlement.operationalFee
    return acc
  },
  {
    confirmedMealsIssued: 0,
    venuePayoutTotal: 0,
    operationalFee: 0,
  },
)

const monthlyStatement: FunderStatement = {
  id: 'stmt-2026-03',
  type: 'monthly',
  periodLabel: 'March 2026',
  fundsReceived: INITIAL_FUNDED_POOL,
  confirmedMealsIssued: monthlyTotals.confirmedMealsIssued,
  venuePayoutTotal: round2(monthlyTotals.venuePayoutTotal),
  operationalFee: round2(monthlyTotals.operationalFee),
  remainingBalance: currentBalance,
  activeVenues: 12,
  exceptionSummary: '6 exceptions logged (expired, duplicate, manual adjustment, and temporary venue interruptions).',
  narrativeSummary:
    'March operations stayed within funded pool. Weekly settlements were generated on confirmed issuance and routed to venues with a transparent fee line.',
  generatedAt: '2026-03-29',
  status: 'generated',
}

export const STATEMENTS: FunderStatement[] = [...weeklyStatements, monthlyStatement]

export const FUNDER_ACTIVITY: FunderActivityItem[] = [
  {
    id: 'fa-001',
    timestamp: '2026-03-01T09:00:00Z',
    kind: 'funding_received',
    title: 'Funding received',
    detail: 'Initial pool transfer recorded. Thai operating company marked as official recipient.',
  },
  {
    id: 'fa-002',
    timestamp: '2026-03-03T08:30:00Z',
    kind: 'venue_state',
    title: 'Venue status updated',
    detail: 'Cairo Manshiyat Kitchen 1 temporarily paused for supply rebalancing.',
  },
  {
    id: 'fa-003',
    timestamp: '2026-03-09T18:00:00Z',
    kind: 'settlement_generated',
    title: 'Weekly settlement generated',
    detail: 'Week 10 settlement generated from confirmed meal issuance records.',
  },
  {
    id: 'fa-004',
    timestamp: '2026-03-10T10:15:00Z',
    kind: 'payout_approved',
    title: 'Payout approved',
    detail: 'Week 10 payout approved and released to participating venues.',
  },
  {
    id: 'fa-005',
    timestamp: '2026-03-17T15:20:00Z',
    kind: 'claim_confirmed',
    title: 'Claims confirmed',
    detail: 'Batch confirmation processed for Lagos and Nairobi issuance claims.',
  },
  {
    id: 'fa-006',
    timestamp: '2026-03-20T12:10:00Z',
    kind: 'meal_issued',
    title: 'Meal issuance milestone',
    detail: 'Total confirmed issued meals crossed 12,000 in the current reporting month.',
  },
  {
    id: 'fa-007',
    timestamp: '2026-03-23T19:00:00Z',
    kind: 'settlement_generated',
    title: 'Weekly settlement generated',
    detail: 'Week 12 settlement generated and moved to reviewed status.',
  },
  {
    id: 'fa-008',
    timestamp: '2026-03-29T08:40:00Z',
    kind: 'statement_generated',
    title: 'Monthly statement generated',
    detail: 'March statement draft generated with payouts, fee line, and remaining balance.',
  },
]

export const EXCEPTIONS: FunderExceptionItem[] = [
  {
    id: 'ex-001',
    date: '2026-03-08',
    type: 'expired_claim',
    venueName: 'Manshiyat Naser Kitchen 1',
    cityZone: 'Cairo / Manshiyat Naser',
    detail: 'Claim window expired before confirmation during temporary venue pause.',
    impactAmount: 84.6,
  },
  {
    id: 'ex-002',
    date: '2026-03-12',
    type: 'rejected_claim',
    venueName: 'Ravi Flood Relief Unit',
    cityZone: 'Lahore / Ravi sector',
    detail: 'Duplicate photo evidence in a claim packet caused rejection and resubmission.',
    impactAmount: 51.2,
  },
  {
    id: 'ex-003',
    date: '2026-03-14',
    type: 'duplicate_attempt',
    venueName: 'Yaba Community Kitchen',
    cityZone: 'Lagos / Yaba',
    detail: 'Duplicate issuance attempt blocked by claim integrity checks.',
    impactAmount: 39.9,
  },
  {
    id: 'ex-004',
    date: '2026-03-16',
    type: 'venue_adjustment',
    venueName: 'Mushin Family Support Kitchen',
    cityZone: 'Lagos / Mushin',
    detail: 'Line adjusted for corrected meal count after verifier review.',
    impactAmount: -42,
  },
  {
    id: 'ex-005',
    date: '2026-03-18',
    type: 'venue_interruption',
    venueName: 'Manshiyat Naser Kitchen 1',
    cityZone: 'Cairo / Manshiyat Naser',
    detail: 'Short interruption due to gas refill cycle; payouts shifted to next window.',
    impactAmount: 73.4,
  },
  {
    id: 'ex-006',
    date: '2026-03-22',
    type: 'manual_adjustment',
    venueName: 'Manshiyat Naser Kitchen 2',
    cityZone: 'Cairo / Manshiyat Naser',
    detail: 'Manual positive adjustment applied after approved late verification batch.',
    impactAmount: 22,
  },
]

export const DOCUMENTS: FunderDocument[] = [
  {
    id: 'doc-program-terms',
    title: 'Program Terms',
    summary:
      'Defines funding intent, approved operating scope, reporting cadence, and responsibilities between funder and operating company.',
    updatedAt: '2026-03-20',
  },
  {
    id: 'doc-settlement-policy',
    title: 'Settlement Policy',
    summary:
      'Describes weekly settlement generation from confirmed issued meals, venue line calculation method, and payout approval workflow.',
    updatedAt: '2026-03-19',
  },
  {
    id: 'doc-reporting-policy',
    title: 'Reporting Policy',
    summary:
      'Sets statement schedule, transparency requirements, exception disclosures, and required narrative context for each reporting period.',
    updatedAt: '2026-03-18',
  },
  {
    id: 'doc-venue-rules',
    title: 'Venue Participation Rules',
    summary:
      'Specifies venue onboarding, service quality criteria, claim validation standards, and interruption handling expectations.',
    updatedAt: '2026-03-17',
  },
  {
    id: 'doc-data-privacy',
    title: 'Data & Privacy Policy',
    summary:
      'Outlines operational data handling, minimal personal data principles, access controls, and audit trace retention policy.',
    updatedAt: '2026-03-16',
  },
]

function buildVenueReportRows(): FunderVenueReportRow[] {
  const rows: Record<string, FunderVenueReportRow> = {}
  for (const venue of VENUES) {
    rows[venue.slug] = {
      venueSlug: venue.slug,
      venueName: venue.name,
      cityZone: `${venue.city} / ${venue.neighborhood}`,
      confirmedMeals: 0,
      grossAmount: 0,
      adjustments: 0,
      finalPayout: 0,
      state: VENUE_STATE[venue.slug] ?? 'active',
    }
  }

  for (const settlement of WEEKLY_SETTLEMENTS) {
    for (const line of settlement.lines) {
      const row = rows[line.venueSlug]
      if (!row) continue
      row.confirmedMeals += line.confirmedMeals
      row.grossAmount = round2(row.grossAmount + line.grossAmount)
      row.adjustments = round2(row.adjustments + line.adjustments)
      row.finalPayout = round2(row.finalPayout + line.finalPayout)
    }
  }

  return Object.values(rows).sort((a, b) => b.finalPayout - a.finalPayout)
}

export const VENUE_REPORT_ROWS: FunderVenueReportRow[] = buildVenueReportRows()

export function getSettlementById(id: string): WeeklySettlement | undefined {
  return WEEKLY_SETTLEMENTS.find((settlement) => settlement.id === id)
}

export function getStatementById(id: string): FunderStatement | undefined {
  return STATEMENTS.find((statement) => statement.id === id)
}

function localeForLang(lang: Lang): string {
  if (lang === 'ru') return 'ru-RU'
  if (lang === 'es') return 'es-ES'
  return 'en-US'
}

export function formatCurrency(amount: number, lang: Lang): string {
  return new Intl.NumberFormat(localeForLang(lang), {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatShortDate(date: string, lang: Lang): string {
  return new Intl.DateTimeFormat(localeForLang(lang), {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}

export function getFunderStatusLabel(status: SettlementStatus, lang: Lang): string {
  if (lang === 'ru') {
    if (status === 'draft') return '\u0447\u0435\u0440\u043d\u043e\u0432\u0438\u043a'
    if (status === 'reviewed') return '\u043f\u0440\u043e\u0432\u0435\u0440\u0435\u043d\u043e'
    if (status === 'approved') return '\u0443\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u043e'
    return '\u043e\u043f\u043b\u0430\u0447\u0435\u043d\u043e'
  }
  if (lang === 'es') {
    if (status === 'draft') return 'borrador'
    if (status === 'reviewed') return 'revisado'
    if (status === 'approved') return 'aprobado'
    return 'pagado'
  }
  return status
}

export function getFunderStatusColor(status: SettlementStatus): string {
  if (status === 'paid') return '#4ECAA0'
  if (status === 'approved') return '#7BA7F5'
  if (status === 'reviewed') return '#F5C542'
  return '#E8855A'
}

export function getFunderCopy(lang: Lang) {
  if (lang === 'ru') {
    return {
      cabinetTitle: '\u041a\u0430\u0431\u0438\u043d\u0435\u0442 \u043e\u0442\u0447\u0435\u0442\u043d\u043e\u0441\u0442\u0438 \u0444\u043e\u043d\u0434\u0430',
      cabinetSub:
        '\u041f\u0440\u043e\u0437\u0440\u0430\u0447\u043d\u044b\u0439 \u043e\u0431\u0437\u043e\u0440 \u0444\u0438\u043d\u0430\u043d\u0441\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u044f, \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u043d\u043e\u0439 \u0432\u044b\u0434\u0430\u0447\u0438 \u043f\u0438\u0442\u0430\u043d\u0438\u044f, \u0435\u0436\u0435\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u044b\u0445 \u0440\u0430\u0441\u0447\u0435\u0442\u043e\u0432 \u0438 \u043e\u0442\u0447\u0435\u0442\u043e\u0432.',
      navOverview: '\u041e\u0431\u0437\u043e\u0440',
      navSettlements: '\u0420\u0430\u0441\u0447\u0435\u0442\u044b',
      navStatements: '\u041e\u0442\u0447\u0435\u0442\u044b',
      navVenues: '\u0422\u043e\u0447\u043a\u0438',
      navActivity: '\u0410\u043a\u0442\u0438\u0432\u043d\u043e\u0441\u0442\u044c',
      navExceptions: '\u0418\u0441\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u044f',
      navDocuments: '\u0414\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u044b',
      modelTitle: '\u041c\u043e\u0434\u0435\u043b\u044c \u0444\u0438\u043d\u0430\u043d\u0441\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u044f',
      thaiRecipient:
        '\u041e\u0444\u0438\u0446\u0438\u0430\u043b\u044c\u043d\u044b\u0439 \u043f\u043e\u043b\u0443\u0447\u0430\u0442\u0435\u043b\u044c \u0441\u0440\u0435\u0434\u0441\u0442\u0432: \u0442\u0430\u0439\u0441\u043a\u0430\u044f \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u043e\u043d\u043d\u0430\u044f \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u044f.',
      operationalFeeLabel: '\u041e\u043f\u0435\u0440\u0430\u0446\u0438\u043e\u043d\u043d\u044b\u0439/\u043e\u0442\u0447\u0435\u0442\u043d\u044b\u0439 \u0441\u0431\u043e\u0440 (3%)',
    }
  }

  return {
    cabinetTitle: 'Funder Reporting Cabinet',
    cabinetSub:
      'Transparent visibility of funded pool, confirmed meal issuance, weekly settlements, and statement cycles.',
    navOverview: 'Overview',
    navSettlements: 'Settlements',
    navStatements: 'Statements',
    navVenues: 'Venues',
    navActivity: 'Activity',
    navExceptions: 'Exceptions',
    navDocuments: 'Documents',
    modelTitle: 'Funding model',
    thaiRecipient: 'Official recipient of funds: Thai operating company.',
    operationalFeeLabel: 'Operational/reporting fee (3%)',
  }
}

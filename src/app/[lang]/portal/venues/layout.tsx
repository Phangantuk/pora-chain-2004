import Link from 'next/link'
import { isValidLang, type Lang } from '@/lib/i18n'
import { formatCurrency } from '@/lib/portal/funder'
import { VENUE_SUMMARY } from '@/lib/portal/venues'

const VENUE_TABS = [
  { id: 'overview', path: '/portal/venues/overview' },
  { id: 'onboarding', path: '/portal/venues/onboarding' },
  { id: 'operations', path: '/portal/venues/operations' },
  { id: 'settlements', path: '/portal/venues/settlements' },
  { id: 'reporting', path: '/portal/venues/reporting' },
  { id: 'requirements', path: '/portal/venues/requirements' },
  { id: 'faq', path: '/portal/venues/faq' },
  { id: 'dashboard', path: '/portal/venues/dashboard' },
] as const

export default function VenueCabinetLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const lp = (path: string) => `/${lang}${path}`
  const compactRu = lang === 'ru'

  const x = {
    cabinetTitle: lang === 'ru' ? '\u041a\u0430\u0431\u0438\u043d\u0435\u0442 \u0438\u043d\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u0438 \u0442\u043e\u0447\u0435\u043a' : 'Venue Integration Cabinet',
    cabinetSub:
      lang === 'ru'
        ? '\u041f\u043e\u043d\u044f\u0442\u043d\u0430\u044f \u043c\u043e\u0434\u0435\u043b\u044c \u0432\u0445\u043e\u0434\u0430 \u0434\u043b\u044f \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u044e\u0449\u0438\u0445 \u043a\u0430\u0444\u0435, \u0440\u0435\u0441\u0442\u043e\u0440\u0430\u043d\u043e\u0432 \u0438 \u043a\u0443\u0445\u043e\u043d\u044c \u0432 \u0441\u0438\u0441\u0442\u0435\u043c\u0443 MEAL.'
        : 'Practical integration layer for existing cafes, restaurants, and meal points joining MEAL.',
    chain: lang === 'ru' ? '\u0414\u043e\u043d\u043e\u0440 -> \u0421\u0438\u0441\u0442\u0435\u043c\u0430 -> \u0422\u043e\u0447\u043a\u0430 -> \u041f\u043e\u043b\u0443\u0447\u0430\u0442\u0435\u043b\u044c' : 'Donor -> System -> Venue -> Recipient',
    activeVenues: lang === 'ru' ? '\u0410\u043a\u0442\u0438\u0432\u043d\u044b\u0435 \u0442\u043e\u0447\u043a\u0438' : 'Active venues',
    activeCities: lang === 'ru' ? '\u0410\u043a\u0442\u0438\u0432\u043d\u044b\u0435 \u0433\u043e\u0440\u043e\u0434\u0430' : 'Active cities',
    period: lang === 'ru' ? '\u041e\u0442\u0447\u0435\u0442\u043d\u044b\u0439 \u043f\u0435\u0440\u0438\u043e\u0434' : 'Reporting period',
    fee: lang === 'ru' ? '\u041e\u043f\u0435\u0440./\u043e\u0442\u0447\u0435\u0442. \u0441\u0431\u043e\u0440' : 'Operational/reporting fee',
    overview: lang === 'ru' ? '\u041e\u0431\u0437\u043e\u0440' : 'Overview',
    onboarding: lang === 'ru' ? '\u041e\u043d\u0431\u043e\u0440\u0434\u0438\u043d\u0433' : 'Onboarding',
    operations: lang === 'ru' ? '\u041e\u043f\u0435\u0440\u0430\u0446\u0438\u0438' : 'Operations',
    settlements: lang === 'ru' ? '\u0420\u0430\u0441\u0447\u0435\u0442\u044b' : 'Settlements',
    reporting: lang === 'ru' ? '\u041e\u0442\u0447\u0435\u0442\u043d\u043e\u0441\u0442\u044c' : 'Reporting',
    requirements: lang === 'ru' ? '\u0422\u0440\u0435\u0431\u043e\u0432\u0430\u043d\u0438\u044f' : 'Requirements',
    faq: 'FAQ',
    dashboard: lang === 'ru' ? '\u0414\u0430\u0448\u0431\u043e\u0440\u0434' : 'Dashboard',
  }

  const tabLabel = (id: (typeof VENUE_TABS)[number]['id']) => x[id]

  return (
    <div className="p-8">
      <div className="rounded-2xl border border-white/[0.07] bg-[#0C0C0E] overflow-hidden mb-6">
        <div className="px-6 py-5 border-b border-white/[0.06]">
          <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#E8855A] mb-2">PORA / Venue Integration</p>
          <h1 className="font-bold text-[26px] text-white mb-2">{x.cabinetTitle}</h1>
          <p className="text-[14px] text-white/45 max-w-3xl mb-2">{x.cabinetSub}</p>
          <p className="font-mono text-[11px] text-[#E8855A]/80">{x.chain}</p>
        </div>
        <div className="px-6 py-4 border-b border-white/[0.06] bg-white/[0.01] flex flex-wrap gap-2">
          {VENUE_TABS.map((tab) => (
            <Link
              key={tab.path}
              href={lp(tab.path)}
              className={`px-3 py-1.5 rounded-lg border border-white/[0.08] text-white/60 hover:text-white hover:border-white/[0.18] transition-colors ${compactRu ? 'text-[11px]' : 'text-[12px]'}`}
            >
              {tabLabel(tab.id)}
            </Link>
          ))}
        </div>
        <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-4 gap-3 text-[12px]">
          <StatCard label={x.activeVenues} value={String(VENUE_SUMMARY.activeVenues)} />
          <StatCard label={x.activeCities} value={String(VENUE_SUMMARY.activeCities)} />
          <StatCard label={x.period} value={VENUE_SUMMARY.currentPeriodLabel} />
          <StatCard
            label={x.fee}
            value={`${VENUE_SUMMARY.operationalFeePct}% \u00b7 ${formatCurrency(VENUE_SUMMARY.averageRatePerMeal, lang)}/meal`}
          />
        </div>
      </div>

      {children}
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.01] px-4 py-3 text-white/65">
      <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/25 block mb-1">{label}</span>
      <span className="font-mono text-[13px] text-white/85">{value}</span>
    </div>
  )
}

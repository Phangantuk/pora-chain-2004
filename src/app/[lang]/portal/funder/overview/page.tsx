import Link from 'next/link'
import { isValidLang, type Lang } from '@/lib/i18n'
import {
  FUNDING_MODEL,
  FUNDING_POOL,
  STATEMENTS,
  VENUE_REPORT_ROWS,
  WEEKLY_SETTLEMENTS,
  formatCurrency,
  formatShortDate,
  getFunderCopy,
} from '@/lib/portal/funder'

export default function FunderOverviewPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const c = getFunderCopy(lang)
  const lp = (path: string) => `/${lang}${path}`
  const compactRu = lang === 'ru'

  const totalMealsIssued = WEEKLY_SETTLEMENTS.reduce((sum, settlement) => sum + settlement.confirmedMeals, 0)
  const totalValueUsed = WEEKLY_SETTLEMENTS.reduce(
    (sum, settlement) => sum + settlement.venuePayoutTotal + settlement.operationalFee,
    0,
  )
  const avgMealValue = totalMealsIssued > 0 ? totalValueUsed / totalMealsIssued : 2.45
  const mealsFunded = Math.floor(FUNDING_POOL.totalFunded / avgMealValue)
  const activeVenues = VENUE_REPORT_ROWS.filter((venue) => venue.state === 'active').length
  const activeCityZones = new Set(VENUE_REPORT_ROWS.filter((venue) => venue.state === 'active').map((venue) => venue.cityZone)).size
  const currentPeriod = WEEKLY_SETTLEMENTS[WEEKLY_SETTLEMENTS.length - 1]
  const lastStatement = STATEMENTS[STATEMENTS.length - 1]

  const x = {
    totalFunded: lang === 'ru' ? '\u0412\u0441\u0435\u0433\u043e \u043f\u0440\u043e\u0444\u0438\u043d\u0430\u043d\u0441\u0438\u0440\u043e\u0432\u0430\u043d\u043e' : 'Total funded',
    availableBalance: lang === 'ru' ? '\u0414\u043e\u0441\u0442\u0443\u043f\u043d\u044b\u0439 \u043e\u0441\u0442\u0430\u0442\u043e\u043a' : 'Available balance',
    mealsFunded: lang === 'ru' ? '\u041f\u0440\u043e\u0444\u0438\u043d\u0430\u043d\u0441\u0438\u0440\u043e\u0432\u0430\u043d\u043e \u043f\u043e\u0440\u0446\u0438\u0439' : 'Meals funded',
    mealsIssued: lang === 'ru' ? '\u0412\u044b\u0434\u0430\u043d\u043e \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u043d\u043e' : 'Meals issued',
    activeVenues: lang === 'ru' ? '\u0410\u043a\u0442\u0438\u0432\u043d\u044b\u0435 \u0442\u043e\u0447\u043a\u0438' : 'Active venues',
    activeZones: lang === 'ru' ? '\u0410\u043a\u0442\u0438\u0432\u043d\u044b\u0435 \u0433\u043e\u0440\u043e\u0434\u0430/\u0437\u043e\u043d\u044b' : 'Active cities/zones',
    period: lang === 'ru' ? '\u0422\u0435\u043a\u0443\u0449\u0438\u0439 \u043e\u0442\u0447\u0435\u0442\u043d\u044b\u0439 \u043f\u0435\u0440\u0438\u043e\u0434' : 'Current reporting period',
    lastStatement: lang === 'ru' ? '\u041f\u043e\u0441\u043b\u0435\u0434\u043d\u044f\u044f \u0441\u0444\u043e\u0440\u043c\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u0430\u044f \u0432\u044b\u043f\u0438\u0441\u043a\u0430' : 'Last statement generated',
    opFee: c.operationalFeeLabel,
    openStatement: lang === 'ru' ? '\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u0432\u044b\u043f\u0438\u0441\u043a\u0443' : 'Open statement',
    openSettlements: lang === 'ru' ? '\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u0440\u0430\u0441\u0447\u0435\u0442\u044b' : 'Open settlements',
    explanation: lang === 'ru' ? '\u041f\u0440\u043e\u0437\u0440\u0430\u0447\u043d\u0430\u044f \u043c\u043e\u0434\u0435\u043b\u044c \u0444\u0438\u043d\u0430\u043d\u0441\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u044f' : 'Transparent funding model',
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: x.totalFunded, value: formatCurrency(FUNDING_POOL.totalFunded, lang), color: '#E8855A' },
          { label: x.availableBalance, value: formatCurrency(FUNDING_POOL.currentBalance, lang), color: '#4ECAA0' },
          { label: x.mealsFunded, value: mealsFunded.toLocaleString(), color: '#7BA7F5' },
          { label: x.mealsIssued, value: totalMealsIssued.toLocaleString(), color: '#F5C542' },
          { label: x.activeVenues, value: String(activeVenues), color: '#E8855A' },
          { label: x.activeZones, value: String(activeCityZones), color: '#4ECAA0' },
          { label: x.period, value: currentPeriod.weekLabel, color: '#7BA7F5' },
          { label: x.lastStatement, value: formatShortDate(lastStatement.generatedAt, lang), color: '#F5C542' },
        ].map((item) => (
          <div key={item.label} className="bg-[#0C0C0E] border border-white/[0.07] rounded-xl p-4">
            <p className={`font-mono uppercase text-white/25 mb-1.5 ${compactRu ? 'text-[9px] tracking-[0.07em]' : 'text-[10px] tracking-[0.1em]'}`}>
              {item.label}
            </p>
            <p className="font-mono text-[20px] font-semibold" style={{ color: item.color }}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_1fr] gap-4">
        <div className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl p-5">
          <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#E8855A] mb-3">{x.explanation}</p>
          <p className="text-[13px] text-white/65 leading-relaxed mb-2">{FUNDING_MODEL.fundsInAdvance}</p>
          <p className="text-[13px] text-white/65 leading-relaxed mb-2">{FUNDING_MODEL.operatingChain}</p>
          <p className="text-[13px] text-white/65 leading-relaxed mb-2">{FUNDING_MODEL.payoutModel}</p>
          <p className="text-[13px] text-white/65 leading-relaxed mb-2">{FUNDING_MODEL.feeModel}</p>
          <p className="text-[13px] text-white/65 leading-relaxed">{FUNDING_MODEL.balanceModel}</p>
          <div className="mt-4 rounded-xl border border-[#E8855A]/25 bg-[#E8855A]/[0.08] p-3 flex items-center justify-between gap-3">
            <p className="font-mono text-[11px] text-[#E8855A]">{x.opFee}</p>
            <p className="font-mono text-[14px] text-white">{FUNDING_POOL.operationalFeeRatePct}%</p>
          </div>
        </div>
        <div className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl p-5 flex flex-col gap-4">
          <div>
            <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/25 mb-2">{x.lastStatement}</p>
            <p className="text-[14px] font-semibold text-white/85">{lastStatement.periodLabel}</p>
            <p className="font-mono text-[11px] text-white/35">{formatShortDate(lastStatement.generatedAt, lang)}</p>
          </div>
          <Link href={lp(`/portal/funder/statements/${lastStatement.id}`)} className="inline-flex items-center justify-center rounded-xl bg-[#E8855A] text-[#0D0805] px-4 py-2.5 text-[13px] font-semibold hover:bg-[#f0966e] transition-colors">
            {x.openStatement}
          </Link>
          <Link href={lp('/portal/funder/settlements')} className="inline-flex items-center justify-center rounded-xl border border-white/[0.08] text-white/60 px-4 py-2.5 text-[13px] hover:text-white/85 hover:border-white/[0.18] transition-colors">
            {x.openSettlements}
          </Link>
        </div>
      </div>
    </div>
  )
}

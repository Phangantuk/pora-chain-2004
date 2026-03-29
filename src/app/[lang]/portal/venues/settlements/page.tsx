import { isValidLang, type Lang } from '@/lib/i18n'
import { formatCurrency, formatShortDate } from '@/lib/portal/funder'
import {
  VENUE_SETTLEMENT_PREVIEW,
  getVenueSettlementStatusColor,
  getVenueSettlementStatusLabel,
} from '@/lib/portal/venues'

export default function VenueSettlementsPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const compactRu = lang === 'ru'

  const x = {
    title: lang === 'ru' ? '\u0415\u0436\u0435\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u044b\u0435 \u0440\u0430\u0441\u0447\u0435\u0442\u044b \u0442\u043e\u0447\u043a\u0438' : 'Venue settlement preview',
    sub:
      lang === 'ru'
        ? '\u0421\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u0430 \u0440\u0430\u0441\u0447\u0435\u0442\u0430: \u043f\u043e\u0434\u0442\u0432. \u043f\u043e\u0440\u0446\u0438\u0438, \u0441\u0442\u0430\u0432\u043a\u0430, \u043a\u043e\u0440\u0440\u0435\u043a\u0442\u0438\u0440\u043e\u0432\u043a\u0438 \u0438 \u0438\u0442\u043e\u0433 \u043f\u043e \u043d\u0435\u0434\u0435\u043b\u0435.'
        : 'How weekly payout totals are formed: confirmed meals, rate per meal, adjustments, and final payout state.',
    week: lang === 'ru' ? '\u041d\u0435\u0434\u0435\u043b\u044f' : 'Week',
    period: lang === 'ru' ? '\u041f\u0435\u0440\u0438\u043e\u0434' : 'Period',
    meals: lang === 'ru' ? '\u041f\u043e\u0434\u0442\u0432. \u043f\u043e\u0440\u0446\u0438\u0438' : 'Confirmed meals',
    rate: lang === 'ru' ? '\u0421\u0442\u0430\u0432\u043a\u0430/\u043f\u043e\u0440\u0446\u0438\u044f' : 'Rate per meal',
    gross: lang === 'ru' ? '\u0412\u0430\u043b\u043e\u0432\u0430\u044f \u0441\u0443\u043c\u043c\u0430' : 'Gross amount',
    adjustments: lang === 'ru' ? '\u041a\u043e\u0440\u0440\u0435\u043a\u0442\u0438\u0440\u043e\u0432\u043a\u0438' : 'Adjustments',
    final: lang === 'ru' ? '\u0418\u0442\u043e\u0433\u043e\u0432\u0430\u044f \u0432\u044b\u043f\u043b\u0430\u0442\u0430' : 'Final payout',
    status: lang === 'ru' ? '\u0421\u0442\u0430\u0442\u0443\u0441' : 'Status',
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-bold text-[22px] text-white mb-2">{x.title}</h2>
        <p className="text-[13px] text-white/45">{x.sub}</p>
      </div>

      <div className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl overflow-hidden">
        <div className="grid grid-cols-[1fr_1fr_auto_auto_auto_auto_auto_auto] gap-3 px-5 py-3 border-b border-white/[0.05] bg-white/[0.02]">
          {[x.week, x.period, x.meals, x.rate, x.gross, x.adjustments, x.final, x.status].map((header) => (
            <span key={header} className={`font-mono uppercase text-white/25 ${compactRu ? 'text-[9px] tracking-[0.07em]' : 'text-[10px] tracking-[0.1em]'}`}>
              {header}
            </span>
          ))}
        </div>
        <div className="divide-y divide-white/[0.04]">
          {VENUE_SETTLEMENT_PREVIEW.map((row) => {
            const statusColor = getVenueSettlementStatusColor(row.status)
            return (
              <div key={row.id} className="grid grid-cols-[1fr_1fr_auto_auto_auto_auto_auto_auto] gap-3 px-5 py-3.5 items-center hover:bg-white/[0.015] transition-colors">
                <div>
                  <p className="text-[13px] text-white/80">{row.weekLabel}</p>
                  <p className="font-mono text-[10px] text-white/30">{row.id}</p>
                </div>
                <p className="font-mono text-[11px] text-white/35">
                  {formatShortDate(row.periodStart, lang)} - {formatShortDate(row.periodEnd, lang)}
                </p>
                <p className="font-mono text-[12px] text-white/75">{row.confirmedMeals.toLocaleString()}</p>
                <p className="font-mono text-[12px] text-white/70">{formatCurrency(row.ratePerMeal, lang)}</p>
                <p className="font-mono text-[12px] text-[#E8855A]">{formatCurrency(row.grossAmount, lang)}</p>
                <p className={`font-mono text-[12px] ${row.adjustments < 0 ? 'text-[#F5C542]' : 'text-[#4ECAA0]'}`}>{formatCurrency(row.adjustments, lang)}</p>
                <p className="font-mono text-[12px] text-[#7BA7F5]">{formatCurrency(row.finalPayout, lang)}</p>
                <span
                  className="justify-self-end font-mono text-[10px] px-2 py-0.5 rounded-md border"
                  style={{ color: statusColor, borderColor: `${statusColor}35`, background: `${statusColor}12` }}
                >
                  {getVenueSettlementStatusLabel(row.status, lang)}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

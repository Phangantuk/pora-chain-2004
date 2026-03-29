import Link from 'next/link'
import { isValidLang, type Lang } from '@/lib/i18n'
import {
  WEEKLY_SETTLEMENTS,
  formatCurrency,
  formatShortDate,
  getFunderStatusColor,
  getFunderStatusLabel,
} from '@/lib/portal/funder'

export default function FunderSettlementsPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const lp = (path: string) => `/${lang}${path}`
  const compactRu = lang === 'ru'

  const x = {
    title: lang === 'ru' ? '\u0415\u0436\u0435\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u044b\u0435 \u0440\u0430\u0441\u0447\u0435\u0442\u044b' : 'Weekly settlements',
    sub:
      lang === 'ru'
        ? '\u0420\u0430\u0441\u0447\u0435\u0442 \u0442\u043e\u0447\u0435\u043a \u043f\u043e \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u043d\u043e\u0439 \u0432\u044b\u0434\u0430\u0447\u0435 \u043f\u0438\u0442\u0430\u043d\u0438\u044f \u0441 \u043f\u0440\u043e\u0437\u0440\u0430\u0447\u043d\u043e\u0439 3% \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u043e\u043d\u043d\u043e-\u043e\u0442\u0447\u0435\u0442\u043d\u043e\u0439 \u0441\u0442\u0440\u043e\u043a\u043e\u0439.'
        : 'Venue settlement cycles based on confirmed issued meals with a transparent 3% operational/reporting line.',
    week: lang === 'ru' ? '\u041d\u0435\u0434\u0435\u043b\u044f' : 'Week',
    period: lang === 'ru' ? '\u041f\u0435\u0440\u0438\u043e\u0434' : 'Period',
    confirmedMeals: lang === 'ru' ? '\u041f\u043e\u0434\u0442\u0432. \u043f\u043e\u0440\u0446\u0438\u0438' : 'Confirmed meals',
    venuePayout: lang === 'ru' ? '\u0412\u044b\u043f\u043b\u0430\u0442\u044b \u0442\u043e\u0447\u043a\u0430\u043c' : 'Venue payout total',
    fee: lang === 'ru' ? '\u041e\u043f\u0435\u0440./\u043e\u0442\u0447\u0435\u0442. \u0441\u0431\u043e\u0440' : 'Operational/reporting fee',
    remaining: lang === 'ru' ? '\u041e\u0441\u0442\u0430\u0442\u043e\u043a' : 'Remaining balance',
    status: lang === 'ru' ? '\u0421\u0442\u0430\u0442\u0443\u0441' : 'Status',
    open: lang === 'ru' ? '\u041e\u0442\u043a\u0440\u044b\u0442\u044c' : 'Open detail',
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-bold text-[22px] text-white mb-2">{x.title}</h2>
        <p className="text-[13px] text-white/45">{x.sub}</p>
      </div>

      <div className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl overflow-hidden">
        <div className="grid grid-cols-[1.1fr_1fr_auto_auto_auto_auto_auto] gap-3 px-5 py-3 border-b border-white/[0.05] bg-white/[0.02]">
          {[x.week, x.period, x.confirmedMeals, x.venuePayout, x.fee, x.remaining, x.status].map((header) => (
            <span key={header} className={`font-mono uppercase text-white/25 ${compactRu ? 'text-[9px] tracking-[0.07em]' : 'text-[10px] tracking-[0.1em]'}`}>
              {header}
            </span>
          ))}
        </div>
        <div className="divide-y divide-white/[0.04]">
          {WEEKLY_SETTLEMENTS.map((settlement) => {
            const statusColor = getFunderStatusColor(settlement.status)
            return (
              <div key={settlement.id} className="grid grid-cols-[1.1fr_1fr_auto_auto_auto_auto_auto] gap-3 items-center px-5 py-4 hover:bg-white/[0.015] transition-colors">
                <div className="min-w-0">
                  <p className="text-[13px] text-white/80">{settlement.weekLabel}</p>
                  <p className="font-mono text-[10px] text-white/30">{settlement.id}</p>
                </div>
                <p className="font-mono text-[11px] text-white/35">
                  {formatShortDate(settlement.periodStart, lang)} - {formatShortDate(settlement.periodEnd, lang)}
                </p>
                <p className="font-mono text-[12px] text-white/75">{settlement.confirmedMeals.toLocaleString()}</p>
                <p className="font-mono text-[12px] text-[#E8855A]">{formatCurrency(settlement.venuePayoutTotal, lang)}</p>
                <p className="font-mono text-[12px] text-[#F5C542]">{formatCurrency(settlement.operationalFee, lang)}</p>
                <p className="font-mono text-[12px] text-[#4ECAA0]">{formatCurrency(settlement.remainingBalance, lang)}</p>
                <div className="flex items-center gap-2 justify-end">
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-md border" style={{ color: statusColor, borderColor: `${statusColor}35`, background: `${statusColor}12` }}>
                    {getFunderStatusLabel(settlement.status, lang)}
                  </span>
                  <Link href={lp(`/portal/funder/settlements/${settlement.id}`)} className="font-mono text-[10px] text-white/45 hover:text-[#E8855A] transition-colors">
                    {x.open}
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

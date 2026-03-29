import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isValidLang, type Lang } from '@/lib/i18n'
import {
  WEEKLY_SETTLEMENTS,
  formatCurrency,
  formatShortDate,
  getFunderStatusColor,
  getFunderStatusLabel,
  getSettlementById,
} from '@/lib/portal/funder'

export async function generateStaticParams() {
  return WEEKLY_SETTLEMENTS.map((settlement) => ({ id: settlement.id }))
}

export default function SettlementDetailPage({ params }: { params: { lang: string; id: string } }) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const settlement = getSettlementById(params.id)
  if (!settlement) notFound()

  const lp = (path: string) => `/${lang}${path}`
  const statusColor = getFunderStatusColor(settlement.status)
  const compactRu = lang === 'ru'
  const x = {
    back: lang === 'ru' ? '\u041a \u0440\u0430\u0441\u0447\u0435\u0442\u0430\u043c' : 'Back to settlements',
    reportingWeek: lang === 'ru' ? '\u041e\u0442\u0447\u0435\u0442\u043d\u0430\u044f \u043d\u0435\u0434\u0435\u043b\u044f' : 'Reporting week',
    confirmedMeals: lang === 'ru' ? '\u041f\u043e\u0434\u0442\u0432. \u043f\u043e\u0440\u0446\u0438\u0438' : 'Confirmed meals issued',
    venuePayout: lang === 'ru' ? '\u0412\u044b\u043f\u043b\u0430\u0442\u044b \u0442\u043e\u0447\u043a\u0430\u043c' : 'Venue payout amount',
    fee: lang === 'ru' ? '\u041e\u043f\u0435\u0440./\u043e\u0442\u0447\u0435\u0442. \u0441\u0431\u043e\u0440' : 'Operational/reporting fee',
    remaining: lang === 'ru' ? '\u041e\u0441\u0442\u0430\u0442\u043e\u043a \u043f\u0443\u043b\u0430' : 'Remaining balance',
    status: lang === 'ru' ? '\u0421\u0442\u0430\u0442\u0443\u0441' : 'Status',
    venue: lang === 'ru' ? '\u0422\u043e\u0447\u043a\u0430' : 'Venue',
    cityZone: lang === 'ru' ? '\u0413\u043e\u0440\u043e\u0434/\u0437\u043e\u043d\u0430' : 'City/zone',
    rate: lang === 'ru' ? '\u0421\u0442\u0430\u0432\u043a\u0430 \u0437\u0430 \u043f\u043e\u0440\u0446\u0438\u044e' : 'Rate per meal',
    gross: lang === 'ru' ? '\u0412\u0430\u043b\u043e\u0432\u0430\u044f \u0441\u0443\u043c\u043c\u0430' : 'Gross amount',
    adjustments: lang === 'ru' ? '\u041a\u043e\u0440\u0440\u0435\u043a\u0442\u0438\u0440\u043e\u0432\u043a\u0438' : 'Adjustments',
    finalPayout: lang === 'ru' ? '\u0418\u0442\u043e\u0433\u043e\u0432\u0430\u044f \u0432\u044b\u043f\u043b\u0430\u0442\u0430' : 'Final payout',
  }

  return (
    <div className="space-y-4">
      <Link href={lp('/portal/funder/settlements')} className="inline-flex items-center gap-2 font-mono text-[11px] text-white/35 hover:text-[#E8855A] transition-colors">
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
          <path d="M9 5.5H2.8m0 0 2.2-2.2M2.8 5.5l2.2 2.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {x.back}
      </Link>

      <div className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl p-5">
        <div className="flex items-start justify-between gap-3 mb-5">
          <div>
            <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#E8855A] mb-2">{x.reportingWeek}</p>
            <h2 className="text-[22px] font-bold text-white">{settlement.weekLabel}</h2>
            <p className="font-mono text-[11px] text-white/35">
              {formatShortDate(settlement.periodStart, lang)} - {formatShortDate(settlement.periodEnd, lang)}
            </p>
          </div>
          <span className="font-mono text-[10px] px-2.5 py-1 rounded-md border" style={{ color: statusColor, borderColor: `${statusColor}35`, background: `${statusColor}12` }}>
            {getFunderStatusLabel(settlement.status, lang)}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { label: x.confirmedMeals, value: settlement.confirmedMeals.toLocaleString(), color: '#7BA7F5' },
            { label: x.venuePayout, value: formatCurrency(settlement.venuePayoutTotal, lang), color: '#E8855A' },
            { label: x.fee, value: formatCurrency(settlement.operationalFee, lang), color: '#F5C542' },
            { label: x.remaining, value: formatCurrency(settlement.remainingBalance, lang), color: '#4ECAA0' },
            { label: x.status, value: getFunderStatusLabel(settlement.status, lang), color: statusColor },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-white/[0.07] bg-white/[0.01] px-3.5 py-3">
              <p className={`font-mono uppercase text-white/25 mb-1 ${compactRu ? 'text-[9px] tracking-[0.06em]' : 'text-[10px] tracking-[0.1em]'}`}>
                {item.label}
              </p>
              <p className="font-mono text-[14px] font-semibold" style={{ color: item.color }}>
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl overflow-hidden">
        <div className="grid grid-cols-[1.1fr_1fr_auto_auto_auto_auto_auto_auto] gap-3 px-5 py-3 border-b border-white/[0.05] bg-white/[0.02]">
          {[x.venue, x.cityZone, x.confirmedMeals, x.rate, x.gross, x.adjustments, x.finalPayout, x.status].map((header) => (
            <span key={header} className={`font-mono uppercase text-white/25 ${compactRu ? 'text-[9px] tracking-[0.06em]' : 'text-[10px] tracking-[0.1em]'}`}>
              {header}
            </span>
          ))}
        </div>
        <div className="divide-y divide-white/[0.04]">
          {settlement.lines.map((line) => {
            const lineStatusColor = getFunderStatusColor(line.status)
            return (
              <div key={`${settlement.id}-${line.venueSlug}`} className="grid grid-cols-[1.1fr_1fr_auto_auto_auto_auto_auto_auto] gap-3 items-center px-5 py-3.5 hover:bg-white/[0.015] transition-colors">
                <p className="text-[13px] text-white/80">{line.venueName}</p>
                <p className="font-mono text-[11px] text-white/35">{line.cityZone}</p>
                <p className="font-mono text-[12px] text-white/70">{line.confirmedMeals}</p>
                <p className="font-mono text-[12px] text-white/70">{formatCurrency(line.ratePerMeal, lang)}</p>
                <p className="font-mono text-[12px] text-white/70">{formatCurrency(line.grossAmount, lang)}</p>
                <p className={`font-mono text-[12px] ${line.adjustments < 0 ? 'text-[#F5C542]' : 'text-[#4ECAA0]'}`}>
                  {formatCurrency(line.adjustments, lang)}
                </p>
                <p className="font-mono text-[12px] text-[#E8855A]">{formatCurrency(line.finalPayout, lang)}</p>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded-md border justify-self-end" style={{ color: lineStatusColor, borderColor: `${lineStatusColor}35`, background: `${lineStatusColor}12` }}>
                  {getFunderStatusLabel(line.status, lang)}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

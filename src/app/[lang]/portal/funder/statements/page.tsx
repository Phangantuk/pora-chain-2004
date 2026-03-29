import Link from 'next/link'
import { isValidLang, type Lang } from '@/lib/i18n'
import { STATEMENTS, formatCurrency, formatShortDate } from '@/lib/portal/funder'

export default function FunderStatementsPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const lp = (path: string) => `/${lang}${path}`
  const x = {
    title: lang === 'ru' ? '\u0412\u044b\u043f\u0438\u0441\u043a\u0438' : 'Statements',
    sub:
      lang === 'ru'
        ? '\u0415\u0436\u0435\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u044b\u0435 \u0438 \u0435\u0436\u0435\u043c\u0435\u0441\u044f\u0447\u043d\u044b\u0435 \u043e\u0442\u0447\u0435\u0442\u043d\u044b\u0435 \u0431\u043b\u043e\u043a\u0438 \u043f\u043e \u0444\u0438\u043d\u0430\u043d\u0441\u0430\u043c, \u0432\u044b\u0434\u0430\u0447\u0435 \u043f\u0438\u0442\u0430\u043d\u0438\u044f \u0438 \u0440\u0430\u0441\u0447\u0435\u0442\u0430\u043c.'
        : 'Weekly and monthly reporting statements for funded flow, meal issuance, and settlement totals.',
    weekly: lang === 'ru' ? '\u0415\u0436\u0435\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0430\u044f' : 'Weekly',
    monthly: lang === 'ru' ? '\u0415\u0436\u0435\u043c\u0435\u0441\u044f\u0447\u043d\u0430\u044f' : 'Monthly',
    fundsReceived: lang === 'ru' ? '\u041f\u043e\u0441\u0442\u0443\u043f\u0438\u043b\u043e \u0441\u0440\u0435\u0434\u0441\u0442\u0432' : 'Funds received',
    mealsIssued: lang === 'ru' ? '\u041f\u043e\u0440\u0446\u0438\u0438 \u0432\u044b\u0434\u0430\u043d\u044b' : 'Confirmed meals issued',
    venuePayout: lang === 'ru' ? '\u0412\u044b\u043f\u043b\u0430\u0442\u044b \u0442\u043e\u0447\u043a\u0430\u043c' : 'Venue payout total',
    fee: lang === 'ru' ? '\u0421\u0431\u043e\u0440 3%' : '3% fee',
    remaining: lang === 'ru' ? '\u041e\u0441\u0442\u0430\u0442\u043e\u043a' : 'Remaining balance',
    open: lang === 'ru' ? '\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u0432\u044b\u043f\u0438\u0441\u043a\u0443' : 'Open statement',
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-bold text-[22px] text-white mb-2">{x.title}</h2>
        <p className="text-[13px] text-white/45">{x.sub}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {STATEMENTS.map((statement) => (
          <div key={statement.id} className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl p-5">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <p className="text-[15px] font-semibold text-white/85">{statement.periodLabel}</p>
                <p className="font-mono text-[11px] text-white/35">{formatShortDate(statement.generatedAt, lang)}</p>
              </div>
              <span
                className={`font-mono text-[10px] px-2 py-0.5 rounded-md border ${
                  statement.type === 'monthly'
                    ? 'text-[#E8855A] border-[#E8855A]/35 bg-[#E8855A]/12'
                    : 'text-[#4ECAA0] border-[#4ECAA0]/35 bg-[#4ECAA0]/12'
                }`}
              >
                {statement.type === 'monthly' ? x.monthly : x.weekly}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-5 gap-y-2 text-[12px] mb-4">
              <p className="text-white/45">{x.fundsReceived}: <span className="text-white/75 font-mono">{formatCurrency(statement.fundsReceived, lang)}</span></p>
              <p className="text-white/45">{x.mealsIssued}: <span className="text-white/75 font-mono">{statement.confirmedMealsIssued.toLocaleString()}</span></p>
              <p className="text-white/45">{x.venuePayout}: <span className="text-[#E8855A] font-mono">{formatCurrency(statement.venuePayoutTotal, lang)}</span></p>
              <p className="text-white/45">{x.fee}: <span className="text-[#F5C542] font-mono">{formatCurrency(statement.operationalFee, lang)}</span></p>
              <p className="text-white/45 col-span-2">{x.remaining}: <span className="text-[#4ECAA0] font-mono">{formatCurrency(statement.remainingBalance, lang)}</span></p>
            </div>
            <p className="text-[12px] text-white/38 leading-relaxed mb-4">{statement.narrativeSummary}</p>
            <Link href={lp(`/portal/funder/statements/${statement.id}`)} className="inline-flex items-center gap-2 text-[12px] font-mono text-[#E8855A]/70 hover:text-[#E8855A] transition-colors">
              {x.open}
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5h6M5.5 2.5 8 5 5.5 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

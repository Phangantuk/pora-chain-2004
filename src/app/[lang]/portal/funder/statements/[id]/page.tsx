import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isValidLang, type Lang } from '@/lib/i18n'
import {
  STATEMENTS,
  formatCurrency,
  formatShortDate,
  getStatementById,
} from '@/lib/portal/funder'

export async function generateStaticParams() {
  return STATEMENTS.map((statement) => ({ id: statement.id }))
}

export default function StatementDetailPage({ params }: { params: { lang: string; id: string } }) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const statement = getStatementById(params.id)
  if (!statement) notFound()

  const lp = (path: string) => `/${lang}${path}`
  const compactRu = lang === 'ru'
  const x = {
    back: lang === 'ru' ? '\u041a \u0432\u044b\u043f\u0438\u0441\u043a\u0430\u043c' : 'Back to statements',
    fundsReceived: lang === 'ru' ? '\u041f\u043e\u0441\u0442\u0443\u043f\u0438\u043b\u043e \u0441\u0440\u0435\u0434\u0441\u0442\u0432' : 'Funds received',
    mealsIssued: lang === 'ru' ? '\u041f\u043e\u0434\u0442\u0432. \u0432\u044b\u0434\u0430\u043d\u043d\u044b\u0435 \u043f\u043e\u0440\u0446\u0438\u0438' : 'Confirmed meals issued',
    venuePayout: lang === 'ru' ? '\u0412\u044b\u043f\u043b\u0430\u0442\u044b \u0442\u043e\u0447\u043a\u0430\u043c' : 'Venue payout total',
    fee: lang === 'ru' ? '\u041e\u043f\u0435\u0440./\u043e\u0442\u0447\u0435\u0442. \u0441\u0431\u043e\u0440 (3%)' : 'Operational/reporting fee (3%)',
    remaining: lang === 'ru' ? '\u041e\u0441\u0442\u0430\u0442\u043e\u043a \u0431\u0430\u043b\u0430\u043d\u0441\u0430' : 'Remaining balance',
    activeVenues: lang === 'ru' ? '\u0410\u043a\u0442\u0438\u0432\u043d\u044b\u0435 \u0442\u043e\u0447\u043a\u0438' : 'Active venues',
    exceptions: lang === 'ru' ? '\u0421\u0432\u043e\u0434\u043a\u0430 \u0438\u0441\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u0439' : 'Exception summary',
    narrative: lang === 'ru' ? '\u041d\u0430\u0440\u0440\u0430\u0442\u0438\u0432\u043d\u043e\u0435 \u0440\u0435\u0437\u044e\u043c\u0435' : 'Narrative summary',
    exportLabel: lang === 'ru' ? '\u042d\u043a\u0441\u043f\u043e\u0440\u0442 (MVP \u0437\u0430\u0433\u043b\u0443\u0448\u043a\u0430)' : 'Export (MVP placeholder)',
    weekly: lang === 'ru' ? '\u0415\u0436\u0435\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0430\u044f \u0432\u044b\u043f\u0438\u0441\u043a\u0430' : 'Weekly statement',
    monthly: lang === 'ru' ? '\u0415\u0436\u0435\u043c\u0435\u0441\u044f\u0447\u043d\u0430\u044f \u0432\u044b\u043f\u0438\u0441\u043a\u0430' : 'Monthly statement',
  }

  return (
    <div className="space-y-4">
      <Link href={lp('/portal/funder/statements')} className="inline-flex items-center gap-2 font-mono text-[11px] text-white/35 hover:text-[#E8855A] transition-colors">
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
          <path d="M9 5.5H2.8m0 0 2.2-2.2M2.8 5.5l2.2 2.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {x.back}
      </Link>

      <div className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#E8855A] mb-2">
              {statement.type === 'monthly' ? x.monthly : x.weekly}
            </p>
            <h2 className="font-bold text-[24px] text-white">{statement.periodLabel}</h2>
            <p className="font-mono text-[11px] text-white/35">{formatShortDate(statement.generatedAt, lang)}</p>
          </div>
          <button className="px-3 py-1.5 rounded-lg border border-white/[0.08] text-[12px] text-white/55 hover:text-white/85 hover:border-white/[0.18] transition-colors">
            {x.exportLabel}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          {[
            { label: x.fundsReceived, value: formatCurrency(statement.fundsReceived, lang), color: '#7BA7F5' },
            { label: x.mealsIssued, value: statement.confirmedMealsIssued.toLocaleString(), color: '#E8855A' },
            { label: x.venuePayout, value: formatCurrency(statement.venuePayoutTotal, lang), color: '#E8855A' },
            { label: x.fee, value: formatCurrency(statement.operationalFee, lang), color: '#F5C542' },
            { label: x.remaining, value: formatCurrency(statement.remainingBalance, lang), color: '#4ECAA0' },
            { label: x.activeVenues, value: String(statement.activeVenues), color: '#7BA7F5' },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-white/[0.07] bg-white/[0.01] px-4 py-3">
              <p className={`font-mono uppercase text-white/25 mb-1 ${compactRu ? 'text-[9px] tracking-[0.07em]' : 'text-[10px] tracking-[0.1em]'}`}>
                {item.label}
              </p>
              <p className="font-mono text-[15px] font-semibold" style={{ color: item.color }}>
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.01] p-4">
            <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/25 mb-2">{x.exceptions}</p>
            <p className="text-[13px] text-white/65 leading-relaxed">{statement.exceptionSummary}</p>
          </div>
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.01] p-4">
            <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/25 mb-2">{x.narrative}</p>
            <p className="text-[13px] text-white/65 leading-relaxed">{statement.narrativeSummary}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

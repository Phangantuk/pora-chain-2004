import { isValidLang, type Lang } from '@/lib/i18n'
import { FUNDER_ACTIVITY, formatShortDate } from '@/lib/portal/funder'

export default function FunderActivityPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const x = {
    title: lang === 'ru' ? '\u041f\u0440\u043e\u0437\u0440\u0430\u0447\u043d\u0430\u044f \u043b\u0435\u043d\u0442\u0430 \u0430\u043a\u0442\u0438\u0432\u043d\u043e\u0441\u0442\u0438' : 'Transparency activity feed',
    sub:
      lang === 'ru'
        ? '\u0421\u043f\u043e\u043a\u043e\u0439\u043d\u044b\u0439 \u0436\u0443\u0440\u043d\u0430\u043b \u043a\u043b\u044e\u0447\u0435\u0432\u044b\u0445 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439: \u0444\u0438\u043d\u0430\u043d\u0441\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435, \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u0438\u044f, \u0440\u0430\u0441\u0447\u0435\u0442\u044b \u0438 \u043e\u0442\u0447\u0435\u0442\u044b.'
        : 'Calm chain of key actions: funding, confirmations, settlements, approvals, and statements.',
  }

  const entries = [...FUNDER_ACTIVITY].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-bold text-[22px] text-white mb-2">{x.title}</h2>
        <p className="text-[13px] text-white/45">{x.sub}</p>
      </div>
      <div className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl overflow-hidden">
        <div className="divide-y divide-white/[0.04]">
          {entries.map((entry) => (
            <div key={entry.id} className="px-5 py-4 flex items-start gap-4">
              <div className="w-8 h-8 rounded-xl border border-white/[0.08] bg-white/[0.01] flex items-center justify-center shrink-0">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: kindColor(entry.kind) }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-3 mb-1">
                  <p className="text-[14px] text-white/85">{entry.title}</p>
                  <p className="font-mono text-[10px] text-white/30 shrink-0">{formatShortDate(entry.timestamp, lang)}</p>
                </div>
                <p className="text-[13px] text-white/45 leading-relaxed">{entry.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function kindColor(
  kind:
    | 'funding_received'
    | 'venue_state'
    | 'claim_confirmed'
    | 'meal_issued'
    | 'settlement_generated'
    | 'payout_approved'
    | 'statement_generated',
) {
  if (kind === 'funding_received') return '#7BA7F5'
  if (kind === 'venue_state') return '#F5C542'
  if (kind === 'claim_confirmed') return '#4ECAA0'
  if (kind === 'meal_issued') return '#E8855A'
  if (kind === 'settlement_generated') return '#E8855A'
  if (kind === 'payout_approved') return '#4ECAA0'
  return '#7BA7F5'
}

import { isValidLang, type Lang } from '@/lib/i18n'
import { EXCEPTIONS, formatCurrency, formatShortDate } from '@/lib/portal/funder'

export default function FunderExceptionsPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const compactRu = lang === 'ru'
  const x = {
    title: lang === 'ru' ? '\u0418\u0441\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u044f \u0438 \u0430\u0443\u0434\u0438\u0442' : 'Exceptions and audit view',
    sub:
      lang === 'ru'
        ? '\u0424\u0438\u043a\u0441\u0430\u0446\u0438\u044f \u043a\u0440\u0430\u0435\u0432\u044b\u0445 \u0441\u0438\u0442\u0443\u0430\u0446\u0438\u0439: \u0438\u0441\u0442\u0435\u043a\u0448\u0438\u0435, \u043e\u0442\u043a\u043b\u043e\u043d\u0435\u043d\u043d\u044b\u0435, \u0434\u0443\u0431\u043b\u0438, \u043a\u043e\u0440\u0440\u0435\u043a\u0442\u0438\u0440\u043e\u0432\u043a\u0438 \u0438 \u043f\u0430\u0443\u0437\u044b \u0442\u043e\u0447\u0435\u043a.'
        : 'Compact register of expired/rejected/duplicate claims, venue interruptions, and manual adjustments.',
    type: lang === 'ru' ? '\u0422\u0438\u043f' : 'Type',
    venue: lang === 'ru' ? '\u0422\u043e\u0447\u043a\u0430' : 'Venue',
    date: lang === 'ru' ? '\u0414\u0430\u0442\u0430' : 'Date',
    detail: lang === 'ru' ? '\u0414\u0435\u0442\u0430\u043b\u0438' : 'Detail',
    impact: lang === 'ru' ? '\u0421\u0443\u043c\u043c\u0430 \u0432\u043b\u0438\u044f\u043d\u0438\u044f' : 'Impact amount',
  }

  const typeMap: Record<string, string> = {
    expired_claim: lang === 'ru' ? '\u0418\u0441\u0442\u0435\u043a\u0448\u0430\u044f \u0437\u0430\u044f\u0432\u043a\u0430' : 'Expired claim',
    rejected_claim: lang === 'ru' ? '\u041e\u0442\u043a\u043b\u043e\u043d\u0435\u043d\u043d\u0430\u044f \u0437\u0430\u044f\u0432\u043a\u0430' : 'Rejected claim',
    duplicate_attempt: lang === 'ru' ? '\u0414\u0443\u0431\u043b\u0438\u043a\u0430\u0442/\u0431\u043b\u043e\u043a' : 'Duplicate/blocked attempt',
    venue_adjustment: lang === 'ru' ? '\u041a\u043e\u0440\u0440\u0435\u043a\u0442\u0438\u0440\u043e\u0432\u043a\u0430 \u0442\u043e\u0447\u043a\u0438' : 'Disputed/adjusted line',
    venue_interruption: lang === 'ru' ? '\u041f\u0430\u0443\u0437\u0430/\u043f\u0435\u0440\u0435\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u0435 \u0442\u043e\u0447\u043a\u0438' : 'Paused/full interruption',
    manual_adjustment: lang === 'ru' ? '\u0420\u0443\u0447\u043d\u0430\u044f \u043a\u043e\u0440\u0440\u0435\u043a\u0442\u0438\u0440\u043e\u0432\u043a\u0430' : 'Manual adjustment',
  }

  const counts = Object.entries(typeMap).map(([key, label]) => ({
    key,
    label,
    count: EXCEPTIONS.filter((item) => item.type === key).length,
  }))

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-bold text-[22px] text-white mb-2">{x.title}</h2>
        <p className="text-[13px] text-white/45">{x.sub}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {counts.map((item) => (
          <div key={item.key} className="bg-[#0C0C0E] border border-white/[0.07] rounded-xl px-4 py-3">
            <p className={`font-mono uppercase text-white/25 mb-1 ${compactRu ? 'text-[9px] tracking-[0.06em]' : 'text-[10px] tracking-[0.1em]'}`}>
              {item.label}
            </p>
            <p className="font-mono text-[18px] text-[#E8855A]">{item.count}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_1fr_1.5fr_auto] gap-3 px-5 py-3 border-b border-white/[0.05] bg-white/[0.02]">
          {[x.date, x.type, x.venue, x.detail, x.impact].map((header) => (
            <span key={header} className={`font-mono uppercase text-white/25 ${compactRu ? 'text-[9px] tracking-[0.06em]' : 'text-[10px] tracking-[0.1em]'}`}>
              {header}
            </span>
          ))}
        </div>
        <div className="divide-y divide-white/[0.04]">
          {EXCEPTIONS.map((item) => (
            <div key={item.id} className="grid grid-cols-[auto_1fr_1fr_1.5fr_auto] gap-3 items-center px-5 py-3.5 hover:bg-white/[0.015] transition-colors">
              <p className="font-mono text-[11px] text-white/35">{formatShortDate(item.date, lang)}</p>
              <p className="text-[12px] text-white/72">{typeMap[item.type]}</p>
              <div>
                <p className="text-[12px] text-white/78">{item.venueName}</p>
                <p className="font-mono text-[10px] text-white/30">{item.cityZone}</p>
              </div>
              <p className="text-[12px] text-white/45 leading-relaxed">{item.detail}</p>
              <p className={`font-mono text-[12px] ${item.impactAmount < 0 ? 'text-[#F5C542]' : 'text-[#E8855A]'}`}>
                {formatCurrency(item.impactAmount, lang)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

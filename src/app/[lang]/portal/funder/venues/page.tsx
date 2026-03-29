import { isValidLang, type Lang } from '@/lib/i18n'
import {
  VENUE_REPORT_ROWS,
  formatCurrency,
} from '@/lib/portal/funder'

export default function FunderVenuesPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const compactRu = lang === 'ru'
  const x = {
    title: lang === 'ru' ? '\u0422\u043e\u0447\u043a\u0438 \u0438 \u0432\u044b\u043f\u043b\u0430\u0442\u043d\u043e\u0439 \u043a\u043e\u043d\u0442\u0443\u0440' : 'Venues and payout view',
    sub:
      lang === 'ru'
        ? '\u0410\u0433\u0440\u0435\u0433\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0439 \u0432\u0438\u0434 \u043f\u043e \u0442\u043e\u0447\u043a\u0430\u043c: \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u043d\u044b\u0435 \u043f\u043e\u0440\u0446\u0438\u0438, \u043a\u043e\u0440\u0440\u0435\u043a\u0442\u0438\u0440\u043e\u0432\u043a\u0438 \u0438 \u0438\u0442\u043e\u0433\u043e\u0432\u044b\u0435 \u0432\u044b\u043f\u043b\u0430\u0442\u044b.'
        : 'Aggregated venue view: confirmed meals, adjustments, and final payout totals.',
    venue: lang === 'ru' ? '\u0422\u043e\u0447\u043a\u0430' : 'Venue',
    cityZone: lang === 'ru' ? '\u0413\u043e\u0440\u043e\u0434/\u0437\u043e\u043d\u0430' : 'City/zone',
    meals: lang === 'ru' ? '\u041f\u043e\u0434\u0442\u0432. \u043f\u043e\u0440\u0446\u0438\u0438' : 'Confirmed meals',
    gross: lang === 'ru' ? '\u0412\u0430\u043b\u043e\u0432\u0430\u044f \u0441\u0443\u043c\u043c\u0430' : 'Gross amount',
    adjustments: lang === 'ru' ? '\u041a\u043e\u0440\u0440\u0435\u043a\u0442\u0438\u0440\u043e\u0432\u043a\u0438' : 'Adjustments',
    finalPayout: lang === 'ru' ? '\u0418\u0442\u043e\u0433\u043e\u0432\u0430\u044f \u0432\u044b\u043f\u043b\u0430\u0442\u0430' : 'Final payout',
    state: lang === 'ru' ? '\u0421\u043e\u0441\u0442\u043e\u044f\u043d\u0438\u0435' : 'State',
    active: lang === 'ru' ? '\u0430\u043a\u0442\u0438\u0432\u043d\u0430' : 'active',
    paused: lang === 'ru' ? '\u043f\u0430\u0443\u0437\u0430' : 'paused',
    full: lang === 'ru' ? '\u0437\u0430\u043f\u043e\u043b\u043d\u0435\u043d\u0430' : 'full',
  }

  const stateColor: Record<'active' | 'paused' | 'full', string> = {
    active: '#4ECAA0',
    paused: '#F5C542',
    full: '#7BA7F5',
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-bold text-[22px] text-white mb-2">{x.title}</h2>
        <p className="text-[13px] text-white/45">{x.sub}</p>
      </div>

      <div className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl overflow-hidden">
        <div className="grid grid-cols-[1.1fr_1fr_auto_auto_auto_auto_auto] gap-3 px-5 py-3 border-b border-white/[0.05] bg-white/[0.02]">
          {[x.venue, x.cityZone, x.meals, x.gross, x.adjustments, x.finalPayout, x.state].map((header) => (
            <span key={header} className={`font-mono uppercase text-white/25 ${compactRu ? 'text-[9px] tracking-[0.07em]' : 'text-[10px] tracking-[0.1em]'}`}>
              {header}
            </span>
          ))}
        </div>
        <div className="divide-y divide-white/[0.04]">
          {VENUE_REPORT_ROWS.map((row) => {
            const color = stateColor[row.state]
            const stateLabel = row.state === 'active' ? x.active : row.state === 'paused' ? x.paused : x.full
            return (
              <div key={row.venueSlug} className="grid grid-cols-[1.1fr_1fr_auto_auto_auto_auto_auto] gap-3 items-center px-5 py-3.5 hover:bg-white/[0.015] transition-colors">
                <p className="text-[13px] text-white/80">{row.venueName}</p>
                <p className="font-mono text-[11px] text-white/35">{row.cityZone}</p>
                <p className="font-mono text-[12px] text-white/70">{row.confirmedMeals.toLocaleString()}</p>
                <p className="font-mono text-[12px] text-white/70">{formatCurrency(row.grossAmount, lang)}</p>
                <p className={`font-mono text-[12px] ${row.adjustments < 0 ? 'text-[#F5C542]' : 'text-[#4ECAA0]'}`}>{formatCurrency(row.adjustments, lang)}</p>
                <p className="font-mono text-[12px] text-[#E8855A]">{formatCurrency(row.finalPayout, lang)}</p>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded-md border justify-self-end" style={{ color, borderColor: `${color}35`, background: `${color}12` }}>
                  {stateLabel}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

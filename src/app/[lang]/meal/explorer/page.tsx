import Link from 'next/link'
import { getT, isValidLang, type Lang } from '@/lib/i18n'
import { getExtraT } from '@/lib/i18n/extra'
import { MOCK_DONATIONS, MOCK_EVENTS, REGIONS, formatUsd, formatDate, timeAgo } from '@/lib/meal/data'
import { MealNav } from '@/components/meal/MealNav'

export default function MealExplorerPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? params.lang as Lang : 'en'
  const t = getT(lang)
  const xt = getExtraT(lang)
  const m = t.meal
  const lp = (p: string) => `/${lang}${p}`

  const totalDonations = MOCK_DONATIONS.reduce((s, d) => s + d.amountUsd, 0)
  const totalMeals     = MOCK_EVENTS.filter(e => e.verified).reduce((s, e) => s + e.mealsCount, 0)
  const verifiedEvents = MOCK_EVENTS.filter(e => e.verified).length

  const STATUS_COLOR: Record<string, string> = {
    confirmed:  '#4ECAA0',
    pending:    '#F5C542',
    processing: '#7BA7F5',
  }

  return (
    <div className="bg-[#070707] text-white min-h-screen">
      <MealNav lang={lang} />

      {/* Header */}
      <section className="relative border-b border-white/[0.06] px-6 pt-16 pb-12 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(78,202,160,0.05), transparent 65%)' }} />
        <div className="relative max-w-5xl mx-auto">
          <Link href={lp('/meal')} className="font-mono text-[11px] text-white/25 hover:text-[#E8855A] transition-colors mb-5 block">
            {m.backToMeal}
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#4ECAA0]/25 bg-[#4ECAA0]/10 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ECAA0]" />
            <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#4ECAA0]">
              {m.demoNote}
            </span>
          </div>
          <h1 className="font-bold text-[clamp(28px,4vw,44px)] tracking-tight text-white mb-2">{m.explTitle}</h1>
          <p className="text-[15px] text-white/40 font-light">{m.explSub}</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col gap-12">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { n: formatUsd(totalDonations),       label: m.explTotalDonations, color: '#E8855A' },
            { n: String(REGIONS.length),           label: m.explTotalRegions,   color: '#4ECAA0' },
            { n: String(verifiedEvents),           label: m.explTotalEvents,    color: '#7BA7F5' },
            { n: totalMeals.toLocaleString(),      label: m.explTotalMeals,     color: '#F5C542' },
          ].map(({ n, label, color }) => (
            <div key={label} className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl p-5 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: `linear-gradient(to right, transparent, ${color}40, transparent)` }} />
              <p className="font-mono text-[26px] font-semibold mb-1.5" style={{ color }}>{n}</p>
              <p className="font-mono text-[10px] tracking-[0.1em] uppercase text-white/25">{label}</p>
            </div>
          ))}
        </div>

        {/* Recent donations */}
        <div>
          <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-white/25 mb-5">{m.explRecentDonations}</p>
          <div className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl overflow-hidden">
            <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-5 py-3 border-b border-white/[0.05] bg-white/[0.02]">
              {[m.colRegion, m.colAmount, xt.meal.currencyCol, m.colDate, m.colStatus].map(col => (
                <span key={col} className="font-mono text-[10px] tracking-[0.1em] uppercase text-white/25">{col}</span>
              ))}
            </div>
            <div className="divide-y divide-white/[0.04]">
              {MOCK_DONATIONS.map(d => {
                const color = STATUS_COLOR[d.status] ?? '#ffffff'
                return (
                  <div key={d.id} className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_auto_auto_auto] gap-4 items-center px-5 py-4 hover:bg-white/[0.015] transition-colors">
                    <div>
                      <p className="text-[13px] text-white/80">{d.regionName}</p>
                      {d.txHash && <p className="font-mono text-[10px] text-white/25">{d.txHash}</p>}
                    </div>
                    <p className="font-mono text-[14px] font-semibold text-[#E8855A]">{formatUsd(d.amountUsd)}</p>
                    <p className="font-mono text-[12px] text-white/40 hidden sm:block">{d.currency}</p>
                    <p className="font-mono text-[11px] text-white/30 hidden sm:block">{formatDate(d.date, lang)}</p>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-md border hidden sm:inline-flex"
                      style={{ color, borderColor: `${color}25`, background: `${color}10` }}>
                      {d.status === 'confirmed' ? m.statusConfirmed : d.status === 'pending' ? m.statusPending : m.statusProcessing}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Recent events */}
        <div>
          <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-white/25 mb-5">{m.explRecentEvents}</p>
          <div className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl overflow-hidden">
            <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-3 border-b border-white/[0.05] bg-white/[0.02]">
              {[m.colRegion, m.colMeals, m.colVerified, m.colDate].map(col => (
                <span key={col} className="font-mono text-[10px] tracking-[0.1em] uppercase text-white/25">{col}</span>
              ))}
            </div>
            <div className="divide-y divide-white/[0.04]">
              {MOCK_EVENTS.map(ev => (
                <div key={ev.id} className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_auto_auto] gap-4 items-center px-5 py-4 hover:bg-white/[0.015] transition-colors">
                  <div>
                    <p className="text-[13px] text-white/80">{ev.regionName}</p>
                    <p className="text-[12px] text-white/35 font-light">{ev.description}</p>
                  </div>
                  <p className="font-mono text-[13px] text-white/70 inline-flex items-center gap-1.5"><MealGlyph />{ev.mealsCount}</p>
                  <span className={`font-mono text-[10px] px-2 py-0.5 rounded-md border hidden sm:inline-flex ${ev.verified ? 'text-[#4ECAA0] border-[#4ECAA0]/25 bg-[#4ECAA0]/10' : 'text-white/30 border-white/[0.07] bg-white/[0.03]'}`}>
                    {ev.verified ? m.verifiedLabel : m.pendingLabel}
                  </span>
                  <p className="font-mono text-[11px] text-white/25 hidden sm:block">{timeAgo(ev.date, lang)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Link to PORA explorer */}
        <div className="text-center bg-[#0C0C0E] border border-white/[0.06] rounded-2xl px-8 py-6">
          <p className="text-[13px] text-white/30 mb-3 font-light">{m.protocolNote}</p>
          <Link href={lp('/explorer')} className="inline-flex items-center gap-2 font-mono text-[12px] text-[#E8855A]/60 hover:text-[#E8855A] transition-colors">
            <span>{xt.meal.openPoraExplorer}</span>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
              <path d="M2 5.5h7M6 2.5l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

function MealGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M2.6 3.2v7.6M5 3.2v7.6M9 3.2c0 1 .8 1.8 1.8 1.8.3 0 .6-.1.8-.2v6M11.6 3.2v1.4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

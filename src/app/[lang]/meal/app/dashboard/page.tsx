import Link from 'next/link'
import { getT, isValidLang, type Lang } from '@/lib/i18n'
import { MOCK_USER_SUMMARY, MOCK_USER_DONATIONS, MOCK_EVENTS, formatUsd, formatDate, timeAgo } from '@/lib/meal/data'

export default function DashboardPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? params.lang as Lang : 'en'
  const t = getT(lang)
  const m = t.meal
  const lp = (p: string) => `/${lang}${p}`
  const s  = MOCK_USER_SUMMARY
  const recentEvents = MOCK_EVENTS.filter(e => e.verified).slice(0, 4)

  return (
    <div className="px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-bold text-[24px] text-white">{m.dashTitle}</h1>
          <p className="font-mono text-[11px] text-white/25 mt-0.5">{m.demoUser}</p>
        </div>
        <Link href={lp('/meal/donate')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E8855A] text-[#0D0805] font-semibold text-[13px] hover:bg-[#f0966e] transition-all duration-200">
          + {m.ctaDonate}
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { n: formatUsd(s.totalUsd),           label: m.dashTotalDonated, color: '#E8855A' },
          { n: String(s.regionsSupported),       label: m.dashRegions,      color: '#4ECAA0' },
          { n: s.mealsImpacted.toLocaleString(), label: m.dashMeals,        color: '#7BA7F5' },
          { n: String(s.donationCount),          label: m.dashDonations,    color: '#F5C542' },
        ].map(({ n, label, color }) => (
          <div key={label} className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[1px]"
              style={{ background: `linear-gradient(to right, ${color}30, transparent)` }} />
            <p className="font-mono text-[24px] font-semibold mb-1" style={{ color }}>{n}</p>
            <p className="font-mono text-[10px] tracking-[0.1em] uppercase text-white/25">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent donations */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/25">{m.dashRecentDonations}</p>
            <Link href={lp('/meal/app/donations')} className="font-mono text-[11px] text-white/25 hover:text-[#E8855A] transition-colors">
              {m.explRecentDonations.replace(' donations','').replace(' пожертвований','').replace(' donaciones','')} →
            </Link>
          </div>
          <div className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl divide-y divide-white/[0.04] overflow-hidden">
            {MOCK_USER_DONATIONS.map(d => (
              <div key={d.id} className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="text-[13px] text-white/80">{d.regionName}</p>
                  <p className="font-mono text-[10px] text-white/25">{formatDate(d.date)}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[14px] text-[#E8855A] font-semibold">{formatUsd(d.amountUsd)}</p>
                  <span className={`font-mono text-[10px] ${d.status === 'confirmed' ? 'text-[#4ECAA0]' : 'text-[#F5C542]'}`}>
                    {d.status === 'confirmed' ? m.statusConfirmed : m.statusPending}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact events */}
        <div>
          <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/25 mb-4">{m.dashImpactEvents}</p>
          <div className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl divide-y divide-white/[0.04] overflow-hidden">
            {recentEvents.map(ev => (
              <div key={ev.id} className="px-5 py-4">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <p className="text-[13px] text-white/75 leading-snug">{ev.description}</p>
                  <span className="font-mono text-[11px] text-[#4ECAA0] shrink-0">{m.verifiedLabel}</span>
                </div>
                <div className="flex items-center gap-3 font-mono text-[11px] text-white/25">
                  <span>{ev.regionName}</span>
                  <span>·</span>
                  <span>🍽 {ev.mealsCount} {m.meals.toLowerCase()}</span>
                  <span>·</span>
                  <span>{timeAgo(ev.date)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

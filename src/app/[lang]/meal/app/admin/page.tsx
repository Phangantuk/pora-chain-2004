import { getT, isValidLang, type Lang } from '@/lib/i18n'
import { REGIONS, MOCK_DONATIONS, MOCK_EVENTS, formatUsd, formatDate, getProgressPct, timeAgo } from '@/lib/meal/data'

export default function AdminPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? params.lang as Lang : 'en'
  const t = getT(lang)
  const m = t.meal

  const totalRaised  = MOCK_DONATIONS.reduce((s, d) => s + d.amountUsd, 0)
  const totalMeals   = MOCK_EVENTS.filter(e => e.verified).reduce((s, e) => s + e.mealsCount, 0)
  const pendingEvents= MOCK_EVENTS.filter(e => !e.verified).length

  const STATUS_COLORS: Record<string, string> = {
    urgent: '#F5C542', active: '#4ECAA0', funded: '#7BA7F5',
  }

  return (
    <div className="px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-bold text-[22px] text-white">{m.adminTitle}</h1>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#4ECAA0] animate-pulse" />
          <span className="font-mono text-[11px] text-[#4ECAA0]">Live</span>
        </div>
      </div>
      <p className="font-mono text-[11px] text-white/20 mb-8">Frontend demo — mock data only</p>

      {/* Global stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {[
          { n: formatUsd(totalRaised),       label: 'Total raised',      color: '#E8855A' },
          { n: String(REGIONS.length),       label: 'Regions',           color: '#4ECAA0' },
          { n: totalMeals.toLocaleString(),  label: 'Meals verified',    color: '#7BA7F5' },
          { n: String(pendingEvents),        label: 'Pending validation', color: '#F5C542' },
        ].map(({ n, label, color }) => (
          <div key={label} className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(to right, ${color}30, transparent)` }} />
            <p className="font-mono text-[22px] font-semibold mb-1" style={{ color }}>{n}</p>
            <p className="font-mono text-[10px] tracking-[0.1em] uppercase text-white/25">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Regions table */}
        <div>
          <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/25 mb-4">{m.adminRegionsList}</p>
          <div className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl overflow-hidden">
            <div className="grid grid-cols-[1fr_auto_auto] gap-3 px-5 py-3 border-b border-white/[0.05] bg-white/[0.02]">
              <span className="font-mono text-[10px] uppercase tracking-wide text-white/25">Region</span>
              <span className="font-mono text-[10px] uppercase tracking-wide text-white/25">Progress</span>
              <span className="font-mono text-[10px] uppercase tracking-wide text-white/25">Status</span>
            </div>
            <div className="divide-y divide-white/[0.04]">
              {REGIONS.map(r => {
                const pct   = getProgressPct(r)
                const color = STATUS_COLORS[r.status]
                return (
                  <div key={r.slug} className="grid grid-cols-[1fr_auto_auto] gap-3 items-center px-5 py-3.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[16px] shrink-0">{r.emoji}</span>
                      <div className="min-w-0">
                        <p className="text-[12px] font-semibold text-white/80 truncate">{r.name}</p>
                        <p className="font-mono text-[10px] text-white/25">{formatUsd(r.raisedUsd)} / {formatUsd(r.goalUsd)}</p>
                      </div>
                    </div>
                    <div className="w-20">
                      <div className="h-1 bg-white/[0.05] rounded-full overflow-hidden mb-0.5">
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color, opacity: 0.8 }} />
                      </div>
                      <p className="font-mono text-[9px] text-white/25 text-right">{pct}%</p>
                    </div>
                    <span className="font-mono text-[9px] px-1.5 py-0.5 rounded border"
                      style={{ color, borderColor: `${color}30`, background: `${color}10` }}>
                      {r.status}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* Recent events */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/25 mb-4">{m.adminRecentEvents}</p>
            <div className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl divide-y divide-white/[0.04] overflow-hidden">
              {MOCK_EVENTS.slice(0, 5).map(ev => (
                <div key={ev.id} className="px-5 py-3.5 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[12px] text-white/75 truncate">{ev.regionName}</p>
                    <p className="font-mono text-[10px] text-white/25">🍽 {ev.mealsCount} meals · {timeAgo(ev.date)}</p>
                  </div>
                  <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded border shrink-0 ${ev.verified ? 'text-[#4ECAA0] border-[#4ECAA0]/25 bg-[#4ECAA0]/10' : 'text-[#F5C542] border-[#F5C542]/25 bg-[#F5C542]/10'}`}>
                    {ev.verified ? 'verified' : 'pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Donation summary */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/25 mb-4">{m.adminDonationSummary}</p>
            <div className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl divide-y divide-white/[0.04] overflow-hidden">
              {MOCK_DONATIONS.slice(0, 5).map(d => (
                <div key={d.id} className="px-5 py-3.5 flex items-center justify-between">
                  <div>
                    <p className="text-[12px] text-white/75">{d.donor ?? 'Anonymous'}</p>
                    <p className="font-mono text-[10px] text-white/25">{d.regionName} · {formatDate(d.date)}</p>
                  </div>
                  <p className="font-mono text-[13px] font-semibold text-[#E8855A]">{formatUsd(d.amountUsd)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { getT, isValidLang, type Lang } from '@/lib/i18n'
import { REGIONS, MOCK_DONATIONS, MOCK_EVENTS, formatUsd, formatDate, getProgressPct, timeAgo } from '@/lib/meal/data'

function MealGlyph() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2.3 2.6v6.8M4.4 2.6v6.8M7.6 2.6c0 .9.7 1.5 1.5 1.5.2 0 .5-.1.7-.2v5.5M9.8 2.6v1.2" stroke="currentColor" strokeWidth="1.05" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DotSeparator() {
  return <span className="w-1 h-1 rounded-full bg-white/25 shrink-0" aria-hidden />
}

export default function AdminPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const t = getT(lang)
  const m = t.meal
  const compactRu = lang === 'ru'

  const x = {
    live: lang === 'ru' ? 'В реальном времени' : lang === 'es' ? 'En vivo' : 'Live',
    demo: lang === 'ru' ? 'Фронтенд демо, только mock-данные' : lang === 'es' ? 'Demo frontend, solo datos simulados' : 'Frontend demo, mock data only',
    totalRaised: lang === 'ru' ? 'Всего собрано' : lang === 'es' ? 'Total recaudado' : 'Total raised',
    regions: lang === 'ru' ? 'Регионы' : lang === 'es' ? 'Regiones' : 'Regions',
    mealsVerified: lang === 'ru' ? 'Проверено приемов пищи' : lang === 'es' ? 'Comidas verificadas' : 'Meals verified',
    pendingValidation: lang === 'ru' ? 'Ожидают проверки' : lang === 'es' ? 'Pendientes de validación' : 'Pending validation',
    region: lang === 'ru' ? 'Регион' : lang === 'es' ? 'Región' : 'Region',
    progress: lang === 'ru' ? 'Прогресс' : lang === 'es' ? 'Progreso' : 'Progress',
    status: lang === 'ru' ? 'Статус' : lang === 'es' ? 'Estado' : 'Status',
    verified: lang === 'ru' ? 'проверено' : lang === 'es' ? 'verificado' : 'verified',
    pending: lang === 'ru' ? 'ожидает' : lang === 'es' ? 'pendiente' : 'pending',
    anonymous: lang === 'ru' ? 'Анонимно' : lang === 'es' ? 'Anónimo' : 'Anonymous',
  }

  const totalRaised = MOCK_DONATIONS.reduce((s, d) => s + d.amountUsd, 0)
  const totalMeals = MOCK_EVENTS.filter((e) => e.verified).reduce((s, e) => s + e.mealsCount, 0)
  const pendingEvents = MOCK_EVENTS.filter((e) => !e.verified).length

  const STATUS_COLORS: Record<string, string> = {
    urgent: '#F5C542',
    active: '#4ECAA0',
    funded: '#7BA7F5',
  }
  const REGION_STATUS_LABEL: Record<string, string> = {
    urgent: m.urgent,
    active: m.active,
    funded: m.funded,
  }

  return (
    <div className="px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-2">
        <h1 className={`font-bold text-white ${compactRu ? 'text-[20px]' : 'text-[22px]'}`}>{m.adminTitle}</h1>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#4ECAA0] animate-pulse" />
          <span className="font-mono text-[11px] text-[#4ECAA0]">{x.live}</span>
        </div>
      </div>
      <p className="font-mono text-[11px] text-white/20 mb-8">{x.demo}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {[
          { n: formatUsd(totalRaised), label: x.totalRaised, color: '#E8855A' },
          { n: String(REGIONS.length), label: x.regions, color: '#4ECAA0' },
          { n: totalMeals.toLocaleString(), label: x.mealsVerified, color: '#7BA7F5' },
          { n: String(pendingEvents), label: x.pendingValidation, color: '#F5C542' },
        ].map(({ n, label, color }) => (
          <div key={label} className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(to right, ${color}30, transparent)` }} />
            <p className={`font-mono font-semibold mb-1 ${compactRu ? 'text-[20px]' : 'text-[22px]'}`} style={{ color }}>{n}</p>
            <p className={`font-mono uppercase text-white/25 ${compactRu ? 'text-[9px] tracking-[0.07em]' : 'text-[10px] tracking-[0.1em]'}`}>{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/25 mb-4">{m.adminRegionsList}</p>
          <div className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl overflow-hidden">
            <div className="grid grid-cols-[1fr_auto_auto] gap-3 px-5 py-3 border-b border-white/[0.05] bg-white/[0.02]">
              <span className="font-mono text-[10px] uppercase tracking-wide text-white/25">{x.region}</span>
              <span className="font-mono text-[10px] uppercase tracking-wide text-white/25">{x.progress}</span>
              <span className="font-mono text-[10px] uppercase tracking-wide text-white/25">{x.status}</span>
            </div>
            <div className="divide-y divide-white/[0.04]">
              {REGIONS.map((r) => {
                const pct = getProgressPct(r)
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
                    <span className="font-mono text-[9px] px-1.5 py-0.5 rounded border" style={{ color, borderColor: `${color}30`, background: `${color}10` }}>
                      {REGION_STATUS_LABEL[r.status] ?? r.status}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/25 mb-4">{m.adminRecentEvents}</p>
            <div className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl divide-y divide-white/[0.04] overflow-hidden">
              {MOCK_EVENTS.slice(0, 5).map((ev) => (
                <div key={ev.id} className="px-5 py-3.5 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[12px] text-white/75 truncate">{ev.regionName}</p>
                    <p className="font-mono text-[10px] text-white/25 inline-flex items-center gap-1.5">
                      <MealGlyph />
                      <span>{ev.mealsCount} {m.meals.toLowerCase()}</span>
                      <DotSeparator />
                      <span>{timeAgo(ev.date, lang)}</span>
                    </p>
                  </div>
                  <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded border shrink-0 ${ev.verified ? 'text-[#4ECAA0] border-[#4ECAA0]/25 bg-[#4ECAA0]/10' : 'text-[#F5C542] border-[#F5C542]/25 bg-[#F5C542]/10'}`}>
                    {ev.verified ? x.verified : x.pending}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/25 mb-4">{m.adminDonationSummary}</p>
            <div className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl divide-y divide-white/[0.04] overflow-hidden">
              {MOCK_DONATIONS.slice(0, 5).map((d) => (
                <div key={d.id} className="px-5 py-3.5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[12px] text-white/75">{d.donor ?? x.anonymous}</p>
                    <p className="font-mono text-[10px] text-white/25 inline-flex items-center gap-1.5">
                      <span>{d.regionName}</span>
                      <DotSeparator />
                      <span>{formatDate(d.date, lang)}</span>
                    </p>
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

import Link from 'next/link'
import { getT, isValidLang, type Lang } from '@/lib/i18n'
import { REGIONS, formatUsd, getProgressPct } from '@/lib/meal/data'
import { MealNav } from '@/components/meal/MealNav'

// Mock need-density data per region (0–100 = low to critical need)
const NEED_DENSITY: Record<string, number> = {
  'nairobi-east':      72,
  'lahore-south':      91,
  'istanbul-migrant':  48,
  'manila-barangay':   85,
  'lagos-mainland':    68,
  'berlin-migrant':    30,
  'cairo-informal':    95,
  'sao-paulo-periphery': 61,
}

function needColor(score: number): string {
  if (score >= 85) return '#F5C542'   // critical — yellow
  if (score >= 60) return '#E8855A'   // high — amber
  return '#4ECAA0'                     // covered — green
}

export default function MapPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? params.lang as Lang : 'en'
  const t = getT(lang)
  const m = t.meal
  const lp = (p: string) => `/${lang}${p}`

  const STATUS_META: Record<string, { color: string; label: string }> = {
    urgent: { color: '#F5C542', label: m.urgent },
    active: { color: '#E8855A', label: m.active },
    funded: { color: '#4ECAA0', label: m.funded },
  }

  // Map dots with approximate screen positions
  const MAP_DOTS = [
    { slug: 'lagos-mainland',      x: 47, y: 58, label: 'Lagos' },
    { slug: 'nairobi-east',        x: 56, y: 62, label: 'Nairobi' },
    { slug: 'lahore-south',        x: 66, y: 36, label: 'Lahore' },
    { slug: 'istanbul-migrant',    x: 54, y: 28, label: 'Istanbul' },
    { slug: 'manila-barangay',     x: 80, y: 50, label: 'Manila' },
    { slug: 'cairo-informal',      x: 54, y: 40, label: 'Cairo' },
    { slug: 'berlin-migrant',      x: 51, y: 22, label: 'Berlin' },
    { slug: 'sao-paulo-periphery', x: 28, y: 68, label: 'São Paulo' },
  ]

  return (
    <div className="bg-[#070707] text-white min-h-screen">
      <MealNav lang={lang} />

      {/* Header */}
      <section className="relative border-b border-white/[0.06] px-6 pt-16 pb-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(78,202,160,0.05), transparent 65%)' }} />
        <div className="relative max-w-5xl mx-auto">
          <Link href={lp('/meal')} className="font-mono text-[11px] text-white/25 hover:text-[#E8855A] transition-colors mb-5 block">{m.backToMeal}</Link>
          <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#4ECAA0] mb-3">{m.mapEyebrow}</p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h1 className="font-bold text-[clamp(28px,4vw,44px)] tracking-tight text-white">{m.mapTitle}</h1>
            <p className="font-mono text-[11px] text-white/25 shrink-0">{m.mapFutureLabel}</p>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col gap-10">

        {/* Product preview banner */}
        <div className="relative rounded-2xl border border-[#4ECAA0]/20 bg-[#4ECAA0]/[0.03] overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(to right, transparent, rgba(78,202,160,0.4), transparent)' }} />
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Copy */}
            <div className="px-8 py-10">
              <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#4ECAA0] mb-4">Future interaction model</p>
              <h2 className="font-bold text-[clamp(20px,2.5vw,28px)] text-white mb-4 tracking-tight">
                Select a region on the map. Support it directly.
              </h2>
              <p className="text-[14px] text-white/45 font-light leading-relaxed mb-6">
                The future MEAL interface will display food-need intensity by region. You'll zoom into an area, see the current deficit and active programs, and donate directly to that zone.
              </p>
              <ul className="flex flex-col gap-2.5 mb-7">
                {[m.mapFeature1, m.mapFeature2, m.mapFeature3, m.mapFeature4].map(feat => (
                  <li key={feat} className="flex items-start gap-3 text-[13px] text-white/40 font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4ECAA0]/50 shrink-0 mt-1.5" />{feat}
                  </li>
                ))}
              </ul>
              <Link href={lp('/meal/donate')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E8855A] text-[#0D0805] font-semibold text-[13px] hover:bg-[#f0966e] transition-all duration-200">
                {m.ctaDonate}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
            {/* Map viz */}
            <div className="relative border-t lg:border-t-0 lg:border-l border-white/[0.06] min-h-[280px] flex items-center justify-center p-8">
              <div className="absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
              <div className="relative w-full max-w-[280px]">
                <svg viewBox="0 0 280 160" fill="none" className="w-full opacity-20">
                  <ellipse cx="140" cy="80" rx="130" ry="70" stroke="rgba(78,202,160,0.7)" strokeWidth="1"/>
                  <line x1="10" y1="80" x2="270" y2="80" stroke="rgba(78,202,160,0.3)" strokeWidth="0.5"/>
                  <line x1="140" y1="10" x2="140" y2="150" stroke="rgba(78,202,160,0.3)" strokeWidth="0.5"/>
                  <line x1="10" y1="53" x2="270" y2="53" stroke="rgba(78,202,160,0.15)" strokeWidth="0.4" strokeDasharray="4 4"/>
                  <line x1="10" y1="107" x2="270" y2="107" stroke="rgba(78,202,160,0.15)" strokeWidth="0.4" strokeDasharray="4 4"/>
                </svg>
                {MAP_DOTS.map(({ slug, x, y, label }) => {
                  const need = NEED_DENSITY[slug] ?? 50
                  const color = needColor(need)
                  return (
                    <div key={slug} className="absolute group" style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%,-50%)' }}>
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-35" style={{ backgroundColor: color }} />
                        <span className="relative inline-flex rounded-full h-3 w-3 border border-[#0A0A0B]" style={{ backgroundColor: color }} />
                      </span>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 bg-[#0E0E0F] border border-white/[0.12] rounded-lg px-2.5 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-10 whitespace-nowrap">
                        <p className="font-mono text-[11px] text-white font-semibold">{label}</p>
                        <p className="font-mono text-[9px] mt-0.5" style={{ color }}>Need: {need}%</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Need intensity legend */}
        <div className="flex flex-wrap gap-4 items-center">
          <p className="font-mono text-[10px] tracking-[0.1em] uppercase text-white/25">Need intensity:</p>
          {[
            { color: '#F5C542', label: 'Critical (85–100%)', range: '85–100%' },
            { color: '#E8855A', label: 'High (60–84%)',      range: '60–84%' },
            { color: '#4ECAA0', label: 'Covered (<60%)',     range: '<60%' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-2 font-mono text-[11px]" style={{ color }}>
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
              {label}
            </div>
          ))}
        </div>

        {/* Region list */}
        <div>
          <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-white/25 mb-5">
            {m.navRegions} ({REGIONS.length})
          </p>
          <div className="flex flex-col gap-2">
            {REGIONS.map(region => {
              const pct   = getProgressPct(region)
              const need  = NEED_DENSITY[region.slug] ?? 50
              const nc    = needColor(need)
              const sm    = STATUS_META[region.status]
              return (
                <Link key={region.slug} href={lp(`/meal/regions/${region.slug}`)}
                  className="flex items-center gap-4 bg-[#0C0C0E] border border-white/[0.06] rounded-xl px-5 py-4 hover:border-white/[0.14] transition-colors group">
                  <span className="text-[20px] shrink-0">{region.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <p className="font-semibold text-[14px] text-white/85">{region.name}</p>
                      <span className="font-mono text-[9px] px-1.5 py-0.5 rounded shrink-0" style={{ color: sm.color, background: `${sm.color}15` }}>
                        {region.country}
                      </span>
                    </div>
                    <div className="w-full h-1 bg-white/[0.05] rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: sm.color, opacity: 0.7 }} />
                    </div>
                  </div>
                  {/* Need score */}
                  <div className="text-center shrink-0 w-16">
                    <p className="font-mono text-[11px] font-semibold" style={{ color: nc }}>{need}%</p>
                    <p className="font-mono text-[9px] text-white/20">need</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-mono text-[13px] text-white/70">{formatUsd(region.raisedUsd)}</p>
                    <p className="font-mono text-[10px] text-white/25">of {formatUsd(region.goalUsd)}</p>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-white/20 group-hover:text-white/50 transition-colors shrink-0">
                    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

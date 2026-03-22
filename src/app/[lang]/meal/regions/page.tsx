import Link from 'next/link'
import { getT, isValidLang, type Lang } from '@/lib/i18n'
import { REGIONS, formatUsd, getProgressPct } from '@/lib/meal/data'
import { MealNav } from '@/components/meal/MealNav'

export default function RegionsPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? params.lang as Lang : 'en'
  const t = getT(lang)
  const m = t.meal
  const lp = (p: string) => `/${lang}${p}`

  const STATUS_META: Record<string, { color: string; label: string }> = {
    urgent: { color:'#F5C542', label: m.urgent },
    active: { color:'#4ECAA0', label: m.active },
    funded: { color:'#7BA7F5', label: m.funded },
  }

  return (
    <div className="bg-[#070707] text-white min-h-screen">
      <MealNav lang={lang} />
      <section className="relative border-b border-white/[0.06] px-6 pt-16 pb-12">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] pointer-events-none" style={{ background:'radial-gradient(ellipse at 50% 0%, rgba(232,133,90,0.05),transparent 65%)' }} />
        <div className="relative max-w-5xl mx-auto">
          <Link href={lp('/meal')} className="font-mono text-[11px] text-white/25 hover:text-[#E8855A] transition-colors mb-5 block">{m.backToMeal}</Link>
          <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#E8855A] mb-3">{m.regionsTitle}</p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h1 className="font-bold text-[clamp(28px,4vw,44px)] tracking-tight text-white">{m.regionsTitle}</h1>
            <p className="text-[14px] text-white/35 font-light max-w-sm sm:text-right">{m.regionsSub}</p>
          </div>
          <div className="flex flex-wrap gap-4 mt-6">
            {Object.entries(STATUS_META).map(([key, val]) => (
              <div key={key} className="flex items-center gap-2 font-mono text-[11px]" style={{ color: val.color }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: val.color }} />
                {val.label} ({REGIONS.filter(r => r.status === key).length})
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="px-6 py-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {REGIONS.map(region => {
            const pct = getProgressPct(region)
            const sm  = STATUS_META[region.status]
            return (
              <div key={region.slug} className="bg-[#0C0C0E] rounded-2xl overflow-hidden hover:border-white/[0.14] hover:-translate-y-0.5 transition-all duration-300"
                style={{ background:`linear-gradient(#0C0C0E,#0C0C0E) padding-box, linear-gradient(135deg,${sm.color}20,transparent 60%) border-box`, border:'1px solid transparent' }}>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-[28px]">{region.emoji}</span>
                      <div>
                        <h3 className="font-semibold text-[16px] text-white/90">{region.name}</h3>
                        <p className="font-mono text-[10px] text-white/30">{region.country}</p>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] px-2.5 py-1 rounded-lg border shrink-0" style={{ color:sm.color, borderColor:`${sm.color}30`, background:`${sm.color}10` }}>{sm.label}</span>
                  </div>
                  <p className="text-[13px] text-white/40 leading-relaxed mb-4 font-light line-clamp-2">{region.description}</p>
                  <p className="font-mono text-[11px] text-[#E8855A]/60 mb-4 italic">"{region.need}"</p>
                  <div className="mb-4">
                    <div className="flex justify-between text-[11px] font-mono text-white/30 mb-2">
                      <span>{m.raised}: <strong className="text-white/60">{formatUsd(region.raisedUsd)}</strong></span>
                      <span>{m.goal}: {formatUsd(region.goalUsd)} ({pct}%)</span>
                    </div>
                    <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width:`${pct}%`, backgroundColor:sm.color, opacity:0.8 }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-[11px] font-mono text-white/25 mb-5">
                    <span>🍽 {region.mealsServed.toLocaleString()} {m.meals.toLowerCase()}</span>
                    <span>· {region.eventCount} {m.events.toLowerCase()}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {region.tags.map(tag => (
                      <span key={tag} className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-white/25">{tag}</span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Link href={lp(`/meal/regions/${region.slug}`)} className="flex-1 text-center font-mono text-[12px] py-2.5 rounded-lg border border-white/[0.08] text-white/40 hover:text-white/70 hover:border-white/[0.18] transition-all duration-200">{m.viewRegion}</Link>
                    <Link href={lp(`/meal/donate?region=${region.slug}`)} className="flex-1 text-center font-semibold text-[13px] py-2.5 rounded-lg bg-[#E8855A] text-[#0D0805] hover:bg-[#f0966e] transition-all duration-200">{m.donate}</Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

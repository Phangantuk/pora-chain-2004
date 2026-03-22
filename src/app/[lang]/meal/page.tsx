import Link from 'next/link'
import { getT, isValidLang, type Lang } from '@/lib/i18n'
import { getExtraT } from '@/lib/i18n/extra'
import { REGIONS, formatUsd, MOCK_EVENTS } from '@/lib/meal/data'
import { MealNav } from '@/components/meal/MealNav'

export default function MealPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? params.lang as Lang : 'en'
  const t = getT(lang)
  const xt = getExtraT(lang)
  const m = t.meal
  const lp = (p: string) => `/${lang}${p}`

  const totalRaised   = REGIONS.reduce((s, r) => s + r.raisedUsd, 0)
  const totalMeals    = REGIONS.reduce((s, r) => s + r.mealsServed, 0)
  const verifiedEvents= MOCK_EVENTS.filter(e => e.verified).length

  return (
    <div className="bg-[#070707] text-white min-h-screen">
      <MealNav lang={lang} />

      {/* Hero */}
      <section className="relative px-6 pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(232,133,90,0.08), transparent 60%)' }} />
          <div className="absolute inset-0 opacity-[0.018]"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        </div>
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E8855A]/25 bg-[#E8855A]/10 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8855A] animate-pulse" />
            <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#E8855A]">{xt.meal.firstProductLive}</span>
          </div>
          <h1 className="font-bold text-[clamp(56px,9vw,96px)] leading-none tracking-tight text-white mb-4">{m.heroTitle}</h1>
          <p className="font-mono text-[13px] tracking-[0.15em] uppercase text-[#E8855A] mb-6">{m.tagline}</p>
          <p className="text-[17px] text-white/50 font-light leading-relaxed max-w-2xl mx-auto mb-10">{m.heroSub}</p>
          <div className="flex flex-wrap gap-3 justify-center mb-14">
            <Link href={lp('/meal/regions')} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#E8855A] text-[#0D0805] font-semibold text-[15px] hover:bg-[#f0966e] hover:shadow-[0_8px_32px_rgba(232,133,90,0.3)] hover:-translate-y-px transition-all duration-200">
              {m.ctaRegions} <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
            <Link href={lp('/meal/donate')} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-[#E8855A]/30 text-[#E8855A] font-medium text-[15px] hover:bg-[#E8855A]/[0.08] hover:border-[#E8855A]/50 transition-all duration-200">{m.ctaDonate}</Link>
            <Link href={lp('/meal/how-it-works')} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/[0.08] text-white/50 font-medium text-[15px] hover:text-white/80 hover:border-white/[0.18] transition-all duration-200">{m.ctaHowItWorks}</Link>
          </div>
          {/* Flow */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {[m.flowDonate, m.flowRegion, m.flowEvent, m.flowTransparency].map((step, i, arr) => (
              <span key={step} className="flex items-center gap-3">
                <span className="px-4 py-2 rounded-lg bg-[#0E0E0F] border border-white/[0.07] font-mono text-[12px] tracking-wide text-white/70">{step}</span>
                {i < arr.length - 1 && <span className="text-[#E8855A]/40">→</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-white/[0.06] bg-[#0C0C0E]">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/[0.06]">
          {[
            { n: formatUsd(totalRaised), label: xt.meal.statsRaised },
            { n: totalMeals.toLocaleString(), label: xt.meal.statsMeals },
            { n: String(REGIONS.length), label: xt.meal.statsRegions },
            { n: String(verifiedEvents), label: xt.meal.statsEvents },
          ].map(({ n, label }) => (
            <div key={label} className="px-8 py-6 text-center">
              <p className="font-mono text-[26px] font-semibold text-white mb-1">{n}</p>
              <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/30">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#E8855A] mb-3">{xt.meal.howTag}</p>
              <h2 className="font-bold text-[clamp(24px,3vw,36px)] text-white">{m.howTitle}</h2>
            </div>
            <Link href={lp('/meal/how-it-works')} className="font-mono text-[12px] text-white/30 hover:text-[#E8855A] transition-colors hidden sm:block">{xt.meal.howFullExplanation} →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { num: '01', title: xt.meal.step1Title, desc: xt.meal.step1Desc },
              { num: '02', title: xt.meal.step2Title, desc: xt.meal.step2Desc },
              { num: '03', title: xt.meal.step3Title, desc: xt.meal.step3Desc },
              { num: '04', title: xt.meal.step4Title, desc: xt.meal.step4Desc },
            ].map(step => (
              <div key={step.num} className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl p-6 relative overflow-hidden hover:border-white/[0.13] transition-colors">
                <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background:'linear-gradient(to right, rgba(232,133,90,0.3), transparent)' }} />
                <div className="font-mono text-[11px] text-[#E8855A]/50 mb-4">{step.num}</div>
                <h3 className="font-semibold text-[15px] text-white mb-2">{step.title}</h3>
                <p className="text-[13px] text-white/40 leading-relaxed font-light">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured regions */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#E8855A] mb-3">{m.regionsTitle}</p>
              <h2 className="font-bold text-[clamp(24px,3vw,36px)] text-white">{xt.meal.regionsNeedSupport}</h2>
            </div>
            <Link href={lp('/meal/regions')} className="font-mono text-[12px] text-white/30 hover:text-[#E8855A] transition-colors hidden sm:block">{m.allRegionsLink}</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {REGIONS.filter(r => r.status !== 'funded').slice(0, 3).map(region => {
              const pct = Math.min(100, Math.round((region.raisedUsd / region.goalUsd) * 100))
              const statusColor = region.status === 'urgent' ? '#F5C542' : '#4ECAA0'
              return (
                <Link key={region.slug} href={lp(`/meal/regions/${region.slug}`)}
                  className="group bg-[#0C0C0E] border border-white/[0.07] rounded-2xl p-6 hover:border-white/[0.14] hover:-translate-y-0.5 transition-all duration-300 no-underline block">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[22px]">{region.emoji}</span>
                      <div>
                        <p className="text-[14px] font-semibold text-white/90">{region.name}</p>
                        <p className="font-mono text-[10px] text-white/30">{region.country}</p>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-md border" style={{ color: statusColor, borderColor: `${statusColor}30`, background: `${statusColor}10` }}>
                      {region.status === 'urgent' ? m.urgent : m.active}
                    </span>
                  </div>
                  <p className="text-[12.5px] text-white/40 leading-relaxed mb-4 font-light line-clamp-2">{region.description}</p>
                  <div className="mb-3">
                    <div className="flex justify-between text-[11px] font-mono text-white/30 mb-1.5">
                      <span>{m.raised}: {formatUsd(region.raisedUsd)}</span><span>{pct}%</span>
                    </div>
                    <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-[#E8855A]" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  <p className="font-mono text-[10px] text-[#E8855A]/60 group-hover:text-[#E8855A] transition-colors">{m.viewRegion} →</p>
                </Link>
              )
            })}
          </div>
          <div className="mt-6 text-center">
            <Link href={lp('/meal/regions')} className="inline-flex items-center gap-2 font-mono text-[12px] text-white/35 hover:text-white/70 transition-colors border border-white/[0.07] hover:border-white/[0.15] px-5 py-2.5 rounded-lg">
              {m.ctaRegions} - {xt.meal.allRegions} {REGIONS.length} →
            </Link>
          </div>
        </div>
      </section>

      {/* Map preview teaser */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.07] bg-[#0C0C0E]">
            <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(to right, transparent, rgba(78,202,160,0.4), transparent)' }} />
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left: copy */}
              <div className="px-10 py-12">
                <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#4ECAA0] mb-4">{xt.meal.mapComingSoon}</p>
                <h2 className="font-bold text-[clamp(22px,2.5vw,32px)] text-white mb-4 tracking-tight">{xt.meal.mapPreviewTitle}</h2>
                <p className="text-[14px] text-white/45 font-light leading-relaxed mb-6">
                  {xt.meal.mapPreviewBody}
                </p>
                <ul className="flex flex-col gap-2.5 mb-8">
                  {[m.mapFeature1, m.mapFeature2, m.mapFeature3, m.mapFeature4].map(item => (
                    <li key={item} className="flex items-start gap-3 text-[13px] text-white/40 font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4ECAA0]/50 shrink-0 mt-1.5" />{item}
                    </li>
                  ))}
                </ul>
                <Link href={lp('/meal/map')} className="inline-flex items-center gap-2 font-mono text-[12px] text-[#4ECAA0]/60 hover:text-[#4ECAA0] transition-colors">
                  {xt.meal.mapPreviewCta} →
                </Link>
              </div>
              {/* Right: mini map viz */}
              <div className="relative border-l border-white/[0.06] flex items-center justify-center p-8 min-h-[280px]">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
                <div className="relative w-full max-w-[260px]">
                  {/* Simplified world shape hint */}
                  <svg viewBox="0 0 280 160" fill="none" className="w-full opacity-20">
                    <ellipse cx="140" cy="80" rx="130" ry="70" stroke="rgba(78,202,160,0.6)" strokeWidth="1"/>
                    <line x1="10" y1="80" x2="270" y2="80" stroke="rgba(78,202,160,0.3)" strokeWidth="0.5"/>
                    <line x1="140" y1="10" x2="140" y2="150" stroke="rgba(78,202,160,0.3)" strokeWidth="0.5"/>
                  </svg>
                  {/* Region dots */}
                  {[
                    { x: 52, y: 57, label: 'Lagos', color: '#F5C542' },
                    { x: 57, y: 50, label: 'Nairobi', color: '#4ECAA0' },
                    { x: 64, y: 38, label: 'Lahore', color: '#F5C542' },
                    { x: 54, y: 43, label: 'Cairo', color: '#F5C542' },
                    { x: 53, y: 28, label: 'Istanbul', color: '#4ECAA0' },
                    { x: 78, y: 52, label: 'Manila', color: '#F5C542' },
                    { x: 30, y: 60, label: 'São Paulo', color: '#4ECAA0' },
                  ].map(({ x, y, label, color }) => (
                    <div key={label} className="absolute" style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%,-50%)' }}>
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-40" style={{ backgroundColor: color }} />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: color }} />
                      </span>
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-4 right-4 font-mono text-[9px] text-white/20 tracking-wide">{xt.meal.mapCoveragePreview}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden text-center px-8 py-16" style={{ background:'linear-gradient(#0C0C0E,#0C0C0E) padding-box, linear-gradient(135deg,rgba(232,133,90,0.3),transparent 55%,rgba(232,133,90,0.15)) border-box', border:'1px solid transparent' }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background:'radial-gradient(ellipse at 50% 0%, rgba(232,133,90,0.07),transparent 60%)' }} />
            <div className="relative">
              <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#E8855A] mb-4">PORA × MEAL</p>
              <h2 className="font-bold text-[clamp(24px,3.5vw,40px)] text-white mb-4">{xt.meal.ctaTitle}</h2>
              <p className="text-[15px] text-white/40 max-w-md mx-auto mb-8 font-light">{xt.meal.ctaBody}</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href={lp('/meal/donate')} className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#E8855A] text-[#0D0805] font-semibold text-[14px] hover:bg-[#f0966e] hover:shadow-[0_8px_24px_rgba(232,133,90,0.3)] transition-all duration-200">{m.ctaDonate}</Link>
                <Link href={lp('/meal/explorer')} className="inline-flex items-center gap-2 px-7 py-3 rounded-xl border border-white/[0.1] text-white/60 font-medium text-[14px] hover:text-white hover:border-white/[0.2] transition-all duration-200">{m.ctaExplorer}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

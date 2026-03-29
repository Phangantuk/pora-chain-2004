import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getT, isValidLang, type Lang } from '@/lib/i18n'
import { getExtraT } from '@/lib/i18n/extra'
import { getRegionBySlug, getVenuesByRegion, REGIONS, MOCK_EVENTS, MOCK_DONATIONS, formatUsd, getProgressPct, formatDate, timeAgo } from '@/lib/meal/data'
import { MealNav } from '@/components/meal/MealNav'

export async function generateStaticParams() {
  return REGIONS.map(r => ({ slug: r.slug }))
}

function spiceLabel(lang: Lang, spice: 'none' | 'mild' | 'medium' | 'hot'): string {
  if (lang === 'ru') {
    if (spice === 'none') return '\u043d\u0435\u0442'
    if (spice === 'mild') return '\u043c\u044f\u0433\u043a\u0430\u044f'
    if (spice === 'medium') return '\u0441\u0440\u0435\u0434\u043d\u044f\u044f'
    return '\u043e\u0441\u0442\u0440\u0430\u044f'
  }
  if (lang === 'es') {
    if (spice === 'none') return 'sin picante'
    if (spice === 'mild') return 'suave'
    if (spice === 'medium') return 'medio'
    return 'fuerte'
  }
  if (spice === 'none') return 'none'
  if (spice === 'mild') return 'mild'
  if (spice === 'medium') return 'medium'
  return 'hot'
}

export default function RegionPage({ params }: { params: { lang: string; slug: string } }) {
  const lang   = isValidLang(params.lang) ? params.lang as Lang : 'en'
  const region = getRegionBySlug(params.slug)
  if (!region) notFound()

  const t   = getT(lang)
  const xt  = getExtraT(lang)
  const m   = t.meal
  const lp  = (p: string) => `/${lang}${p}`
  const pct = getProgressPct(region)

  const events    = MOCK_EVENTS.filter(e => e.regionSlug === region.slug)
  const donations = MOCK_DONATIONS.filter(d => d.regionSlug === region.slug)
  const venues = getVenuesByRegion(region.slug)

  const STATUS_COLORS: Record<string, string> = { urgent:'#F5C542', active:'#4ECAA0', funded:'#7BA7F5' }
  const statusColor = STATUS_COLORS[region.status]
  const statusLabel = { urgent: m.urgent, active: m.active, funded: m.funded }[region.status] ?? region.status
  const x = {
    nearbyVenues: lang === 'ru' ? '\u0411\u043b\u0438\u0437\u043a\u0438\u0435 \u0442\u043e\u0447\u043a\u0438 \u0432 \u0440\u0435\u0433\u0438\u043e\u043d\u0435' : lang === 'es' ? 'Sedes cercanas en la region' : 'Nearby venues in this region',
    mealType: lang === 'ru' ? '\u0422\u0438\u043f \u0431\u043b\u044e\u0434\u0430' : lang === 'es' ? 'Tipo de comida' : 'Meal type',
    vegetarian: lang === 'ru' ? '\u0412\u0435\u0433\u0435\u0442\u0430\u0440\u0438\u0430\u043d\u0441\u043a\u043e\u0435' : lang === 'es' ? 'Vegetariano' : 'Vegetarian',
    spice: lang === 'ru' ? '\u041e\u0441\u0442\u0440\u043e\u0442\u0430' : lang === 'es' ? 'Picante' : 'Spice',
    calories: lang === 'ru' ? '\u041a\u043a\u0430\u043b' : lang === 'es' ? 'kcal' : 'kcal',
    portion: lang === 'ru' ? '\u041f\u043e\u0440\u0446\u0438\u044f' : lang === 'es' ? 'Porcion' : 'Portion',
    openVenue: lang === 'ru' ? '\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u0442\u043e\u0447\u043a\u0443' : lang === 'es' ? 'Abrir sede' : 'Open venue',
    yes: lang === 'ru' ? '\u0434\u0430' : lang === 'es' ? 'si' : 'yes',
    no: lang === 'ru' ? '\u043d\u0435\u0442' : lang === 'es' ? 'no' : 'no',
  }

  return (
    <div className="bg-[#070707] text-white min-h-screen">
      <MealNav lang={lang} />
      <section className="relative border-b border-white/[0.06] px-6 pt-16 pb-12 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background:`linear-gradient(to right,transparent,${statusColor}40,transparent)` }} />
        <div className="relative max-w-5xl mx-auto">
          <div className="flex items-center gap-2 font-mono text-[10px] text-white/20 mb-6">
            <Link href={lp('/meal')} className="hover:text-white/50 transition-colors">MEAL</Link>
            <span>/</span>
            <Link href={lp('/meal/regions')} className="hover:text-white/50 transition-colors">{m.navRegions}</Link>
            <span>/</span>
            <span style={{ color:`${statusColor}70` }}>{region.name}</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[40px]">{region.emoji}</span>
                <div>
                  <h1 className="font-bold text-[clamp(28px,4vw,44px)] tracking-tight text-white leading-tight">{region.name}</h1>
                  <p className="font-mono text-[12px] text-white/30">{region.country}</p>
                </div>
              </div>
              <p className="text-[15px] text-white/50 leading-relaxed mb-4 font-light max-w-xl">{region.description}</p>
              <div className="bg-[#0C0C0E] border border-[#E8855A]/15 rounded-xl px-5 py-3 inline-flex items-start gap-2 mb-6">
                <span className="text-[#E8855A] text-[14px] shrink-0 mt-0.5 inline-flex items-center" aria-hidden>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 2.5v4h4M2.5 6.5l3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <p className="text-[13px] text-white/50 italic font-light">{region.need}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {region.tags.map(tag => (
                  <span key={tag} className="font-mono text-[11px] px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-white/30">{tag}</span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl p-6"
                style={{ background:`linear-gradient(#0C0C0E,#0C0C0E) padding-box, linear-gradient(135deg,${statusColor}25,transparent 60%) border-box`, border:'1px solid transparent' }}>
                <div className="flex justify-between text-[12px] font-mono text-white/30 mb-3"><span>{m.raised}</span><span>{m.goal}</span></div>
                <div className="flex justify-between text-[18px] font-semibold text-white mb-3">
                  <span>{formatUsd(region.raisedUsd)}</span>
                  <span className="text-white/30">{formatUsd(region.goalUsd)}</span>
                </div>
                <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden mb-2">
                  <div className="h-full rounded-full" style={{ width:`${pct}%`, backgroundColor:statusColor }} />
                </div>
                <p className="font-mono text-[11px] text-white/25 mb-5">{pct}% {xt.meal.fundedLabel}</p>
                <div className="grid grid-cols-2 gap-3 mb-5 text-center">
                  <div className="bg-white/[0.03] rounded-xl py-3">
                    <p className="font-mono text-[18px] font-semibold text-white">{region.mealsServed.toLocaleString()}</p>
                    <p className="font-mono text-[9px] text-white/25 uppercase tracking-wide mt-0.5">{m.meals}</p>
                  </div>
                  <div className="bg-white/[0.03] rounded-xl py-3">
                    <p className="font-mono text-[18px] font-semibold text-white">{region.eventCount}</p>
                    <p className="font-mono text-[9px] text-white/25 uppercase tracking-wide mt-0.5">{m.events}</p>
                  </div>
                </div>
                <Link href={lp(`/meal/donate?region=${region.slug}`)} className="block w-full text-center font-semibold text-[14px] py-3 rounded-xl bg-[#E8855A] text-[#0D0805] hover:bg-[#f0966e] hover:shadow-[0_8px_24px_rgba(232,133,90,0.3)] transition-all duration-200">
                  {m.donate} {xt.meal.donateToRegion}
                </Link>
              </div>
              <div className="bg-[#0C0C0E] border border-white/[0.07] rounded-xl px-5 py-4">
                <p className="font-mono text-[10px] text-white/25 uppercase tracking-wide mb-1">{m.lastActive}</p>
                <p className="font-mono text-[12px] text-white/60">{timeAgo(region.lastActivity, lang)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/25 mb-4">{m.events} ({events.length})</p>
          {events.length === 0 ? (
            <p className="text-[13px] text-white/25 font-mono">{m.emptyEvents}</p>
          ) : (
            <div className="flex flex-col gap-2">
              {events.map(ev => (
                <div key={ev.id} className="bg-[#0C0C0E] border border-white/[0.06] rounded-xl px-5 py-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <p className="text-[13px] text-white/70 leading-snug">{ev.description}</p>
                    <span className={`font-mono text-[10px] px-2 py-0.5 rounded-md shrink-0 ${ev.verified ? 'text-[#4ECAA0] bg-[#4ECAA0]/10 border border-[#4ECAA0]/20' : 'text-white/30 bg-white/[0.04] border border-white/[0.07]'}`}>
                      {ev.verified ? m.verifiedLabel : m.pendingLabel}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-[11px] text-white/25">
                    <span className="inline-flex items-center gap-1.5"><MealGlyph />{ev.mealsCount} {m.meals.toLowerCase()}</span>
                    <span>- {timeAgo(ev.date, lang)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/25 mb-4">{m.explRecentDonations} ({donations.length})</p>
          {donations.length === 0 ? (
            <p className="text-[13px] text-white/25 font-mono">{m.emptyDonations}</p>
          ) : (
            <div className="flex flex-col gap-2">
              {donations.map(d => (
                <div key={d.id} className="bg-[#0C0C0E] border border-white/[0.06] rounded-xl px-5 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-[13px] text-white/70 mb-0.5">{d.donor || xt.meal.anonymous}</p>
                    <p className="font-mono text-[10px] text-white/25">{formatDate(d.date, lang)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[14px] text-[#E8855A] font-semibold">{formatUsd(d.amountUsd)}</p>
                    <p className="font-mono text-[10px] text-white/25">{d.currency}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 pb-14">
        <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/25 mb-4">
          {x.nearbyVenues} ({venues.length})
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {venues.map((venue) => (
            <Link
              key={venue.slug}
              href={lp(`/meal/venues/${venue.slug}`)}
              className="group bg-[#0C0C0E] border border-white/[0.07] rounded-2xl p-5 hover:border-white/[0.15] transition-colors no-underline"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="text-[14px] font-semibold text-white/85">{venue.name}</p>
                  <p className="font-mono text-[10px] text-white/30">{venue.neighborhood}, {venue.city}</p>
                </div>
                <span className="font-mono text-[9px] px-2 py-0.5 rounded-md border border-[#4ECAA0]/30 text-[#4ECAA0] bg-[#4ECAA0]/10">
                  {m.active}
                </span>
              </div>
              <p className="text-[13px] text-white/80 mb-1.5">{venue.featuredMeal.mealName}</p>
              <p className="text-[12px] text-white/40 leading-relaxed mb-3">{venue.featuredMeal.mealDescription}</p>
              <div className="flex flex-wrap gap-2 font-mono text-[10px] text-white/35 mb-3">
                <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">{x.mealType}: {venue.featuredMeal.mealType}</span>
                <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">{x.vegetarian}: {venue.featuredMeal.isVegetarian ? x.yes : x.no}</span>
                <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">{x.spice}: {spiceLabel(lang, venue.featuredMeal.spiceLevel)}</span>
                <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">{x.calories}: {venue.featuredMeal.caloriesApprox}</span>
                <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">{x.portion}: {venue.featuredMeal.portionLabel}</span>
              </div>
              <p className="font-mono text-[11px] text-[#E8855A]/65 group-hover:text-[#E8855A] transition-colors">
                {x.openVenue}
              </p>
            </Link>
          ))}
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

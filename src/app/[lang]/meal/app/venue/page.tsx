import type { Metadata } from 'next'
import Link from 'next/link'
import { isValidLang, type Lang } from '@/lib/i18n'
import { VENUES, getRegionBySlug } from '@/lib/meal/data'

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

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const title = lang === 'ru' ? 'MEAL: \u041a\u0430\u0431\u0438\u043d\u0435\u0442 \u0442\u043e\u0447\u043a\u0438' : lang === 'es' ? 'MEAL: Panel de sede' : 'MEAL: Venue workspace'
  return { title, description: title }
}

export default function MealAppVenuePage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const lp = (path: string) => `/${lang}${path}`
  const primaryVenue = VENUES[0]
  const primaryRegion = getRegionBySlug(primaryVenue.regionSlug)

  const x = {
    tag: 'MEAL APP',
    title: lang === 'ru' ? '\u041a\u0430\u0431\u0438\u043d\u0435\u0442 \u0442\u043e\u0447\u043a\u0438' : lang === 'es' ? 'Panel de sede' : 'Venue workspace',
    desc:
      lang === 'ru'
        ? '\u041c\u043e\u0434\u0435\u043b\u044c MVP: \u043a\u0430\u0436\u0434\u0430\u044f \u0442\u043e\u0447\u043a\u0430 \u0438\u043c\u0435\u0435\u0442 \u043e\u0434\u043d\u043e \u043e\u0441\u043d\u043e\u0432\u043d\u043e\u0435 \u0431\u043b\u044e\u0434\u043e \u0434\u043b\u044f \u0441\u0442\u0430\u0431\u0438\u043b\u044c\u043d\u043e\u0439 \u0432\u044b\u0434\u0430\u0447\u0438.'
        : lang === 'es'
          ? 'Modelo MVP: cada sede tiene una comida principal para distribucion estable.'
          : 'MVP model: each venue has one primary distributed meal for stable operations.',
    allVenues: lang === 'ru' ? '\u0412\u0441\u0435 \u0442\u043e\u0447\u043a\u0438' : lang === 'es' ? 'Todas las sedes' : 'All venues',
    meal: lang === 'ru' ? '\u0411\u043b\u044e\u0434\u043e' : lang === 'es' ? 'Comida' : 'Meal',
    featuredMeal: lang === 'ru' ? '\u041e\u0441\u043d\u043e\u0432\u043d\u043e\u0435 \u0431\u043b\u044e\u0434\u043e' : lang === 'es' ? 'Comida principal' : 'Featured meal',
    mealType: lang === 'ru' ? '\u0422\u0438\u043f' : lang === 'es' ? 'Tipo' : 'Type',
    vegetarian: lang === 'ru' ? '\u0412\u0435\u0433\u0435\u0442\u0430\u0440\u0438\u0430\u043d\u0441\u043a\u043e\u0435' : lang === 'es' ? 'Vegetariano' : 'Vegetarian',
    spice: lang === 'ru' ? '\u041e\u0441\u0442\u0440\u043e\u0442\u0430' : lang === 'es' ? 'Picante' : 'Spice',
    calories: lang === 'ru' ? '\u041a\u043a\u0430\u043b' : lang === 'es' ? 'kcal' : 'kcal',
    portion: lang === 'ru' ? '\u041f\u043e\u0440\u0446\u0438\u044f' : lang === 'es' ? 'Porcion' : 'Portion',
    yes: lang === 'ru' ? '\u0434\u0430' : lang === 'es' ? 'si' : 'yes',
    no: lang === 'ru' ? '\u043d\u0435\u0442' : lang === 'es' ? 'no' : 'no',
    back: lang === 'ru' ? '\u0412\u0435\u0440\u043d\u0443\u0442\u044c\u0441\u044f \u0432 MEAL app' : lang === 'es' ? 'Volver a MEAL app' : 'Back to MEAL app',
    openVenue: lang === 'ru' ? '\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u0442\u043e\u0447\u043a\u0443' : lang === 'es' ? 'Abrir sede' : 'Open venue',
    region: lang === 'ru' ? '\u0420\u0435\u0433\u0438\u043e\u043d' : lang === 'es' ? 'Region' : 'Region',
  }

  return (
    <section className="px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#E8855A] mb-3">{x.tag}</p>
        <h1 className="font-bold text-[clamp(24px,4vw,34px)] tracking-tight text-white mb-3">{x.title}</h1>
        <p className="text-[14px] text-white/45 leading-relaxed mb-8 max-w-3xl">{x.desc}</p>

        <div className="grid grid-cols-1 xl:grid-cols-[1.15fr_1fr] gap-6 mb-7">
          <div className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl p-5">
            <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/25 mb-4">
              {x.allVenues} ({VENUES.length})
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {VENUES.map((venue) => (
                <Link key={venue.slug} href={lp(`/meal/venues/${venue.slug}`)} className="group rounded-xl border border-white/[0.07] bg-white/[0.02] p-3 hover:border-white/[0.14] transition-colors no-underline">
                  <p className="text-[13px] font-semibold text-white/80 leading-snug">{venue.name}</p>
                  <p className="font-mono text-[10px] text-white/30 mb-2">{venue.city}, {venue.country}</p>
                  <p className="text-[12px] text-white/45"><span className="font-mono text-[10px] text-white/30">{x.meal}:</span> {venue.featuredMeal.mealName}</p>
                  <p className="font-mono text-[10px] text-[#E8855A]/60 mt-2 group-hover:text-[#E8855A] transition-colors">{x.openVenue}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl p-5">
            <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/25 mb-4">{x.featuredMeal}</p>
            <h2 className="text-[18px] font-semibold text-white mb-1.5">{primaryVenue.name}</h2>
            <p className="font-mono text-[11px] text-white/30 mb-4">
              {x.region}: {primaryRegion?.name ?? primaryVenue.regionName}
            </p>
            <p className="text-[14px] text-white/75 mb-2">{primaryVenue.featuredMeal.mealName}</p>
            <p className="text-[13px] text-white/40 leading-relaxed mb-4">{primaryVenue.featuredMeal.mealDescription}</p>
            <div className="space-y-2 text-[12px] text-white/55">
              <p><span className="font-mono text-[10px] text-white/25">{x.mealType}:</span> {primaryVenue.featuredMeal.mealType}</p>
              <p><span className="font-mono text-[10px] text-white/25">{x.vegetarian}:</span> {primaryVenue.featuredMeal.isVegetarian ? x.yes : x.no}</p>
              <p><span className="font-mono text-[10px] text-white/25">{x.spice}:</span> {spiceLabel(lang, primaryVenue.featuredMeal.spiceLevel)}</p>
              <p><span className="font-mono text-[10px] text-white/25">{x.calories}:</span> {primaryVenue.featuredMeal.caloriesApprox}</p>
              <p><span className="font-mono text-[10px] text-white/25">{x.portion}:</span> {primaryVenue.featuredMeal.portionLabel}</p>
            </div>
          </div>
        </div>

        <Link href={lp('/meal/app/dashboard')} className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] px-4 py-2 text-[13px] text-white/65 hover:text-white/90 transition-colors">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M10.2 6.5H2.8m0 0 2.4-2.4M2.8 6.5l2.4 2.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {x.back}
        </Link>
      </div>
    </section>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { isValidLang, type Lang } from '@/lib/i18n'
import { VENUES } from '@/lib/meal/data'

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
  const title = lang === 'ru' ? 'MEAL: \u041a\u0430\u0431\u0438\u043d\u0435\u0442 \u0443\u0447\u0430\u0441\u0442\u043d\u0438\u043a\u0430' : lang === 'es' ? 'MEAL: Panel de participante' : 'MEAL: Participant workspace'
  return { title, description: title }
}

export default function MealAppParticipantPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const lp = (path: string) => `/${lang}${path}`
  const nearbyVenues = VENUES

  const x = {
    tag: 'MEAL APP',
    title: lang === 'ru' ? '\u041a\u0430\u0431\u0438\u043d\u0435\u0442 \u0443\u0447\u0430\u0441\u0442\u043d\u0438\u043a\u0430' : lang === 'es' ? 'Panel de participante' : 'Participant workspace',
    desc:
      lang === 'ru'
        ? '\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0431\u043b\u0438\u0436\u0430\u0439\u0448\u0443\u044e \u0442\u043e\u0447\u043a\u0443 \u0438 \u043f\u043e\u0441\u043c\u043e\u0442\u0440\u0438\u0442\u0435 \u043a\u0430\u043a\u043e\u0435 \u0431\u043b\u044e\u0434\u043e \u0432\u044b\u0434\u0430\u0435\u0442\u0441\u044f \u0441\u0435\u0433\u043e\u0434\u043d\u044f.'
        : lang === 'es'
          ? 'Elige una sede cercana y revisa la comida principal disponible hoy.'
          : 'Choose a nearby venue and check which primary meal is available today.',
    nearby: lang === 'ru' ? '\u0411\u043b\u0438\u0437\u043a\u0438\u0435 \u0442\u043e\u0447\u043a\u0438' : lang === 'es' ? 'Sedes cercanas' : 'Nearby venues',
    meal: lang === 'ru' ? '\u0411\u043b\u044e\u0434\u043e' : lang === 'es' ? 'Comida' : 'Meal',
    portion: lang === 'ru' ? '\u041f\u043e\u0440\u0446\u0438\u044f' : lang === 'es' ? 'Porcion' : 'Portion',
    spice: lang === 'ru' ? '\u041e\u0441\u0442\u0440\u043e\u0442\u0430' : lang === 'es' ? 'Picante' : 'Spice',
    calories: lang === 'ru' ? '\u041a\u043a\u0430\u043b' : lang === 'es' ? 'kcal' : 'kcal',
    openDetails: lang === 'ru' ? '\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u0434\u0435\u0442\u0430\u043b\u0438 \u0442\u043e\u0447\u043a\u0438' : lang === 'es' ? 'Abrir detalle de sede' : 'Open venue detail',
    back: lang === 'ru' ? '\u0412\u0435\u0440\u043d\u0443\u0442\u044c\u0441\u044f \u0432 MEAL app' : lang === 'es' ? 'Volver a MEAL app' : 'Back to MEAL app',
  }

  return (
    <section className="px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#E8855A] mb-3">{x.tag}</p>
        <h1 className="font-bold text-[clamp(24px,4vw,34px)] tracking-tight text-white mb-3">{x.title}</h1>
        <p className="text-[14px] text-white/45 leading-relaxed mb-8 max-w-3xl">{x.desc}</p>

        <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/25 mb-4">
          {x.nearby} ({nearbyVenues.length})
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {nearbyVenues.map((venue) => (
            <Link key={venue.slug} href={lp(`/meal/venues/${venue.slug}`)} className="group bg-[#0C0C0E] border border-white/[0.07] rounded-2xl p-5 hover:border-white/[0.14] transition-colors no-underline">
              <p className="text-[14px] font-semibold text-white/85 mb-1">{venue.name}</p>
              <p className="font-mono text-[10px] text-white/30 mb-3">{venue.neighborhood}, {venue.city}</p>
              <p className="text-[13px] text-white/75 mb-1.5"><span className="font-mono text-[10px] text-white/25">{x.meal}:</span> {venue.featuredMeal.mealName}</p>
              <p className="text-[12px] text-white/35 leading-relaxed mb-3">{venue.featuredMeal.mealDescription}</p>
              <div className="flex flex-wrap gap-2 font-mono text-[10px] text-white/35 mb-2">
                <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">{x.portion}: {venue.featuredMeal.portionLabel}</span>
                <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">{x.spice}: {spiceLabel(lang, venue.featuredMeal.spiceLevel)}</span>
                <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">{x.calories}: {venue.featuredMeal.caloriesApprox}</span>
              </div>
              <p className="font-mono text-[11px] text-[#E8855A]/65 group-hover:text-[#E8855A] transition-colors">{x.openDetails}</p>
            </Link>
          ))}
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

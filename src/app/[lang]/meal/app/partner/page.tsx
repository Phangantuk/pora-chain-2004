import type { Metadata } from 'next'
import Link from 'next/link'
import { isValidLang, type Lang } from '@/lib/i18n'
import { VENUES } from '@/lib/meal/data'

function estimatedMealsPerWeek(caloriesApprox: number): number {
  if (caloriesApprox >= 650) return 820
  if (caloriesApprox >= 550) return 940
  return 1060
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const title = lang === 'ru' ? 'MEAL: \u0421\u0438\u0441\u0442\u0435\u043c\u043d\u044b\u0435 \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0438' : lang === 'es' ? 'MEAL: Operaciones del sistema' : 'MEAL: System operations workspace'
  return { title, description: title }
}

export default function MealAppOperationsPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const lp = (path: string) => `/${lang}${path}`

  const x = {
    tag: 'MEAL APP',
    title: lang === 'ru' ? '\u0421\u0438\u0441\u0442\u0435\u043c\u043d\u044b\u0435 \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0438' : lang === 'es' ? 'Operaciones del sistema' : 'System operations workspace',
    desc:
      lang === 'ru'
        ? '\u041e\u043f\u0435\u0440\u0430\u0446\u0438\u043e\u043d\u043d\u044b\u0439 \u0432\u0438\u0434 \u0441\u0438\u0441\u0442\u0435\u043c\u044b: \u043a\u0430\u043a \u0434\u043e\u043d\u043e\u0440\u0441\u043a\u0438\u0435 \u0441\u0440\u0435\u0434\u0441\u0442\u0432\u0430 \u043f\u0440\u043e\u0445\u043e\u0434\u044f\u0442 \u0447\u0435\u0440\u0435\u0437 \u0441\u0438\u0441\u0442\u0435\u043c\u0443 \u043a \u0442\u043e\u0447\u043a\u0430\u043c \u0438 \u043f\u043e\u043b\u0443\u0447\u0430\u0442\u0435\u043b\u044f\u043c.'
      : lang === 'es'
          ? 'Vista operativa: como el sistema enruta fondos a sedes y confirma entregas de comidas.'
          : 'Operations view: how the system routes funds to venues and confirms meal distribution.',
    impactView: lang === 'ru' ? '\u0412\u043b\u0438\u044f\u043d\u0438\u0435 \u043f\u043e \u0442\u043e\u0447\u043a\u0430\u043c' : lang === 'es' ? 'Impacto por sede' : 'Impact by venue',
    venue: lang === 'ru' ? '\u0422\u043e\u0447\u043a\u0430' : lang === 'es' ? 'Sede' : 'Venue',
    meal: lang === 'ru' ? '\u0411\u043b\u044e\u0434\u043e' : lang === 'es' ? 'Comida' : 'Featured meal',
    calories: lang === 'ru' ? '\u041a\u043a\u0430\u043b' : lang === 'es' ? 'kcal' : 'kcal',
    estWeekly: lang === 'ru' ? '\u041e\u0446\u0435\u043d\u043a\u0430 \u043f\u043e\u0440\u0446\u0438\u0439/\u043d\u0435\u0434' : lang === 'es' ? 'Porciones/semana estimadas' : 'Estimated portions/week',
    openDetail: lang === 'ru' ? '\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u0434\u0435\u0442\u0430\u043b\u044c' : lang === 'es' ? 'Abrir detalle' : 'Open detail',
    back: lang === 'ru' ? '\u0412\u0435\u0440\u043d\u0443\u0442\u044c\u0441\u044f \u0432 MEAL app' : lang === 'es' ? 'Volver a MEAL app' : 'Back to MEAL app',
  }

  return (
    <section className="px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#E8855A] mb-3">{x.tag}</p>
        <h1 className="font-bold text-[clamp(24px,4vw,34px)] tracking-tight text-white mb-3">{x.title}</h1>
        <p className="text-[14px] text-white/45 leading-relaxed mb-8 max-w-3xl">{x.desc}</p>

        <div className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl overflow-hidden mb-8">
          <div className="grid grid-cols-[1.2fr_1.2fr_auto_auto_auto] gap-4 px-5 py-3 border-b border-white/[0.05] bg-white/[0.02]">
            {[x.venue, x.meal, x.calories, x.estWeekly, ''].map((col, idx) => (
              <span key={`${col}-${idx}`} className="font-mono text-[10px] tracking-[0.1em] uppercase text-white/25">
                {col}
              </span>
            ))}
          </div>
          <div className="divide-y divide-white/[0.04]">
            {VENUES.map((venue) => (
              <div key={venue.slug} className="grid grid-cols-[1.2fr_1.2fr_auto_auto_auto] gap-4 items-center px-5 py-4 hover:bg-white/[0.015] transition-colors">
                <div className="min-w-0">
                  <p className="text-[13px] text-white/80 truncate">{venue.name}</p>
                  <p className="font-mono text-[10px] text-white/25">{venue.city}</p>
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] text-white/70 truncate">{venue.featuredMeal.mealName}</p>
                  <p className="font-mono text-[10px] text-white/25 truncate">{venue.featuredMeal.portionLabel}</p>
                </div>
                <p className="font-mono text-[12px] text-white/55">{venue.featuredMeal.caloriesApprox}</p>
                <p className="font-mono text-[12px] text-[#4ECAA0]">{estimatedMealsPerWeek(venue.featuredMeal.caloriesApprox)}</p>
                <Link href={lp(`/meal/venues/${venue.slug}`)} className="font-mono text-[11px] text-[#E8855A]/65 hover:text-[#E8855A] transition-colors">
                  {x.openDetail}
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {VENUES.slice(0, 3).map((venue) => (
            <Link key={`${venue.slug}-card`} href={lp(`/meal/venues/${venue.slug}`)} className="group bg-[#0C0C0E] border border-white/[0.07] rounded-2xl p-5 hover:border-white/[0.14] transition-colors no-underline">
              <p className="text-[14px] font-semibold text-white/85 mb-1">{venue.name}</p>
              <p className="font-mono text-[10px] text-white/30 mb-2">{venue.city}, {venue.country}</p>
              <p className="text-[13px] text-white/70 mb-2">{venue.featuredMeal.mealName}</p>
              <p className="text-[12px] text-white/35 leading-relaxed mb-2">{venue.featuredMeal.mealDescription}</p>
              <p className="font-mono text-[11px] text-[#E8855A]/65 group-hover:text-[#E8855A] transition-colors">{x.openDetail}</p>
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

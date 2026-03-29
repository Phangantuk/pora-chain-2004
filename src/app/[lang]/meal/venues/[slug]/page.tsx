import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getT, isValidLang, type Lang } from '@/lib/i18n'
import { MealNav } from '@/components/meal/MealNav'
import { VENUES, getRegionBySlug, getVenueBySlug } from '@/lib/meal/data'

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

export async function generateStaticParams() {
  return VENUES.map((venue) => ({ slug: venue.slug }))
}

export default function MealVenueDetailPage({ params }: { params: { lang: string; slug: string } }) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const t = getT(lang)
  const m = t.meal
  const lp = (path: string) => `/${lang}${path}`

  const venue = getVenueBySlug(params.slug)
  if (!venue) notFound()

  const region = getRegionBySlug(venue.regionSlug)
  const x = {
    venueLabel: lang === 'ru' ? '\u0422\u043e\u0447\u043a\u0430 \u0440\u0430\u0437\u0434\u0430\u0447\u0438' : lang === 'es' ? 'Sede de distribucion' : 'Distribution venue',
    featuredMeal: lang === 'ru' ? '\u041e\u0441\u043d\u043e\u0432\u043d\u043e\u0435 \u0431\u043b\u044e\u0434\u043e \u043d\u0430 \u0441\u0435\u0433\u043e\u0434\u043d\u044f' : lang === 'es' ? 'Comida principal de hoy' : 'Primary meal for today',
    mealName: lang === 'ru' ? '\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435' : lang === 'es' ? 'Nombre' : 'Meal name',
    mealDescription: lang === 'ru' ? '\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435' : lang === 'es' ? 'Descripcion' : 'Description',
    mealType: lang === 'ru' ? '\u0422\u0438\u043f' : lang === 'es' ? 'Tipo' : 'Meal type',
    vegetarian: lang === 'ru' ? '\u0412\u0435\u0433\u0435\u0442\u0430\u0440\u0438\u0430\u043d\u0441\u043a\u043e\u0435' : lang === 'es' ? 'Vegetariano' : 'Vegetarian',
    spice: lang === 'ru' ? '\u041e\u0441\u0442\u0440\u043e\u0442\u0430' : lang === 'es' ? 'Picante' : 'Spice level',
    calories: lang === 'ru' ? '\u041a\u0430\u043b\u043e\u0440\u0438\u0438' : lang === 'es' ? 'Calorias' : 'Calories approx',
    availableToday: lang === 'ru' ? '\u0414\u043e\u0441\u0442\u0443\u043f\u043d\u043e \u0441\u0435\u0433\u043e\u0434\u043d\u044f' : lang === 'es' ? 'Disponible hoy' : 'Available today',
    portion: lang === 'ru' ? '\u041f\u043e\u0440\u0446\u0438\u044f' : lang === 'es' ? 'Porcion' : 'Portion',
    yes: lang === 'ru' ? '\u0434\u0430' : lang === 'es' ? 'si' : 'yes',
    no: lang === 'ru' ? '\u043d\u0435\u0442' : lang === 'es' ? 'no' : 'no',
    address: lang === 'ru' ? '\u0410\u0434\u0440\u0435\u0441' : lang === 'es' ? 'Direccion' : 'Address',
    region: lang === 'ru' ? '\u0420\u0435\u0433\u0438\u043e\u043d' : lang === 'es' ? 'Region' : 'Region',
    recipientFlow: lang === 'ru' ? '\u041f\u043e\u0442\u043e\u043a \u043f\u043e\u043b\u0443\u0447\u0430\u0442\u0435\u043b\u044f' : lang === 'es' ? 'Flujo de receptor' : 'Recipient flow',
    donorFlow: lang === 'ru' ? '\u0412\u0438\u0434 \u0434\u043b\u044f \u0434\u043e\u043d\u043e\u0440\u0430' : lang === 'es' ? 'Vista donante' : 'Donor impact view',
    venueFlow: lang === 'ru' ? '\u041a\u0430\u0431\u0438\u043d\u0435\u0442 \u0442\u043e\u0447\u043a\u0438' : lang === 'es' ? 'Panel de sede' : 'Venue workspace',
    backToMap: lang === 'ru' ? '\u041a \u043a\u0430\u0440\u0442\u0435' : lang === 'es' ? 'Volver al mapa' : 'Back to map',
  }

  return (
    <div className="bg-[#070707] text-white min-h-screen">
      <MealNav lang={lang} />
      <section className="relative border-b border-white/[0.06] px-6 pt-16 pb-10">
        <div className="max-w-5xl mx-auto">
          <Link href={lp('/meal/map')} className="font-mono text-[11px] text-white/25 hover:text-[#E8855A] transition-colors mb-5 block">
            {x.backToMap}
          </Link>
          <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#4ECAA0] mb-3">{x.venueLabel}</p>
          <h1 className="font-bold text-[clamp(28px,4vw,42px)] tracking-tight text-white mb-2">{venue.name}</h1>
          <p className="text-[14px] text-white/40">{venue.neighborhood}, {venue.city}, {venue.country}</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-1 xl:grid-cols-[1.35fr_1fr] gap-6">
        <div className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl p-6">
          <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/25 mb-4">{x.featuredMeal}</p>
          <div className="flex flex-col gap-3">
            <Row label={x.mealName} value={venue.featuredMeal.mealName} />
            <Row label={x.mealDescription} value={venue.featuredMeal.mealDescription} />
            <Row label={x.mealType} value={venue.featuredMeal.mealType} />
            <Row label={x.vegetarian} value={venue.featuredMeal.isVegetarian ? x.yes : x.no} />
            <Row label={x.spice} value={spiceLabel(lang, venue.featuredMeal.spiceLevel)} />
            <Row label={x.calories} value={String(venue.featuredMeal.caloriesApprox)} />
            <Row label={x.availableToday} value={venue.featuredMeal.availableToday ? x.yes : x.no} />
            <Row label={x.portion} value={venue.featuredMeal.portionLabel} />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl p-5">
            <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/25 mb-3">{x.region}</p>
            <p className="text-[14px] text-white/80 mb-1">{region?.name ?? venue.regionName}</p>
            <p className="font-mono text-[11px] text-white/35 mb-4">{region?.country ?? venue.country}</p>
            <Link href={lp(`/meal/regions/${venue.regionSlug}`)} className="inline-flex items-center gap-2 text-[13px] text-[#E8855A]/70 hover:text-[#E8855A] transition-colors">
              <span>{m.viewRegion}</span>
              <ArrowIcon />
            </Link>
          </div>
          <div className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl p-5">
            <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/25 mb-3">{x.address}</p>
            <p className="text-[13px] text-white/65 leading-relaxed">{venue.address}</p>
          </div>
          <div className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl p-5">
            <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/25 mb-3">MEAL APP</p>
            <div className="flex flex-col gap-2.5">
              <Link href={lp('/meal/app/participant')} className="text-[13px] text-white/65 hover:text-white/90 transition-colors">{x.recipientFlow}</Link>
              <Link href={lp('/meal/app/partner')} className="text-[13px] text-white/65 hover:text-white/90 transition-colors">{x.donorFlow}</Link>
              <Link href={lp('/meal/app/venue')} className="text-[13px] text-white/65 hover:text-white/90 transition-colors">{x.venueFlow}</Link>
            </div>
          </div>
          <Link href={lp(`/meal/donate?region=${venue.regionSlug}`)} className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#E8855A] text-[#0D0805] font-semibold text-[14px] hover:bg-[#f0966e] transition-all duration-200">
            <span>{m.ctaDonate}</span>
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[140px_1fr] gap-3 items-start">
      <p className="font-mono text-[11px] text-white/30">{label}</p>
      <p className="text-[13px] text-white/75 leading-relaxed">{value}</p>
    </div>
  )
}

function ArrowIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
      <path d="M2 5.5h7M6 2.5l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

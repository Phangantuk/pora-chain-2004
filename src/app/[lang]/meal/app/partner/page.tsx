import type { Metadata } from 'next'
import Link from 'next/link'
import { isValidLang, type Lang } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const title = lang === 'ru' ? 'MEAL: Партнёрский кабинет' : lang === 'es' ? 'MEAL: Panel de socios' : 'MEAL: Partner workspace'
  return { title, description: title }
}

export default function MealAppPartnerPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const lp = (path: string) => `/${lang}${path}`

  const copy = {
    tag: lang === 'ru' ? 'MEAL APP' : lang === 'es' ? 'MEAL APP' : 'MEAL APP',
    title: lang === 'ru' ? 'Партнёрский кабинет' : lang === 'es' ? 'Panel de socios' : 'Partner workspace',
    desc:
      lang === 'ru'
        ? 'Раздел для партнёрских организаций: управление площадками, статусами поставок и отчётами по региону.'
        : lang === 'es'
          ? 'Espacio para organizaciones socias: gestión de sedes, estado de entregas e informes regionales.'
          : 'Workspace for partner organizations: manage venues, delivery status, and regional reports.',
    note: lang === 'ru' ? 'В разработке' : lang === 'es' ? 'En desarrollo' : 'In development',
    back: lang === 'ru' ? 'Вернуться в MEAL app' : lang === 'es' ? 'Volver a MEAL app' : 'Back to MEAL app',
  }

  return (
    <section className="px-6 py-12 md:py-14">
      <div className="max-w-3xl mx-auto rounded-2xl border border-white/[0.07] bg-[#0C0C0E] p-7 md:p-8">
        <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#E8855A] mb-3">{copy.tag}</p>
        <h1 className="font-bold text-[clamp(24px,4vw,34px)] tracking-tight text-white mb-3">{copy.title}</h1>
        <p className="text-[14px] text-white/45 leading-relaxed mb-6">{copy.desc}</p>
        <div className="inline-flex items-center rounded-full border border-[#E8855A]/30 bg-[#E8855A]/10 px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] uppercase text-[#E8855A] mb-7">
          {copy.note}
        </div>
        <div>
          <Link href={lp('/meal/app/dashboard')} className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] px-4 py-2 text-[13px] text-white/65 hover:text-white/90 transition-colors">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M10.2 6.5H2.8m0 0 2.4-2.4M2.8 6.5l2.4 2.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            {copy.back}
          </Link>
        </div>
      </div>
    </section>
  )
}

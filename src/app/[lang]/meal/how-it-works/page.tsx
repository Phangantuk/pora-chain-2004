import Link from 'next/link'
import { getT, isValidLang, type Lang } from '@/lib/i18n'
import { getExtraT } from '@/lib/i18n/extra'
import { MealNav } from '@/components/meal/MealNav'

export default function HowItWorksPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? params.lang as Lang : 'en'
  const t = getT(lang)
  const xt = getExtraT(lang)
  const m = t.meal
  const lp = (p: string) => `/${lang}${p}`

  const steps = [
    { num: '01', title: xt.meal.step1Title, body: xt.meal.step1Desc },
    { num: '02', title: xt.meal.step2Title, body: xt.meal.step2Desc },
    { num: '03', title: xt.meal.step3Title, body: xt.meal.step3Desc },
    { num: '04', title: xt.meal.step4Title, body: xt.meal.step4Desc },
    { num: '05', title: xt.meal.step5Title, body: xt.meal.step5Desc },
  ]

  return (
    <div className="bg-[#070707] text-white min-h-screen">
      <MealNav lang={lang} />
      <section className="relative border-b border-white/[0.06] px-6 pt-16 pb-12 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] pointer-events-none" style={{ background:'radial-gradient(ellipse at 50% 0%, rgba(232,133,90,0.06),transparent 65%)' }} />
        <div className="relative max-w-3xl mx-auto">
          <Link href={lp('/meal')} className="font-mono text-[11px] text-white/25 hover:text-[#E8855A] transition-colors mb-6 block">{m.backToMeal}</Link>
          <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#E8855A] mb-4">{xt.meal.howOverviewTag}</p>
          <h1 className="font-bold text-[clamp(32px,5vw,52px)] leading-[1.06] tracking-tight text-white mb-4">{m.howTitle}</h1>
          <p className="text-[16px] text-white/45 font-light leading-relaxed max-w-xl">{xt.meal.howLead}</p>
        </div>
      </section>
      <div className="max-w-3xl mx-auto px-6 py-16 flex flex-col gap-12">
        {steps.map(step => (
          <div key={step.num} className="flex gap-6">
            <span className="font-mono text-[11px] text-[#E8855A]/40 mt-1 shrink-0 w-8">{step.num}</span>
            <div className="flex-1">
              <h2 className="font-bold text-[20px] text-white mb-3 tracking-tight">{step.title}</h2>
              <p className="text-[14.5px] text-white/50 leading-relaxed font-light">{step.body}</p>
            </div>
          </div>
        ))}
        <div className="flex flex-wrap gap-3 pt-4">
          <Link href={lp('/meal/regions')} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E8855A] text-[#0D0805] font-semibold text-[14px] hover:bg-[#f0966e] transition-all duration-200">{m.ctaRegions}</Link>
          <Link href={lp('/meal/donate')} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/[0.1] text-white/60 font-medium text-[14px] hover:text-white hover:border-white/[0.2] transition-all duration-200">{m.ctaDonate}</Link>
        </div>
      </div>
    </div>
  )
}

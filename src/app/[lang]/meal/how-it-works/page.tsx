import Link from 'next/link'
import { getT, isValidLang, type Lang } from '@/lib/i18n'
import { MealNav } from '@/components/meal/MealNav'

export default function HowItWorksPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? params.lang as Lang : 'en'
  const t = getT(lang)
  const m = t.meal
  const lp = (p: string) => `/${lang}${p}`

  const steps = [
    { num:'01', title:'What is MEAL?', body:"MEAL (Meals Enabled and Logged) is the first applied product layer inside PORA. While PORA provides the verification infrastructure, MEAL provides the product experience: donors, regions, feeding events, and transparent records. Think of PORA as the protocol — MEAL as the application." },
    { num:'02', title:'How regions work', body:'A Region is a verified geographic area with active feeding programs. Each region has a named location, an active kitchen or mobile unit, a verified coordinator, a funding goal, and a public activity log. Donations are directed to specific regions — not a general pool.' },
    { num:'03', title:'How donations are directed', body:'You select a region, enter an amount, choose a payment method (USDT TRC20, ETH, or fiat), and confirm. Your donation is logged and directed to that region\'s coordinators, who use it to purchase ingredients and run their feeding program.' },
    { num:'04', title:'How transparency works', body:'Every feeding event is submitted by the region coordinator and reviewed by two independent validators. Once approved, the event becomes a permanent PORA record with: region, meal count, date, validator signature, and verification status. All records are public and queryable.' },
    { num:'05', title:'MEAL and PORA', body:'MEAL sits on top of PORA as a product application. PORA is the protocol layer — events, validators, records, API. MEAL is the application layer — regions, donations, dashboard, explorer. Future products (Proof of Shelter, Proof of Medicine) will use the same protocol infrastructure.' },
  ]

  return (
    <div className="bg-[#070707] text-white min-h-screen">
      <MealNav lang={lang} />
      <section className="relative border-b border-white/[0.06] px-6 pt-16 pb-12 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] pointer-events-none" style={{ background:'radial-gradient(ellipse at 50% 0%, rgba(232,133,90,0.06),transparent 65%)' }} />
        <div className="relative max-w-3xl mx-auto">
          <Link href={lp('/meal')} className="font-mono text-[11px] text-white/25 hover:text-[#E8855A] transition-colors mb-6 block">{m.backToMeal}</Link>
          <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#E8855A] mb-4">Product overview</p>
          <h1 className="font-bold text-[clamp(32px,5vw,52px)] leading-[1.06] tracking-tight text-white mb-4">{m.howTitle}</h1>
          <p className="text-[16px] text-white/45 font-light leading-relaxed max-w-xl">MEAL is a structured humanitarian feeding product built on top of the PORA verification protocol.</p>
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

import Link from 'next/link'
import { SectionHeader, StatItem, Badge, Card } from '@/components/ui'
import { type Lang } from '@/lib/i18n'
import { getExtraT } from '@/lib/i18n/extra'

type UseCaseIcon = 'meal' | 'shelter' | 'medicine' | 'education'

function UseCaseGlyph({ icon }: { icon: UseCaseIcon }) {
  if (icon === 'meal') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M6 3v7M9 3v7M14 3v4a2 2 0 0 0 4 0V3M6 10v11M9 10v11M16 10v11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    )
  }
  if (icon === 'shelter') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 10 12 4l8 6v9a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-9Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    )
  }
  if (icon === 'medicine') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M12 9v6M9 12h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    )
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 8.5 12 5l8 3.5-8 3.5-8-3.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M8.5 11.2V15c0 1.5 1.6 2.8 3.5 2.8s3.5-1.3 3.5-2.8v-3.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

export function HowItWorks({ lang = 'en' }: { lang?: Lang }) {
  const xt = getExtraT(lang)
  const s = xt.sections

  const HOW_STEPS = [
    { num: s.step1Num, title: s.step1Title, body: s.step1Body },
    { num: s.step2Num, title: s.step2Title, body: s.step2Body },
    { num: s.step3Num, title: s.step3Title, body: s.step3Body },
  ]

  return (
    <section className="px-6 lg:px-12 py-24 max-w-[1200px] mx-auto">
      <SectionHeader tag={s.howTag} title={s.howTitle} subtitle={s.howSubtitle} />

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 border border-white/[0.07] rounded-2xl overflow-hidden divide-x divide-white/[0.07]">
        {HOW_STEPS.map((step) => (
          <div key={step.num} className="bg-surface hover:bg-surface-2 transition-colors p-10">
            <div className="flex items-center gap-2 mb-5">
              <span className="font-mono-pora text-[11px] tracking-[0.1em] text-amber">{step.num}</span>
              <div className="flex-1 h-px bg-amber/20" />
            </div>
            <h3 className="font-display text-[20px] font-bold text-ink-primary mb-3">{step.title}</h3>
            <p className="text-[14px] text-ink-secondary leading-[1.65]">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function StatsBar({ lang = 'en' }: { lang?: Lang }) {
  const s = getExtraT(lang).sections
  const STATS = [
    { num: '12', suffix: 'K+', label: s.statsVerified },
    { num: '840', suffix: 'K', label: s.statsMeals },
    { num: '28', suffix: '', label: s.statsCountries },
    { num: '140', suffix: '+', label: s.statsOrganizations },
  ]

  return (
    <div className="border-t border-b border-white/[0.07] bg-surface py-12 px-6 lg:px-12">
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-4 border border-white/[0.07] rounded-xl overflow-hidden divide-x divide-y divide-white/[0.07]">
        {STATS.map((stat) => (
          <StatItem key={stat.label} num={stat.num} suffix={stat.suffix} label={stat.label} />
        ))}
      </div>
    </div>
  )
}

export function UseCasesPreview({ lang = 'en' }: { lang?: Lang }) {
  const xt = getExtraT(lang)
  const s = xt.sections
  const uc = xt.useCases
  const lp = (path: string) => `/${lang}${path}`

  const USE_CASES = [
    {
      icon: 'meal' as const,
      badge: 'live' as const,
      badgeTxt: uc.liveFirst,
      title: uc.mealTitle,
      desc: uc.mealDesc,
      href: lp('/proof-of-meal'),
      accent: true,
    },
    {
      icon: 'shelter' as const,
      badge: 'planned' as const,
      badgeTxt: uc.planned,
      title: uc.shelterTitle,
      desc: uc.shelterDesc,
      href: lp('/future'),
      accent: false,
    },
    {
      icon: 'medicine' as const,
      badge: 'planned' as const,
      badgeTxt: uc.planned,
      title: uc.medicineTitle,
      desc: uc.medicineDesc,
      href: lp('/future'),
      accent: false,
    },
    {
      icon: 'education' as const,
      badge: 'planned' as const,
      badgeTxt: uc.planned,
      title: uc.educationTitle,
      desc: uc.educationDesc,
      href: lp('/future'),
      accent: false,
    },
  ]

  return (
    <section className="px-6 lg:px-12 py-24 max-w-[1200px] mx-auto">
      <SectionHeader tag={s.useCasesTag} title={s.useCasesTitle} subtitle={s.useCasesSubtitle} />

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4">
        {USE_CASES.map((item) => (
          <Card key={item.title} accent={item.accent} hover className="p-9">
            <div className="w-11 h-11 rounded-[10px] bg-amber-dim border border-amber/20 flex items-center justify-center text-amber mb-5">
              <UseCaseGlyph icon={item.icon} />
            </div>
            <div className="mb-3">
              <Badge variant={item.badge}>{item.badgeTxt}</Badge>
            </div>
            <h3 className="font-display text-[22px] font-bold text-ink-primary mb-2.5">{item.title}</h3>
            <p className="text-[14px] text-ink-secondary leading-[1.65] mb-6">{item.desc}</p>
            <Link
              href={item.href}
              className="font-mono-pora text-[12px] text-amber tracking-[0.06em] flex items-center gap-1.5 hover:opacity-80 transition-opacity no-underline"
            >
              {item.accent ? uc.mealCta : s.learnMore}
            </Link>
          </Card>
        ))}
      </div>
    </section>
  )
}

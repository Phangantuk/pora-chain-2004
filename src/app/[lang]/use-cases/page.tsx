import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionHeader, Badge, Card } from '@/components/ui'
import { isValidLang, type Lang } from '@/lib/i18n'
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

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const uc = getExtraT(lang).useCases
  return { title: uc.tag, description: uc.subtitle }
}

export default function UseCasesPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const uc = getExtraT(lang).useCases
  const lp = (path: string) => `/${lang}${path}`
  const compactRu = lang === 'ru'

  const USE_CASES = [
    {
      icon: 'meal' as const,
      badge: 'live' as const,
      badgeTxt: uc.liveFirst,
      title: uc.mealTitle,
      desc: uc.mealDesc,
      detail: uc.mealDetail,
      href: lp('/meal'),
      ctaLabel: uc.mealCta,
      accent: true,
      live: true,
    },
    {
      icon: 'shelter' as const,
      badge: 'planned' as const,
      badgeTxt: uc.planned,
      title: uc.shelterTitle,
      desc: uc.shelterDesc,
      detail: uc.shelterDetail,
      href: lp('/future'),
      accent: false,
      live: false,
    },
    {
      icon: 'medicine' as const,
      badge: 'planned' as const,
      badgeTxt: uc.planned,
      title: uc.medicineTitle,
      desc: uc.medicineDesc,
      detail: uc.medicineDetail,
      href: lp('/future'),
      accent: false,
      live: false,
    },
    {
      icon: 'education' as const,
      badge: 'planned' as const,
      badgeTxt: uc.planned,
      title: uc.educationTitle,
      desc: uc.educationDesc,
      detail: uc.educationDetail,
      href: lp('/future'),
      accent: false,
      live: false,
    },
  ]

  return (
    <>
      <section className="bg-surface/50 border-b border-white/[0.07] px-6 lg:px-12 pt-32 pb-16">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader tag={uc.tag} title={uc.title} subtitle={uc.subtitle} />
        </div>
      </section>

      <section className="px-6 lg:px-12 py-24 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {USE_CASES.map((item) => (
            <Card key={item.title} accent={item.accent} className="p-9 flex flex-col">
              <div className="w-11 h-11 rounded-[10px] bg-amber-dim border border-amber/20 flex items-center justify-center text-amber mb-5">
                <UseCaseGlyph icon={item.icon} />
              </div>
              <Badge variant={item.badge}>{item.badgeTxt}</Badge>
              <h3 className={compactRu ? 'font-display text-[20px] font-bold text-ink-primary mt-3 mb-2.5 leading-tight' : 'font-display text-[22px] font-bold text-ink-primary mt-3 mb-2.5'}>
                {item.title}
              </h3>
              <p className={compactRu ? 'text-[13.5px] text-ink-secondary leading-[1.65] mb-4' : 'text-[14px] text-ink-secondary leading-[1.65] mb-4'}>
                {item.desc}
              </p>
              <p className="text-[13px] text-ink-tertiary leading-[1.6] mb-6 flex-1">{item.detail}</p>
              <Link
                href={item.href}
                className={`font-mono-pora text-[12px] tracking-[0.06em] flex items-center gap-1.5 transition-colors no-underline ${
                  item.live ? 'text-amber hover:opacity-80' : 'text-ink-tertiary hover:text-ink-secondary'
                }`}
              >
                {item.live ? item.ctaLabel : uc.viewImpl}
              </Link>
            </Card>
          ))}
        </div>

        <div className="mt-10 border border-dashed border-white/[0.14] rounded-2xl p-10 text-center">
          <h3 className="font-display text-[22px] font-bold text-ink-primary mb-3">{uc.buildTitle}</h3>
          <p className="text-[15px] text-ink-secondary max-w-[520px] mx-auto mb-6 font-light">{uc.buildDesc}</p>
          <Link
            href={lp('/developers')}
            className="font-mono-pora text-[12px] text-amber tracking-[0.06em] hover:opacity-80 transition-opacity"
          >
            {uc.docsCta}
          </Link>
        </div>
      </section>
    </>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionHeader, Badge, Card } from '@/components/ui'
import { isValidLang, type Lang } from '@/lib/i18n'
import { getExtraT } from '@/lib/i18n/extra'

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const uc = getExtraT(lang).useCases
  return { title: uc.tag, description: uc.subtitle }
}

export default function UseCasesPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const uc = getExtraT(lang).useCases
  const lp = (path: string) => `/${lang}${path}`

  const USE_CASES = [
    {
      icon: '🍽',
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
      icon: '🏠',
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
      icon: '💊',
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
      icon: '📚',
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
              <div className="w-11 h-11 rounded-[10px] bg-amber-dim border border-amber/20 flex items-center justify-center text-[20px] mb-5">
                {item.icon}
              </div>
              <Badge variant={item.badge}>{item.badgeTxt}</Badge>
              <h3 className="font-display text-[22px] font-bold text-ink-primary mt-3 mb-2.5">{item.title}</h3>
              <p className="text-[14px] text-ink-secondary leading-[1.65] mb-4">{item.desc}</p>
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

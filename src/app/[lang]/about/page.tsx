import type { Metadata } from 'next'
import { SectionHeader } from '@/components/ui'
import { getT, isValidLang, type Lang } from '@/lib/i18n'
import { getExtraT } from '@/lib/i18n/extra'

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  return { title: getT(lang).nav.about, description: getExtraT(lang).about.subtitle }
}

export default function AboutPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const xt = getExtraT(lang)
  const about = xt.about

  const PRINCIPLES = [
    { title: about.principle1Title, desc: about.principle1Desc },
    { title: about.principle2Title, desc: about.principle2Desc },
    { title: about.principle3Title, desc: about.principle3Desc },
    { title: about.principle4Title, desc: about.principle4Desc },
  ]

  return (
    <>
      <section className="bg-surface/50 border-b border-white/[0.07] px-6 lg:px-12 pt-32 pb-16">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader tag={about.tag} title={about.title} subtitle={about.subtitle} />
        </div>
      </section>

      <section className="px-6 lg:px-12 py-24 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-3">
            <p className="text-[15px] text-ink-secondary leading-[1.8] mb-5 font-light">{about.p1}</p>
            <p className="text-[15px] text-ink-secondary leading-[1.8] mb-5 font-light">{about.p2}</p>
            <p className="text-[15px] text-ink-secondary leading-[1.8] mb-5 font-light">{about.p3}</p>
            <p className="text-[15px] text-ink-secondary leading-[1.8] font-light">{about.p4}</p>
          </div>

          <div className="lg:col-span-2">
            <h2 className="font-display text-[20px] font-bold text-ink-primary mb-4">{about.principlesTitle}</h2>
            <div className="flex flex-col gap-3">
              {PRINCIPLES.map((item) => (
                <div key={item.title} className="bg-surface border border-white/[0.07] rounded-xl p-6">
                  <h4 className="font-display text-[15px] font-semibold text-ink-primary mb-2">{item.title}</h4>
                  <p className="text-[13px] text-ink-secondary leading-[1.6]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.07] bg-surface/50 px-6 lg:px-12 py-20">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-display text-[24px] font-bold text-ink-primary mb-10 tracking-tight">{about.founderTitle}</h2>
          <div className="bg-surface border border-white/[0.07] rounded-2xl p-8 w-full max-w-[320px]">
            <div className="w-16 h-16 rounded-full bg-surface-3 border border-white/[0.07] flex items-center justify-center mb-4 text-ink-tertiary">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
                <circle cx="14" cy="9.5" r="4.2" stroke="currentColor" strokeWidth="1.4" />
                <path d="M5.5 23c0-4.2 3.7-7.2 8.5-7.2s8.5 3 8.5 7.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="font-display text-[17px] font-bold text-ink-primary mb-1">{about.founderName}</h3>
            <p className="font-mono-pora text-[11px] text-ink-tertiary mb-4">{about.founderOrg}</p>
            <p className="text-[13px] text-ink-secondary leading-[1.65]">{about.founderDesc}</p>
          </div>
        </div>
      </section>
    </>
  )
}

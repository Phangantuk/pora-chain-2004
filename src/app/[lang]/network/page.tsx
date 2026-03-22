import type { Metadata } from 'next'
import { SectionHeader } from '@/components/ui'
import { getT, isValidLang, type Lang } from '@/lib/i18n'
import { getExtraT } from '@/lib/i18n/extra'

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  return { title: getT(lang).nav.network, description: getExtraT(lang).network.subtitle }
}

export default function NetworkPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const network = getExtraT(lang).network

  const ROLES = [
    { num: network.role01, title: network.validators, body: network.validatorsDesc },
    { num: network.role02, title: network.participants, body: network.participantsDesc },
    { num: network.role03, title: network.organizations, body: network.organizationsDesc },
  ]

  return (
    <>
      <section className="bg-surface/50 border-b border-white/[0.07] px-6 lg:px-12 pt-32 pb-16">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader tag={network.tag} title={network.title} subtitle={network.subtitle} />
        </div>
      </section>

      <section className="px-6 lg:px-12 py-24 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {ROLES.map((role) => (
            <div key={role.num} className="bg-surface border border-white/[0.07] rounded-2xl p-8 hover:border-white/[0.14] transition-colors">
              <p className="font-mono-pora text-[10px] tracking-[0.12em] uppercase text-ink-tertiary mb-4">{role.num}</p>
              <h3 className="font-display text-[18px] font-bold text-ink-primary mb-3">{role.title}</h3>
              <p className="text-[13.5px] text-ink-secondary leading-[1.65]">{role.body}</p>
            </div>
          ))}
        </div>

        <div className="bg-surface border border-white/[0.07] rounded-2xl p-6 lg:p-10 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
          <div>
            <h3 className="font-display text-[20px] font-bold text-ink-primary mb-3">{network.scaleTitle}</h3>
            <p className="text-[14px] text-ink-secondary leading-[1.7]">{network.scaleDesc}</p>
          </div>
          <div>
            <h3 className="font-display text-[20px] font-bold text-ink-primary mb-3">{network.observerTitle}</h3>
            <p className="text-[14px] text-ink-secondary leading-[1.7]">{network.observerDesc}</p>
          </div>
        </div>
      </section>
    </>
  )
}

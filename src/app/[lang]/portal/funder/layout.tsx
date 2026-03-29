import Link from 'next/link'
import { isValidLang, type Lang } from '@/lib/i18n'
import { FUNDING_MODEL, FUNDING_POOL, formatCurrency, getFunderCopy } from '@/lib/portal/funder'

export default function FunderLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const c = getFunderCopy(lang)
  const lp = (path: string) => `/${lang}${path}`

  const tabs = [
    { label: c.navOverview, href: lp('/portal/funder/overview') },
    { label: c.navSettlements, href: lp('/portal/funder/settlements') },
    { label: c.navStatements, href: lp('/portal/funder/statements') },
    { label: c.navVenues, href: lp('/portal/funder/venues') },
    { label: c.navActivity, href: lp('/portal/funder/activity') },
    { label: c.navExceptions, href: lp('/portal/funder/exceptions') },
    { label: c.navDocuments, href: lp('/portal/funder/documents') },
  ]

  return (
    <div className="p-8">
      <div className="rounded-2xl border border-white/[0.07] bg-[#0C0C0E] overflow-hidden mb-6">
        <div className="px-6 py-5 border-b border-white/[0.06]">
          <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#E8855A] mb-2">PORA / Portal</p>
          <h1 className="font-bold text-[26px] text-white mb-2">{c.cabinetTitle}</h1>
          <p className="text-[14px] text-white/45 max-w-3xl">{c.cabinetSub}</p>
        </div>
        <div className="px-6 py-4 border-b border-white/[0.06] bg-white/[0.01] flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className="px-3 py-1.5 rounded-lg text-[12px] border border-white/[0.08] text-white/60 hover:text-white hover:border-white/[0.18] transition-colors"
            >
              {tab.label}
            </Link>
          ))}
        </div>
        <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-[12px]">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.01] px-4 py-3 text-white/65">
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/25 block mb-1">{c.modelTitle}</span>
            {FUNDING_MODEL.fundsInAdvance}
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.01] px-4 py-3 text-white/65">
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/25 block mb-1">{c.thaiRecipient}</span>
            {FUNDING_MODEL.payoutModel}
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.01] px-4 py-3 text-white/65">
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/25 block mb-1">{c.operationalFeeLabel}</span>
            {formatCurrency(FUNDING_POOL.currentBalance, lang)} remaining in current reporting pool.
          </div>
        </div>
      </div>

      {children}
    </div>
  )
}

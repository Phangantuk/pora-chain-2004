import Link from 'next/link'
import { LogoMark } from '@/components/ui/LogoMark'
import { isValidLang, type Lang } from '@/lib/i18n'
import { getExtraT } from '@/lib/i18n/extra'

export default function PortalLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const xt = getExtraT(lang)
  const lp = (path: string) => `/${params.lang}${path}`
  const funderLabel =
    lang === 'ru'
      ? '\u041a\u0430\u0431\u0438\u043d\u0435\u0442 \u0444\u043e\u043d\u0434\u0430'
      : lang === 'es'
        ? 'Cabinete financiador'
        : 'Funder Cabinet'
  const venuesLabel =
    lang === 'ru'
      ? '\u0418\u043d\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044f \u0442\u043e\u0447\u0435\u043a'
      : lang === 'es'
        ? 'Integracion de sedes'
        : 'Venue Integration'
  const sidebarLinks = [
    { label: xt.portalLayout.dashboard, href: lp('/portal/dashboard') },
    { label: xt.portalLayout.validator, href: lp('/portal/validator') },
    { label: venuesLabel, href: lp('/portal/venues/overview') },
    { label: funderLabel, href: lp('/portal/funder/overview') },
    { label: xt.portalLayout.mealDashboard, href: lp('/meal/app/dashboard') },
    { label: xt.portalLayout.backToSite, href: lp('/') },
  ]

  return (
    <div className="flex h-screen overflow-hidden pt-16">
      <aside className="w-52 shrink-0 bg-surface border-r border-white/[0.07] flex flex-col overflow-y-auto">
        <div className="p-5 border-b border-white/[0.07]">
          <div className="flex items-center gap-2 mb-1">
            <LogoMark size={22} />
            <span className="font-mono-pora text-[13px] font-medium">{xt.portalLayout.title}</span>
          </div>
          <p className="font-mono-pora text-[9px] text-ink-tertiary tracking-[0.1em] uppercase">
            {xt.portalLayout.subtitle}
          </p>
        </div>
        <nav className="p-4 flex flex-col gap-0.5">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 rounded-lg text-[13px] text-ink-secondary hover:text-ink-primary hover:bg-white/[0.05] transition-colors leading-snug break-words"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex-1 overflow-y-auto bg-black">{children}</div>
    </div>
  )
}

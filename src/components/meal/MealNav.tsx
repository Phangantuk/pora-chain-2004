'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import { type Lang, getT } from '@/lib/i18n'

export function MealNav({ lang }: { lang: Lang }) {
  const pathname = usePathname()
  const m  = getT(lang).meal
  const lp = (path: string) => `/${lang}${path}`

  const NAV = [
    { label: m.navOverview, href: lp('/meal') },
    { label: m.navRegions,  href: lp('/meal/regions') },
    { label: m.ctaDonate,   href: lp('/meal/donate') },
    { label: m.navExplorer, href: lp('/meal/explorer') },
    { label: m.ctaOpenApp,  href: lp('/meal/dashboard') },
  ]

  return (
    <div className="border-b border-white/[0.06] bg-[#0A0A0B] px-6 sticky top-16 z-40">
      <div className="max-w-5xl mx-auto flex items-center gap-0 overflow-x-auto">
        <span className="font-mono text-[11px] font-semibold text-[#E8855A] tracking-[0.1em] uppercase mr-5 shrink-0 py-3.5">
          {m.navLabel}
        </span>
        {NAV.map((link) => {
          const active =
            pathname === link.href ||
            (link.href !== lp('/meal') && pathname.startsWith(link.href))
          return (
            <Link key={link.href} href={link.href}
              className={clsx(
                'font-body text-[13px] px-4 py-3.5 border-b-2 whitespace-nowrap transition-colors',
                active
                  ? 'border-[#E8855A] text-white'
                  : 'border-transparent text-white/40 hover:text-white/70',
              )}>
              {link.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogoMark } from '@/components/ui/LogoMark'
import { SUPPORTED_LANGS, type Lang } from '@/lib/i18n'

function useLang(): Lang {
  const pathname = usePathname()
  const seg = pathname.split('/')[1] as Lang
  return SUPPORTED_LANGS.includes(seg) ? seg : 'en'
}

export function Footer() {
  const lang = useLang()
  const lp = (p: string) => `/${lang}${p}`

  const FOOTER_LINKS = {
    Protocol: [
      { label: 'Overview',      href: lp('/protocol') },
      { label: 'Use Cases',     href: lp('/use-cases') },
      { label: 'Proof of Meal', href: lp('/proof-of-meal') },
      { label: 'Future Modules',href: lp('/future') },
    ],
    MEAL: [
      { label: 'Overview',    href: lp('/meal') },
      { label: 'Regions',     href: lp('/meal/regions') },
      { label: 'Donate',      href: lp('/meal/donate') },
      { label: 'Explorer',    href: lp('/meal/explorer') },
    ],
    Portal: [
      { label: 'Enter Portal',     href: lp('/portal') },
      { label: 'Transparency',     href: lp('/transparency') },
      { label: 'Validator Access', href: lp('/portal/validator') },
      { label: 'Organizations',    href: lp('/portal/org') },
    ],
    More: [
      { label: 'Developers', href: lp('/developers') },
      { label: 'About',      href: lp('/about') },
      { label: 'Donate',     href: lp('/donate') },
      { label: 'Explorer',   href: lp('/explorer') },
    ],
  }

  return (
    <footer className="border-t border-white/[0.07] px-6 lg:px-12 pt-12 pb-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 mb-10">
          <div className="col-span-2 lg:col-span-1">
            <Link href={lp('/')} className="flex items-center gap-2.5 mb-4 no-underline w-fit">
              <LogoMark />
              <span className="font-display text-[15px] font-bold text-ink-primary">PORA</span>
            </Link>
            <p className="text-[13px] text-ink-tertiary leading-relaxed max-w-[220px]">
              Proof of Real Action — open infrastructure for verifiable real-world impact.
            </p>
          </div>
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h5 className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink-tertiary mb-4">{category}</h5>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[13px] text-ink-secondary hover:text-ink-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-6 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[11px] text-ink-tertiary">© 2025 PORA Protocol Foundation. Open source.</p>
          <p className="font-mono text-[11px] text-amber/60">Proof of Real Action</p>
        </div>
      </div>
    </footer>
  )
}

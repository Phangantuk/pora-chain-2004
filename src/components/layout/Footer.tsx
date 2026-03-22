'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogoMark } from '@/components/ui/LogoMark'
import { SUPPORTED_LANGS, type Lang } from '@/lib/i18n'
import { getExtraT } from '@/lib/i18n/extra'

function useLang(): Lang {
  const pathname = usePathname()
  const seg = pathname.split('/')[1] as Lang
  return SUPPORTED_LANGS.includes(seg) ? seg : 'en'
}

interface FooterProps {
  lang?: Lang
}

export function Footer({ lang: langProp }: FooterProps = {}) {
  const detectedLang = useLang()
  const lang = langProp ?? detectedLang
  const xt = getExtraT(lang)
  const compactRu = lang === 'ru'
  const lp = (p: string) => `/${lang}${p}`

  const FOOTER_LINKS = {
    [xt.footer.categoryProtocol]: [
      { label: xt.footer.overview,      href: lp('/protocol') },
      { label: xt.footer.useCases,      href: lp('/use-cases') },
      { label: xt.footer.proofOfMeal,   href: lp('/proof-of-meal') },
      { label: xt.footer.futureModules, href: lp('/future') },
    ],
    [xt.footer.categoryMeal]: [
      { label: xt.footer.overview, href: lp('/meal') },
      { label: xt.footer.regions,  href: lp('/meal/regions') },
      { label: xt.footer.donate,   href: lp('/meal/donate') },
      { label: xt.footer.explorer, href: lp('/meal/explorer') },
    ],
    [xt.footer.categoryPortal]: [
      { label: xt.footer.enterPortal,    href: lp('/portal') },
      { label: xt.footer.transparency,   href: lp('/transparency') },
      { label: xt.footer.validatorAccess, href: lp('/portal/validator') },
      { label: xt.footer.organizations,  href: lp('/portal/org') },
    ],
    [xt.footer.categoryMore]: [
      { label: xt.footer.developers, href: lp('/developers') },
      { label: xt.footer.about,      href: lp('/about') },
      { label: xt.footer.donate,     href: lp('/donate') },
      { label: xt.footer.explorer,   href: lp('/explorer') },
    ],
  }

  return (
    <footer className="border-t border-white/[0.07] px-6 lg:px-12 pt-12 pb-8">
      <div className="max-w-[1200px] mx-auto">
        <div className={`grid grid-cols-2 lg:grid-cols-5 mb-10 ${compactRu ? 'gap-6 lg:gap-8' : 'gap-8 lg:gap-10'}`}>
          <div className="col-span-2 lg:col-span-1">
            <Link href={lp('/')} className="flex items-center gap-2.5 mb-4 no-underline w-fit">
              <LogoMark />
              <span className="font-display text-[15px] font-bold text-ink-primary">PORA</span>
            </Link>
            <p className={`text-ink-tertiary max-w-[260px] ${compactRu ? 'text-[12px] leading-[1.55]' : 'text-[12.5px] leading-relaxed'}`}>
              {xt.footer.tagline}
            </p>
          </div>
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category} className="min-w-0">
              <h5
                className={[
                  'font-mono uppercase text-ink-tertiary mb-4 leading-snug break-words',
                  compactRu ? 'text-[9.5px] tracking-[0.09em]' : 'text-[10px] tracking-[0.12em]',
                ].join(' ')}
              >
                {category}
              </h5>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.href} className="min-w-0">
                    <Link
                      href={link.href}
                      className={[
                        'leading-snug text-ink-secondary hover:text-ink-primary transition-colors break-words',
                        compactRu ? 'text-[12px]' : 'text-[12.5px]',
                      ].join(' ')}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-6 border-t border-white/[0.07] flex flex-col sm:flex-row items-center sm:items-start justify-between gap-3">
          <p className={`font-mono text-ink-tertiary text-center sm:text-left ${compactRu ? 'text-[10.5px]' : 'text-[11px]'}`}>
            {xt.footer.copyright}
          </p>
          <p className={`font-mono text-amber/60 text-center sm:text-right ${compactRu ? 'text-[10.5px]' : 'text-[11px]'}`}>
            {xt.footer.brandLine}
          </p>
        </div>
      </div>
    </footer>
  )
}

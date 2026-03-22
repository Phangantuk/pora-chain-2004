'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { clsx } from 'clsx'
import { LogoMark } from '@/components/ui/LogoMark'
import { Button } from '@/components/ui/Button'
import { LangSwitcher } from '@/components/layout/LangSwitcher'
import { getT, type Lang } from '@/lib/i18n'
import { getExtraT } from '@/lib/i18n/extra'

interface NavProps {
  /** Current language passed from [lang]/layout.tsx */
  lang?: Lang
}

export function Nav({ lang = 'en' }: NavProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const t = getT(lang)
  const xt = getExtraT(lang)
  const compactForRu = lang === 'ru'

  const lp = (path: string) => `/${lang}${path}`

  const NAV_LINKS = [
    { label: t.nav.meal, href: lp('/meal'), highlight: true },
    { label: t.nav.protocol, href: lp('/protocol') },
    { label: t.nav.useCases, href: lp('/use-cases') },
    { label: t.nav.proofOfMeal, href: lp('/proof-of-meal') },
    { label: t.nav.network, href: lp('/network') },
    { label: t.nav.transparency, href: lp('/transparency') },
    { label: t.nav.futureModules, href: lp('/future') },
    { label: t.nav.developers, href: lp('/developers') },
    { label: t.nav.about, href: lp('/about') },
    { label: t.nav.donate, href: lp('/donate') },
    { label: t.nav.explorer, href: lp('/explorer') },
  ]

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 h-16',
        'flex items-center justify-between px-6 lg:px-10',
        'border-b border-white/[0.07]',
        'bg-black/85 backdrop-blur-xl',
      )}
    >
      <Link href={lp('/')} className="flex items-center gap-2.5 no-underline shrink-0">
        <LogoMark />
        <span className="font-display text-[15px] font-bold tracking-wide text-ink-primary">PORA</span>
      </Link>

      <nav className="hidden lg:flex items-center gap-0 overflow-x-auto min-w-0 pr-2">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={clsx(
              'font-body rounded-md transition-colors whitespace-nowrap',
              compactForRu ? 'text-[11px] px-2 py-1.5 leading-tight' : 'text-[13px] px-3 py-1.5',
              pathname === link.href
                ? 'text-ink-primary bg-white/[0.05]'
                : link.highlight
                  ? 'text-amber hover:text-amber/80 hover:bg-amber/[0.06] font-semibold'
                  : 'text-ink-secondary hover:text-ink-primary hover:bg-white/[0.05]',
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className={clsx('hidden lg:flex items-center', compactForRu ? 'gap-0.5' : 'gap-1')}>
        <LangSwitcher currentLang={lang} />
        <div className="w-px h-4 bg-white/[0.1] mx-2" />
        <Button href={lp('/developers')} variant="ghost" size="sm">
          {t.nav.docs}
        </Button>
        <Button
          href={lp('/portal')}
          variant="primary"
          size="sm"
          className={compactForRu ? 'max-w-[140px] whitespace-normal leading-tight text-center text-[12px] px-2.5' : ''}
        >
          {t.nav.enterPortal}
        </Button>
      </div>

      <button
        className="lg:hidden border border-white/[0.07] rounded-md px-2.5 py-1.5 text-ink-secondary"
        onClick={() => setOpen(!open)}
        aria-label={open ? xt.nav.menuClose : xt.nav.menuOpen}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path d="M3 5h12M3 9h12M3 13h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute top-16 left-0 right-0 bg-black/95 border-b border-white/[0.07] p-5 flex flex-col gap-1 lg:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-ink-secondary hover:text-ink-primary py-2.5 px-3 rounded-md hover:bg-white/[0.05] transition-colors break-words leading-snug"
            >
              {link.label}
            </Link>
          ))}

          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/[0.07] px-3">
            <span className="font-mono text-[10px] text-white/25 tracking-widest uppercase">{xt.nav.language}</span>
            <LangSwitcher currentLang={lang} />
          </div>
          <div className="flex gap-3 mt-2 pt-3 border-t border-white/[0.07]">
            <Button href={lp('/developers')} variant="ghost" size="sm" className="flex-1">
              {t.nav.docs}
            </Button>
            <Button href={lp('/portal')} variant="primary" size="sm" className="flex-1">
              {t.nav.enterPortal}
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

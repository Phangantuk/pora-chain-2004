import type { Metadata } from 'next'
import Link from 'next/link'
import { getT, isValidLang, type Lang } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = isValidLang(params.lang) ? params.lang as Lang : 'en'
  return { title: 'Portal', description: getT(lang).portal.metaDesc }
}

// ─── Role SVG illustrations ───────────────────────────────────────────────────
function IllustrationParticipant() {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="mb-5">
      <circle cx="30" cy="15" r="8" stroke="#E8855A" strokeWidth="1.4" fill="none" opacity="0.75"/>
      <path d="M15 48c0-8.284 6.716-15 15-15s15 6.716 15 15" stroke="#E8855A" strokeWidth="1.4" fill="none" opacity="0.4"/>
      <rect x="34" y="28" width="20" height="14" rx="2" stroke="#E8855A" strokeWidth="1.2" fill="rgba(232,133,90,0.08)"/>
      <path d="M44 33v6M41.5 35.5l2.5-3 2.5 3" stroke="#E8855A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="51" cy="26" r="5" fill="rgba(78,202,160,0.12)" stroke="#4ECAA0" strokeWidth="1.2"/>
      <path d="M48.5 26l2 2 3-3" stroke="#4ECAA0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
function IllustrationValidator() {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="mb-5">
      <path d="M30 6l17 5.5v13c0 9.5-7.5 17-17 21C20 41.5 13 34 13 24.5V11.5L30 6z" stroke="#E8855A" strokeWidth="1.4" fill="rgba(232,133,90,0.05)" opacity="0.9"/>
      <path d="M22 30l5 5 11-10" stroke="#4ECAA0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="36" y1="16" x2="48" y2="16" stroke="#E8855A" strokeWidth="1.1" opacity="0.4" strokeLinecap="round"/>
      <line x1="36" y1="20" x2="46" y2="20" stroke="#E8855A" strokeWidth="1.1" opacity="0.3" strokeLinecap="round"/>
      <line x1="36" y1="24" x2="43" y2="24" stroke="#E8855A" strokeWidth="1.1" opacity="0.2" strokeLinecap="round"/>
    </svg>
  )
}
function IllustrationOrganization() {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="mb-5">
      <rect x="16" y="18" width="28" height="34" rx="1.5" stroke="#E8855A" strokeWidth="1.4" fill="rgba(232,133,90,0.05)"/>
      <rect x="20" y="24" width="5" height="5" rx="0.5" fill="rgba(232,133,90,0.25)"/>
      <rect x="28" y="24" width="5" height="5" rx="0.5" fill="rgba(232,133,90,0.25)"/>
      <rect x="36" y="24" width="5" height="5" rx="0.5" fill="rgba(232,133,90,0.12)" stroke="#E8855A" strokeWidth="0.8"/>
      <rect x="20" y="32" width="5" height="5" rx="0.5" fill="rgba(232,133,90,0.12)" stroke="#E8855A" strokeWidth="0.8"/>
      <rect x="28" y="32" width="5" height="5" rx="0.5" fill="rgba(232,133,90,0.25)"/>
      <rect x="36" y="32" width="5" height="5" rx="0.5" fill="rgba(232,133,90,0.12)" stroke="#E8855A" strokeWidth="0.8"/>
      <rect x="27" y="42" width="6" height="10" rx="1" fill="rgba(232,133,90,0.18)" stroke="#E8855A" strokeWidth="1"/>
      <line x1="30" y1="8" x2="30" y2="18" stroke="#E8855A" strokeWidth="1.2" opacity="0.45"/>
      <path d="M30 8l8 4-8 4V8z" fill="rgba(78,202,160,0.2)" stroke="#4ECAA0" strokeWidth="1"/>
    </svg>
  )
}
function IllustrationObserver() {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="mb-5">
      <circle cx="27" cy="27" r="14" stroke="#E8855A" strokeWidth="1.4" fill="none" opacity="0.55"/>
      <line x1="13" y1="27" x2="41" y2="27" stroke="#E8855A" strokeWidth="0.9" opacity="0.25"/>
      <path d="M27 13c-3.5 4.5-5.5 9-5.5 14s2 9.5 5.5 14" stroke="#E8855A" strokeWidth="0.9" opacity="0.25"/>
      <path d="M27 13c3.5 4.5 5.5 9 5.5 14s-2 9.5-5.5 14" stroke="#E8855A" strokeWidth="0.9" opacity="0.25"/>
      <circle cx="41" cy="41" r="8" stroke="#E8855A" strokeWidth="1.4" fill="rgba(232,133,90,0.07)"/>
      <line x1="46.5" y1="46.5" x2="53" y2="53" stroke="#E8855A" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="41" cy="41" r="3" fill="rgba(78,202,160,0.4)" stroke="#4ECAA0" strokeWidth="1"/>
    </svg>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PortalPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? params.lang as Lang : 'en'
  const t  = getT(lang)
  const h  = t.home
  const p  = t.portal
  const lp = (path: string) => `/${lang}${path}`

  const ROLES = [
    {
      Illus:   IllustrationParticipant,
      eyebrow: p.participantEyebrow,
      title:   h.roleParticipant,
      desc:    p.participantDesc,
      href:    lp('/meal/register'),
      cta:     p.participantCta,
      primary: true,
      meta:    [p.participantMeta1, p.participantMeta2, p.participantMeta3],
      icons:   ['📤', '✓', '📊'],
    },
    {
      Illus:   IllustrationValidator,
      eyebrow: p.validatorEyebrow,
      title:   h.roleValidator,
      desc:    p.validatorDesc,
      href:    lp('/portal/validator'),
      cta:     p.validatorCta,
      primary: false,
      meta:    [p.validatorMeta1, p.validatorMeta2, p.validatorMeta3],
      icons:   ['🔍', '⚖', '📡'],
    },
    {
      Illus:   IllustrationOrganization,
      eyebrow: p.orgEyebrow,
      title:   h.roleOrg,
      desc:    p.orgDesc,
      href:    lp('/portal/org'),
      cta:     p.orgCta,
      primary: false,
      meta:    [p.orgMeta1, p.orgMeta2, p.orgMeta3],
      icons:   ['🏢', '📦', '🔑'],
    },
    {
      Illus:   IllustrationObserver,
      eyebrow: p.observerEyebrow,
      title:   h.roleObserver,
      desc:    p.observerDesc,
      href:    lp('/meal/explorer'),
      cta:     p.observerCta,
      primary: false,
      meta:    [p.observerMeta1, p.observerMeta2, p.observerMeta3],
      icons:   ['🌍', '🔎', '📂'],
    },
  ]

  const STACK = [
    { tag: p.stackAppTag,    label: p.stackAppLabel,    sub: p.stackAppSub,    opacity: 1 },
    { tag: p.stackProtoTag,  label: p.stackProtoLabel,  sub: p.stackProtoSub,  opacity: 0.55 },
    { tag: p.stackFutureTag, label: p.stackFutureLabel, sub: p.stackFutureSub, opacity: 0.28 },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#090909] border-b border-white/[0.07] px-6 lg:px-12 pt-32 pb-16 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(232,133,90,0.06), transparent 65%)' }} />
        <div className="relative max-w-[900px] mx-auto">
          <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] uppercase text-amber mb-5 px-3 py-1.5 rounded-full border border-amber/20 bg-amber/[0.06]">
            <span className="w-1.5 h-1.5 rounded-full bg-amber" />{p.heroTag}
          </span>
          <h1 className="font-display text-[clamp(36px,5vw,58px)] font-extrabold leading-[1.05] tracking-tight text-ink-primary mb-4">{p.heroTitle}</h1>
          <p className="text-[16px] text-ink-secondary max-w-[560px] mx-auto font-light leading-relaxed">{p.heroSub}</p>
        </div>
      </section>

      {/* Role cards */}
      <section className="px-6 lg:px-12 py-20 max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {ROLES.map(({ Illus, eyebrow, title, desc, href, cta, primary, meta, icons }) => (
            <div key={eyebrow} className={[
              'relative rounded-2xl border p-8 flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-0.5',
              primary
                ? 'border-amber/30 bg-gradient-to-br from-surface to-amber/[0.05] hover:border-amber/50 hover:shadow-[0_8px_32px_rgba(232,133,90,0.08)]'
                : 'border-white/[0.07] bg-surface hover:border-white/[0.14] hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)]',
            ].join(' ')}>
              {primary && <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber/50 to-transparent" />}
              <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-amber/70 mb-5">{eyebrow}</p>
              <Illus />
              <h3 className="font-display text-[20px] font-bold text-ink-primary mb-2">{title}</h3>
              <p className="text-[13.5px] text-ink-secondary leading-[1.65] mb-6 font-light">{desc}</p>
              <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                {meta.map((label, i) => (
                  <li key={label} className="flex items-center gap-3 text-[13px] text-ink-secondary">
                    <span className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[13px] shrink-0">{icons[i]}</span>
                    {label}
                  </li>
                ))}
              </ul>
              <Link href={href} className={[
                'inline-flex items-center justify-center gap-2 font-body font-semibold text-[14px] px-5 py-3 rounded-xl transition-all duration-200 no-underline',
                primary
                  ? 'bg-amber text-[#0D0805] hover:bg-[#F09068] hover:shadow-[0_8px_24px_rgba(232,133,90,0.3)] hover:-translate-y-px'
                  : 'bg-transparent text-ink-secondary border border-white/[0.07] hover:border-white/[0.14] hover:text-ink-primary',
              ].join(' ')}>
                {cta}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* MEAL product layer */}
      <section className="border-t border-white/[0.07] bg-[#090909] px-6 lg:px-12 py-16">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-amber mb-4 block">PORA × MEAL</span>
            <h2 className="font-display text-[clamp(22px,2.5vw,32px)] font-bold text-ink-primary mb-4 tracking-tight">
              {t.home.porTitle}
            </h2>
            <p className="text-[14.5px] text-ink-secondary font-light leading-relaxed mb-6">
              <strong className="text-ink-primary font-semibold">PORA</strong> — {t.home.step3Desc?.split('—')[0] ?? 'the verification protocol.'}{' '}
              <strong className="text-ink-primary font-semibold">MEAL</strong> — {t.meal.heroSub?.split('.')[0]}.
            </p>
            <div className="flex flex-col gap-2.5 mb-7">
              {[t.home.porPoint1, t.home.porPoint2, t.home.porPoint3].map(point => (
                <div key={point} className="flex items-center gap-3 text-[13px] text-ink-secondary font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber/60 shrink-0" />{point}
                </div>
              ))}
            </div>
            <Link href={lp('/meal')} className="inline-flex items-center gap-2 bg-amber text-[#0D0805] font-semibold text-[14px] px-6 py-3 rounded-xl hover:bg-[#F09068] hover:shadow-[0_8px_24px_rgba(232,133,90,0.3)] transition-all duration-200 no-underline">
              {t.meal.navLabel}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {STACK.map(({ tag, label, sub, opacity }) => (
              <div key={label} className="flex items-center gap-4 bg-[#0C0C0E] border border-white/[0.07] rounded-xl px-5 py-4" style={{ opacity }}>
                <div className="w-1 self-stretch rounded-full shrink-0 bg-amber" />
                <div>
                  <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-amber mb-1">{tag}</p>
                  <p className="font-semibold text-[14px] text-ink-primary">{label}</p>
                  <p className="font-mono text-[11px] text-ink-tertiary mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wallet section */}
      <section className="border-t border-white/[0.07] px-6 lg:px-12 py-14">
        <div className="max-w-[1100px] mx-auto text-center">
          <h3 className="font-display text-[20px] font-bold text-ink-primary mb-2">{p.walletTitle}</h3>
          <p className="text-[13.5px] text-ink-secondary mb-7 font-light">{p.walletSub}</p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {[{name:'MetaMask',icon:'🦊'},{name:'WalletConnect',icon:'🔗'},{name:'Coinbase Wallet',icon:'🔵'}].map(w => (
              <button key={w.name} className="bg-surface border border-white/[0.07] hover:border-white/[0.14] rounded-xl px-6 py-3.5 flex items-center gap-3 transition-colors cursor-pointer">
                <span className="text-[18px]">{w.icon}</span>
                <span className="text-[13.5px] text-ink-secondary font-medium">{w.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

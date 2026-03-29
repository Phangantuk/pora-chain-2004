import type { Metadata } from 'next'
import Link from 'next/link'
import { getT, isValidLang, type Lang } from '@/lib/i18n'
import { getExtraT } from '@/lib/i18n/extra'

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
  const xt = getExtraT(lang)
  const h  = t.home
  const m  = t.meal
  const p  = t.portal
  const lp = (path: string) => `/${lang}${path}`
  const compactRu = lang === 'ru'

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
      iconIds: ['send', 'check', 'chart'] as const,
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
      iconIds: ['search', 'scale', 'signal'] as const,
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
      iconIds: ['building', 'box', 'key'] as const,
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
      iconIds: ['globe', 'search', 'folder'] as const,
    },
  ]

  const STACK = [
    { tag: p.stackAppTag,    label: p.stackAppLabel,    sub: p.stackAppSub,    opacity: 1 },
    { tag: p.stackProtoTag,  label: p.stackProtoLabel,  sub: p.stackProtoSub,  opacity: 0.55 },
    { tag: p.stackFutureTag, label: p.stackFutureLabel, sub: p.stackFutureSub, opacity: 0.28 },
  ]

  const MEAL_PATHS = [
    { label: xt.portal.mealRegionsLabel, href: lp('/meal/regions'), note: xt.portal.mealRegionsNote },
    { label: xt.portal.mealDonateLabel, href: lp('/meal/donate'), note: xt.portal.mealDonateNote },
    { label: xt.portal.mealExplorerLabel, href: lp('/meal/explorer'), note: xt.portal.mealExplorerNote },
    { label: xt.portal.mealRegisterLabel, href: lp('/meal/register'), note: xt.portal.mealRegisterNote },
    { label: xt.portal.mealDashboardLabel, href: lp('/meal/app/dashboard'), note: xt.portal.mealDashboardNote },
  ]

  const MEAL_ROLE_PATHS = [
    {
      label: lang === 'ru' ? '\u0414\u043e\u043d\u043e\u0440' : lang === 'es' ? 'Donante' : 'Donor',
      href: lp('/meal/donate'),
      note: lang === 'ru' ? '\u041d\u0430\u043f\u0440\u0430\u0432\u043b\u044f\u0435\u0442 \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u0443 \u043f\u043e \u0440\u0435\u0433\u0438\u043e\u043d\u0430\u043c' : lang === 'es' ? 'Dirige apoyo por region' : 'Provides funding support by region',
    },
    {
      label: lang === 'ru' ? '\u0421\u0438\u0441\u0442\u0435\u043c\u0430' : lang === 'es' ? 'Sistema' : 'System',
      href: lp('/meal/app/admin'),
      note: lang === 'ru' ? '\u0424\u0438\u043a\u0441\u0438\u0440\u0443\u0435\u0442, \u0432\u0435\u0440\u0438\u0444\u0438\u0446\u0438\u0440\u0443\u0435\u0442 \u0438 \u0444\u043e\u0440\u043c\u0438\u0440\u0443\u0435\u0442 \u043e\u0442\u0447\u0435\u0442\u044b' : lang === 'es' ? 'Registra, verifica y reporta' : 'Records, verifies, and reports',
    },
    {
      label: lang === 'ru' ? '\u0422\u043e\u0447\u043a\u0430 \u0432\u044b\u0434\u0430\u0447\u0438' : lang === 'es' ? 'Sede participante' : 'Participating Venue',
      href: lp('/meal/app/venue'),
      note: lang === 'ru' ? '\u0420\u0430\u0441\u043f\u0440\u0435\u0434\u0435\u043b\u044f\u0435\u0442 \u043f\u0438\u0442\u0430\u043d\u0438\u0435 \u043f\u043e \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u043d\u044b\u043c \u0432\u044b\u0434\u0430\u0447\u0430\u043c' : lang === 'es' ? 'Distribuye comidas segun entregas confirmadas' : 'Distributes meals by confirmed issuance',
    },
    {
      label: lang === 'ru' ? '\u041f\u043e\u043b\u0443\u0447\u0430\u0442\u0435\u043b\u044c' : lang === 'es' ? 'Receptor' : 'Recipient',
      href: lp('/meal/app/participant'),
      note: lang === 'ru' ? '\u041f\u043e\u043b\u0443\u0447\u0430\u0435\u0442 \u043f\u043e\u043c\u043e\u0449\u044c \u0438 \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0430\u0435\u0442 \u0432\u044b\u0434\u0430\u0447\u0443' : lang === 'es' ? 'Recibe apoyo y confirma entrega' : 'Receives support and confirms service',
    },
  ]

  const MAP_PREVIEW_TITLE = lang === 'ru'
    ? '\u0411\u0443\u0434\u0443\u0449\u0430\u044f \u043c\u043e\u0434\u0435\u043b\u044c \u0432\u0437\u0430\u0438\u043c\u043e\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044f MEAL'
    : lang === 'es'
      ? 'Vista futura del mapa de interaccion MEAL'
      : 'Future MEAL interaction map'

  const MAP_PREVIEW_SUB = lang === 'ru'
    ? '\u041c\u043e\u0434\u0435\u043b\u044c MEAL: \u0414\u043e\u043d\u043e\u0440 \u2192 \u0421\u0438\u0441\u0442\u0435\u043c\u0430 \u2192 \u0422\u043e\u0447\u043a\u0430 \u0432\u044b\u0434\u0430\u0447\u0438 \u2192 \u041f\u043e\u043b\u0443\u0447\u0430\u0442\u0435\u043b\u044c. \u0421\u0438\u0441\u0442\u0435\u043c\u0430 \u043f\u0440\u043e\u0437\u0440\u0430\u0447\u043d\u043e \u0444\u0438\u043a\u0441\u0438\u0440\u0443\u0435\u0442, \u0432\u0435\u0440\u0438\u0444\u0438\u0446\u0438\u0440\u0443\u0435\u0442 \u0438 \u043e\u0442\u0447\u0438\u0442\u044b\u0432\u0430\u0435\u0442\u0441\u044f \u043f\u043e \u0441\u043e\u0431\u044b\u0442\u0438\u044f\u043c.'
    : lang === 'es'
      ? 'Modelo MEAL: Donante -> Sistema -> Sede -> Receptor. El sistema registra, verifica y reporta cada etapa.'
      : 'MEAL model: Donor -> System -> Venue -> Recipient. The system records, verifies, and reports each stage.'

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
          {ROLES.map(({ Illus, eyebrow, title, desc, href, cta, primary, meta, iconIds }) => (
            <div key={eyebrow} className={[
              'relative rounded-2xl border p-8 flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-0.5',
              primary
                ? 'border-amber/30 bg-gradient-to-br from-surface to-amber/[0.05] hover:border-amber/50 hover:shadow-[0_8px_32px_rgba(232,133,90,0.08)]'
                : 'border-white/[0.07] bg-surface hover:border-white/[0.14] hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)]',
            ].join(' ')}>
              {primary && <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber/50 to-transparent" />}
              <div className="absolute top-5 right-5">
                <span className={[
                  'font-mono text-[9px] tracking-[0.12em] uppercase px-2.5 py-1 rounded-full border',
                  primary
                    ? 'text-amber border-amber/25 bg-amber/[0.08]'
                    : 'text-ink-tertiary border-white/[0.07] bg-white/[0.03]',
                ].join(' ')}>
                  {href.replace(`/${lang}`, '')}
                </span>
              </div>
              <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-amber/70 mb-5">{eyebrow}</p>
              <Illus />
              <h3 className={`font-display font-bold text-ink-primary mb-2 leading-tight ${compactRu ? 'text-[18px]' : 'text-[20px]'}`}>{title}</h3>
              <p className={`text-ink-secondary mb-6 font-light ${compactRu ? 'text-[13px] leading-[1.7]' : 'text-[13.5px] leading-[1.65]'}`}>{desc}</p>
              <ul className={`grid grid-cols-1 gap-2.5 mb-8 flex-1 ${compactRu ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-3'}`}>
                {meta.map((label, i) => (
                  <li key={label} className={`flex items-center gap-3 text-ink-secondary rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-3 ${compactRu ? 'text-[12.5px] leading-snug' : 'text-[13px]'}`}>
                    <span className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[13px] shrink-0 text-amber">
                      <RoleMetaIcon kind={iconIds[i] ?? 'check'} />
                    </span>
                    <span className="leading-snug break-words">{label}</span>
                  </li>
                ))}
              </ul>
              <Link href={href} className={[
                'inline-flex items-center justify-center gap-2 font-body font-semibold px-5 py-3 rounded-xl transition-all duration-200 no-underline text-center whitespace-normal leading-snug',
                compactRu ? 'text-[13px] min-h-[46px]' : 'text-[14px]',
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

      <section className="px-6 lg:px-12 pb-20">
        <div className="max-w-[1100px] mx-auto rounded-2xl border border-white/[0.07] bg-[#0C0C0E] overflow-hidden">
          <div className="px-6 py-5 border-b border-white/[0.07] flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-amber/70 mb-2">{xt.portal.mealSectionTag}</p>
              <h2 className="font-display text-[22px] font-bold text-ink-primary">{xt.portal.mealSectionTitle}</h2>
            </div>
            <p className="text-[13px] text-ink-secondary font-light max-w-md">
              {xt.portal.mealSectionSub}
            </p>
          </div>
          <div className={`grid grid-cols-1 gap-px bg-white/[0.06] ${compactRu ? 'md:grid-cols-2 xl:grid-cols-5' : 'md:grid-cols-5'}`}>
            {MEAL_PATHS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="bg-[#0C0C0E] p-5 no-underline hover:bg-white/[0.02] transition-colors"
              >
                <p className={`font-semibold text-ink-primary mb-1.5 break-words ${compactRu ? 'text-[13px] leading-snug' : 'text-[14px]'}`}>{item.label}</p>
                <p className="font-mono text-[10px] text-amber/70 mb-3 break-all">{item.href.replace(`/${lang}`, '')}</p>
                <p className="text-[12.5px] text-ink-secondary font-light leading-relaxed">{item.note}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-20">
        <div className="max-w-[1100px] mx-auto rounded-2xl border border-white/[0.07] bg-[#0C0C0E] overflow-hidden">
          <div className="px-6 py-5 border-b border-white/[0.07]">
            <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-amber/70 mb-2">{m.mapEyebrow}</p>
            <h2 className="font-display text-[22px] font-bold text-ink-primary mb-2">{MAP_PREVIEW_TITLE}</h2>
            <p className="text-[13px] text-ink-secondary font-light max-w-3xl">{MAP_PREVIEW_SUB}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-px bg-white/[0.06]">
            <div className="bg-[#0C0C0E] p-5 md:p-6">
              <div className="rounded-xl border border-white/[0.08] bg-[#09090A] p-4">
                <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-amber/70 mb-3">{m.mapPreviewLabel}</p>
                <svg viewBox="0 0 760 300" className="w-full h-auto rounded-lg border border-white/[0.06] bg-[#060607]">
                  <rect x="0" y="0" width="760" height="300" fill="#060607" />
                  <path d="M73 99l30-22 45 8 24-15 46 13 36-8 49 16 41-9 54 22 23 23-18 26-49 20-62 6-53 24-84-7-47-17-43-33z" fill="rgba(232,133,90,0.18)" stroke="#E8855A" strokeWidth="1.2" />
                  <path d="M432 74l54-16 45 11 23 20 11 37-26 28-58 11-31 24-55-10-17-30 9-42z" fill="rgba(78,202,160,0.13)" stroke="#4ECAA0" strokeWidth="1.2" />
                  <path d="M597 147l45-10 31 19 11 29-16 22-40 6-25 16-37-12-9-29 11-29z" fill="rgba(123,167,245,0.12)" stroke="#7BA7F5" strokeWidth="1.2" />
                  <circle cx="215" cy="120" r="7" fill="#E8855A" />
                  <circle cx="455" cy="115" r="7" fill="#4ECAA0" />
                  <circle cx="620" cy="184" r="7" fill="#7BA7F5" />
                  <line x1="215" y1="120" x2="340" y2="230" stroke="#E8855A" strokeWidth="1.1" strokeDasharray="4 4" />
                  <line x1="455" y1="115" x2="340" y2="230" stroke="#4ECAA0" strokeWidth="1.1" strokeDasharray="4 4" />
                  <line x1="620" y1="184" x2="340" y2="230" stroke="#7BA7F5" strokeWidth="1.1" strokeDasharray="4 4" />
                  <rect x="280" y="219" width="120" height="34" rx="8" fill="rgba(232,133,90,0.1)" stroke="#E8855A" strokeWidth="1.2" />
                  <text x="340" y="239" fill="#E8855A" textAnchor="middle" fontSize="12" fontFamily="monospace">Donation Router</text>
                </svg>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <p className="text-[12px] text-ink-secondary border border-white/[0.06] rounded-lg px-3 py-2">{m.mapFeature2}</p>
                  <p className="text-[12px] text-ink-secondary border border-white/[0.06] rounded-lg px-3 py-2">{m.mapFeature3}</p>
                  <p className="text-[12px] text-ink-secondary border border-white/[0.06] rounded-lg px-3 py-2">{m.mapFeature4}</p>
                </div>
              </div>
            </div>
            <div className="bg-[#0C0C0E] p-5 md:p-6">
              <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-amber/70 mb-3">
                {lang === 'ru' ? 'Роли MEAL в MVP' : lang === 'es' ? 'Roles MEAL en MVP' : 'MEAL roles in MVP'}
              </p>
              <div className="flex flex-col gap-2.5">
                {MEAL_ROLE_PATHS.map((role) => (
                  <Link key={role.href} href={role.href} className="group rounded-xl border border-white/[0.07] bg-white/[0.01] p-3.5 no-underline hover:border-white/[0.14] transition-colors">
                    <p className="text-[13.5px] font-semibold text-ink-primary mb-1">{role.label}</p>
                    <p className="text-[12px] text-ink-secondary mb-2">{role.note}</p>
                    <span className="font-mono text-[10px] text-amber/70 inline-flex items-center gap-1.5">
                      {role.href.replace(`/${lang}`, '')}
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M5.5 2.5 8 5 5.5 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEAL product layer */}
      <section className="border-t border-white/[0.07] bg-[#090909] px-6 lg:px-12 py-16">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-amber mb-4 block">PORA / MEAL</span>
            <h2 className="font-display text-[clamp(22px,2.5vw,32px)] font-bold text-ink-primary mb-4 tracking-tight">
              {t.home.porTitle}
            </h2>
            <p className="text-[14.5px] text-ink-secondary font-light leading-relaxed mb-6">
              <strong className="text-ink-primary font-semibold">PORA</strong> - {h.step3Title}.{' '}
              <strong className="text-ink-primary font-semibold">MEAL</strong> - {m.heroSub}
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
            {[
              { name: xt.portal.walletMetamask, kind: 'metamask' as const },
              { name: xt.portal.walletWalletConnect, kind: 'walletConnect' as const },
              { name: xt.portal.walletCoinbase, kind: 'coinbase' as const },
            ].map((wallet) => (
              <button key={wallet.name} className="bg-surface border border-white/[0.07] hover:border-white/[0.14] rounded-xl px-6 py-3.5 flex items-center gap-3 transition-colors cursor-pointer">
                <span className="text-[18px] text-amber"><WalletIcon kind={wallet.kind} /></span>
                <span className="text-[13.5px] text-ink-secondary font-medium">{wallet.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function RoleMetaIcon({ kind }: { kind: 'send' | 'check' | 'chart' | 'search' | 'scale' | 'signal' | 'building' | 'box' | 'key' | 'globe' | 'folder' }) {
  if (kind === 'send') return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 6.5 12 2l-3.5 10-2.2-3.2L2 6.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /></svg>
  if (kind === 'check') return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7.3 5.7 10 11 4.7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  if (kind === 'chart') return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 11.5h9M4 9V6m3 3V4m3 5V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
  if (kind === 'scale') return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2.5v8m-3.5-8h7M3 10h2M9 10h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
  if (kind === 'signal') return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 10.5V9m3 1.5V7m3 3.5V5m3 5.5V3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
  if (kind === 'building') return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="3" y="2.2" width="8" height="9.8" rx="0.8" stroke="currentColor" strokeWidth="1.1" /><path d="M5 5h1m3 0h1M6.5 12V9.5h1V12" stroke="currentColor" strokeWidth="1.1" /></svg>
  if (kind === 'box') return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 4.5 7 2.2l4.5 2.3V9.7L7 12l-4.5-2.3V4.5Z" stroke="currentColor" strokeWidth="1.1" /></svg>
  if (kind === 'key') return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="4.5" cy="7" r="2" stroke="currentColor" strokeWidth="1.2" /><path d="M6.5 7h5M10 7v1.5M11.8 7v1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
  if (kind === 'globe') return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.1" /><path d="M2 7h10M7 2c1.3 1.4 2 3.1 2 5s-.7 3.6-2 5M7 2c-1.3 1.4-2 3.1-2 5s.7 3.6 2 5" stroke="currentColor" strokeWidth="1" /></svg>
  if (kind === 'folder') return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.2 4h3l1.1 1.2h5.5v5.8H2.2V4Z" stroke="currentColor" strokeWidth="1.1" /></svg>
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.1" /></svg>
}

function WalletIcon({ kind }: { kind: 'metamask' | 'walletConnect' | 'coinbase' }) {
  if (kind === 'metamask') return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4.8 8.8 8 7 10.8 4 9.2l0-4.4Zm10 0L9.2 8l1.8 2.8L14 9.2V4.8Z" fill="currentColor" opacity=".55" /><path d="M7 10.8h4L9 13.6l-2-2.8Z" fill="currentColor" /></svg>
  if (kind === 'walletConnect') return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2.8 7.8a8.9 8.9 0 0 1 12.4 0M5.4 10.3a5.4 5.4 0 0 1 7.2 0M7.8 12.8a2 2 0 0 1 2.4 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="3" y="3" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.3" /><circle cx="9" cy="9" r="2.3" fill="currentColor" opacity=".8" /></svg>
}

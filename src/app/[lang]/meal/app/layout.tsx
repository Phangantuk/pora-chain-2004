import Link from 'next/link'
import { isValidLang, getT, type Lang } from '@/lib/i18n'
import { MealNav } from '@/components/meal/MealNav'

function SideIcon({ kind }: { kind: 'dashboard' | 'donations' | 'regions' | 'profile' | 'admin' | 'partner' | 'venue' | 'participant' }) {
  if (kind === 'dashboard') {
    return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.2 2.2h4.8v4.8H2.2V2.2Zm4.8 0h4.8v2.6H7V2.2Zm0 4.8h4.8v4.8H7V7Zm-4.8 2.6H7v2.2H2.2V9.6Z" stroke="currentColor" strokeWidth="1.1" /></svg>
  }
  if (kind === 'donations') {
    return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2.2v9.6M4.3 4.4c0-.9.8-1.6 1.8-1.6h2c1 0 1.8.7 1.8 1.6 0 2.1-5.6 1-5.6 3.2 0 .9.8 1.6 1.8 1.6h2c1 0 1.8-.7 1.8-1.6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" /></svg>
  }
  if (kind === 'regions') {
    return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="4.9" stroke="currentColor" strokeWidth="1.1" /><path d="M2.1 7h9.8M7 2.1c1.2 1.4 1.8 3 1.8 4.9S8.2 10.5 7 11.9M7 2.1C5.8 3.5 5.2 5.1 5.2 7s.6 3.5 1.8 4.9" stroke="currentColor" strokeWidth="1" /></svg>
  }
  if (kind === 'profile') {
    return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="4.4" r="2.1" stroke="currentColor" strokeWidth="1.1" /><path d="M2.8 11.8c0-2.1 1.9-3.8 4.2-3.8s4.2 1.7 4.2 3.8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" /></svg>
  }
  if (kind === 'admin') {
    return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="m7 2.2 3 .9v2.3c0 1.9-1.3 3.6-3 4.4-1.7-.8-3-2.5-3-4.4V3.1l3-.9Z" stroke="currentColor" strokeWidth="1.1" /><path d="M5.6 6.8 6.7 8l1.9-2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /></svg>
  }
  if (kind === 'partner') {
    return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7.2h8M3.9 4.2h6.2M3.9 10.2h6.2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" /><path d="M2.3 2.6h9.4v8.8H2.3z" stroke="currentColor" strokeWidth="1.1" /></svg>
  }
  if (kind === 'venue') {
    return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.6 11.8V5.6L7 2.6l4.4 3v6.2M5.2 11.8V8.9h3.6v2.9" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /></svg>
  }
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.4 11.8h9.2V2.2H2.4v9.6Zm2.2-7.1h4.8M4.6 7h4.8M4.6 9.3h3.1" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" /></svg>
}

export default function MealAppLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const t = getT(lang)
  const m = t.meal
  const lp = (path: string) => `/${lang}${path}`

  const labels = {
    app: lang === 'ru' ? 'Приложение' : lang === 'es' ? 'Aplicación' : 'App',
    profile: lang === 'ru' ? 'Профиль' : lang === 'es' ? 'Perfil' : 'Profile',
    partner: lang === 'ru' ? 'Партнёр' : lang === 'es' ? 'Socio' : 'Partner',
    venue: lang === 'ru' ? 'Точка питания' : lang === 'es' ? 'Punto de comida' : 'Venue',
    participant: lang === 'ru' ? 'Участник' : lang === 'es' ? 'Participante' : 'Participant',
    backToMeal: lang === 'ru' ? 'К MEAL' : lang === 'es' ? 'Volver a MEAL' : 'Back to MEAL',
  }

  const compactRu = lang === 'ru'

  const sidebar = [
    { label: m.dashTitle, href: lp('/meal/app/dashboard'), kind: 'dashboard' as const },
    { label: m.dashDonations, href: lp('/meal/app/donations'), kind: 'donations' as const },
    { label: m.navRegions, href: lp('/meal/app/regions'), kind: 'regions' as const },
    { label: labels.profile, href: lp('/meal/app/profile'), kind: 'profile' as const },
    { label: m.adminTitle, href: lp('/meal/app/admin'), kind: 'admin' as const },
    { label: labels.partner, href: lp('/meal/app/partner'), kind: 'partner' as const },
    { label: labels.venue, href: lp('/meal/app/venue'), kind: 'venue' as const },
    { label: labels.participant, href: lp('/meal/app/participant'), kind: 'participant' as const },
  ]

  return (
    <div className="bg-[#070707] text-white min-h-screen">
      <MealNav lang={lang} />
      <div className="flex">
        <aside className="hidden lg:flex flex-col w-56 shrink-0 border-r border-white/[0.06] bg-[#0A0A0B] min-h-[calc(100vh-128px)] pt-6 pb-6 px-3 sticky top-32">
          <p className={`font-mono uppercase text-white/20 px-3 mb-3 ${compactRu ? 'text-[8.5px] tracking-[0.11em]' : 'text-[9px] tracking-[0.14em]'}`}>
            {labels.app}
          </p>
          {sidebar.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-white/45 hover:text-white/80 hover:bg-white/[0.04] transition-colors mb-0.5 ${compactRu ? 'text-[12.5px]' : 'text-[13px]'}`}
            >
              <span className="text-[14px] text-[#E8855A] shrink-0">
                <SideIcon kind={item.kind} />
              </span>
              <span className="leading-snug break-words">{item.label}</span>
            </Link>
          ))}
          <div className="mt-auto pt-4 border-t border-white/[0.05]">
            <Link
              href={lp('/meal')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-white/25 hover:text-white/50 transition-colors font-mono ${compactRu ? 'text-[11px]' : 'text-[12px]'}`}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M9.5 6H2.8m0 0L5 3.8M2.8 6 5 8.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              {labels.backToMeal}
            </Link>
          </div>
        </aside>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  )
}

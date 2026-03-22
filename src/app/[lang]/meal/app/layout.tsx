import Link from 'next/link'
import { isValidLang, getT, type Lang } from '@/lib/i18n'
import { MealNav } from '@/components/meal/MealNav'

export default function MealAppLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const lang = isValidLang(params.lang) ? params.lang as Lang : 'en'
  const t = getT(lang)
  const m = t.meal
  const lp = (p: string) => `/${lang}${p}`

  const SIDEBAR = [
    { label: t.meal.dashTitle,   href: lp('/meal/app/dashboard'), icon: '⬛' },
    { label: t.meal.dashDonations, href: lp('/meal/app/donations'), icon: '💎' },
    { label: 'Regions',          href: lp('/meal/app/regions'),   icon: '🌍' },
    { label: 'Profile',          href: lp('/meal/app/profile'),   icon: '👤' },
    { label: t.meal.adminTitle,  href: lp('/meal/app/admin'),     icon: '⚙' },
  ]

  return (
    <div className="bg-[#070707] text-white min-h-screen">
      <MealNav lang={lang} />
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-52 shrink-0 border-r border-white/[0.06] bg-[#0A0A0B] min-h-[calc(100vh-128px)] pt-6 pb-6 px-3 sticky top-32">
          <p className="font-mono text-[9px] tracking-[0.14em] uppercase text-white/20 px-3 mb-3">App</p>
          {SIDEBAR.map(item => (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] text-white/45 hover:text-white/80 hover:bg-white/[0.04] transition-colors mb-0.5">
              <span className="text-[14px]">{item.icon}</span>
              {item.label}
            </Link>
          ))}
          <div className="mt-auto pt-4 border-t border-white/[0.05]">
            <Link href={lp('/meal')}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] text-white/25 hover:text-white/50 transition-colors font-mono">
              ← {m.backToMeal}
            </Link>
          </div>
        </aside>
        {/* Main */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  )
}

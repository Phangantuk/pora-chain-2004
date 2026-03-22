import Link from 'next/link'
import { getT, type Lang } from '@/lib/i18n'
import { getExtraT } from '@/lib/i18n/extra'
import {
  MOCK_EVENTS,
  MOCK_USER_DONATIONS,
  MOCK_USER_SUMMARY,
  formatDate,
  formatUsd,
  timeAgo,
} from '@/lib/meal/data'

interface MealDashboardViewProps {
  lang: Lang
  compact?: boolean
}

export function MealDashboardView({ lang, compact = false }: MealDashboardViewProps) {
  const t = getT(lang)
  const xt = getExtraT(lang)
  const m = t.meal
  const lp = (path: string) => `/${lang}${path}`
  const s = MOCK_USER_SUMMARY
  const recentEvents = MOCK_EVENTS.filter((event) => event.verified).slice(0, 4)

  return (
    <div className={compact ? 'px-6 lg:px-8 py-8' : 'max-w-6xl mx-auto px-6 py-12'}>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#E8855A] mb-2">
            MEAL MVP
          </p>
          <h1 className="font-bold text-[clamp(28px,4vw,40px)] tracking-tight text-white">
            {m.dashTitle}
          </h1>
          <p className="font-mono text-[11px] text-white/25 mt-1">{m.demoUser}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href={lp('/meal/donate')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E8855A] text-[#0D0805] font-semibold text-[13px] hover:bg-[#f0966e] transition-all duration-200"
          >
            + {m.ctaDonate}
          </Link>
          <Link
            href={lp('/meal/explorer')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/[0.08] text-white/55 font-medium text-[13px] hover:text-white/80 hover:border-white/[0.16] transition-all duration-200"
          >
            {m.ctaExplorer}
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {[
          { n: formatUsd(s.totalUsd), label: m.dashTotalDonated, color: '#E8855A' },
          { n: String(s.regionsSupported), label: m.dashRegions, color: '#4ECAA0' },
          { n: s.mealsImpacted.toLocaleString(), label: m.dashMeals, color: '#7BA7F5' },
          { n: String(s.donationCount), label: m.dashDonations, color: '#F5C542' },
        ].map(({ n, label, color }) => (
          <div
            key={label}
            className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl p-5 relative overflow-hidden"
          >
            <div
              className="absolute top-0 left-0 right-0 h-[1px]"
              style={{ background: `linear-gradient(to right, ${color}30, transparent)` }}
            />
            <p className="font-mono text-[24px] font-semibold mb-1" style={{ color }}>
              {n}
            </p>
            <p className="font-mono text-[10px] tracking-[0.1em] uppercase text-white/25">
              {label}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.35fr_1fr] gap-6 mb-6">
        <div className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/[0.05] flex items-center justify-between">
            <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/25">
              {m.dashRecentDonations}
            </p>
            <Link
              href={lp('/meal/donate')}
              className="font-mono text-[11px] text-white/25 hover:text-[#E8855A] transition-colors"
            >
              {m.ctaDonate} →
            </Link>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {MOCK_USER_DONATIONS.map((donation) => (
              <div key={donation.id} className="px-5 py-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[13px] text-white/80">{donation.regionName}</p>
                  <p className="font-mono text-[10px] text-white/25">{formatDate(donation.date)}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[14px] text-[#E8855A] font-semibold">
                    {formatUsd(donation.amountUsd)}
                  </p>
                  <span
                    className={`font-mono text-[10px] ${
                      donation.status === 'confirmed' ? 'text-[#4ECAA0]' : 'text-[#F5C542]'
                    }`}
                  >
                    {donation.status === 'confirmed' ? m.statusConfirmed : m.statusPending}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/[0.05]">
            <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/25">
              {m.dashImpactEvents}
            </p>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {recentEvents.map((event) => (
              <div key={event.id} className="px-5 py-4">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <p className="text-[13px] text-white/75 leading-snug">{event.description}</p>
                  <span className="font-mono text-[11px] text-[#4ECAA0] shrink-0">
                    {m.verifiedLabel}
                  </span>
                </div>
                <div className="flex items-center gap-3 font-mono text-[11px] text-white/25">
                  <span>{event.regionName}</span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <MealGlyph />
                    {event.mealsCount} {m.meals.toLowerCase()}
                  </span>
                  <span>·</span>
                  <span>{timeAgo(event.date)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: m.navRegions,
            text: xt.meal.dashboardRegionsCard,
            href: lp('/meal/regions'),
          },
          {
            title: m.ctaDonate,
            text: xt.meal.dashboardDonateCard,
            href: lp('/meal/donate'),
          },
          {
            title: m.navExplorer,
            text: xt.meal.dashboardExplorerCard,
            href: lp('/meal/explorer'),
          },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group bg-[#0C0C0E] border border-white/[0.07] rounded-2xl p-5 hover:border-white/[0.14] transition-colors no-underline"
          >
            <p className="font-semibold text-[14px] text-white/85 mb-2 group-hover:text-white">
              {item.title}
            </p>
            <p className="text-[13px] text-white/38 font-light leading-relaxed mb-4">{item.text}</p>
            <span className="font-mono text-[11px] text-[#E8855A]/65 group-hover:text-[#E8855A] transition-colors">
              {xt.meal.openAction} →
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

function MealGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M2.6 3.2v7.6M5 3.2v7.6M9 3.2c0 1 .8 1.8 1.8 1.8.3 0 .6-.1.8-.2v6M11.6 3.2v1.4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

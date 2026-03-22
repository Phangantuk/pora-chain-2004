import type { Metadata } from 'next'
import { StatItem } from '@/components/ui'
import { Button } from '@/components/ui/Button'
import { isValidLang, type Lang } from '@/lib/i18n'
import { getExtraT } from '@/lib/i18n/extra'

export const metadata: Metadata = { title: 'Organization Dashboard' }

const TEAM = [
  { name: 'Amara Diallo', role: 'Admin', actions: 48 },
  { name: 'Chen Wei', role: 'Participant', actions: 32 },
  { name: 'Fatima Al-Rashid', role: 'Participant', actions: 21 },
]

export default function OrgDashboard({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const xt = getExtraT(lang)
  const lp = (path: string) => `/${lang}${path}`

  return (
    <div className="p-8">
      <div className="bg-surface border border-white/[0.07] rounded-xl p-5 flex items-center gap-4 mb-8">
        <div className="w-11 h-11 rounded-xl bg-amber-dim border border-amber/30 flex items-center justify-center shrink-0 text-amber">
          <BuildingGlyph />
        </div>
        <div className="flex-1">
          <h1 className="font-display text-[20px] font-bold text-ink-primary">{xt.portalOrg.title}</h1>
          <p className="font-mono-pora text-[11px] text-ink-tertiary">org_0xd12b...8f01 - {xt.portalOrg.verifiedOrganization}</p>
        </div>
        <Button href={lp('/meal/app/profile')} variant="ghost" size="sm">{xt.portalOrg.editProfile}</Button>
      </div>

      <div className="grid grid-cols-4 border border-white/[0.07] rounded-xl overflow-hidden divide-x divide-white/[0.07] mb-6">
        <StatItem num="142" label={xt.portalOrg.totalActions} />
        <StatItem num="48.2K" label={xt.portalOrg.mealsVerified} />
        <StatItem num="8" label={xt.portalOrg.teamMembers} />
        <StatItem num="12" label={xt.portalOrg.countries} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-surface border border-white/[0.07] rounded-xl overflow-hidden">
          <div className="px-5 py-3.5 border-b border-white/[0.07] bg-surface-2">
            <p className="font-mono-pora text-[11px] tracking-[0.1em] uppercase text-ink-tertiary">
              {xt.portalOrg.monthlyActivity}
            </p>
          </div>
          <div className="p-5">
            <div className="bg-surface-3 rounded-lg h-32 flex items-center justify-center">
              <p className="font-mono-pora text-[10px] text-ink-tertiary tracking-[0.1em] uppercase">
                {xt.portalOrg.activityChart}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-surface border border-white/[0.07] rounded-xl overflow-hidden">
          <div className="px-5 py-3.5 border-b border-white/[0.07] bg-surface-2 flex items-center justify-between">
            <p className="font-mono-pora text-[11px] tracking-[0.1em] uppercase text-ink-tertiary">{xt.portalOrg.team}</p>
            <Button href={lp('/meal/register')} variant="ghost" size="sm">+ {xt.portalOrg.add}</Button>
          </div>
          <div className="divide-y divide-white/[0.07]">
            {TEAM.map((member) => (
              <div key={member.name} className="px-5 py-3.5 flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-surface-3 flex items-center justify-center text-[14px] shrink-0 text-ink-tertiary">
                  <UserGlyph />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-ink-primary truncate">{member.name}</p>
                  <p className="font-mono-pora text-[10px] text-ink-tertiary">{member.role}</p>
                </div>
                <span className="font-mono-pora text-[11px] text-amber">{member.actions}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function BuildingGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect x="3" y="2.5" width="12" height="13" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <rect x="5.5" y="5" width="2" height="2" fill="currentColor" opacity="0.5" />
      <rect x="10.5" y="5" width="2" height="2" fill="currentColor" opacity="0.5" />
      <rect x="8" y="11" width="2" height="4" fill="currentColor" opacity="0.7" />
    </svg>
  )
}

function UserGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="7" cy="4.2" r="2.2" stroke="currentColor" strokeWidth="1.1" />
      <path d="M2.5 12c0-2.3 2-3.9 4.5-3.9s4.5 1.6 4.5 3.9" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}

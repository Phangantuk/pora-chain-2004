import Link from 'next/link'
import { getT, isValidLang, type Lang } from '@/lib/i18n'
import { REGIONS, formatUsd, getProgressPct } from '@/lib/meal/data'

// Demo: user follows these 3 regions
const FOLLOWED_SLUGS = ['nairobi-east', 'lahore-south', 'lagos-mainland']

export default function AppRegionsPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? params.lang as Lang : 'en'
  const t = getT(lang)
  const m = t.meal
  const lp = (p: string) => `/${lang}${p}`

  const followed = REGIONS.filter(r => FOLLOWED_SLUGS.includes(r.slug))

  const STATUS_COLORS: Record<string, string> = {
    urgent: '#F5C542', active: '#4ECAA0', funded: '#7BA7F5',
  }

  return (
    <div className="px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-bold text-[22px] text-white">My Regions</h1>
        <Link href={lp('/meal/regions')}
          className="font-mono text-[12px] text-white/30 hover:text-[#E8855A] transition-colors">
          Browse all →
        </Link>
      </div>

      <div className="flex flex-col gap-4 mb-10">
        {followed.map(region => {
          const pct   = getProgressPct(region)
          const color = STATUS_COLORS[region.status]
          return (
            <div key={region.slug} className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl p-6"
              style={{ background: `linear-gradient(#0C0C0E,#0C0C0E) padding-box, linear-gradient(135deg,${color}15,transparent 60%) border-box`, border: '1px solid transparent' }}>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-[28px]">{region.emoji}</span>
                  <div>
                    <h3 className="font-semibold text-[15px] text-white/90">{region.name}</h3>
                    <p className="font-mono text-[10px] text-white/30">{region.country}</p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Link href={lp(`/meal/regions/${region.slug}`)}
                    className="font-mono text-[11px] px-3 py-1.5 rounded-lg border border-white/[0.08] text-white/35 hover:text-white/65 transition-all">
                    {m.viewRegion}
                  </Link>
                  <Link href={lp(`/meal/donate?region=${region.slug}`)}
                    className="font-mono text-[11px] px-3 py-1.5 rounded-lg bg-[#E8855A] text-[#0D0805] font-semibold hover:bg-[#f0966e] transition-all">
                    {m.donate}
                  </Link>
                </div>
              </div>
              <p className="text-[13px] text-white/40 mb-4 font-light">{region.need}</p>
              <div>
                <div className="flex justify-between text-[11px] font-mono text-white/25 mb-1.5">
                  <span>{m.raised}: {formatUsd(region.raisedUsd)}</span>
                  <span>{pct}% of {formatUsd(region.goalUsd)}</span>
                </div>
                <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color, opacity: 0.8 }} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Suggested */}
      <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/20 mb-4">Suggested regions</p>
      <div className="flex flex-col gap-2">
        {REGIONS.filter(r => !FOLLOWED_SLUGS.includes(r.slug) && r.status === 'urgent').map(region => (
          <div key={region.slug} className="flex items-center gap-4 bg-[#0C0C0E] border border-white/[0.06] rounded-xl px-5 py-3.5">
            <span className="text-[20px]">{region.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-white/80">{region.name}</p>
              <p className="font-mono text-[10px] text-[#F5C542]">{m.urgent}</p>
            </div>
            <Link href={lp(`/meal/donate?region=${region.slug}`)}
              className="font-mono text-[12px] px-4 py-1.5 rounded-lg border border-[#E8855A]/30 text-[#E8855A] hover:bg-[#E8855A]/[0.08] transition-all">
              {m.donate}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

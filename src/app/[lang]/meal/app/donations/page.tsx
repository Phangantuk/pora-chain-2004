import Link from 'next/link'
import { getT, isValidLang, type Lang } from '@/lib/i18n'
import { MOCK_DONATIONS, formatUsd, formatDate } from '@/lib/meal/data'

export default function DonationsPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? params.lang as Lang : 'en'
  const t = getT(lang)
  const m = t.meal
  const lp = (p: string) => `/${lang}${p}`

  const STATUS_COLOR: Record<string, string> = {
    confirmed: '#4ECAA0', pending: '#F5C542', processing: '#7BA7F5',
  }

  return (
    <div className="px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-bold text-[22px] text-white">{m.dashDonations}</h1>
        <Link href={lp('/meal/donate')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E8855A] text-[#0D0805] font-semibold text-[13px] hover:bg-[#f0966e] transition-all duration-200">
          + New donation
        </Link>
      </div>

      {/* Total */}
      <div className="bg-[#0C0C0E] border border-[#E8855A]/20 rounded-2xl px-6 py-4 mb-6 flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wide text-white/25 mb-0.5">{m.dashTotalDonated}</p>
          <p className="font-mono text-[28px] font-semibold text-[#E8855A]">
            {formatUsd(MOCK_DONATIONS.reduce((s, d) => s + d.amountUsd, 0))}
          </p>
        </div>
        <div className="text-right">
          <p className="font-mono text-[10px] uppercase tracking-wide text-white/25 mb-0.5">{m.dashDonations}</p>
          <p className="font-mono text-[28px] font-semibold text-white">{MOCK_DONATIONS.length}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-5 py-3 border-b border-white/[0.05] bg-white/[0.02]">
          {[m.colRegion, m.colAmount, m.colStatus, m.colDate, 'Tx'].map(col => (
            <span key={col} className="font-mono text-[10px] tracking-[0.1em] uppercase text-white/25">{col}</span>
          ))}
        </div>
        {MOCK_DONATIONS.length === 0 ? (
          <p className="text-center py-12 font-mono text-[13px] text-white/25">{m.emptyDonations}</p>
        ) : (
          <div className="divide-y divide-white/[0.04]">
            {MOCK_DONATIONS.map(d => {
              const color = STATUS_COLOR[d.status] ?? '#ffffff'
              return (
                <div key={d.id} className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 items-center px-5 py-4 hover:bg-white/[0.015] transition-colors">
                  <div>
                    <p className="text-[13px] text-white/80">{d.regionName}</p>
                    <p className="font-mono text-[10px] text-white/25">{d.currency}</p>
                  </div>
                  <p className="font-mono text-[14px] font-semibold text-[#E8855A]">{formatUsd(d.amountUsd)}</p>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-md border"
                    style={{ color, borderColor: `${color}25`, background: `${color}10` }}>
                    {d.status === 'confirmed' ? m.statusConfirmed : d.status === 'pending' ? m.statusPending : m.statusProcessing}
                  </span>
                  <p className="font-mono text-[11px] text-white/30">{formatDate(d.date)}</p>
                  <p className="font-mono text-[10px] text-white/20">{d.txHash ?? '—'}</p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

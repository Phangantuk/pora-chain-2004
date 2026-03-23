import Link from 'next/link'
import { getT, isValidLang, type Lang } from '@/lib/i18n'
import { MOCK_DONATIONS, formatUsd, formatDate } from '@/lib/meal/data'

export default function DonationsPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const t = getT(lang)
  const m = t.meal
  const lp = (p: string) => `/${lang}${p}`
  const compactRu = lang === 'ru'

  const x = {
    newDonation: lang === 'ru' ? 'Новое пожертвование' : lang === 'es' ? 'Nueva donación' : 'New donation',
    browseTx: lang === 'ru' ? 'Транзакция' : lang === 'es' ? 'Transacción' : 'Tx',
    noTx: lang === 'ru' ? 'нет' : lang === 'es' ? 'sin tx' : 'n/a',
  }

  const STATUS_COLOR: Record<string, string> = {
    confirmed: '#4ECAA0',
    pending: '#F5C542',
    processing: '#7BA7F5',
  }

  return (
    <div className="px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8 gap-3">
        <h1 className={`font-bold text-white ${compactRu ? 'text-[20px]' : 'text-[22px]'}`}>{m.dashDonations}</h1>
        <Link
          href={lp('/meal/donate')}
          className={`inline-flex items-center gap-2 rounded-xl bg-[#E8855A] text-[#0D0805] font-semibold hover:bg-[#f0966e] transition-all duration-200 ${compactRu ? 'px-4 py-2.5 text-[12.5px]' : 'px-5 py-2.5 text-[13px]'}`}
        >
          <span>+</span>
          <span className="whitespace-nowrap">{x.newDonation}</span>
        </Link>
      </div>

      <div className="bg-[#0C0C0E] border border-[#E8855A]/20 rounded-2xl px-6 py-4 mb-6 flex items-center justify-between gap-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wide text-white/25 mb-0.5">{m.dashTotalDonated}</p>
          <p className="font-mono text-[28px] font-semibold text-[#E8855A]">{formatUsd(MOCK_DONATIONS.reduce((s, d) => s + d.amountUsd, 0))}</p>
        </div>
        <div className="text-right">
          <p className="font-mono text-[10px] uppercase tracking-wide text-white/25 mb-0.5">{m.dashDonations}</p>
          <p className="font-mono text-[28px] font-semibold text-white">{MOCK_DONATIONS.length}</p>
        </div>
      </div>

      <div className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl overflow-hidden">
        <div className={`grid gap-4 px-5 py-3 border-b border-white/[0.05] bg-white/[0.02] ${compactRu ? 'grid-cols-[1fr_auto_auto_auto] md:grid-cols-[1fr_auto_auto_auto_auto]' : 'grid-cols-[1fr_auto_auto_auto_auto]'}`}>
          {[m.colRegion, m.colAmount, m.colStatus, m.colDate, x.browseTx].map((col, idx) => (
            <span
              key={col}
              className={`font-mono text-[10px] tracking-[0.1em] uppercase text-white/25 ${compactRu && idx === 4 ? 'hidden md:block' : ''}`}
            >
              {col}
            </span>
          ))}
        </div>
        {MOCK_DONATIONS.length === 0 ? (
          <p className="text-center py-12 font-mono text-[13px] text-white/25">{m.emptyDonations}</p>
        ) : (
          <div className="divide-y divide-white/[0.04]">
            {MOCK_DONATIONS.map((d) => {
              const color = STATUS_COLOR[d.status] ?? '#ffffff'
              return (
                <div key={d.id} className={`grid gap-4 items-center px-5 py-4 hover:bg-white/[0.015] transition-colors ${compactRu ? 'grid-cols-[1fr_auto_auto_auto] md:grid-cols-[1fr_auto_auto_auto_auto]' : 'grid-cols-[1fr_auto_auto_auto_auto]'}`}>
                  <div>
                    <p className="text-[13px] text-white/80">{d.regionName}</p>
                    <p className="font-mono text-[10px] text-white/25">{d.currency}</p>
                  </div>
                  <p className="font-mono text-[14px] font-semibold text-[#E8855A]">{formatUsd(d.amountUsd)}</p>
                  <span
                    className="font-mono text-[10px] px-2 py-0.5 rounded-md border"
                    style={{ color, borderColor: `${color}25`, background: `${color}10` }}
                  >
                    {d.status === 'confirmed' ? m.statusConfirmed : d.status === 'pending' ? m.statusPending : m.statusProcessing}
                  </span>
                  <p className="font-mono text-[11px] text-white/30">{formatDate(d.date, lang)}</p>
                  <p className={`font-mono text-[10px] text-white/20 ${compactRu ? 'hidden md:block' : ''}`}>{d.txHash ?? x.noTx}</p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

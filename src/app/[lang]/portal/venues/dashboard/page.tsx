import { isValidLang, type Lang } from '@/lib/i18n'
import { formatCurrency, formatShortDate } from '@/lib/portal/funder'
import {
  VENUE_ACTIVITY_FEED,
  VENUE_SUMMARY,
  VENUE_SETTLEMENT_PREVIEW,
  getVenueStateColor,
  getVenueStateLabel,
} from '@/lib/portal/venues'

export default function VenueDashboardPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const latestSettlement = VENUE_SETTLEMENT_PREVIEW[VENUE_SETTLEMENT_PREVIEW.length - 1]
  const currentStatus = 'low' as const
  const activityRu: Record<string, { title: string; detail: string }> = {
    'va-001': {
      title: '\u041e\u0442\u043a\u0440\u044b\u0442\u043e \u043e\u043a\u043d\u043e \u0432\u044b\u0434\u0430\u0447\u0438',
      detail: '\u0421\u0442\u0430\u0442\u0443\u0441 \u0442\u043e\u0447\u043a\u0438 \u043f\u0435\u0440\u0435\u0448\u0435\u043b \u0432 open, \u043f\u043b\u0430\u043d 120 \u043f\u043e\u0440\u0446\u0438\u0439.',
    },
    'va-002': {
      title: '\u041f\u0430\u043a\u0435\u0442 \u043f\u043e\u0434\u0442\u0432. \u0437\u0430\u044f\u0432\u043e\u043a',
      detail: '\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u043e 84 \u0437\u0430\u044f\u0432\u043a\u0438 \u0438 \u0437\u0430\u043f\u0438\u0441\u0430\u043d\u043e \u0432 \u0432\u044b\u0434\u0430\u043d\u043d\u044b\u0435 \u043f\u043e\u0440\u0446\u0438\u0438.',
    },
    'va-003': {
      title: '\u0421\u0442\u0430\u0442\u0443\u0441 \u0435\u043c\u043a\u043e\u0441\u0442\u0438: low',
      detail: '\u0417\u0430\u043f\u0430\u0441 \u0443\u043f\u0430\u043b \u043d\u0438\u0436\u0435 20%; \u043e\u0447\u0435\u0440\u0435\u0434\u044c \u0438 \u043f\u0440\u0438\u043e\u0440\u0438\u0442\u0435\u0442 \u043e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u044b.',
    },
    'va-004': {
      title: '\u0421\u0433\u0435\u043d\u0435\u0440\u0438\u0440\u043e\u0432\u0430\u043d \u0447\u0435\u0440\u043d\u043e\u0432\u0438\u043a \u043d\u0435\u0434\u0435\u043b\u0438',
      detail: '\u0427\u0435\u0440\u043d\u043e\u0432\u0438\u043a \u0440\u0430\u0441\u0447\u0435\u0442\u0430 \u0441\u043e\u0431\u0440\u0430\u043d \u0438\u0437 \u043f\u043e\u0434\u0442\u0432. \u0441\u043e\u0431\u044b\u0442\u0438\u0439 \u0438 \u0438\u0441\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u0439.',
    },
  }

  const x = {
    title: lang === 'ru' ? '\u0414\u0430\u0448\u0431\u043e\u0440\u0434 \u0442\u043e\u0447\u043a\u0438' : 'Venue dashboard',
    sub:
      lang === 'ru'
        ? '\u041a\u043e\u043c\u043f\u0430\u043a\u0442\u043d\u044b\u0439 \u0432\u0438\u0434 \u043f\u043e \u043f\u043e\u0434\u0442\u0432. \u0432\u044b\u0434\u0430\u0447\u0435, \u0441\u0442\u0430\u0442\u0443\u0441\u0443 \u0435\u043c\u043a\u043e\u0441\u0442\u0438, \u043f\u0435\u0440\u0438\u043e\u0434\u0443 \u043e\u0442\u0447\u0435\u0442\u0430 \u0438 \u043d\u0435\u0434\u0435\u043b\u044c\u043d\u043e\u043c\u0443 \u0440\u0430\u0441\u0447\u0435\u0442\u0443.'
        : 'Practical view of confirmations, capacity status, active reporting period, and latest settlement cycle.',
    meals: lang === 'ru' ? '\u041f\u043e\u0434\u0442\u0432. \u043f\u043e\u0440\u0446\u0438\u0438' : 'Confirmed meals',
    status: lang === 'ru' ? '\u0421\u0442\u0430\u0442\u0443\u0441 \u0442\u043e\u0447\u043a\u0438' : 'Current status',
    period: lang === 'ru' ? '\u041e\u0442\u0447\u0435\u0442\u043d\u044b\u0439 \u043f\u0435\u0440\u0438\u043e\u0434' : 'Active period',
    settlement: lang === 'ru' ? '\u041f\u043e\u0441\u043b\u0435\u0434\u043d\u0438\u0439 \u0440\u0430\u0441\u0447\u0435\u0442' : 'Latest settlement',
    capacity: lang === 'ru' ? '\u0414\u043e\u0441\u0442\u0443\u043f\u043d\u0430\u044f \u0435\u043c\u043a\u043e\u0441\u0442\u044c' : 'Available capacity',
    capacityValue: lang === 'ru' ? '18% \u0434\u043e \u0434\u043d\u0435\u0432\u043d\u043e\u0433\u043e \u043b\u0438\u043c\u0438\u0442\u0430' : '18% until daily limit',
    feedTitle: lang === 'ru' ? '\u041f\u043e\u0441\u043b\u0435\u0434\u043d\u0438\u0435 \u0441\u043e\u0431\u044b\u0442\u0438\u044f' : 'Recent event feed',
    exceptionTitle: lang === 'ru' ? '\u0418\u0441\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u044f \u043d\u0435\u0434\u0435\u043b\u0438' : 'Exception summary',
    exceptionBody:
      lang === 'ru'
        ? '2 \u0441\u043e\u0431\u044b\u0442\u0438\u044f: 1 expired claim, 1 duplicate attempt. \u0412 \u0440\u0430\u0441\u0447\u0435\u0442 \u043d\u0435 \u0432\u043e\u0448\u043b\u0438.'
        : '2 items this week: 1 expired claim, 1 duplicate attempt. Both excluded from payout totals.',
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-bold text-[22px] text-white mb-2">{x.title}</h2>
        <p className="text-[13px] text-white/45">{x.sub}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <KpiCard label={x.meals} value={VENUE_SUMMARY.confirmedMealsYtd.toLocaleString()} />
        <KpiCard label={x.status} value={getVenueStateLabel(currentStatus, lang)} color={getVenueStateColor(currentStatus)} />
        <KpiCard label={x.period} value={VENUE_SUMMARY.currentPeriodLabel} />
        <KpiCard label={x.settlement} value={formatCurrency(latestSettlement.finalPayout, lang)} />
        <KpiCard label={x.capacity} value={x.capacityValue} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-4">
        <div className="rounded-2xl border border-white/[0.07] bg-[#0C0C0E] overflow-hidden">
          <div className="px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
            <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/25">{x.feedTitle}</p>
          </div>
          <div className="divide-y divide-white/[0.05]">
            {VENUE_ACTIVITY_FEED.map((item) => (
              <div key={item.id} className="px-5 py-3.5">
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <p className="text-[13px] text-white/80">{lang === 'ru' ? activityRu[item.id]?.title ?? item.title : item.title}</p>
                  <p className="font-mono text-[10px] text-white/30">{formatShortDate(item.timestamp, lang)}</p>
                </div>
                <p className="text-[12.5px] text-white/45 leading-relaxed">{lang === 'ru' ? activityRu[item.id]?.detail ?? item.detail : item.detail}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-white/[0.07] bg-[#0C0C0E] p-5">
          <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/25 mb-3">{x.exceptionTitle}</p>
          <p className="text-[13px] text-white/50 leading-relaxed mb-4">{x.exceptionBody}</p>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.01] px-4 py-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-white/25 mb-1">
              {lang === 'ru' ? '\u0427\u0435\u0440\u043d\u043e\u0432\u0438\u043a \u043d\u0435\u0434\u0435\u043b\u0438' : 'Current week draft'}
            </p>
            <p className="text-[13px] text-white/70">
              {latestSettlement.weekLabel}: {formatCurrency(latestSettlement.finalPayout, lang)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function KpiCard({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#0C0C0E] p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-white/25 mb-1.5">{label}</p>
      <p className="font-mono text-[16px]" style={{ color: color ?? 'rgba(255,255,255,0.86)' }}>
        {value}
      </p>
    </div>
  )
}

import { isValidLang, type Lang } from '@/lib/i18n'
import { formatShortDate } from '@/lib/portal/funder'
import { VENUE_ACTIVITY_FEED } from '@/lib/portal/venues'

const REPORTING_BLOCKS = [
  {
    enTitle: 'Weekly operational snapshot',
    ruTitle: '\u0415\u0436\u0435\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u044b\u0439 \u043e\u043f\u0435\u0440\u0430\u0446. \u0441\u043d\u0438\u043c\u043e\u043a',
    enBody: 'Confirmed meals, failed claims, capacity transitions, and settlement stage in one weekly view.',
    ruBody: '\u041f\u043e\u0434\u0442\u0432. \u043f\u043e\u0440\u0446\u0438\u0438, \u043d\u0435\u0443\u0434\u0430\u0447\u043d\u044b\u0435 \u0437\u0430\u044f\u0432\u043a\u0438, \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f \u0435\u043c\u043a\u043e\u0441\u0442\u0438 \u0438 \u0441\u0442\u0430\u0434\u0438\u044f \u0440\u0430\u0441\u0447\u0435\u0442\u0430 \u0432 \u043e\u0434\u043d\u043e\u043c \u043e\u0442\u0447\u0435\u0442\u0435.',
  },
  {
    enTitle: 'Settlement trace',
    ruTitle: '\u0422\u0440\u0430\u0441\u0441\u0438\u0440\u043e\u0432\u043a\u0430 \u0440\u0430\u0441\u0447\u0435\u0442\u0430',
    enBody: 'Rate line, adjustment line, final payout, and approval transitions remain visible until paid.',
    ruBody: '\u0421\u0442\u0430\u0432\u043a\u0430, \u043a\u043e\u0440\u0440\u0435\u043a\u0442\u0438\u0440\u043e\u0432\u043a\u0430, \u0438\u0442\u043e\u0433 \u0432\u044b\u043f\u043b\u0430\u0442\u044b \u0438 \u043f\u0435\u0440\u0435\u0445\u043e\u0434 \u0441\u0442\u0430\u0442\u0443\u0441\u043e\u0432 \u0432\u0438\u0434\u043d\u044b \u0434\u043e \u043e\u043f\u043b\u0430\u0442\u044b.',
  },
  {
    enTitle: 'Funder alignment',
    ruTitle: '\u0421\u0432\u044f\u0437\u044c \u0441 \u043e\u0442\u0447\u0435\u0442\u0430\u043c\u0438 \u0444\u043e\u043d\u0434\u0435\u0440\u0430',
    enBody: 'Venue events map to funder activity and statement narratives in the same transparency model.',
    ruBody: '\u0421\u043e\u0431\u044b\u0442\u0438\u044f \u0442\u043e\u0447\u043a\u0438 \u0441\u0432\u044f\u0437\u0430\u043d\u044b \u0441 \u043b\u0435\u043d\u0442\u043e\u0439 \u0444\u043e\u043d\u0434\u0435\u0440\u0430 \u0438 \u0432\u044b\u043f\u0438\u0441\u043a\u0430\u043c\u0438 \u0432 \u0435\u0434\u0438\u043d\u043e\u0439 \u043c\u043e\u0434\u0435\u043b\u0438 \u043f\u0440\u043e\u0437\u0440\u0430\u0447\u043d\u043e\u0441\u0442\u0438.',
  },
]

export default function VenueReportingPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
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
    title: lang === 'ru' ? '\u041e\u0442\u0447\u0435\u0442\u043d\u043e\u0441\u0442\u044c \u0438 \u043f\u0440\u043e\u0437\u0440\u0430\u0447\u043d\u043e\u0441\u0442\u044c \u0442\u043e\u0447\u043a\u0438' : 'Venue reporting and transparency',
    sub:
      lang === 'ru'
        ? '\u041e\u043f\u0435\u0440\u0430\u0446. \u0441\u043e\u0431\u044b\u0442\u0438\u044f \u0442\u043e\u0447\u043a\u0438 \u0441\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u0438\u0440\u043e\u0432\u0430\u043d\u044b \u0434\u043b\u044f \u0435\u0436\u0435\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u043e\u0439 \u0441\u0432\u0435\u0440\u043a\u0438, \u0440\u0430\u0441\u0447\u0435\u0442\u0430 \u0438 \u0432\u043d\u0435\u0448\u043d\u0435\u0439 \u043e\u0442\u0447\u0435\u0442\u043d\u043e\u0441\u0442\u0438.'
        : 'Venue events are structured for weekly reconciliation, settlement processing, and external reporting transparency.',
    feedTitle: lang === 'ru' ? '\u041f\u043e\u0441\u043b\u0435\u0434\u043d\u044f\u044f \u0430\u043a\u0442\u0438\u0432\u043d\u043e\u0441\u0442\u044c' : 'Recent activity chain',
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-bold text-[22px] text-white mb-2">{x.title}</h2>
        <p className="text-[13px] text-white/45">{x.sub}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {REPORTING_BLOCKS.map((block) => (
          <div key={block.enTitle} className="rounded-2xl border border-white/[0.07] bg-[#0C0C0E] p-5">
            <p className="text-[15px] font-semibold text-white/85 mb-2">{lang === 'ru' ? block.ruTitle : block.enTitle}</p>
            <p className="text-[13px] text-white/45 leading-relaxed">{lang === 'ru' ? block.ruBody : block.enBody}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/[0.07] bg-[#0C0C0E] overflow-hidden">
        <div className="px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
          <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/25">{x.feedTitle}</p>
        </div>
        <div className="divide-y divide-white/[0.05]">
          {VENUE_ACTIVITY_FEED.map((item) => (
            <div key={item.id} className="px-5 py-3.5">
              <div className="flex items-center justify-between gap-3 mb-1.5">
                <p className="text-[13px] font-medium text-white/80">{lang === 'ru' ? activityRu[item.id]?.title ?? item.title : item.title}</p>
                <p className="font-mono text-[10px] text-white/30">{formatShortDate(item.timestamp, lang)}</p>
              </div>
              <p className="text-[12.5px] text-white/45 leading-relaxed">{lang === 'ru' ? activityRu[item.id]?.detail ?? item.detail : item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

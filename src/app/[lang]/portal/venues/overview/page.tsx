import { isValidLang, type Lang } from '@/lib/i18n'
import { VENUE_SUMMARY } from '@/lib/portal/venues'

const OVERVIEW_POINTS = [
  {
    enTitle: 'Join with existing operations',
    ruTitle: '\u0412\u0445\u043e\u0434 \u0431\u0435\u0437 \u043f\u0435\u0440\u0435\u0441\u0431\u043e\u0440\u043a\u0438 \u0431\u0438\u0437\u043d\u0435\u0441\u0430',
    enBody: 'Use your current kitchen line, service counter, and shift schedule. MEAL adds confirmation and reporting on top.',
    ruBody: '\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439\u0442\u0435 \u0441\u0432\u043e\u044e \u0442\u0435\u043a\u0443\u0449\u0443\u044e \u043a\u0443\u0445\u043d\u044e, \u043e\u043a\u043d\u043e \u0432\u044b\u0434\u0430\u0447\u0438 \u0438 \u0433\u0440\u0430\u0444\u0438\u043a. MEAL \u0434\u043e\u0431\u0430\u0432\u043b\u044f\u0435\u0442 \u043f\u043e\u0434\u0442\u0432. \u0438 \u043e\u0442\u0447\u0435\u0442\u043d\u043e\u0441\u0442\u044c.',
  },
  {
    enTitle: 'Confirm each meal event',
    ruTitle: '\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0430\u0439\u0442\u0435 \u043a\u0430\u0436\u0434\u043e\u0435 \u0441\u043e\u0431\u044b\u0442\u0438\u0435 \u0432\u044b\u0434\u0430\u0447\u0438',
    enBody: 'Each recipient claim is confirmed at the venue and logged as a meal issuance event.',
    ruBody: '\u041a\u0430\u0436\u0434\u0430\u044f \u0437\u0430\u044f\u0432\u043a\u0430 \u043f\u043e\u043b\u0443\u0447\u0430\u0442\u0435\u043b\u044f \u043f\u043e\u0434\u0442\u0432. \u043d\u0430 \u0442\u043e\u0447\u043a\u0435 \u0438 \u0437\u0430\u043f\u0438\u0441\u044b\u0432\u0430\u0435\u0442\u0441\u044f \u0432 \u0441\u043e\u0431\u044b\u0442\u0438\u044f.',
  },
  {
    enTitle: 'Weekly payout visibility',
    ruTitle: '\u041f\u0440\u043e\u0437\u0440\u0430\u0447\u043d\u0430\u044f \u0435\u0436\u0435\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0430\u044f \u0432\u044b\u043f\u043b\u0430\u0442\u0430',
    enBody: 'Payout totals are formed from confirmed meals, rate per meal, and approved adjustment lines.',
    ruBody: '\u0421\u0443\u043c\u043c\u0430 \u0432\u044b\u043f\u043b\u0430\u0442\u044b \u0441\u0447\u0438\u0442\u0430\u0435\u0442\u0441\u044f \u0438\u0437 \u043f\u043e\u0434\u0442\u0432. \u043f\u043e\u0440\u0446\u0438\u0439, \u0441\u0442\u0430\u0432\u043a\u0438 \u0438 \u0443\u0442\u0432. \u043a\u043e\u0440\u0440\u0435\u043a\u0442\u0438\u0440\u043e\u0432\u043e\u043a.',
  },
  {
    enTitle: 'Transparency and trust',
    ruTitle: '\u041f\u0440\u043e\u0437\u0440\u0430\u0447\u043d\u043e\u0441\u0442\u044c \u0438 \u0434\u043e\u0432\u0435\u0440\u0438\u0435',
    enBody: 'Confirmed events, exceptions, and settlement states are visible in the same reporting model used by funders.',
    ruBody: '\u041f\u043e\u0434\u0442\u0432. \u0441\u043e\u0431\u044b\u0442\u0438\u044f, \u0438\u0441\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u044f \u0438 \u0441\u0442\u0430\u0442\u0443\u0441\u044b \u0440\u0430\u0441\u0447\u0435\u0442\u043e\u0432 \u0432\u0438\u0434\u043d\u044b \u0432 \u043e\u0431\u0449\u0435\u0439 \u043e\u0442\u0447\u0435\u0442\u043d\u043e\u0439 \u043c\u043e\u0434\u0435\u043b\u0438.',
  },
]

const WHY_VENUES = [
  {
    en: 'Incremental rollout: start with one service window and one featured meal profile.',
    ru: '\u041f\u043e\u044d\u0442\u0430\u043f\u043d\u044b\u0439 \u0437\u0430\u043f\u0443\u0441\u043a: \u0441\u0442\u0430\u0440\u0442 \u0441 \u043e\u0434\u043d\u043e\u0433\u043e \u043e\u043a\u043d\u0430 \u0438 \u043e\u0434\u043d\u043e\u0433\u043e \u043f\u0440\u043e\u0444\u0438\u043b\u044f \u0431\u043b\u044e\u0434.',
  },
  {
    en: 'Operational clarity: statuses and claim outcomes are explicit, not ad-hoc.',
    ru: '\u041e\u043f\u0435\u0440\u0430\u0446. \u044f\u0441\u043d\u043e\u0441\u0442\u044c: \u0441\u0442\u0430\u0442\u0443\u0441\u044b \u0438 \u0438\u0441\u0445\u043e\u0434\u044b \u0437\u0430\u044f\u0432\u043e\u043a \u044f\u0432\u043d\u044b\u0435, \u0430 \u043d\u0435 \u0438\u043c\u043f\u0440\u043e\u0432\u0438\u0437\u0430\u0446\u0438\u044f.',
  },
  {
    en: 'Settlement predictability: weekly cycle and payout states are visible ahead of payment.',
    ru: '\u041f\u0440\u043e\u0433\u043d\u043e\u0437\u0438\u0440\u0443\u0435\u043c\u044b\u0439 \u0440\u0430\u0441\u0447\u0435\u0442: \u043d\u0435\u0434\u0435\u043b\u044c\u043d\u044b\u0439 \u0446\u0438\u043a\u043b \u0438 \u0441\u0442\u0430\u0442\u0443\u0441\u044b \u0432\u044b\u043f\u043b\u0430\u0442\u044b \u0432\u0438\u0434\u043d\u044b \u0437\u0430\u0440\u0430\u043d\u0435\u0435.',
  },
]

export default function VenueOverviewPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const compactRu = lang === 'ru'

  const x = {
    title: lang === 'ru' ? '\u041e\u0431\u0437\u043e\u0440 \u0434\u043b\u044f \u0442\u043e\u0447\u0435\u043a' : 'Venue-facing overview',
    sub:
      lang === 'ru'
        ? '\u041a\u0430\u043a \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u044e\u0449\u0438\u0439 \u0440\u0435\u0441\u0442\u043e\u0440\u0430\u043d/\u043a\u0430\u0444\u0435 \u0432\u0445\u043e\u0434\u0438\u0442 \u0432 MEAL, \u043f\u043e\u0434\u0442\u0432. \u0432\u044b\u0434\u0430\u0447\u0443 \u0438 \u043f\u043e\u043b\u0443\u0447\u0430\u0435\u0442 \u043f\u0440\u043e\u0437\u0440\u0430\u0447\u043d\u044b\u0439 \u0435\u0436\u0435\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u044b\u0439 \u0440\u0430\u0441\u0447\u0435\u0442.'
        : 'How an existing restaurant or cafe joins MEAL, confirms meal distribution, and receives weekly settlement visibility.',
    chainTitle: lang === 'ru' ? '\u041e\u043f\u0435\u0440\u0430\u0446. \u0446\u0435\u043f\u043e\u0447\u043a\u0430' : 'Operating chain',
    chain: lang === 'ru' ? '\u0414\u043e\u043d\u043e\u0440 -> \u0421\u0438\u0441\u0442\u0435\u043c\u0430 -> \u0422\u043e\u0447\u043a\u0430 -> \u041f\u043e\u043b\u0443\u0447\u0430\u0442\u0435\u043b\u044c' : 'Donor -> System -> Venue -> Recipient',
    whyTitle: lang === 'ru' ? '\u041f\u043e\u0447\u0435\u043c\u0443 \u0442\u043e\u0447\u043a\u0430\u043c \u0443\u0434\u043e\u0431\u043d\u043e \u0432\u0445\u043e\u0434\u0438\u0442\u044c' : 'Why this is practical for venues',
    ytd: lang === 'ru' ? '\u041f\u043e\u0434\u0442\u0432. \u043f\u043e\u0440\u0446\u0438\u0439 \u0432 \u043f\u0435\u0440\u0438\u043e\u0434\u0435' : 'Confirmed meals in period',
    rate: lang === 'ru' ? '\u0421\u0440\u0435\u0434\u043d\u044f\u044f \u0441\u0442\u0430\u0432\u043a\u0430 \u0437\u0430 \u043f\u043e\u0440\u0446\u0438\u044e' : 'Average rate per meal',
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-bold text-[22px] text-white mb-2">{x.title}</h2>
        <p className={`text-white/45 ${compactRu ? 'text-[12.5px] leading-relaxed' : 'text-[13px]'}`}>{x.sub}</p>
      </div>

      <div className="rounded-2xl border border-white/[0.07] bg-[#0C0C0E] p-5">
        <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/25 mb-2">{x.chainTitle}</p>
        <p className="font-mono text-[12px] text-[#E8855A]">{x.chain}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {OVERVIEW_POINTS.map((point) => (
          <div key={point.enTitle} className="rounded-2xl border border-white/[0.07] bg-[#0C0C0E] p-5">
            <p className="text-[15px] font-semibold text-white/85 mb-2">{lang === 'ru' ? point.ruTitle : point.enTitle}</p>
            <p className="text-[13px] text-white/45 leading-relaxed">{lang === 'ru' ? point.ruBody : point.enBody}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-white/[0.07] bg-[#0C0C0E] p-5">
          <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/25 mb-3">{x.whyTitle}</p>
          <div className="space-y-2.5">
            {WHY_VENUES.map((item) => (
              <p key={item.en} className="text-[13px] text-white/55 leading-relaxed">
                <span className="text-[#E8855A] mr-2">\u2022</span>
                {lang === 'ru' ? item.ru : item.en}
              </p>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-white/[0.07] bg-[#0C0C0E] p-5 grid grid-cols-1 gap-3">
          <Metric label={x.ytd} value={VENUE_SUMMARY.confirmedMealsYtd.toLocaleString()} />
          <Metric label={x.rate} value={`$${VENUE_SUMMARY.averageRatePerMeal.toFixed(2)}`} />
        </div>
      </div>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.01] px-4 py-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-white/25 mb-1">{label}</p>
      <p className="font-mono text-[18px] text-white/85">{value}</p>
    </div>
  )
}

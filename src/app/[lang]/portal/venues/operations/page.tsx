import { isValidLang, type Lang } from '@/lib/i18n'
import {
  getVenueStateColor,
  getVenueStateLabel,
  type VenueAvailabilityStatus,
} from '@/lib/portal/venues'

const FLOW = [
  {
    enTitle: 'Recipient claim',
    ruTitle: '\u0417\u0430\u044f\u0432\u043a\u0430 \u043f\u043e\u043b\u0443\u0447\u0430\u0442\u0435\u043b\u044f',
    enDetail: 'Recipient presents valid claim at the service window.',
    ruDetail: '\u041f\u043e\u043b\u0443\u0447\u0430\u0442\u0435\u043b\u044c \u043f\u0440\u0435\u0434\u044a\u044f\u0432\u043b\u044f\u0435\u0442 \u0432\u0430\u043b\u0438\u0434\u043d\u0443\u044e \u0437\u0430\u044f\u0432\u043a\u0443 \u043d\u0430 \u043e\u043a\u043d\u0435 \u0432\u044b\u0434\u0430\u0447\u0438.',
  },
  {
    enTitle: 'Venue confirmation',
    ruTitle: '\u041f\u043e\u0434\u0442\u0432. \u043d\u0430 \u0442\u043e\u0447\u043a\u0435',
    enDetail: 'QR/token is checked and marked as served or rejected with reason code.',
    ruDetail: 'QR/\u0442\u043e\u043a\u0435\u043d \u043f\u0440\u043e\u0432\u0435\u0440\u044f\u0435\u0442\u0441\u044f \u0438 \u043e\u0442\u043c\u0435\u0447\u0430\u0435\u0442\u0441\u044f \u0432\u044b\u0434\u0430\u0447\u0430 \u0438\u043b\u0438 \u043e\u0442\u043a\u0430\u0437 \u0441 \u043f\u0440\u0438\u0447\u0438\u043d\u043e\u0439.',
  },
  {
    enTitle: 'Meal event record',
    ruTitle: '\u0417\u0430\u043f\u0438\u0441\u044c \u0441\u043e\u0431\u044b\u0442\u0438\u044f \u0432\u044b\u0434\u0430\u0447\u0438',
    enDetail: 'Confirmed issuance becomes a reporting and settlement event line.',
    ruDetail: '\u041f\u043e\u0434\u0442\u0432. \u0432\u044b\u0434\u0430\u0447\u0430 \u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u0441\u044f \u0441\u043e\u0431\u044b\u0442\u0438\u0435\u043c \u0434\u043b\u044f \u043e\u0442\u0447\u0435\u0442\u0430 \u0438 \u0440\u0430\u0441\u0447\u0435\u0442\u0430.',
  },
  {
    enTitle: 'Weekly settlement cycle',
    ruTitle: '\u0415\u0436\u0435\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u044b\u0439 \u0446\u0438\u043a\u043b \u0440\u0430\u0441\u0447\u0435\u0442\u0430',
    enDetail: 'Settlement moves through draft, reviewed, approved, and paid states.',
    ruDetail: '\u0420\u0430\u0441\u0447\u0435\u0442 \u0434\u0432\u0438\u0433\u0430\u0435\u0442\u0441\u044f \u043f\u043e \u0441\u0442\u0430\u0442\u0443\u0441\u0430\u043c: \u0447\u0435\u0440\u043d\u043e\u0432\u0438\u043a, \u043f\u0440\u043e\u0432\u0435\u0440\u0435\u043d\u043e, \u0443\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u043e, \u043e\u043f\u043b\u0430\u0447\u0435\u043d\u043e.',
  },
]

const STATE_RULES: Array<{
  status: VenueAvailabilityStatus
  enMeaning: string
  ruMeaning: string
  enAction: string
  ruAction: string
}> = [
  {
    status: 'open',
    enMeaning: 'Normal service, new claims accepted.',
    ruMeaning: '\u041d\u043e\u0440\u043c\u0430\u043b\u044c\u043d\u0430\u044f \u0432\u044b\u0434\u0430\u0447\u0430, \u043d\u043e\u0432\u044b\u0435 \u0437\u0430\u044f\u0432\u043a\u0438 \u043f\u0440\u0438\u043d\u0438\u043c\u0430\u044e\u0442\u0441\u044f.',
    enAction: 'Continue real-time confirmation.',
    ruAction: '\u041f\u0440\u043e\u0434\u043e\u043b\u0436\u0430\u0439\u0442\u0435 \u043f\u043e\u0434\u0442\u0432. \u0432 \u0440\u0435\u0430\u043b\u044c\u043d\u043e\u043c \u0432\u0440\u0435\u043c\u0435\u043d\u0438.',
  },
  {
    status: 'low',
    enMeaning: 'Capacity below 20%.',
    ruMeaning: '\u0415\u043c\u043a\u043e\u0441\u0442\u044c \u043d\u0438\u0436\u0435 20%.',
    enAction: 'Prioritize active queue and update wait messaging.',
    ruAction: '\u041f\u0440\u0438\u043e\u0440\u0438\u0442\u0435\u0442 \u0430\u043a\u0442\u0438\u0432\u043d\u043e\u0439 \u043e\u0447\u0435\u0440\u0435\u0434\u0438 \u0438 \u043e\u0431\u043d\u043e\u0432\u0438\u0442\u0435 \u0438\u043d\u0444\u043e \u043f\u043e \u043e\u0436\u0438\u0434\u0430\u043d\u0438\u044e.',
  },
  {
    status: 'paused',
    enMeaning: 'Temporary hold due to supply or staffing issue.',
    ruMeaning: '\u0412\u0440\u0435\u043c\u0435\u043d\u043d\u0430\u044f \u043f\u0430\u0443\u0437\u0430 \u0438\u0437-\u0437\u0430 \u043f\u043e\u0441\u0442\u0430\u0432\u043e\u043a \u0438\u043b\u0438 \u043a\u0430\u0434\u0440\u043e\u0432.',
    enAction: 'Pause claims and keep interruption note in event log.',
    ruAction: '\u041f\u043e\u0441\u0442\u0430\u0432\u044c\u0442\u0435 \u0437\u0430\u044f\u0432\u043a\u0438 \u043d\u0430 \u043f\u0430\u0443\u0437\u0443 \u0438 \u0437\u0430\u0444\u0438\u043a\u0441\u0438\u0440\u0443\u0439\u0442\u0435 \u043f\u0440\u0438\u0447\u0438\u043d\u0443 \u0432 \u043b\u043e\u0433\u0435.',
  },
  {
    status: 'full',
    enMeaning: 'Daily capacity reached.',
    ruMeaning: '\u0414\u043d\u0435\u0432\u043d\u0430\u044f \u0435\u043c\u043a\u043e\u0441\u0442\u044c \u0438\u0441\u0447\u0435\u0440\u043f\u0430\u043d\u0430.',
    enAction: 'Close same-day claims and reopen on next service window.',
    ruAction: '\u0417\u0430\u043a\u0440\u043e\u0439\u0442\u0435 \u0437\u0430\u044f\u0432\u043a\u0438 \u0434\u043d\u044f \u0438 \u043e\u0442\u043a\u0440\u043e\u0439\u0442\u0435 \u043d\u0430 \u0441\u043b\u0435\u0434. \u043e\u043a\u043d\u0435 \u0432\u044b\u0434\u0430\u0447\u0438.',
  },
]

const FAILURE_CASES = [
  {
    en: 'Expired claim: mark as expired and redirect recipient to support flow.',
    ru: '\u0418\u0441\u0442\u0435\u043a\u0448\u0430\u044f \u0437\u0430\u044f\u0432\u043a\u0430: \u043e\u0442\u043c\u0435\u0442\u044c\u0442\u0435 expired \u0438 \u043f\u0435\u0440\u0435\u043d\u0430\u043f\u0440\u0430\u0432\u044c\u0442\u0435 \u043f\u043e\u043b\u0443\u0447\u0430\u0442\u0435\u043b\u044f \u0432 support-\u043f\u043e\u0442\u043e\u043a.',
  },
  {
    en: 'Duplicate/blocked attempt: reject and keep audit line in exceptions.',
    ru: '\u0414\u0443\u0431\u043b\u044c/\u0431\u043b\u043e\u043a: \u043e\u0442\u043a\u043b\u043e\u043d\u0438\u0442\u0435 \u0438 \u0437\u0430\u0444\u0438\u043a\u0441\u0438\u0440\u0443\u0439\u0442\u0435 \u0441\u0442\u0440\u043e\u043a\u0443 \u0432 \u0438\u0441\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u044f\u0445.',
  },
  {
    en: 'At capacity: move status to full, pause new claims, continue queued confirmations only.',
    ru: '\u0414\u043e\u0441\u0442\u0438\u0433\u043d\u0443\u0442\u0430 \u0435\u043c\u043a\u043e\u0441\u0442\u044c: \u0441\u0442\u0430\u0442\u0443\u0441 full, \u043d\u043e\u0432\u044b\u0435 \u0437\u0430\u044f\u0432\u043a\u0438 \u043d\u0430 \u043f\u0430\u0443\u0437\u0443, \u043e\u0431\u0440\u0430\u0431\u0430\u0442\u044b\u0432\u0430\u0442\u044c \u0442\u043e\u043b\u044c\u043a\u043e \u0442\u0435\u043a\u0443\u0449\u0443\u044e \u043e\u0447\u0435\u0440\u0435\u0434\u044c.',
  },
]

export default function VenueOperationsPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'

  const x = {
    title: lang === 'ru' ? '\u041e\u043f\u0435\u0440\u0430\u0446\u0438\u043e\u043d\u043d\u044b\u0439 \u043f\u043e\u0442\u043e\u043a \u0442\u043e\u0447\u043a\u0438' : 'Venue operations flow',
    sub:
      lang === 'ru'
        ? '\u041f\u043e\u0442\u043e\u043a \u043e\u0442 \u0437\u0430\u044f\u0432\u043a\u0438 \u043f\u043e\u043b\u0443\u0447\u0430\u0442\u0435\u043b\u044f \u0434\u043e \u0437\u0430\u043f\u0438\u0441\u0438 \u0441\u043e\u0431\u044b\u0442\u0438\u044f \u0438 \u0435\u0436\u0435\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u043e\u0433\u043e \u0440\u0430\u0441\u0447\u0435\u0442\u0430.'
        : 'Operational sequence from recipient claim to meal event recording and weekly settlement.',
    stateTitle: lang === 'ru' ? '\u0421\u0442\u0430\u0442\u0443\u0441\u044b \u0442\u043e\u0447\u043a\u0438' : 'Venue statuses',
    failureTitle: lang === 'ru' ? '\u0427\u0442\u043e \u0435\u0441\u043b\u0438 \u0437\u0430\u044f\u0432\u043a\u0430 \u043d\u0435 \u043f\u0440\u043e\u0448\u043b\u0430' : 'What happens when claims fail',
    meaning: lang === 'ru' ? '\u0421\u043c\u044b\u0441\u043b' : 'Meaning',
    action: lang === 'ru' ? '\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435' : 'Action',
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-bold text-[22px] text-white mb-2">{x.title}</h2>
        <p className="text-[13px] text-white/45">{x.sub}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {FLOW.map((item, idx) => (
          <div key={item.enTitle} className="rounded-2xl border border-white/[0.07] bg-[#0C0C0E] p-5">
            <p className="font-mono text-[10px] tracking-[0.1em] uppercase text-[#E8855A] mb-2">{String(idx + 1).padStart(2, '0')}</p>
            <p className="text-[15px] font-semibold text-white/85 mb-2">{lang === 'ru' ? item.ruTitle : item.enTitle}</p>
            <p className="text-[13px] text-white/45 leading-relaxed">{lang === 'ru' ? item.ruDetail : item.enDetail}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/[0.07] bg-[#0C0C0E] overflow-hidden">
        <div className="px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
          <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/25">{x.stateTitle}</p>
        </div>
        <div className="grid grid-cols-[120px_1fr_1fr] gap-3 px-5 py-3 border-b border-white/[0.05]">
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/25">Status</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/25">{x.meaning}</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/25">{x.action}</p>
        </div>
        <div className="divide-y divide-white/[0.05]">
          {STATE_RULES.map((rule) => (
            <div key={rule.status} className="grid grid-cols-[120px_1fr_1fr] gap-3 px-5 py-3.5">
              <div>
                <span
                  className="font-mono text-[10px] px-2 py-0.5 rounded-md border inline-block"
                  style={{
                    color: getVenueStateColor(rule.status),
                    borderColor: `${getVenueStateColor(rule.status)}35`,
                    background: `${getVenueStateColor(rule.status)}12`,
                  }}
                >
                  {getVenueStateLabel(rule.status, lang)}
                </span>
              </div>
              <p className="text-[12.5px] text-white/45 leading-relaxed">{lang === 'ru' ? rule.ruMeaning : rule.enMeaning}</p>
              <p className="text-[12.5px] text-white/45 leading-relaxed">{lang === 'ru' ? rule.ruAction : rule.enAction}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.07] bg-[#0C0C0E] p-5">
        <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/25 mb-3">{x.failureTitle}</p>
        <div className="space-y-2.5">
          {FAILURE_CASES.map((item) => (
            <p key={item.en} className="text-[13px] text-white/55 leading-relaxed">
              <span className="text-[#E8855A] mr-2">\u2022</span>
              {lang === 'ru' ? item.ru : item.en}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

import { isValidLang, type Lang } from '@/lib/i18n'

const STEPS = [
  {
    enTitle: 'Program intake and venue profile',
    ruTitle: '\u0412\u0445\u043e\u0434 \u0432 \u043f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u0443 \u0438 \u043f\u0440\u043e\u0444\u0438\u043b\u044c \u0442\u043e\u0447\u043a\u0438',
    enBody: 'Submit legal entity details, outlet address, contact owner, and payout account.',
    ruBody: '\u041f\u043e\u0434\u0430\u0439\u0442\u0435 \u044e\u0440. \u0434\u0430\u043d\u043d\u044b\u0435, \u0430\u0434\u0440\u0435\u0441 \u0442\u043e\u0447\u043a\u0438, \u043a\u043e\u043d\u0442\u0430\u043a\u0442 \u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0433\u043e \u0438 \u0440\u0435\u043a\u0432\u0438\u0437\u0438\u0442\u044b \u0432\u044b\u043f\u043b\u0430\u0442.',
  },
  {
    enTitle: 'Service window and capacity setup',
    ruTitle: '\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0430 \u043e\u043a\u043d\u0430 \u0432\u044b\u0434\u0430\u0447\u0438 \u0438 \u0435\u043c\u043a\u043e\u0441\u0442\u0438',
    enBody: 'Define service hours, expected daily portions, and pause/full thresholds.',
    ruBody: '\u0417\u0430\u0434\u0430\u0439\u0442\u0435 \u0447\u0430\u0441\u044b \u0432\u044b\u0434\u0430\u0447\u0438, \u0434\u043d\u0435\u0432\u043d\u0443\u044e \u0435\u043c\u043a\u043e\u0441\u0442\u044c \u0438 \u043f\u043e\u0440\u043e\u0433\u0438 \u043f\u0430\u0443\u0437\u044b/\u043f\u043e\u043b\u043d\u043e\u0439 \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0438.',
  },
  {
    enTitle: 'Claim confirmation workflow',
    ruTitle: '\u041f\u043e\u0442\u043e\u043a \u043f\u043e\u0434\u0442\u0432. \u0437\u0430\u044f\u0432\u043e\u043a',
    enBody: 'Train staff to confirm recipient claims by QR/token and mark failed attempts with reason codes.',
    ruBody: '\u041e\u0431\u0443\u0447\u0438\u0442\u0435 \u043a\u043e\u043c\u0430\u043d\u0434\u0443 \u043f\u043e\u0434\u0442\u0432. \u0437\u0430\u044f\u0432\u043a\u0438 \u043f\u043e QR/\u0442\u043e\u043a\u0435\u043d\u0443 \u0438 \u043e\u0442\u043c\u0435\u0447\u0430\u0442\u044c \u043d\u0435\u0443\u0434\u0430\u0447\u0438 \u043a\u043e\u0434\u0430\u043c\u0438.',
  },
  {
    enTitle: 'Go-live and first weekly settlement',
    ruTitle: '\u0417\u0430\u043f\u0443\u0441\u043a \u0438 \u043f\u0435\u0440\u0432\u044b\u0439 \u043d\u0435\u0434\u0435\u043b\u044c\u043d\u044b\u0439 \u0440\u0430\u0441\u0447\u0435\u0442',
    enBody: 'Run live service, review draft settlement, and reconcile any adjustment lines before payout.',
    ruBody: '\u041f\u0440\u043e\u0432\u0435\u0434\u0438\u0442\u0435 \u0436\u0438\u0432\u0443\u044e \u0441\u043c\u0435\u043d\u0443, \u043f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u0447\u0435\u0440\u043d\u043e\u0432\u0438\u043a \u0440\u0430\u0441\u0447\u0435\u0442\u0430 \u0438 \u0441\u0432\u0435\u0440\u044c\u0442\u0435 \u043a\u043e\u0440\u0440\u0435\u043a\u0442\u0438\u0440\u043e\u0432\u043a\u0438 \u0434\u043e \u0432\u044b\u043f\u043b\u0430\u0442\u044b.',
  },
]

const REQUIRED_FIELDS = [
  {
    enField: 'Legal and payout profile',
    ruField: '\u042e\u0440. \u0438 \u043f\u043b\u0430\u0442\u0435\u0436\u043d\u044b\u0439 \u043f\u0440\u043e\u0444\u0438\u043b\u044c',
    enDetail: 'Legal name, registration number, payout account, responsible signatory.',
    ruDetail: '\u042e\u0440. \u043d\u0430\u0438\u043c\u0435\u043d\u043e\u0432\u0430\u043d\u0438\u0435, \u0440\u0435\u0433. \u043d\u043e\u043c\u0435\u0440, \u0441\u0447\u0435\u0442 \u0432\u044b\u043f\u043b\u0430\u0442, \u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043d\u043d\u044b\u0439 \u043f\u043e\u0434\u043f\u0438\u0441\u0430\u043d\u0442.',
  },
  {
    enField: 'Service setup',
    ruField: '\u041f\u0430\u0440\u0430\u043c\u0435\u0442\u0440\u044b \u0432\u044b\u0434\u0430\u0447\u0438',
    enDetail: 'Service days, service hours, queue model, and fallback procedure.',
    ruDetail: '\u0414\u043d\u0438 \u0438 \u0447\u0430\u0441\u044b \u0432\u044b\u0434\u0430\u0447\u0438, \u043c\u043e\u0434\u0435\u043b\u044c \u043e\u0447\u0435\u0440\u0435\u0434\u0438 \u0438 \u0440\u0435\u0437\u0435\u0440\u0432\u043d\u0430\u044f \u043f\u0440\u043e\u0446\u0435\u0434\u0443\u0440\u0430.',
  },
  {
    enField: 'Capacity and meal profile',
    ruField: '\u0415\u043c\u043a\u043e\u0441\u0442\u044c \u0438 \u043f\u0440\u043e\u0444\u0438\u043b\u044c \u0431\u043b\u044e\u0434',
    enDetail: 'Daily portions, featured meal profile, vegetarian availability, and stock constraints.',
    ruDetail: '\u0414\u043d\u0435\u0432\u043d\u0430\u044f \u0435\u043c\u043a\u043e\u0441\u0442\u044c, \u043e\u0441\u043d\u043e\u0432\u043d\u043e\u0435 \u0431\u043b\u044e\u0434\u043e, \u0434\u0438\u0435\u0442-\u043e\u043f\u0446\u0438\u0438 \u0438 \u043e\u0433\u0440\u0430\u043d\u0438\u0447\u0435\u043d\u0438\u044f \u043f\u043e \u0437\u0430\u043f\u0430\u0441\u0443.',
  },
]

const CHECKLIST = [
  {
    en: 'One service device at the handout counter (phone/tablet).',
    ru: '\u041e\u0434\u043d\u043e \u0443\u0441\u0442\u0440\u043e\u0439\u0441\u0442\u0432\u043e \u043d\u0430 \u0441\u0442\u043e\u0439\u043a\u0435 \u0432\u044b\u0434\u0430\u0447\u0438 (\u0442\u0435\u043b\u0435\u0444\u043e\u043d/\u043f\u043b\u0430\u043d\u0448\u0435\u0442).',
  },
  {
    en: 'Shift supervisor responsible for confirmations and queue status updates.',
    ru: '\u0421\u043c\u0435\u043d\u043d\u044b\u0439 \u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043d\u043d\u044b\u0439 \u0437\u0430 \u043f\u043e\u0434\u0442\u0432. \u0438 \u043e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u0438\u044f \u0441\u0442\u0430\u0442\u0443\u0441\u0430 \u043e\u0447\u0435\u0440\u0435\u0434\u0438.',
  },
  {
    en: 'Daily cutoff procedure for open/low/full transitions.',
    ru: '\u0414\u043d\u0435\u0432\u043d\u0430\u044f \u043f\u0440\u043e\u0446\u0435\u0434\u0443\u0440\u0430 \u043f\u0435\u0440\u0435\u0445\u043e\u0434\u0430 \u0441\u0442\u0430\u0442\u0443\u0441\u043e\u0432 open/low/full.',
  },
]

export default function VenueOnboardingPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'

  const x = {
    title: lang === 'ru' ? '\u041e\u043d\u0431\u043e\u0440\u0434\u0438\u043d\u0433 \u0442\u043e\u0447\u0435\u043a' : 'Venue onboarding guide',
    sub:
      lang === 'ru'
        ? '\u0421\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u0430 \u043f\u043e\u0434\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u044f \u0434\u043b\u044f \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u044e\u0449\u0438\u0445 \u0437\u0430\u0432\u0435\u0434\u0435\u043d\u0438\u0439: \u0434\u0430\u043d\u043d\u044b\u0435, \u0441\u0435\u0440\u0432\u0438\u0441\u043d\u043e\u0435 \u043e\u043a\u043d\u043e, \u043f\u043e\u0434\u0442\u0432. \u0432\u044b\u0434\u0430\u0447\u0438 \u0438 \u0440\u0430\u0441\u0447\u0435\u0442\u044b.'
        : 'Structured onboarding for existing venues: profile setup, service windows, confirmations, and weekly settlement.',
    fieldsTitle: lang === 'ru' ? '\u041e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u044b\u0435 \u0434\u0430\u043d\u043d\u044b\u0435' : 'Required data points',
    checklistTitle: lang === 'ru' ? '\u041e\u043f\u0435\u0440\u0430\u0446. \u0447\u0435\u043a-\u043b\u0438\u0441\u0442 \u043f\u0435\u0440\u0435\u0434 \u0437\u0430\u043f\u0443\u0441\u043a\u043e\u043c' : 'Operational checklist before go-live',
    field: lang === 'ru' ? '\u0411\u043b\u043e\u043a' : 'Field',
    detail: lang === 'ru' ? '\u0414\u0435\u0442\u0430\u043b\u0438' : 'Detail',
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-bold text-[22px] text-white mb-2">{x.title}</h2>
        <p className="text-[13px] text-white/45">{x.sub}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {STEPS.map((step, i) => (
          <div key={step.enTitle} className="rounded-2xl border border-white/[0.07] bg-[#0C0C0E] p-5">
            <p className="font-mono text-[10px] tracking-[0.1em] uppercase text-[#E8855A] mb-2">Step {i + 1}</p>
            <p className="text-[15px] font-semibold text-white/85 mb-2">{lang === 'ru' ? step.ruTitle : step.enTitle}</p>
            <p className="text-[13px] text-white/45 leading-relaxed">{lang === 'ru' ? step.ruBody : step.enBody}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/[0.07] bg-[#0C0C0E] overflow-hidden">
        <div className="px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
          <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/25">{x.fieldsTitle}</p>
        </div>
        <div className="grid grid-cols-[1fr_1.6fr] gap-3 px-5 py-3 border-b border-white/[0.05]">
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/25">{x.field}</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/25">{x.detail}</p>
        </div>
        <div className="divide-y divide-white/[0.05]">
          {REQUIRED_FIELDS.map((row) => (
            <div key={row.enField} className="grid grid-cols-[1fr_1.6fr] gap-3 px-5 py-3.5">
              <p className="text-[13px] text-white/75">{lang === 'ru' ? row.ruField : row.enField}</p>
              <p className="text-[12.5px] text-white/45 leading-relaxed">{lang === 'ru' ? row.ruDetail : row.enDetail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.07] bg-[#0C0C0E] p-5">
        <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/25 mb-3">{x.checklistTitle}</p>
        <div className="space-y-2.5">
          {CHECKLIST.map((item) => (
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

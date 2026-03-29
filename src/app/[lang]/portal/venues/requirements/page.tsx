import { isValidLang, type Lang } from '@/lib/i18n'

const REQUIREMENT_GROUPS = [
  {
    enTitle: 'Operational readiness',
    ruTitle: '\u041e\u043f\u0435\u0440\u0430\u0446. \u0433\u043e\u0442\u043e\u0432\u043d\u043e\u0441\u0442\u044c',
    enPoints: [
      'Stable service window and accountable shift supervisor.',
      'Clear meal profile and minimum safety/quality standard.',
      'Capacity updates reflected the same day.',
    ],
    ruPoints: [
      '\u0421\u0442\u0430\u0431\u0438\u043b\u044c\u043d\u043e\u0435 \u043e\u043a\u043d\u043e \u0432\u044b\u0434\u0430\u0447\u0438 \u0438 \u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043d\u043d\u044b\u0439 \u0441\u043c\u0435\u043d\u043d\u044b\u0439 \u043a\u043e\u043e\u0440\u0434\u0438\u043d\u0430\u0442\u043e\u0440.',
      '\u041f\u043e\u043d\u044f\u0442\u043d\u044b\u0439 \u043f\u0440\u043e\u0444\u0438\u043b\u044c \u0431\u043b\u044e\u0434 \u0438 \u043c\u0438\u043d\u0438\u043c\u0443\u043c \u043f\u043e \u0431\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u043e\u0441\u0442\u0438/\u043a\u0430\u0447\u0435\u0441\u0442\u0432\u0443.',
      '\u0418\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f \u0435\u043c\u043a\u043e\u0441\u0442\u0438 \u0434\u043e\u043b\u0436\u043d\u044b \u043e\u0431\u043d\u043e\u0432\u043b\u044f\u0442\u044c\u0441\u044f \u0432 \u0442\u043e\u0442 \u0436\u0435 \u0434\u0435\u043d\u044c.',
    ],
  },
  {
    enTitle: 'Confirmation rules',
    ruTitle: '\u041f\u0440\u0430\u0432\u0438\u043b\u0430 \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u0438\u0439',
    enPoints: [
      'Every served claim must be confirmed at point of distribution.',
      'Failed claims require reason codes (expired, duplicate, out-of-capacity).',
      'Manual overrides are logged and reviewed in weekly exceptions.',
    ],
    ruPoints: [
      '\u041a\u0430\u0436\u0434\u0430\u044f \u0432\u044b\u0434\u0430\u043d\u043d\u0430\u044f \u0437\u0430\u044f\u0432\u043a\u0430 \u0434\u043e\u043b\u0436\u043d\u0430 \u0431\u044b\u0442\u044c \u043f\u043e\u0434\u0442\u0432. \u043d\u0430 \u0442\u043e\u0447\u043a\u0435.',
      '\u041d\u0435\u0443\u0441\u043f\u0435\u0448\u043d\u044b\u0435 \u0437\u0430\u044f\u0432\u043a\u0438 \u0442\u0440\u0435\u0431\u0443\u044e\u0442 \u043a\u043e\u0434\u043e\u0432 \u043f\u0440\u0438\u0447\u0438\u043d\u044b (\u0438\u0441\u0442\u0435\u043a\u043b\u0430, \u0434\u0443\u0431\u043b\u044c, \u043d\u0435\u0442 \u0435\u043c\u043a\u043e\u0441\u0442\u0438).',
      '\u0412\u0440\u0443\u0447\u043d\u0443\u044e \u0432\u043d\u0435\u0441\u0435\u043d\u043d\u044b\u0435 \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f \u0438\u0434\u0443\u0442 \u0432 \u0435\u0436\u0435\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0443\u044e \u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0443 \u0438\u0441\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u0439.',
    ],
  },
  {
    enTitle: 'Settlement and reporting',
    ruTitle: '\u0420\u0430\u0441\u0447\u0435\u0442 \u0438 \u043e\u0442\u0447\u0435\u0442\u043d\u043e\u0441\u0442\u044c',
    enPoints: [
      'Weekly states: draft -> reviewed -> approved -> paid.',
      'Payout is based on confirmed meals, agreed rate, and approved adjustments.',
      'Venue reporting aligns with funder reporting and transparency feed.',
    ],
    ruPoints: [
      '\u0421\u0442\u0430\u0442\u0443\u0441\u044b \u043d\u0435\u0434\u0435\u043b\u0438: \u0447\u0435\u0440\u043d\u043e\u0432\u0438\u043a -> \u043f\u0440\u043e\u0432\u0435\u0440\u0435\u043d\u043e -> \u0443\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u043e -> \u043e\u043f\u043b\u0430\u0447\u0435\u043d\u043e.',
      '\u0412\u044b\u043f\u043b\u0430\u0442\u0430 \u0441\u0447\u0438\u0442\u0430\u0435\u0442\u0441\u044f \u0438\u0437 \u043f\u043e\u0434\u0442\u0432. \u043f\u043e\u0440\u0446\u0438\u0439, \u0441\u0442\u0430\u0432\u043a\u0438 \u0438 \u0443\u0442\u0432. \u043a\u043e\u0440\u0440\u0435\u043a\u0442\u0438\u0440\u043e\u0432\u043e\u043a.',
      '\u041e\u0442\u0447\u0435\u0442 \u0442\u043e\u0447\u043a\u0438 \u0441\u0438\u043d\u0445\u0440\u043e\u043d\u0438\u0437\u0438\u0440\u043e\u0432\u0430\u043d \u0441 \u043e\u0442\u0447\u0435\u0442\u043e\u043c \u0444\u043e\u043d\u0434\u0435\u0440\u0430 \u0438 \u043b\u0435\u043d\u0442\u043e\u0439 \u043f\u0440\u043e\u0437\u0440\u0430\u0447\u043d\u043e\u0441\u0442\u0438.',
    ],
  },
]

export default function VenueRequirementsPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'

  const x = {
    title: lang === 'ru' ? '\u0422\u0440\u0435\u0431\u043e\u0432\u0430\u043d\u0438\u044f \u0438 \u043f\u0440\u0430\u0432\u0438\u043b\u0430 \u0442\u043e\u0447\u0435\u043a' : 'Venue requirements and rules',
    sub:
      lang === 'ru'
        ? '\u041d\u0430\u0431\u043e\u0440 \u043e\u043f\u0435\u0440\u0430\u0446. \u0442\u0440\u0435\u0431\u043e\u0432\u0430\u043d\u0438\u0439 \u0434\u043b\u044f \u0441\u0442\u0430\u0431\u0438\u043b\u044c\u043d\u043e\u0439 \u0432\u044b\u0434\u0430\u0447\u0438, \u043a\u043e\u0440\u0440\u0435\u043a\u0442\u043d\u044b\u0445 \u0440\u0430\u0441\u0447\u0435\u0442\u043e\u0432 \u0438 \u043f\u0440\u043e\u0437\u0440\u0430\u0447\u043d\u043e\u0439 \u043e\u0442\u0447\u0435\u0442\u043d\u043e\u0441\u0442\u0438.'
        : 'Operational requirements for stable distribution, settlement accuracy, and transparent reporting.',
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-bold text-[22px] text-white mb-2">{x.title}</h2>
        <p className="text-[13px] text-white/45">{x.sub}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {REQUIREMENT_GROUPS.map((group) => (
          <div key={group.enTitle} className="rounded-2xl border border-white/[0.07] bg-[#0C0C0E] p-5">
            <p className="text-[15px] font-semibold text-white/85 mb-3">{lang === 'ru' ? group.ruTitle : group.enTitle}</p>
            <div className="space-y-2.5">
              {(lang === 'ru' ? group.ruPoints : group.enPoints).map((point) => (
                <p key={point} className="text-[12.5px] text-white/50 leading-relaxed">
                  <span className="text-[#E8855A] mr-2">\u2022</span>
                  {point}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

import { isValidLang, type Lang } from '@/lib/i18n'

const FAQ = [
  {
    enQ: 'Do we need new hardware to join?',
    ruQ: '\u041d\u0443\u0436\u043d\u043e \u043b\u0438 \u043d\u043e\u0432\u043e\u0435 \u043e\u0431\u043e\u0440\u0443\u0434\u043e\u0432\u0430\u043d\u0438\u0435 \u0434\u043b\u044f \u0432\u0445\u043e\u0434\u0430?',
    enA: 'For MVP, no special hardware is required. A stable phone or tablet at the distribution point is enough.',
    ruA: '\u0414\u043b\u044f MVP \u0441\u043f\u0435\u0446. \u043e\u0431\u043e\u0440\u0443\u0434\u043e\u0432\u0430\u043d\u0438\u0435 \u043d\u0435 \u043d\u0443\u0436\u043d\u043e. \u0414\u043e\u0441\u0442\u0430\u0442\u043e\u0447\u043d\u043e \u0441\u0442\u0430\u0431\u0438\u043b\u044c\u043d\u043e\u0433\u043e \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430/\u043f\u043b\u0430\u043d\u0448\u0435\u0442\u0430 \u043d\u0430 \u0442\u043e\u0447\u043a\u0435 \u0432\u044b\u0434\u0430\u0447\u0438.',
  },
  {
    enQ: 'How are weekly payouts calculated?',
    ruQ: '\u041a\u0430\u043a \u0441\u0447\u0438\u0442\u0430\u044e\u0442\u0441\u044f \u0435\u0436\u0435\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u044b\u0435 \u0432\u044b\u043f\u043b\u0430\u0442\u044b?',
    enA: 'Confirmed meals x agreed rate per meal, then approved adjustments are applied to form final payout.',
    ruA: '\u041f\u043e\u0434\u0442\u0432. \u043f\u043e\u0440\u0446\u0438\u0438 x \u0441\u0442\u0430\u0432\u043a\u0430 \u0437\u0430 \u043f\u043e\u0440\u0446\u0438\u044e, \u0437\u0430\u0442\u0435\u043c \u0443\u0442\u0432. \u043a\u043e\u0440\u0440\u0435\u043a\u0442\u0438\u0440\u043e\u0432\u043a\u0438 \u0444\u043e\u0440\u043c\u0438\u0440\u0443\u044e\u0442 \u0438\u0442\u043e\u0433.',
  },
  {
    enQ: 'What if a claim fails at the counter?',
    ruQ: '\u0427\u0442\u043e \u0435\u0441\u043b\u0438 \u0437\u0430\u044f\u0432\u043a\u0430 \u043d\u0435 \u043f\u0440\u043e\u0448\u043b\u0430 \u043d\u0430 \u0441\u0442\u043e\u0439\u043a\u0435?',
    enA: 'Mark it with the reason code (expired, duplicate, or capacity). It is tracked in exceptions and excluded from payout.',
    ruA: '\u041e\u0442\u043c\u0435\u0442\u044c\u0442\u0435 \u043f\u0440\u0438\u0447\u0438\u043d\u0443 (\u0438\u0441\u0442\u0435\u043a\u043b\u0430, \u0434\u0443\u0431\u043b\u044c, \u0435\u043c\u043a\u043e\u0441\u0442\u044c). \u0421\u0442\u0440\u043e\u043a\u0430 \u0438\u0434\u0435\u0442 \u0432 \u0438\u0441\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u044f \u0438 \u043d\u0435 \u0432\u0445\u043e\u0434\u0438\u0442 \u0432 \u0432\u044b\u043f\u043b\u0430\u0442\u0443.',
  },
  {
    enQ: 'Can we temporarily pause service?',
    ruQ: '\u041c\u043e\u0436\u043d\u043e \u043b\u0438 \u0432\u0440\u0435\u043c\u0435\u043d\u043d\u043e \u043f\u0440\u0438\u043e\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c \u0432\u044b\u0434\u0430\u0447\u0443?',
    enA: 'Yes. Set status to paused and provide interruption reason plus expected reopening window.',
    ruA: '\u0414\u0430. \u041f\u043e\u0441\u0442\u0430\u0432\u044c\u0442\u0435 \u0441\u0442\u0430\u0442\u0443\u0441 paused \u0438 \u0443\u043a\u0430\u0436\u0438\u0442\u0435 \u043f\u0440\u0438\u0447\u0438\u043d\u0443 \u0438 \u043e\u0436\u0438\u0434\u0430\u0435\u043c\u043e\u0435 \u043e\u043a\u043d\u043e \u0432\u043e\u0437\u043e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u0438\u044f.',
  },
]

export default function VenueFaqPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'

  const x = {
    title: lang === 'ru' ? 'FAQ \u0434\u043b\u044f \u0442\u043e\u0447\u0435\u043a' : 'Venue FAQ',
    sub:
      lang === 'ru'
        ? '\u041a\u0440\u0430\u0442\u043a\u0438\u0435 \u043e\u0442\u0432\u0435\u0442\u044b \u0434\u043b\u044f \u0432\u043b\u0430\u0434\u0435\u043b\u044c\u0446\u0435\u0432 \u0438 \u043c\u0435\u043d\u0435\u0434\u0436\u0435\u0440\u043e\u0432 \u0442\u043e\u0447\u0435\u043a \u043f\u043e \u043e\u043f\u0435\u0440\u0430\u0446. \u043c\u043e\u0434\u0435\u043b\u0438 MEAL.'
        : 'Short answers for venue owners and managers about practical MEAL operations.',
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-bold text-[22px] text-white mb-2">{x.title}</h2>
        <p className="text-[13px] text-white/45">{x.sub}</p>
      </div>

      <div className="space-y-3">
        {FAQ.map((item) => (
          <details key={item.enQ} className="rounded-2xl border border-white/[0.07] bg-[#0C0C0E] p-4 group">
            <summary className="cursor-pointer list-none text-[14px] font-semibold text-white/80 flex items-center justify-between gap-3">
              <span>{lang === 'ru' ? item.ruQ : item.enQ}</span>
              <span className="text-white/30 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-[13px] text-white/50 leading-relaxed">{lang === 'ru' ? item.ruA : item.enA}</p>
          </details>
        ))}
      </div>
    </div>
  )
}

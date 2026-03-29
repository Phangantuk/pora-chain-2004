import { isValidLang, type Lang } from '@/lib/i18n'
import { DOCUMENTS, formatShortDate } from '@/lib/portal/funder'

export default function FunderDocumentsPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const x = {
    title: lang === 'ru' ? '\u0414\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u044b \u0438 \u043f\u043e\u043b\u0438\u0442\u0438\u043a\u0438' : 'Documents and policies',
    sub:
      lang === 'ru'
        ? '\u0412\u044b\u0432\u0435\u0434\u0435\u043d\u044b \u043a\u043b\u044e\u0447\u0435\u0432\u044b\u0435 \u0440\u0430\u043c\u043a\u0438 \u043f\u043e \u0443\u0441\u043b\u043e\u0432\u0438\u044f\u043c \u043f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u044b, \u0440\u0430\u0441\u0447\u0435\u0442\u0430\u043c, \u043e\u0442\u0447\u0435\u0442\u043d\u043e\u0441\u0442\u0438 \u0438 \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u043e\u043d\u043d\u043e\u0439 \u0434\u0438\u0441\u0446\u0438\u043f\u043b\u0438\u043d\u0435 \u043f\u043e \u0442\u043e\u0447\u043a\u0430\u043c.'
        : 'Structured policy drafts for program terms, settlement, reporting, venue participation, and data governance.',
    lastUpdated: lang === 'ru' ? '\u041e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u043e' : 'Updated',
    draft: lang === 'ru' ? '\u0427\u0435\u0440\u043d\u043e\u0432\u043e\u0439 \u0440\u0430\u0437\u0434\u0435\u043b' : 'Draft section',
    viewPlaceholder: lang === 'ru' ? '\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u0440\u0430\u0437\u0434\u0435\u043b (MVP)' : 'Open section (MVP)',
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-bold text-[22px] text-white mb-2">{x.title}</h2>
        <p className="text-[13px] text-white/45">{x.sub}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {DOCUMENTS.map((document) => (
          <div key={document.id} className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <p className="text-[15px] font-semibold text-white/85">{document.title}</p>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-md border border-[#E8855A]/30 text-[#E8855A] bg-[#E8855A]/10">
                {x.draft}
              </span>
            </div>
            <p className="text-[13px] text-white/45 leading-relaxed mb-3">{document.summary}</p>
            <p className="font-mono text-[10px] text-white/30 mb-4">{x.lastUpdated}: {formatShortDate(document.updatedAt, lang)}</p>
            <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.08] text-[12px] text-white/55 hover:text-white/85 hover:border-white/[0.18] transition-colors">
              {x.viewPlaceholder}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

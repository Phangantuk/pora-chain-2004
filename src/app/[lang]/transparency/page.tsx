import type { Metadata } from 'next'
import { SectionHeader } from '@/components/ui'
import { isValidLang, type Lang } from '@/lib/i18n'

const VALIDATOR_ACTIVITY = [
  { id: 'validator_0x3a...', status: 'approved', time: '2m', ok: true },
  { id: 'validator_0x9f...', status: 'approved', time: '8m', ok: true },
  { id: 'validator_0x1d...', status: 'approved', time: '14m', ok: true },
  { id: 'validator_0xb7...', status: 'rejected', time: '21m', ok: false },
]

function getCopy(lang: Lang) {
  if (lang === 'ru') {
    return {
      metaTitle: 'Прозрачность',
      metaDesc: 'Публичный реестр PORA: проверенные действия, статистика и активность валидаторов.',
      tag: 'Прозрачность',
      title: 'Всё открыто',
      subtitle:
        'Прозрачность — это не дополнительная функция, а основа протокола. Каждая запись и каждое действие валидатора доступны для проверки.',
      ledger: 'Публичный реестр / в эфире',
      activity: 'Последняя активность валидаторов',
      approved: 'одобрено',
      rejected: 'отклонено',
      note: 'Все решения валидаторов, причины отклонений и история записей доступны через публичный API протокола PORA.',
      stats: [
        { label: 'Проверенные действия', value: '12,481' },
        { label: 'Записанные порции', value: '840,320' },
        { label: 'Активные страны', value: '28' },
        { label: 'Подключенные организации', value: '142' },
        { label: 'Активные валидаторы', value: '89' },
        { label: 'Последний блок', value: '#481,920' },
      ],
    }
  }
  if (lang === 'es') {
    return {
      metaTitle: 'Transparencia',
      metaDesc: 'Libro público de PORA con acciones verificadas y actividad de validadores.',
      tag: 'Transparencia',
      title: 'Todo es público',
      subtitle:
        'La transparencia no es una función adicional, es la base del protocolo. Cada registro y cada decisión del validador se puede verificar.',
      ledger: 'Libro público / en vivo',
      activity: 'Actividad reciente de validadores',
      approved: 'aprobado',
      rejected: 'rechazado',
      note: 'Todas las decisiones de validadores, motivos de rechazo e historial de registros son consultables mediante la API pública de PORA.',
      stats: [
        { label: 'Acciones verificadas', value: '12,481' },
        { label: 'Comidas registradas', value: '840,320' },
        { label: 'Países activos', value: '28' },
        { label: 'Organizaciones integradas', value: '142' },
        { label: 'Validadores activos', value: '89' },
        { label: 'Último bloque', value: '#481,920' },
      ],
    }
  }
  return {
    metaTitle: 'Transparency',
    metaDesc: 'PORA public ledger with verified actions, validator activity, and open stats.',
    tag: 'Transparency',
    title: 'Everything is public',
    subtitle:
      'Transparency is not an add-on. It is protocol-level behavior: records, validator decisions, and aggregate metrics are open by default.',
    ledger: 'Public ledger / live',
    activity: 'Recent validator activity',
    approved: 'approved',
    rejected: 'rejected',
    note: 'All validator decisions, rejection reasons, and record history remain queryable through the public PORA protocol API.',
    stats: [
      { label: 'Total verified actions', value: '12,481' },
      { label: 'Total meals recorded', value: '840,320' },
      { label: 'Countries active', value: '28' },
      { label: 'Organizations onboarded', value: '142' },
      { label: 'Active validators', value: '89' },
      { label: 'Last block recorded', value: '#481,920' },
    ],
  }
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const c = getCopy(lang)
  return { title: c.metaTitle, description: c.metaDesc }
}

export default function TransparencyPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const c = getCopy(lang)
  const compactRu = lang === 'ru'

  return (
    <>
      <section className="bg-surface/50 border-b border-white/[0.07] px-6 lg:px-12 pt-32 pb-16">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader tag={c.tag} title={c.title} subtitle={c.subtitle} />
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 max-w-[1200px] mx-auto">
        <div className="bg-surface border border-white/[0.07] rounded-2xl p-7 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-tertiary mb-5">{c.ledger}</p>
              <div className="divide-y divide-white/[0.07]">
                {c.stats.map((s) => (
                  <div key={s.label} className="flex items-center justify-between py-4 gap-3">
                    <span className={`font-mono text-ink-secondary break-all ${compactRu ? 'text-[12px]' : 'text-[13px]'}`}>{s.label}</span>
                    <span className="font-mono text-[13px] text-green font-medium">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-tertiary mb-5">{c.activity}</p>
              <div className="divide-y divide-white/[0.07]">
                {VALIDATOR_ACTIVITY.map((v) => (
                  <div key={v.id} className="flex items-center justify-between py-4 gap-3">
                    <span className="font-mono text-[12px] text-ink-secondary">{v.id}</span>
                    <div className="flex items-center gap-4">
                      <span className={`font-mono text-[12px] inline-flex items-center gap-1.5 ${v.ok ? 'text-green' : 'text-red-400'}`}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          {v.ok ? (
                            <path d="M2 5.2 4.1 7.3 8 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                          ) : (
                            <path d="M3 3 7 7M7 3 3 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                          )}
                        </svg>
                        {v.ok ? c.approved : c.rejected}
                      </span>
                      <span className="font-mono text-[11px] text-ink-tertiary">{v.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 p-4 bg-amber/[0.08] border border-amber/15 rounded-xl">
                <p className={`text-ink-secondary leading-[1.65] ${compactRu ? 'text-[12.5px]' : 'text-[13px]'}`}>{c.note}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

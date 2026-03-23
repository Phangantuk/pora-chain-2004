import type { Metadata } from 'next'
import { SectionHeader } from '@/components/ui'
import { isValidLang, type Lang } from '@/lib/i18n'

type DocSection = { title: string; desc: string; planned?: boolean }
type FeatureItem = { title: string; desc: string; status: 'available' | 'planned' }

const CODE_EXAMPLE = `// PORA SDK - submit verified action
import { PORA } from '@pora/sdk'

const client = new PORA({
  apiKey: process.env.PORA_API_KEY,
  network: 'mainnet',
})

const action = await client.submitAction({
  type: 'proof-of-meal',
  data: {
    meals: 320,
    location: 'Lagos, NG',
    timestamp: Date.now(),
    evidence: [imageHash, metadataHash],
  },
})

console.log(action.recordId)
// pora_0x3f8a2c9e_1706...`

function getCopy(lang: Lang) {
  if (lang === 'ru') {
    return {
      metaTitle: 'Разработчикам',
      metaDesc: 'Разрабатывайте поверх протокола PORA: API, SDK и стандарты модулей Proof-of-X.',
      tag: 'Разработчикам',
      title: 'Стройте на PORA',
      subtitle:
        'Протокол PORA открыт. Разработчики могут работать с публичным реестром, интегрировать верификацию и запускать прикладные модули.',
      planned: 'Запланировано',
      documentation: 'Документация',
      features: [
        { title: 'Обзор протокола', desc: 'Полная спецификация PORA: формат записи, стандарты верификации и схема событий.', status: 'available' },
        { title: 'REST API', desc: 'Доступ к публичному реестру PORA: записи, валидаторы и сетевые метрики.', status: 'available' },
        { title: 'JavaScript SDK', desc: 'Пакет @pora/sdk для отправки действий, чтения записей и интеграции проверок.', status: 'available' },
        { title: 'Создание Proof-of-X', desc: 'Вы определяете стандарт действия, PORA предоставляет слой верификации и записи.', status: 'available' },
        { title: 'Webhooks', desc: 'Подписки на события протокола в реальном времени: подтверждение, отклонение, обновления.', status: 'planned' },
      ] as FeatureItem[],
      docs: [
        { title: 'Быстрый старт', desc: 'Установите SDK и выполните первый API-запрос за несколько минут.' },
        { title: 'Справочник API', desc: 'Полная OpenAPI-документация по публичным endpoint-ам.' },
        { title: 'Справочник SDK', desc: 'Документация TypeScript/JavaScript клиента.' },
        { title: 'Руководство Proof-of-X', desc: 'Как запустить новый модуль: схема, правила проверки и формат записи.', planned: true },
      ] as DocSection[],
    }
  }
  if (lang === 'es') {
    return {
      metaTitle: 'Desarrolladores',
      metaDesc: 'Construye sobre PORA: API, SDK y estándares de módulos Proof-of-X.',
      tag: 'Desarrolladores',
      title: 'Construye sobre PORA',
      subtitle:
        'El protocolo PORA es abierto. Los equipos pueden usar la capa de registros, integrar verificación y lanzar módulos aplicados.',
      planned: 'Planificado',
      documentation: 'Documentación',
      features: [
        { title: 'Resumen del protocolo', desc: 'Especificación completa de PORA: formato de registro, estándares de verificación y esquema de eventos.', status: 'available' },
        { title: 'REST API', desc: 'Consulta la capa pública de registros PORA: acciones verificadas, validadores y métricas de red.', status: 'available' },
        { title: 'JavaScript SDK', desc: 'El paquete oficial @pora/sdk para enviar acciones y consultar registros.', status: 'available' },
        { title: 'Construir Proof-of-X', desc: 'Define tu estándar de acción y usa PORA como capa de verificación y registro.', status: 'available' },
        { title: 'Webhooks', desc: 'Suscríbete a eventos del protocolo en tiempo real para cambios de estado.', status: 'planned' },
      ] as FeatureItem[],
      docs: [
        { title: 'Inicio rápido', desc: 'Instala el SDK y realiza tu primera llamada API en minutos.' },
        { title: 'Referencia API', desc: 'Documentación OpenAPI completa para endpoints públicos.' },
        { title: 'Referencia SDK', desc: 'Guía del cliente TypeScript/JavaScript.' },
        { title: 'Guía Proof-of-X', desc: 'Cómo crear un nuevo módulo: esquema, validación y formato de registros.', planned: true },
      ] as DocSection[],
    }
  }

  return {
    metaTitle: 'Developers',
    metaDesc: 'Build on the PORA protocol with API, SDK, and Proof-of-X standards.',
    tag: 'Developers',
    title: 'Build on PORA',
    subtitle:
      'The PORA protocol is open. Teams can integrate with the record layer, implement verification flows, and launch applied modules.',
    planned: 'Planned',
    documentation: 'Documentation',
    features: [
      { title: 'Protocol overview', desc: 'Read the PORA specification: record format, verification standards, and event schema.', status: 'available' },
      { title: 'REST API', desc: 'Query the public PORA record layer with verified actions, validators, and network stats.', status: 'available' },
      { title: 'JavaScript SDK', desc: 'Use @pora/sdk to submit actions, read records, and build integrations.', status: 'available' },
      { title: 'Build a Proof-of-X', desc: 'Define your action standard while PORA handles verification and durable records.', status: 'available' },
      { title: 'Webhooks', desc: 'Subscribe to protocol events in real time for status updates.', status: 'planned' },
    ] as FeatureItem[],
    docs: [
      { title: 'Getting started', desc: 'Install the SDK and run your first API call quickly.' },
      { title: 'API reference', desc: 'Full OpenAPI documentation for all public endpoints.' },
      { title: 'SDK reference', desc: 'TypeScript and JavaScript client docs.' },
      { title: 'Proof-of-X guide', desc: 'How to launch a new module: schema, validation, and record format.', planned: true },
    ] as DocSection[],
  }
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const c = getCopy(lang)
  return { title: c.metaTitle, description: c.metaDesc }
}

export default function DevelopersPage({ params }: { params: { lang: string } }) {
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="rounded-xl overflow-hidden border border-white/[0.07] bg-[#0A0A0C]">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.07]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
              <span className="font-mono text-[11px] text-ink-tertiary ml-2">submit-action.js</span>
            </div>
            <pre className={`p-6 font-mono overflow-x-auto text-ink-secondary whitespace-pre ${compactRu ? 'text-[12px] leading-[1.75]' : 'text-[13px] leading-[1.8]'}`}>
              {CODE_EXAMPLE}
            </pre>
          </div>

          <div className="divide-y divide-white/[0.07]">
            {c.features.map((f) => (
              <div key={f.title} className="flex items-start gap-4 py-5">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 border ${
                    f.status === 'available'
                      ? 'bg-green-dim border-green/30 text-green'
                      : 'bg-surface-3 border-white/[0.07] text-ink-tertiary'
                  }`}
                >
                  {f.status === 'available' ? (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5.2 4.1 7.3 8 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  ) : (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="3.2" stroke="currentColor" strokeWidth="1.1" /></svg>
                  )}
                </div>
                <div>
                  <p className={`font-display font-semibold mb-1 ${compactRu ? 'text-[13.5px]' : 'text-[14px]'} ${f.status === 'available' ? 'text-ink-primary' : 'text-ink-secondary'}`}>
                    {f.title}
                    {f.status === 'planned' && (
                      <span className="font-mono text-[10px] text-ink-tertiary font-normal ml-2 tracking-[0.06em]">
                        - {c.planned}
                      </span>
                    )}
                  </p>
                  <p className={`text-ink-secondary leading-[1.65] ${compactRu ? 'text-[13px]' : 'text-[13.5px]'}`}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface/50 border-t border-white/[0.07] px-6 lg:px-12 py-16">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-display text-[22px] font-bold text-ink-primary mb-8">{c.documentation}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {c.docs.map((doc) => (
              <div
                key={doc.title}
                className={`bg-surface rounded-xl p-6 ${
                  doc.planned
                    ? 'border border-dashed border-white/[0.14] opacity-70'
                    : 'border border-white/[0.07] hover:border-white/[0.14] transition-colors'
                }`}
              >
                <h4 className="font-display text-[15px] font-semibold text-ink-primary mb-2">{doc.title}</h4>
                <p className="text-[13px] text-ink-secondary leading-[1.6]">{doc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

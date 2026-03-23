import type { Metadata } from 'next'
import { SectionHeader } from '@/components/ui'
import { isValidLang, type Lang } from '@/lib/i18n'

type LayerItem = { label: string; sub: string; accent?: boolean }
type ComponentItem = { name: string; desc: string }

function getCopy(lang: Lang) {
  if (lang === 'ru') {
    return {
      metaTitle: 'Протокол',
      metaDesc: 'Как работает PORA: от отправки действия до постоянной публичной записи.',
      tag: 'Протокол',
      title: 'Что такое Proof of Real Action',
      subtitle:
        'PORA — инфраструктура, которая превращает реальные гуманитарные действия в проверяемые и прозрачные цифровые записи.',
      p1: 'Классические цифровые системы фиксируют активность, но редко подтверждают реальное воздействие. PORA закрывает этот разрыв.',
      p2: 'Ценность формируется не спекуляцией, а проверяемым фактом действия и открытой подотчётностью.',
      p3: 'Ядро минимально: что считать валидным действием, как проверять и как записывать в общий реестр.',
      architecture: 'Архитектура системы',
      components: [
        { name: 'Действия', desc: 'Реальные гуманитарные события, отправленные участниками с подтверждающими данными.' },
        { name: 'Верификация', desc: 'Проверка соответствия стандартам протокола до записи.' },
        { name: 'Валидаторы', desc: 'Независимые участники сети, принимающие решения по заявкам.' },
        { name: 'Запись протокола', desc: 'Постоянная публичная запись в реестре PORA для каждого подтверждённого действия.' },
      ] as ComponentItem[],
      layers: [
        { label: 'СЛОЙ УЧАСТНИКОВ', sub: 'Отправка действий и доказательств' },
        { label: 'СЛОЙ ПРОВЕРКИ', sub: 'Проверка валидаторами и консенсус' },
        { label: 'ПРОТОКОЛЬНЫЙ СЛОЙ', sub: 'Стандарты PORA и правила записи' },
        { label: 'СЛОЙ РЕЕСТРА', sub: 'Постоянные публичные события', accent: true },
      ] as LayerItem[],
      api: 'Публичный доступ',
      portal: 'Веб-интерфейс',
      sdk: 'Интеграция разработчиков',
    }
  }

  if (lang === 'es') {
    return {
      metaTitle: 'Protocolo',
      metaDesc: 'Cómo funciona PORA: desde el envío de acciones hasta registros públicos permanentes.',
      tag: 'Protocolo',
      title: 'Qué es Proof of Real Action',
      subtitle:
        'PORA es infraestructura para convertir acciones humanitarias reales en registros digitales verificables y transparentes.',
      p1: 'Los sistemas digitales tradicionales registran actividad, pero rara vez prueban impacto real. PORA cierra esa brecha.',
      p2: 'El valor se crea con acciones verificables y trazabilidad pública, no con especulación.',
      p3: 'El núcleo es mínimo por diseño: qué es válido, cómo se verifica y cómo se registra.',
      architecture: 'Arquitectura del sistema',
      components: [
        { name: 'Acciones', desc: 'Eventos humanitarios reales enviados por participantes con evidencia.' },
        { name: 'Verificación', desc: 'Proceso de revisión para confirmar cumplimiento del protocolo.' },
        { name: 'Validadores', desc: 'Participantes independientes que aprueban o rechazan envíos.' },
        { name: 'Registro de protocolo', desc: 'Entrada pública y permanente en PORA para cada acción verificada.' },
      ] as ComponentItem[],
      layers: [
        { label: 'CAPA PARTICIPANTE', sub: 'Envío de acciones y evidencia' },
        { label: 'CAPA DE VERIFICACIÓN', sub: 'Revisión por validadores y consenso' },
        { label: 'CAPA DE PROTOCOLO', sub: 'Estándares PORA y lógica de registro' },
        { label: 'CAPA DE REGISTRO', sub: 'Eventos públicos permanentes', accent: true },
      ] as LayerItem[],
      api: 'Acceso público',
      portal: 'Interfaz web',
      sdk: 'Integración para desarrolladores',
    }
  }

  return {
    metaTitle: 'Protocol',
    metaDesc: 'How PORA works from action submission to permanent public records.',
    tag: 'Protocol',
    title: 'What is Proof of Real Action',
    subtitle:
      'PORA is infrastructure for turning real-world humanitarian events into verifiable and transparent digital records.',
    p1: 'Traditional digital systems track activity but rarely verify real-world impact. PORA bridges that gap.',
    p2: 'Value is created through verifiable actions and open accountability rather than speculation.',
    p3: 'The core is intentionally minimal: what is valid, how it is verified, and how it is recorded.',
    architecture: 'System architecture',
    components: [
      { name: 'Actions', desc: 'Real-world humanitarian events submitted with supporting evidence.' },
      { name: 'Verification', desc: 'Review flow that confirms compliance with protocol standards.' },
      { name: 'Validators', desc: 'Independent participants who approve or reject submissions.' },
      { name: 'Protocol record', desc: 'Permanent, public PORA ledger entry for each verified action.' },
    ] as ComponentItem[],
    layers: [
      { label: 'PARTICIPANT LAYER', sub: 'Action submission and evidence upload' },
      { label: 'VERIFICATION LAYER', sub: 'Validator review and consensus' },
      { label: 'PROTOCOL LAYER', sub: 'PORA standards and record logic' },
      { label: 'RECORD LAYER', sub: 'Permanent public protocol events', accent: true },
    ] as LayerItem[],
    api: 'Public access',
    portal: 'Web interface',
    sdk: 'Developer integration',
  }
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const c = getCopy(lang)
  return { title: c.metaTitle, description: c.metaDesc }
}

export default function ProtocolPage({ params }: { params: { lang: string } }) {
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className={`text-ink-secondary leading-[1.75] mb-5 font-light ${compactRu ? 'text-[14px]' : 'text-[15px]'}`}>{c.p1}</p>
            <p className={`text-ink-secondary leading-[1.75] mb-5 font-light ${compactRu ? 'text-[14px]' : 'text-[15px]'}`}>{c.p2}</p>
            <p className={`text-ink-secondary leading-[1.75] mb-8 font-light ${compactRu ? 'text-[14px]' : 'text-[15px]'}`}>{c.p3}</p>

            <div className="rounded-xl border border-white/[0.07] overflow-hidden divide-y divide-white/[0.07]">
              {c.components.map((item) => (
                <div key={item.name} className="bg-surface hover:bg-surface-2 transition-colors px-6 py-5 flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-amber shrink-0" />
                  <span className={`font-display font-semibold text-ink-primary shrink-0 ${compactRu ? 'text-[13px] w-40' : 'text-[14px] w-36'}`}>
                    {item.name}
                  </span>
                  <span className="text-[13px] text-ink-secondary leading-snug">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface border border-white/[0.07] rounded-2xl p-8">
            <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink-tertiary mb-6">{c.architecture}</p>

            <div className="flex flex-col gap-1">
              {c.layers.map((layer, i) => (
                <div key={layer.label}>
                  <div className={`rounded-lg border px-4 py-3.5 ${layer.accent ? 'border-amber/30 bg-amber-dim' : 'border-white/[0.07] bg-surface-2'}`}>
                    <p className={`font-mono text-[11px] tracking-[0.08em] mb-1 ${layer.accent ? 'text-amber' : 'text-ink-tertiary'}`}>{layer.label}</p>
                    <p className="text-[12px] text-ink-tertiary">{layer.sub}</p>
                  </div>
                  {i < c.layers.length - 1 && <div className="flex justify-center py-1.5"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 2v6M2.7 5.8 5 8.1l2.3-2.3" stroke="#E8855A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg></div>}
                </div>
              ))}

              <div className="flex justify-center py-1.5"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 2v6M2.7 5.8 5 8.1l2.3-2.3" stroke="#E8855A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { title: 'API', sub: c.api },
                  { title: 'Portal', sub: c.portal },
                  { title: 'SDK', sub: c.sdk },
                ].map((item) => (
                  <div key={item.title} className="bg-surface-2 border border-white/[0.07] rounded-lg px-3 py-3 text-center">
                    <p className="font-mono text-[11px] text-ink-tertiary mb-1">{item.title}</p>
                    <p className="text-[11px] text-ink-tertiary opacity-60 leading-tight">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

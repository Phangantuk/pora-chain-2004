import type { Metadata } from 'next'
import { SectionHeader, StatItem, Badge } from '@/components/ui'
import { isValidLang, type Lang } from '@/lib/i18n'

type EventRow = { location: string; hash: string; meals: string; time: string }
type Step = { num: string; title: string; desc: string }
type Copy = {
  metaTitle: string
  metaDesc: string
  tag: string
  title: string
  subtitle: string
  p1: string
  p2: string
  p3: string
  stats: Array<{ num: string; label: string }>
  feedTitle: string
  feedLive: string
  feedVerified: string
  events: EventRow[]
  howTitle: string
  steps: Step[]
}

function getCopy(lang: Lang): Copy {
  if (lang === 'ru') {
    return {
      metaTitle: 'Proof of Meal',
      metaDesc: 'Первый прикладной модуль PORA с проверкой реальных событий питания.',
      tag: 'Первая реализация',
      title: 'Proof of Meal',
      subtitle: 'Первый живой модуль PORA. Каждое событие раздачи питания отправляется, проверяется и фиксируется в протоколе.',
      p1: 'Proof of Meal подтверждает реальные события питания. Организация или участник проводит выдачу, прикладывает доказательства и отправляет событие в протокол PORA.',
      p2: 'Независимые валидаторы проверяют отправку. После подтверждения событие становится постоянной публичной записью с датой, локацией, количеством порций и источником.',
      p3: 'Участвовать могут и крупные НКО, и локальные инициативы. Протокол открыт, не требует разрешений и масштабируется по регионам.',
      stats: [
        { num: '840K', label: 'Проверено порций' },
        { num: '6,200', label: 'Записано событий' },
        { num: '28', label: 'Стран' },
        { num: '140+', label: 'Организаций' },
      ],
      feedTitle: 'Последние события протокола',
      feedLive: 'В эфире',
      feedVerified: 'Проверено',
      events: [
        { location: 'Community Kitchen - Lagos, Nigeria', hash: '0x3f8a...2c9e', meals: '+320 порций', time: '2ч назад' },
        { location: 'Shelter Canteen - Karachi, Pakistan', hash: '0xd12b...8f01', meals: '+180 порций', time: '5ч назад' },
        { location: 'Food Aid Distribution - Nairobi, Kenya', hash: '0x71ca...4d55', meals: '+540 порций', time: '8ч назад' },
        { location: 'Street Feeding Program - Manila, PH', hash: '0xaa3f...9b22', meals: '+210 порций', time: '12ч назад' },
        { location: 'Relief Kitchen - Istanbul, Turkey', hash: '0x5e7d...3c88', meals: '+460 порций', time: '16ч назад' },
      ],
      howTitle: 'Как работает верификация',
      steps: [
        {
          num: '01',
          title: 'Отправка события',
          desc: 'Участник фиксирует событие питания, указывает дату, локацию, количество порций и загружает подтверждение.',
        },
        {
          num: '02',
          title: 'Проверка валидаторами',
          desc: 'Два независимых валидатора проверяют запись по стандарту Proof of Meal. Для подтверждения нужны оба решения.',
        },
        {
          num: '03',
          title: 'Запись в протокол',
          desc: 'Подтверждённое событие записывается в слой реестра PORA и становится постоянной публичной записью.',
        },
      ],
    }
  }

  if (lang === 'es') {
    return {
      metaTitle: 'Proof of Meal',
      metaDesc: 'Primer módulo aplicado de PORA con verificación de eventos reales de alimentación.',
      tag: 'Primera implementación',
      title: 'Proof of Meal',
      subtitle: 'El primer módulo activo de PORA. Cada evento de alimentación se envía, verifica y registra en el protocolo.',
      p1: 'Proof of Meal verifica eventos reales de alimentación. Una organización o participante sirve comidas, adjunta evidencia y envía el evento al protocolo PORA.',
      p2: 'Validadores independientes revisan el envío. Tras aprobarse, el evento se convierte en un registro público permanente con fecha, ubicación, cantidad y origen.',
      p3: 'Puede participar desde una ONG grande hasta una cocina comunitaria local. El protocolo es abierto y escalable por regiones.',
      stats: [
        { num: '840K', label: 'Comidas verificadas' },
        { num: '6,200', label: 'Eventos registrados' },
        { num: '28', label: 'Países' },
        { num: '140+', label: 'Organizaciones' },
      ],
      feedTitle: 'Eventos recientes del protocolo',
      feedLive: 'En vivo',
      feedVerified: 'Verificado',
      events: [
        { location: 'Community Kitchen - Lagos, Nigeria', hash: '0x3f8a...2c9e', meals: '+320 comidas', time: 'hace 2h' },
        { location: 'Shelter Canteen - Karachi, Pakistan', hash: '0xd12b...8f01', meals: '+180 comidas', time: 'hace 5h' },
        { location: 'Food Aid Distribution - Nairobi, Kenya', hash: '0x71ca...4d55', meals: '+540 comidas', time: 'hace 8h' },
        { location: 'Street Feeding Program - Manila, PH', hash: '0xaa3f...9b22', meals: '+210 comidas', time: 'hace 12h' },
        { location: 'Relief Kitchen - Istanbul, Turkey', hash: '0x5e7d...3c88', meals: '+460 comidas', time: 'hace 16h' },
      ],
      howTitle: 'Cómo funciona la verificación',
      steps: [
        {
          num: '01',
          title: 'Enviar evento',
          desc: 'Un participante registra el evento con fecha, ubicación, número de comidas y evidencia.',
        },
        {
          num: '02',
          title: 'Revisión de validadores',
          desc: 'Dos validadores independientes revisan el envío según el estándar Proof of Meal.',
        },
        {
          num: '03',
          title: 'Registro en protocolo',
          desc: 'Los eventos aprobados se escriben en PORA como registros públicos, permanentes y consultables.',
        },
      ],
    }
  }

  return {
    metaTitle: 'Proof of Meal',
    metaDesc: 'The first live PORA module for verifiable real-world feeding events.',
    tag: 'First implementation',
    title: 'Proof of Meal',
    subtitle: 'The first live PORA module. Every feeding event is submitted, verified, and permanently recorded on the protocol.',
    p1: 'Proof of Meal verifies real-world feeding events. An organization or participant serves meals, attaches evidence, and submits the event to PORA.',
    p2: 'Independent validators review each submission. Confirmed events become permanent public records with date, location, meal count, and source.',
    p3: 'Participation is open to both large NGOs and local kitchens. The protocol is permissionless and designed to scale by region.',
    stats: [
      { num: '840K', label: 'Meals verified' },
      { num: '6,200', label: 'Events recorded' },
      { num: '28', label: 'Countries' },
      { num: '140+', label: 'Organizations' },
    ],
    feedTitle: 'Recent protocol events',
    feedLive: 'Live',
    feedVerified: 'Verified',
    events: [
      { location: 'Community Kitchen - Lagos, Nigeria', hash: '0x3f8a...2c9e', meals: '+320 meals', time: '2h ago' },
      { location: 'Shelter Canteen - Karachi, Pakistan', hash: '0xd12b...8f01', meals: '+180 meals', time: '5h ago' },
      { location: 'Food Aid Distribution - Nairobi, Kenya', hash: '0x71ca...4d55', meals: '+540 meals', time: '8h ago' },
      { location: 'Street Feeding Program - Manila, PH', hash: '0xaa3f...9b22', meals: '+210 meals', time: '12h ago' },
      { location: 'Relief Kitchen - Istanbul, Turkey', hash: '0x5e7d...3c88', meals: '+460 meals', time: '16h ago' },
    ],
    howTitle: 'How verification works',
    steps: [
      {
        num: '01',
        title: 'Submit event',
        desc: 'A participant logs a feeding event with date, location, meal count, and evidence.',
      },
      {
        num: '02',
        title: 'Validator review',
        desc: 'Two independent validators review the submission against the Proof of Meal standard.',
      },
      {
        num: '03',
        title: 'Protocol record',
        desc: 'Approved events are written to the PORA record layer as public and permanent entries.',
      },
    ],
  }
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const c = getCopy(lang)
  return { title: c.metaTitle, description: c.metaDesc }
}

export default function ProofOfMealPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const c = getCopy(lang)
  const compactRu = lang === 'ru'

  return (
    <>
      <section className="bg-surface/50 border-b border-white/[0.07] px-6 lg:px-12 pt-32 pb-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="section-tag mb-0">{c.tag}</span>
            <Badge variant="live">{c.feedLive}</Badge>
          </div>
          <SectionHeader tag={c.tag} title={c.title} subtitle={c.subtitle} />
        </div>
      </section>

      <section className="px-6 lg:px-12 py-24 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[15px] text-ink-secondary leading-[1.75] mb-5 font-light">{c.p1}</p>
            <p className="text-[15px] text-ink-secondary leading-[1.75] mb-5 font-light">{c.p2}</p>
            <p className="text-[15px] text-ink-secondary leading-[1.75] mb-8 font-light">{c.p3}</p>

            <div className="grid grid-cols-2 border border-white/[0.07] rounded-2xl overflow-hidden divide-x divide-y divide-white/[0.07]">
              {c.stats.map((s) => (
                <StatItem key={s.label} num={s.num} label={s.label} />
              ))}
            </div>
          </div>

          <div className="bg-surface border border-white/[0.07] rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/[0.07] bg-surface-2 flex items-center justify-between">
              <span className="font-mono-pora text-[11px] tracking-[0.1em] uppercase text-ink-tertiary">{c.feedTitle}</span>
              <span className="flex items-center gap-1.5 font-mono-pora text-[10px] text-green">
                <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse-dot" />
                {c.feedLive}
              </span>
            </div>
            {c.events.map((ev) => (
              <div
                key={ev.hash}
                className="px-6 py-4 border-b border-white/[0.07] last:border-0 flex items-center justify-between gap-4"
              >
                <div>
                  <p className={compactRu ? 'text-[12.5px] text-ink-secondary mb-1 leading-snug' : 'text-[13px] text-ink-secondary mb-1'}>{ev.location}</p>
                  <p className="font-mono-pora text-[11px] text-ink-tertiary">
                    {ev.hash} | {c.feedVerified} | {ev.time}
                  </p>
                </div>
                <span className="font-mono-pora text-[12px] text-amber shrink-0">{ev.meals}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface/50 border-t border-white/[0.07] px-6 lg:px-12 py-20">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-display text-[28px] font-bold text-ink-primary mb-12 tracking-tight">{c.howTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.steps.map((step) => (
              <div
                key={step.num}
                className="bg-surface border border-white/[0.07] rounded-xl p-7"
              >
                <div className="w-[30px] h-[30px] rounded-lg bg-amber-dim border border-amber/30 flex items-center justify-center font-mono-pora text-[11px] text-amber mb-4">
                  {step.num}
                </div>
                <h4 className={compactRu ? 'font-display text-[16px] font-bold text-ink-primary mb-2.5 leading-tight' : 'font-display text-[17px] font-bold text-ink-primary mb-2.5'}>
                  {step.title}
                </h4>
                <p className="text-[13.5px] text-ink-secondary leading-[1.65]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

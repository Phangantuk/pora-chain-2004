'use client'

import { useState } from 'react'
import { getT, isValidLang, type Lang } from '@/lib/i18n'

export default function ProfilePage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const t = getT(lang)
  const m = t.meal
  const compactRu = lang === 'ru'

  const x = {
    pageTitle: lang === 'ru' ? 'Профиль' : lang === 'es' ? 'Perfil' : 'Profile',
    sectionAccount: lang === 'ru' ? 'Данные аккаунта' : lang === 'es' ? 'Datos de cuenta' : 'Account details',
    sectionPrefs: lang === 'ru' ? 'Настройки' : lang === 'es' ? 'Preferencias' : 'Preferences',
    save: lang === 'ru' ? 'Сохранить изменения' : lang === 'es' ? 'Guardar cambios' : 'Save changes',
    saved: lang === 'ru' ? 'Сохранено' : lang === 'es' ? 'Guardado' : 'Saved',
    notify:
      lang === 'ru'
        ? 'Email-уведомления о событиях влияния'
        : lang === 'es'
          ? 'Notificaciones por correo sobre eventos de impacto'
          : 'Email notifications for impact events',
    public:
      lang === 'ru'
        ? 'Показывать мои пожертвования в explorer'
        : lang === 'es'
          ? 'Mostrar mis donaciones en el explorador'
          : 'Show my donations publicly in the explorer',
    demoName: lang === 'ru' ? 'Демо пользователь' : lang === 'es' ? 'Usuario demo' : 'Demo user',
    demoCountry: lang === 'ru' ? 'Германия' : lang === 'es' ? 'Alemania' : 'Germany',
  }

  type ProfileState = {
    name: string
    email: string
    country: string
    notify: boolean
    public: boolean
  }

  const [profile, setProfile] = useState<ProfileState>({
    name: x.demoName,
    email: 'demo@meal.protocol',
    country: x.demoCountry,
    notify: true,
    public: false,
  })
  const [saved, setSaved] = useState(false)

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="px-6 lg:px-8 py-8 max-w-lg">
      <h1 className={`font-bold text-white mb-8 ${compactRu ? 'text-[20px]' : 'text-[22px]'}`}>{x.pageTitle}</h1>

      <form onSubmit={handleSave} className="flex flex-col gap-6">
        <Section title={x.sectionAccount}>
          {[
            { field: 'name' as const, label: m.nameLabel, type: 'text' },
            { field: 'email' as const, label: m.emailLabel, type: 'email' },
            { field: 'country' as const, label: m.countryLabel, type: 'text' },
          ].map(({ field, label, type }) => (
            <div key={field}>
              <label className="font-mono text-[11px] tracking-[0.1em] uppercase text-white/30 mb-2 block">{label}</label>
              <input
                type={type}
                value={profile[field]}
                onChange={(e) => setProfile((p) => ({ ...p, [field]: e.target.value }))}
                className="w-full bg-[#0C0C0E] border border-white/[0.08] rounded-xl px-4 py-3 text-[14px] text-white focus:outline-none focus:border-[#E8855A]/40 transition-colors"
              />
            </div>
          ))}
        </Section>

        <Section title={x.sectionPrefs}>
          {[
            { field: 'notify' as const, label: x.notify },
            { field: 'public' as const, label: x.public },
          ].map(({ field, label }) => (
            <label key={field} className="flex items-center gap-3 cursor-pointer">
              <button
                type="button"
                onClick={() => setProfile((p) => ({ ...p, [field]: !p[field] }))}
                className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${profile[field] ? 'bg-[#E8855A]' : 'bg-white/[0.1]'}`}
              >
                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${profile[field] ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
              <span className="text-[13px] text-white/50 font-light leading-snug">{label}</span>
            </label>
          ))}
        </Section>

        <div className="flex items-center gap-4">
          <button type="submit" className="px-6 py-2.5 rounded-xl bg-[#E8855A] text-[#0D0805] font-semibold text-[14px] hover:bg-[#f0966e] transition-all duration-200">
            {x.save}
          </button>
          {saved && <span className="font-mono text-[12px] text-[#4ECAA0]">{x.saved}</span>}
        </div>
      </form>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl p-6 flex flex-col gap-4">
      <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-white/25">{title}</p>
      {children}
    </div>
  )
}

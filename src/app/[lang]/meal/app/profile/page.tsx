'use client'

import { useState } from 'react'
import { getT, isValidLang, type Lang } from '@/lib/i18n'

export default function ProfilePage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? params.lang as Lang : 'en'
  const t = getT(lang)
  const m = t.meal

  const [profile, setProfile] = useState({
    name:    'Demo User',
    email:   'demo@meal.protocol',
    country: 'Germany',
    notify:  true,
    public:  false,
  })
  const [saved, setSaved] = useState(false)

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="px-6 lg:px-8 py-8 max-w-lg">
      <h1 className="font-bold text-[22px] text-white mb-8">Profile</h1>

      <form onSubmit={handleSave} className="flex flex-col gap-6">
        <Section title="Account details">
          {[
            { field: 'name',    label: m.nameLabel,    type: 'text' },
            { field: 'email',   label: m.emailLabel,   type: 'email' },
            { field: 'country', label: m.countryLabel, type: 'text' },
          ].map(({ field, label, type }) => (
            <div key={field}>
              <label className="font-mono text-[11px] tracking-[0.1em] uppercase text-white/30 mb-2 block">{label}</label>
              <input type={type} value={(profile as any)[field]}
                onChange={e => setProfile(p => ({ ...p, [field]: e.target.value }))}
                className="w-full bg-[#0C0C0E] border border-white/[0.08] rounded-xl px-4 py-3 text-[14px] text-white focus:outline-none focus:border-[#E8855A]/40 transition-colors" />
            </div>
          ))}
        </Section>

        <Section title="Preferences">
          {[
            { field: 'notify', label: 'Email notifications for impact events' },
            { field: 'public', label: 'Show my donations publicly in the explorer' },
          ].map(({ field, label }) => (
            <label key={field} className="flex items-center gap-3 cursor-pointer">
              <div
                onClick={() => setProfile(p => ({ ...p, [field]: !(p as any)[field] }))}
                className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${(profile as any)[field] ? 'bg-[#E8855A]' : 'bg-white/[0.1]'}`}>
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${(profile as any)[field] ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
              <span className="text-[13px] text-white/50 font-light">{label}</span>
            </label>
          ))}
        </Section>

        <div className="flex items-center gap-4">
          <button type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#E8855A] text-[#0D0805] font-semibold text-[14px] hover:bg-[#f0966e] transition-all duration-200">
            Save changes
          </button>
          {saved && <span className="font-mono text-[12px] text-[#4ECAA0]">✓ Saved</span>}
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

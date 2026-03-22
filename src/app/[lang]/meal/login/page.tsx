'use client'

import { useState } from 'react'
import Link from 'next/link'
import { getT, isValidLang, type Lang } from '@/lib/i18n'

export default function LoginPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? params.lang as Lang : 'en'
  const t = getT(lang)
  const m = t.meal
  const lp = (p: string) => `/${lang}${p}`

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [done,     setDone]     = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setDone(true) }, 1200)
  }

  if (done) {
    return (
      <div className="bg-[#070707] text-white min-h-screen flex items-center justify-center px-6">
        <div className="max-w-sm w-full text-center">
          <div className="w-16 h-16 rounded-full bg-[#4ECAA0]/15 border border-[#4ECAA0]/30 flex items-center justify-center mx-auto mb-5">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M5 14l6 6 12-11" stroke="#4ECAA0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <h2 className="font-bold text-[24px] text-white mb-2">Welcome back</h2>
          <p className="text-[14px] text-white/40 mb-6 font-light">Redirecting to your dashboard…</p>
          <Link href={lp('/meal/dashboard')}
            className="block w-full py-3 rounded-xl bg-[#E8855A] text-[#0D0805] font-semibold text-[14px] hover:bg-[#f0966e] transition-all text-center">
            Open Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#070707] text-white min-h-screen flex flex-col items-center justify-center px-6 py-16">

      {/* Logo area */}
      <div className="mb-8 text-center">
        <Link href={lp('/meal')} className="font-mono text-[11px] text-white/25 hover:text-[#E8855A] transition-colors mb-4 block">{m.backToMeal}</Link>
        <div className="w-12 h-12 rounded-xl border border-[#E8855A]/30 bg-[#E8855A]/10 flex items-center justify-center mx-auto mb-4">
          <span className="font-mono font-bold text-[16px] text-[#E8855A]">M</span>
        </div>
        <h1 className="font-bold text-[26px] text-white mb-1">{m.loginTitle}</h1>
        <p className="text-[14px] text-white/40 font-light">{m.loginSub}</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-4">
        <div>
          <label className="font-mono text-[11px] tracking-[0.1em] uppercase text-white/30 mb-2 block">{m.emailLabel}</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
            placeholder="you@example.com"
            className="w-full bg-[#0C0C0E] border border-white/[0.08] rounded-xl px-4 py-3.5 text-[14px] text-white placeholder:text-white/20 focus:outline-none focus:border-[#E8855A]/40 transition-colors" />
        </div>
        <div>
          <label className="font-mono text-[11px] tracking-[0.1em] uppercase text-white/30 mb-2 block">{m.passwordLabel}</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
            placeholder="••••••••"
            className="w-full bg-[#0C0C0E] border border-white/[0.08] rounded-xl px-4 py-3.5 text-[14px] text-white placeholder:text-white/20 focus:outline-none focus:border-[#E8855A]/40 transition-colors" />
        </div>
        <button type="submit" disabled={loading}
          className="w-full py-3.5 rounded-xl bg-[#E8855A] text-[#0D0805] font-semibold text-[14px] hover:bg-[#f0966e] hover:shadow-[0_8px_24px_rgba(232,133,90,0.3)] disabled:opacity-60 transition-all duration-200 mt-1">
          {loading ? 'Signing in…' : m.loginCta}
        </button>
      </form>

      <p className="mt-6 text-[13px] text-white/30 font-light">
        {m.noAccount}{' '}
        <Link href={lp('/meal/register')} className="text-[#E8855A] hover:text-[#f0966e] transition-colors">
          {m.registerCta}
        </Link>
      </p>

      <div className="mt-8 px-5 py-3.5 bg-[#0C0C0E] border border-white/[0.06] rounded-xl max-w-sm w-full">
        <p className="font-mono text-[10px] text-white/20 text-center">Demo — no real auth yet. Any email/password works.</p>
      </div>
    </div>
  )
}

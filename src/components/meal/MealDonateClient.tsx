'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getT, type Lang } from '@/lib/i18n'
import { REGIONS, formatUsd } from '@/lib/meal/data'
import { MealNav } from '@/components/meal/MealNav'

const METHODS = [
  { id: 'usdt', label: 'USDT TRC20', icon: 'рџ’Ћ', network: 'TRON', note: 'Fastest, lowest fees' },
  { id: 'eth', label: 'ETH / ERC20', icon: 'вџ ', network: 'Ethereum', note: 'ERC20 tokens supported' },
  { id: 'fiat', label: 'Bank / Card', icon: 'рџ’і', network: 'Coming soon', note: 'Fiat onramp coming soon', disabled: true },
]

const PRESET_AMOUNTS = [25, 50, 100, 250, 500]

interface MealDonateClientProps {
  lang: Lang
  initialRegion?: string
}

export function MealDonateClient({ lang, initialRegion = '' }: MealDonateClientProps) {
  const t = getT(lang)
  const m = t.meal
  const lp = (path: string) => `/${lang}${path}`

  const [region, setRegion] = useState(initialRegion)
  const [amount, setAmount] = useState('100')
  const [method, setMethod] = useState('usdt')
  const [step, setStep] = useState<'form' | 'confirm' | 'success'>('form')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setRegion(initialRegion)
  }, [initialRegion])

  const selectedRegion = REGIONS.find((item) => item.slug === region)
  const selectedMethod = METHODS.find((item) => item.id === method)
  const amountNum = Number(amount) || 0

  function handleSubmit() {
    if (!region || amountNum <= 0) return
    setStep('confirm')
  }

  function handleConfirm() {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep('success')
    }, 1800)
  }

  if (step === 'success') {
    return (
      <div className="bg-[#070707] text-white min-h-screen">
        <MealNav lang={lang} />
        <div className="max-w-lg mx-auto px-6 pt-24 pb-20 text-center">
          <div className="w-20 h-20 rounded-full bg-[#4ECAA0]/15 border border-[#4ECAA0]/30 flex items-center justify-center mx-auto mb-6">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path d="M7 18l7 7 15-14" stroke="#4ECAA0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="font-bold text-[32px] text-white mb-3">{m.donateSuccess}</h1>
          <p className="text-[15px] text-white/45 font-light leading-relaxed mb-8 max-w-sm mx-auto">{m.donateSuccessSub}</p>

          {selectedRegion && (
            <div className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl p-6 mb-8 text-left">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[24px]">{selectedRegion.emoji}</span>
                  <div>
                    <p className="font-semibold text-[14px] text-white/90">{selectedRegion.name}</p>
                    <p className="font-mono text-[10px] text-white/30">{selectedRegion.country}</p>
                  </div>
                </div>
                <p className="font-mono text-[22px] font-semibold text-[#E8855A]">{formatUsd(amountNum)}</p>
              </div>
              <div className="font-mono text-[11px] text-white/25">
                <p>Method: {selectedMethod?.label}</p>
                <p className="mt-1">Status: <span className="text-[#F5C542]">Processing</span></p>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <Link href={lp('/meal/explorer')} className="block w-full py-3 rounded-xl bg-[#E8855A] text-[#0D0805] font-semibold text-[14px] hover:bg-[#f0966e] transition-all duration-200 text-center">
              {m.ctaExplorer}
            </Link>
            <Link href={lp('/meal/regions')} className="block w-full py-3 rounded-xl border border-white/[0.08] text-white/50 font-medium text-[14px] hover:text-white/80 transition-all duration-200 text-center">
              {m.ctaRegions}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#070707] text-white min-h-screen">
      <MealNav lang={lang} />

      <section className="relative border-b border-white/[0.06] px-6 pt-16 pb-10">
        <div className="relative max-w-2xl mx-auto">
          <Link href={lp('/meal')} className="font-mono text-[11px] text-white/25 hover:text-[#E8855A] transition-colors mb-5 block">{m.backToMeal}</Link>
          <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#E8855A] mb-3">Donation</p>
          <h1 className="font-bold text-[clamp(28px,4vw,40px)] tracking-tight text-white mb-2">{m.donateTitle}</h1>
          <p className="text-[15px] text-white/40 font-light">{m.donateSub}</p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-6 py-10">
        {step === 'form' ? (
          <div className="flex flex-col gap-8">
            <div>
              <Label>{m.selectRegion}</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {REGIONS.map((item) => {
                  const pct = Math.min(100, Math.round((item.raisedUsd / item.goalUsd) * 100))
                  const active = region === item.slug
                  return (
                    <button
                      key={item.slug}
                      onClick={() => setRegion(item.slug)}
                      className={`text-left rounded-xl border p-4 transition-all duration-200 ${active ? 'border-[#E8855A]/50 bg-[#E8855A]/[0.06]' : 'border-white/[0.07] bg-[#0C0C0E] hover:border-white/[0.14]'}`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[18px]">{item.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className={`text-[13px] font-semibold truncate ${active ? 'text-white' : 'text-white/70'}`}>{item.name}</p>
                          <p className="font-mono text-[10px] text-white/25">{item.country}</p>
                        </div>
                        {item.status === 'urgent' && <span className="font-mono text-[9px] text-[#F5C542] bg-[#F5C542]/10 border border-[#F5C542]/25 px-1.5 py-0.5 rounded shrink-0">{m.urgent}</span>}
                      </div>
                      <div className="h-1 bg-white/[0.05] rounded-full overflow-hidden">
                        <div className="h-full bg-[#E8855A] rounded-full" style={{ width: `${pct}%`, opacity: active ? 1 : 0.5 }} />
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <Label>{m.enterAmount}</Label>
              <div className="flex flex-wrap gap-2 mb-3">
                {PRESET_AMOUNTS.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setAmount(String(preset))}
                    className={`font-mono text-[13px] px-4 py-2 rounded-lg border transition-all duration-200 ${amount === String(preset) ? 'border-[#E8855A]/50 bg-[#E8855A]/[0.08] text-[#E8855A]' : 'border-white/[0.07] text-white/45 hover:border-white/[0.15]'}`}
                  >
                    ${preset}
                  </button>
                ))}
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-[15px] text-white/30">$</span>
                <input
                  type="number"
                  min="1"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  className="w-full bg-[#0C0C0E] border border-white/[0.07] rounded-xl pl-9 pr-4 py-3.5 font-mono text-[16px] text-white focus:outline-none focus:border-[#E8855A]/40 transition-colors"
                  placeholder="Enter amount"
                />
              </div>
            </div>

            <div>
              <Label>{m.selectMethod}</Label>
              <div className="flex flex-col gap-2">
                {METHODS.map((option) => {
                  const active = method === option.id && !option.disabled
                  return (
                    <button
                      key={option.id}
                      onClick={() => !option.disabled && setMethod(option.id)}
                      disabled={option.disabled}
                      className={`flex items-center gap-4 text-left rounded-xl border p-4 transition-all duration-200 ${option.disabled ? 'opacity-40 cursor-not-allowed border-white/[0.05]' : active ? 'border-[#E8855A]/50 bg-[#E8855A]/[0.06]' : 'border-white/[0.07] bg-[#0C0C0E] hover:border-white/[0.14]'}`}
                    >
                      <span className="text-[22px] shrink-0">{option.icon}</span>
                      <div className="flex-1">
                        <p className={`font-semibold text-[14px] ${active ? 'text-white' : 'text-white/70'}`}>{option.label}</p>
                        <p className="font-mono text-[10px] text-white/30">{option.network} В· {option.note}</p>
                      </div>
                      {active && (
                        <div className="w-5 h-5 rounded-full bg-[#E8855A] flex items-center justify-center shrink-0">
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 3.5-4" stroke="#0D0805" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {selectedRegion && amountNum > 0 && (
              <div className="bg-[#0C0C0E] border border-[#E8855A]/20 rounded-2xl p-5 flex items-center justify-between">
                <div>
                  <p className="text-[13px] text-white/50 mb-0.5">Donating to</p>
                  <p className="font-semibold text-[15px] text-white">{selectedRegion.emoji} {selectedRegion.name}</p>
                </div>
                <p className="font-mono text-[24px] font-semibold text-[#E8855A]">{formatUsd(amountNum)}</p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={!region || amountNum <= 0}
              className="w-full py-4 rounded-xl bg-[#E8855A] text-[#0D0805] font-semibold text-[15px] hover:bg-[#f0966e] hover:shadow-[0_8px_32px_rgba(232,133,90,0.3)] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
            >
              {m.submitDonation}
            </button>
          </div>
        ) : (
          <div className="max-w-lg mx-auto">
            <h2 className="font-bold text-[22px] text-white mb-6">Confirm your donation</h2>
            <div className="bg-[#0C0C0E] border border-white/[0.07] rounded-2xl p-6 mb-6 flex flex-col gap-4">
              {[
                { label: 'Region', value: `${selectedRegion?.emoji} ${selectedRegion?.name ?? ''}` },
                { label: 'Amount', value: formatUsd(amountNum) },
                { label: 'Method', value: selectedMethod?.label ?? '' },
                { label: 'Network', value: selectedMethod?.network ?? '' },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between">
                  <span className="font-mono text-[12px] text-white/30">{row.label}</span>
                  <span className="font-semibold text-[14px] text-white/85">{row.value}</span>
                </div>
              ))}
            </div>
            <p className="text-[13px] text-white/30 font-light leading-relaxed mb-6">{m.confirmNote}</p>
            <div className="flex gap-3">
              <button
                onClick={() => setStep('form')}
                className="flex-1 py-3 rounded-xl border border-white/[0.08] text-white/50 font-medium text-[14px] hover:text-white/80 transition-all duration-200"
              >
                {m.confirmBack}
              </button>
              <button
                onClick={handleConfirm}
                disabled={loading}
                className="flex-[2] py-3 rounded-xl bg-[#E8855A] text-[#0D0805] font-semibold text-[14px] hover:bg-[#f0966e] disabled:opacity-60 transition-all duration-200"
              >
                {loading ? m.processingText : m.submitDonation}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/30 mb-3">{children}</p>
}

'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import Link from 'next/link'
import { EventTable, type ScanEvent } from '@/components/EventTable'
import { getT, isValidLang, type Lang } from '@/lib/i18n'

const API_BASE      = process.env.NEXT_PUBLIC_EXPLORER_API ?? ''
const DEMO_MODE     = !API_BASE
const EVENTS_URL    = API_BASE ? `${API_BASE}/api/events` : null
const POLL_INTERVAL = 3_000

function PulseDot({ active }: { active: boolean }) {
  return (
    <span className="relative inline-flex h-2 w-2 shrink-0">
      {active && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ECAA0] opacity-60" />}
      <span className="relative inline-flex rounded-full h-2 w-2 transition-colors duration-500"
        style={{ backgroundColor: active ? '#4ECAA0' : 'rgba(255,255,255,0.15)' }} />
    </span>
  )
}

function StatPill({ label, value, accent = false }: { label: string; value: number | string; accent?: boolean }) {
  return (
    <div className={['rounded-xl px-5 py-3.5 border flex items-center gap-4', accent ? 'bg-[#E8855A]/[0.07] border-[#E8855A]/25' : 'bg-white/[0.03] border-white/[0.07]'].join(' ')}>
      <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-white/35">{label}</span>
      <span className={`font-mono text-[22px] font-semibold leading-none ${accent ? 'text-[#E8855A]' : 'text-white/80'}`}>{value}</span>
    </div>
  )
}

function DemoBanner({ label, hint }: { label: string; hint: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-[#F5C542]/20 bg-[#F5C542]/[0.04] px-5 py-4 mb-6">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#F5C542]/70 shrink-0 mt-0.5">
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M8 5v3.5M8 11h.01" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
      <div>
        <p className="font-mono text-[11px] text-[#F5C542]/80 tracking-wide">{label}</p>
        <p className="font-mono text-[10px] text-white/25 mt-1 leading-relaxed">{hint}</p>
      </div>
    </div>
  )
}

export default function ExplorerPage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const t    = getT(lang)
  const ex   = t.explorer
  const lp   = (path: string) => `/${lang}${path}`

  const [events,   setEvents]   = useState<ScanEvent[]>([])
  const [loading,  setLoading]  = useState(!DEMO_MODE)
  const [error,    setError]    = useState<string | null>(null)
  const [lastPoll, setLastPoll] = useState<Date | null>(null)
  const [polling,  setPolling]  = useState(false)
  const [newCount, setNewCount] = useState(0)
  const prevCount = useRef(0)

  const fetchEvents = useCallback(async (silent = false) => {
    if (!EVENTS_URL) return
    if (!silent) setLoading(true)
    setPolling(true)
    setError(null)
    try {
      const res = await fetch(EVENTS_URL, { cache: 'no-store', headers: { Accept: 'application/json' } })
      if (!res.ok) throw new Error(`${ex.errorPrefix}: HTTP ${res.status}`)
      const data = await res.json()
      const raw: ScanEvent[] = Array.isArray(data) ? data : (data.events ?? [])
      setEvents(raw)
      setLastPoll(new Date())
      if (prevCount.current > 0 && raw.length > prevCount.current) {
        setNewCount(n => n + (raw.length - prevCount.current))
      }
      prevCount.current = raw.length
    } catch (err) {
      setError(err instanceof Error ? err.message : ex.errorPrefix)
    } finally {
      setLoading(false)
      setTimeout(() => setPolling(false), 400)
    }
  }, [ex.errorPrefix])

  useEffect(() => { if (!DEMO_MODE) fetchEvents() }, [fetchEvents])
  useEffect(() => {
    if (DEMO_MODE) return
    const id = setInterval(() => fetchEvents(true), POLL_INTERVAL)
    return () => clearInterval(id)
  }, [fetchEvents])

  const isLive = !DEMO_MODE && !error

  return (
    <div className="bg-[#070707] text-white min-h-screen">
      <section className="relative border-b border-white/[0.06] px-6 pt-28 pb-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[280px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(78,202,160,0.06), transparent 65%)' }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.018]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="relative max-w-4xl mx-auto">
          <div className="flex items-center gap-2 font-mono text-[10px] text-white/20 mb-7 tracking-wide">
            <Link href={lp('/')} className="hover:text-white/50 transition-colors">{t.common.backHome}</Link>
            <span>/</span>
            <span className="text-[#4ECAA0]/60">{ex.metaTitle}</span>
          </div>
          <div className={['inline-flex items-center gap-2.5 mb-5 px-3.5 py-1.5 rounded-full border', DEMO_MODE ? 'border-[#F5C542]/25 bg-[#F5C542]/10' : 'border-[#4ECAA0]/25 bg-[#4ECAA0]/10'].join(' ')}>
            <PulseDot active={isLive} />
            <span className={['font-mono text-[11px] tracking-[0.1em] uppercase', DEMO_MODE ? 'text-[#F5C542]' : 'text-[#4ECAA0]'].join(' ')}>
              {DEMO_MODE ? ex.demoMode : error ? ex.errorPrefix : `${t.common.live} (${ex.refresh.toLowerCase()} 3s)`}
            </span>
          </div>
          <h1 className="font-bold text-[clamp(32px,5vw,52px)] leading-[1.06] tracking-tight text-white mb-2">{ex.pageTitle}</h1>
          <p className="text-[15px] text-white/40 font-light">{ex.pageSub}</p>
          <div className="flex flex-wrap gap-3 mt-8">
            <StatPill label={ex.totalEvents} value={events.length} accent />
            {newCount > 0 && <StatPill label={ex.newSession} value={`+${newCount}`} />}
            {lastPoll && (
              <div className="rounded-xl px-5 py-3.5 border border-white/[0.07] bg-white/[0.03] flex items-center gap-3">
                <PulseDot active={polling} />
                <span className="font-mono text-[11px] tracking-[0.06em] text-white/30">
                  {ex.lastUpdated} {lastPoll.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="max-w-4xl mx-auto">
          {DEMO_MODE && <DemoBanner label={ex.demoMode} hint={ex.demoHint} />}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-white/25">
                {ex.showing} {Math.min(events.length, 50)} / {events.length}
              </span>
              {loading && events.length > 0 && (
                <span className="font-mono text-[10px] text-[#4ECAA0]/50 animate-pulse">{ex.refreshing}</span>
              )}
            </div>
            {!DEMO_MODE && (
              <button
                onClick={() => fetchEvents(true)}
                disabled={loading}
                className="inline-flex items-center gap-1.5 font-mono text-[11px] px-3 py-1.5 rounded-lg border border-white/[0.08] text-white/35 hover:text-white/70 hover:border-white/[0.16] hover:bg-white/[0.04] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={loading ? 'animate-spin' : ''}>
                  <path d="M10 6A4 4 0 112 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  <path d="M10 3v3H7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {ex.refresh}
              </button>
            )}
          </div>
          <EventTable
            events={events}
            loading={loading}
            error={error}
            lang={lang}
            labels={{
              colId:        ex.colId,
              colTime:      ex.colTime,
              colAge:       ex.colAge,
              loading:      ex.loading,
              noEvents:     ex.noEvents,
              noEventsHint: ex.noEventsHint,
              errorPrefix:  ex.errorPrefix,
            }}
          />
          {!DEMO_MODE && (
            <div className="mt-4 flex items-center gap-2">
              <span className="font-mono text-[10px] text-white/15 tracking-wide">endpoint</span>
              <code className="font-mono text-[10px] text-white/20 bg-white/[0.03] border border-white/[0.05] px-2 py-0.5 rounded">
                {EVENTS_URL}
              </code>
            </div>
          )}
        </div>
      </section>

      <style>{`@keyframes rowFadeIn { from { opacity:0; background:rgba(78,202,160,0.06); } to { opacity:1; background:transparent; } }`}</style>
    </div>
  )
}

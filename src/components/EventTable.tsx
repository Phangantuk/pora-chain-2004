'use client'

import { useMemo } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────
export interface ScanEvent {
  id:   string   // from backend
  time: string   // ISO string from backend
  [key: string]: unknown
}

export interface EventTableLabels {
  colId:        string
  colTime:      string
  colAge:       string
  loading:      string
  noEvents:     string
  noEventsHint: string
  errorPrefix:  string
}

const DEFAULT_LABELS: EventTableLabels = {
  colId:        'QR ID',
  colTime:      'Time',
  colAge:       'Age',
  loading:      'Loading events…',
  noEvents:     'No events yet',
  noEventsHint: 'Waiting for QR scans…',
  errorPrefix:  'Could not load events',
}

interface EventTableProps {
  events:  ScanEvent[]
  loading: boolean
  error:   string | null
  labels?: Partial<EventTableLabels>
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatTime(iso: string): string {
  const d = new Date(iso)
  if (isNaN(d.getTime())) return iso
  return d.toLocaleString(undefined, {
    year:   'numeric',
    month:  '2-digit',
    day:    '2-digit',
    hour:   '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
}

function timeAgo(iso: string): string {
  const secs = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (secs < 5)    return 'just now'
  if (secs < 60)   return `${secs}s ago`
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`
  return `${Math.floor(secs / 3600)}h ago`
}

// ─── Skeleton row ─────────────────────────────────────────────────────────────
function SkeletonRow() {
  return (
    <div className="grid grid-cols-[1fr_1fr] sm:grid-cols-[1fr_1fr_120px] border-b border-white/[0.04]">
      <div className="px-5 py-3.5">
        <div className="h-3 w-48 rounded-md bg-white/[0.06] animate-pulse" />
      </div>
      <div className="px-5 py-3.5">
        <div className="h-3 w-36 rounded-md bg-white/[0.06] animate-pulse" />
      </div>
      <div className="px-5 py-3.5 hidden sm:block">
        <div className="h-3 w-16 rounded-md bg-white/[0.06] animate-pulse" />
      </div>
    </div>
  )
}

// ─── EventTable ───────────────────────────────────────────────────────────────
export function EventTable({ events, loading, error, labels = {} }: EventTableProps) {
  const L = { ...DEFAULT_LABELS, ...labels }

  const sorted = useMemo(
    () =>
      [...events]
        .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
        .slice(0, 50),
    [events],
  )

  return (
    <div
      className="rounded-2xl overflow-hidden border border-white/[0.07] bg-[#0C0C0E]"
      style={{ boxShadow: 'inset 0 1px 0 rgba(232,133,90,0.05)' }}
    >
      {/* Header */}
      <div className="grid grid-cols-[1fr_1fr] sm:grid-cols-[1fr_1fr_120px] border-b border-white/[0.07] bg-white/[0.025]">
        <div className="px-5 py-3">
          <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-white/30">{L.colId}</span>
        </div>
        <div className="px-5 py-3">
          <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-white/30">{L.colTime}</span>
        </div>
        <div className="px-5 py-3 hidden sm:block">
          <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-white/30">{L.colAge}</span>
        </div>
      </div>

      {/* Body */}
      {error ? (
        <div className="flex flex-col items-center justify-center gap-3 py-16 px-6 text-center">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-red-400">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <p className="font-mono text-[12px] text-white/30">{error}</p>
        </div>
      ) : loading && events.length === 0 ? (
        <div>{[...Array(6)].map((_, i) => <SkeletonRow key={i} />)}</div>
      ) : sorted.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-16 px-6 text-center">
          <div className="w-10 h-10 rounded-xl bg-[#E8855A]/10 border border-[#E8855A]/20 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#E8855A]/60">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <p className="font-mono text-[12px] text-white/30">{L.noEvents}</p>
          <p className="font-mono text-[10px] text-white/15">{L.noEventsHint}</p>
        </div>
      ) : (
        <div className="divide-y divide-white/[0.04]">
          {sorted.map((ev, i) => (
            <EventRow key={`${ev.id}-${i}`} event={ev} isNew={i === 0 && !loading} />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Single row ───────────────────────────────────────────────────────────────
function EventRow({ event, isNew }: { event: ScanEvent; isNew: boolean }) {
  return (
    <div
      className="grid grid-cols-[1fr_1fr] sm:grid-cols-[1fr_1fr_120px] items-center
                 hover:bg-white/[0.02] transition-colors duration-200 group"
      style={isNew ? { animation: 'rowFadeIn 0.4s ease forwards' } : undefined}
    >
      <div className="px-5 py-3.5 flex items-center gap-2.5 min-w-0">
        <span className="w-1.5 h-1.5 rounded-full bg-[#E8855A]/50 shrink-0 group-hover:bg-[#E8855A] transition-colors" />
        <span className="font-mono text-[13px] text-white/80 truncate tracking-wide">
          {event.id}
        </span>
      </div>
      <div className="px-5 py-3.5 min-w-0">
        <span className="font-mono text-[12px] text-white/50 block truncate">
          {formatTime(event.time)}
        </span>
      </div>
      <div className="px-5 py-3.5 hidden sm:block">
        <span className="font-mono text-[11px] text-white/25">
          {timeAgo(event.time)}
        </span>
      </div>
    </div>
  )
}

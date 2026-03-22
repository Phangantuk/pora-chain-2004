'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import Link from 'next/link'
import { getT, isValidLang, type Lang } from '@/lib/i18n'
import { getExtraT } from '@/lib/i18n/extra'

// ─── Constants ────────────────────────────────────────────────────────────────
const TRON_ADDRESS = 'TSF42qJpMtwb68SNnwAmB7rLrCwtnBk61V'
const ETH_ADDRESS  = '0xd6Cf3187cb490fB70Bce346cf5CA1BF7a17E6897'
const USDT_CONTRACT_ETH = '0xdac17f958d2ee523a2206206994597c13d831ec7'
const REFRESH_INTERVAL  = 60_000

// ─── Types ────────────────────────────────────────────────────────────────────
interface TokenBalance {
  symbol:  string
  balance: string
  network: string
  usd?:    string
}

interface TxEntry {
  hash:      string
  from:      string
  amount:    string
  token:     string
  network:   string
  timestamp: number
  explorerUrl: string
}

// ─── Utility ──────────────────────────────────────────────────────────────────
function cn(...c: (string | false | undefined | null)[]) {
  return c.filter(Boolean).join(' ')
}

function shortAddr(addr: string): string {
  if (addr.length < 12) return addr
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`
}

function formatTs(ts: number): string {
  const d = new Date(ts < 1e12 ? ts * 1000 : ts)
  return d.toLocaleString(undefined, {
    month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function formatAmount(raw: string, decimals: number): string {
  const n = Number(raw) / Math.pow(10, decimals)
  if (n === 0) return '0'
  if (n < 0.0001) return '<0.0001'
  return n.toLocaleString(undefined, { maximumFractionDigits: 4 })
}

// ─── Blockchain fetchers ──────────────────────────────────────────────────────
async function fetchTronBalance(): Promise<TokenBalance[]> {
  const res = await fetch(
    `https://apilist.tronscan.org/api/account?address=${TRON_ADDRESS}`,
    { cache: 'no-store' }
  )
  if (!res.ok) throw new Error('TRON API error')
  const data = await res.json()

  const balances: TokenBalance[] = []

  // TRX native
  const trxRaw = data.balance ?? 0
  if (trxRaw > 0) {
    balances.push({ symbol: 'TRX', balance: formatAmount(String(trxRaw), 6), network: 'TRON' })
  }

  // TRC20 tokens (USDT etc)
  const tokens: Array<{ tokenAbbr: string; balance: string; tokenDecimal?: number }> =
    data.trc20token_balances ?? data.tokens ?? []

  for (const tok of tokens) {
    const dec     = tok.tokenDecimal ?? 6
    const balance = formatAmount(tok.balance, dec)
    if (Number(tok.balance) > 0) {
      balances.push({ symbol: tok.tokenAbbr, balance, network: 'TRON' })
    }
  }

  return balances.length ? balances : [{ symbol: 'USDT', balance: '0', network: 'TRON' }]
}

async function fetchEthBalance(): Promise<TokenBalance[]> {
  const balances: TokenBalance[] = []

  // ETH balance via public JSON-RPC (Cloudflare)
  try {
    const rpcRes = await fetch('https://cloudflare-eth.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0', id: 1, method: 'eth_getBalance',
        params: [ETH_ADDRESS, 'latest'],
      }),
      cache: 'no-store',
    })
    const rpcData = await rpcRes.json()
    const weiHex  = rpcData?.result ?? '0x0'
    const wei     = parseInt(weiHex, 16)
    const eth     = (wei / 1e18)
    balances.push({ symbol: 'ETH', balance: eth.toFixed(6), network: 'Ethereum' })
  } catch { /* silent */ }

  // USDT ERC20 balance via Etherscan (no key, rate-limited but works)
  try {
    const tokenRes = await fetch(
      `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${USDT_CONTRACT_ETH}&address=${ETH_ADDRESS}&tag=latest`,
      { cache: 'no-store' }
    )
    const tokenData = await tokenRes.json()
    if (tokenData.status === '1') {
      balances.push({ symbol: 'USDT', balance: formatAmount(tokenData.result, 6), network: 'Ethereum' })
    }
  } catch { /* silent */ }

  return balances.length ? balances : [{ symbol: 'ETH', balance: '0', network: 'Ethereum' }]
}

async function fetchTronTxs(): Promise<TxEntry[]> {
  const res = await fetch(
    `https://apilist.tronscan.org/api/transaction/transferList?sort=-timestamp&count=true&limit=10&start=0&toAddress=${TRON_ADDRESS}&filterTokenValue=1`,
    { cache: 'no-store' }
  )
  if (!res.ok) throw new Error('TRON tx error')
  const data = await res.json()
  const list: Array<{
    transactionHash: string
    transferFromAddress: string
    quant: string
    contractRet?: string
    tokenInfo?: { tokenAbbr?: string; tokenDecimal?: number }
    timestamp: number
  }> = data.data ?? []

  return list.slice(0, 10).map(tx => ({
    hash:        tx.transactionHash,
    from:        tx.transferFromAddress,
    amount:      formatAmount(tx.quant, tx.tokenInfo?.tokenDecimal ?? 6),
    token:       tx.tokenInfo?.tokenAbbr ?? 'TRX',
    network:     'TRON',
    timestamp:   tx.timestamp,
    explorerUrl: `https://tronscan.org/#/transaction/${tx.transactionHash}`,
  }))
}

async function fetchEthTxs(): Promise<TxEntry[]> {
  const res = await fetch(
    `https://api.etherscan.io/api?module=account&action=tokentx&address=${ETH_ADDRESS}&sort=desc&offset=10&page=1`,
    { cache: 'no-store' }
  )
  if (!res.ok) return []
  const data = await res.json()
  if (data.status !== '1' || !Array.isArray(data.result)) return []

  return data.result.slice(0, 10).map((tx: {
    hash: string; from: string; value: string
    tokenSymbol: string; tokenDecimal: string; timeStamp: string
  }) => ({
    hash:        tx.hash,
    from:        tx.from,
    amount:      formatAmount(tx.value, Number(tx.tokenDecimal) || 18),
    token:       tx.tokenSymbol,
    network:     'Ethereum',
    timestamp:   Number(tx.timeStamp) * 1000,
    explorerUrl: `https://etherscan.io/tx/${tx.hash}`,
  }))
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function PulseDot({ color = '#4ECAA0' }: { color?: string }) {
  return (
    <span className="relative inline-flex h-1.5 w-1.5 shrink-0">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
        style={{ backgroundColor: color }} />
      <span className="relative inline-flex rounded-full h-1.5 w-1.5"
        style={{ backgroundColor: color }} />
    </span>
  )
}

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] uppercase text-[#E8855A] mb-4 block">
      <PulseDot color="#E8855A" />
      {children}
    </span>
  )
}

function Divider() {
  return (
    <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(232,133,90,0.18), transparent)' }} />
  )
}

// ── Copy button ───────────────────────────────────────────────────────────────
function CopyButton({ address, label, copied: copiedLabel }: {
  address: string; label: string; copied: string
}) {
  const [state, setState] = useState<'idle' | 'copied'>('idle')

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address)
      setState('copied')
      setTimeout(() => setState('idle'), 2000)
    } catch {
      // Fallback for older browsers
      const ta = document.createElement('textarea')
      ta.value = address
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setState('copied')
      setTimeout(() => setState('idle'), 2000)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        'inline-flex items-center gap-1.5 font-mono text-[11px] px-3 py-1.5 rounded-lg',
        'transition-all duration-200 border',
        state === 'copied'
          ? 'text-[#4ECAA0] bg-[#4ECAA0]/10 border-[#4ECAA0]/30'
          : 'text-white/50 bg-white/[0.04] border-white/[0.08] hover:text-white/80 hover:border-white/[0.18] hover:bg-white/[0.07]',
      )}
    >
      {state === 'copied' ? (
        <>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {copiedLabel}
        </>
      ) : (
        <>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <rect x="4" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M3 8H2a1 1 0 01-1-1V2a1 1 0 011-1h5a1 1 0 011 1v1" stroke="currentColor" strokeWidth="1.2"/>
          </svg>
          {label}
        </>
      )}
    </button>
  )
}

// ── Wallet card ───────────────────────────────────────────────────────────────
function WalletCard({ wallet, t, ui }: {
  wallet: { label: string; address: string; network: string; explorerUrl: string; icon: React.ReactNode; accent: string }
  t: ReturnType<typeof getT>
  ui: ReturnType<typeof getExtraT>['donateUi']
}) {
  const d = t.donate
  return (
    <div
      className="relative rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-0.5"
      style={{
        background: `linear-gradient(#0C0C0E, #0C0C0E) padding-box,
                     linear-gradient(135deg, ${wallet.accent}40, transparent 55%, ${wallet.accent}20) border-box`,
        border: '1px solid transparent',
      }}
    >
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(to right, ${wallet.accent}, transparent 60%)` }} />
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(ellipse at 0% 0%, ${wallet.accent}10, transparent 60%)` }} />

      <div className="relative p-6 lg:p-7">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${wallet.accent}15`, border: `1px solid ${wallet.accent}30` }}>
              {wallet.icon}
            </div>
            <div>
              <p className="text-[14px] font-semibold text-white/90">{wallet.label}</p>
              <p className="font-mono text-[10px] text-white/30 tracking-wide mt-0.5">{wallet.network}</p>
            </div>
          </div>
          <a
            href={wallet.explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] text-white/25 hover:text-white/60 transition-colors flex items-center gap-1"
          >
            {d.viewExplorer}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 8L8 2M8 2H4M8 2v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          </a>
        </div>

        {/* Address */}
        <div className="bg-black/30 rounded-xl p-4 mb-4 border border-white/[0.05]">
          <p className="font-mono text-[11px] text-white/35 mb-1.5 tracking-[0.08em] uppercase">{ui.addressLabel}</p>
          <p
            className="font-mono text-[13px] text-white/80 break-all leading-relaxed select-all"
            style={{ wordBreak: 'break-all' }}
          >
            {wallet.address}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <CopyButton address={wallet.address} label={d.copyAddress} copied={d.copied} />
          <a
            href={wallet.explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] px-3 py-1.5 rounded-lg border border-white/[0.08] text-white/40 hover:text-white/70 hover:border-white/[0.16] hover:bg-white/[0.04] transition-all duration-200"
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M1.5 9.5L9.5 1.5M9.5 1.5H5M9.5 1.5v4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            {ui.explorerShort}
          </a>
        </div>
      </div>
    </div>
  )
}

// ── Balance card ──────────────────────────────────────────────────────────────
function BalanceCard({ bal }: { bal: TokenBalance }) {
  const networkColor = bal.network === 'TRON' ? '#E8855A' : '#7BA7F5'
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.1] transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center font-mono text-[10px] font-semibold"
          style={{ background: `${networkColor}15`, color: networkColor, border: `1px solid ${networkColor}25` }}>
          {bal.symbol.slice(0, 3)}
        </div>
        <div>
          <p className="text-[13px] font-semibold text-white/85">{bal.symbol}</p>
          <p className="font-mono text-[10px] text-white/30">{bal.network}</p>
        </div>
      </div>
      <p className="font-mono text-[14px] text-white/80 font-medium">{bal.balance}</p>
    </div>
  )
}

// ── Transaction row ───────────────────────────────────────────────────────────
function TxRow({ tx, index }: { tx: TxEntry; index: number }) {
  const [visible, setVisible] = useState(false)
  const networkColor = tx.network === 'TRON' ? '#E8855A' : '#7BA7F5'
  const networkBg    = tx.network === 'TRON' ? 'rgba(232,133,90,0.1)' : 'rgba(123,167,245,0.1)'

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 60)
    return () => clearTimeout(t)
  }, [index])

  return (
    <div className={cn(
      'grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_auto_auto] gap-3 items-center',
      'px-4 py-3.5 border-b border-white/[0.04] last:border-0',
      'hover:bg-white/[0.02] transition-all duration-400',
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
    )}>

      {/* From + hash */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[12px] text-white/70">{shortAddr(tx.from)}</span>
          <span className="font-mono text-[9px] px-1.5 py-0.5 rounded"
            style={{ color: networkColor, background: networkBg }}>
            {tx.network}
          </span>
        </div>
        <a
          href={tx.explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[10px] text-white/20 hover:text-[#E8855A]/70 transition-colors flex items-center gap-1"
        >
          {shortAddr(tx.hash)}
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
            <path d="M1 8L8 1M8 1H4.5M8 1v3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </a>
      </div>

      {/* Amount (always visible) */}
      <div className="text-right sm:text-left">
        <p className="font-mono text-[13px] font-medium" style={{ color: networkColor }}>
          +{tx.amount}
        </p>
        <p className="font-mono text-[10px] text-white/30">{tx.token}</p>
      </div>

      {/* Time (hidden on mobile) */}
      <div className="hidden sm:block text-right">
        <p className="font-mono text-[11px] text-white/35">{formatTs(tx.timestamp)}</p>
      </div>

      {/* Explorer link icon */}
      <div className="hidden sm:flex justify-end">
        <a
          href={tx.explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-7 h-7 rounded-lg border border-white/[0.07] flex items-center justify-center text-white/25 hover:text-white/60 hover:border-white/[0.15] transition-all"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1.5 8.5L8.5 1.5M8.5 1.5H4.5M8.5 1.5v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </a>
      </div>
    </div>
  )
}

// ── Loading skeleton ──────────────────────────────────────────────────────────
function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn('animate-pulse bg-white/[0.05] rounded-lg', className)} />
  )
}

// ── Refresh indicator ─────────────────────────────────────────────────────────
function RefreshDot({ active }: { active: boolean }) {
  return (
    <span className={cn(
      'w-1.5 h-1.5 rounded-full transition-colors duration-300',
      active ? 'bg-[#4ECAA0] shadow-[0_0_6px_rgba(78,202,160,0.6)]' : 'bg-white/20',
    )} />
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function DonatePage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const t    = getT(lang)
  const xt   = getExtraT(lang)
  const d    = t.donate
  const lp   = (path: string) => `/${lang}${path}`

  // Balances state
  const [tronBals,    setTronBals]    = useState<TokenBalance[] | null>(null)
  const [ethBals,     setEthBals]     = useState<TokenBalance[] | null>(null)
  const [balsLoading, setBalsLoading] = useState(true)
  const [balsError,   setBalsError]   = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [refreshing,  setRefreshing]  = useState(false)

  // Transactions state
  const [tronTxs,  setTronTxs]  = useState<TxEntry[]>([])
  const [ethTxs,   setEthTxs]   = useState<TxEntry[]>([])
  const [txLoading, setTxLoading] = useState(true)
  const [txError,   setTxError]   = useState(false)

  const fetchBalances = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true)
    else setBalsLoading(true)
    setBalsError(false)
    try {
      const [tron, eth] = await Promise.allSettled([fetchTronBalance(), fetchEthBalance()])
      setTronBals(tron.status === 'fulfilled' ? tron.value : null)
      setEthBals(eth.status  === 'fulfilled' ? eth.value  : null)
      if (tron.status === 'rejected' && eth.status === 'rejected') setBalsError(true)
      setLastUpdated(new Date())
    } catch {
      setBalsError(true)
    } finally {
      setBalsLoading(false)
      setRefreshing(false)
    }
  }, [])

  const fetchTransactions = useCallback(async () => {
    setTxLoading(true)
    setTxError(false)
    try {
      const [tron, eth] = await Promise.allSettled([fetchTronTxs(), fetchEthTxs()])
      setTronTxs(tron.status === 'fulfilled' ? tron.value : [])
      setEthTxs(eth.status   === 'fulfilled' ? eth.value  : [])
      if (tron.status === 'rejected' && eth.status === 'rejected') setTxError(true)
    } catch {
      setTxError(true)
    } finally {
      setTxLoading(false)
    }
  }, [])

  // Initial fetch
  useEffect(() => {
    fetchBalances()
    fetchTransactions()
  }, [fetchBalances, fetchTransactions])

  // Auto-refresh balances every 60s
  useEffect(() => {
    const id = setInterval(() => fetchBalances(true), REFRESH_INTERVAL)
    return () => clearInterval(id)
  }, [fetchBalances])

  // Merge + sort transactions
  const allTxs = [...tronTxs, ...ethTxs]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 10)

  // Wallet config
  const wallets = [
    {
      label:       d.walletsTron,
      address:     TRON_ADDRESS,
      network:     d.networkTron,
      explorerUrl: `https://tronscan.org/#/address/${TRON_ADDRESS}`,
      accent:      '#E8855A',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M21 3L3 9.5l7.5 2.5L21 3z" stroke="#E8855A" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M10.5 12L14 21l3.5-8.5" stroke="#E8855A" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M10.5 12L3 9.5l4 7" stroke="#E8855A" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      label:       d.walletsEth,
      address:     ETH_ADDRESS,
      network:     d.networkEth,
      explorerUrl: `https://etherscan.io/address/${ETH_ADDRESS}`,
      accent:      '#7BA7F5',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L4 12.5l8 4.5 8-4.5L12 2z" stroke="#7BA7F5" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M4 12.5L12 22l8-9.5" stroke="#7BA7F5" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ]

  const allBals = [
    ...(tronBals ?? []),
    ...(ethBals  ?? []),
  ]

  return (
    <div className="bg-[#070707] text-white min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative border-b border-white/[0.06] px-6 pt-28 pb-14 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(232,133,90,0.07), transparent 65%)' }} />
        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.018]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

        <div className="relative max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-mono text-[10px] text-white/20 mb-8 tracking-wide">
            <Link href={lp('/')} className="hover:text-white/50 transition-colors">{t.common.backHome}</Link>
            <span>/</span>
            <span className="text-[#E8855A]/60">{d.metaTitle}</span>
          </div>

          <SectionTag>{d.eyebrow}</SectionTag>

          <h1 className="font-bold text-[clamp(32px,5vw,56px)] leading-[1.06] tracking-tight text-white mb-4">
            {d.pageTitle}
          </h1>
          <p className="text-[16px] text-white/45 font-light leading-relaxed max-w-xl">
            {d.pageSub}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col gap-16">

        {/* ── SECTION 1: WALLETS ─────────────────────────────────────────────── */}
        <section>
          <SectionTag>{d.walletsTag}</SectionTag>
          <h2 className="text-[22px] font-bold text-white/90 mb-8 tracking-tight">{d.walletsTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {wallets.map(w => (
              <WalletCard key={w.address} wallet={w} t={t} ui={xt.donateUi} />
            ))}
          </div>
        </section>

        <Divider />

        {/* ── SECTION 2: LIVE BALANCES ─────────────────────────────────────── */}
        <section>
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <SectionTag>{d.balancesTag}</SectionTag>
              <h2 className="text-[22px] font-bold text-white/90 tracking-tight">{d.balancesTitle}</h2>
            </div>
            <div className="flex flex-col items-end gap-1.5 shrink-0 pt-1">
              <div className="flex items-center gap-2">
                <RefreshDot active={refreshing} />
                <span className="font-mono text-[10px] text-white/25 tracking-wide">{d.balancesRefresh}</span>
              </div>
              {lastUpdated && (
                <span className="font-mono text-[9px] text-white/15">
                  {d.balancesLastSeen} {lastUpdated.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                </span>
              )}
            </div>
          </div>

          {balsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-16" />
              ))}
            </div>
          ) : balsError ? (
            <div className="rounded-xl border border-white/[0.07] bg-[#0C0C0E] px-5 py-4 text-center">
              <p className="font-mono text-[12px] text-white/30">{d.balancesError}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {allBals.length ? allBals.map((bal, i) => (
                <BalanceCard key={`${bal.symbol}-${i}`} bal={bal} />
              )) : (
                <div className="col-span-2 text-center py-8">
                  <p className="font-mono text-[12px] text-white/25">{d.balancesLoading}</p>
                </div>
              )}
            </div>
          )}
        </section>

        <Divider />

        {/* ── SECTION 3: TRANSACTIONS ──────────────────────────────────────── */}
        <section>
          <SectionTag>{d.txTag}</SectionTag>
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h2 className="text-[22px] font-bold text-white/90 tracking-tight">{d.txTitle}</h2>
              <p className="text-[13.5px] text-white/35 mt-1 font-light leading-relaxed max-w-lg">{d.txSub}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-[#0C0C0E] overflow-hidden"
            style={{ boxShadow: '0 1px 0 rgba(232,133,90,0.06) inset' }}>

            {/* Table header */}
            <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto] gap-3 px-4 py-3 border-b border-white/[0.05] bg-white/[0.02]">
              <span className="font-mono text-[9px] tracking-[0.12em] uppercase text-white/20">{d.txFrom}</span>
              <span className="font-mono text-[9px] tracking-[0.12em] uppercase text-white/20">{d.txAmount}</span>
              <span className="font-mono text-[9px] tracking-[0.12em] uppercase text-white/20">{d.txTime}</span>
              <span className="font-mono text-[9px] tracking-[0.12em] uppercase text-white/20">{d.txHash}</span>
            </div>

            {txLoading ? (
              <div className="p-6 flex flex-col gap-3">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-12" />
                ))}
              </div>
            ) : txError ? (
              <div className="px-5 py-10 text-center">
                <p className="font-mono text-[12px] text-white/25">{d.txError}</p>
              </div>
            ) : allTxs.length === 0 ? (
              <div className="px-5 py-10 text-center">
                <p className="font-mono text-[12px] text-white/25">{d.txEmpty}</p>
              </div>
            ) : (
              allTxs.map((tx, i) => <TxRow key={`${tx.hash}-${i}`} tx={tx} index={i} />)
            )}

            {/* Footer with explorer links */}
            {!txLoading && !txError && allTxs.length > 0 && (
              <div className="flex flex-wrap gap-3 items-center justify-between px-4 py-3 border-t border-white/[0.05] bg-white/[0.015]">
                <span className="font-mono text-[10px] text-white/20">
                  {allTxs.length} {allTxs.length === 1 ? xt.donateUi.txSingular : xt.donateUi.txPlural}
                </span>
                <div className="flex gap-4">
                  <a href={`https://tronscan.org/#/address/${TRON_ADDRESS}`} target="_blank" rel="noopener noreferrer"
                    className="font-mono text-[10px] text-[#E8855A]/50 hover:text-[#E8855A] transition-colors">
                    {xt.donateUi.tronExplorer} →
                  </a>
                  <a href={`https://etherscan.io/address/${ETH_ADDRESS}`} target="_blank" rel="noopener noreferrer"
                    className="font-mono text-[10px] text-[#7BA7F5]/50 hover:text-[#7BA7F5] transition-colors">
                    {xt.donateUi.ethExplorer} →
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>

        <Divider />

        {/* ── SECTION 4: TRANSPARENCY ──────────────────────────────────────── */}
        <section>
          <SectionTag>{d.transparencyTag}</SectionTag>

          <div className="relative rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(#0C0C0E, #0C0C0E) padding-box, linear-gradient(135deg, rgba(232,133,90,0.2), transparent 55%, rgba(78,202,160,0.12)) border-box',
              border: '1px solid transparent',
            }}
          >
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 0% 50%, rgba(232,133,90,0.04), transparent 60%)' }} />
            <div className="absolute top-0 left-0 right-0 h-[1px]"
              style={{ background: 'linear-gradient(to right, rgba(232,133,90,0.4), transparent 50%)' }} />

            <div className="relative px-7 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#4ECAA0]/10 border border-[#4ECAA0]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" stroke="#4ECAA0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-[14px] text-white/50 leading-relaxed font-light max-w-lg">
                  {d.transparencyText}
                </p>
              </div>
              <Link
                href={lp('/transparency')}
                className="inline-flex items-center gap-2 font-mono text-[12px] text-[#4ECAA0]/70 hover:text-[#4ECAA0] transition-colors whitespace-nowrap shrink-0"
              >
                {d.transparencyLink}
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

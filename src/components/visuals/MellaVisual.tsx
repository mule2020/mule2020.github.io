import { useState } from 'react'
import { Gavel, Send } from 'lucide-react'
import { useInView, useInterval, useReducedMotion } from '../../hooks'

/* Illustrative data only — shows the shape of the product, not real listings. */
const SELLERS = ['Seller · Abebe T.', 'Seller · Hana W.', 'Seller · Dawit K.', 'Seller · Lidya M.', 'Seller · Yonas G.', 'Seller · Saba A.']
const AMOUNTS = [18400, 17950, 17200, 16800, 16450, 15900, 15600, 15250]

type Bid = { key: number; who: string; amount: number; days: number }

export default function MellaVisual() {
  const [ref, inView] = useInView<HTMLDivElement>('-10% 0px')
  const reduced = useReducedMotion()
  const [n, setN] = useState(3)
  useInterval(() => setN((v) => (v >= 14 ? 3 : v + 1)), 2600, inView && !reduced)

  const bids: Bid[] = Array.from({ length: Math.min(n, 4) }, (_, i) => {
    const k = n - 1 - i
    return { key: k, who: SELLERS[k % SELLERS.length], amount: AMOUNTS[k % AMOUNTS.length], days: 2 + (k % 4) }
  })

  return (
    <div ref={ref} className="relative mx-auto aspect-[5/6] w-full max-w-[560px] select-none">
      {/* customer dashboard behind */}
      <div className="absolute left-0 top-[8%] w-[74%] rotate-[-4deg] bg-[#FFF1E4] p-4 text-ink shadow-[14px_14px_0_0_#121110] sm:p-5">
        <div className="mono flex items-center justify-between border-b border-ink/15 pb-2 text-[0.6rem]">
          <span>Customer dashboard</span>
          <span className="text-rust">● live</span>
        </div>
        <p className="mt-3 text-[0.65rem] uppercase tracking-wider text-ink/50">My requests</p>
        <ul className="mt-2 space-y-2 text-sm">
          {[
            ['Office chairs ×12', `${n} bids`, 'Open'],
            ['Catering, 40 people', '9 bids', 'Reviewing'],
            ['Laptop repair', '4 bids', 'Awarded'],
          ].map(([t, b, s], i) => (
            <li key={t} className="flex items-center justify-between gap-2 border-b border-dashed border-ink/15 pb-2 last:border-0">
              <span className="truncate font-medium">{t}</span>
              <span className="mono shrink-0 text-[0.58rem] text-ink/60">{b}</span>
              <span className={`mono shrink-0 px-1.5 py-0.5 text-[0.55rem] ${i === 0 ? 'bg-rust text-bone' : 'bg-ink/10'}`}>{s}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex h-14 items-end gap-1">
          {[30, 45, 38, 60, 52, 75, 68, 90, 84, 100].map((h, i) => (
            <span key={i} className="flex-1 bg-ink/80" style={{ height: `${h}%` }} />
          ))}
        </div>
        <p className="mono mt-1 text-[0.55rem] text-ink/50">Bids this week</p>
      </div>

      {/* Telegram mini app phone */}
      <div className="absolute bottom-0 right-0 w-[52%] rotate-[3deg] border-[6px] border-ink bg-ink shadow-[0_30px_60px_-20px_rgba(0,0,0,.45)]">
        <div className="flex items-center gap-2 bg-[#1C1B18] px-3 py-2 text-[0.62rem] text-bone">
          <Send size={12} className="text-[#5FB4E8]" />
          <span className="font-semibold">Mella</span>
          <span className="text-bone/50">mini app</span>
        </div>
        <div className="bg-[#FFF1E4] p-3 text-ink">
          <p className="mono text-[0.55rem] text-ink/50">Request #2041</p>
          <p className="mt-0.5 text-sm font-semibold leading-tight">Office chairs ×12</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="mono text-[0.55rem]">{n} bids</span>
            <span className="mono inline-flex items-center gap-1 bg-rust px-1.5 py-0.5 text-[0.55rem] text-bone">
              <Gavel size={10} /> open
            </span>
          </div>
          <ul className="mt-3 space-y-1.5">
            {bids.map((b, i) => (
              <li
                key={b.key}
                className={`flex items-center justify-between gap-2 border px-2 py-1.5 text-[0.65rem] ${i === 0 ? 'pop-in border-ink bg-white' : 'border-ink/15'}`}
              >
                <span className="truncate">{b.who}</span>
                <span className="flex shrink-0 items-center gap-1.5">
                  {i === 0 && <span className="mono bg-ink px-1 text-[0.5rem] text-bone">new</span>}
                  <span className="tabular-nums font-semibold">{b.amount.toLocaleString('en-US')}</span>
                </span>
              </li>
            ))}
          </ul>
          <button tabIndex={-1} className="mt-3 w-full bg-ink py-2 text-[0.65rem] font-semibold text-bone">
            Compare offers
          </button>
        </div>
      </div>
    </div>
  )
}

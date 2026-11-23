import { useState } from 'react'
import { useInView, useInterval, useReducedMotion } from '../../hooks'

/* Illustrative log — the shape of the delivery workflow, not production data. */
const CLIENTS = ['c_014', 'c_027', 'c_003']
function lineFor(i: number) {
  const c = CLIENTS[i % 3]
  const id = ((i * 2654435761) >>> 0).toString(16).slice(0, 4)
  const kind = i % 4
  if (kind === 0) return { t: `POST /v1/messages   client=${c}`, s: '202 accepted', tone: 'ok' }
  if (kind === 1) return { t: `cache  client:${c}:config`, s: 'HIT', tone: 'dim' }
  if (kind === 2) return { t: `dispatch msg_${id} → gateway`, s: 'sent', tone: 'ok' }
  return { t: `status   msg_${id}`, s: i % 7 === 3 ? 'retry 1/3' : 'delivered', tone: i % 7 === 3 ? 'warn' : 'ok' }
}

export default function SmsVisual() {
  const [ref, inView] = useInView<HTMLDivElement>('-10% 0px')
  const reduced = useReducedMotion()
  const [n, setN] = useState(9)
  useInterval(() => setN((v) => v + 1), 900, inView && !reduced)
  const lines = Array.from({ length: 9 }, (_, k) => n - 9 + k).map((i) => ({ i, ...lineFor(i) }))
  const counts = CLIENTS.map((_, ci) => 120 + ((n * (ci + 3)) % 97) + n * (ci + 1))

  return (
    <div ref={ref} className="grid w-full gap-4 lg:grid-cols-[1.35fr_1fr]">
      <div className="border border-[#9BE564]/25 bg-black/40 font-mono text-[0.68rem] leading-[1.9] sm:text-[0.74rem]">
        <div className="flex items-center gap-2 border-b border-[#9BE564]/20 px-3 py-2 text-[0.6rem] text-[#6B7465]">
          <span className="h-2 w-2 rounded-full bg-[#9BE564]" /> api · delivery-worker · tail -f
        </div>
        <ul className="h-[16.5em] overflow-hidden px-3 py-2">
          {lines.map((l, k) => (
            <li key={l.i} className={`flex justify-between gap-3 whitespace-nowrap ${k === lines.length - 1 ? 'pop-in' : ''}`}>
              <span className="truncate text-[#E3E8DA]/80">
                <span className="text-[#6B7465]">{String(l.i).padStart(5, '0')} </span>
                {l.t}
              </span>
              <span className={l.tone === 'warn' ? 'text-[#E3A833]' : l.tone === 'dim' ? 'text-[#6B7465]' : 'text-[#9BE564]'}>{l.s}</span>
            </li>
          ))}
          <li className="text-[#9BE564]">
            $ <span className="blink">▍</span>
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-3 gap-2 lg:grid-cols-1">
        {CLIENTS.map((c, ci) => (
          <div key={c} className="flex flex-col justify-between border border-[#E3E8DA]/15 p-3">
            <div className="mono flex justify-between text-[0.58rem] text-[#6B7465]">
              <span>client</span>
              <span className="text-[#E3E8DA]">{c}</span>
            </div>
            <div className="mt-3 flex items-end justify-between gap-2">
              <span className="text-2xl font-semibold tabular-nums tracking-tight text-[#E3E8DA] sm:text-3xl">{counts[ci].toLocaleString('en-US')}</span>
              <span className="mono hidden text-[0.55rem] text-[#9BE564] sm:inline">msgs</span>
            </div>
            <div className="mt-2 flex h-1 gap-px">
              <span className="bg-[#9BE564]" style={{ flex: 8 + ci }} />
              <span className="bg-[#E3A833]" style={{ flex: 1 }} />
              <span className="bg-[#E3E8DA]/20" style={{ flex: 2 }} />
            </div>
          </div>
        ))}
        <p className="mono col-span-3 text-[0.55rem] text-[#6B7465] lg:col-span-1">illustrative · delivered / retrying / queued</p>
      </div>
    </div>
  )
}

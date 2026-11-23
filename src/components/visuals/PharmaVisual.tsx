import { useEffect, useRef, useState } from 'react'
import { Check, Lock, PackagePlus } from 'lucide-react'

/* Illustrative data. Roles show how RBAC changes what each user can do. */
type RoleName = 'Admin' | 'Manager' | 'Staff'
const ROLES: Record<RoleName, { adjust: boolean; reorder: boolean }> = {
  Admin: { adjust: true, reorder: true },
  Manager: { adjust: false, reorder: true },
  Staff: { adjust: false, reorder: false },
}
const ITEMS = [
  { name: 'Amoxicillin 500 mg', stock: 820, min: 300 },
  { name: 'Paracetamol 500 mg', stock: 1460, min: 500 },
  { name: 'Insulin glargine', stock: 64, min: 120 },
  { name: 'Omeprazole 20 mg', stock: 410, min: 250 },
  { name: 'Metformin 850 mg', stock: 150, min: 200 },
]
const MAX = 1600
const STAGES = ['Placed', 'Approved', 'Dispatched', 'Received']

export default function PharmaVisual() {
  const [role, setRole] = useState<RoleName>('Manager')
  const [order, setOrder] = useState<{ item: string; stage: number } | null>(null)
  const perms = ROLES[role]
  const timer = useRef(0)
  useEffect(() => () => window.clearInterval(timer.current), [])

  const reorder = (item: string) => {
    window.clearInterval(timer.current)
    setOrder({ item, stage: 0 })
    let s = 0
    const id = (timer.current = window.setInterval(() => {
      s += 1
      setOrder({ item, stage: s })
      if (s >= STAGES.length - 1) window.clearInterval(id)
    }, 900))
  }

  return (
    <div className="w-full border border-ink bg-[#F4F6F2] text-ink shadow-[12px_12px_0_0_#1F5C56]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink px-3 py-2.5 sm:px-4">
        <span className="mono text-[0.62rem]">Inventory · Main store</span>
        <div role="radiogroup" aria-label="Preview as role" className="flex border border-ink">
          {(Object.keys(ROLES) as RoleName[]).map((r) => (
            <button
              key={r}
              role="radio"
              aria-checked={role === r}
              onClick={() => setRole(r)}
              className={`mono px-2.5 py-1 text-[0.58rem] transition-colors ${role === r ? 'bg-[#1F5C56] text-white' : 'hover:bg-ink/5'}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <table className="w-full text-left text-[0.72rem] sm:text-[0.8rem]">
        <thead>
          <tr className="mono text-[0.55rem] text-ink/50">
            <th className="px-3 py-2 font-normal sm:px-4">Item</th>
            <th className="hidden px-2 py-2 font-normal sm:table-cell">Level</th>
            <th className="px-2 py-2 text-right font-normal">Qty</th>
            <th className="px-3 py-2 text-right font-normal sm:px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {ITEMS.map((it) => {
            const low = it.stock < it.min
            return (
              <tr key={it.name} className="border-t border-ink/10">
                <td className="px-3 py-2 sm:px-4">
                  <span className="flex items-center gap-2">
                    <span className={`h-1.5 w-1.5 shrink-0 ${low ? 'bg-[#C2361B]' : 'bg-[#1F5C56]'}`} />
                    <span className="truncate">{it.name}</span>
                  </span>
                </td>
                <td className="hidden w-[34%] px-2 sm:table-cell">
                  <div className="relative h-2 bg-ink/10">
                    <span className={`absolute inset-y-0 left-0 ${low ? 'bg-[#C2361B]' : 'bg-[#1F5C56]'}`} style={{ width: `${(it.stock / MAX) * 100}%` }} />
                    <span className="absolute -inset-y-1 w-px bg-ink" style={{ left: `${(it.min / MAX) * 100}%` }} title="Reorder threshold" />
                  </div>
                </td>
                <td className={`px-2 text-right tabular-nums ${low ? 'font-semibold text-[#C2361B]' : ''}`}>{it.stock}</td>
                <td className="px-3 py-1.5 text-right sm:px-4">
                  {low ? (
                    perms.reorder ? (
                      <button
                        onClick={() => reorder(it.name)}
                        className="mono inline-flex items-center gap-1 bg-ink px-2 py-1 text-[0.55rem] text-bone transition-transform active:scale-95"
                      >
                        <PackagePlus size={11} /> Reorder
                      </button>
                    ) : (
                      <span className="mono inline-flex items-center gap-1 text-[0.55rem] text-ink/40">
                        <Lock size={10} /> no access
                      </span>
                    )
                  ) : perms.adjust ? (
                    <span className="mono text-[0.55rem] text-ink/60 underline decoration-dotted">adjust</span>
                  ) : (
                    <span className="mono text-[0.55rem] text-ink/30">view</span>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <div className="border-t border-ink px-3 py-3 sm:px-4">
        <div className="mono flex justify-between text-[0.55rem] text-ink/50">
          <span>Order tracking</span>
          <span className="truncate pl-2">{order ? order.item : 'Pick “Reorder” on a low item'}</span>
        </div>
        <ol className="mt-2 grid grid-cols-4 gap-1">
          {STAGES.map((s, i) => {
            const done = order !== null && i <= order.stage
            return (
              <li key={s} className="flex flex-col gap-1">
                <span className={`h-1.5 transition-colors duration-500 ${done ? 'bg-[#1F5C56]' : 'bg-ink/10'}`} />
                <span className={`mono flex items-center gap-1 text-[0.52rem] ${done ? 'text-ink' : 'text-ink/40'}`}>
                  {done && <Check size={9} />} {s}
                </span>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

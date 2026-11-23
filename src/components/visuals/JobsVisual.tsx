import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

/* Illustrative board — click a card to move it to the next stage. */
const COLUMNS = ['Saved', 'Applied', 'Interview', 'Offer'] as const
const START = [
  { id: 1, co: 'Northwind', role: 'Backend Developer', col: 0 },
  { id: 2, co: 'Globex', role: 'Full-Stack Engineer', col: 1 },
  { id: 3, co: 'Initech', role: 'Cloud Developer', col: 1 },
  { id: 4, co: 'Umbrella Labs', role: 'Software Engineer', col: 2 },
  { id: 5, co: 'Hooli', role: 'AI Engineer', col: 0 },
]

export default function JobsVisual() {
  const [cards, setCards] = useState(START)
  const advance = (id: number) =>
    setCards((cs) => cs.map((c) => (c.id === id ? { ...c, col: (c.col + 1) % COLUMNS.length } : c)))

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {COLUMNS.map((col, ci) => {
          const list = cards.filter((c) => c.col === ci)
          return (
            <div key={col} className="min-h-[9rem] border-t-2 border-ink pt-2 sm:min-h-[15rem]">
              <div className="mono flex justify-between text-[0.6rem]">
                <span>{col}</span>
                <span className="tabular-nums text-ink/50">{list.length}</span>
              </div>
              <ul className="mt-2 space-y-2">
                {list.map((c) => (
                  <li key={c.id} className="pop-in">
                    <button
                      onClick={() => advance(c.id)}
                      className="group w-full border border-ink bg-[#FBF3DF] p-2.5 text-left transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#121110] active:translate-y-0 active:shadow-none"
                      aria-label={`${c.co}, ${c.role}. Move to next stage`}
                    >
                      <span className="block text-[0.8rem] font-semibold leading-tight">{c.co}</span>
                      <span className="mt-0.5 block text-[0.68rem] text-ink/60">{c.role}</span>
                      <span className="mono mt-2 flex items-center gap-1 text-[0.5rem] text-ink/40 transition-colors group-hover:text-ink">
                        next <ArrowRight size={9} />
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
      <p className="mono mt-3 text-[0.55rem] text-ink/60">Try it — click a card to move it along · illustrative data</p>
    </div>
  )
}

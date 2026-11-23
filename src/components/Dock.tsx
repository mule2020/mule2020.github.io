import { useLayoutEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { SECTIONS } from '../data/sections'
import { profile } from '../data/profile'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

/** Fixed bottom dock. Hidden on the hero (the hero has its own nav), tracks the current section. */
export default function Dock({ active }: { active: string }) {
  const listRef = useRef<HTMLUListElement>(null)
  const [bar, setBar] = useState({ x: 0, w: 0, on: false })
  const idx = SECTIONS.findIndex((s) => s.id === active)
  const current = SECTIONS[idx] ?? SECTIONS[0]
  const visible = active !== 'top'

  useLayoutEffect(() => {
    const measure = () => {
      const list = listRef.current
      const el = list?.querySelector<HTMLElement>(`[data-id="${active}"]`)
      if (!list || !el) return setBar((b) => ({ ...b, on: false }))
      const a = el.getBoundingClientRect()
      const b = list.getBoundingClientRect()
      setBar({ x: a.left - b.left, w: a.width, on: true })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [active])

  return (
    <nav
      aria-label="Sections"
      className={`fixed bottom-3 left-1/2 z-50 w-[calc(100%-1.5rem)] max-w-[640px] -translate-x-1/2 transition-[transform,opacity] duration-500 ease-[var(--ease-expo)] sm:bottom-5 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-[140%] opacity-0'
      }`}
    >
      <div className="relative flex items-center gap-1 overflow-hidden bg-ink p-1.5 text-bone ring-1 ring-bone/15 shadow-[0_10px_40px_-10px_rgba(18,17,16,.5)]">
        <span aria-hidden className="scroll-bar absolute inset-x-0 top-0 h-[2px] origin-left bg-rust" />
        <a
          href="#top"
          className="mono hidden shrink-0 items-center gap-2 px-3 py-2 text-bone/60 transition-colors hover:text-bone sm:flex"
          aria-label="Back to top"
        >
          <span className="tabular-nums text-rust">{String(idx).padStart(2, '0')}</span>
          <span key={current.id} className="pop-in inline-block w-[5.5rem]">
            {current.label}
          </span>
        </a>
        <ul ref={listRef} className="relative flex flex-1 justify-between sm:justify-end">
          <span
            aria-hidden
            className="absolute inset-y-0 left-0 bg-rust transition-[transform,width,opacity] duration-500 ease-[var(--ease-expo)]"
            style={{ transform: `translateX(${bar.x}px)`, width: bar.w, opacity: bar.on ? 1 : 0 }}
          />
          {LINKS.map((l) => (
            <li key={l.id} className="relative">
              <a
                data-id={l.id}
                href={`#${l.id}`}
                aria-current={active === l.id ? 'true' : undefined}
                className="mono block px-2.5 py-2 text-[0.68rem] transition-colors hover:text-white sm:px-3.5"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={profile.resumeUrl}
          download
          className="mono flex shrink-0 items-center gap-1 border-l border-bone/15 px-3 py-2 text-[0.68rem] text-lichen transition-colors hover:text-white"
        >
          CV <ArrowUpRight size={13} strokeWidth={2.2} />
        </a>
      </div>
    </nav>
  )
}

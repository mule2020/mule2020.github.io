import { useEffect, useRef, type CSSProperties } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import type { Project } from '../data/projects'
import { profile } from '../data/profile'

/** Full-screen project detail. Opens as a circle expanding from the click point. */
export default function CaseFile({ project: p, x, y, open, onClose }: { project: Project; x: number; y: number; open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const t = p.theme

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-title"
      className={`case-overlay fixed inset-0 z-[70] overflow-y-auto overscroll-contain ${open ? 'is-open' : ''}`}
      style={{ background: t.bg, color: t.fg, '--ox': `${x}px`, '--oy': `${y}px` } as CSSProperties}
    >
      <div className="mx-auto flex min-h-full max-w-[1400px] flex-col px-4 pb-16 pt-4 sm:px-8 sm:pt-6">
        <div className="sticky top-0 z-10 -mx-4 flex items-center justify-between px-4 py-3 sm:-mx-8 sm:px-8" style={{ background: t.bg }}>
          <span className="mono" style={{ color: t.muted }}>
            Case file {p.index} — {p.kicker}
          </span>
          <button
            ref={closeRef}
            onClick={onClose}
            className="group mono inline-flex items-center gap-2 border px-3 py-2"
            style={{ borderColor: t.fg }}
            aria-label="Close case file"
          >
            Close <X size={15} className="transition-transform duration-500 ease-[var(--ease-expo)] group-hover:rotate-90" />
          </button>
        </div>

        <div className={`transition-[opacity,transform] delay-200 duration-700 ease-[var(--ease-expo)] ${open ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h2 id="case-title" className="mt-10 text-[clamp(3.2rem,11vw,11rem)] leading-[0.85] font-[700] tracking-[-0.05em]">
            {p.title}
          </h2>
          <p className="mt-8 max-w-[52ch] text-lg leading-relaxed sm:text-xl">{p.summary}</p>

          <div className="mt-16 grid gap-14 lg:grid-cols-12">
            <section className="lg:col-span-5">
              <h3 className="mono mb-4" style={{ color: t.muted }}>What it does</h3>
              <ol>
                {p.features.map((f, i) => (
                  <li key={f} className="flex gap-4 border-t py-3.5 text-[1.05rem]" style={{ borderColor: 'color-mix(in srgb, currentColor 22%, transparent)' }}>
                    <span className="mono pt-1" style={{ color: t.accent }}>{String(i + 1).padStart(2, '0')}</span>
                    {f}
                  </li>
                ))}
              </ol>
            </section>

            <section className="lg:col-span-6 lg:col-start-7">
              <h3 className="mono mb-4" style={{ color: t.muted }}>How the pieces fit</h3>
              {p.flow.length ? (
                <ol className="relative">
                  {p.flow.map((s, i) => (
                    <li key={s.label} className="relative flex gap-5 pb-6 last:pb-0">
                      <span className="relative flex w-4 shrink-0 justify-center">
                        <span className="mt-1.5 h-3 w-3 rotate-45 border-2" style={{ borderColor: t.fg, background: i === 0 ? t.accent : 'transparent' }} />
                        {i < p.flow.length - 1 && <span className="absolute bottom-[-0.4rem] top-5 w-px" style={{ background: t.fg, opacity: 0.35 }} />}
                      </span>
                      <span>
                        <span className="block text-xl font-semibold tracking-tight">{s.label}</span>
                        <span className="block text-[0.95rem]" style={{ color: t.muted }}>{s.detail}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="max-w-[40ch] text-lg leading-relaxed" style={{ color: t.muted }}>
                  Architecture write-up in progress. Happy to walk through it in a conversation.
                </p>
              )}

              {p.stack.length > 0 && (
                <>
                  <h3 className="mono mb-3 mt-12" style={{ color: t.muted }}>Stack</h3>
                  <p className="text-lg leading-relaxed">{p.stack.join(' · ')}</p>
                </>
              )}
            </section>
          </div>

          <div className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t pt-6" style={{ borderColor: 'color-mix(in srgb, currentColor 25%, transparent)' }}>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 text-lg font-medium underline decoration-1 underline-offset-[6px]"
            >
              More on GitHub
              <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <button onClick={onClose} className="mono" style={{ color: t.muted }}>
              Esc to close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

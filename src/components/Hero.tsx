import { useEffect, useRef } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { profile } from '../data/profile'
import { useFinePointer, useReducedMotion } from '../hooks'
import Schematic from './Schematic'
import Marquee from './Marquee'

const NAV = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

const FIRST = profile.first.toUpperCase().split('')

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([])
  const fine = useFinePointer()
  const reduced = useReducedMotion()

  // Letters thicken and condense as the pointer approaches. One rAF per pointer move, no React renders.
  useEffect(() => {
    const section = sectionRef.current
    if (!section || !fine || reduced) return
    let centers: { x: number; y: number }[] = []
    let mx = -9999
    let my = -9999
    let raf = 0
    let visible = true

    const measure = () => {
      centers = letterRefs.current.map((el) => {
        const r = el!.getBoundingClientRect()
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 + window.scrollY }
      })
    }
    const tick = () => {
      raf = 0
      const R = Math.max(300, window.innerWidth * 0.34)
      letterRefs.current.forEach((el, i) => {
        const c = centers[i]
        if (!el || !c) return
        const d = Math.hypot(c.x - mx, (c.y - my) * 0.9)
        const t = Math.max(0, 1 - d / R)
        const e = t * t * (3 - 2 * t)
        el.style.setProperty('--w', String(Math.round(260 + 540 * e)))
        el.style.setProperty('--s', String(Math.round(100 - 25 * e)))
      })
    }
    const onMove = (e: PointerEvent) => {
      if (!visible) return
      mx = e.clientX
      my = e.clientY + window.scrollY
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const onLeave = () => {
      mx = my = -9999
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(section)

    // measure after the intro animation and fonts settle
    const t = window.setTimeout(measure, 1400)
    document.fonts?.ready.then(measure)
    window.addEventListener('resize', measure)
    section.addEventListener('pointermove', onMove, { passive: true })
    section.addEventListener('pointerleave', onLeave)
    return () => {
      window.clearTimeout(t)
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', measure)
      section.removeEventListener('pointermove', onMove)
      section.removeEventListener('pointerleave', onLeave)
    }
  }, [fine, reduced])

  // tap / click a letter: brief punch (works on touch too)
  const punch = (i: number) => {
    const el = letterRefs.current[i]
    if (!el) return
    el.style.setProperty('--w', '800')
    el.style.setProperty('--s', '75')
    window.setTimeout(() => {
      el.style.setProperty('--w', '260')
      el.style.setProperty('--s', '100')
    }, 420)
  }

  return (
    <section ref={sectionRef} id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* top rail */}
      <header className="fade-up relative z-10 grid grid-cols-2 items-start gap-4 px-4 pt-4 sm:px-8 sm:pt-6 lg:grid-cols-12" style={{ '--d': '700ms' } as React.CSSProperties}>
        <div className="mono col-span-1 leading-relaxed lg:col-span-3">
          <span className="font-semibold">M.B.</span>
        </div>
        <nav aria-label="Primary" className="col-span-1 justify-self-end lg:col-span-6 lg:justify-self-center">
          <ul className="mono flex flex-col items-end gap-1 sm:flex-row sm:gap-6">
            {NAV.map((n, i) => (
              <li key={n.href}>
                <a href={n.href} className="group inline-flex gap-1.5 py-0.5">
                  <span className="text-rust">({String(i + 1).padStart(2, '0')})</span>
                  <span className="relative">
                    {n.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-[var(--ease-expo)] group-hover:origin-left group-hover:scale-x-100" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <div className="relative flex flex-1 flex-col justify-center px-4 sm:px-8">
        <div className="mono mb-2 mt-10 flex items-center gap-3 text-mute fade-up sm:mt-6" style={{ '--d': '500ms' } as React.CSSProperties}>
          <span className="inline-block h-px w-10 bg-ink/40" />
          <span>{profile.roles[0]}</span>
        </div>

        <h1 className="relative select-none">
          <span className="sr-only">{profile.name}</span>
          <span
            aria-hidden
            className="-ml-[0.04em] block whitespace-nowrap text-[23.2vw] leading-[0.78] tracking-[-0.045em] uppercase"
          >
            {FIRST.map((ch, i) => (
              <span
                key={i}
                ref={(el) => {
                  letterRefs.current[i] = el
                }}
                onPointerDown={() => punch(i)}
                className="name-letter"
                style={{ '--i': i } as React.CSSProperties}
              >
                {ch}
              </span>
            ))}
          </span>

          <span aria-hidden className="mt-[-0.6vw] flex items-start justify-end">
            <span
              className="serif-i fade-up relative pr-[1vw] text-[17vw] leading-[0.9] sm:text-[13.5vw]"
              style={{ '--d': '520ms' } as React.CSSProperties}
            >
              Bekele<span className="text-rust not-italic">.</span>
            </span>
          </span>
        </h1>

        <div className="mt-5 grid items-start gap-8 pb-8 lg:-mt-[11vw] lg:grid-cols-12 lg:gap-6">
          <div className="fade-up lg:col-span-5 xl:col-span-4" style={{ '--d': '850ms' } as React.CSSProperties}>
            <p className="max-w-[30rem] text-[1.08rem] leading-snug sm:text-xl">
              I build practical software — web applications, the backend systems behind them, and products with{' '}
              <span className="serif-i text-[1.15em] text-rust">AI in the loop</span>. About four years of it, between company
              roles and my own projects.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="btn-press group inline-flex items-center gap-2 bg-rust px-5 py-3 font-medium text-bone"
                style={{ '--shc': 'var(--color-ink)' } as React.CSSProperties}
              >
                See the work
                <ArrowDown size={17} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
              <a
                href={profile.resumeUrl}
                download
                className="btn-press inline-flex items-center gap-2 border border-ink bg-bone px-5 py-3 font-medium"
                style={{ '--shc': 'var(--color-ink)' } as React.CSSProperties}
              >
                Résumé <ArrowUpRight size={17} />
              </a>
            </div>
          </div>

          <div className="fade-up flex flex-col justify-end lg:col-span-4 lg:col-start-9 lg:mt-[12.5vw] xl:col-span-3 xl:col-start-10" style={{ '--d': '1000ms' } as React.CSSProperties}>
            <div className="mono mb-3 flex items-center justify-between border-b border-ink/25 pb-2">
              <span>{profile.roles[1]}</span>
              <span className="text-rust">●</span>
            </div>
            <Schematic />
          </div>
        </div>
      </div>

      <Marquee />
    </section>
  )
}

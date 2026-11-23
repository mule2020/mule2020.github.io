import { useCallback, useEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from 'react'
import { ArrowUpRight, Plus } from 'lucide-react'
import { projects, projectById, type Project, type ProjectId } from '../data/projects'
import { useFinePointer, useReducedMotion } from '../hooks'
import SectionLabel from './SectionLabel'
import Poster from './visuals/Poster'
import MellaVisual from './visuals/MellaVisual'
import PaperTrailVisual from './visuals/PaperTrailVisual'
import SmsVisual from './visuals/SmsVisual'
import PharmaVisual from './visuals/PharmaVisual'
import JobsVisual from './visuals/JobsVisual'
import CaseFile from './CaseFile'

type Opener = (id: ProjectId, e: MouseEvent<HTMLElement>) => void

export default function Projects() {
  const [caseState, setCaseState] = useState<{ id: ProjectId; x: number; y: number; open: boolean } | null>(null)
  const returnFocus = useRef<HTMLElement | null>(null)
  const reduced = useReducedMotion()

  const openCase: Opener = useCallback((id, e) => {
    returnFocus.current = e.currentTarget
    const r = e.currentTarget.getBoundingClientRect()
    const x = e.clientX || r.left + r.width / 2
    const y = e.clientY || r.top + r.height / 2
    setCaseState({ id, x, y, open: false })
    requestAnimationFrame(() => requestAnimationFrame(() => setCaseState((s) => (s ? { ...s, open: true } : s))))
  }, [])

  const closeCase = useCallback(() => {
    setCaseState((s) => (s ? { ...s, open: false } : s))
    window.setTimeout(() => setCaseState(null), reduced ? 0 : 750)
    returnFocus.current?.focus({ preventScroll: true })
  }, [reduced])

  return (
    <section id="projects" className="relative">
      <div className="px-4 pb-10 pt-16 sm:px-8 sm:pt-24">
        <SectionLabel n="02" label="Selected work" />
        <h2 className="mt-10 max-w-[14ch] text-[clamp(3rem,9vw,9.5rem)] leading-[0.86] font-[650] tracking-[-0.045em]">
          <span data-reveal="line" className="block"><span>Things I've</span></span>
          <span data-reveal="line" className="block" style={{ '--d': '120ms' } as CSSProperties}>
            <span>
              <span className="serif-i font-normal text-rust">built</span> lately.
            </span>
          </span>
        </h2>
        <ProjectIndex />
      </div>

      <Chapter p={projectById.mella} onOpen={openCase} layout="mella">
        <MellaVisual />
      </Chapter>
      <Chapter p={projectById.papertrail} onOpen={openCase} layout="papertrail">
        <PaperTrailVisual />
      </Chapter>
      <Chapter p={projectById.sms} onOpen={openCase} layout="sms">
        <SmsVisual />
      </Chapter>
      <Chapter p={projectById.pharma} onOpen={openCase} layout="pharma">
        <PharmaVisual />
      </Chapter>
      <Chapter p={projectById.jobs} onOpen={openCase} layout="jobs">
        <JobsVisual />
      </Chapter>

      {caseState && (
        <CaseFile project={projectById[caseState.id]} x={caseState.x} y={caseState.y} open={caseState.open} onClose={closeCase} />
      )}
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Index: big type list + a preview that trails the pointer            */
/* ------------------------------------------------------------------ */
function ProjectIndex() {
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const [hover, setHover] = useState<number | null>(null)
  const followRef = useRef<HTMLDivElement>(null)
  const target = useRef({ x: 0, y: 0 })
  const pos = useRef({ x: 0, y: 0 })
  const raf = useRef(0)
  const hovering = useRef(false)

  const loop = useCallback(() => {
    const k = reduced ? 1 : 0.16
    pos.current.x += (target.current.x - pos.current.x) * k
    pos.current.y += (target.current.y - pos.current.y) * k
    const el = followRef.current
    if (el) el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) rotate(${(target.current.x - pos.current.x) * 0.03}deg)`
    const settled = Math.abs(target.current.x - pos.current.x) < 0.5 && Math.abs(target.current.y - pos.current.y) < 0.5
    raf.current = hovering.current || !settled ? requestAnimationFrame(loop) : 0
  }, [reduced])

  const onMove = (e: React.PointerEvent) => {
    target.current = { x: e.clientX + 24, y: e.clientY - 110 }
    if (!hovering.current) {
      hovering.current = true
      pos.current = { ...target.current }
    }
    if (!raf.current) raf.current = requestAnimationFrame(loop)
  }
  const onLeave = () => {
    hovering.current = false
    setHover(null)
  }
  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  return (
    <div className="relative mt-14 sm:mt-20">
      <ul onPointerMove={fine ? onMove : undefined} onPointerLeave={onLeave} className="border-b border-ink">
        {projects.map((p, i) => (
          <li key={p.id} data-reveal style={{ '--d': `${i * 70}ms` } as CSSProperties}>
            <a
              href={`#project-${p.id}`}
              onPointerEnter={() => setHover(i)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              className="group relative grid grid-cols-[2.2rem_1fr_auto] items-center gap-2 overflow-hidden border-t border-ink py-3 transition-colors duration-500 sm:grid-cols-[4rem_1fr_auto] sm:py-4"
              style={{ '--pbg': p.theme.bg, '--pfg': p.theme.fg } as CSSProperties}
            >
              <span aria-hidden className="absolute inset-0 origin-bottom scale-y-0 bg-[var(--pbg)] transition-transform duration-500 ease-[var(--ease-expo)] group-hover:scale-y-100 group-focus-visible:scale-y-100" />
              <span className="mono relative pl-1 text-mute transition-colors group-hover:text-[var(--pfg)]">{p.index}</span>
              <span className="relative text-[clamp(2rem,6vw,5.6rem)] leading-[1] font-[420] tracking-[-0.04em] transition-[font-weight,transform,color] duration-500 ease-[var(--ease-expo)] group-hover:translate-x-2 group-hover:font-[760] group-hover:text-[var(--pfg)] sm:group-hover:translate-x-5">
                {p.title}
              </span>
              <span className="relative flex items-center gap-3 pr-1 text-right transition-colors group-hover:text-[var(--pfg)]">
                <span className="hidden flex-col items-end md:flex">
                  <span className="mono">{p.kicker}</span>
                  <span className="mono text-mute group-hover:text-[var(--pfg)] group-hover:opacity-70">{p.category}</span>
                </span>
                <ArrowUpRight className="h-6 w-6 shrink-0 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:rotate-45 sm:h-8 sm:w-8" />
              </span>
            </a>
          </li>
        ))}
      </ul>

      {fine && (
        <div
          ref={followRef}
          aria-hidden
          className={`pointer-events-none fixed left-0 top-0 z-40 h-[210px] w-[320px] transition-[opacity,scale] duration-300 ${hover === null ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}`}
        >
          <div className="relative h-full w-full shadow-[10px_10px_0_0_#121110]">
            {projects.map((p, i) => (
              <div
                key={p.id}
                className="absolute inset-0 transition-[clip-path] duration-500 ease-[var(--ease-expo)]"
                style={{ clipPath: hover === i ? 'inset(0 0 0 0)' : hover !== null && i < hover ? 'inset(0 0 100% 0)' : 'inset(100% 0 0 0)' }}
              >
                <Poster p={p} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Chapters: one composition per project                               */
/* ------------------------------------------------------------------ */
function Chapter({ p, onOpen, layout, children }: { p: Project; onOpen: Opener; layout: ProjectId; children: ReactNode }) {
  const t = p.theme
  const vars = { background: t.bg, color: t.fg, '--acc': t.accent, '--mut': t.muted } as CSSProperties

  const head = (
    <div data-reveal className="mono flex items-center gap-4" style={{ color: t.muted }}>
      <span style={{ color: t.fg }}>Project {p.index}/05</span>
      <span className="h-px flex-1 opacity-40" style={{ background: t.fg }} />
      <span>{p.kicker}</span>
    </div>
  )

  const summary = (
    <p data-reveal className="max-w-[46ch] text-[1.05rem] leading-relaxed sm:text-lg" style={{ '--d': '100ms' } as CSSProperties}>
      {p.summary}
    </p>
  )

  const stack =
    p.stack.length > 0 ? (
      <ul data-reveal className="mono flex flex-wrap gap-x-1 gap-y-1" style={{ '--d': '160ms', color: t.muted } as CSSProperties} aria-label="Stack">
        {p.stack.map((s, i) => (
          <li key={s}>
            {s}
            {i < p.stack.length - 1 && <span className="pl-1 opacity-50">/</span>}
          </li>
        ))}
      </ul>
    ) : (
      <p data-reveal className="mono" style={{ color: t.muted }}>Stack notes coming soon</p>
    )

  const button = (
    <button
      data-reveal
      onClick={(e) => onOpen(p.id, e)}
      className="btn-press group inline-flex items-center gap-3 px-5 py-3 font-medium"
      style={{ background: t.fg, color: t.bg, '--shc': t.accent === t.fg ? t.muted : t.accent, '--d': '200ms' } as CSSProperties}
    >
      Open case file
      <Plus size={17} className="transition-transform duration-500 ease-[var(--ease-expo)] group-hover:rotate-90" />
    </button>
  )

  const features = (
    <ol className="grid gap-x-6 sm:grid-cols-2">
      {p.features.map((f, i) => (
        <li key={f} data-reveal style={{ '--d': `${i * 60}ms`, borderColor: 'color-mix(in srgb, currentColor 25%, transparent)' } as CSSProperties} className="flex gap-3 border-t py-3 text-[0.95rem] leading-snug" >
          <span className="mono pt-0.5" style={{ color: t.accent }}>{String(i + 1).padStart(2, '0')}</span>
          <span>{f}</span>
        </li>
      ))}
    </ol>
  )

  return (
    <article id={`project-${p.id}`} aria-labelledby={`t-${p.id}`} className="relative overflow-hidden" style={vars}>
      <div className="px-4 py-16 sm:px-8 sm:py-24 lg:py-28">
        {head}

        {layout === 'mella' && (
          <div className="mt-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="flex flex-col gap-7 lg:col-span-6">
              <h3 id={`t-${p.id}`} data-reveal="line" className="serif-i text-[clamp(6rem,19vw,17rem)] leading-[0.78]">
                <span>{p.title}<span style={{ color: t.accent }} className="not-italic">*</span></span>
              </h3>
              <p className="mono -mt-2" style={{ color: t.muted }}>* the place where customers and sellers meet</p>
              {summary}
              {stack}
              <div>{button}</div>
            </div>
            <div className="lg:col-span-6" data-reveal style={{ '--d': '150ms' } as CSSProperties}>{children}</div>
            <div className="lg:col-span-12">{features}</div>
          </div>
        )}

        {layout === 'papertrail' && (
          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="order-2 lg:order-1 lg:col-span-7" data-reveal>{children}</div>
            <div className="order-1 flex flex-col gap-7 lg:order-2 lg:col-span-5">
              <h3 id={`t-${p.id}`} className="text-[clamp(3.4rem,7.4vw,7.4rem)] leading-[0.86] font-[700] tracking-[-0.05em]">
                <span data-reveal="line" className="block"><span>PaperTrail</span></span>
                <span data-reveal="line" className="block" style={{ '--d': '100ms' } as CSSProperties}>
                  <span>
                    <span className="relative inline-block px-1 text-[#16302E]">
                      <span aria-hidden className="absolute inset-x-0 bottom-[0.08em] top-[0.12em] -z-0 bg-[var(--acc)]" />
                      <span className="relative">AI</span>
                    </span>
                    <span className="serif-i font-normal text-[0.6em] tracking-normal"> reads it for you</span>
                  </span>
                </span>
              </h3>
              {summary}
              {stack}
              <div>{button}</div>
            </div>
            <div className="order-3 lg:col-span-12">{features}</div>
          </div>
        )}

        {layout === 'sms' && (
          <div className="mt-8">
            <h3 id={`t-${p.id}`} data-reveal="line" className="font-mono text-[clamp(3.6rem,13vw,13rem)] leading-[0.9] font-[700] tracking-[-0.06em]">
              <span>
                A2P<span style={{ color: t.accent }}>_</span>SMS
              </span>
            </h3>
            <div className="mt-10 grid gap-10 lg:grid-cols-12">
              <div className="flex flex-col gap-7 lg:col-span-4">
                {summary}
                {stack}
                <div>{button}</div>
              </div>
              <div className="lg:col-span-8" data-reveal style={{ '--d': '120ms' } as CSSProperties}>{children}</div>
            </div>
            <div className="mt-12">{features}</div>
          </div>
        )}

        {layout === 'pharma' && (
          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="flex flex-col gap-7 lg:col-span-5">
              <h3 id={`t-${p.id}`} className="text-[clamp(3.4rem,7vw,7rem)] leading-[0.88] font-[300] tracking-[-0.045em]">
                <span data-reveal="line" className="block"><span>Pharma</span></span>
                <span data-reveal="line" className="block" style={{ '--d': '100ms' } as CSSProperties}>
                  <span className="font-[750]" style={{ color: t.accent }}>Inventory</span>
                </span>
              </h3>
              {summary}
              {stack}
              <div>{button}</div>
            </div>
            <div className="lg:col-span-7 lg:pt-6" data-reveal style={{ '--d': '120ms' } as CSSProperties}>
              <p className="mono mb-3" style={{ color: t.muted }}>↓ switch roles to see access change</p>
              {children}
            </div>
            <div className="lg:col-span-12">{features}</div>
          </div>
        )}

        {layout === 'jobs' && (
          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="flex flex-col gap-7 lg:col-span-4">
              <h3 id={`t-${p.id}`} className="text-[clamp(3.2rem,6.4vw,6.4rem)] leading-[0.88] font-[700] tracking-[-0.045em]">
                <span data-reveal="line" className="block"><span>Job</span></span>
                <span data-reveal="line" className="block" style={{ '--d': '100ms' } as CSSProperties}>
                  <span className="serif-i font-normal">Tracker</span>
                </span>
              </h3>
              <p className="mono -mt-3" style={{ color: t.muted }}>{p.kicker}</p>
              {summary}
              {stack}
              <div>{button}</div>
            </div>
            <div className="lg:col-span-8" data-reveal style={{ '--d': '120ms' } as CSSProperties}>{children}</div>
          </div>
        )}
      </div>
    </article>
  )
}

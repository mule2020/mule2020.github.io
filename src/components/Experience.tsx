import { useState, type CSSProperties } from 'react'
import { ChevronDown } from 'lucide-react'
import { experience } from '../data/experience'
import SectionLabel from './SectionLabel'

/** Work history rendered as a git log. */
export default function Experience() {
  const [open, setOpen] = useState<string | null>(experience[0].hash)

  return (
    <section id="experience" className="relative bg-ink px-4 py-20 text-bone sm:px-8 sm:py-28">
      <SectionLabel n="04" label="Experience" dark />

      <div className="mt-10 grid gap-10 lg:grid-cols-12">
        <h2 className="text-[clamp(2.8rem,6vw,6rem)] leading-[0.88] font-[650] tracking-[-0.045em] lg:col-span-4">
          <span data-reveal="line" className="block"><span>Where I've</span></span>
          <span data-reveal="line" className="block" style={{ '--d': '100ms' } as CSSProperties}>
            <span className="serif-i font-normal text-lichen">shipped</span>
          </span>
        </h2>

        <ol className="relative lg:col-span-8">
          {/* the branch line */}
          <span aria-hidden data-reveal="clip" className="absolute bottom-6 left-[11px] top-3 w-px bg-bone/25" />
          {experience.map((r, i) => {
            const isOpen = open === r.hash
            return (
              <li key={r.hash} data-reveal style={{ '--d': `${i * 120}ms` } as CSSProperties} className="group relative grid grid-cols-[2.5rem_1fr] pb-14 last:pb-0">
                <span aria-hidden className="relative z-10 mt-2 flex h-6 w-6 items-center justify-center">
                  <span
                    className={`block h-[13px] w-[13px] rounded-full border-2 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:scale-125 ${
                      i === 0 ? 'border-lichen bg-lichen' : 'border-bone bg-ink'
                    }`}
                  />
                </span>
                <div>
                  <p className="mono flex flex-wrap items-center gap-x-2 normal-case tracking-normal">
                    <span className="text-[#E3A833]">commit {r.hash}</span>
                    <span className="text-bone/60">
                      (<span className={i === 0 ? 'text-lichen' : 'text-rust'}>{r.ref}</span>)
                    </span>
                  </p>
                  <h3 className="mt-2 text-[clamp(2rem,4.4vw,4rem)] leading-[0.95] font-[600] tracking-[-0.035em] transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-2">
                    {r.company}
                  </h3>
                  <p className="mt-2 flex flex-wrap items-baseline gap-x-3">
                    <span className="serif-i text-2xl text-bone/90">{r.title}</span>
                    <span className="mono text-bone/50">{r.type}</span>
                  </p>

                  <ul className="mt-5 max-w-[62ch] space-y-1.5 border-l border-bone/15 pl-4 font-mono text-[0.82rem] leading-relaxed">
                    {r.lines.map((l) => (
                      <li key={l} className="flex gap-3">
                        <span className="select-none text-lichen">+</span>
                        <span className="text-bone/80">{l}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setOpen(isOpen ? null : r.hash)}
                    aria-expanded={isOpen}
                    className="mono mt-5 inline-flex items-center gap-2 text-bone/60 transition-colors hover:text-bone"
                  >
                    <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    files touched
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-expo)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <ul className="flex flex-wrap gap-x-5 gap-y-2 pt-4 font-mono text-[0.75rem]">
                        {r.touched.map((tech) => (
                          <li key={tech} className="flex items-center gap-1.5">
                            <span className="text-lichen">+</span>
                            <span className="text-bone/85">{tech}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

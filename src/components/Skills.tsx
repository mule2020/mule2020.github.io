import { useState, type CSSProperties } from 'react'
import { layers, type Skill } from '../data/skills'
import { projects, type ProjectId } from '../data/projects'
import SectionLabel from './SectionLabel'

/** Two-way map: hover a tool → see the projects that use it; hover a project → see its tools. */
export default function Skills() {
  const [skill, setSkill] = useState<Skill | null>(null)
  const [proj, setProj] = useState<ProjectId | null>(null)
  const engaged = skill !== null || proj !== null

  const skillLit = (s: Skill) => (skill ? skill.name === s.name : proj ? s.projects.includes(proj) : false)
  const projLit = (id: ProjectId) => (skill ? skill.projects.includes(id) : proj === id)

  return (
    <section id="skills" className="relative px-4 py-20 sm:px-8 sm:py-28">
      <SectionLabel n="03" label="Stack" />

      <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-10">
            <h2 className="text-[clamp(2.6rem,5vw,4.8rem)] leading-[0.9] font-[650] tracking-[-0.045em]">
              <span data-reveal="line" className="block"><span>The stack,</span></span>
              <span data-reveal="line" className="block" style={{ '--d': '100ms' } as CSSProperties}>
                <span><span className="serif-i font-normal text-rust">mapped</span> to</span>
              </span>
              <span data-reveal="line" className="block" style={{ '--d': '200ms' } as CSSProperties}><span>the work.</span></span>
            </h2>
            <p data-reveal className="mt-6 max-w-[34ch] text-mute">
              Hover a tool to see where I used it, or a project to see what it's built with.
            </p>

            <ul className="mt-8 border-t border-ink" onPointerLeave={() => setProj(null)}>
              {projects.map((p) => {
                const lit = projLit(p.id)
                return (
                  <li key={p.id}>
                    <button
                      onPointerEnter={() => { setSkill(null); setProj(p.id) }}
                      onFocus={() => { setSkill(null); setProj(p.id) }}
                      onClick={() => setProj((v) => (v === p.id ? null : p.id))}
                      className={`flex w-full items-center gap-3 border-b border-ink/20 py-2.5 text-left transition-[opacity,padding] duration-300 ${engaged && !lit ? 'opacity-30' : ''} ${lit ? 'pl-2' : ''}`}
                    >
                      <span
                        className="h-3 w-3 shrink-0 border border-ink transition-transform duration-300"
                        style={{ background: lit ? p.theme.bg : 'transparent', transform: lit ? 'rotate(45deg)' : 'none' }}
                      />
                      <span className="flex-1 font-medium">{p.title}</span>
                      <span className="mono text-mute">{p.index}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
            <p className="mono mt-4 min-h-[3em] normal-case tracking-normal text-mute" aria-live="polite">
              {skill
                ? `${skill.name}: ${skill.projects.length ? `${skill.projects.length} featured build${skill.projects.length > 1 ? 's' : ''}` : 'no featured build'}${skill.also?.length ? ` · also at ${skill.also.join(', ')}` : ''}`
                : proj
                  ? `${projects.find((x) => x.id === proj)!.title}: ${layers.flatMap((l) => l.skills).filter((s) => s.projects.includes(proj)).length} tools`
                  : ''}
            </p>
          </div>
        </div>

        <div className="lg:col-span-8" onPointerLeave={() => setSkill(null)}>
          {layers.map((layer, li) => (
            <div
              key={layer.id}
              data-reveal
              style={{ '--d': `${li * 60}ms` } as CSSProperties}
              className="grid gap-3 border-t border-ink py-6 sm:grid-cols-[10rem_1fr] sm:gap-6 sm:py-8"
            >
              <div>
                <span className="mono text-rust">L{li + 1}</span>
                <h3 className="serif-i text-3xl leading-none">{layer.name}</h3>
                <p className="mono mt-1 text-mute normal-case tracking-normal">{layer.note}</p>
              </div>
              <ul className="flex flex-wrap items-baseline gap-x-1 gap-y-1">
                {layer.skills.map((s, i) => {
                  const lit = skillLit(s)
                  return (
                    <li key={s.name} className="flex items-baseline">
                      <button
                        onPointerEnter={() => { setProj(null); setSkill(s) }}
                        onFocus={() => { setProj(null); setSkill(s) }}
                        onClick={() => setSkill((v) => (v?.name === s.name ? null : s))}
                        className={`relative text-[clamp(1.35rem,2.5vw,2.25rem)] leading-tight tracking-[-0.025em] font-[420] transition-[color,opacity] duration-300 ${
                          lit ? 'text-rust underline decoration-2 underline-offset-[6px]' : engaged ? 'opacity-25' : ''
                        }`}
                      >
                        {s.name}
                      </button>
                      {i < layer.skills.length - 1 && <span className="px-1.5 text-xl text-ink/25">/</span>}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

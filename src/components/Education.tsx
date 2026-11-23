import type { CSSProperties } from 'react'
import { certifications, education } from '../data/profile'
import SectionLabel from './SectionLabel'

/** Education as a transit line; certifications as stamps. */
export default function Education() {
  return (
    <section id="education" className="relative overflow-hidden px-4 py-20 sm:px-8 sm:py-28">
      <SectionLabel n="05" label="Study" aside="Next stop: cybersecurity" />

      <h2 className="mt-10 text-[clamp(2.8rem,6vw,6rem)] leading-[0.88] font-[650] tracking-[-0.045em]">
        <span data-reveal="line" className="block"><span>Learning,</span></span>
        <span data-reveal="line" className="block" style={{ '--d': '100ms' } as CSSProperties}>
          <span className="serif-i font-normal text-rust">one stop at a time.</span>
        </span>
      </h2>

      {/* transit line */}
      <ol className="relative mt-16 grid gap-0 md:mt-24 md:grid-cols-3">
        {/* horizontal track (desktop) */}
        <span aria-hidden className="absolute left-0 right-[33.33%] top-[11px] hidden h-[3px] bg-ink md:block" data-reveal="x" />
        <span
          aria-hidden
          className="absolute left-[66.66%] right-0 top-[11px] hidden h-[3px] md:block"
          style={{ background: 'repeating-linear-gradient(90deg, var(--color-rust) 0 10px, transparent 10px 18px)' }}
        />
        {/* vertical track (mobile) */}
        <span aria-hidden className="absolute bottom-0 left-[11px] top-0 w-[3px] bg-ink md:hidden" />

        {education.map((e, i) => {
          const current = e.status === 'in progress'
          return (
            <li key={e.code} data-reveal style={{ '--d': `${200 + i * 160}ms` } as CSSProperties} className="relative pb-12 pl-12 md:pb-0 md:pl-0 md:pr-8">
              <span aria-hidden className="absolute left-0 top-0 flex h-[25px] w-[25px] items-center justify-center md:relative">
                {current && <span className="absolute inset-0 animate-ping rounded-full bg-rust/40 [animation-duration:2.2s]" />}
                <span className={`relative h-[25px] w-[25px] rounded-full border-[3px] ${current ? 'border-rust bg-bone' : 'border-ink bg-bone'}`} />
              </span>
              <p className="mono mt-0 text-mute md:mt-6">
                Stop {String(i + 1).padStart(2, '0')} · <span className={current ? 'text-rust' : ''}>{e.status}</span>
              </p>
              <p aria-hidden className="mt-3 text-[clamp(4rem,8vw,7.5rem)] leading-[0.8] font-[800] tracking-[-0.05em] text-transparent [-webkit-text-stroke:1.5px_var(--color-ink)]">
                {e.code}
              </p>
              <h3 className="mt-4 text-xl font-semibold leading-tight tracking-tight">{e.award}</h3>
              <p className="serif-i mt-1 text-xl text-ink/80">{e.school}</p>
              <p className="mt-3 max-w-[32ch] text-[0.95rem] leading-relaxed text-mute">{e.note}</p>
            </li>
          )
        })}
      </ol>

      {/* certifications */}
      <div className="mt-24 grid items-center gap-12 border-t border-ink pt-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="mono text-rust">Certified</p>
          <h3 data-reveal className="mt-3 text-[clamp(2rem,3.6vw,3.2rem)] leading-[0.95] font-[600] tracking-[-0.035em]">
            Two AWS certifications, <span className="serif-i font-normal">both put to use.</span>
          </h3>
          <p data-reveal className="mt-4 max-w-[40ch] leading-relaxed text-mute">
            The Cloud Practitioner covers the AWS foundation; the AI Practitioner covers how services like Bedrock fit into real products — the same ground PaperTrail AI is built on.
          </p>
        </div>
        <ul className="flex flex-wrap justify-center gap-6 sm:gap-10 md:col-span-7 md:justify-end">
          {certifications.map((c, i) => (
            <li key={c.short} data-reveal style={{ '--d': `${i * 150}ms` } as CSSProperties}>
              <Stamp text={c.ring} short={c.short} title={c.title} tilt={i ? 6 : -8} accent={i ? 'var(--color-ink)' : 'var(--color-rust)'} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Stamp({ text, short, title, tilt, accent }: { text: string; short: string; title: string; tilt: number; accent: string }) {
  const id = `ring-${short}`
  return (
    <figure
      className="group relative h-[200px] w-[200px] transition-transform duration-700 ease-[var(--ease-expo)] hover:!rotate-0 hover:scale-105 sm:h-[240px] sm:w-[240px]"
      style={{ rotate: `${tilt}deg`, color: accent }}
      title={title}
    >
      <svg viewBox="0 0 200 200" className="spin-slow absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <path id={id} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text fontFamily="var(--font-mono)" fontSize="12" fill="currentColor" textLength="486" lengthAdjust="spacing">
          <textPath href={`#${id}`} textLength="486" lengthAdjust="spacing">{text}</textPath>
        </text>
      </svg>
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden>
        <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="100" cy="100" r="62" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 4" />
      </svg>
      <figcaption className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="mono text-[0.6rem]">AWS</span>
        <span className="text-[1.6rem] leading-none font-[800] tracking-[-0.04em]">{short}</span>
        <span className="serif-i text-sm">Practitioner</span>
        <span className="sr-only">{title}</span>
      </figcaption>
    </figure>
  )
}

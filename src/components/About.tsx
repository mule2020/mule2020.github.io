import type { CSSProperties } from 'react'
import SectionLabel from './SectionLabel'

const STATEMENT =
  "Most of my work lives behind the interface: REST APIs, Postgres schemas, caches, queues and the deploy scripts nobody sees. I like owning a feature from the table design to the button that triggers it. Lately that includes AI — treating a model as one more service in the system, with retrieval, embeddings and the AWS pieces that hold it together."

const PRINCIPLES = [
  {
    n: '01',
    t: 'Boring where it counts',
    d: 'Predictable endpoints, typed boundaries, migrations that can run twice. The interesting parts are easier to build on top of that.',
  },
  {
    n: '02',
    t: 'A model is a component',
    d: 'An LLM gets inputs, limits and checks like any other dependency. Retrieval and good data matter more than clever prompts.',
  },
  {
    n: '03',
    t: 'The whole path',
    d: 'Frontend, API, database, infrastructure, CI. Knowing every hop makes debugging faster and features more honest.',
  },
]

const FACTS = [
  { k: '~4', u: 'years', d: 'building software, professionally and on my own' },
  { k: '2×', u: 'AWS', d: 'certified — AI Practitioner and Cloud Practitioner' },
  { k: '3', u: 'roles', d: 'full-time and freelance — details further down' },
  { k: '5', u: 'builds', d: 'featured below, from marketplaces to RAG' },
]

const BARS = [38, 62, 30, 84, 52, 100, 44, 70, 26, 90, 58, 36, 76, 48]

export default function About() {
  const words = STATEMENT.split(' ')
  return (
    <section id="about" className="relative bg-ink text-bone">
      <div className="px-4 pb-24 pt-20 sm:px-8 sm:pt-28 lg:pb-36">
        <SectionLabel n="01" label="About" dark />

        <p className="read-para mt-10 max-w-[19ch] text-[clamp(2rem,4.6vw,4.4rem)] leading-[1.02] font-[450] tracking-[-0.025em] sm:mt-14 md:max-w-[24ch]">
          {words.map((w, i) => (
            <span key={i} className="w" style={{ '--p': i / words.length } as CSSProperties}>
              {w}{' '}
            </span>
          ))}
        </p>

        <div className="mt-20 grid gap-10 border-t border-bone/15 pt-10 md:grid-cols-3 md:gap-8 lg:mt-28">
          {PRINCIPLES.map((p, i) => (
            <div key={p.n} data-reveal style={{ '--d': `${i * 110}ms` } as CSSProperties} className="group">
              <div className="mono flex items-center gap-3 text-lichen">
                <span>{p.n}</span>
                <span className="h-px flex-1 origin-left scale-x-50 bg-bone/20 transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-x-100" />
              </div>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                {p.t.split(' ').slice(0, -1).join(' ')} <span className="serif-i font-normal text-[1.15em]">{p.t.split(' ').slice(-1)}</span>
              </h3>
              <p className="mt-3 max-w-[34ch] leading-relaxed text-bone/65">{p.d}</p>
            </div>
          ))}
        </div>

        <dl className="mt-20 grid grid-cols-2 gap-y-10 lg:mt-28 lg:grid-cols-4">
          {FACTS.map((f, i) => (
            <div key={f.u} data-reveal style={{ '--d': `${i * 90}ms` } as CSSProperties} className="border-l border-bone/15 pl-4 pr-2">
              <dt className="flex items-baseline gap-2">
                <span className="text-[clamp(3rem,7vw,6rem)] leading-none font-[750] tracking-[-0.05em] text-transparent [-webkit-text-stroke:1.2px_var(--color-bone)]">
                  {f.k}
                </span>
                <span className="serif-i text-2xl text-lichen">{f.u}</span>
              </dt>
              <dd className="mt-2 max-w-[22ch] text-sm leading-snug text-bone/60">{f.d}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* stepped edge into the next section — bars grow in when reached */}
      <div aria-hidden className="relative flex h-16 origin-bottom items-end sm:h-24" data-reveal="clip" style={{ transformOrigin: 'bottom' }}>
        {BARS.map((h, i) => (
          <span key={i} className="flex-1 bg-bone" style={{ height: `${100 - h}%` }} />
        ))}
      </div>
    </section>
  )
}

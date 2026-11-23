import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { profile } from '../data/profile'

const WORD = `${profile.first} ${profile.last}`.toUpperCase().split('')

export default function Footer() {
  const [ms, setMs] = useState<number | null>(null)

  useEffect(() => {
    const read = () => {
      const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
      if (nav && nav.domContentLoadedEventEnd > 0) setMs(Math.round(nav.domContentLoadedEventEnd))
    }
    if (document.readyState === 'complete') read()
    else window.addEventListener('load', read, { once: true })
  }, [])

  return (
    <footer className="relative overflow-hidden bg-ink pb-28 pt-16 text-bone sm:pb-32">
      <div className="grid gap-10 px-4 sm:grid-cols-2 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-2xl font-semibold tracking-tight">{profile.name}</p>
          <p className="serif-i text-xl text-bone/60">{profile.roles.join(' · ')}</p>
        </div>
        <nav aria-label="Footer" className="lg:col-span-3">
          <ul className="mono space-y-2">
            {[['#about', 'About'], ['#projects', 'Projects'], ['#skills', 'Stack'], ['#experience', 'Experience'], ['#education', 'Study'], ['#contact', 'Contact']].map(([h, l]) => (
              <li key={h}>
                <a href={h} className="text-bone/60 transition-colors hover:text-lichen">{l}</a>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="mono space-y-2 lg:col-span-2">
          <li><a href={profile.github} target="_blank" rel="noreferrer" className="text-bone/60 hover:text-lichen">GitHub ↗</a></li>
          <li><a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-bone/60 hover:text-lichen">LinkedIn ↗</a></li>
          <li><a href={profile.resumeUrl} download className="text-bone/60 hover:text-lichen">Résumé ↓</a></li>
        </ul>
        <div className="lg:col-span-2 lg:justify-self-end">
          <a href="#top" className="group mono inline-flex items-center gap-3 border border-bone/30 px-4 py-3 transition-colors hover:border-lichen hover:text-lichen">
            Back to top
            <span className="relative h-4 w-4 overflow-hidden">
              <ArrowUp size={16} className="absolute transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-5" />
              <ArrowUp size={16} className="absolute translate-y-5 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-y-0" />
            </span>
          </a>
        </div>
      </div>

      {/* oversized name — letters fill in under the pointer */}
      <p aria-hidden className="mt-20 select-none whitespace-nowrap px-2 text-center text-[10.4vw] leading-[0.8] font-[800] tracking-[-0.05em]">
        {WORD.map((c, i) =>
          c === ' ' ? (
            <span key={i}> </span>
          ) : (
            <span
              key={i}
              className="inline-block text-transparent transition-[color,transform] duration-300 [-webkit-text-stroke:1px_rgba(234,229,218,.35)] hover:-translate-y-[0.06em] hover:text-rust hover:duration-75"
            >
              {c}
            </span>
          ),
        )}
      </p>

      <div className="mono mt-10 flex flex-col gap-2 px-4 normal-case tracking-normal text-bone/40 sm:flex-row sm:justify-between sm:px-8">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>
          React + Tailwind CSS. No animation library, no images, no trackers.
          {ms !== null && <> Ready in <span className="text-lichen">{ms} ms</span>.</>}
        </span>
      </div>
    </footer>
  )
}

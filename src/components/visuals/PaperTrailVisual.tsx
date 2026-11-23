import { useState } from 'react'
import { CalendarClock, FileText, MailCheck, MessageSquareText, Sparkles } from 'lucide-react'
import { useInView, useInterval, useReducedMotion } from '../../hooks'

/* A made-up sample document, used only to illustrate the pipeline. */
const DOC = [
  { w: 92 }, { w: 100 }, { w: 84 }, { w: 0 },
  { w: 96, hl: 'date' }, { w: 70, hl: 'date' }, { w: 0 },
  { w: 100 }, { w: 88, hl: 'ob' }, { w: 94, hl: 'ob' }, { w: 60 }, { w: 0 },
  { w: 98 }, { w: 82 }, { w: 90 }, { w: 40 },
]

const STEPS = [
  { icon: Sparkles, label: 'Summary', body: 'Two-year service agreement. Fixed monthly fee, 60-day notice to renew or cancel.' },
  { icon: CalendarClock, label: 'Key date', body: 'Renewal notice due — 60 days before term ends.', tag: 'date' },
  { icon: FileText, label: 'Obligation', body: 'Provider keeps liability insurance active for the full term.', tag: 'ob' },
  { icon: MessageSquareText, label: 'Q&A', body: '“Can we cancel early?” → Yes, with 30 days written notice (§7.2).' },
  { icon: MailCheck, label: 'Reminder', body: 'Email scheduled two weeks before the notice deadline.' },
]

export default function PaperTrailVisual() {
  const [ref, inView] = useInView<HTMLDivElement>('-10% 0px')
  const reduced = useReducedMotion()
  const [step, setStep] = useState(reduced ? STEPS.length : 1)
  useInterval(() => setStep((s) => (s > STEPS.length + 1 ? 1 : s + 1)), 1700, inView && !reduced)
  const shown = Math.min(step, STEPS.length)
  const activeTag = STEPS[shown - 1]?.tag

  return (
    <div ref={ref} className="relative grid w-full gap-4 sm:grid-cols-[1fr_1.05fr] sm:gap-6">
      {/* the document */}
      <div className="relative overflow-hidden bg-[#F3EFE4] p-4 text-ink shadow-[0_40px_80px_-30px_rgba(0,0,0,.6)] sm:p-6" style={{ ['--scan-h' as string]: '360px' }}>
        <div className="mono flex justify-between text-[0.55rem] text-ink/50">
          <span className="truncate">service_agreement.pdf</span>
          <span>p. 1/6</span>
        </div>
        <p className="mt-3 text-[0.8rem] font-semibold leading-tight sm:text-sm">Service Agreement</p>
        <div className="mt-3 space-y-[7px]">
          {DOC.map((l, i) =>
            l.w === 0 ? (
              <div key={i} className="h-2" />
            ) : (
              <div key={i} className="relative h-[5px]" style={{ width: `${l.w}%` }}>
                <span className="absolute inset-0 bg-ink/20" />
                {l.hl && (
                  <span
                    className={`absolute -inset-y-[3px] -left-1 right-0 origin-left bg-[#E6F05A] mix-blend-multiply transition-transform duration-700 ease-[var(--ease-expo)] ${
                      activeTag === l.hl || shown === STEPS.length ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                )}
              </div>
            ),
          )}
        </div>
        {!reduced && (
          <span aria-hidden className="scan pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-transparent via-[#E6F05A]/40 to-transparent" />
        )}
      </div>

      {/* extracted output */}
      <ol className="flex flex-col gap-2 sm:gap-2.5">
        {STEPS.map((s, i) => {
          const on = i < shown
          const Icon = s.icon
          return (
            <li
              key={s.label}
              className={`border border-[#ECE7DA]/15 p-2.5 transition-all duration-700 ease-[var(--ease-expo)] sm:p-3 ${
                on ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
              } ${i === shown - 1 ? 'bg-[#ECE7DA]/[.07]' : ''}`}
            >
              <div className="mono flex items-center gap-2 text-[0.58rem] text-[#E6F05A]">
                <Icon size={12} /> {s.label}
              </div>
              <p className="mt-1 text-[0.72rem] leading-snug text-[#ECE7DA]/85 sm:text-[0.8rem]">{s.body}</p>
            </li>
          )
        })}
        <li className="mono mt-auto text-[0.55rem] text-[#8FA8A3]">sample document · illustrative output</li>
      </ol>
    </div>
  )
}

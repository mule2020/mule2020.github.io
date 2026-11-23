import { useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { ArrowUpRight, Check, Copy, Download } from 'lucide-react'
import { profile } from '../data/profile'
import { useFinePointer } from '../hooks'

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-rust px-4 pb-24 pt-20 text-bone sm:px-8 sm:pt-28">
      <div data-reveal className="mono flex items-center gap-4 text-bone/80">
        <span className="text-ink">(06)</span>
        <span className="text-bone">Contact</span>
        <span className="h-px flex-1 bg-bone/30" />
        <span className="hidden sm:inline">LinkedIn · GitHub · Résumé</span>
      </div>

      <div className="mt-10 grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="text-[clamp(3rem,8vw,8.2rem)] leading-[0.86] font-[650] tracking-[-0.05em]">
            <span data-reveal="line" className="block"><span>Got something</span></span>
            <span data-reveal="line" className="block" style={{ '--d': '100ms' } as CSSProperties}><span>that needs</span></span>
            <span data-reveal="line" className="block" style={{ '--d': '200ms' } as CSSProperties}>
              <span className="serif-i font-normal text-ink">building?</span>
            </span>
          </h2>
          <p data-reveal className="mt-8 max-w-[44ch] text-lg leading-relaxed text-bone/90" style={{ '--d': '250ms' } as CSSProperties}>
            If you're hiring for full-stack, backend or AI application work — or you have a project that needs another engineer — send me a message. LinkedIn is the quickest way to reach me.
          </p>
          <div className="mt-10" data-reveal style={{ '--d': '300ms' } as CSSProperties}>
            <Magnetic>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="group relative flex h-36 w-36 items-center justify-center rounded-full bg-ink text-center text-bone transition-transform duration-300 active:scale-95 sm:h-44 sm:w-44"
              >
                <span className="absolute inset-0 scale-0 rounded-full bg-bone transition-transform duration-500 ease-[var(--ease-expo)] group-hover:scale-100" />
                <span className="relative flex flex-col items-center gap-1 transition-colors duration-300 group-hover:text-ink">
                  <span className="serif-i text-3xl leading-none">Say hello</span>
                  <ArrowUpRight size={20} className="transition-transform duration-500 ease-[var(--ease-expo)] group-hover:rotate-45" />
                </span>
              </a>
            </Magnetic>
          </div>
        </div>

        <ul className="self-end border-t border-ink lg:col-span-5">
          <Row label="LinkedIn" value={`/in/${profile.linkedinHandle}`} href={profile.linkedin} external d={0} />
          <Row label="GitHub" value={`@${profile.githubHandle}`} href={profile.github} external d={80} />
          {profile.email && <EmailRow email={profile.email} />}
          <Row label="Résumé" value="Download PDF" href={profile.resumeUrl} download d={160} icon={<Download size={22} />} />
        </ul>
      </div>
    </section>
  )
}

function Row({ label, value, href, external, download, d, icon }: { label: string; value: string; href: string; external?: boolean; download?: boolean; d: number; icon?: ReactNode }) {
  return (
    <li data-reveal style={{ '--d': `${d}ms` } as CSSProperties}>
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
        {...(download ? { download: '' } : {})}
        className="group relative flex items-center justify-between gap-4 overflow-hidden border-b border-ink py-5"
      >
        <span aria-hidden className="absolute inset-0 origin-left scale-x-0 bg-ink transition-transform duration-500 ease-[var(--ease-expo)] group-hover:scale-x-100" />
        <span className="relative flex flex-col pl-0 transition-[padding] duration-500 ease-[var(--ease-expo)] group-hover:pl-4">
          <span className="mono text-ink transition-colors group-hover:text-bone/60">{label}</span>
          <span className="text-[clamp(1.5rem,2.6vw,2.2rem)] leading-tight font-[550] tracking-[-0.03em]">{value}</span>
        </span>
        <span className="relative pr-1 transition-[transform,padding] duration-500 ease-[var(--ease-expo)] group-hover:pr-4">
          {icon ?? <ArrowUpRight size={26} className="transition-transform duration-500 ease-[var(--ease-expo)] group-hover:rotate-45" />}
        </span>
      </a>
    </li>
  )
}

function EmailRow({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }
  return (
    <li data-reveal className="flex items-stretch border-b border-ink">
      <a href={`mailto:${email}`} className="group relative flex flex-1 flex-col overflow-hidden py-5">
        <span aria-hidden className="absolute inset-0 origin-left scale-x-0 bg-ink transition-transform duration-500 ease-[var(--ease-expo)] group-hover:scale-x-100" />
        <span className="mono relative text-ink transition-colors group-hover:text-bone/60 group-hover:pl-4">Email</span>
        <span className="relative truncate text-[clamp(1.3rem,2.2vw,2rem)] leading-tight font-[550] tracking-[-0.03em] transition-[padding] duration-500 group-hover:pl-4">{email}</span>
      </a>
      <button onClick={copy} className="mono flex w-24 shrink-0 items-center justify-center gap-1.5 border-l border-ink transition-colors hover:bg-ink" aria-live="polite">
        {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
      </button>
    </li>
  )
}

/** Pulls its child slightly toward the pointer. Pointer-fine devices only. */
function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const fine = useFinePointer()
  const move = (e: React.PointerEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - (r.left + r.width / 2)) * 0.3
    const y = (e.clientY - (r.top + r.height / 2)) * 0.3
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }
  const leave = () => {
    if (ref.current) ref.current.style.transform = ''
  }
  return (
    <div
      ref={ref}
      onPointerMove={fine ? move : undefined}
      onPointerLeave={fine ? leave : undefined}
      className="inline-block transition-transform duration-500 ease-[var(--ease-expo)]"
    >
      {children}
    </div>
  )
}

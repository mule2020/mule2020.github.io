import { useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react'
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
            If you're hiring for full-stack, backend or AI application work — or you have a project that needs another engineer — write to me. Use the form, or email me directly.
          </p>
          <ContactForm />
        </div>

        <ul className="self-end border-t border-ink lg:col-span-5">
          <EmailRow email={profile.email} />
          <Row label="GitHub" value={`@${profile.githubHandle}`} href={profile.github} external d={80} />
          <Row label="Résumé" value="Download PDF" href={profile.resumeUrl} download d={160} icon={<Download size={22} />} />
        </ul>
      </div>
    </section>
  )
}

type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error'

function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>
    if (data.company_site) return // honeypot: bots fill hidden fields

    if (!profile.formEndpoint) {
      const subject = encodeURIComponent(`Portfolio message from ${data.name}`)
      const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`)
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      setStatus('mailto')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(profile.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: data.name, email: data.email, message: data.message, _replyto: data.email }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  const field =
    'peer w-full border-0 border-b-2 border-ink/40 bg-transparent px-0 pb-2 pt-8 text-xl text-bone outline-none transition-colors focus:border-ink focus-visible:outline-none'
  const label =
    'mono pointer-events-none absolute left-0 top-8 text-bone/70 transition-all duration-300 ease-[var(--ease-expo)] peer-focus:top-0 peer-focus:text-[0.6rem] peer-focus:text-ink peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[0.6rem]'

  if (status === 'sent') {
    return (
      <div className="pop-in mt-12 max-w-[36rem] border-2 border-ink p-6">
        <p className="mono text-ink">Message sent</p>
        <p className="serif-i mt-2 text-3xl">Thanks — I'll get back to you by email.</p>
        <button onClick={() => setStatus('idle')} className="mono mt-5 underline underline-offset-4">Send another</button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} data-reveal style={{ '--d': '300ms' } as CSSProperties} className="relative mt-12 grid max-w-[40rem] gap-6 sm:grid-cols-2">
      <div className="relative">
        <input id="cf-name" name="name" required autoComplete="name" placeholder=" " className={field} />
        <label htmlFor="cf-name" className={label}>Your name</label>
      </div>
      <div className="relative">
        <input id="cf-email" name="email" type="email" required autoComplete="email" placeholder=" " className={field} />
        <label htmlFor="cf-email" className={label}>Your email</label>
      </div>
      <div className="relative sm:col-span-2">
        <textarea id="cf-msg" name="message" required rows={4} placeholder=" " className={`${field} resize-none leading-snug`} />
        <label htmlFor="cf-msg" className={label}>What are you building?</label>
      </div>
      {/* honeypot — hidden from people, tempting to bots */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0">
        <input type="text" name="company_site" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-6 sm:col-span-2">
        <Magnetic>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="group relative flex h-32 w-32 items-center justify-center rounded-full bg-ink text-bone transition-transform duration-300 active:scale-95 disabled:opacity-60 sm:h-36 sm:w-36"
          >
            <span className="absolute inset-0 scale-0 rounded-full bg-bone transition-transform duration-500 ease-[var(--ease-expo)] group-hover:scale-100" />
            <span className="relative flex flex-col items-center gap-1 transition-colors duration-300 group-hover:text-ink">
              <span className="serif-i text-3xl leading-none">{status === 'sending' ? 'Sending' : 'Send'}</span>
              <ArrowUpRight size={20} className="transition-transform duration-500 ease-[var(--ease-expo)] group-hover:rotate-45" />
            </span>
          </button>
        </Magnetic>
        <p className="mono max-w-[26ch] normal-case tracking-normal text-bone/80" aria-live="polite">
          {status === 'mailto' && 'Your mail app should open with the message ready to send.'}
          {status === 'error' && (
            <>Something went wrong. Email me at <a className="underline" href={`mailto:${profile.email}`}>{profile.email}</a>.</>
          )}
          {status === 'idle' && (profile.formEndpoint ? 'Goes straight to my inbox.' : 'Opens your mail app with the message filled in.')}
        </p>
      </div>
    </form>
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
      <a href={`mailto:${email}`} className="group relative flex min-w-0 flex-1 flex-col overflow-hidden py-5">
        <span aria-hidden className="absolute inset-0 origin-left scale-x-0 bg-ink transition-transform duration-500 ease-[var(--ease-expo)] group-hover:scale-x-100" />
        <span className="mono relative text-ink transition-[color,padding] duration-500 group-hover:pl-4 group-hover:text-bone/60">Email</span>
        <span className="relative truncate text-[clamp(1rem,1.55vw,1.6rem)] leading-tight font-[550] tracking-[-0.03em] transition-[padding] duration-500 group-hover:pl-4">{email}</span>
      </a>
      <button
        onClick={copy}
        className="mono flex w-24 shrink-0 items-center justify-center gap-1.5 border-l border-ink transition-colors hover:bg-ink"
        aria-label={copied ? 'Email copied' : 'Copy email address'}
      >
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

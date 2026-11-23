/** Editorial section marker: ( 01 ) Label ———— aside */
export default function SectionLabel({ n, label, aside, dark = false }: { n: string; label: string; aside?: string; dark?: boolean }) {
  return (
    <div data-reveal className={`mono flex items-center gap-4 ${dark ? 'text-bone/70' : 'text-ink/70'}`}>
      <span className={dark ? 'text-lichen' : 'text-rust'}>({n})</span>
      <span className={dark ? 'text-bone' : 'text-ink'}>{label}</span>
      <span className={`h-px flex-1 ${dark ? 'bg-bone/20' : 'bg-ink/20'}`} />
      {aside && <span className="hidden sm:inline">{aside}</span>}
    </div>
  )
}

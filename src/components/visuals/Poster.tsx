import type { Project } from '../../data/projects'

/** Small static artwork per project — used for the hover preview in the project index. */
function Glyph({ id, fg, accent }: { id: Project['id']; fg: string; accent: string }) {
  switch (id) {
    case 'mella':
      return (
        <g>
          {[70, 58, 50, 44, 40].map((w, i) => (
            <rect key={i} x={20} y={22 + i * 18} width={w * 2.4} height={12} fill={i === 0 ? accent : fg} opacity={i === 0 ? 1 : 0.85 - i * 0.12} />
          ))}
          <path d="M210 40 l30 30 M222 28 l30 30 M216 34 l-34 34" stroke={accent} strokeWidth="9" strokeLinecap="square" />
        </g>
      )
    case 'papertrail':
      return (
        <g>
          <rect x={30} y={14} width={110} height={130} fill={fg} />
          {Array.from({ length: 9 }).map((_, i) => (
            <rect key={i} x={42} y={30 + i * 12} width={i % 4 === 3 ? 50 : 86} height={4} fill="#16302E" opacity={0.35} />
          ))}
          <rect x={40} y={64} width={90} height={10} fill={accent} opacity={0.8} />
          <rect x={40} y={100} width={70} height={10} fill={accent} opacity={0.8} />
          <path d="M150 69 H196 M150 105 H196" stroke={accent} strokeDasharray="3 4" />
          <rect x={198} y={58} width={60} height={22} fill="none" stroke={fg} />
          <rect x={198} y={94} width={60} height={22} fill="none" stroke={fg} />
        </g>
      )
    case 'sms':
      return (
        <g fontFamily="var(--font-mono)" fontSize="9" fill={fg}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i} transform={`translate(${i % 2 ? 110 : 22}, ${18 + i * 21})`}>
              <rect width={140} height={15} fill="none" stroke={i % 2 ? accent : fg} opacity={0.8} />
              <text x={6} y={11} fill={i % 2 ? accent : fg}>{i % 2 ? '✓✓ delivered' : 'POST /v1/messages'}</text>
            </g>
          ))}
        </g>
      )
    case 'pharma':
      return (
        <g>
          {[90, 110, 30, 70, 42, 96, 60].map((h, i) => (
            <rect key={i} x={26 + i * 34} y={140 - h} width={22} height={h} fill={h < 50 ? '#C2361B' : accent} />
          ))}
          <line x1={18} x2={262} y1={90} y2={90} stroke={fg} strokeDasharray="4 4" />
        </g>
      )
    case 'jobs':
      return (
        <g>
          {[0, 1, 2, 3].map((c) => (
            <g key={c} transform={`translate(${20 + c * 62}, 16)`}>
              <rect width={54} height={3} fill={fg} />
              {Array.from({ length: [3, 2, 2, 1][c] }).map((_, r) => (
                <rect key={r} y={12 + r * 34} width={54} height={28} fill="#FBF3DF" stroke={fg} />
              ))}
            </g>
          ))}
        </g>
      )
  }
}

export default function Poster({ p }: { p: Project }) {
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: p.theme.bg, color: p.theme.fg }}>
      <svg viewBox="0 0 280 160" className="absolute inset-x-0 top-3 w-full" aria-hidden>
        <Glyph id={p.id} fg={p.theme.fg} accent={p.theme.accent} />
      </svg>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-3">
        <span className="text-xl font-semibold tracking-tight">{p.title}</span>
        <span className="mono text-[0.6rem] opacity-70">{p.index}</span>
      </div>
    </div>
  )
}

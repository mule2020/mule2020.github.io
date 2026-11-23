import { useState } from 'react'
import { useReducedMotion } from '../hooks'

type Node = { id: string; x: number; y: number; label: string; info: string }

const NODES: Node[] = [
  { id: 'ui', x: 22, y: 100, label: 'UI', info: 'Interface — React, Next.js, Tailwind, Telegram Mini Apps' },
  { id: 'api', x: 120, y: 100, label: 'API', info: 'Services — NestJS, Express, Spring Boot, Lambda' },
  { id: 'cache', x: 120, y: 28, label: 'CACHE', info: 'Redis in front of the hot paths' },
  { id: 'db', x: 228, y: 40, label: 'SQL', info: 'PostgreSQL, mostly. DynamoDB when it fits.' },
  { id: 'llm', x: 228, y: 100, label: 'LLM', info: 'Amazon Bedrock — summaries, embeddings, answers' },
  { id: 'vec', x: 330, y: 100, label: 'VEC', info: 'Vector search for retrieval-augmented generation' },
  { id: 'evt', x: 228, y: 166, label: 'EVT', info: 'EventBridge schedules, delivery workflows' },
  { id: 'out', x: 330, y: 166, label: 'MSG', info: 'SES email, SMS delivery' },
]

const EDGES: [string, string, string][] = [
  ['ui', 'api', 'M22 100 H120'],
  ['api', 'cache', 'M120 100 V28'],
  ['api', 'db', 'M120 100 H172 V40 H228'],
  ['api', 'llm', 'M120 100 H228'],
  ['llm', 'vec', 'M228 100 H330'],
  ['api', 'evt', 'M120 100 H172 V166 H228'],
  ['evt', 'out', 'M228 166 H330'],
]

const DEFAULT = 'Fig. 1 — the usual shape of what I build. Hover a node.'

export default function Schematic() {
  const [hover, setHover] = useState<string | null>(null)
  const reduced = useReducedMotion()
  const info = NODES.find((n) => n.id === hover)?.info ?? DEFAULT

  return (
    <figure className="w-full">
      <svg viewBox="-6 6 352 182" className="block w-full overflow-visible" role="img" aria-label="Diagram of a typical system: UI to API, with cache, SQL database, LLM with vector search, and event-driven messaging.">
        {EDGES.map(([a, b, d]) => {
          const lit = hover === a || hover === b
          return (
            <g key={d}>
              <path d={d} fill="none" stroke="currentColor" strokeOpacity={lit ? 0.9 : 0.22} strokeWidth="1" />
              <path
                d={d}
                fill="none"
                stroke={lit ? 'var(--color-rust)' : 'currentColor'}
                strokeOpacity={lit ? 1 : 0.55}
                strokeWidth="1.4"
                className={reduced ? '' : 'wire-flow'}
                style={{ strokeDasharray: '3 9' }}
              />
            </g>
          )
        })}
        {!reduced &&
          EDGES.map(([, , d], i) => (
            <circle key={'p' + i} r="2.4" fill="var(--color-rust)">
              <animateMotion dur={`${2.2 + (i % 3) * 0.7}s`} begin={`${i * 0.45}s`} repeatCount="indefinite" path={d} />
            </circle>
          ))}
        {NODES.map((n) => {
          const lit = hover === n.id
          return (
            <g
              key={n.id}
              tabIndex={0}
              role="button"
              aria-label={n.info}
              onPointerEnter={() => setHover(n.id)}
              onPointerLeave={() => setHover(null)}
              onFocus={() => setHover(n.id)}
              onBlur={() => setHover(null)}
              className="cursor-crosshair outline-none"
            >
              <rect x={n.x - 14} y={n.y - 14} width="28" height="28" fill="transparent" />
              <rect
                x={n.x - 5}
                y={n.y - 5}
                width="10"
                height="10"
                fill={lit ? 'var(--color-rust)' : 'var(--color-bone)'}
                stroke="currentColor"
                strokeWidth="1.2"
                style={{ transformOrigin: `${n.x}px ${n.y}px`, transform: lit ? 'scale(1.5) rotate(45deg)' : 'none', transition: 'transform .4s var(--ease-expo)' }}
              />
              <text x={n.x + 9} y={n.y - 8} fontSize="8" fontFamily="var(--font-mono)" fill="currentColor" letterSpacing=".06em">
                {n.label}
              </text>
            </g>
          )
        })}
      </svg>
      <figcaption className="mono mt-3 min-h-[2.4em] text-[0.66rem] normal-case tracking-normal text-mute" aria-live="polite">
        {info}
      </figcaption>
    </figure>
  )
}

const ITEMS = [
  'React', 'Next.js', 'TypeScript', 'NestJS', 'Node.js', 'Python', 'Spring Boot', 'PostgreSQL', 'Redis',
  'Amazon Bedrock', 'Lambda', 'DynamoDB', 'S3', 'EventBridge', 'Docker', 'Nginx', 'GitHub Actions',
]

export default function Marquee() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {ITEMS.map((t) => (
        <li key={t} className="mono flex items-center gap-6 pr-6 text-[0.7rem]">
          <span>{t}</span>
          <span className="text-rust">/</span>
        </li>
      ))}
    </ul>
  )
  return (
    <div className="marquee relative z-10 overflow-hidden border-t border-ink bg-ink py-3 text-bone" aria-label="Technologies I work with">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}

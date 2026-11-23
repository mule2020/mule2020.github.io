export interface Role {
  hash: string
  ref: string
  company: string
  title: string
  type: string
  lines: string[]
  touched: string[]
}

/** Most recent first. Dates intentionally omitted here — see the résumé for exact ranges. */
export const experience: Role[] = [
  {
    hash: 'f3a91c2',
    ref: 'HEAD → current',
    company: 'Outlier AI',
    title: 'AI Trainer (Coding)',
    type: 'Freelance',
    lines: [
      'Evaluate and train AI models on real software development tasks',
      'Review generated code for correctness, quality and edge cases',
      'Work across React, Node.js and Python problems',
    ],
    touched: ['React', 'Node.js', 'Python', 'Code review'],
  },
  {
    hash: 'b07e4d8',
    ref: 'previous',
    company: 'Zoom Tech Trading PLC',
    title: 'Software Engineer',
    type: 'Full-time',
    lines: [
      'Built backend services and REST APIs with NestJS, Node.js and PostgreSQL',
      'Built management dashboards in React and Tailwind CSS',
      'Added Redis caching',
      'Automated deployments with Docker, Nginx and GitHub Actions',
    ],
    touched: ['NestJS', 'Node.js', 'PostgreSQL', 'React', 'Tailwind CSS', 'Redis', 'Docker', 'Nginx', 'GitHub Actions'],
  },
  {
    hash: '5c2a6e0',
    ref: 'earlier',
    company: 'Medaf Delivery PLC',
    title: 'Junior Software Engineer',
    type: 'Full-time',
    lines: [
      'Developed REST API endpoints with Node.js and Express',
      'Built reusable React components',
      'Worked on PostgreSQL data and order-processing workflows',
    ],
    touched: ['Node.js', 'Express', 'React', 'PostgreSQL'],
  },
]

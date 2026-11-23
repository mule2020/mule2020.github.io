import type { ProjectId } from './projects'

export interface Skill {
  name: string
  projects: ProjectId[]
  /** Where else it was used — roles or education. */
  also?: string[]
}

export interface Layer {
  id: string
  name: string
  note: string
  skills: Skill[]
}

export const layers: Layer[] = [
  {
    id: 'interface',
    name: 'Interface',
    note: 'What people click',
    skills: [
      { name: 'React', projects: ['mella', 'papertrail', 'pharma'], also: ['Zoom Tech', 'Medaf', 'Outlier AI'] },
      { name: 'Next.js', projects: ['mella'] },
      { name: 'TypeScript', projects: ['papertrail', 'pharma'] },
      { name: 'JavaScript', projects: [], also: ['Zoom Tech', 'Medaf', 'Outlier AI'] },
      { name: 'Tailwind CSS', projects: ['mella'], also: ['Zoom Tech'] },
      { name: 'Telegram Mini Apps', projects: ['mella'] },
    ],
  },
  {
    id: 'services',
    name: 'Services',
    note: 'Where the logic lives',
    skills: [
      { name: 'Node.js', projects: ['sms'], also: ['Zoom Tech', 'Medaf', 'Outlier AI'] },
      { name: 'NestJS', projects: ['mella', 'sms'], also: ['Zoom Tech'] },
      { name: 'Express', projects: [], also: ['Medaf'] },
      { name: 'REST APIs', projects: ['mella', 'sms', 'pharma'], also: ['Zoom Tech', 'Medaf'] },
      { name: 'Python', projects: ['papertrail'], also: ['Outlier AI'] },
      { name: 'Java', projects: ['pharma'] },
      { name: 'Spring Boot', projects: ['pharma'] },
      { name: '.NET', projects: [], also: ['Humber College'] },
      { name: 'Role-based access', projects: ['pharma'] },
    ],
  },
  {
    id: 'data',
    name: 'Data',
    note: 'What remembers things',
    skills: [
      { name: 'PostgreSQL', projects: ['mella', 'sms', 'pharma'], also: ['Zoom Tech', 'Medaf'] },
      { name: 'Redis', projects: ['sms'], also: ['Zoom Tech'] },
      { name: 'DynamoDB', projects: ['papertrail'] },
      { name: 'Vector search', projects: ['papertrail'] },
    ],
  },
  {
    id: 'ai',
    name: 'AI',
    note: 'Models as components',
    skills: [
      { name: 'Amazon Bedrock', projects: ['papertrail'] },
      { name: 'RAG', projects: ['papertrail'] },
      { name: 'Embeddings', projects: ['papertrail'] },
      { name: 'Model evaluation', projects: [], also: ['Outlier AI'] },
    ],
  },
  {
    id: 'cloud',
    name: 'Cloud',
    note: 'Where it runs',
    skills: [
      { name: 'AWS Lambda', projects: ['papertrail'] },
      { name: 'API Gateway', projects: ['papertrail'] },
      { name: 'S3', projects: ['papertrail'] },
      { name: 'Cognito', projects: ['papertrail'] },
      { name: 'EventBridge', projects: ['papertrail'] },
      { name: 'SES', projects: ['papertrail'] },
    ],
  },
  {
    id: 'delivery',
    name: 'Delivery',
    note: 'How it ships',
    skills: [
      { name: 'Docker', projects: ['sms'], also: ['Zoom Tech'] },
      { name: 'Nginx', projects: ['sms'], also: ['Zoom Tech'] },
      { name: 'GitHub Actions', projects: [], also: ['Zoom Tech'] },
      { name: 'Security fundamentals', projects: [], also: ['NACIT (studying)'] },
    ],
  },
]

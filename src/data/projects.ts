export type ProjectId = 'mella' | 'papertrail' | 'sms' | 'pharma' | 'jobs'

export interface Project {
  id: ProjectId
  index: string
  title: string
  kicker: string
  category: string
  summary: string
  /** What the product does, taken from the project brief. */
  features: string[]
  /** How the parts connect — ordered left to right. */
  flow: { label: string; detail: string }[]
  stack: string[]
  theme: { bg: string; fg: string; accent: string; muted: string }
}

export const projects: Project[] = [
  {
    id: 'mella',
    index: '01',
    title: 'Mella',
    kicker: 'Bidding platform',
    category: 'Marketplace',
    summary:
      'A bidding platform that connects customers with sellers through an organized digital marketplace. Customers post what they need, sellers compete with bids, and the whole thing also runs inside Telegram as a Mini App.',
    features: [
      'Marketplace where customers and sellers meet around concrete requests',
      'Bidding flow — sellers place offers, customers compare and pick',
      'Customer dashboard for tracking requests and incoming bids',
      'Telegram Mini App integration, so the marketplace works inside the chat app',
    ],
    flow: [
      { label: 'Next.js web', detail: 'React / Next.js + Tailwind CSS' },
      { label: 'Telegram Mini App', detail: 'Same marketplace, inside Telegram' },
      { label: 'NestJS API', detail: 'Bids, listings, users' },
      { label: 'PostgreSQL', detail: 'Relational data for the marketplace' },
    ],
    stack: ['React', 'Next.js', 'Tailwind CSS', 'NestJS', 'PostgreSQL', 'Telegram Mini Apps'],
    theme: { bg: '#D9461F', fg: '#FFF1E4', accent: '#121110', muted: '#FFD3BC' },
  },
  {
    id: 'papertrail',
    index: '02',
    title: 'PaperTrail AI',
    kicker: 'Document intelligence',
    category: 'AI · RAG',
    summary:
      'Upload a document, get something useful back. PaperTrail summarizes files, answers questions about them using retrieval-augmented generation, pulls out key dates and obligations, and sends reminders before deadlines arrive.',
    features: [
      'Document summarization',
      'Retrieval-augmented generation (RAG) over uploaded files',
      'Embeddings and vector search',
      'Question answering grounded in the document',
      'Key date and obligation extraction',
      'Automated deadline reminders',
    ],
    flow: [
      { label: 'React + TS', detail: 'Upload, read, ask' },
      { label: 'Cognito', detail: 'Sign-in and user pools' },
      { label: 'API Gateway → Lambda', detail: 'Python handlers' },
      { label: 'S3', detail: 'Original documents' },
      { label: 'Amazon Bedrock', detail: 'Embeddings, summaries, answers' },
      { label: 'DynamoDB', detail: 'Metadata, extracted dates' },
      { label: 'EventBridge → SES', detail: 'Scheduled deadline emails' },
    ],
    stack: [
      'React', 'TypeScript', 'Python', 'Amazon Bedrock', 'AWS Lambda', 'API Gateway',
      'Amazon S3', 'Cognito', 'DynamoDB', 'EventBridge', 'SES',
    ],
    theme: { bg: '#16302E', fg: '#ECE7DA', accent: '#E6F05A', muted: '#8FA8A3' },
  },
  {
    id: 'sms',
    index: '03',
    title: 'A2P SMS',
    kicker: 'Enterprise messaging',
    category: 'Backend · Infra',
    summary:
      'A multi-client application-to-person messaging platform. Businesses connect through REST APIs, each client is managed separately, and messages move through delivery workflows behind a Redis cache and an Nginx reverse proxy.',
    features: [
      'REST APIs for sending and tracking messages',
      'Client management for multiple businesses on one platform',
      'SMS delivery workflows',
      'Redis caching on hot paths',
      'Docker-based deployment',
      'Nginx as reverse proxy',
    ],
    flow: [
      { label: 'Client apps', detail: 'Multiple businesses, one API' },
      { label: 'Nginx', detail: 'Reverse proxy' },
      { label: 'NestJS / Node.js', detail: 'REST API + delivery workflow' },
      { label: 'Redis', detail: 'Caching' },
      { label: 'PostgreSQL', detail: 'Clients, messages, status' },
    ],
    stack: ['NestJS', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Nginx'],
    theme: { bg: '#0F0F0E', fg: '#E3E8DA', accent: '#9BE564', muted: '#6B7465' },
  },
  {
    id: 'pharma',
    index: '04',
    title: 'Pharma Inventory',
    kicker: 'Inventory & orders',
    category: 'Enterprise app',
    summary:
      'Inventory and order management for a pharmaceutical operation. Dashboards show stock levels at a glance, orders are tracked through their lifecycle, and role-based access decides who can see and change what.',
    features: [
      'Inventory dashboards',
      'Stock monitoring',
      'Order tracking',
      'Role-based access control',
      'Inventory workflow management',
    ],
    flow: [
      { label: 'React + TS', detail: 'Dashboards and workflows' },
      { label: 'Spring Boot', detail: 'Java API with role checks' },
      { label: 'PostgreSQL', detail: 'Stock, orders, users' },
    ],
    stack: ['React', 'TypeScript', 'Java', 'Spring Boot', 'PostgreSQL'],
    theme: { bg: '#D5DED6', fg: '#121110', accent: '#1F5C56', muted: '#5E6E68' },
  },
  {
    id: 'jobs',
    index: '05',
    title: 'Job Tracker',
    kicker: 'AI job application tracker',
    category: 'Product',
    summary:
      'A practical tool for keeping a job search organized: every application in one place, sorted by where it stands, so nothing slips between "applied" and "heard back".',
    features: [
      'Organize job applications in one place',
      'Track each application through its stages',
    ],
    flow: [],
    stack: [],
    theme: { bg: '#E3A833', fg: '#121110', accent: '#121110', muted: '#7A5A14' },
  },
]

export const projectById = Object.fromEntries(projects.map((p) => [p.id, p])) as Record<ProjectId, Project>

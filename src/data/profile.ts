/**
 * Single source of truth for personal details.
 * Drop your résumé PDF into /public using the filename in `resumeUrl`.
 */
export const profile = {
  name: 'Muluken Bekele',
  first: 'Muluken',
  last: 'Bekele',
  roles: ['Full-Stack Software Developer', 'AI & Cloud Applications'],
  email: 'mulukenbekele121@gmail.com',
  location: '',
  github: 'https://github.com/mule2020',
  githubHandle: 'mule2020',
  resumeUrl: '/Muluken-Bekele-Resume.pdf',
  /**
   * Optional form backend (e.g. a Formspree endpoint like https://formspree.io/f/xxxxxxx).
   * When empty, the contact form opens the visitor's mail app with the message pre-filled.
   */
  formEndpoint: '',
}

export const certifications = [
  { short: 'AI', title: 'AWS Certified AI Practitioner', ring: 'AWS CERTIFIED · AI PRACTITIONER · ' },
  { short: 'CLOUD', title: 'AWS Certified Cloud Practitioner', ring: 'AWS CERTIFIED · CLOUD PRACTITIONER · ' },
]

export const education = [
  {
    code: 'AU',
    school: 'Andhra University',
    award: 'Bachelor of Science in Computer Science',
    note: 'Where the fundamentals came from — algorithms, data structures, operating systems.',
    status: 'completed',
  },
  {
    code: 'HC',
    school: 'Humber College',
    award: 'Full Stack .NET Cloud Developer Program',
    note: 'Full-stack web development with a cloud deployment focus.',
    status: 'completed',
  },
  {
    code: 'NA',
    school: 'North American College of Information Technology',
    award: 'Cybersecurity Diploma',
    note: 'Currently studying. Making the systems I build harder to break.',
    status: 'in progress',
  },
] as const

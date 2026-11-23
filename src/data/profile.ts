/**
 * Single source of truth for personal details.
 * Fill in `email` (and optionally `location`) from your résumé — empty values are hidden in the UI.
 * Drop your résumé PDF into /public using the filename in `resumeUrl`.
 */
export const profile = {
  name: 'Muluken Bekele',
  first: 'Muluken',
  last: 'Bekele',
  roles: ['Full-Stack Software Developer', 'AI & Cloud Applications'],
  email: '',
  location: '',
  github: 'https://github.com/mule2020',
  githubHandle: 'mule2020',
  linkedin: 'https://linkedin.com/in/mulle-g',
  linkedinHandle: 'mulle-g',
  resumeUrl: '/Muluken-Bekele-Resume.pdf',
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

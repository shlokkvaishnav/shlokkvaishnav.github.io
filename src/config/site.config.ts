/**
 * Site Configuration
 * Single source of truth for personal information, metadata, and site settings
 */

export const siteConfig = {
  // Personal Information
  personal: {
    name: 'Shlok V Vaishnav',
    firstName: 'Shlok',
    lastName: 'Vaishnav',
    email: 'shlok9640@gmail.com',
    phone: '+91 7984739443', // Add your phone number
    location: 'India',
    tagline: 'Full Stack Developer | UI/UX Enthusiast | Problem Solver',
    bio: 'I build exceptional digital experiences that blend beautiful design with powerful functionality.',
    roles: ['Full Stack Developer', 'UI/UX Enthusiast', 'Problem Solver'],
    availability: {
      isAvailable: true,
      message: 'Available for new opportunities'
    }
  },

  // Social Links
  social: {
    github: 'https://github.com/shlokkvaishnav',
    linkedin: 'https://linkedin.com/in/shlok-vaishnav',
    twitter: 'https://twitter.com/shlokkvaishnav', // Update if you have Twitter
    email: 'mailto:shlok9640@gmail.com',
    resume: '/resume.pdf' // Add your resume PDF to public folder
  },

  // SEO & Metadata
  metadata: {
    title: 'Shlok V Vaishnav - Full Stack Developer',
    description: 'Portfolio of Shlok V Vaishnav - Full Stack Developer specializing in modern web technologies, UI/UX design, and scalable applications.',
    keywords: ['Full Stack Developer', 'Web Developer', 'React', 'Next.js', 'TypeScript', 'UI/UX', 'Shlok Vaishnav'],
    author: 'Shlok V Vaishnav',
    siteUrl: 'https://shlokkvaishnav.com', // Update with your actual domain
    ogImage: '/og-image.jpg', // Add OG image to public folder
    twitterHandle: '@shlokkvaishnav' // Update if you have Twitter
  },

  // Navigation
  navigation: {
    main: [
      { href: '/', label: 'Home' },
      { href: '/#projects', label: 'Projects' },
      { href: '/#about', label: 'About' },
      { href: '/#experience', label: 'Experience' },
      { href: '/#contact', label: 'Contact' }
    ],
    footer: [
      { href: '/#projects', label: 'Projects' },
      { href: '/#about', label: 'About' },
      { href: '/#experience', label: 'Experience' },
      { href: '/#contact', label: 'Contact' }
    ]
  }
} as const

export type SiteConfig = typeof siteConfig

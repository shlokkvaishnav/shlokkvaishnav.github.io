'use client'

import { motion } from 'framer-motion'

interface AboutData {
  bio: string[]
  availability: boolean
  skills: {
    category: string
    items: string[]
  }[]
}

const aboutData: AboutData = {
  bio: [
    "I'm a passionate developer with X years of experience building web applications that solve real problems and delight users. My journey in tech has taken me from crafting pixel-perfect interfaces to architecting scalable backend systems.",
    "My approach combines clean code, user-centric design, and modern best practices. I believe in building products that are not only technically sound but also accessible and performant.",
    "When I'm not coding, you'll find me exploring new technologies, contributing to open source projects, or sharing knowledge with the developer community."
  ],
  availability: true,
  skills: [
    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
    { category: 'Backend', items: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB'] },
    { category: 'Tools', items: ['Git', 'Docker', 'Figma', 'VS Code'] }
  ]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 }
  }
}

export function About() {
  return (
    <section id="about" className="py-16 md:py-24 lg:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-text mb-6">
              About Me
            </h2>

            <div className="space-y-6 text-text-secondary font-body text-base md:text-lg leading-relaxed mb-8">
              {aboutData.bio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Availability Badge */}
            {aboutData.availability && (
              <div className="mb-8">
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-accent/10 text-accent rounded-full text-sm font-medium">
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                  Available for new opportunities
                </span>
              </div>
            )}

            {/* Skills Section */}
            <div>
              <h3 className="font-display text-xl md:text-2xl font-semibold text-text mb-6">
                Skills & Technologies
              </h3>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 md:grid-cols-3 gap-6"
              >
                {aboutData.skills.map((skillCategory) => (
                  <motion.div
                    key={skillCategory.category}
                    variants={itemVariants}
                  >
                    <h4 className="font-display text-base font-semibold text-text mb-3">
                      {skillCategory.category}
                    </h4>
                    <ul className="space-y-2">
                      {skillCategory.items.map((item) => (
                        <li
                          key={item}
                          className="bg-muted text-text px-3 py-2 rounded-sm text-sm font-body"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="order-first md:order-last"
          >
            <div className="aspect-square rounded-lg overflow-hidden shadow-md bg-muted">
              <div className="w-full h-full flex items-center justify-center text-text-secondary">
                {/* Placeholder for image */}
                <svg
                  className="w-32 h-32"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

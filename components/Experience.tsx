'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface Experience {
  id: string
  company: string
  role: string
  duration: string
  date: string
  description: string
  logo?: string
}

const experiences: Experience[] = [
  {
    id: '1',
    company: 'Tech Innovators Inc.',
    role: 'Senior Full-Stack Developer',
    duration: 'Jan 2023 - Present',
    date: '2023',
    description: 'Led development of key features for a SaaS platform serving 10k+ users. Architected scalable microservices using Node.js and TypeScript. Mentored junior developers and established code review practices that improved code quality by 40%.'
  },
  {
    id: '2',
    company: 'Digital Solutions Co.',
    role: 'Full-Stack Developer',
    duration: 'Jun 2021 - Dec 2022',
    date: '2021',
    description: 'Built responsive web applications using React and Next.js. Implemented RESTful APIs and integrated third-party services. Collaborated with design team to create pixel-perfect implementations of Figma designs.'
  },
  {
    id: '3',
    company: 'Startup Labs',
    role: 'Frontend Developer',
    duration: 'Mar 2020 - May 2021',
    date: '2020',
    description: 'Developed user interfaces for early-stage products using React and TypeScript. Optimized application performance resulting in 60% faster load times. Participated in agile ceremonies and contributed to product roadmap discussions.'
  },
  {
    id: '4',
    company: 'Web Agency',
    role: 'Junior Developer',
    duration: 'Aug 2018 - Feb 2020',
    date: '2018',
    description: 'Created custom WordPress themes and plugins for client projects. Wrote clean, maintainable code following established style guides. Gained experience in client communication and project estimation.'
  }
]

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="experience" className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text mb-4">
            Experience
          </h2>
          <p className="font-body text-base md:text-lg text-text-secondary max-w-2xl mx-auto">
            My professional journey building products that matter.
          </p>
        </div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Timeline Line - Desktop: center, Mobile: left */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-muted">
            <motion.div
              style={{ height }}
              className="w-full bg-accent origin-top"
            />
          </div>

          {/* Experience Items */}
          <div className="space-y-8 md:space-y-12">
            {experiences.map((exp, index) => (
              <motion.article
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  ease: 'easeOut'
                }}
                className={`relative mb-8 md:mb-12 ${
                  index % 2 === 0 ? 'md:ml-auto md:w-[calc(50%-2rem)]' : 'md:w-[calc(50%-2rem)]'
                }`}
              >
                {/* Date Badge */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 md:-ml-[50%]">
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      ease: 'easeOut',
                      type: 'spring',
                      stiffness: 200
                    }}
                    className="flex items-center justify-center w-16 h-16 md:w-12 md:h-12 bg-accent text-white rounded-full font-display font-semibold text-sm shadow-md"
                  >
                    {exp.date}
                  </motion.span>
                </div>

                {/* Content Card */}
                <div className="ml-24 md:ml-0 bg-surface border border-muted rounded-md p-6 md:p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <h3 className="font-display text-xl font-semibold text-text mb-2">
                    {exp.company}
                  </h3>
                  <h4 className="font-body text-base text-accent mb-1">
                    {exp.role}
                  </h4>
                  <p className="font-body text-sm text-text-secondary mb-4">
                    {exp.duration}
                  </p>
                  <p className="font-body text-sm text-text-secondary leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

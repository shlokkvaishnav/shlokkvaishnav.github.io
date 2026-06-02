'use client'

import { motion } from 'framer-motion'
import { siteConfig, contentConfig } from '@/config'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.4
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
  const skills = contentConfig.skills

  return (
    <section id="about" className="py-16 md:py-24 lg:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-6">
              About Me
            </h2>

            <div className="space-y-6 text-text-secondary font-body text-base md:text-lg leading-relaxed">
              <p>
                I&apos;m a full-stack developer with a passion for building beautiful,
                accessible web experiences. With {new Date().getFullYear() - 2020}+ years in the industry, I&apos;ve worked
                on everything from early-stage startups to enterprise applications.
              </p>
              <p>
                My approach combines technical expertise with a keen eye for design.
                I believe the best software is both powerful and delightful to use.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll find me contributing to open source,
                writing technical articles, or exploring new web technologies.
              </p>
            </div>

            {/* Skills */}
            <div className="mt-12">
              <h3 className="font-display text-xl md:text-2xl font-semibold text-text mb-6">
                Skills & Technologies
              </h3>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {Object.entries(skills).slice(0, 3).map(([category, items], index) => (
                  <motion.div
                    key={category}
                    variants={itemVariants}
                  >
                    <h4 className="font-display text-base font-semibold text-text mb-3 capitalize">
                      {category}
                    </h4>
                    <ul className="space-y-2 text-text-secondary font-body text-sm">
                      {items.slice(0, 5).map((skill) => (
                        <li key={skill.name}>{skill.name}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
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
                  role="presentation"
                  aria-hidden="true"
                >
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-accent/10 text-accent rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                {siteConfig.personal.availability.message}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

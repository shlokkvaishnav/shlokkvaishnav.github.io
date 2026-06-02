'use client'

import { motion } from 'framer-motion'
import { contentConfig } from '@/config'

export function Experience() {
  const experiences = contentConfig.experience

  return (
    <section id="experience" className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-4">
            Experience
          </h2>
        </div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.article
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-surface border border-muted rounded-md p-6 shadow-sm"
            >
              <h3 className="font-display text-xl font-semibold text-text mb-1">{exp.role}</h3>
              <h4 className="font-display text-lg font-medium text-accent">{exp.company}</h4>
              <p className="text-sm text-text-secondary mb-4">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
              <ul className="space-y-2">
                {exp.responsibilities.map((item, i) => (
                  <li key={i} className="text-sm text-text-secondary flex"><span className="text-accent mr-2">•</span>{item}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

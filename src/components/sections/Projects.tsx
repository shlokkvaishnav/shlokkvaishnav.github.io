'use client'

import { motion, type Variants } from 'framer-motion'
import Image from 'next/image'
import { contentConfig } from '@/config'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

export function Projects() {
  // Get projects from config, filter for featured if needed
  const projects = contentConfig.projects

  return (
    <section id="projects" className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-4">
            Featured Projects
          </h2>
          <p className="font-body text-base md:text-lg text-text-secondary max-w-2xl mx-auto">
            A selection of projects showcasing my skills in full-stack development and UI/UX design.
          </p>
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {projects.map((project) => (
            <motion.article
              key={project.id}
              variants={itemVariants}
              className={`group bg-surface border border-muted rounded-md overflow-hidden hover:shadow-hover hover:-translate-y-1 transition-all duration-300 ${
                project.featured ? 'md:col-span-2' : ''
              }`}
            >
              {/* Image + Overlay */}
              <div className="relative aspect-video overflow-hidden bg-muted">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-accent/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 pointer-events-none">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pointer-events-auto px-6 py-2 bg-white text-accent rounded-base font-body font-medium hover:bg-gray-100 transition-colors"
                    >
                      Live Site
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pointer-events-auto px-6 py-2 bg-white/10 text-white border border-white rounded-base font-body font-medium hover:bg-white/20 transition-colors"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="font-display text-xl md:text-2xl font-semibold text-text mb-2 group-hover:text-accent transition-colors duration-150">
                  {project.title}
                </h3>
                <p className="font-body text-sm md:text-base text-text-secondary line-clamp-2 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-muted text-text-secondary text-xs font-body rounded-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

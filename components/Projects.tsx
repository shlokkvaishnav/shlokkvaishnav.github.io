'use client'

import { motion, type Variants } from 'framer-motion'

interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
}

const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce application built with Next.js, featuring real-time inventory management, Stripe payment integration, and a responsive shopping experience.',
    image: '/placeholder-project.jpg',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'PostgreSQL'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/username/project',
    featured: true
  },
  {
    id: '2',
    title: 'Task Management Dashboard',
    description: 'Collaborative project management tool with drag-and-drop functionality, real-time updates, and team collaboration features.',
    image: '/placeholder-project.jpg',
    tags: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Socket.io'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/username/project'
  },
  {
    id: '3',
    title: 'Weather Forecast App',
    description: 'Clean and intuitive weather application with location-based forecasts, interactive maps, and detailed weather analytics.',
    image: '/placeholder-project.jpg',
    tags: ['React', 'TypeScript', 'Weather API', 'Tailwind CSS'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/username/project'
  },
  {
    id: '4',
    title: 'Portfolio CMS',
    description: 'Content management system designed for developers and designers to showcase their work with an intuitive admin panel.',
    image: '/placeholder-project.jpg',
    tags: ['Next.js', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/username/project'
  },
  {
    id: '5',
    title: 'AI Content Generator',
    description: 'AI-powered content generation tool leveraging GPT models for marketing copy, blog posts, and social media content.',
    image: '/placeholder-project.jpg',
    tags: ['Next.js', 'OpenAI API', 'TypeScript', 'Tailwind CSS'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/username/project'
  },
  {
    id: '6',
    title: 'Fitness Tracker',
    description: 'Mobile-responsive fitness tracking application with workout logging, progress charts, and personalized goal setting.',
    image: '/placeholder-project.jpg',
    tags: ['React', 'TypeScript', 'Chart.js', 'Firebase'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/username/project'
  }
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
}

export function Projects() {
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
              className={`group bg-surface border border-muted rounded-md overflow-hidden shadow-sm hover:shadow-hover hover:-translate-y-1 transition-all duration-300 ${
                project.featured ? 'md:col-span-2' : ''
              }`}
            >
              {/* Image + Overlay */}
              <div className="relative aspect-video overflow-hidden bg-muted">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-accent/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 bg-white text-accent rounded-base font-body font-medium hover:bg-gray-100 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Project
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 bg-white/10 text-white border border-white rounded-base font-body font-medium hover:bg-white/20 transition-colors"
                      onClick={(e) => e.stopPropagation()}
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
                <p className="font-body text-sm md:text-base text-text-secondary line-clamp-2 mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-muted text-text-secondary text-xs font-mono rounded-sm"
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

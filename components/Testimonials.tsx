'use client'

import { motion, type Variants } from 'framer-motion'

interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  company?: string
  avatar?: string
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'Working with Shlok was an absolute pleasure. Their attention to detail and problem-solving skills are exceptional.',
    author: 'John Doe',
    role: 'CEO',
    company: 'Tech Innovations'
  },
  {
    id: '2',
    quote: 'Exceptional developer with a rare combination of strong technical skills and excellent communication. Highly recommend for any serious project.',
    author: 'Sarah Johnson',
    role: 'Engineering Manager',
    company: 'Digital Solutions'
  },
  {
    id: '3',
    quote: 'Their code is clean, well-documented, and performant. Made a huge impact on our team\'s velocity and product quality.',
    author: 'Michael Chen',
    role: 'Senior Engineer',
    company: 'InnovateLabs'
  }
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
}

export function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24 lg:py-32 bg-surface">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-4">
            Kind Words
          </h2>
          <p className="font-body text-base md:text-lg text-text-secondary max-w-2xl mx-auto">
            What colleagues and clients have to say about working together.
          </p>
        </div>

        {/* Testimonials Grid - NO CAROUSEL */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.article
              key={testimonial.id}
              variants={itemVariants}
              className="bg-background border border-muted rounded-md p-6 md:p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              {/* Decorative Quote Mark */}
              <div className="text-accent text-6xl opacity-20 font-display leading-none mb-4">
                &ldquo;
              </div>

              {/* Quote - Semantic blockquote */}
              <blockquote className="font-body text-base md:text-lg text-text-secondary italic leading-relaxed mb-6">
                {testimonial.quote}
              </blockquote>

              {/* Author Info */}
              <footer className="flex items-center gap-4 mt-6">
                {testimonial.avatar && (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full border-2 border-muted object-cover"
                    loading="lazy"
                  />
                )}
                <div>
                  <p className="font-body font-semibold text-text">
                    {testimonial.author}
                  </p>
                  <p className="font-body text-sm text-text-secondary">
                    {testimonial.role}
                    {testimonial.company && ` at ${testimonial.company}`}
                  </p>
                </div>
              </footer>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

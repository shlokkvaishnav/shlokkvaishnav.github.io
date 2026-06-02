'use client'

import { motion } from 'framer-motion'
import { contentConfig } from '@/config'

export function Testimonials() {
  const testimonials = contentConfig.testimonials

  return (
    <section id="testimonials" className="py-16 md:py-24 lg:py-32 bg-surface">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-4">
            Kind Words
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background border border-muted rounded-md p-6 shadow-sm"
            >
              <div className="text-accent text-4xl font-serif mb-4">&quot;</div>
              <blockquote className="font-body text-base text-text italic mb-6">{testimonial.content}</blockquote>
              <footer>
                <p className="font-display text-base font-semibold text-text">{testimonial.name}</p>
                <p className="font-body text-sm text-text-secondary">{testimonial.role} at {testimonial.company}</p>
              </footer>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

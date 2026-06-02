'use client'

import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { siteConfig } from '@/config'

export function Hero() {
  const { name, roles, bio } = siteConfig.personal

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-background py-16 md:py-4xl"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Name - Entrance animation delay 0ms */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              ease: 'easeOut',
              delay: 0
            }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text leading-tight mb-6 md:mb-8 lg:mb-10"
          >
            {name}
          </motion.h1>

          {/* Role - Typing animation with delay 0.2s */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              ease: 'easeOut',
              delay: 0.2
            }}
            className="mb-6"
          >
            <TypeAnimation
              sequence={roles.flatMap(role => [role, 2000])}
              wrapper="h2"
              speed={50}
              className="font-body text-lg sm:text-xl md:text-2xl font-medium text-text-secondary"
              repeat={Infinity}
              aria-label="Role"
            />
            {/* Screen reader announcement for role changes */}
            <div role="status" aria-live="polite" className="sr-only">
              Current role: {roles[0]}
            </div>
          </motion.div>

          {/* Bio - Entrance animation delay 0.3s */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              ease: 'easeOut',
              delay: 0.3
            }}
            className="font-body text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl mb-8 md:mb-10 lg:mb-12"
          >
            {bio}
          </motion.p>

          {/* CTAs - Staggered entrance starting at 0.4s */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              ease: 'easeOut',
              delay: 0.4
            }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-xl"
          >
            {/* Primary CTA */}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                ease: 'easeOut',
                delay: 0.4
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#projects"
              className="inline-flex items-center justify-center px-6 sm:px-xl py-3.5 sm:py-4 rounded-base font-body font-semibold text-base bg-accent text-white hover:bg-accent-hover shadow-md hover:shadow-lg transition-all duration-150 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              View My Work
            </motion.a>

            {/* Secondary CTA - Additional 0.05s stagger */}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                ease: 'easeOut',
                delay: 0.45
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#contact"
              className="inline-flex items-center justify-center px-6 sm:px-xl py-3 sm:py-base rounded-base font-body font-medium text-base border-2 border-accent-light text-accent-light hover:bg-accent-light hover:text-white transition-all duration-150 focus-visible:outline-2 focus-visible:outline-accent-light focus-visible:outline-offset-2"
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'

interface HeroProps {
  name?: string
  roles?: string[]
  bio?: string
}

const heroData = {
  name: "Your Name",
  roles: ["Full Stack Developer", "UI/UX Enthusiast", "Problem Solver"],
  bio: "I build exceptional digital experiences that blend beautiful design with powerful functionality."
}

export function Hero({ name = heroData.name, roles = heroData.roles, bio = heroData.bio }: HeroProps = {}) {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-background py-4xl"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Name - Entrance animation delay 0.2s */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: 'easeOut',
              delay: 0.2
            }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-text leading-tight mb-6"
          >
            {name}
          </motion.h1>

          {/* Role - Typing animation with delay 0.4s */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: 'easeOut',
              delay: 0.4
            }}
            className="mb-6"
          >
            <TypeAnimation
              sequence={[
                roles[0],
                2000,
                roles[1],
                2000,
                roles[2],
                2000
              ]}
              wrapper="h2"
              speed={50}
              className="font-body text-xl md:text-2xl font-medium text-text-secondary"
              repeat={Infinity}
            />
          </motion.div>

          {/* Bio - Entrance animation delay 0.6s */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: 'easeOut',
              delay: 0.6
            }}
            className="font-body text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl mb-8"
          >
            {bio}
          </motion.p>

          {/* CTAs - Staggered entrance starting at 0.8s */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: 'easeOut',
              delay: 0.8
            }}
            className="flex flex-col sm:flex-row gap-xl"
          >
            {/* Primary CTA */}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: 'easeOut',
                delay: 0.8
              }}
              href="#projects"
              className="inline-flex items-center justify-center px-xl py-base rounded-base font-body font-medium text-base bg-accent text-white hover:bg-accent/90 shadow-sm hover:shadow-hover transition-all duration-fast"
            >
              View My Work
            </motion.a>

            {/* Secondary CTA - Additional 0.1s stagger */}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: 'easeOut',
                delay: 0.9
              }}
              href="#contact"
              className="inline-flex items-center justify-center px-xl py-base rounded-base font-body font-medium text-base border-2 border-accent text-accent hover:bg-accent hover:text-white transition-all duration-fast"
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

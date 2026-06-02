'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { socialLinks } from '@/components/ui/SocialLinks'
import { siteConfig } from '@/config'

export function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 50% of page
      setShowBackToTop(window.scrollY > window.innerHeight * 0.5)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <footer className="border-t border-muted bg-surface py-6 sm:py-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-base">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-xs sm:text-sm text-text-secondary font-body">
                © {currentYear} {siteConfig.personal.name}. All rights reserved.
              </p>
            </div>

            {/* Echo Navigation (desktop only) */}
            <nav className="hidden md:flex gap-4 lg:gap-lg" aria-label="Footer navigation">
              {siteConfig.navigation.footer.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-secondary hover:text-accent transition-colors duration-fast font-body focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Social Links */}
            <div className="flex gap-3 sm:gap-base items-center">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-accent transition-colors duration-fast focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm"
                  aria-label={`Visit my ${social.name} profile`}
                >
                  <span className="w-5 h-5 sm:w-6 sm:h-6 block">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button (separate from footer DOM) */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              duration: 0.15
            }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-accent text-white rounded-full shadow-lg hover:bg-accent-dark hover:scale-110 transition-all duration-fast focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            aria-label="Scroll back to top"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

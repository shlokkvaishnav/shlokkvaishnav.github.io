'use client'

import { useState, useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { siteConfig } from '@/config'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastScrollYRef = useRef(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Handle hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const heroHeight = window.innerHeight

      // Add background blur and border after 100px scroll
      setScrolled(currentScrollY > 100)

      // Hide/show navbar based on scroll direction, but only after hero section
      if (currentScrollY > heroHeight) {
        if (currentScrollY > lastScrollYRef.current && currentScrollY > 50) {
          // Scrolling down
          setHidden(true)
        } else {
          // Scrolling up
          setHidden(false)
        }
      } else {
        // Always show in hero section
        setHidden(false)
      }

      lastScrollYRef.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent focus:text-white focus:px-4 focus:py-2 focus:rounded-base focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
      >
        Skip to content
      </a>

      <motion.header
        initial={{ y: 0 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-out ${
          scrolled
            ? 'bg-background/80 backdrop-blur-md border-b border-muted'
            : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="flex items-center justify-between h-16">
          {/* Logo/Name */}
          <a
            href="/"
            className="font-display text-xl font-semibold text-text hover:text-accent transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4 rounded-sm"
          >
            {siteConfig.personal.firstName}
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {siteConfig.navigation.main.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative font-body text-base text-text-secondary hover:text-accent transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4 rounded-sm py-2 px-3"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side: Theme Toggle + Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-base hover:bg-muted transition-colors duration-fast focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? (
                  <svg
                    className="w-6 h-6 text-text"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 text-text"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-base hover:bg-muted transition-colors duration-fast focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={`block h-0.5 w-full bg-text transition-all duration-300 ease-out ${
                    mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-text transition-all duration-300 ease-out ${
                    mobileMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-text transition-all duration-300 ease-out ${
                    mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="md:hidden bg-background backdrop-blur-md border-t border-muted"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    delayChildren: 0.1,
                    staggerChildren: 0.08,
                  },
                },
              }}
              className="py-4 space-y-2"
            >
              {siteConfig.navigation.main.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, y: -10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <a
                    href={link.href}
                    onClick={handleLinkClick}
                    className="block px-6 py-4 font-body text-base text-text hover:bg-muted hover:text-accent transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
    </>
  )
}

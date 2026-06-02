'use client'

import { motion } from 'framer-motion'
import { useState, FormEvent } from 'react'

interface ContactForm {
  name: string
  email: string
  message: string
}

type FormState = 'idle' | 'loading' | 'success' | 'error'

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/yourusername',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    )
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/yourusername',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    )
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/yourusername',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    )
  }
]

export default function Contact() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormState('loading')

    // Simulate form submission (replace with actual API call)
    try {
      // await submitForm(formData)
      await new Promise(resolve => setTimeout(resolve, 1500))
      setFormState('success')
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setFormState('idle'), 3000)
    } catch (error) {
      setFormState('error')
      setTimeout(() => setFormState('idle'), 5000)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section id="contact" className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        {/* Large Headline CTA */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
          className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-text mb-6"
        >
          Let&apos;s Work Together
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
          className="font-body text-lg md:text-xl text-text-secondary mb-12"
        >
          Have a project in mind? I&apos;m currently available for new opportunities and collaborations.
        </motion.p>

        {/* Primary Path - Email Link */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.3, ease: 'easeOut', delay: 0.6 }}
          className="mb-12"
        >
          <a
            href="mailto:your.email@example.com"
            className="inline-block font-display text-xl md:text-2xl lg:text-3xl font-medium text-accent hover:underline transition-all duration-150"
          >
            your.email@example.com
          </a>
        </motion.div>

        {/* Optional Secondary Path - Simple Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.6 }}
          className="max-w-xl mx-auto mb-12"
        >
          <p className="font-body text-base text-text-secondary mb-6">
            Or send me a message directly:
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              required
              disabled={formState === 'loading'}
              className="w-full bg-surface border border-muted rounded-base px-4 py-3 text-text font-body transition-colors duration-150 outline-none focus:border-accent disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              required
              disabled={formState === 'loading'}
              className="w-full bg-surface border border-muted rounded-base px-4 py-3 text-text font-body transition-colors duration-150 outline-none focus:border-accent disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Your message..."
              rows={5}
              required
              disabled={formState === 'loading'}
              className="w-full bg-surface border border-muted rounded-base px-4 py-3 text-text font-body transition-colors duration-150 outline-none focus:border-accent resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={formState === 'loading'}
              className="w-full bg-accent text-white px-8 py-4 rounded-base font-body font-semibold text-base hover:bg-accent-dark hover:scale-105 transition-all duration-150 shadow-base hover:shadow-hover disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {formState === 'loading' ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </button>
          </form>

          {/* Success Message */}
          {formState === 'success' && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-accent font-body text-sm"
            >
              ✓ Message sent! I&apos;ll be in touch soon.
            </motion.p>
          )}

          {/* Error Message */}
          {formState === 'error' && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-red-500 font-body text-sm"
            >
              Oops, something went wrong. Please email me directly.
            </motion.p>
          )}
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: 'easeOut', delay: 0.8 }}
          className="flex items-center justify-center gap-6 mt-12"
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
              className="w-12 h-12 flex items-center justify-center text-text-secondary hover:text-accent transition-colors duration-150"
              aria-label={social.name}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 1 }}
          className="flex items-center justify-center gap-2 mt-8"
        >
          <span className="animate-pulse bg-green-500 w-2 h-2 rounded-full"></span>
          <span className="text-text-secondary font-body text-sm">
            Available for new opportunities
          </span>
        </motion.div>
      </div>
    </section>
  )
}

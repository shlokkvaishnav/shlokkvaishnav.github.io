'use client'

import { motion } from 'framer-motion'
import { useState, FormEvent } from 'react'
import { socialLinks } from '@/components/ui/SocialLinks'
import { siteConfig } from '@/config'

interface ContactForm {
  name: string
  email: string
  message: string
}

type FormState = 'idle' | 'loading' | 'success' | 'error'

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
      console.error('Contact form submission failed:', error)
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Large Headline CTA */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
          className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-text mb-6"
        >
          Let&apos;s Work Together
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
          className="font-body text-base sm:text-lg md:text-xl text-text-secondary mb-8 sm:mb-12 px-4"
        >
          Have a project in mind? I&apos;m currently available for new opportunities and collaborations.
        </motion.p>

        {/* Primary Path - Email Link */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.3, ease: 'easeOut', delay: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <a
            href={siteConfig.social.email}
            className="inline-block font-display text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-accent hover:underline transition-all duration-150 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4 rounded-sm break-all px-2"
          >
            {siteConfig.personal.email}
          </a>
        </motion.div>

        {/* Optional Secondary Path - Simple Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.6 }}
          className="max-w-xl mx-auto mb-8 sm:mb-12"
        >
          <p className="font-body text-sm sm:text-base text-text-secondary mb-4 sm:mb-6">
            Or send me a message directly:
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                Name <span className="text-error">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
                disabled={formState === 'loading'}
                aria-label="Your name"
                className="w-full bg-surface border border-muted rounded-base px-4 py-4 text-text font-body text-base transition-colors duration-150 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                Email <span className="text-error">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                required
                disabled={formState === 'loading'}
                inputMode="email"
                autoComplete="email"
                aria-label="Your email address"
                className="w-full bg-surface border border-muted rounded-base px-4 py-4 text-text font-body text-base transition-colors duration-150 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
                Message <span className="text-error">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell me about your project..."
                rows={5}
                required
                disabled={formState === 'loading'}
                aria-label="Your message"
                className="w-full bg-surface border border-muted rounded-base px-4 py-4 text-text font-body text-base transition-colors duration-150 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              disabled={formState === 'loading'}
              className="w-full bg-accent text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-base font-body font-semibold text-sm sm:text-base hover:bg-accent-hover transition-all duration-150 shadow-md hover:shadow-lg active:scale-95 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
            <motion.div
              role="status"
              aria-live="polite"
              aria-atomic="true"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-success/10 border border-success/20 rounded-base"
            >
              <p className="text-success font-body text-sm flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M5 13l4 4L19 7" />
                </svg>
                Message sent successfully! I&apos;ll be in touch soon.
              </p>
            </motion.div>
          )}

          {/* Error Message */}
          {formState === 'error' && (
            <motion.div
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-error/10 border border-error/20 rounded-base"
            >
              <p className="text-error font-body text-sm">
                Something went wrong sending your message. Please try again or email me directly at {siteConfig.personal.email}
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: 'easeOut', delay: 0.8 }}
          className="flex items-center justify-center gap-4 sm:gap-6 mt-8 sm:mt-12"
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
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-text-secondary hover:text-accent transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm"
              aria-label={`Visit my ${social.name} profile`}
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
          className="flex items-center justify-center gap-2 mt-6 sm:mt-8"
        >
          <span className="animate-pulse bg-green-500 w-2 h-2 rounded-full" aria-hidden="true"></span>
          <span className="text-text-secondary font-body text-xs sm:text-sm">
            {siteConfig.personal.availability.message}
          </span>
        </motion.div>
      </div>
    </section>
  )
}

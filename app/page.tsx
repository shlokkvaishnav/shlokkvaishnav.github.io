import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Hero } from '@/components/sections/Hero'
import { Projects } from '@/components/sections/Projects'
import { About } from '@/components/sections/About'
import { Experience } from '@/components/sections/Experience'
import { Testimonials } from '@/components/sections/Testimonials'
import Contact from '@/components/sections/Contact'
import { Footer } from '@/components/layout/Footer'
import { siteConfig } from '@/config'

export const metadata: Metadata = {
  title: siteConfig.metadata.title,
  description: siteConfig.metadata.description,
  keywords: [...siteConfig.metadata.keywords],
  authors: [{ name: siteConfig.metadata.author }],
  openGraph: {
    title: siteConfig.metadata.title,
    description: siteConfig.metadata.description,
    url: siteConfig.metadata.siteUrl,
    siteName: siteConfig.personal.name,
    images: [
      {
        url: siteConfig.metadata.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.personal.name} - Portfolio`
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.metadata.title,
    description: siteConfig.metadata.description,
    creator: siteConfig.metadata.twitterHandle,
    images: [siteConfig.metadata.ogImage]
  }
}

export default function Home() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.personal.name,
    url: siteConfig.metadata.siteUrl,
    jobTitle: siteConfig.personal.roles[0],
    description: siteConfig.personal.bio,
    email: siteConfig.personal.email,
    sameAs: [
      siteConfig.social.github,
      siteConfig.social.linkedin,
      siteConfig.social.twitter
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="relative">
        <Hero />
        <Projects />
        <About />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Projects } from '@/components/Projects'
import { About } from '@/components/About'
import { Experience } from '@/components/Experience'
import { Testimonials } from '@/components/Testimonials'
import Contact from '@/components/Contact'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Your Name - Full Stack Developer',
  description: 'Portfolio showcasing web development projects and experience',
}

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Projects />
      <About />
      <Experience />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}

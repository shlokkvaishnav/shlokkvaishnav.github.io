import { Space_Grotesk, Manrope, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import type { Metadata } from 'next'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'optional'
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-manrope',
  display: 'optional'
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-jetbrains-mono',
  display: 'optional'
})

export const metadata: Metadata = {
  title: 'Shlok V Vaishnav - Full Stack Developer',
  description: 'Developer & creative problem-solver. Building thoughtful digital experiences with code.',
  keywords: ['web developer', 'full stack developer', 'portfolio', 'react', 'next.js', 'typescript', 'software engineer'],
  authors: [{ name: 'Shlok V Vaishnav' }],
  creator: 'Shlok V Vaishnav',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shlok-vaishnav.com',
    title: 'Shlok V Vaishnav - Full Stack Developer',
    description: 'Developer & creative problem-solver. Building thoughtful digital experiences with code.',
    siteName: 'Shlok V Vaishnav Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shlok V Vaishnav - Full Stack Developer',
    description: 'Developer & creative problem-solver. Building thoughtful digital experiences with code.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAFA' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' }
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

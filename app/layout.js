import { Inter, Poppins, Playfair_Display, Quicksand, Varela_Round } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

const playfair = Playfair_Display({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const quicksand = Quicksand({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-quicksand',
  display: 'swap',
})

const varelaRound = Varela_Round({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-varela',
  display: 'swap',
})

export const metadata = {
  title: 'Shlok V Vaishnav',
  description: 'Developer & creative problem-solver. Building thoughtful digital experiences with code.',
  author: 'Shlok V Vaishnav',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} ${playfair.variable} ${quicksand.variable} ${varelaRound.variable}`}>
        {children}
      </body>
    </html>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import './Navbar.css'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <Link href="/" className="nav-logo">
            <span className="logo-name">Shlok V Vaishnav</span>
          </Link>
          <div className="nav-links">
            <Link
              href="/"
              className={`nav-link ${pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link
              href="/projects"
              className={`nav-link ${pathname === '/projects' ? 'active' : ''}`}
            >
              Projects
            </Link>
            <Link
              href="/blogs"
              className={`nav-link ${pathname === '/blogs' ? 'active' : ''}`}
            >
              Blogs
            </Link>
            <Link
              href="/resume"
              className={`nav-link ${pathname === '/resume' ? 'active' : ''}`}
            >
              Resume
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

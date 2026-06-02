import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Number */}
        <h1 className="font-display text-8xl sm:text-9xl font-bold text-accent mb-4">
          404
        </h1>

        {/* Main Message */}
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-text mb-4">
          Page Not Found
        </h2>

        <p className="font-body text-base sm:text-lg text-text-secondary mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        {/* Navigation Options */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-base font-body font-semibold text-base bg-accent text-white hover:bg-accent-hover shadow-md hover:shadow-lg transition-all duration-150 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            Go Home
          </Link>
          <Link
            href="/#projects"
            className="inline-flex items-center justify-center px-6 py-3 rounded-base font-body font-medium text-base border-2 border-accent text-accent hover:bg-accent hover:text-white transition-all duration-150 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            View Projects
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-muted">
          <p className="font-body text-sm text-text-secondary mb-4">
            Quick Links:
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link
              href="/#about"
              className="font-body text-sm text-accent hover:underline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm"
            >
              About
            </Link>
            <Link
              href="/#experience"
              className="font-body text-sm text-accent hover:underline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm"
            >
              Experience
            </Link>
            <Link
              href="/#contact"
              className="font-body text-sm text-accent hover:underline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

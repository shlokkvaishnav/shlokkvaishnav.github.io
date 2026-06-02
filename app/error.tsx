'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to console for debugging
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Error Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-error"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>

        {/* Main Message */}
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-text mb-4">
          Something Went Wrong
        </h1>

        <p className="font-body text-base sm:text-lg text-text-secondary mb-8 leading-relaxed">
          We encountered an unexpected error. Don&apos;t worry, your data is safe.
          Try refreshing the page or go back home.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center px-6 py-3 rounded-base font-body font-semibold text-base bg-accent text-white hover:bg-accent-hover shadow-md hover:shadow-lg transition-all duration-150 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            Try Again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-base font-body font-medium text-base border-2 border-accent text-accent hover:bg-accent hover:text-white transition-all duration-150 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            Go Home
          </a>
        </div>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mt-8 p-4 bg-muted rounded-base text-left">
            <p className="font-mono text-xs text-text-secondary break-all">
              {error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

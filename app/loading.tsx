export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar Skeleton */}
      <div className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-md border-b border-muted">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="shimmer h-6 w-32 rounded bg-muted"></div>
            <div className="hidden md:flex gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="shimmer h-4 w-20 rounded bg-muted"></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Skeleton */}
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="max-w-4xl space-y-6">
            <div className="shimmer h-16 w-3/4 rounded bg-muted"></div>
            <div className="shimmer h-8 w-1/2 rounded bg-muted"></div>
            <div className="space-y-3">
              <div className="shimmer h-4 w-full rounded bg-muted"></div>
              <div className="shimmer h-4 w-5/6 rounded bg-muted"></div>
            </div>
            <div className="flex gap-4 pt-4">
              <div className="shimmer h-12 w-40 rounded-base bg-muted"></div>
              <div className="shimmer h-12 w-40 rounded-base bg-muted"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Skeleton */}
      <div className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="shimmer h-12 w-64 rounded bg-muted mx-auto mb-4"></div>
            <div className="shimmer h-4 w-96 rounded bg-muted mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className={`bg-surface border border-muted rounded-md overflow-hidden ${
                  i === 1 ? 'sm:col-span-2' : ''
                }`}
              >
                <div className="shimmer aspect-video bg-muted"></div>
                <div className="p-6 space-y-4">
                  <div className="shimmer h-6 w-3/4 rounded bg-muted"></div>
                  <div className="space-y-2">
                    <div className="shimmer h-4 w-full rounded bg-muted"></div>
                    <div className="shimmer h-4 w-5/6 rounded bg-muted"></div>
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="shimmer h-6 w-20 rounded-sm bg-muted"></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

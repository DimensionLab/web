export default function Loading() {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-10 w-48 bg-gray-200 rounded animate-pulse mb-8" />
        
        {/* Featured papers skeleton */}
        <div className="mb-12">
          <div className="h-8 w-36 bg-gray-200 rounded animate-pulse mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-4" />
                <div className="space-y-2 mb-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
                  <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {/* Search bar skeleton */}
        <div className="my-8">
          <div className="max-w-2xl mx-auto h-10 bg-gray-200 rounded animate-pulse" />
        </div>
  
        {/* Papers grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="h-6 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
                <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
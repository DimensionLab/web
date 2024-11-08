export default function Loading() {
    return (
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse mb-8" />
        
        <div className="mb-6">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
        </div>
  
        <div className="mb-6">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
  
        <div className="mb-6">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="flex gap-2 flex-wrap">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-6 w-24 bg-gray-200 rounded-full animate-pulse"
              />
            ))}
          </div>
        </div>
  
        <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
      </article>
    );
  }
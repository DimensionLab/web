import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface DatasetHeaderProps {
  dataset: any // TODO: Add proper type
}

export const DatasetHeader = ({ dataset }: DatasetHeaderProps) => (
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-4">
      <h1 className="text-2xl font-medium text-gray-900 dark:text-white/90">
        {dataset.name}
      </h1>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="text-gray-400 dark:text-white/70 dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.05]"
        >
          <Heart className="w-3.5 h-3.5 mr-1.5" />
          {dataset.likes.toLocaleString()}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-gray-400 dark:text-white/70 dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.05]"
        >
          Follow
        </Button>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-500 dark:text-white/50">
        Updated {formatDistanceToNow(dataset.updatedAt)} ago
      </span>
      <Button className="bg-blue-500 hover:bg-blue-600 text-white">
        Use this dataset
      </Button>
    </div>
  </div>
)

import { Eye, Download, Heart } from 'lucide-react'

type StatsCardProps = {
  dataset: any // TODO: Add proper type
}

export const StatsCard = ({ dataset }: StatsCardProps) => (
  <div className="bg-white border border-gray-200/50 rounded-xl p-3
    dark:bg-white/5 dark:border-white/10 max-w-[280px]">
    <h3 className="text-sm font-medium text-gray-900 dark:text-white/90 mb-2">Dataset Statistics</h3>
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 dark:text-white/50 flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5" /> Views
        </span>
        <span className="text-sm font-medium text-gray-900 dark:text-white/90">
          {dataset.views.toLocaleString()}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 dark:text-white/50 flex items-center gap-1.5">
          <Download className="w-3.5 h-3.5" /> Downloads
        </span>
        <span className="text-sm font-medium text-gray-900 dark:text-white/90">
          {dataset.downloads.toLocaleString()}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 dark:text-white/50 flex items-center gap-1.5">
          <Heart className="w-3.5 h-3.5" /> Likes
        </span>
        <span className="text-sm font-medium text-gray-900 dark:text-white/90">
          {dataset.likes.toLocaleString()}
        </span>
      </div>
    </div>
  </div>
)

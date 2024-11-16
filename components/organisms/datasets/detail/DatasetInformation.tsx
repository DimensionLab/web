import { formatFileSize } from '@/lib/utils'

interface DatasetInformationProps {
  dataset: any // TODO: Add proper type
}

export const DatasetInformation = ({ dataset }: DatasetInformationProps) => (
  <div className="mt-5">
    <h3 className="text-sm font-medium text-gray-900 dark:text-white/90 mb-2.5">
      Dataset Information
    </h3>
    <div className="grid grid-cols-2 gap-3">
      <div className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 dark:bg-white/[0.03]">
        <span className="text-xs text-gray-500 dark:text-white/50">Industry</span>
        <span className="text-sm font-medium text-gray-900 dark:text-white/90">{dataset.industry}</span>
      </div>
      <div className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 dark:bg-white/[0.03]">
        <span className="text-xs text-gray-500 dark:text-white/50">Format</span>
        <span className="text-sm font-medium text-gray-900 dark:text-white/90">{dataset.format}</span>
      </div>
      <div className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 dark:bg-white/[0.03]">
        <span className="text-xs text-gray-500 dark:text-white/50">Size</span>
        <span className="text-sm font-medium text-gray-900 dark:text-white/90">{formatFileSize(dataset.size)}</span>
      </div>
      <div className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 dark:bg-white/[0.03]">
        <span className="text-xs text-gray-500 dark:text-white/50">License</span>
        <span className="text-sm font-medium text-gray-900 dark:text-white/90">MIT</span>
      </div>
    </div>
  </div>
)

import { useState } from 'react'
import { TimeSeriesViewer } from './TimeSeriesViewer'
import { TabularDataViewer } from './TabularDataViewer'

type ViewMode = 'table' | 'chart'

export const DataViewer = ({ dataset }: { dataset: any }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('chart')

  return (
    <div className="space-y-4">
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => setViewMode('chart')}
          className={`px-3 py-1 rounded-md ${
            viewMode === 'chart'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          Chart View
        </button>
        <button
          onClick={() => setViewMode('table')}
          className={`px-3 py-1 rounded-md ${
            viewMode === 'table'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          Table View
        </button>
      </div>

      {viewMode === 'chart' ? (
        <TimeSeriesViewer dataset={dataset} />
      ) : (
        <TabularDataViewer dataset={dataset} />
      )}
    </div>
  )
}

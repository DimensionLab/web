import { useEffect, useMemo } from 'react'
import { TabularDataViewer } from './TabularDataViewer'
import { TimeSeriesViewer } from './TimeSeriesViewer'
import { detectDatasetType } from '@/utils/dataset-utils'

export const DatasetViewer = ({ dataset }: { dataset: any }) => {
  const datasetType = useMemo(() => detectDatasetType(dataset), [dataset])
  
  return (
    <div className="w-full space-y-8">
      <div className="h-[calc(100vh-300px)] min-h-[600px]">
        <h2 className="text-lg font-semibold mb-2">Tabular View</h2>
        <TabularDataViewer dataset={dataset} />
      </div>

      <div className="h-[calc(100vh-300px)] min-h-[600px]">
        <h2 className="text-lg font-semibold mb-2">Time Series View</h2>
        <TimeSeriesViewer dataset={dataset} />
      </div>
    </div>
  )
}

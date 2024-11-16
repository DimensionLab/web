import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef, useState, useMemo } from 'react'
import { generateMockData } from './mockData'

const ITEMS_PER_PAGE = 12

export const TabularDataViewer = ({ dataset }: { dataset: any }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const parentRef = useRef(null)
  
  // Use the same mock data as TimeSeriesViewer
  const rows = useMemo(() => {
    const mockData = generateMockData(1000)
    return mockData.map(d => ({
      timestamp: new Date(d.timestamp).toLocaleString(),
      voltage: d.voltage.toFixed(2),
      current: d.current.toFixed(2),
      temperature: d.temperature.toFixed(2)
    }))
  }, [])
  
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentRows = rows.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  const totalPages = Math.ceil(rows.length / ITEMS_PER_PAGE)

  const virtualizer = useVirtualizer({
    count: currentRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 41, // Matches the reference image row height
    overscan: 5,
  })

  return (
    <div className="flex flex-col h-[500px] bg-white dark:bg-[#1C1C1E]">
      <div ref={parentRef} className="flex-1 overflow-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left font-medium border-b 
                text-gray-600 dark:text-gray-400 
                border-gray-200 dark:border-[#2C2C2E]">
                Timestamp
              </th>
              <th className="px-4 py-2 text-left font-medium border-b 
                text-gray-600 dark:text-gray-400 
                border-gray-200 dark:border-[#2C2C2E]">
                Battery Voltage (V)
              </th>
              <th className="px-4 py-2 text-left font-medium border-b 
                text-gray-600 dark:text-gray-400 
                border-gray-200 dark:border-[#2C2C2E]">
                Current (A)
              </th>
              <th className="px-4 py-2 text-left font-medium border-b 
                text-gray-600 dark:text-gray-400 
                border-gray-200 dark:border-[#2C2C2E]">
                Temperature (°C)
              </th>
            </tr>
          </thead>
          <tbody>
            {virtualizer.getVirtualItems().map((virtualRow) => (
              <tr
                key={virtualRow.index}
                className="border-b 
                  border-gray-200 dark:border-[#2C2C2E]
                  text-gray-800 dark:text-gray-200
                  hover:bg-gray-50 dark:hover:bg-[#2C2C2E]"
              >
                <td className="px-4 py-2.5">
                  {currentRows[virtualRow.index].timestamp}
                </td>
                <td className="px-4 py-2.5">
                  {currentRows[virtualRow.index].voltage}
                </td>
                <td className="px-4 py-2.5">
                  {currentRows[virtualRow.index].current}
                </td>
                <td className="px-4 py-2.5">
                  {currentRows[virtualRow.index].temperature}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="flex justify-between items-center px-4 py-2 
        bg-white dark:bg-[#1C1C1E] 
        border-t border-gray-200 dark:border-[#2C2C2E]">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm rounded-md 
            bg-gray-100 dark:bg-[#2C2C2E] 
            text-gray-700 dark:text-gray-300 
            disabled:opacity-50 
            hover:bg-gray-200 dark:hover:bg-[#3C3C3E]"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm rounded-md 
            bg-gray-100 dark:bg-[#2C2C2E] 
            text-gray-700 dark:text-gray-300 
            disabled:opacity-50 
            hover:bg-gray-200 dark:hover:bg-[#3C3C3E]"
        >
          Next
        </button>
      </div>
    </div>
  )
}

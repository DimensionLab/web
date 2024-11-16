"use client"

import { useMemo, useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import { generateMockData } from './mockData'
import { ApexOptions } from 'apexcharts'

// Move the dynamic import outside the component
const ReactApexChart = dynamic(() => import('react-apexcharts'), { 
  ssr: false,
  loading: () => <div className="h-[400px] flex items-center justify-center">Loading chart...</div>
})

export const TimeSeriesViewer = ({ dataset }: { dataset: any }) => {
  const [mounted, setMounted] = useState(false)
  const chartRef = useRef<any>(null)

  useEffect(() => {
    setMounted(true)
    
    // Wait for next frame to ensure DOM is ready
    const timer = requestAnimationFrame(() => {
      if (chartRef.current?.chart) {
        chartRef.current.chart.render()
      }
    })

    return () => {
      cancelAnimationFrame(timer)
      if (chartRef.current?.chart) {
        chartRef.current.chart.destroy()
      }
      setMounted(false)
    }
  }, [])

  const chartData = useMemo(() => {
    const mockData = generateMockData(1000)
    return [{
      name: 'Battery Voltage (V)',
      data: mockData.map(d => ([d.timestamp, Number(d.voltage.toFixed(1))])) // Ensure number format
    }, {
      name: 'Current (A)',
      data: mockData.map(d => ([d.timestamp, Number(d.current.toFixed(1))]))
    }, {
      name: 'Temperature (°C)', 
      data: mockData.map(d => ([d.timestamp, Number(d.temperature.toFixed(1))]))
    }]
  }, [])

  const options = useMemo(() => ({
    chart: {
      type: 'line',
      animations: {
        enabled: false // Disable animations to prevent rendering issues
      },
      zoom: {
        enabled: true,
        type: 'x',
        autoScaleYaxis: true // Enable auto-scaling of y-axis on zoom
      },
      events: {
        beforeZoom: function(ctx: any) {
          // Ensure chart is properly rendered before allowing zoom
          if (!chartRef.current?.chart?.gridRect) {
            return false
          }
          return true
        }
      }
    },
    stroke: {
      curve: 'smooth',
      width: 2,
      colors: ['#FF6B6B', '#FFA94D', '#FFD93D'] // Bright coral red, orange, yellow
    },
    fill: {
      type: 'solid',
      opacity: 0.2,
      colors: ['#FF6B6B', '#FFA94D', '#FFD93D']
    },
    grid: {
      borderColor: 'rgba(255, 255, 255, 0.1)',
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 10
      }
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 0,
      hover: {
        size: 0
      }
    },
    xaxis: {
      type: 'datetime',
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        style: {
          colors: '#9ca3af',
          fontSize: '12px'
        },
        datetimeUTC: false,
        formatter: function(value: string, timestamp?: number) {
          const date = new Date(timestamp || parseInt(value))
          
          // Get the time difference between points to determine format
          const timeSpan = Math.abs(
            chartData[0].data[chartData[0].data.length - 1][0] - 
            chartData[0].data[0][0]
          )
          
          // Less than 24 hours
          if (timeSpan < 24 * 60 * 60 * 1000) {
            return date.toLocaleTimeString([], { 
              hour: '2-digit',
              minute: '2-digit'
            })
          }
          // Less than 7 days
          else if (timeSpan < 7 * 24 * 60 * 60 * 1000) {
            return date.toLocaleDateString([], {
              weekday: 'short',
              hour: '2-digit'
            })
          }
          // Less than 30 days
          else if (timeSpan < 30 * 24 * 60 * 60 * 1000) {
            return date.toLocaleDateString([], {
              month: 'short',
              day: 'numeric'
            })
          }
          // More than 30 days
          return date.toLocaleDateString([], {
            month: 'short',
            year: 'numeric'
          })
        }
      }
    },
    yaxis: [
      {
        title: {
          text: 'Voltage (V)',
          style: {
            color: '#9ca3af'
          }
        },
        labels: {
          style: {
            colors: '#9ca3af',
            fontSize: '12px'
          },
          formatter: function(value: any) {
            return value ? value.toFixed(1) : '0.0'
          }
        }
      },
      {
        opposite: true,
        title: {
          text: 'Current (A)',
          style: {
            color: '#9ca3af'
          }
        },
        labels: {
          style: {
            colors: '#9ca3af',
            fontSize: '12px'
          },
          formatter: function(value: any) {
            return value ? value.toFixed(1) : '0.0'
          }
        }
      },
      {
        opposite: true,
        title: {
          text: 'Temperature (°C)',
          style: {
            color: '#9ca3af'
          }
        },
        labels: {
          style: {
            colors: '#9ca3af',
            fontSize: '12px'
          },
          formatter: function(value: any) {
            return value ? value.toFixed(1) : '0.0'
          }
        }
      }
    ],
    tooltip: {
      theme: 'dark',
      x: {
        formatter: function(timestamp: number) {
          return new Date(timestamp).toLocaleString([], {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })
        }
      },
      y: {
        formatter: function(value: any) {
          return value ? value.toFixed(1) : '0.0'
        }
      },
      style: {
        fontSize: '12px'
      }
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
      floating: false,
      labels: {
        colors: '#9ca3af',
        useSeriesColors: false
      },
      markers: {
        fillColors: ['#FF6B6B', '#FFA94D', '#FFD93D'],  // Keep original 3 colors
        width: 8,      // Perfect circle size
        height: 8,     // Keep it equal to width
        radius: 8,     // Full radius for perfect circle
        offsetX: 0     // No offset needed
      },
      itemMargin: {
        horizontal: 16, // Space between items
        vertical: 8    // Space between rows when wrapping
      },
      containerMargin: {
        left: 16       // Left margin for the entire legend
      },
      fontSize: '14px',
      fontFamily: 'system-ui'
    }
  } as ApexOptions), [chartData])

  if (!mounted) {
    return <div className="h-[400px] flex items-center justify-center">Loading chart...</div>
  }

  return (
    <div className="w-full min-h-[400px]">
      <ReactApexChart 
        ref={chartRef}
        options={options}
        series={chartData}
        height={400}
        width="100%"
        type="line"
        key={mounted ? 'mounted' : 'loading'} // Force remount when mounted changes
      />
    </div>
  )
}

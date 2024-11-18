'use client'

import React, { useState } from 'react'
import { mockDatasets } from '../fake-datasets'
import { notFound } from 'next/navigation'
import { BackButton } from '@/components/organisms/datasets/detail/BackButton'
import { DatasetHeader } from '@/components/organisms/datasets/detail/DatasetHeader'
import { OwnerCard } from '@/components/organisms/datasets/detail/OwnerCard'
import { StatsCard } from '@/components/organisms/datasets/detail/StatsCard'
import { DatasetTabs } from '@/components/organisms/datasets/detail/DatasetTabs'

function DatasetDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('dataset')

  const dataset = mockDatasets.find(d => d.id === parseInt(params.id))
  if (!dataset) return notFound()

  return (
    <main className="w-full min-h-screen mx-auto px-2 sm:px-8 lg:px-32 py-8">
      <BackButton />
      <DatasetHeader dataset={dataset} />

      <div className="max-w-[1400px] mx-auto mt-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <div className="bg-white border border-gray-200/50 rounded-xl p-6
              dark:bg-white/5 dark:border-white/10">
              <DatasetTabs 
                activeTab={activeTab} 
                setActiveTab={setActiveTab}
                dataset={dataset}
              />
            </div>
          </div>

          <div className="space-y-4">
            <OwnerCard owner={dataset.owner} />
            <StatsCard dataset={dataset} />
          </div>
        </div>
      </div>
    </main>
  )
}

export default DatasetDetailPage

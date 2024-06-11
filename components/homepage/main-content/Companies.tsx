import Image from 'next/image'
import React from 'react'

function Companies() {
  return (
    <div className="py-8 lg:py-16 mx-auto max-w-screen-xl px-4">
        <div className="grid grid-cols-2 gap-8 text-gray-500 sm:gap-12 md:grid-cols-3 lg:grid-cols-6 dark:text-gray-400">
            <div className="flex justify-center items-center">
                <Image src="/assets/companies/biomedical-eng-logo.jpg" className="object-cover grayscale opacity-60" alt="Ecocapsule" width={140} height={50} />                      
            </div>
            <div className="flex justify-center items-center">
                <Image src="/assets/companies/ecocapsule-logo.png" className="object-cover grayscale opacity-60" alt="Ecocapsule" width={100} height={50} />                      
            </div>
        </div>
    </div>
  )
}

export default Companies
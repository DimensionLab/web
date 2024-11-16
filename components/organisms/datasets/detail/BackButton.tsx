import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export const BackButton = () => (
  <Link
    href="/datasets"
    className="inline-flex items-center gap-2 text-sm text-gray-500 
      hover:text-gray-700 mb-6 group
      dark:text-white/50 dark:hover:text-white/70"
  >
    <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
    Back to datasets
  </Link>
)

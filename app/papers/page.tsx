import { Suspense } from 'react';
import FeaturedPapers from '@/components/hub/FeaturedPapers';
import PapersGrid from '@/components/hub/PapersGrid';
import PaperFilters from '@/components/hub/PaperFilters';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export const metadata = {
  title: 'Scientific Papers Hub',
  description: 'Discover the latest research papers in machine learning, physics-informed neural networks, and AI-driven engineering.',
};

export default function HubPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8">Scientific Machine Learning & PhysicsML Papers</h1>
      
      <ErrorBoundary>
        <Suspense fallback={
          <div className="h-96 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
          </div>
        }>
          <FeaturedPapers />
        </Suspense>
      </ErrorBoundary>

      <div className="my-8">
        <PaperFilters />
      </div>

      <ErrorBoundary>
        <Suspense fallback={
          <div className="h-96 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
          </div>
        }>
          <PapersGrid />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
'use client';

import { useState } from 'react';
import { BookOpen, X, Loader2 } from 'lucide-react';

interface PdfViewerProps {
  pdfUrl: string;
  title: string;
}

export function PdfViewer({ pdfUrl, title }: PdfViewerProps) {
  const [pdfVisible, setPdfVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <button
        onClick={() => setPdfVisible(!pdfVisible)}
        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500/80 dark:hover:bg-purple-500 px-4 py-2 rounded font-bold text-white transition-all duration-200"
      >
        {pdfVisible ? <X className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />}
        {pdfVisible ? 'Close PDF' : 'Read PDF Here'}
      </button>

      {pdfVisible && (
        <div className="mt-8 w-full h-[800px] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-purple-600 dark:text-purple-400" />
                <p className="text-sm text-gray-600 dark:text-gray-300">Loading PDF...</p>
              </div>
            </div>
          )}
          <iframe
            src={`${pdfUrl}#toolbar=0`}
            className="w-full h-full"
            title={`PDF viewer for ${title}`}
            onLoad={() => setIsLoading(false)}
          />
        </div>
      )}
    </>
  );
} 
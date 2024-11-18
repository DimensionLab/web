'use client';

import { Star } from 'lucide-react';
import { useState, useTransition } from 'react';

interface StarButtonProps {
  paperId: string;
  initialIsStarred: boolean;
  starCount: number;
  onStar: (paperId: string) => Promise<void>;
  onUnstar: (paperId: string) => Promise<void>;
}

export function StarButton({ paperId, initialIsStarred, starCount, onStar, onUnstar }: StarButtonProps) {
  const [isStarred, setIsStarred] = useState(initialIsStarred);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      try {
        if (isStarred) {
          await onUnstar(paperId);
        } else {
          await onStar(paperId);
        }
        setIsStarred(!isStarred);
      } catch (error) {
        console.error('Error toggling star:', error);
      }
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
        isStarred
          ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700 dark:bg-yellow-500/20 dark:hover:bg-yellow-500/30 dark:text-yellow-500'
          : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200'
      }`}
    >
      <Star className={`h-4 w-4 ${isStarred ? 'fill-current' : ''}`} />
      <span>{isStarred ? 'Starred' : 'Star'}</span>
      <span className="text-sm">({starCount})</span>
    </button>
  );
} 
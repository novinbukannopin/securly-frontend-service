'use client';

import { MousePointerClickIcon as MouseClick } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CategoryBadgesProps {
  categories?: string[];
  clicks?: number;
}

export default function CategoryBadges({
  categories,
  clicks,
}: CategoryBadgesProps) {
  return (
    <div className='flex flex-wrap items-center gap-3'>
      {categories?.slice(0, 3)?.map((category, index) => (
        <Badge
          key={index}
          variant='outline'
          className='cursor-pointer border-yellow-200 bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
        >
          {category}
        </Badge>
      ))}
      <Badge
        variant='outline'
        className='flex items-center gap-1.5 border-gray-200 bg-gray-50 hover:bg-gray-100 dark:text-secondary'
      >
        <MouseClick className='h-3 w-3' />
        <span className='text-xs'>{clicks} click</span>
      </Badge>
    </div>
  );
}

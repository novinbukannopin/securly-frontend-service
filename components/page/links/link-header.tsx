'use client';

import {
  BarChart2,
  Clock,
  Filter,
  Grid,
  List,
  ListOrderedIcon as AlphabeticalSort,
  Search,
  Tag,
} from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface LinksHeaderProps {
  onSearchChange: (search: string) => void;
  onFilterChange: (filter: string) => void;
  onDisplayChange: (display: 'grid' | 'list') => void;
  onTagsChange: (tags: string[]) => void;
  availableTags: string[];
  children?: React.ReactNode;
}

export function LinksHeader({
  onSearchChange,
  onFilterChange,
  onDisplayChange,
  onTagsChange,
  availableTags,
  children,
}: LinksHeaderProps) {
  const [activeFilter, setActiveFilter] = useState('recent');
  const [activeDisplay, setActiveDisplay] = useState<'grid' | 'list'>('list');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  const handleDisplayChange = (display: 'grid' | 'list') => {
    setActiveDisplay(display);
    onDisplayChange(display);
  };

  const handleTagToggle = (tag: string) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(updatedTags);
    onTagsChange(updatedTags);
  };

  const getFilterIcon = () => {
    switch (activeFilter) {
      case 'recent':
        return <Clock className='mr-2 h-4 w-4' />;
      case 'clicks':
        return <BarChart2 className='mr-2 h-4 w-4' />;
      case 'alpha':
        return <AlphabeticalSort className='mr-2 h-4 w-4' />;
      default:
        return <Filter className='mr-2 h-4 w-4' />;
    }
  };

  const getFilterText = () => {
    switch (activeFilter) {
      case 'recent':
        return 'Recent';
      case 'clicks':
        return 'Most clicked';
      case 'alpha':
        return 'A-Z';
      default:
        return 'Filter';
    }
  };

  return (
    <div className='flex flex-wrap items-center justify-center gap-2 border-b pb-4 md:flex-nowrap'>
      <div className='flex flex-1 items-center gap-2 md:flex-initial'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              size='sm'
              className='flex flex-1 basis-0 whitespace-nowrap'
            >
              {getFilterIcon()}
              {getFilterText()}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start' className='w-[200px]'>
            <DropdownMenuItem onClick={() => handleFilterChange('recent')}>
              <Clock className='mr-2 h-4 w-4' />
              Recently added
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleFilterChange('clicks')}>
              <BarChart2 className='mr-2 h-4 w-4' />
              Most clicked
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleFilterChange('alpha')}>
              <AlphabeticalSort className='mr-2 h-4 w-4' />
              Alphabetical
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              size='sm'
              className='flex-1 basis-0 whitespace-nowrap md:min-w-fit'
            >
              {activeDisplay === 'list' ? (
                <List className='mr-2 h-4 w-4' />
              ) : (
                <Grid className='mr-2 h-4 w-4' />
              )}
              {activeDisplay === 'list' ? 'List view' : 'Grid view'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start' className='w-[200px]'>
            <DropdownMenuItem onClick={() => handleDisplayChange('grid')}>
              <Grid className='mr-2 h-4 w-4' />
              Grid view
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDisplayChange('list')}>
              <List className='mr-2 h-4 w-4' />
              List view
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              size='sm'
              className='flex-1 basis-0 whitespace-nowrap'
            >
              <Tag className='mr-2 h-4 w-4' />
              Tags {selectedTags.length > 0 && `(${selectedTags.length})`}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start' className='w-[200px]'>
            {availableTags.map((tag) => (
              <DropdownMenuCheckboxItem
                key={tag}
                checked={selectedTags.includes(tag)}
                onCheckedChange={() => handleTagToggle(tag)}
              >
                <Badge
                  variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                  className='mr-2'
                >
                  {tag}
                </Badge>
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className='flex flex-1 flex-wrap items-center gap-2 md:flex-nowrap md:justify-end'>
        <div className='relative w-64 flex-1 md:flex-initial'>
          <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Search...'
            className='pl-8'
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        {children}
      </div>
    </div>
  );
}

'use client';

import LinkCreatorWithModal from '@/components/page/links/create-link';
import { useGetAllLinks } from '@/service/queries/links';
import { LinksHeader } from '@/components/page/links/link-header';
import { LinksList } from '@/components/page/links/link-list';
import React, { useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';

export default function Page() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, error } = useGetAllLinks(page, limit);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('recent');
  const [displayType, setDisplayType] = useState<'grid' | 'list'>('list');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [open, setOpen] = React.useState(false);

  const totalPages = data?.totalPages || 1;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'c' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (!open) {
          setOpen(true);
        }
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open]);

  return (
    <>
      <div className='space-y-4 py-4'>
        <h1 className='text-xl font-semibold'>Links</h1>
        <LinksHeader
          onSearchChange={setSearchQuery}
          onFilterChange={setFilterBy}
          onDisplayChange={setDisplayType}
          availableTags={data?.tags || []}
          onTagsChange={setSelectedTags}
        >
          <LinkCreatorWithModal dialogOpen={open} setDialogOpen={setOpen}>
            <Button className={'flex items-center'}>
              <p className='flex items-center gap-2 text-sm'>
                Create Link{' '}
                <kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
                  <span className='text-xs'>C</span>
                </kbd>
              </p>
            </Button>
          </LinkCreatorWithModal>
        </LinksHeader>
        <LinksList
          links={data?.links || []}
          searchQuery={searchQuery}
          filterBy={filterBy}
          displayType={displayType}
          selectedTags={selectedTags}
        />
        {data?.links?.length === 0 ? (
          <div>No links found</div>
        ) : (
          <div className='flex items-center'>
            <div className={'w-full text-sm'}>
              Showing {data?.links?.length || 0} of {data?.total || 0} items
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(page - 1)}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      onClick={() => handlePageChange(index + 1)}
                      isActive={page === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext onClick={() => handlePageChange(page + 1)} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </>
  );
}

'use client';

import React, { useMemo, useState } from 'react';
import { Link } from '@/types/link';
import LinkCard from '@/components/page/links/link-card';
import LinkCreatorWithModal from '@/components/page/links/create-link';

interface LinksListProps {
  links: Link[];
  searchQuery: string;
  filterBy: string;
  displayType: 'grid' | 'list';
}

export function LinksList({
  links,
  searchQuery,
  filterBy,
  displayType,
}: LinksListProps) {
  const [activeLink, setActiveLink] = useState<Link | null>(null);
  const filteredAndSortedLinks = useMemo(() => {
    let result = links.filter(
      (link) =>
        link.originalUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
        link.shortCode.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    switch (filterBy) {
      case 'clicks':
        return result.sort(
          (a, b) => (Number(b.clicks) || 0) - (Number(a.clicks) || 0),
        );
      case 'alpha':
        return result.sort((a, b) => a.shortCode.localeCompare(b.shortCode));
      case 'recent':
      default:
        return result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
    }
  }, [links, searchQuery, filterBy]);

  const [open, setOpen] = useState(false);

  const handleOpen = (link: Link) => {
    setActiveLink(link);
  };

  const handleClose = () => {
    setActiveLink(null);
  };

  // @ts-ignore
  return (
    <>
      <div
        className={
          displayType === 'grid'
            ? 'grid grid-cols-1 gap-4 md:grid-cols-2'
            : 'flex flex-1 flex-col gap-4'
        }
      >
        {filteredAndSortedLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => handleOpen(link)}
            className='w-full'
            style={{
              all: 'unset',
              cursor: 'pointer',
            }}
          >
            <LinkCard link={link} displayType={displayType} />
          </button>
        ))}
      </div>

      {activeLink && (
        <LinkCreatorWithModal
          dialogOpen={!!activeLink}
          setDialogOpen={handleClose}
          existingData={activeLink}
        ></LinkCreatorWithModal>
      )}
    </>
  );
}

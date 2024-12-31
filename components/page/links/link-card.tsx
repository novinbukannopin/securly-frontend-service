'use client';

import { format } from 'date-fns';
import { Archive, Clock, Copy } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Link } from '@/types/link';
import { BACKEND_URL } from '@/lib/env';
import { toast } from 'sonner';
import React from 'react';
import CategoryBadges from '@/components/custom/badges-card';

interface LinkCardProps {
  link: Link;
  displayType: 'grid' | 'list';
  onClick?: () => void;
}

export default function LinkCard({
  link,
  displayType,
  onClick,
}: LinkCardProps) {
  const isArchivied = link.deletedAt !== null;
  const getDomain = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return domain.replace('www.', '');
    } catch {
      return url;
    }
  };

  const getFaviconUrl = (url: string) => {
    try {
      const domain = new URL(url).origin;
      return `${domain}/favicon.ico`;
    } catch {
      return null;
    }
  };

  const getFallbackLetter = (url: string) => {
    const domain = getDomain(url);
    return domain.charAt(0).toUpperCase();
  };

  const copyShortLink = (shortcode: string) => {
    navigator.clipboard.writeText(`${BACKEND_URL}/${shortcode}`);
    toast.success('Short link copied to clipboard');
  };

  return (
    <div className='relative'>
      <Card
        className={cn(
          'transition-opacity',
          isArchivied && 'opacity-75',
          displayType === 'grid' ? 'h-[120px]' : '',
        )}
      >
        <CardContent className='flex w-full flex-wrap items-center gap-3 p-4'>
          <Avatar className='h-8 w-8 shrink-0'>
            <AvatarImage
              src={getFaviconUrl(link.originalUrl) || ''}
              alt={getDomain(link.originalUrl)}
            />
            <AvatarFallback className='text-xs'>
              {getFallbackLetter(link.originalUrl)}
            </AvatarFallback>
          </Avatar>

          <div className='w-full flex-1 space-y-1 sm:w-auto'>
            <div className='flex flex-wrap items-center'>
              <span className='text-sm text-muted-foreground'>
                {BACKEND_URL}/
              </span>
              <span className='mr-2 line-clamp-1 font-medium'>
                {link.shortCode}
              </span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-6 w-6 opacity-0 group-hover:opacity-100'
                      onClick={() => copyShortLink(link.shortCode)}
                    >
                      <Copy className='h-3 w-3' />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Copy short link</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className='flex flex-wrap items-center gap-2'>
              <a
                href={link.originalUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='line-clamp-1 text-sm text-muted-foreground hover:text-foreground'
              >
                {getDomain(link.originalUrl)}
              </a>
              <span className='text-sm text-muted-foreground'>•</span>
              <span className='text-xs text-muted-foreground'>
                {format(new Date(link.createdAt), 'MMM d, yyyy')}
              </span>
            </div>
          </div>

          <div className='flex flex-wrap items-center gap-2 sm:flex-nowrap'>
            <CategoryBadges
              categories={link.TagLink.map((tagLink) => tagLink.tag.name)}
              clicks={link._count.Click}
            />
          </div>
        </CardContent>
      </Card>

      {isArchivied && (
        <>
          <div
            className='pointer-events-none absolute inset-0 overflow-hidden'
            aria-hidden='true'
          >
            <div className='absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#fbbf24_10px,#fbbf24_20px)] opacity-20' />
          </div>

          <Badge
            variant='secondary'
            className={cn(
              'absolute -right-2 -top-2 shadow-md',
              isArchivied
                ? 'bg-yellow-100 text-yellow-900 hover:bg-yellow-100'
                : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-100',
            )}
          >
            {isArchivied ? (
              <Clock className='mr-1 h-3 w-3' />
            ) : (
              <Archive className='mr-1 h-3 w-3' />
            )}
            {isArchivied ? 'Archived' : 'Expired'}
          </Badge>
        </>
      )}
    </div>
  );
}

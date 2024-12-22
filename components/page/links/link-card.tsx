'use client';

import { format } from 'date-fns';
import { Copy, ExternalLink, MoreVertical, QrCode } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Link } from '@/types/link';
import { BACKEND_URL } from '@/lib/env';
import { toast } from 'sonner';
import * as React from 'react';
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
    <Card
      className={`group relative w-full cursor-pointer ${
        displayType === 'grid' ? 'h-[120px]' : ''
      }`}
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
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon' className='h-8 w-8'>
                  <MoreVertical className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-48'>
                <DialogTrigger asChild>
                  <DropdownMenuItem>
                    <QrCode className='mr-2 h-4 w-4' />
                    QR Code
                  </DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuItem>
                  <ExternalLink className='mr-2 h-4 w-4' />
                  Open
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='text-destructive'>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DialogContent className='sm:max-w-md'>
              <DialogHeader>
                <DialogTitle>Link Details</DialogTitle>
              </DialogHeader>
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <Label>Destination URL</Label>
                  <Input value={link.originalUrl} readOnly />
                </div>

                <div className='space-y-2'>
                  <Label>Short Link</Label>
                  <div className='flex gap-2'>
                    <Input value={`dub.sh/${link.shortCode}`} readOnly />
                    <Button
                      variant='secondary'
                      size='icon'
                      onClick={() =>
                        navigator.clipboard.writeText(
                          `dub.sh/${link.shortCode}`,
                        )
                      }
                    >
                      <Copy className='h-4 w-4' />
                    </Button>
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label>QR Code</Label>
                  <div className='rounded-lg border bg-muted/50 p-6'>
                    <div className='aspect-square w-full max-w-sm rounded-lg bg-white p-4'>
                      <img
                        src={link.qrcode}
                        alt='QR Code'
                        className='h-full w-full'
                      />
                    </div>
                  </div>
                </div>

                {link.TagLink && link.TagLink.length > 0 && (
                  <div className='space-y-2'>
                    <Label>Tags</Label>
                    <div className='flex flex-wrap gap-1'>
                      {link.TagLink.map((tagLink, index) => (
                        <Badge key={index} variant='secondary'>
                          {tagLink.tag.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}

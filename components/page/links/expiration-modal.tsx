'use client';

import * as React from 'react';
import { Info, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

export function ExpirationModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' size='icon'>
          <Timer className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            Link Expiration
            <Badge variant='secondary' className='rounded-sm font-medium'>
              PRO
            </Badge>
          </DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid gap-2'>
            <Label>
              Date and Time
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className='ml-2 inline h-4 w-4' />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Set when this link should expire</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input placeholder='Tomorrow at 5pm or in 2 hours' />
          </div>
          <div className='grid gap-2'>
            <Label>
              Expiration URL
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className='ml-2 inline h-4 w-4' />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Where to redirect after link expires</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input placeholder='https://example.com' />
            <p className='text-sm text-muted-foreground'>
              Set a default expiration URL for your domain
            </p>
          </div>
        </div>
        <div className='flex justify-end gap-2'>
          <Button variant='outline'>Cancel</Button>
          <Button>Add expiration</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

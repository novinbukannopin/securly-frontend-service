'use client';

import * as React from 'react';
import { useState } from 'react';
import { Copy, Globe, Info } from 'lucide-react';
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
import { useFormContext } from 'react-hook-form';
import { DOMAIN } from '@/lib/env';
import { buildUTMQueryString } from '@/lib/utils';
import { toast } from 'sonner';

type UTM = {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
};

export function UTMBuilder({
  data,
  shortCode,
}: {
  data?: UTM;
  shortCode?: string;
}) {
  const { setValue, watch } = useFormContext();
  const utmData = watch('utm');

  const [open, setOpen] = useState(false);

  const handleSave = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
    Object.keys(utmData).forEach((field) => {
      setValue(`utm.${field}`, '');
    });
  };

  const copyShortLink = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Short link copied to clipboard');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' size='icon'>
          <Globe className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='h-auto sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            UTM Builder
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className='h-4 w-4' />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Build UTM parameters for your link</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          {['source', 'medium', 'campaign', 'term', 'content'].map((field) => (
            <div key={field} className={'grid gap-2 sm:max-w-[377px]'}>
              <Label htmlFor={`utm.${field}`}>{field}</Label>
              <Input
                id={`utm.${field}`}
                placeholder={`Enter ${field}`}
                onChange={(e) => setValue(`utm.${field}`, e.target.value)}
                defaultValue={data ? data[field as keyof UTM] || '' : ''}
              />
            </div>
          ))}
          <div className='h-full rounded-lg border bg-muted/50 p-4 sm:max-w-[377px]'>
            <h3 className='text-sm font-medium'>Link Preview</h3>
            <div className='mt-4'>
              <div className='rounded'>
                <h5 className={'break-words text-sm'}>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-6 w-6 opacity-0 group-hover:opacity-100'
                    onClick={() =>
                      copyShortLink(
                        `${
                          DOMAIN +
                          (watch('shortlink') || shortCode) +
                          buildUTMQueryString(utmData || data)
                        }}`,
                      )
                    }
                  >
                    <Copy className='h-3 w-3' />
                  </Button>
                  <p>
                    {DOMAIN +
                      (watch('shortlink') || shortCode) +
                      buildUTMQueryString(utmData || data)}
                  </p>
                </h5>
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-end gap-2'>
          <Button variant='outline' onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

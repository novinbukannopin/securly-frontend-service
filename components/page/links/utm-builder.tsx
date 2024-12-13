'use client';

import * as React from 'react';
import { useState } from 'react';
import { Globe, Info } from 'lucide-react';
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

export function UTMBuilder() {
  const { setValue, watch } = useFormContext();
  const utmData = watch('utm') || {
    source: '',
    medium: '',
    campaign: '',
    term: '',
    content: '',
  };

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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' size='icon'>
          <Globe className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
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
            <div key={field} className={'grid gap-2'}>
              <Label htmlFor={`utm.${field}`}>{field}</Label>
              <Input
                id={`utm.${field}`}
                placeholder={`Enter ${field}`}
                onChange={(e) => setValue(`utm.${field}`, e.target.value)}
                value={utmData[field]}
              />
            </div>
          ))}
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

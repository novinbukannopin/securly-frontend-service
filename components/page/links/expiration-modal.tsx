'use client';

import * as React from 'react';
import { useState } from 'react';
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { DateTimePicker } from '@/components/custom/date-time-picker';
import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export function ExpirationModal() {
  const {
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext();
  const expirationData = watch('expiration') || {
    datetime: '',
    url: '',
  };

  const [open, setOpen] = useState(false);

  const [localExpirationData, setLocalExpirationData] = React.useState<{
    datetime?: string;
    url?: string;
  }>(expirationData);

  const handleInputChange = (
    field: keyof typeof localExpirationData,
    value: string,
  ) => {
    setLocalExpirationData({ ...localExpirationData, [field]: value });
  };

  const handleSave = async () => {
    setValue('expiration', localExpirationData);
    const isValid = await trigger('expiration');
    if (isValid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const handleCancel = () => {
    setLocalExpirationData(expirationData);
    setOpen(false);
    Object.keys(expirationData).forEach((field) => {
      setValue(`expiration.${field}`, '');
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            <FormItem>
              <FormLabel>
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
              </FormLabel>
              <FormControl>
                <DateTimePicker
                  value={localExpirationData.datetime}
                  onChange={(value) => handleInputChange('datetime', value)}
                />
              </FormControl>
            </FormItem>
          </div>
          <div className='grid gap-2'>
            <FormItem>
              <FormLabel>
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
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='https://example.com'
                  value={localExpirationData.url}
                  onChange={(e) => handleInputChange('url', e.target.value)}
                />
              </FormControl>
              {errors.expiration && 'url' in errors.expiration && (
                <FormMessage>
                  {(errors.expiration as any).url.message}
                </FormMessage>
              )}
            </FormItem>
            <p className='text-sm text-muted-foreground'>
              Set a default expiration URL for your domain
            </p>
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

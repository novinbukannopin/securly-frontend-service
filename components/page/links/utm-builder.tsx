'use client';

import * as React from 'react';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function UTMBuilder() {
  return (
    <Dialog>
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
          <div className='grid gap-2'>
            <Label htmlFor='source'>Source</Label>
            <Input id='source' placeholder='google' />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='medium'>Medium</Label>
            <Input id='medium' placeholder='cpc' />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='campaign'>Campaign</Label>
            <Input id='campaign' placeholder='summer_sale' />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='term'>Term</Label>
            <Input id='term' placeholder='running shoes' />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='content'>Content</Label>
            <Input id='content' placeholder='logolink' />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='referral'>Referral</Label>
            <Input id='referral' placeholder='yoursite.com' />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='template'>Template</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder='Select template' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='default'>Default Template</SelectItem>
                <SelectItem value='social'>Social Media</SelectItem>
                <SelectItem value='email'>Email Campaign</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className='flex justify-end gap-2'>
          <Button variant='outline'>Cancel</Button>
          <Button>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

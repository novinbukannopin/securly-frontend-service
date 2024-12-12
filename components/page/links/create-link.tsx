'use client';

import * as React from 'react';
import { Check, ChevronsUpDown, QrCode, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { UTMBuilder } from '@/components/page/links/utm-builder';
import { ExpirationModal } from '@/components/page/links/expiration-modal';

export default function LinkCreatorWithModal() {
  const [open, setOpen] = React.useState(false);
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [tags] = React.useState<string[]>([
    'marketing',
    'social',
    'promotion',
    'campaign',
    'product',
  ]);

  const handleSelectTag = React.useCallback((tag: string) => {
    setSelectedTags((current) =>
      current.includes(tag)
        ? current.filter((t) => t !== tag)
        : [...current, tag],
    );
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Link</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[500px] md:max-w-4xl'>
        <DialogHeader>
          <DialogTitle>Create New Link</DialogTitle>
          <DialogDescription>
            Create a new short link for your campaign or project.
          </DialogDescription>
        </DialogHeader>
        <Card className='w-full'>
          <CardContent className='grid gap-6 p-6 md:grid-cols-5'>
            <div className='space-y-4 md:col-span-3'>
              <div className='space-y-2'>
                <Label htmlFor='url'>Destination URL</Label>
                <Input id='url' placeholder='https://example.com' />
              </div>
              <div className='flex gap-2'>
                <div className='flex-1 space-y-2'>
                  <Label htmlFor='shortlink'>Custom Short Link</Label>
                  <div className='flex'>
                    <Input
                      id='shortlink'
                      placeholder='custom-link'
                      className='rounded-r-none'
                    />
                    <Button className='rounded-l-none'>Generate</Button>
                  </div>
                </div>
              </div>
              <div className='space-y-2'>
                <Label>Tags</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant='outline'
                      role='combobox'
                      aria-expanded={open}
                      className='w-full justify-between'
                    >
                      {selectedTags.length > 0
                        ? `${selectedTags.length} selected`
                        : 'Select tags...'}
                      <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-full p-0'>
                    <Command>
                      <CommandInput placeholder='Search tags...' />
                      <CommandEmpty>No tags found.</CommandEmpty>
                      <CommandGroup>
                        {tags.map((tag) => (
                          <CommandItem
                            key={tag}
                            onSelect={() => handleSelectTag(tag)}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                selectedTags.includes(tag)
                                  ? 'opacity-100'
                                  : 'opacity-0',
                              )}
                            />
                            {tag}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <div className='flex flex-wrap gap-2'>
                  {selectedTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant='secondary'
                      className='cursor-pointer'
                      onClick={() => handleSelectTag(tag)}
                    >
                      {tag}
                      <X className='ml-1 h-3 w-3' />
                    </Badge>
                  ))}
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='comments'>Comments</Label>
                <Textarea
                  id='comments'
                  placeholder='Add any notes or comments...'
                />
              </div>
            </div>
            <div className='space-y-4 md:col-span-2'>
              <div className='rounded-lg border bg-muted/50 p-4'>
                <div className='flex justify-between'>
                  <h3 className='text-sm font-medium'>QR Code</h3>
                  <Button variant='ghost' size='icon' className='h-8 w-8'>
                    <QrCode className='h-4 w-4' />
                  </Button>
                </div>
                <div className='mt-4 aspect-square rounded-lg border bg-background'></div>
              </div>
              <div className='rounded-lg border bg-muted/50 p-4'>
                <h3 className='text-sm font-medium'>Link Preview</h3>
                <div className='mt-4 space-y-2'>
                  <div className='h-4 w-3/4 rounded bg-muted'></div>
                  <div className='h-4 w-1/2 rounded bg-muted'></div>
                </div>
              </div>
            </div>
          </CardContent>
          <Separator />
          <CardFooter className='justify-between p-6'>
            <div className='flex gap-2'>
              <UTMBuilder />
              <ExpirationModal />
            </div>
            <Button>Create Link</Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

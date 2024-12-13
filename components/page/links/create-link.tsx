'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronsUpDown, QrCode, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
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
import { cn, generateShortLink } from '@/lib/utils';
import { UTMBuilder } from '@/components/page/links/utm-builder';
import { ExpirationModal } from '@/components/page/links/expiration-modal';
import QRCode from 'qrcode';
import { DOMAIN } from '@/lib/env';
import ColorPicker from '@/components/custom/color-picker';

const linkSchema = z.object({
  url: z.string().url('Must be a valid URL'),
  shortlink: z.string().regex(/^[a-zA-Z0-9-]+$/, "Must be alphanumeric or '-'"),
  comments: z.string().optional(),
  tags: z.array(z.string()).optional(),
  utm: z
    .object({
      source: z.string().optional(),
      medium: z.string().optional(),
      campaign: z.string().optional(),
      term: z.string().optional(),
      content: z.string().optional(),
    })
    .optional(),
  expiration: z
    .object({
      datetime: z.string().optional(),
      url: z.string().url().or(z.literal('')),
    })
    .optional(),
  qrcode: z.string().optional(),
});

export type CreateLinkFormValue = z.infer<typeof linkSchema>;

export default function LinkCreatorWithModal() {
  const [open, setOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [tags, setTags] = React.useState<string[]>([
    'marketing',
    'social',
    'promotion',
    'campaign',
    'product',
    'email',
    'advertising',
    'webinar',
    'branding',
  ]);

  const methods = useForm<CreateLinkFormValue>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      tags: ['marketing'],
    },
  });

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = methods;

  const selectedTags = watch('tags') || [];
  const [qrCodeData, setQRCodeData] = React.useState<string>('');

  const handleSelectTag = (tag: string) => {
    const currentTags = watch('tags') || [];
    const updatedTags = Array.isArray(currentTags)
      ? currentTags.includes(tag)
        ? currentTags.filter((t) => t !== tag)
        : [...currentTags, tag]
      : [tag];
    setValue('tags', updatedTags);
  };

  const onSubmit = (data: CreateLinkFormValue) => {
    console.log(data, (data.qrcode = qrCodeData));
  };

  const handleGenerateShortLink = async () => {
    const link = generateShortLink();
    setValue('shortlink', link);

    if (link) {
      const url = `${DOMAIN}${link}`;
      const qrCodeData = await generateQRCodeWithLogo(url, '#000000');
      setQRCodeData(qrCodeData);
    } else {
      setQRCodeData('');
    }
  };

  const generateQRCodeWithLogo = async (url: string, color: string) => {
    const canvas = document.createElement('canvas');
    await QRCode.toCanvas(canvas, url, {
      errorCorrectionLevel: 'H',
      width: 300,
      margin: 1,
      color: {
        dark: color,
        light: '#FFFFFF',
      },
    });

    const imgDim = { width: 50, height: 50 };
    const context = canvas.getContext('2d');
    const imageObj = new Image();
    imageObj.src = './img.png';

    return new Promise<string>((resolve) => {
      imageObj.onload = function () {
        const clearSize = imgDim.width + 20;
        context?.clearRect(
          canvas.width / 2 - clearSize / 2,
          canvas.height / 2 - clearSize / 2,
          clearSize,
          clearSize,
        );

        context?.drawImage(
          imageObj,
          canvas.width / 2 - imgDim.width / 2,
          canvas.height / 2 - imgDim.height / 2,
          imgDim.width,
          imgDim.height,
        );

        resolve(canvas.toDataURL());
      };
    });
  };

  const handleShortlinkChange = async (value: string) => {
    setValue('shortlink', value);

    if (value) {
      const url = `${DOMAIN}${value}`;
      const qrCodeData = await generateQRCodeWithLogo(url, '#000000');
      setQRCodeData(qrCodeData);
    } else {
      setQRCodeData('');
    }
  };

  const handleColorChange = async (color: string) => {
    const shortlink = watch('shortlink');
    if (shortlink) {
      const url = `${DOMAIN}${shortlink}`;
      const qrCodeData = await generateQRCodeWithLogo(url, color);
      setQRCodeData(qrCodeData);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
          <Form {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent className='grid gap-6 p-6 md:grid-cols-5'>
                <div className='space-y-4 md:col-span-3'>
                  <FormField
                    control={methods.control}
                    name='url'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Destination URL</FormLabel>
                        <FormControl>
                          <Input placeholder='https://example.com' {...field} />
                        </FormControl>
                        {errors.url && (
                          <FormMessage>{errors.url.message}</FormMessage>
                        )}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={methods.control}
                    name='shortlink'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Custom Short Link</FormLabel>
                        <FormControl>
                          <div className='flex'>
                            <Input
                              placeholder='custom-link'
                              className='rounded-r-none'
                              {...field}
                              onChange={(e) =>
                                handleShortlinkChange(e.target.value)
                              }
                            />
                            <Button
                              className='rounded-l-none'
                              type={'button'}
                              onClick={handleGenerateShortLink}
                            >
                              Generate
                            </Button>
                          </div>
                        </FormControl>
                        {errors.shortlink && (
                          <FormMessage>{errors.shortlink.message}</FormMessage>
                        )}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={methods.control}
                    name='tags'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
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
                              <CommandList>
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
                              </CommandList>
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
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={methods.control}
                    name='comments'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Comments</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='Add any notes or comments...'
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className='space-y-4 md:col-span-2'>
                  <div className='rounded-lg border bg-muted/50 p-4'>
                    <div className='flex justify-between'>
                      <h3 className='text-sm font-medium'>QR Code</h3>
                      <Button
                        variant='ghost'
                        size='icon'
                        type={'button'}
                        className='h-8 w-8'
                      >
                        <QrCode className='h-4 w-4' />
                      </Button>
                    </div>
                    <div className='mt-4 flex aspect-square items-center justify-center rounded-lg border bg-background'>
                      {qrCodeData ? (
                        <img
                          src={qrCodeData}
                          alt='QR Code'
                          className='h-full w-full'
                        />
                      ) : (
                        <p className='text-sm text-muted-foreground'>
                          No QR Code
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='rounded-lg border bg-muted/50 p-4'>
                    <ColorPicker onColorChange={handleColorChange} />
                  </div>
                  <div className='rounded-lg border bg-muted/50 p-4'>
                    <h3 className='text-sm font-medium'>Link Preview</h3>
                    <div className='mt-4 space-y-2'>
                      <div className='h-4 w-3/4 rounded bg-muted'>
                        <h5 className={'truncate text-sm'}>
                          {DOMAIN}
                          {watch('shortlink')}
                        </h5>
                      </div>
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
                <div className={'flex gap-2'}>
                  <Button
                    type='reset'
                    variant={'secondary'}
                    onClick={() => {
                      setDialogOpen(false), reset();
                    }}
                  >
                    Reset / Close
                  </Button>
                  <Button type='submit'>Create Link</Button>
                </div>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

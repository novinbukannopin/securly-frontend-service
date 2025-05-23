'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

export const HeroSection = () => {
  const { theme } = useTheme();
  return (
    <section className='container w-full'>
      <div className='mx-auto grid place-items-center gap-8 py-20 md:py-32 lg:max-w-screen-xl'>
        <div className='space-y-8 text-center'>
          <Badge variant='outline' className='py-2 text-sm'>
            <span className='mr-2 text-primary'>
              <Badge>Aman</Badge>
            </span>
            <span> Pendekkan URL Anda Tanpa Khawatir </span>
          </Badge>

          <div className='mx-auto max-w-screen-md text-center text-4xl font-bold md:text-6xl'>
            <h1>
              Securly:
              <span className='bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text px-2 text-transparent'>
                Pendek & Aman
              </span>
              dengan Teknologi Deep Learning
            </h1>
          </div>

          <p className='mx-auto max-w-screen-sm text-xl text-muted-foreground'>
            {`Securly lebih dari sekadar pemendek URL. Kami memeriksa keamanan tautan Anda sebelum dipendekkan, memastikan Anda berbagi tanpa risiko.`}
          </p>

          <div className='space-y-4 md:space-x-4 md:space-y-0'>
            <Button className='group/arrow w-5/6 font-bold md:w-1/4'>
              <Link href='https://url.pasti.live/login'>Coba Sekarang</Link>
              <ArrowRight className='ml-2 size-5 transition-transform group-hover/arrow:translate-x-1' />
            </Button>

            <Button
              asChild
              variant='secondary'
              className='w-5/6 font-bold md:w-1/4'
            >
              <Link href='https://github.com/novinbukannopin' target='_blank'>
                Repositori Github
              </Link>
            </Button>
          </div>
        </div>

        <div className='group relative mt-14'>
          <div className='absolute left-1/2 top-2 mx-auto h-24 w-[90%] -translate-x-1/2 transform rounded-full bg-primary/50 blur-3xl lg:-top-8 lg:h-80'></div>
          <Image
            width={1200}
            height={1200}
            className='rouded-lg relative mx-auto flex w-full items-center rounded-lg border border-t-2 border-secondary border-t-primary/30 leading-none md:w-[1200px]'
            src={
              theme === 'light'
                ? '/hero-image-light.png'
                : '/hero-image-dark.png'
            }
            alt='Dashboard Securly'
          />

          <div className='absolute bottom-0 left-0 h-20 w-full rounded-lg bg-gradient-to-b from-background/0 via-background/50 to-background md:h-28'></div>
        </div>
      </div>
    </section>
  );
};

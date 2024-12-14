import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

export const FooterSection = () => {
  return (
    <footer id='footer' className='container py-24 sm:py-32'>
      <div className='rounded-2xl border border-secondary bg-card p-10'>
        <div className='grid grid-cols-2 gap-x-12 gap-y-8 md:grid-cols-4 xl:grid-cols-6'>
          <div className='col-span-full xl:col-span-2'>
            <Link href='/' className='flex items-center font-bold'>
              <Image
                src={'/securly.svg'}
                alt={'logo'}
                width={24}
                height={24}
                className={'mr-2'}
              />
              <h3 className='text-2xl'>Securly</h3>
            </Link>
            <p className='mt-4 text-sm opacity-60'>
              Empowering secure and personalized link shortening solutions.
            </p>
          </div>

          <div className='flex flex-col gap-2'>
            <h3 className='text-lg font-bold'>About</h3>
            <div>
              <Link href='/about' className='opacity-60 hover:opacity-100'>
                About Us
              </Link>
            </div>
            <div>
              <Link href='/careers' className='opacity-60 hover:opacity-100'>
                Careers
              </Link>
            </div>
            <div>
              <Link href='/press' className='opacity-60 hover:opacity-100'>
                Press
              </Link>
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <h3 className='text-lg font-bold'>Resources</h3>
            <div>
              <Link href='/blog' className='opacity-60 hover:opacity-100'>
                Blog
              </Link>
            </div>
            <div>
              <Link href='/docs' className='opacity-60 hover:opacity-100'>
                Documentation
              </Link>
            </div>
            <div>
              <Link href='/api' className='opacity-60 hover:opacity-100'>
                API Reference
              </Link>
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <h3 className='text-lg font-bold'>Support</h3>
            <div>
              <Link href='/contact' className='opacity-60 hover:opacity-100'>
                Contact Us
              </Link>
            </div>
            <div>
              <Link href='/help' className='opacity-60 hover:opacity-100'>
                Help Center
              </Link>
            </div>
            <div>
              <Link href='/community' className='opacity-60 hover:opacity-100'>
                Community
              </Link>
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <h3 className='text-lg font-bold'>Follow Us</h3>
            <div>
              <Link
                href='https://twitter.com/securly'
                className='opacity-60 hover:opacity-100'
                target='_blank'
              >
                Twitter
              </Link>
            </div>
            <div>
              <Link
                href='https://linkedin.com/company/securly'
                className='opacity-60 hover:opacity-100'
                target='_blank'
              >
                LinkedIn
              </Link>
            </div>
            <div>
              <Link
                href='https://github.com/securly'
                className='opacity-60 hover:opacity-100'
                target='_blank'
              >
                GitHub
              </Link>
            </div>
            <div>
              <Link
                href='https://discord.gg/securly'
                className='opacity-60 hover:opacity-100'
                target='_blank'
              >
                Discord
              </Link>
            </div>
          </div>
        </div>

        <Separator className='my-6' />
        <section className='text-center'>
          <h3 className='text-sm opacity-60'>
            &copy; 2024 Securly. All Rights Reserved. Designed and developed by
            <Link
              target='_blank'
              href={'https://github.com/novinbukanopin'}
              className='ml-1 border-primary text-primary transition-all hover:border-b-2'
            >
              Securly Team
            </Link>
          </h3>
        </section>
      </div>
    </footer>
  );
};

'use client';
import { ChevronsDown, Menu } from 'lucide-react';
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { Separator } from '../ui/separator';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui/navigation-menu';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ToggleTheme } from './toogle-theme';

interface RouteProps {
  href: string;
  label: string;
}

interface FeatureProps {
  title: string;
  description: string;
}

const routeList: RouteProps[] = [
  {
    href: '#benefits',
    label: 'Benefit',
  },
  {
    href: '#testimonials',
    label: 'Testimonials',
  },
  {
    href: '#team',
    label: 'Team',
  },
  {
    href: '#faq',
    label: 'FAQ',
  },
];

const featureList: FeatureProps[] = [
  {
    title: 'Secure URL Shortening',
    description:
      'Shorten links with confidence. Our AI ensures every links is safe.',
  },
  {
    title: 'Advanced Analytics',
    description:
      'Track clicks, locations, devices, and more with detailed reports.',
  },
  {
    title: 'Custom URL Options',
    description: 'Create branded short links that match your style and domain.',
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <header className='sticky top-5 z-40 mx-auto flex w-[90%] items-center justify-between rounded-2xl border border-secondary bg-card bg-opacity-15 p-2 shadow-inner md:w-[70%] lg:w-[75%] lg:max-w-screen-xl'>
      <Link href='/' className='flex items-center text-lg font-bold'>
        <Image
          src={'/securly.svg'}
          alt={'logo'}
          width={24}
          height={24}
          className={'mr-2'}
        />
        {/*<ChevronsDown className='mr-2 h-9 w-9 rounded-lg border border-secondary bg-gradient-to-tr from-primary via-primary/70 to-primary text-white' />*/}
        Securly
      </Link>
      {/* <!-- Mobile --> */}
      <div className='flex items-center lg:hidden'>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Menu
              onClick={() => setIsOpen(!isOpen)}
              className='cursor-pointer lg:hidden'
            />
          </SheetTrigger>

          <SheetContent
            side='left'
            className='flex flex-col justify-between rounded-br-2xl rounded-tr-2xl border-secondary bg-card'
          >
            <div>
              <SheetHeader className='mb-4 ml-4'>
                <SheetTitle className='flex items-center'>
                  <Link href='/' className='flex items-center'>
                    <ChevronsDown className='mr-2 h-9 w-9 rounded-lg border border-secondary bg-gradient-to-tr from-primary via-primary/70 to-primary text-white' />
                    Securly
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className='flex flex-col gap-2'>
                {routeList.map(({ href, label }) => (
                  <Button
                    key={href}
                    onClick={() => setIsOpen(false)}
                    asChild
                    variant='ghost'
                    className='justify-start text-base'
                  >
                    <Link href={href}>{label}</Link>
                  </Button>
                ))}
              </div>
            </div>

            <SheetFooter className='flex-col items-start justify-start sm:flex-col'>
              <div className={'mb-6 flex gap-6'}>
                <Button asChild>
                  <Link href='/login'>Login</Link>
                </Button>

                <Button asChild variant={'link'}>
                  <Link href='/register'>Register</Link>
                </Button>
              </div>
              <Separator className='mb-2' />

              <ToggleTheme />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* <!-- Desktop --> */}
      <NavigationMenu className='mx-auto hidden lg:block'>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className='bg-card text-base'>
              Features
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className='grid w-[600px] grid-cols-2 gap-5 p-4'>
                <Image
                  src='/hero-image-dark.png'
                  alt='Securly Features'
                  className='h-full w-full rounded-md object-cover'
                  width={600}
                  height={600}
                />
                <ul className='flex flex-col gap-2'>
                  {featureList.map(({ title, description }) => (
                    <Link href={'#features'} key={title}>
                      <li
                        key={title}
                        className='rounded-md p-3 text-sm hover:bg-muted'
                      >
                        <p className='mb-1 font-semibold leading-none text-foreground'>
                          {title}
                        </p>
                        <p className='line-clamp-2 text-muted-foreground'>
                          {description}
                        </p>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            {routeList.map(({ href, label }) => (
              <NavigationMenuLink key={href} asChild>
                <Link href={href} className='px-3 text-base'>
                  {label}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className='hidden gap-3 lg:flex'>
        <ToggleTheme />

        <Button asChild>
          <Link href='/login'>Login</Link>
        </Button>

        <Button asChild variant={'link'}>
          <Link href='/register'>Register</Link>
        </Button>
      </div>
    </header>
  );
};

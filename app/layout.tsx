'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Navbar } from '@/components/layout/navbar';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { usePathname } from 'next/navigation';
import ReactQueryProvider from '@/providers/react-query-providers.';
import { Toaster as SonnerToaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export default function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const noNavbarPages = ['/'];
  const showNavbar = noNavbarPages.includes(pathname);

  return (
    <html lang='pt-br' suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background', inter.className)}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {showNavbar && <Navbar />}
          <ReactQueryProvider>{children}</ReactQueryProvider>
          <SonnerToaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

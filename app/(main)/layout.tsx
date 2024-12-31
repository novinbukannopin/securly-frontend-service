'use client';

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Separator } from '@/components/ui/separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ToggleTheme } from '@/components/layout/toogle-theme';
import AuthGuard from '@/middleware/AuthGuard';
import React from 'react';
import Notification from '@/components/custom/notification';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
            <div className='flex w-full items-center gap-2 px-4'>
              <SidebarTrigger className='-ml-1' />
              <Separator orientation='vertical' className='mr-2 h-4' />
              <div className={'flex w-full items-center justify-between'}>
                <Breadcrumb className={'w-full'}>
                  <BreadcrumbList>
                    <BreadcrumbItem className='hidden md:block'>
                      <BreadcrumbLink href='/dashboard'>Securly</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className='hidden md:block' />
                  </BreadcrumbList>
                </Breadcrumb>

                <div className='hidden lg:flex'>
                  <Notification />
                  <ToggleTheme />
                </div>
              </div>
            </div>
          </header>
          <div className='flex flex-1 flex-col gap-4 p-4 pt-4'>
            <div className='min-h-[100vh] flex-1 rounded-xl md:min-h-min md:max-w-[80vw]'>
              {children}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  );
}

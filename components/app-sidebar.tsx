'use client';

import * as React from 'react';
import {
  BookOpen,
  Frame,
  GalleryVerticalEnd,
  LineChart,
  Link2,
  Map,
  PieChart,
  Settings2,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { AnalyticsSidebar } from '@/components/page/analytics-sidebar';
import { useGetProfile } from '@/service/queries/profile';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data, error } = useGetProfile();
  const isAdmin = data?.role === 'ADMIN';

  const datas = {
    user: {
      name: 'shadcn',
      email: 'm@example.com',
      avatar: '/avatars/shadcn.jpg',
    },
    teams: [
      {
        name: 'Acme Inc',
        logo: GalleryVerticalEnd,
        plan: 'Enterprise',
      },
    ],
    navMain: [
      ...(isAdmin
        ? [{ title: 'Insight', url: '/insights', icon: LineChart }]
        : []),
      {
        title: 'Link',
        url: '/links',
        icon: Link2,
        isActive: true,
      },
      {
        title: 'Analytics',
        url: '/analytics',
        icon: LineChart,
        items: [
          {
            title: 'Clicks',
            url: '/analytics#click',
          },
          {
            title: 'Count',
            url: '/analytics#count',
          },
          {
            title: 'Type',
            url: '/analytics#type',
          },
          {
            title: 'Tags',
            url: '/analytics#tags',
          },
        ],
      },
      {
        title: 'Documentation',
        url: '#',
        icon: BookOpen,
        items: [
          {
            title: 'Introduction',
            url: '#',
          },
          {
            title: 'Get Started',
            url: '#',
          },
          {
            title: 'Tutorials',
            url: '#',
          },
          {
            title: 'Changelog',
            url: '#',
          },
        ],
      },
      {
        title: 'Settings',
        url: '#',
        icon: Settings2,
        items: [
          {
            title: 'Account',
            url: '/settings/account',
          },
          {
            title: 'Billing',
            url: '/settings/billing',
          },
        ],
      },
    ],
    projects: [
      {
        name: 'Design Engineering',
        url: '#',
        icon: Frame,
      },
      {
        name: 'Sales & Marketing',
        url: '#',
        icon: PieChart,
      },
      {
        name: 'Travel',
        url: '#',
        icon: Map,
      },
    ],
  };

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <a href='/links'>
                <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                  <GalleryVerticalEnd className='size-4' />
                </div>
                <div className='flex flex-col gap-0.5 leading-none'>
                  <span className='font-semibold'>Securly</span>
                  <span className=''>v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={datas.navMain} />
      </SidebarContent>
      <AnalyticsSidebar />
      <SidebarFooter>
        <NavUser user={datas.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

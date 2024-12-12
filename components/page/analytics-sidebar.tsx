'use client';

import * as React from 'react';
import { BarChart3, Link2 } from 'lucide-react';

import { Progress } from '@/components/ui/progress';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/stores/user';
import { UsageData } from '@/types/limit';

export const usageData: UsageData = {
  events: {
    current: 880,
    max: 1000,
  },
  links: {
    current: 10,
    max: 25,
  },
};

export function AnalyticsSidebar() {
  const userProfile = useUserStore((state) => state.userProfile);
  return (
    <>
      <SidebarGroup className='mt-6'>
        <SidebarGroupLabel>Usage</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu className={'gap-4'}>
            <SidebarMenuItem>
              <SidebarMenuButton className='w-full'>
                <BarChart3 className='mr-2 h-4 w-4' />
                <span>Events</span>
                <span className='ml-auto'>
                  {usageData.events.current} of {usageData.events.max}
                </span>
              </SidebarMenuButton>
              <Progress
                value={(usageData.events.current / usageData.events.max) * 100}
              />
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className='w-full'>
                <Link2 className='mr-2 h-4 w-4' />
                <span>Links</span>
                <span className='ml-auto'>
                  {userProfile?.count} of {usageData.links.max}
                </span>
              </SidebarMenuButton>
              <Progress
                value={(userProfile?.count || 0 / usageData.links.max) * 100}
              />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <div className='mt-6 px-2'>
        <Button
          className='w-full bg-black text-white hover:bg-black/90'
          size='lg'
        >
          Get Securly Pro
        </Button>
      </div>
    </>
  );
}

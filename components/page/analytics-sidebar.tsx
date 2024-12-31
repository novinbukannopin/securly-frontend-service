'use client';

import * as React from 'react';
import { Link2 } from 'lucide-react';

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
import { UsageData } from '@/types/limit';
import { useGetProfile } from '@/service/queries/profile';

export const usageData: UsageData = {
  links: {
    current: 10,
    max: 25,
  },
};

export function AnalyticsSidebar() {
  const { data, isLoading, error } = useGetProfile();

  return (
    <>
      <SidebarGroup className='mt-6'>
        <SidebarGroupLabel>Usage</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu className={'gap-4'}>
            <SidebarMenuItem>
              <SidebarMenuButton className='w-full'>
                <Link2 className='mr-2 h-4 w-4' />
                <span>Links</span>
                <span className='ml-auto'>
                  {data?.linkCount} of {usageData.links.max}
                </span>
              </SidebarMenuButton>
              <Progress
                value={data?.linkCount ?? (1 / usageData.links.max) * 100}
              />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <div className='mt-6 px-2'>
        <Button
          className='w-full bg-black text-white hover:bg-black/90 dark:bg-secondary'
          size='lg'
        >
          Get Securly Pro
        </Button>
      </div>
    </>
  );
}

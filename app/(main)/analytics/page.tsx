'use client';

import React from 'react';
import { useGetAnalytics } from '@/service/queries/analytics';
import { CountChartAnalytics } from '@/components/page/analytics/count';
import { TypeChartAnalytics } from '@/components/page/analytics/type';
import { TagsChartAnalytics } from '@/components/page/analytics/tags';

export default function Page() {
  const response = useGetAnalytics();
  const analytics = response.data;

  const linkTypeData = analytics?.type.list.map((item) => ({
    name: item.type,
    value: item._count.type,
  }));

  return (
    <>
      <div className='space-y-4 py-4'>
        <h1 className='text-xl font-semibold'>Analytics</h1>
        <CountChartAnalytics />
        <div className={'grid grid-cols-1 gap-4 lg:grid-cols-2'}>
          <TypeChartAnalytics />
          <TagsChartAnalytics />
        </div>
      </div>
    </>
  );
}

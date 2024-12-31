'use client';

import { useState } from 'react';
import { DynamicBarChart } from '@/components/page/analytics/card-interaction';

const insightTabs = {
  location: ['location', 'region', 'country'],
  os: ['os', 'osVersion', 'browser'],
  device: ['cpuArch', 'deviceType'],
} as const;

export default function TabsWrapperAnalytics({ data }: { data?: any }) {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = Object.keys(insightTabs) as Array<keyof typeof insightTabs>; // Ensure proper types

  return (
    <div className='w-full space-y-4'>
      <div className='flex items-center justify-start border-b border-muted'>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === index
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-primary'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} {/* Capitalize */}
          </button>
        ))}
      </div>

      <div className='space-y-4'>
        {insightTabs[tabs[activeTab]].map((key, index) => (
          <DynamicBarChart data={data?.interaction} dataKey={key} key={index} />
        ))}
      </div>
    </div>
  );
}

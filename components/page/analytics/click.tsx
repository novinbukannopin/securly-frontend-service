'use client';

import * as React from 'react';
import { useState } from 'react';
import { addDays, format, subDays } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { useGetClicksAnalytics } from '@/service/queries/click-analytics';
import TabsWrapperAnalytics from '@/components/page/analytics/tabs-wrapper';
import { TableAnalytics } from '@/components/page/analytics/table';
import { AnalyticsResponse } from '@/types/analytics';
import { InfoDataNotAvailable } from '@/components/custom/data-not-available';

export default function ClickChartAnalytics({
  topClick,
}: {
  topClick: AnalyticsResponse['topLinks'];
}) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  const [filter, setFilter] = useState('7d');
  const [selectedCode, setSelectedCode] = useState<string | null>(null);

  const handleRowClick = (code: string) => {
    setSelectedCode(code);
  };

  const { data, isLoading, error } = useGetClicksAnalytics({
    startDate: dateRange?.from
      ? format(dateRange.from, 'yyyy-MM-dd')
      : undefined,
    endDate: dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : undefined,
    filter: filter === '24h' ? '24h' : filter === '7d' ? '7 days' : '28 days',
    shortCode: selectedCode || undefined,
  });

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    const now = new Date();
    let newFrom: Date;

    switch (newFilter) {
      case '24h':
        newFrom = subDays(now, 1);
        break;
      case '7 days':
        newFrom = subDays(now, 7);
        break;
      case '28 days':
        newFrom = subDays(now, 28);
        break;
      default:
        newFrom = subDays(now, 7);
    }

    setDateRange({ from: newFrom, to: now });
  };

  const insight = [
    'location',
    'region',
    'country',
    'os',
    'osVersion',
    'browser',
    'cpuArch',
    'deviceType',
  ];

  return (
    <div className={'space-y-4'}>
      <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row'>
        <div className='flex flex-1 flex-col justify-center gap-1 px-0 py-5 sm:py-6'>
          <CardTitle>Click Analytics</CardTitle>
          <CardDescription>
            Showing total links for the last 3 months
          </CardDescription>
        </div>
        <div className='flex'>
          <button className='flex flex-1 flex-col justify-center gap-1 border-t px-0 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6'>
            <span className='text-xs text-muted-foreground'>Total Clicks</span>
            <span className='text-lg font-bold leading-none sm:text-3xl'>
              {data?.click.totalClick}
            </span>
          </button>
        </div>
      </CardHeader>
      <Card className='' id={'click'}>
        <CardHeader>
          <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <div>
              <CardDescription>
                {dateRange?.from && dateRange?.to ? (
                  <>
                    {format(dateRange.from, 'LLL dd, y')} -{' '}
                    {format(dateRange.to, 'LLL dd, y')}
                  </>
                ) : (
                  'Select a date range'
                )}
              </CardDescription>
            </div>
            <div className='flex flex-col gap-2 sm:flex-row sm:items-center'>
              <Select value={filter} onValueChange={handleFilterChange}>
                <SelectTrigger className='w-full]'>
                  <SelectValue placeholder='Select range' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='24h'>Last 24 hours</SelectItem>
                  <SelectItem value='7d'>Last 7 days</SelectItem>
                  <SelectItem value='28d'>Last 28 days</SelectItem>
                </SelectContent>
              </Select>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={`w-full justify-start text-left font-normal ${!dateRange && 'text-muted-foreground'}`}
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, 'LLL dd, y')} -{' '}
                          {format(dateRange.to, 'LLL dd, y')}
                        </>
                      ) : (
                        format(dateRange.from, 'LLL dd, y')
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    initialFocus
                    mode='range'
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={(newDateRange) => {
                      setDateRange(newDateRange);
                      setFilter('custom');
                    }}
                    numberOfMonths={2}
                    disabled={(date) =>
                      date > new Date() || date < addDays(new Date(), -365)
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className='mt-4'>
            <div className='text-2xl font-bold'>
              {/*{totalClicks.toLocaleString()}*/}
            </div>
            <p className='text-xs text-muted-foreground'>Total Clicks</p>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className='flex h-[350px] items-center justify-center'>
              <p>Loading...</p>
            </div>
          ) : error ? (
            <div className='flex h-[350px] items-center justify-center'>
              <p className='text-red-500'>
                Error loading data. Please try again.
              </p>
            </div>
          ) : (
            <ChartContainer
              config={{
                clicks: {
                  label: 'Clicks',
                  color: 'hsl(var(--chart-1))',
                },
              }}
              className='h-[350px] w-full'
            >
              <ResponsiveContainer width='100%' height='100%'>
                {data?.click?.data?.length === 0 ? (
                  <InfoDataNotAvailable />
                ) : (
                  <LineChart data={data?.click?.data || []}>
                    <XAxis
                      dataKey='date'
                      stroke='#888888'
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke='#888888'
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}`}
                    />
                    <ChartTooltip />
                    <Line
                      type='monotone'
                      dataKey='totalClicks'
                      strokeWidth={2}
                      activeDot={{
                        r: 6,
                        style: { fill: 'var(--color-clicks)' },
                      }}
                      style={{
                        stroke: 'var(--color-clicks)',
                      }}
                    />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </ChartContainer>
          )}
        </CardContent>
      </Card>

      <div className={'grid grid-cols-3 gap-4'}>
        <div className={'col-span-2 grid'}>
          <TableAnalytics topClick={topClick} onRowClick={handleRowClick} />
        </div>
        <div className={'grid grid-cols-1'}>
          <TabsWrapperAnalytics data={data} />
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useGetAnalytics } from '@/service/queries/analytics';
import { AnalyticsResponse } from '@/types/analytics';
import { getUniqueDatesAndClicks } from '@/lib/utils';

export default function Page() {
  const response = useGetAnalytics();
  const data = response.data;

  const countLinks = {
    totalLinks: data?.length,
    activeLinks: data?.filter(
      (link: AnalyticsResponse) =>
        link.expiresAt === null && link.deletedAt === null,
    ).length,
    expiredLinks: data?.filter(
      (link: AnalyticsResponse) => link.expiresAt !== null,
    ).length,
    archivedLinks: data?.filter(
      (link: AnalyticsResponse) => link.deletedAt !== null,
    ).length,
  };

  const datesAndClicks = getUniqueDatesAndClicks(data);
  const clickedLinks = data?.map((link: AnalyticsResponse) => ({
    shortCode: link.shortCode,
    originalUrl: link.originalUrl,
    createdAt: link.createdAt,
    clicks: link.Click.map((click) => click.id).length,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className='rounded border bg-background p-2 shadow'>
          <p className='label'>{`${label}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  const linkTypeData = [
    { name: 'Public', value: 300 },
    { name: 'Private', value: 150 },
    { name: 'Custom', value: 50 },
  ];

  const topClickedLinks = [
    {
      shortCode: 'abc123',
      clicks: 1000,
      originalUrl: 'https://example.com/page1',
    },
    {
      shortCode: 'def456',
      clicks: 800,
      originalUrl: 'https://example.com/page2',
    },
    {
      shortCode: 'ghi789',
      clicks: 600,
      originalUrl: 'https://example.com/page3',
    },
    {
      shortCode: 'jkl012',
      clicks: 400,
      originalUrl: 'https://example.com/page4',
    },
    {
      shortCode: 'mno345',
      clicks: 200,
      originalUrl: 'https://example.com/page5',
    },
  ];

  const neverClickedLinks = [
    {
      shortCode: 'xyz987',
      originalUrl: 'https://example.com/neverclicked1',
      createdAt: '2023-06-01',
    },
    {
      shortCode: 'uvw654',
      originalUrl: 'https://example.com/neverclicked2',
      createdAt: '2023-06-15',
    },
    {
      shortCode: 'rst321',
      originalUrl: 'https://example.com/neverclicked3',
      createdAt: '2023-06-30',
    },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const [activeTab, setActiveTab] = useState('overview');

  const chartConfig = {
    desktop: {
      label: 'Desktop',
      color: '#2563eb',
    },
    mobile: {
      label: 'Mobile',
      color: '#60a5fa',
    },
  } satisfies ChartConfig;

  return (
    <>
      <div className='space-y-4 py-4'>
        <h1 className='text-xl font-semibold'>Analytics</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            <TabsTrigger value='performance'>Performance</TabsTrigger>
            <TabsTrigger value='types'>Types & Categories</TabsTrigger>
          </TabsList>

          <TabsContent value='overview'>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader>
                  <CardTitle>Total Links</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-3xl font-bold'>{countLinks.totalLinks}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Active Links</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-3xl font-bold'>{countLinks.activeLinks}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Archived Links</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-3xl font-bold'>
                    {countLinks.archivedLinks}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Expired Links</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-3xl font-bold'>
                    {countLinks.expiredLinks}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className='mt-4'>
              <CardHeader>
                <CardTitle>Link Creation Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfig}
                  className='h-[300px] w-full'
                >
                  <ResponsiveContainer width='100%' height='100%'>
                    <LineChart data={datesAndClicks}>
                      <CartesianGrid strokeDasharray='3 3' />
                      <XAxis dataKey='date' />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line
                        type='monotone'
                        dataKey='count'
                        stroke='#8884d8'
                        name='Links Created'
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='performance'>
            <Card>
              <CardHeader>
                <CardTitle>Top 5 Most Clicked Links</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className='h-[300px]'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <BarChart data={topClickedLinks}>
                      <CartesianGrid strokeDasharray='3 3' />
                      <XAxis dataKey='shortCode' />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey='clicks' fill='#8884d8' name='Clicks' />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className='mt-4'>
              <CardHeader>
                <CardTitle>Links Never Clicked</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Short Code</TableHead>
                      <TableHead>Original URL</TableHead>
                      <TableHead>Created At</TableHead>
                    </TableRow>
                  </TableHeader>
                  {/*<TableBody>*/}
                  {/*  {neverClickedLinks.map((link: AnalyticsResponse) => (*/}
                  {/*    <TableRow key={link.shortCode}>*/}
                  {/*      <TableCell>{link.shortCode}</TableCell>*/}
                  {/*      <TableCell>{link.originalUrl}</TableCell>*/}
                  {/*      <TableCell>{link.createdAt}</TableCell>*/}
                  {/*    </TableRow>*/}
                  {/*  ))}*/}
                  {/*</TableBody>*/}
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='types'>
            <Card>
              <CardHeader>
                <CardTitle>Link Types Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className='h-[300px]'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <PieChart>
                      <Pie
                        data={linkTypeData}
                        cx='50%'
                        cy='50%'
                        labelLine={false}
                        outerRadius={80}
                        fill='#8884d8'
                        dataKey='value'
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {linkTypeData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className='mt-4'>
              <CardHeader>
                <CardTitle>Top Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Implement tag analysis here when tag data is available</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

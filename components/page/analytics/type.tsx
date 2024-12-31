'use client';

import * as React from 'react';
import { TrendingUp } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Label, Pie, PieChart } from 'recharts';
import { AnalyticsResponse } from '@/types/analytics';

const chartConfig: ChartConfig = {
  benign: {
    label: 'Benign',
    color: 'hsl(var(--chart-1))', // Warna aman untuk tipe BENIGN
  },
  malicious: {
    label: 'Malicious',
    color: 'hsl(var(--chart-2))', // Warna untuk tipe MALICIOUS
  },
  defacement: {
    label: 'Defacement',
    color: 'hsl(var(--chart-3))', // Warna untuk tipe DEFACEMENT
  },
  malware: {
    label: 'Malware',
    color: 'hsl(var(--chart-4))', // Warna untuk tipe MALWARE
  },
  phishing: {
    label: 'Phishing',
    color: 'hsl(var(--chart-5))', // Warna untuk tipe PHISHING
  },
  blocked: {
    label: 'Blocked',
    color: 'hsl(var(--chart-6))', // Warna untuk tipe BLOCKED
  },
} satisfies ChartConfig;

export function TypeChartAnalytics({
  list,
}: {
  list?: AnalyticsResponse['type']['list'];
}) {
  const chartData = list?.map((item) => ({
    type: chartConfig[item.type.toLowerCase()]?.label || item.type, // Gunakan label atau fallback ke type
    count: item._count.type || 0, // Default ke 0 jika tidak ada nilai
    fill: chartConfig[item.type.toLowerCase()]?.color || '#CCCCCC', // Default warna
  }));

  const totalCount = chartData?.reduce((acc, cur) => acc + cur.count, 0);

  return (
    <Card className='flex flex-col' id={'type'}>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Type</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[250px]'
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey='count'
              nameKey='type'
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor='middle'
                        dominantBaseline='middle'
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className='fill-foreground text-3xl font-bold'
                        >
                          {totalCount?.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className='fill-muted-foreground'
                        >
                          Count
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col gap-2 text-sm'>
        <div className='flex items-center gap-2 font-medium leading-none'>
          Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
        </div>
        <div className='leading-none text-muted-foreground'>
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}

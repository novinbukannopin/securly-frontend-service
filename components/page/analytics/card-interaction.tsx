'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { InteractionInsight } from '@/types/analytics';

interface ChartConfigItem {
  label: string;
  color: string;
}

interface ChartConfig {
  [key: string]: ChartConfigItem;
}

const chartConfig = {
  location: {
    label: 'Location',
    color: 'hsl(var(--chart-1))',
  },
  region: {
    label: 'Region',
    color: 'hsl(var(--chart-2))',
  },
  country: {
    label: 'Country',
    color: 'hsl(var(--chart-4))',
  },
  browser: {
    label: 'Browser',
    color: 'hsl(var(--chart-4))',
  },
  os: {
    label: 'OS',
    color: 'hsl(var(--chart-5))',
  },
  osVersion: {
    label: 'OS Version',
    color: 'hsl(var(--chart-5))',
  },
  cpuArch: {
    label: 'CPU Architecture',
    color: 'hsl(var(--chart-5))',
  },
  deviceType: {
    label: 'Device Type',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig;

interface DynamicBarChartProps {
  dataKey: keyof typeof chartConfig; // Key untuk menentukan label dan warna
  data?: InteractionInsight; // Data sederhana dengan key-value
}

export function DynamicBarChart({ dataKey, data }: DynamicBarChartProps) {
  const chartData = Object.entries(!data || data[dataKey] || {})
    .map(([key, value]) => ({
      name: key,
      count: value,
    }))
    .sort((a, b) => b.count - a.count) // Urutkan dari terbesar ke terkecil
    .slice(0, 5);

  const config = chartConfig[dataKey];

  return (
    <Card className={'w-full'}>
      <CardHeader>
        <CardDescription>{config.label} click data</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className={'max-h-[200px]'} config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout='vertical'
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey='name'
              type='category'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              hide
              // tickFormatter={(value) => value.slice(0, 10)}
            />
            <XAxis dataKey='count' type='number' hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator={'line'} />}
            />
            <Bar
              dataKey='count'
              layout={'vertical'}
              fill={config.color}
              radius={4}
            >
              <LabelList
                dataKey='name'
                position='insideLeft'
                offset={8}
                className='fill-[--color-foreground]'
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

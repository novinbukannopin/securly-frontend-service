'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from 'recharts';
import { AnalyticsResponse, LinkMetric } from '@/types/analytics';

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  safari: {
    label: 'Safari',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function CountChartAnalytics({
  links,
}: {
  links?: AnalyticsResponse['links'];
}) {
  // const response = useGetAnalytics();
  // const links = response?.data?.links;

  const generateChartData = (value: LinkMetric, total: number) => [
    {
      name: 'Visitors',
      visitors: value.overall,
      percentage: (value.overall / total) * 100, // Proporsi dari total
      fill:
        value.percentageChange.thisWeek >= 0
          ? '#22c55e' // Hijau untuk tren naik
          : '#ef4444', // Merah untuk tren turun
    },
  ];

  const totalOverall = Object.values(links || {}).reduce(
    (sum, link) => sum + link.overall,
    0,
  );

  const chartDataMap = Object.entries(links || {}).reduce(
    (acc, [key, value]) => {
      acc[key] = generateChartData(value, links?.total?.overall || 0);
      return acc;
    },
    {} as Record<string, any[]>,
  );

  return (
    <div className={'space-y-4'} id={'count'}>
      <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row'>
        <div className='flex flex-1 flex-col justify-center gap-1 px-0 py-5 sm:py-6'>
          <CardTitle>Count of Links</CardTitle>
          <CardDescription>
            Showing total links for the last 3 months
          </CardDescription>
        </div>
        <div className='flex'>
          <button className='flex flex-1 flex-col justify-center gap-1 border-t px-0 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6'>
            <span className='text-xs text-muted-foreground'>Total Links</span>
            <span className='text-lg font-bold leading-none sm:text-3xl'>
              {links?.total.overall}
            </span>
          </button>
        </div>
      </CardHeader>
      <div className={'grid grid-cols-1 gap-4 lg:grid-cols-4'}>
        {Object.entries(links || {}).map(([key, value]) => (
          <Card key={key} className='flex flex-col'>
            <CardHeader className='pb-0'>
              <CardTitle>
                {key.charAt(0).toUpperCase() + key.slice(1)} Links
              </CardTitle>
              <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className='flex-1 pb-0'>
              <ChartContainer
                config={chartConfig}
                className='mx-auto aspect-square max-h-[250px]'
              >
                <RadialBarChart
                  data={chartDataMap[key]}
                  startAngle={90}
                  endAngle={90 + (chartDataMap[key][0].percentage / 100) * 360}
                  innerRadius={80}
                  outerRadius={110}
                >
                  <PolarGrid
                    gridType='circle'
                    radialLines={false}
                    stroke='none'
                    className='first:fill-muted last:fill-background'
                    polarRadius={[86, 74]}
                  />
                  <RadialBar dataKey='visitors' background cornerRadius={10} />
                  <PolarRadiusAxis
                    tick={false}
                    tickLine={false}
                    axisLine={false}
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
                                className='fill-foreground text-4xl font-bold'
                              >
                                {chartDataMap[key][0].visitors.toLocaleString()}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className='fill-muted-foreground'
                              >
                                Visitors
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </PolarRadiusAxis>
                </RadialBarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className='flex-col items-start gap-2 text-sm'>
              {/*<div className='flex items-start gap-2 font-medium leading-none'>*/}
              {/*  Trending up by {value.percentageChange.thisWeek}% this month*/}
              {/*  {value.percentageChange.thisWeek >= 0 ? (*/}
              {/*    <TrendingUp className='h-4 w-4' />*/}
              {/*  ) : (*/}
              {/*    <TrendingDown className='h-4 w-4' />*/}
              {/*  )}*/}
              {/*</div>*/}
              <div className='leading-none text-muted-foreground'>
                Showing total visitors for the last 6 months
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

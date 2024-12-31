import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/axios';
import { InsightsResponse } from '@/types/analytics';

export function useGetClicksAnalytics({
  startDate,
  endDate,
  filter,
  shortCode,
}: {
  startDate?: string;
  endDate?: string;
  filter?: string;
  shortCode?: string;
}) {
  return useQuery<InsightsResponse>({
    queryKey: [
      'click-analytics',
      {
        startDate,
        endDate,
        filter,
        shortCode,
      },
    ],
    queryFn: async () => {
      const res = await client.get(
        `/links/analytics/clicks?startDate=${startDate}&endDate=${endDate}&filter=${filter}${shortCode ? `&shortCode=${shortCode}` : ''}`,
      );
      return res.data;
    },
    staleTime: 1000 * 60 * 1,
  });
}

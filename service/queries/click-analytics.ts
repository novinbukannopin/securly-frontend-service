import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/axios';
import { ClicksResponse } from '@/types/analytics';

export function useGetClicksAnalytics({
  startDate,
  endDate,
  filter,
}: {
  startDate?: string;
  endDate?: string;
  filter?: string;
}) {
  return useQuery<ClicksResponse>({
    queryKey: [
      'click-analytics',
      {
        startDate,
        endDate,
        filter,
      },
    ],
    queryFn: async () => {
      const res = await client.get(
        `/links/analytics/clicks?startDate=${startDate}&endDate=${endDate}&filter=${filter}`,
      );
      return res.data;
    },
  });
}

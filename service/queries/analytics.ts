import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/axios';
import { AnalyticsResponse } from '@/types/analytics';

export function useGetAnalytics() {
  return useQuery<AnalyticsResponse>({
    queryKey: ['analytics'],
    queryFn: async () => {
      const res = await client.get(`/links/analytics`);
      return res.data;
    },
  });
}

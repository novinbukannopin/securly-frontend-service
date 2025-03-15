import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/axios';
import { AnalyticsDashboardData } from '@/types/insight';

export function useGetAdminInsight() {
  return useQuery<AnalyticsDashboardData>({
    queryKey: ['insight'],
    queryFn: async () => {
      const res = await client.get(`/admin/insight`);
      return res.data.data;
    },
  });
}

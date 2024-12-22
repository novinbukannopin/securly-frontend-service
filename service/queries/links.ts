import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/axios';
import { ResponseLinks } from '@/types/link';

export function useGetAllLinks(page: number, limit: number = 10) {
  return useQuery<ResponseLinks>({
    queryKey: ['links', { limit, page }],
    queryFn: async () => {
      const res = await client.get(`/links?limit=${limit}&page=${page}`);
      return res.data;
    },
  });
}

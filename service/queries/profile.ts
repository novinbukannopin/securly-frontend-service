import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/axios';
import { User } from '@/types/user';

export function useGetProfile() {
  return useQuery<User>({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await client.get('/users/me');
      return res.data;
    },
  });
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/axios';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { CreateLinkInput } from '@/types/link';
import { useRouter } from 'next/navigation';

export function useCreateLink() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: CreateLinkInput) => {
      const res = await client.post('/links/shorten', { ...data });
      return res.data;
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['links'] });
      await queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Link created successfully');
      router.push(`/links`);
    },
    onError: async (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      }
    },
  });
}

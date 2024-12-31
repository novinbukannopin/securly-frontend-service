import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/axios';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { CreateLinkInput } from '@/types/link';
import { useRouter } from 'next/navigation';

interface UseLinkMutationOptions {
  method: 'POST' | 'PATCH';
  endpoint: string;
}

export function useLinkMutation({ method, endpoint }: UseLinkMutationOptions) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: CreateLinkInput) => {
      const res =
        method === 'POST'
          ? await client.post(endpoint, data)
          : await client.patch(endpoint, data);
      return res.data;
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['links'] });
      await queryClient.invalidateQueries({ queryKey: ['user'] });
      await queryClient.invalidateQueries({ queryKey: ['click-analytics'] });
      toast.success(
        method === 'POST'
          ? 'Link created successfully'
          : 'Link updated successfully',
      );
      router.push(`/links`);
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || 'An error occurred';
        toast.error(errorMessage);
      } else {
        toast.error('Something went wrong');
      }
    },
  });
}

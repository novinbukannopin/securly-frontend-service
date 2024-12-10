import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserUpdatePayload } from '@/types/user';
import { client } from '@/lib/axios';
import { toast } from '@/hooks/use-toast';
import { AxiosError } from 'axios';

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UserUpdatePayload) => {
      const res = await client.patch('/users/me', data);
      return res.data;
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['user'] });
      toast({
        title: 'Profile updated successfully',
      });
    },
    onError: async (error) => {
      if (error instanceof AxiosError) {
        toast({
          variant: 'destructive',
          title: error.response?.data.message,
        });
      }
    },
  });
}

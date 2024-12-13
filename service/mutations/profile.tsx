import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserUpdatePayload } from '@/types/user';
import { client } from '@/lib/axios';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UserUpdatePayload) => {
      const res = await client.patch('/users/me', data);
      return res.data;
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Profile updated', data);
      // mungkin get user dari queryClient [user] dan update datanya
    },
    onError: async (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    },
  });
}

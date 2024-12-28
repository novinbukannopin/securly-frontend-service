import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/axios';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

type ArchivedLinkPayload = {
  id: number;
  action: 'archive' | 'unarchive';
};

export function useArchivedLink() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ArchivedLinkPayload) => {
      const res = await client.post(`/links/${data.id}/visible`, {
        action: data.action,
      });
      return res.data;
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['links'] });
      toast.success('Action Succesfully', data);
    },
    onError: async (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    },
  });
}

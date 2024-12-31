import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientDL } from '@/lib/axios';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import * as React from 'react';
import { useState } from 'react';
import { ApiDeepLearningResponse } from '@/types/link';

export function useCheckLink() {
  const queryClient = useQueryClient();
  const [disableSubmit, setDisableSubmit] = React.useState(true);
  const [apiResponse, setApiResponse] =
    useState<ApiDeepLearningResponse | null>(null);

  const mutation = useMutation({
    mutationFn: async (data: string) => {
      const res = await clientDL.post('/predict', { url: data });
      return res.data;
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['checklink'] });
      setApiResponse(data);
      setDisableSubmit(false);
      toast.success('Check', data);
    },
    onError: async (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      }
    },
  });

  return {
    ...mutation,
    apiResponse,
    setApiResponse,
    disableSubmit,
    setDisableSubmit,
  };
}

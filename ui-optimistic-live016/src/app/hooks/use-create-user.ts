import { useMutation } from '@tanstack/react-query';
import { createUser } from '../services/create-user';

export function useCreateUser() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createUser,
  });

  return {
    createUser: mutateAsync,
    isLoading: isPending,
  };
}

import { useMutation } from '@tanstack/react-query';
import { updateUser } from '../services/update-user';

export function useUpdateUser() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateUser,
  });

  return {
    updateUser: mutateAsync,
    isLoading: isPending,
  };
}

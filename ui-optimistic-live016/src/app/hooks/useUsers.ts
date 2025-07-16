import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../services/get-users';

export function useUsers() {
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  return {
    users: data ?? [],
    isLoading,
  };
}

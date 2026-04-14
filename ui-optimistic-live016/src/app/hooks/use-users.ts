import { useQuery } from '@tanstack/react-query';
import { listUsers } from '../services/list-users';
import type { WithStatus } from '../types/utils';
import type { IUser } from '../types/IUser';

export const USERS_QUERY_KEY = ['users'];

export type UsersQueryData = WithStatus<IUser>[];

export function useUsers() {
  const { data, isLoading } = useQuery({
    staleTime: Infinity,
    queryKey: USERS_QUERY_KEY,
    queryFn: async () => {
      const users = await listUsers();

      return users as UsersQueryData;
    },
  });

  return {
    users: data ?? [],
    isLoading,
  };
}

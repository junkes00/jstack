import { useQuery } from "@tanstack/react-query";
import { sleep } from "../sleep";
import type { IUser } from "../types";

export function useUser() {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async (): Promise<IUser[]> => {
      await sleep();
      const response = await fetch('http://localhost:3000/users');
      return response.json();
    },
  });

  return {
    users: data ?? [],
    isLoading,
    isFetching,
    refetch
  }
}

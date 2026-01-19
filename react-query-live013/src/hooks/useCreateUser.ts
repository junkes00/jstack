import { useMutation } from "@tanstack/react-query";

import { sleep } from "../sleep";

import type { IUser } from "../types";

export function useCreateUser() {
  const { isPending, mutateAsync } = useMutation({
    retry: 3,
    mutationFn: async ({ name, email }: { name: string; email: string }): Promise<IUser> => {
      await sleep();

      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      });

      return response.json();
    },
    onError: (error, variables) => {
      console.log(`Erro na request. \n${error.toString()}\nvariables:`, variables);
    },
    onSuccess: (data, variables) => {
      console.log('onSuccess', { data, variables })
    },
    onSettled: () => {
      console.log('Terminou a execução');
    }
  });

  return {
    isPending,
    createUser: mutateAsync,
  }
}

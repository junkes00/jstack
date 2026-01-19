import React from "react";

import { useCreateUser } from "./hooks/useCreateUser";
import { useUser } from "./hooks/useUsers";

export function Users() {
  const { users, isLoading, isFetching, refetch } = useUser();

  const { isPending, createUser } = useCreateUser();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const elements = event.currentTarget.elements as typeof event.currentTarget.elements & {
      name: HTMLInputElement;
      email: HTMLInputElement;
    }

    console.log(`Nome: ${elements.name.value}`);
    console.log(`Email: ${elements.email.value}`);

    createUser({
      name: elements.name.value,
      email: elements.email.value
    });
  }

  return (
    <div className="p-4">
      <div className="mb-10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2">
          <input
            placeholder="Nome"
            name="name"
            className="outline-none p-1 rounded-md text-zinc-900"
          />
          <input
            placeholder="E-mail"
            name="email"
            className="outline-none p-1 rounded-md text-zinc-900"
          />

          <button className="bg-blue-400 py-2 text-zinc-950 rounded-md">
            {isPending ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
      </div>

      <button
        type="button"
        className="bg-white text-black px-4 py-2 rounded-lg"
        onClick={() => refetch()}
      >
        Listar usuários
      </button>

      {isLoading && <h1>Carregando...</h1>}
      {!isLoading && isFetching && <small>Fetching...</small>}

      {
        users.map(user => (
          <div key={user.id}>
            <strong className="block">{user.name}</strong>
            <small>{user.email}</small>
          </div>
        ))
      }
    </div >
  )
}

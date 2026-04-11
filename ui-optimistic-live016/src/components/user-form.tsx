import { useCreateUser } from '@/app/hooks/use-create-user';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';
import { toast } from 'sonner';

export function UserForm() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  const { createUser, isLoading } = useCreateUser();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await createUser({
        name,
        username,
        blocked: false,
      });

      setName('');
      setUsername('');
      toast.success('Usuário cadastrado com sucesso!');
    }
    catch {
      toast.error('Error ao cadastrar usuário');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-muted/50 p-4 rounded-md">
      <div className="flex gap-3">
        <Input
          placeholder="Nome do usuário"
          value={name}
          onChange={event => setName(event?.target.value)}
          disabled={isLoading}
        />
        <Input
          placeholder="@ no Github"
          value={username}
          onChange={event => setUsername(event?.target.value)}
          disabled={isLoading}
        />
      </div>
      <Button className="mt-3">Cadastrar</Button>
    </form>
  );
}
